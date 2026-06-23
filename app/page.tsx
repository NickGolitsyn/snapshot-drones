"use client";
import { animate, motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Fjalla_One, Lato } from "next/font/google";
import { QuoteGenerator } from "@/components/QuoteGenerator";
import { useCallback, useEffect, useRef, useState } from "react";
import equipmentFeatures from "@/data/home/equipment-features.json";
import galleryImageUrls from "@/data/home/gallery.json";
import keyStats from "@/data/home/key-stats.json";
import whatWeDoFeatures from "@/data/home/what-we-do-features.json";
import siteContact from "@/data/site-contact.json";
import type { ServiceSlug } from "@/lib/site-services";
import { Mail, Phone } from "lucide-react";
import type { CSSProperties } from "react";

type WhatWeDoFeature = {
  id: number;
  slug: ServiceSlug;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
};

const whatWeDoFeaturesTyped = whatWeDoFeatures as WhatWeDoFeature[];
// const HERO_VIDEO_SRC = "/hero-video.mp4";
const HERO_VIDEO_SRC = "https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XMnnXiFG30ps6QvySjcKGdexLHiZt7ognm9OC";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
const fjalla = Fjalla_One({ subsets: ["latin"], weight: "400" });

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
          How I use it
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
  const heroSectionRef = useRef<HTMLElement | null>(null);

  const [headerHeight, setHeaderHeight] = useState(96);
  const [quoteService, setQuoteService] = useState<ServiceSlug | null>(null);

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
        aria-label="Snapshot drone photography and filming"
        style={{ "--header-height": `${headerHeight}px` } as CSSProperties}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-screen-2xl items-center px-6 lg:px-8">
          <div className="max-w-2xl text-white">
            <motion.p
              className={`text-sm font-semibold uppercase tracking-[0.22em] text-brand-yellow ${lato.className}`}
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              Drone photography & filming
            </motion.p>
            <motion.h1
              className={`mt-4 text-4xl uppercase leading-none sm:text-6xl lg:text-7xl ${fjalla.className}`}
              initial={{ x: -52, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              Fresh perspectives from new heights
            </motion.h1>
            <motion.p
              className={`mt-5 max-w-xl text-base leading-7 text-white/85 sm:text-lg ${lato.className}`}
              initial={{ x: -44, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              Aerial visuals for property, events, landscapes, inspections, and
              custom commercial projects across Norfolk and East Anglia.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap items-center gap-3"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.55 }}
            >
              <button
                type="button"
                onClick={() => handleGetQuote("real-estate")}
                className="rounded-full bg-brand-yellow px-6 py-3 text-base font-semibold text-neutral-900 shadow-lg transition-all hover:bg-[#e6a600] hover:shadow-xl sm:px-8"
              >
                Book now
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("services")}
                className="rounded-full border border-white/45 bg-white/10 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:px-8"
              >
                View services
              </button>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="px-6 py-8 lg:py-16 lg:px-8">
        <div className="mx-auto max-w-screen-2xl rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 px-6 py-10 text-white sm:px-10 sm:py-12">
          <div className="max-w-2xl">
            {/* <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow">
              Key stats
            </p> */}
            <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Key stats
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {keyStats.map((stat) => (
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
              What I do
            </h2>
            <p className={`mx-auto mt-4 max-w-2xl text-neutral-600 ${lato.className}`}>
              End-to-end aerial production designed to help your brand, listing,
              or event stand out with clear visual storytelling.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-screen-2xl">
          <div className="space-y-6 lg:space-y-8">
            {whatWeDoFeaturesTyped.map((feature, index) => (
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
              Answer a few quick questions about your project and I&apos;ll give you
              a tailored estimate in seconds.
            </p>
          </div>
          <QuoteGenerator preselectedService={quoteService} />
        </div>
      </section>
      <section
        id="custom-quote"
        className="border-t border-neutral-200 bg-neutral-50 px-6 py-10 lg:px-8 lg:py-16"
        aria-labelledby="custom-quote-heading"
      >
        <div className="mx-auto max-w-screen-2xl">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Custom projects
            </p>
            <h2
              id="custom-quote-heading"
              className="mt-2 text-3xl font-semibold sm:text-4xl"
            >
              Need something more custom?
            </h2>
            <p
              className={`mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-600 ${lato.className}`}
            >
              Every project is different. If you&apos;re looking for something
              tailored—whether it&apos;s a larger property, land, events, or
              specific shots—I can create a custom package to suit your needs.
            </p>
            <p
              className={`mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-600 ${lato.className}`}
            >
              I primarily operate across Norfolk and East Anglia.
            </p>
            <p
              className={`mx-auto mt-3 max-w-2xl text-sm leading-7 text-neutral-600 ${lato.className}`}
            >
              For high-value and large-scale production projects, I&apos;m
              available to travel nationwide or internationally by arrangement.
            </p>
            <p
              className={`mx-auto mt-3 max-w-2xl text-sm leading-7 text-neutral-600 ${lato.className}`}
            >
              Get in touch by phone, text, WhatsApp, or email and I&apos;ll
              work out the details together.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={siteContact.telHref}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50"
              >
                <Phone className="h-4 w-4 shrink-0 text-neutral-600" aria-hidden />
                Call {siteContact.phoneLabel}
              </a>
              <a
                href={siteContact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#20bd5a]"
              >
                <span className="inline-block h-4 w-4 shrink-0" aria-hidden>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </span>
                WhatsApp
              </a>
              {siteContact.email.trim() !== "" ? (
                <a
                  href={`mailto:${siteContact.email.trim()}?subject=${encodeURIComponent("Custom drone package enquiry")}`}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:border-neutral-300 hover:bg-neutral-50"
                >
                  <Mail className="h-4 w-4 shrink-0 text-neutral-600" aria-hidden />
                  Email
                </a>
              ) : null}
            </div>
          </motion.div>
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
              I pair the right aircraft with the right objective—each platform
              performs differently in real shooting scenarios.
            </p>
        </div>
        <div className="mx-auto max-w-screen-2xl">
          <div className="space-y-4">
            {equipmentFeatures.map((equipment, index) => (
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
            {galleryImageUrls.map((imageUrl) => (
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
