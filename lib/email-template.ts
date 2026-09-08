export type EmailRow = {
  label: string;
  value: string;
  href?: string;
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderRow(row: EmailRow, isLast: boolean): string {
  const border = isLast ? "" : "border-bottom:1px solid #e5e5e5;";
  const safeLabel = escapeHtml(row.label);
  const safeValue = escapeHtml(row.value).replace(/\n/g, "<br>");
  const valueHtml = row.href
    ? `<a href="${escapeHtml(row.href)}" style="color:#171717;text-decoration:underline;">${safeValue}</a>`
    : safeValue;

  return `
    <tr>
      <td style="padding:12px 0;${border}width:38%;vertical-align:top;font-size:13px;line-height:1.4;color:#737373;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
        ${safeLabel}
      </td>
      <td style="padding:12px 0;${border}vertical-align:top;font-size:14px;line-height:1.5;color:#171717;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-weight:500;">
        ${valueHtml}
      </td>
    </tr>`;
}

export function renderEmailHtml(options: {
  title: string;
  rows: EmailRow[];
  message?: string;
}): string {
  const { title, rows, message } = options;
  const safeTitle = escapeHtml(title);
  const rowsHtml = rows
    .map((row, index) => renderRow(row, index === rows.length - 1 && !message))
    .join("");

  const messageHtml = message
    ? `
      <tr>
        <td colspan="2" style="padding-top:20px;">
          <p style="margin:0 0 8px;font-size:13px;line-height:1.4;color:#737373;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            Message
          </p>
          <div style="padding:14px 16px;background-color:#f5f5f5;border-radius:8px;font-size:14px;line-height:1.6;color:#171717;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;white-space:pre-wrap;">
            ${escapeHtml(message).replace(/\n/g, "<br>")}
          </div>
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${safeTitle}</title>
</head>
<body style="margin:0;padding:0;background-color:#fafafa;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fafafa;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background-color:#ffffff;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background-color:#171717;padding:20px 28px 18px;">
              <p style="margin:0;font-size:18px;line-height:1.3;font-weight:700;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;letter-spacing:0.02em;">
                Snapshot
              </p>
              <p style="margin:4px 0 0;font-size:12px;line-height:1.4;color:#a3a3a3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                Drone Services
              </p>
            </td>
          </tr>
          <tr>
            <td style="height:3px;background-color:#FAB72D;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <h1 style="margin:0 0 20px;font-size:20px;line-height:1.3;font-weight:600;color:#171717;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                ${safeTitle}
              </h1>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${rowsHtml}
                ${messageHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 20px;border-top:1px solid #e5e5e5;background-color:#fafafa;">
              <p style="margin:0;font-size:12px;line-height:1.5;color:#a3a3a3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
                Sent from the Snapshot website
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
