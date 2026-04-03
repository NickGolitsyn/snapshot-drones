"use client";
import { animate, motion, useInView, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Fjalla_One, Lato } from "next/font/google";
import { QuoteGenerator } from "@/components/QuoteGenerator";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import equipmentFeatures from "@/data/home/equipment-features.json";
import galleryImageUrls from "@/data/home/gallery.json";
import heroSlides from "@/data/home/hero-slides.json";
import keyStats from "@/data/home/key-stats.json";
import whatWeDoFeatures from "@/data/home/what-we-do-features.json";
import type { ServiceSlug } from "@/lib/site-services";

type HeroSlide = {
  id: number;
  serviceSlug: ServiceSlug;
  image: string;
  imageAlt: string;
  headingLines: string[];
  subheading: string;
  cta: string;
};

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

const heroSlidesTyped = heroSlides as HeroSlide[];
const whatWeDoFeaturesTyped = whatWeDoFeatures as WhatWeDoFeature[];

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
            {heroSlidesTyped.map((slide, index) => {
              const HeadingTag = index === 0 ? "h1" : "h2";
              return (
              <article
                key={slide.id}
                className="relative h-full min-w-0 flex-[0_0_100%] overflow-hidden"
                aria-roledescription="slide"
                aria-label={`${slide.id} of ${heroSlidesTyped.length}`}
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
              {heroSlidesTyped.map((slide, index) => (
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
