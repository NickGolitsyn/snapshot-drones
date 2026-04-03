"use client";

import { env } from "../env";
import quoteOptions from "@/data/quote/options.json";
import quotePricing from "@/data/quote/pricing.json";
import type { ServiceSlug } from "@/lib/site-services";
import { AnimatePresence, motion } from "framer-motion";
import { Lato } from "next/font/google";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Gauge,
  Home,
  Minus,
  Mountain,
  PartyPopper,
  Plane,
  Plus,
  Send,
  Timer,
  RotateCcw,
  Video,
  Zap,
} from "lucide-react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const QUOTE_ICONS = {
  home: Home,
  mountain: Mountain,
  eye: Eye,
  partyPopper: PartyPopper,
  plane: Plane,
  gauge: Gauge,
  clock: Clock,
  timer: Timer,
  zap: Zap,
} as const;

type QuoteIconKey = keyof typeof QUOTE_ICONS;

interface QuoteGeneratorProps {
  preselectedService?: ServiceSlug | null;
}

type SizeKey = keyof typeof quotePricing.sizeMultiplier;
type VideoLengthKey = keyof typeof quotePricing.videoPrice;
type DroneKey = keyof typeof quotePricing.dronePrice;
type EditingKey = keyof typeof quotePricing.editingPrice;
type TurnaroundKey = keyof typeof quotePricing.turnaroundPrice;

const BASE_PRICE = quotePricing.basePrice as Record<ServiceSlug, number>;
const SIZE_MULTIPLIER = quotePricing.sizeMultiplier;
const VIDEO_PRICE = quotePricing.videoPrice;
const DRONE_PRICE = quotePricing.dronePrice;
const EDITING_PRICE = quotePricing.editingPrice;
const TURNAROUND_PRICE = quotePricing.turnaroundPrice;
const PHOTO_COUNTS = quotePricing.photoCounts as readonly number[];

function calcPhotoCost(count: number): number {
  const { tier1MaxCount, tier1PerPhoto, tier2PerPhoto } = quotePricing.photoPricing;
  if (count <= tier1MaxCount) return Math.round(count * tier1PerPhoto);
  return Math.round(tier1MaxCount * tier1PerPhoto + (count - tier1MaxCount) * tier2PerPhoto);
}

function calcDeliverablesCost(
  wantPhotos: boolean,
  photoCount: number,
  wantVideo: boolean,
  videoLength: VideoLengthKey | null,
): number {
  const photoCost = wantPhotos ? calcPhotoCost(photoCount) : 0;
  const videoCost = wantVideo && videoLength ? VIDEO_PRICE[videoLength] : 0;
  const raw = photoCost + videoCost;
  if (wantPhotos && wantVideo && videoLength) {
    return Math.round(raw * quotePricing.comboDiscountMultiplier);
  }
  return raw;
}

const SERVICE_OPTIONS = quoteOptions.serviceOptions.map((o) => ({
  value: o.value as ServiceSlug,
  label: o.label,
  description: o.description,
  icon: QUOTE_ICONS[o.icon as QuoteIconKey],
}));

const SIZE_OPTIONS = quoteOptions.sizeOptions as Record<
  ServiceSlug,
  { value: SizeKey; label: string; description: string }[]
>;

const VIDEO_LENGTH_OPTIONS = quoteOptions.videoLengthOptions.map((o) => ({
  value: o.value as VideoLengthKey,
  label: o.label,
  price: VIDEO_PRICE[o.value as VideoLengthKey],
}));

const DRONE_OPTIONS = quoteOptions.droneOptions.map((o) => ({
  value: o.value as DroneKey,
  label: o.label,
  description: o.description,
  icon: QUOTE_ICONS[o.icon as QuoteIconKey],
}));

const EDITING_OPTIONS = quoteOptions.editingOptions.map((o) => ({
  value: o.value as EditingKey,
  label: o.label,
  description: o.description,
}));

const TURNAROUND_OPTIONS = quoteOptions.turnaroundOptions.map((o) => ({
  value: o.value as TurnaroundKey,
  label: o.label,
  description: o.description,
  icon: QUOTE_ICONS[o.icon as QuoteIconKey],
}));

const STEP_TITLES = quoteOptions.stepTitles;
const TOTAL_STEPS = STEP_TITLES.length;
const COMBO_DISCOUNT_PERCENT = Math.round((1 - quotePricing.comboDiscountMultiplier) * 100);

// ─── Animated Price Counter ───

function AnimatedPrice({ value }: { value: number }) {
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = displayed;
    const diff = value - start;
    if (diff === 0) return;
    const duration = 800;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + diff * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span>£{displayed}</span>;
}

// ─── Option Card ───

function OptionCard({
  selected,
  onClick,
  icon: Icon,
  label,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  icon?: React.ElementType;
  label: string;
  description: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all sm:p-5 ${
        selected
          ? "border-brand-yellow bg-brand-yellow/10 shadow-lg shadow-brand-yellow/10"
          : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
      }`}
    >
      {Icon && (
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
            selected ? "bg-brand-yellow text-neutral-900" : "bg-white/10 text-white"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
      )}
      <div className="min-w-0">
        <p className={`font-semibold ${selected ? "text-brand-yellow" : "text-white"}`}>{label}</p>
        <p className={`mt-0.5 text-sm ${selected ? "text-neutral-300" : "text-neutral-400"} ${lato.className}`}>
          {description}
        </p>
      </div>
      <div
        className={`ml-auto h-5 w-5 shrink-0 rounded-full border-2 transition-all ${
          selected ? "border-brand-yellow bg-brand-yellow" : "border-white/30"
        }`}
      >
        {selected && (
          <svg viewBox="0 0 20 20" className="h-full w-full text-neutral-900">
            <path fill="currentColor" d="M7.6 13.4 4 9.8l1.4-1.4 2.2 2.2 5-5L14 7l-6.4 6.4Z" />
          </svg>
        )}
      </div>
    </button>
  );
}

// ─── Main Component ───

export function QuoteGenerator({ preselectedService }: QuoteGeneratorProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [service, setService] = useState<ServiceSlug | null>(preselectedService ?? null);
  const [size, setSize] = useState<SizeKey | null>(null);
  const [wantPhotos, setWantPhotos] = useState(false);
  const [photoCount, setPhotoCount] = useState(15);
  const [wantVideo, setWantVideo] = useState(false);
  const [videoLength, setVideoLength] = useState<VideoLengthKey | null>(null);
  const [drone, setDrone] = useState<DroneKey | null>(null);
  const [editing, setEditing] = useState<EditingKey | null>(null);
  const [turnaround, setTurnaround] = useState<TurnaroundKey | null>(null);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactPostcode, setContactPostcode] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService && preselectedService !== service) {
      setService(preselectedService);
      if (step === 0) {
        setDirection(1);
        setStep(1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselectedService]);

  const deliverablesCost = useMemo(
    () => calcDeliverablesCost(wantPhotos, photoCount, wantVideo, videoLength),
    [wantPhotos, photoCount, wantVideo, videoLength],
  );

  const totalPrice = useMemo(() => {
    if (!service || !size || !(wantPhotos || wantVideo) || !drone || !editing || !turnaround) return 0;
    return (
      Math.round(BASE_PRICE[service] * SIZE_MULTIPLIER[size]) +
      deliverablesCost +
      DRONE_PRICE[drone] +
      EDITING_PRICE[editing] +
      TURNAROUND_PRICE[turnaround]
    );
  }, [service, size, wantPhotos, wantVideo, deliverablesCost, drone, editing, turnaround]);

  const canAdvance = useMemo(() => {
    switch (step) {
      case 0: return service !== null;
      case 1: return size !== null;
      case 2: return (wantPhotos || wantVideo) && (!wantVideo || videoLength !== null);
      case 3: return drone !== null;
      case 4: return editing !== null;
      case 5: return turnaround !== null;
      case 6: return true;
      case 7: return contactName.trim() !== "" && contactEmail.trim() !== "" && contactPhone.trim() !== "";
      default: return false;
    }
  }, [step, service, size, wantPhotos, wantVideo, videoLength, drone, editing, turnaround, contactName, contactEmail, contactPhone]);

  const goForward = useCallback(() => {
    if (!canAdvance || step >= TOTAL_STEPS - 1) return;
    setDirection(1);
    setStep((s) => s + 1);
  }, [canAdvance, step]);

  const goBack = useCallback(() => {
    if (step <= 0) return;
    setDirection(-1);
    setStep((s) => s - 1);
  }, [step]);

  const handleSelect = useCallback(
    <T,>(setter: (v: T) => void, value: T) => {
      setter(value);
      setTimeout(() => {
        setDirection(1);
        setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
      }, 250);
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const serviceName = SERVICE_OPTIONS.find((o) => o.value === service)?.label ?? service;
    const sizeLabel = service ? SIZE_OPTIONS[service].find((o) => o.value === size)?.label ?? size : size;
    const photoPart = wantPhotos ? `${photoCount} photos` : "";
    const videoPart = wantVideo && videoLength ? `${VIDEO_LENGTH_OPTIONS.find((o) => o.value === videoLength)?.label ?? videoLength} video` : "";
    const comboNote =
      wantPhotos && wantVideo && videoLength ? ` (${COMBO_DISCOUNT_PERCENT}% combo discount)` : "";
    const deliverableLabel = [photoPart, videoPart].filter(Boolean).join(" + ") + comboNote;
    const droneLabel = DRONE_OPTIONS.find((o) => o.value === drone)?.label ?? drone;
    const editingLabel = EDITING_OPTIONS.find((o) => o.value === editing)?.label ?? editing;
    const turnaroundLabel = TURNAROUND_OPTIONS.find((o) => o.value === turnaround)?.label ?? turnaround;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: env.WEB3FORMS_API_KEY,
          subject: `Quote Request — ${serviceName} — £${totalPrice}`,
          name: contactName,
          email: contactEmail,
          phone: contactPhone,
          postcode: contactPostcode,
          message: contactMessage,
          quote_service: serviceName,
          quote_size: sizeLabel,
          quote_deliverables: deliverableLabel,
          quote_drone: droneLabel,
          quote_editing: editingLabel,
          quote_turnaround: turnaroundLabel,
          quote_estimated_total: `£${totalPrice}`,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit. Please try again.");
      const result = await response.json();
      if (!result.success) throw new Error(result.message ?? "Something went wrong.");

      toast.success("Quote request sent! We'll be in touch shortly.");
      setSubmitted(true);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to submit. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting, service, size, wantPhotos, photoCount, wantVideo, videoLength, drone, editing, turnaround,
    totalPrice, contactName, contactEmail, contactPhone, contactPostcode, contactMessage,
  ]);

  const handleRestart = useCallback(() => {
    setStep(0);
    setDirection(-1);
    setService(null);
    setSize(null);
    setWantPhotos(false);
    setPhotoCount(15);
    setWantVideo(false);
    setVideoLength(null);
    setDrone(null);
    setEditing(null);
    setTurnaround(null);
    setContactName("");
    setContactEmail("");
    setContactPhone("");
    setContactPostcode("");
    setContactMessage("");
    setSubmitted(false);
  }, []);

  const lineItems = useMemo(() => {
    if (!service || !size || !(wantPhotos || wantVideo) || !drone || !editing || !turnaround) return [];
    const serviceName = SERVICE_OPTIONS.find((o) => o.value === service)?.label ?? "";
    const sizeLabel = service ? SIZE_OPTIONS[service].find((o) => o.value === size)?.label ?? "" : "";

    const items: { label: string; amount: number }[] = [
      { label: `${serviceName} — ${sizeLabel}`, amount: Math.round(BASE_PRICE[service] * SIZE_MULTIPLIER[size]) },
    ];

    if (wantPhotos) {
      items.push({ label: `${photoCount} photos`, amount: calcPhotoCost(photoCount) });
    }
    if (wantVideo && videoLength) {
      const lengthLabel = VIDEO_LENGTH_OPTIONS.find((o) => o.value === videoLength)?.label ?? videoLength;
      items.push({ label: `${lengthLabel} video`, amount: VIDEO_PRICE[videoLength] });
    }
    if (wantPhotos && wantVideo && videoLength) {
      const rawDeliverables = calcPhotoCost(photoCount) + VIDEO_PRICE[videoLength];
      const discount =
        rawDeliverables - Math.round(rawDeliverables * quotePricing.comboDiscountMultiplier);
      items.push({ label: `Combo discount (${COMBO_DISCOUNT_PERCENT}%)`, amount: -discount });
    }

    items.push(
      { label: DRONE_OPTIONS.find((o) => o.value === drone)?.label ?? "", amount: DRONE_PRICE[drone] },
      { label: (EDITING_OPTIONS.find((o) => o.value === editing)?.label ?? "") + " editing", amount: EDITING_PRICE[editing] },
      { label: (TURNAROUND_OPTIONS.find((o) => o.value === turnaround)?.label ?? "") + " delivery", amount: TURNAROUND_PRICE[turnaround] },
    );

    return items.filter((item) => item.amount !== 0);
  }, [service, size, wantPhotos, photoCount, wantVideo, videoLength, drone, editing, turnaround]);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={service === opt.value}
                onClick={() => handleSelect(setService, opt.value)}
                icon={opt.icon}
                label={opt.label}
                description={opt.description}
              />
            ))}
          </div>
        );
      case 1:
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {service &&
              SIZE_OPTIONS[service].map((opt) => (
                <OptionCard
                  key={opt.value}
                  selected={size === opt.value}
                  onClick={() => handleSelect(setSize, opt.value)}
                  label={opt.label}
                  description={opt.description}
                />
              ))}
          </div>
        );
      case 2: {
        const photoIdx = PHOTO_COUNTS.indexOf(photoCount);
        const canDecrement = photoIdx > 0;
        const canIncrement = photoIdx < PHOTO_COUNTS.length - 1;
        const isCombo = wantPhotos && wantVideo && videoLength;

        return (
          <div className="space-y-5">
            {/* Toggles */}
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setWantPhotos((p) => !p)}
                className={`group relative flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all sm:p-5 ${
                  wantPhotos
                    ? "border-brand-yellow bg-brand-yellow/10 shadow-lg shadow-brand-yellow/10"
                    : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    wantPhotos ? "bg-brand-yellow text-neutral-900" : "bg-white/10 text-white"
                  }`}
                >
                  <Camera className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className={`font-semibold ${wantPhotos ? "text-brand-yellow" : "text-white"}`}>Photos</p>
                  <p className={`mt-0.5 text-sm ${wantPhotos ? "text-neutral-300" : "text-neutral-400"} ${lato.className}`}>
                    Edited aerial stills
                  </p>
                </div>
                <div
                  className={`ml-auto h-5 w-5 shrink-0 rounded border-2 transition-all ${
                    wantPhotos ? "border-brand-yellow bg-brand-yellow" : "border-white/30"
                  }`}
                >
                  {wantPhotos && (
                    <svg viewBox="0 0 20 20" className="h-full w-full text-neutral-900">
                      <path fill="currentColor" d="M7.6 13.4 4 9.8l1.4-1.4 2.2 2.2 5-5L14 7l-6.4 6.4Z" />
                    </svg>
                  )}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setWantVideo((v) => !v)}
                className={`group relative flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all sm:p-5 ${
                  wantVideo
                    ? "border-brand-yellow bg-brand-yellow/10 shadow-lg shadow-brand-yellow/10"
                    : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.07]"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    wantVideo ? "bg-brand-yellow text-neutral-900" : "bg-white/10 text-white"
                  }`}
                >
                  <Video className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className={`font-semibold ${wantVideo ? "text-brand-yellow" : "text-white"}`}>Video</p>
                  <p className={`mt-0.5 text-sm ${wantVideo ? "text-neutral-300" : "text-neutral-400"} ${lato.className}`}>
                    Highlight clips & films
                  </p>
                </div>
                <div
                  className={`ml-auto h-5 w-5 shrink-0 rounded border-2 transition-all ${
                    wantVideo ? "border-brand-yellow bg-brand-yellow" : "border-white/30"
                  }`}
                >
                  {wantVideo && (
                    <svg viewBox="0 0 20 20" className="h-full w-full text-neutral-900">
                      <path fill="currentColor" d="M7.6 13.4 4 9.8l1.4-1.4 2.2 2.2 5-5L14 7l-6.4 6.4Z" />
                    </svg>
                  )}
                </div>
              </button>
            </div>

            {/* Photo stepper */}
            {wantPhotos && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 ${lato.className}`}>
                  Number of photos
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={!canDecrement}
                      onClick={() => canDecrement && setPhotoCount(PHOTO_COUNTS[photoIdx - 1])}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/30 disabled:opacity-30 disabled:hover:border-white/15"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[4rem] text-center text-lg font-semibold text-white">
                      {photoCount} photos
                    </span>
                    <button
                      type="button"
                      disabled={!canIncrement}
                      onClick={() => canIncrement && setPhotoCount(PHOTO_COUNTS[photoIdx + 1])}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-white/30 disabled:opacity-30 disabled:hover:border-white/15"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-brand-yellow">£{calcPhotoCost(photoCount)}</span>
                </div>
              </div>
            )}

            {/* Video length selector */}
            {wantVideo && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 ${lato.className}`}>
                  Video length
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {VIDEO_LENGTH_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setVideoLength(opt.value)}
                      className={`rounded-xl border-2 px-3 py-3 text-center transition-all ${
                        videoLength === opt.value
                          ? "border-brand-yellow bg-brand-yellow/10"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25"
                      }`}
                    >
                      <p className={`text-sm font-semibold ${videoLength === opt.value ? "text-brand-yellow" : "text-white"}`}>
                        {opt.label}
                      </p>
                      <p className={`mt-0.5 text-xs ${videoLength === opt.value ? "text-brand-yellow/70" : "text-neutral-500"}`}>
                        £{opt.price}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Live subtotal */}
            {(wantPhotos || wantVideo) && (
              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 sm:px-5">
                <span className={`text-sm text-neutral-400 ${lato.className}`}>
                  Deliverables subtotal{isCombo ? ` (incl. ${COMBO_DISCOUNT_PERCENT}% combo discount)` : ""}
                </span>
                <span className="text-sm font-bold text-brand-yellow">£{deliverablesCost}</span>
              </div>
            )}

            {/* Next button */}
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={goForward}
                disabled={!canAdvance}
                className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-8 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#e6a600] disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      }
      case 3:
        return (
          <div className="grid gap-3 sm:grid-cols-2">
            {DRONE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={drone === opt.value}
                onClick={() => handleSelect(setDrone, opt.value)}
                icon={opt.icon}
                label={opt.label}
                description={opt.description}
              />
            ))}
          </div>
        );
      case 4:
        return (
          <div className="grid gap-3">
            {EDITING_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={editing === opt.value}
                onClick={() => handleSelect(setEditing, opt.value)}
                label={opt.label}
                description={opt.description}
              />
            ))}
          </div>
        );
      case 5:
        return (
          <div className="grid gap-3">
            {TURNAROUND_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={turnaround === opt.value}
                onClick={() => handleSelect(setTurnaround, opt.value)}
                icon={opt.icon}
                label={opt.label}
                description={opt.description}
              />
            ))}
          </div>
        );
      case 6:
        return (
          <div className="flex flex-col items-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">
              Estimated total
            </p>
            <p className="mt-3 text-6xl font-bold text-white sm:text-7xl">
              <AnimatedPrice value={totalPrice} />
            </p>
            <p className={`mt-2 text-sm text-neutral-400 ${lato.className}`}>
              Final price may vary based on location and specific requirements
            </p>
            <div className="mt-8 w-full max-w-md space-y-2">
              {lineItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center justify-between rounded-xl bg-white/[0.05] px-4 py-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.35 }}
                >
                  <span className={`text-sm text-neutral-300 ${lato.className}`}>{item.label}</span>
                  <span className={`text-sm font-semibold ${item.amount < 0 ? "text-green-400" : "text-white"}`}>
                    {item.amount < 0 ? `-£${Math.abs(item.amount)}` : `£${item.amount}`}
                  </span>
                </motion.div>
              ))}
              <motion.div
                className="flex items-center justify-between rounded-xl border border-brand-yellow/30 bg-brand-yellow/10 px-4 py-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + lineItems.length * 0.08, duration: 0.35 }}
              >
                <span className="text-sm font-semibold text-brand-yellow">Total</span>
                <span className="text-sm font-bold text-brand-yellow">£{totalPrice}</span>
              </motion.div>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={goForward}
                className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-8 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#e6a600]"
              >
                Book this service
                <ChevronRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-neutral-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
                Start over
              </button>
            </div>
          </div>
        );
      case 7:
        if (submitted) {
          return (
            <div className="flex flex-col items-center py-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-yellow/20">
                <Send className="h-7 w-7 text-brand-yellow" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-white">Request sent</h3>
              <p className={`mt-2 max-w-sm text-sm text-neutral-400 ${lato.className}`}>
                Thank you! We&apos;ll review your quote and get back to you within 24 hours.
              </p>
              <button
                type="button"
                onClick={handleRestart}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-medium text-neutral-300 transition-colors hover:border-white/30 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
                Start a new quote
              </button>
            </div>
          );
        }
        return (
          <div className="mx-auto w-full max-w-md space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-brand-yellow focus:outline-none focus:ring-1 focus:ring-brand-yellow"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-brand-yellow focus:outline-none focus:ring-1 focus:ring-brand-yellow"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-300">
                Phone <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="07xxx xxx xxx"
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-brand-yellow focus:outline-none focus:ring-1 focus:ring-brand-yellow"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-300">Postcode</label>
              <input
                type="text"
                value={contactPostcode}
                onChange={(e) => setContactPostcode(e.target.value)}
                placeholder="Flight location postcode"
                className="w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-brand-yellow focus:outline-none focus:ring-1 focus:ring-brand-yellow"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-300">Message</label>
              <textarea
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                placeholder="Any extra details (optional)"
                rows={3}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:border-brand-yellow focus:outline-none focus:ring-1 focus:ring-brand-yellow"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !canAdvance}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-8 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#e6a600] disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send quote request"}
              <Send className="h-4 w-4" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-6 py-10 sm:px-10 sm:py-14">
      {/* Progress bar */}
      <div className="mx-auto mb-2 flex max-w-xl items-center justify-center gap-1.5">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i <= step ? "bg-brand-yellow" : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p className={`mb-8 text-center text-xs text-neutral-500 ${lato.className}`}>
        Step {step + 1} of {TOTAL_STEPS}
      </p>

      {/* Step title */}
      <h3 className="mb-6 text-center text-2xl font-semibold text-white sm:text-3xl">
        {STEP_TITLES[step]}
      </h3>

      {/* Animated step content */}
      <div className="relative mx-auto min-h-[280px] max-w-2xl overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {step < 6 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 px-5 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-white/30 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          )}
        </div>
      )}
      {step === 7 && !submitted && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-1 text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to quote
          </button>
        </div>
      )}
    </div>
  );
}
