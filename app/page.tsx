"use client";
import Image from "next/image";
import mainBg from "@/public/mainbg.jpg";
import { motion } from "framer-motion";
import { Fjalla_One, Lato } from "next/font/google";
import { Contact } from "@/components/Contact";
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
const fjalla = Fjalla_One({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main className="space-y-10">
      <section className="relative">
        <img
          aria-hidden="true"
          className="w-full"
          src="https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XEIYtQoCesMqY1F3gS2wk8vOtIjzUGKpVcmx0"
          alt="Homepage Background"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="relative h-full w-full max-w-screen-2xl px-6 lg:px-8 mx-auto">
            <div
              className={`absolute left-6 top-1/2 -translate-y-1/2 uppercase text-white lg:left-8 ${fjalla.className}`}
            >
              <motion.h1
                className="text-xl font-bold md:text-5xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Fresh
                </motion.span>
                <br />
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Perspectives
                </motion.span>
                <br />
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  From New
                </motion.span>
                <br />
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  Heights
                </motion.span>
              </motion.h1>

              <motion.h2
                className="hidden sm:block md:text-xl"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  Property Photography
                </motion.span>
                <br />
                <motion.span
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                >
                  & Filming
                </motion.span>
              </motion.h2>
            </div>
            <button className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-brand-yellow px-5 py-3 text-base font-semibold text-neutral-900 shadow-lg transition-all hover:bg-[#e6a600] hover:shadow-xl sm:bottom-10 sm:px-10 sm:py-4 sm:text-xl">
              Book now
            </button>
          </div>
        </div>
      </section>
      <section className="pt-10 px-6 lg:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <h1 className="text-center text-2xl sm:text-4xl">What we do</h1>
          <div className="mx-auto mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {/* {data.cards.map((e, index) => (
          <Card title={e.title} description={e.description} image={e.image} key={index} />
        ))} */}
          <div className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-md sm:min-h-0 sm:aspect-[9/16]">
            <img
              src="/roof.png"
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover brightness-75 blur-[3px] transition-all duration-300 group-hover:scale-105 group-hover:blur-[2px] group-hover:brightness-100"
            />
            <div className="relative flex flex-1 flex-col justify-between rounded-md p-6">
              <div>
                <h2 className="text-xl text-white sm:text-2xl">
                  Roof Inspection
                </h2>
                <p className={`mt-2 text-sm text-white ${lato.className}`}>
                  High-resolution drone and ground-level roof surveys to spot
                  damage, wear, and maintenance issues. Perfect for surveys,
                  insurance, and pre-sale checks—we deliver clear imagery and
                  reports you can rely on.
                </p>
              </div>
              <div className="mt-6 flex justify-center">
                <a
                  href="#"
                  className="rounded-full bg-brand-yellow px-5 py-2 font-medium text-neutral-900 transition-all hover:bg-[#e6a600] sm:px-8 sm:py-3"
                >
                  View
                </a>
              </div>
            </div>
          </div>
          <div className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-md sm:min-h-0 sm:aspect-[9/16]">
            <img
              src="/aerial.jpg"
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover brightness-75 blur-[3px] transition-all duration-300 group-hover:scale-105 group-hover:blur-[2px] group-hover:brightness-100"
            />
            <div className="relative flex flex-1 flex-col justify-between rounded-md p-6">
              <div>
                <h2 className="text-xl text-white sm:text-2xl">
                  Property Photography & Filming
                </h2>
                <p className={`mt-2 text-sm text-white ${lato.className}`}>
                  Showcase your property at its best with professional stills and
                  video. We capture interiors and exteriors in sharp detail with
                  natural and staged lighting, wide angles, and smooth footage so
                  listings stand out and viewings feel like a real visit.
                </p>
              </div>
              <div className="mt-6 flex justify-center">
                <a
                  href="#"
                  className="rounded-full bg-brand-yellow px-5 py-2 font-medium text-neutral-900 transition-all hover:bg-[#e6a600] sm:px-8 sm:py-3"
                >
                  View
                </a>
              </div>
            </div>
          </div>
          <div className="group relative flex min-h-[420px] flex-col overflow-hidden rounded-md sm:min-h-0 sm:aspect-[9/16]">
            <img
              src="/wood.jpg"
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover brightness-75 blur-[3px] transition-all duration-300 group-hover:scale-105 group-hover:blur-[2px] group-hover:brightness-100"
            />
            <div className="relative flex flex-1 flex-col justify-between rounded-md p-6">
              <div>
                <h2 className="text-xl text-white sm:text-2xl">
                  Landscape Photography & Filming
                </h2>
                <p className={`mt-2 text-sm text-white ${lato.className}`}>
                  From gardens and parks to estates and rural views, we deliver
                  striking landscape photography and film. Ideal for developers,
                  agents, and private owners who want to highlight location,
                  greenery, and outdoor space.
                </p>
              </div>
              <div className="mt-6 flex justify-center">
                <a
                  href="#"
                  className="rounded-full bg-brand-yellow px-5 py-2 font-medium text-neutral-900 transition-all hover:bg-[#e6a600] sm:px-8 sm:py-3"
                >
                  View
                </a>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
      <section className="relative min-h-0 overflow-hidden py-10 md:min-h-[50vh]">
        <img
          src="https://0ge3dw2wm7.ufs.sh/f/mPbrJhIiM38XEsmCtresMqY1F3gS2wk8vOtIjzUGKpVcmx0i"
          alt="contact form background"
          aria-hidden
          className="absolute inset-0 hidden h-full w-full object-cover object-right md:block"
        />
        <div className="relative z-10 mx-auto max-w-screen-2xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="rounded-md bg-white px-6 py-4">
              <h2 className="mb-4 font-medium text-neutral-700">
                Fill out this form to select a service
              </h2>
              <Contact />
            </div>
          </div>
        </div>
      </section>
      <section className="px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="mb-8 text-center text-2xl font-semibold sm:text-3xl">
            Gallery
          </h2>
          <div className="columns-2 gap-4 sm:gap-6 md:columns-3 lg:columns-4">
            {[
              "masonry-1.jpg",
              "masonry-2.jpg",
              "masonry-3.jpg",
              "masonry-4.jpg",
              "masonry-5.jpg",
              "masonry-6.jpg",
              "masonry-7.jpg",
              "masonry-8.jpg",
              "masonry-9.jpg",
              "masonry-10.jpg",
              "masonry-11.jpg",
              "masonry-12.jpg",
              "masonry-13.jpg",
              "masonry-14.jpg",
              "masonry-15.jpg",
            ].map((name) => (
              <div
                key={name}
                className="mb-4 break-inside-avoid sm:mb-6"
              >
                <img
                  src={`/masonry/${name}`}
                  alt=""
                  className="w-full rounded-md object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
