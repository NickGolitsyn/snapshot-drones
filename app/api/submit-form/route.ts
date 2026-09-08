import siteContact from "@/data/site-contact.json";
import { renderEmailHtml, type EmailRow } from "@/lib/email-template";
import { Resend } from "resend";
import { z } from "zod";

const honeypotSchema = z.object({
  website: z.string().optional(),
});

const contactSchema = honeypotSchema.extend({
  type: z.literal("contact"),
  service: z.string().min(1),
  package: z.string().optional(),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().trim().min(1),
  postcode: z.string().trim().min(5).max(7),
  date: z.union([z.string(), z.coerce.date()]),
  message: z.string().optional(),
});

const quoteSchema = honeypotSchema.extend({
  type: z.literal("quote"),
  subject: z.string().min(1),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().trim().min(1),
  postcode: z.string().trim().min(1),
  message: z.string().optional(),
  quote_service: z.string().min(1),
  quote_size: z.string().min(1),
  quote_deliverables: z.string().min(1),
  quote_drone: z.string().min(1),
  quote_editing: z.string().min(1),
  quote_turnaround: z.string().min(1),
  quote_estimated_total: z.string().min(1),
});

const formSchema = z.discriminatedUnion("type", [contactSchema, quoteSchema]);

function formatDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function buildContactEmail(data: z.infer<typeof contactSchema>) {
  const rows: EmailRow[] = [
    { label: "Service", value: data.service },
    ...(data.package ? [{ label: "Package", value: data.package }] : []),
    { label: "Name", value: data.name },
    { label: "Email", value: data.email, href: `mailto:${data.email}` },
    { label: "Phone", value: data.phone, href: `tel:${data.phone}` },
    { label: "Postcode", value: data.postcode },
    { label: "Preferred date", value: formatDate(data.date) },
  ];

  const textLines = [
    `Service: ${data.service}`,
    data.package ? `Package: ${data.package}` : null,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Postcode: ${data.postcode}`,
    `Preferred date: ${formatDate(data.date)}`,
    data.message ? `Message:\n${data.message}` : null,
  ].filter(Boolean);

  return {
    subject: `New enquiry — ${data.service} — ${data.name}`,
    text: textLines.join("\n"),
    html: renderEmailHtml({
      title: "New enquiry",
      rows,
      message: data.message,
    }),
    replyTo: data.email,
  };
}

function buildQuoteEmail(data: z.infer<typeof quoteSchema>) {
  const rows: EmailRow[] = [
    { label: "Service", value: data.quote_service },
    { label: "Property size", value: data.quote_size },
    { label: "Deliverables", value: data.quote_deliverables },
    { label: "Drone", value: data.quote_drone },
    { label: "Editing", value: data.quote_editing },
    { label: "Turnaround", value: data.quote_turnaround },
    { label: "Estimated total", value: data.quote_estimated_total },
    { label: "Name", value: data.name },
    { label: "Email", value: data.email, href: `mailto:${data.email}` },
    { label: "Phone", value: data.phone, href: `tel:${data.phone}` },
    { label: "Postcode", value: data.postcode },
  ];

  const textLines = [
    `Service: ${data.quote_service}`,
    `Property size: ${data.quote_size}`,
    `Deliverables: ${data.quote_deliverables}`,
    `Drone: ${data.quote_drone}`,
    `Editing: ${data.quote_editing}`,
    `Turnaround: ${data.quote_turnaround}`,
    `Estimated total: ${data.quote_estimated_total}`,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Postcode: ${data.postcode}`,
    data.message ? `Message:\n${data.message}` : null,
  ].filter(Boolean);

  return {
    subject: data.subject,
    text: textLines.join("\n"),
    html: renderEmailHtml({
      title: "Quote request",
      rows,
      message: data.message,
    }),
    replyTo: data.email,
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return Response.json(
      { success: false, message: "Form submission is not configured." },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = formSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { success: false, message: "Please check the form and try again." },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return Response.json({ success: true });
  }

  const emailContent =
    parsed.data.type === "contact"
      ? buildContactEmail(parsed.data)
      : buildQuoteEmail(parsed.data);

  const to = process.env.CONTACT_EMAIL ?? siteContact.email;
  const from =
    process.env.RESEND_FROM_EMAIL ??
    "Snapshot Website <noreply@snapshotdrones.co.uk>";

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: emailContent.replyTo,
    subject: emailContent.subject,
    text: emailContent.text,
    html: emailContent.html,
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json(
      { success: false, message: "Failed to send your message. Please try again." },
      { status: 500 },
    );
  }

  return Response.json({ success: true });
}
