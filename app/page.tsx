"use client";
import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Fjalla_One, Lato } from "next/font/google";
import { QuoteGenerator } from "@/components/QuoteGenerator";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
const fjalla = Fjalla_One({ subsets: ["latin"], weight: "400" });

const SERVICE_SLUGS = ["real-estate", "landscape", "roof-inspection", "events"] as const;
type ServiceSlug = (typeof SERVICE_SLUGS)[number];

const WHAT_WE_DO_FEATURES: {
  id: number;
  slug: ServiceSlug;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}[] = [
  {
    id: 1,
    slug: "real-estate",
    eyebrow: "Real Estate",
    title: "Property Photography & Filming",
    description:
      "Showcase your property at its best with professional stills and video. We capture interiors and exteriors in sharp detail with natural and staged lighting, wide angles, and smooth footage so listings stand out and viewings feel like a real visit.",
    highlights: [
      "Aerial and ground-level coverage",
      "Listing-ready photo and video packages",
      "Natural and staged lighting workflows",
    ],
    image: "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XHbQ8KN6g9AVM0K5zYTHhZdaIcSiPoBfnDrGs",
    imageAlt: "Drone view of a modern property at golden hour",
  },
  {
    id: 2,
    slug: "landscape",
    eyebrow: "Outdoor Spaces",
    title: "Landscape Photography & Filming",
    description:
      "From gardens and parks to estates and rural views, we deliver striking landscape photography and film. Ideal for developers, agents, and private owners who want to highlight location, greenery, and outdoor space.",
    highlights: [
      "Wide establishing aerial sequences",
      "Natural terrain and feature emphasis",
      "Edited content for marketing channels",
    ],
    image: "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XwqiGgayYDld3xm4B7MXbjtN05vWV69KRQaog",
    imageAlt: "Aerial landscape showcasing rural terrain and greenery",
  },
  {
    id: 3,
    slug: "roof-inspection",
    eyebrow: "Inspection",
    title: "Roof Inspection",
    description:
      "High-resolution drone and ground-level roof surveys to spot damage, wear, and maintenance issues. Perfect for surveys, insurance, and pre-sale checks—we deliver clear imagery and reports you can rely on.",
    highlights: [
      "Close-up evidence of defects and wear",
      "Safer than ladder-based inspection",
      "Clear visual reports for decision making",
    ],
    image: "/roof.png",
    imageAlt: "Drone inspection view of rooftop details",
  },
  {
    id: 4,
    slug: "events",
    eyebrow: "Events",
    title: "Weddings & Events",
    description:
      "Capture stunning aerial footage of weddings, events, and special occasions. Our skilled drone operators deliver professional, cinematic shots that capture the essence of your day—from ceremony to reception.",
    highlights: [
      "Cinematic flythrough moments",
      "Safe flight planning around guests",
      "Highlights edits ready for sharing",
    ],
    image: "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38Xdh44eoElQJPk0LUwbcEsvTMurNaDolpZmGxI",
    imageAlt: "Aerial footage of a wedding and guests outdoors",
  },
];

const EQUIPMENT_FEATURES = [
  {
    id: 1,
    name: "DJI Mini 5 Pro Drone",
    blurb:
      "Our standard stabilized drone platform is built for smooth, high-resolution capture and dependable repeatable flight paths.",
    howWeUseIt: [
      "Property and landscape overviews with smooth cinematic motion",
      "Roof and structure inspections with controlled proximity shots",
      "Progress documentation for construction and development sites",
    ],
    image:
      "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38Xd6hg7ZlQJPk0LUwbcEsvTMurNaDolpZmGxI1",
    imageAlt: "Standard drone capturing smooth aerial footage",
  },
  {
    id: 2,
    name: "DJI Avata 2 FPV Drone",
    blurb:
      "Our FPV setup delivers immersive movement and dynamic one-take sequences that create a high-energy cinematic feel.",
    howWeUseIt: [
      "Fast, flowing flythroughs for venues and architectural spaces",
      "Action-focused event coverage with agile, low-level motion",
      "Creative social-first videos with bold transitions and momentum",
    ],
    image:
      "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XnEjbzfG4N5bRsD8ZV6BFXGYaKCweyt7fjoIL",
    imageAlt: "FPV-style dynamic drone shot over a venue",
  },
];

const KEY_STATS = [
  {
    id: 1,
    label: "Years of experience",
    value: 3,
    suffix: "+",
    description: "Honing our craft across residential, commercial, and creative projects.",
  },
  {
    id: 2,
    label: "Flight hours logged",
    value: 9,
    suffix: "+",
    description: "Experienced pilots with structured planning and safety-first operations.",
  },
  {
    id: 3,
    label: "Average delivery time",
    value: 48,
    suffix: "hrs",
    description: "Fast turnaround from shoot day to polished, client-ready deliverables.",
  },
  {
    id: 4,
    label: "Insurance coverage",
    value: 3,
    prefix: "£",
    suffix: "M",
    description: "Fully insured for up to £3 million in damage, giving you complete peace of mind.",
  },
];


const HERO_SLIDES: {
  id: number;
  serviceSlug: ServiceSlug;
  image: string;
  imageAlt: string;
  headingLines: string[];
  subheading: string;
  cta: string;
}[] = [
  {
    id: 1,
    serviceSlug: "real-estate",
    image:
      "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XEIYtQoCesMqY1F3gS2wk8vOtIjzUGKpVcmx0",
    imageAlt:
      "Aerial view of modern residential property at sunset for real estate marketing",
    headingLines: ["Fresh", "Perspectives", "From New", "Heights"],
    subheading: "Property Photography & Filming",
    cta: "Book now",
  },
  {
    id: 2,
    serviceSlug: "events",
    image:
      "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XyKbgkKh9NpmRfzCWSDBhxtOr57dgJI6nl9yX",
    imageAlt: "",
    headingLines: ["Fresh", "Perspectives", "From New", "Heights"],
    subheading: "Wedding Photography & Filming",
    cta: "Book now",
  },
  {
    id: 3,
    serviceSlug: "landscape",
    image:
      "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XGrykikv1SxC6n0KHvowldeBTOmaUR85jVW2y",
    imageAlt: "",
    headingLines: ["Fresh", "Perspectives", "From New", "Heights"],
    subheading: "Landscape Photography & Filming",
    cta: "Book now",
  },
  {
    id: 4,
    serviceSlug: "roof-inspection",
    image:
      "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38Xl1OlBMfzrONqv5RkFao1BIp7mts3HDyCgnLb",
    imageAlt: "",
    headingLines: ["Fresh", "Perspectives", "From New", "Heights"],
    subheading: "Roof Inspections",
    cta: "Book now",
  },
  {
    id: 5,
    serviceSlug: "landscape",
    image:
      "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38X8QD3KCwH5o0cWAaK4qNsCvJ6bTRgV18Mwd2f",
    imageAlt: "",
    headingLines: ["Fresh", "Perspectives", "From New", "Heights"],
    subheading: "Agriculture Photography & Filming",
    cta: "Book now",
  },
];

const GALLERY_IMAGE_URLS = [
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XDuyutf0HaCpFwyg9ebP5fHZNtnjAS07u1EXq",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38X6LnPU7uOQZG35mdcsol2LbWMvXF9Ywxg7TiD",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38X7cwqY8d45TYoXeDJwaZhACMubWFjlH7QSIP6",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XCSI73KFsHR264FDxeGurvbUt8mAYQ59jST73",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XvVXSF0cUYMkPDVK62ILo3JSz5Niw48qZpHlm",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XBOzQYwKEzfr4YmDgokcHqXTlhSi3vs79OWPj",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XKCofdb2YVS1GTrFB4X5yOufNUL9idteCMI3D",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38X8V0oXZwH5o0cWAaK4qNsCvJ6bTRgV18Mwd2f",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XlUnyR0fzrONqv5RkFao1BIp7mts3HDyCgnLb",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38X92fQXLMBrEyw1kIDXq6FphWnPM4cadzeuH5Y",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38Xfc47qNheSwOhGQuz14I7bPLY3MBvXkjDTids",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XsCBR9neufW5q7rn8dZkb0pUYvIzLGi16DBE2",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XgdqpN2Tf7BinYkxHlKMZ1I92EhtRpcwXv0bF",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38X0xchemq82w5PQrUxR63dKNv1Z4YTXpOkMWVG",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XE8ALz1esMqY1F3gS2wk8vOtIjzUGKpVcmx0i",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XpRSAqJLc8x5rWHMPok4bLYTsQ0hnXu9AgKNz",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38X2sjbhd79TNOdqrWegw8zcByA6QuItb3LmDnJ",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XTZtDZyNhyQZwNPn7orS5FsXIWKAgaUkmjzqG",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38X9b59XxBrEyw1kIDXq6FphWnPM4cadzeuH5Y8",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38Xqx4c2CDSs6GOkgwn3Y9ecIBtRpPFjfCUHAZh",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XB7gen2KEzfr4YmDgokcHqXTlhSi3vs79OWPj",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XfH7tFdheSwOhGQuz14I7bPLY3MBvXkjDTids",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XGpKP4qv1SxC6n0KHvowldeBTOmaUR85jVW2y",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XKkM6Tq2YVS1GTrFB4X5yOufNUL9idteCMI3D",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38X2t54Br79TNOdqrWegw8zcByA6QuItb3LmDnJ",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38X6kxPVWuOQZG35mdcsol2LbWMvXF9Ywxg7TiD",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XO1uE542J7On0HRbwlFNUyrueXYhCfAd8L3m5",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XY6eEaRABJwWk3mjzDGfhyiZVbKl8FrApa7Me",
  "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XhsxTokavI1dUBF9tNxZRg8Dl7A6K3zarbuiP",
];

interface ServiceFeatureProps {
  serviceSlug: ServiceSlug;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  reversed?: boolean;
  onGetQuote: (slug: ServiceSlug) => void;
}

function ServiceFeature({
  serviceSlug,
  eyebrow,
  title,
  description,
  highlights,
  image,
  imageAlt,
  reversed = false,
  onGetQuote,
}: ServiceFeatureProps) {
  const imageInitialX = reversed ? "22vw" : "-22vw";
  const contentInitialX = reversed ? "-22vw" : "22vw";

  return (
    <article className="grid items-center lg:grid-cols-2 px-6 lg:px-8 gap-6 lg:gap-8">
      <motion.div
        className={`min-w-0 ${reversed ? "lg:order-2" : ""}`}
        initial={{ opacity: 0, x: imageInitialX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className={`relative aspect-[4/3] overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.04] ${
            reversed
              ? "rounded-3xl rounded-tr-[4.5rem] rounded-bl-[4.5rem]"
              : "rounded-3xl rounded-tl-[4.5rem] rounded-br-[4.5rem]"
          }`}
        >
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </motion.div>
      <motion.div
        className={`min-w-0 flex flex-col justify-center ${reversed ? "lg:order-1" : ""}`}
        initial={{ opacity: 0, x: contentInitialX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-semibold sm:text-3xl lg:text-4xl">{title}</h3>
        <p className={`mt-5 text-sm leading-7 text-neutral-600 ${lato.className}`}>
          {description}
        </p>
        <ul className={`mt-6 space-y-2.5 text-sm text-neutral-700 ${lato.className}`}>
          {highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => onGetQuote(serviceSlug)}
          className="mt-8 inline-flex w-fit items-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
        >
          Get a quote
        </button>
      </motion.div>
    </article>
  );
}

interface EquipmentFeatureProps {
  index: number;
  name: string;
  blurb: string;
  howWeUseIt: string[];
  image: string;
  imageAlt: string;
  reversed?: boolean;
}

function EquipmentFeature({
  index,
  name,
  blurb,
  howWeUseIt,
  image,
  imageAlt,
  reversed = false,
}: EquipmentFeatureProps) {
  const imageInitialX = reversed ? "22vw" : "-22vw";
  const contentInitialX = reversed ? "-22vw" : "22vw";

  return (
    <article className="grid items-center lg:grid-cols-2 px-6 lg:px-8 gap-6 lg:gap-8">
      <motion.div
        className={`min-w-0 ${reversed ? "lg:order-2" : ""}`}
        initial={{ opacity: 0, x: imageInitialX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div
          className={`relative aspect-[4/3] overflow-hidden shadow-xl transition-transform duration-500 hover:scale-[1.04] ${
            reversed
              ? "rounded-3xl rounded-tr-[4.5rem] rounded-bl-[4.5rem]"
              : "rounded-3xl rounded-tl-[4.5rem] rounded-br-[4.5rem]"
          }`}
        >
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </motion.div>
      <motion.div
        className={`min-w-0 flex flex-col justify-center py-10 lg:py-16 ${reversed ? "lg:order-1" : ""}`}
        initial={{ opacity: 0, x: contentInitialX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
      >
        <h3 className="text-2xl font-semibold sm:text-3xl lg:text-4xl">{name}</h3>
        <p className={`mt-5 text-sm leading-7 text-neutral-300 ${lato.className}`}>
          {blurb}
        </p>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow">
          How we use it
        </p>
        <ul className={`mt-3 space-y-2.5 text-sm text-neutral-200 ${lato.className}`}>
          {howWeUseIt.map((usage) => (
            <li key={usage} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-yellow" />
              <span>{usage}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </article>
  );
}

interface AnimatedStatNumberProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

function AnimatedStatNumber({ value, suffix = "", prefix = "" }: AnimatedStatNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.7 });
  const count = useMotionValue(0);
  const smoothCount = useSpring(count, { damping: 35, stiffness: 110 });
  const rounded = useTransform(smoothCount, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return () => controls.stop();
  }, [count, isInView, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  return (
    <span ref={ref}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [heroEmblaRef, heroEmblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });
  const heroSectionRef = useRef<HTMLElement | null>(null);

  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(96);
  const [quoteService, setQuoteService] = useState<ServiceSlug | null>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(heroScrollProgress, [0, 1], ["0%", "14%"]);

  const heroScrollTo = useCallback(
    (index: number) => heroEmblaApi?.scrollTo(index),
    [heroEmblaApi],
  );

  const updateHeroState = useCallback(() => {
    if (!heroEmblaApi) return;
    setSelectedHeroIndex(heroEmblaApi.selectedScrollSnap());
  }, [heroEmblaApi]);

  useEffect(() => {
    if (!heroEmblaApi) return;
    updateHeroState();
    heroEmblaApi.on("select", updateHeroState);
    heroEmblaApi.on("reInit", updateHeroState);

    return () => {
      heroEmblaApi.off("select", updateHeroState);
      heroEmblaApi.off("reInit", updateHeroState);
    };
  }, [heroEmblaApi, updateHeroState]);

  useEffect(() => {
    if (!heroEmblaApi) return;

    const AUTOPLAY_DELAY_MS = 5000;
    const intervalId = window.setInterval(() => {
      heroEmblaApi.scrollNext();
    }, AUTOPLAY_DELAY_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [heroEmblaApi]);

  useEffect(() => {
    const header = document.getElementById("site-header");
    if (!header) return;

    const measureHeader = () => {
      setHeaderHeight(header.getBoundingClientRect().height);
    };

    measureHeader();
    const resizeObserver = new ResizeObserver(measureHeader);
    resizeObserver.observe(header);
    window.addEventListener("resize", measureHeader);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measureHeader);
    };
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleGetQuote = useCallback(
    (slug: ServiceSlug) => {
      setQuoteService(slug);
      scrollToSection("quote");
    },
    [scrollToSection],
  );

  return (
    <main className="overflow-x-hidden">
      <section
        ref={heroSectionRef}
        className="relative h-[calc(70dvh-var(--header-height))] min-h-[360px] overflow-hidden sm:h-[calc(78dvh-var(--header-height))] md:min-h-[420px] lg:h-[calc(100dvh-var(--header-height))] lg:min-h-0"
        aria-label="Featured services slider"
        style={{ "--header-height": `${headerHeight}px` } as React.CSSProperties}
      >
        <div className="h-full overflow-hidden" ref={heroEmblaRef}>
          <div className="flex h-full">
            {HERO_SLIDES.map((slide, index) => {
              const HeadingTag = index === 0 ? "h1" : "h2";
              return (
              <article
                key={slide.id}
                className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden"
                aria-roledescription="slide"
                aria-label={`${slide.id} of ${HERO_SLIDES.length}`}
              >
                <motion.img
                  className="absolute inset-0 h-[114%] w-full object-cover"
                  src={slide.image}
                  alt={slide.imageAlt}
                  loading={slide.id === 1 ? "eager" : "lazy"}
                  style={{ y: heroImageY }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-black/0" />
                <div className="absolute inset-0 flex items-center">
                  <div className="relative h-full w-full max-w-screen-2xl px-6 lg:px-8 mx-auto">
                    <div
                      className={`absolute left-6 top-1/2 -translate-y-1/2 uppercase text-white lg:left-8 ${fjalla.className}`}
                    >
                      <motion.div
                        className="text-2xl font-bold md:text-5xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.45 }}
                      >
                        {slide.headingLines.map((line, lineIndex) => (
                          <motion.span
                            key={line}
                            initial={{ x: -60, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.35, delay: 0.2 + lineIndex * 0.15 }}
                            className="block"
                          >
                            {line}
                          </motion.span>
                        ))}
                      </motion.div>
                      <HeadingTag className="sr-only">
                        {slide.headingLines.join(" ")}
                      </HeadingTag>

                      <motion.p
                        className="mt-2 hidden sm:block md:text-xl"
                        initial={{ x: -60, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.35, delay: 0.9 }}
                      >
                        {slide.subheading}
                      </motion.p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleGetQuote(slide.serviceSlug)}
                      className="absolute bottom-4 left-6 rounded-full bg-brand-yellow px-5 py-3 text-base text-neutral-900 shadow-lg transition-all hover:bg-[#e6a600] hover:shadow-xl sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:px-10 sm:py-4 sm:text-xl"
                    >
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-4 z-10 sm:bottom-6">
          <div className="mx-auto flex w-full max-w-screen-2xl justify-end px-6 lg:px-8">
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => heroScrollTo(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    selectedHeroIndex === index
                      ? "w-8 bg-brand-yellow"
                      : "w-2.5 bg-white/80 hover:bg-white"
                  }`}
                  aria-label={`Go to hero slide ${index + 1}`}
                  aria-current={selectedHeroIndex === index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 py-8 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-screen-2xl rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">
              Key stats
            </p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Numbers that show how we deliver
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {KEY_STATS.map((stat) => (
              <article
                key={stat.id}
                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5"
              >
                <p className="text-4xl font-semibold text-brand-yellow sm:text-5xl">
                  <AnimatedStatNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </p>
                <h3 className="mt-3 text-base font-semibold">{stat.label}</h3>
                <p className={`mt-2 text-sm leading-6 text-neutral-300 ${lato.className}`}>
                  {stat.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="services" className="py-8 lg:py-16">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Services
            </p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
              What we do
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-neutral-600 ${lato.className}`}>
              End-to-end aerial production designed to help your brand, listing,
              or event stand out with clear visual storytelling.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-screen-2xl">
          <div className="space-y-6 lg:space-y-8">
            {WHAT_WE_DO_FEATURES.map((feature, index) => (
              <ServiceFeature
                key={feature.id}
                serviceSlug={feature.slug}
                eyebrow={feature.eyebrow}
                title={feature.title}
                description={feature.description}
                highlights={feature.highlights}
                image={feature.image}
                imageAlt={feature.imageAlt}
                reversed={index % 2 === 1}
                onGetQuote={handleGetQuote}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="quote" className="px-6 py-8 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Pricing
            </p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Get an instant quote
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-600 ${lato.className}`}>
              Answer a few quick questions about your project and we&apos;ll give you
              a tailored estimate in seconds.
            </p>
          </div>
          <QuoteGenerator preselectedService={quoteService} />
        </div>
      </section>
      <section
        id="equipment"
        className="py-8 lg:py-16 px-6 lg:px-8 text-white bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
      >
        <div className="mx-auto text-center max-w-screen-2xl pb-10 ">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">
              Equipment
            </p>
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
              The gear behind each shot
            </h2>
            <p className={`mt-4 mx-auto max-w-2xl text-sm leading-7 text-neutral-300 ${lato.className}`}>
              We pair the right aircraft with the right objective—each platform
              performs differently in real shooting scenarios.
            </p>
        </div>
        <div className="mx-auto max-w-screen-2xl">
          <div className="space-y-4">
            {EQUIPMENT_FEATURES.map((equipment, index) => (
              <EquipmentFeature
                key={equipment.id}
                index={index + 1}
                name={equipment.name}
                blurb={equipment.blurb}
                howWeUseIt={equipment.howWeUseIt}
                image={equipment.image}
                imageAlt={equipment.imageAlt}
                reversed={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>
      <section id="gallery" className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl">
            Gallery
          </h2>
          <div className="columns-2 gap-4 sm:gap-6 md:columns-3 lg:columns-4">
            {GALLERY_IMAGE_URLS.map((imageUrl) => (
              <div
                key={imageUrl}
                className="mb-4 break-inside-avoid sm:mb-6"
              >
                <img
                  src={imageUrl}
                  alt=""
                  className="block h-auto w-full rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
