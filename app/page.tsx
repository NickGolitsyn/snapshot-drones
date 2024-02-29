import Image from "next/image";
import mainBg from "@/public/mainbg.jpg";
import { Fjalla_One, Lato } from "next/font/google";
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
const fjalla = Fjalla_One({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <main>
      <div className="relative">
        {/* <h1 className="absolute left-0 top-1/2 -translate-y-1/2 transform pl-3 text-5xl font-bold uppercase text-white">
          Property
          <br />
          Photography
          <br />& Filming
        </h1> */}
        <div
          className={`absolute left-0 top-1/2 -translate-y-1/2 transform pl-5 uppercase text-white ${fjalla.className}`}
        >
          <h1 className="bg-gradient-to-b from-[#FAB72D] to-white bg-clip-text text-xl font-bold text-transparent md:text-5xl">
            Fresh
            <br />
            Perspectives
            <br />
            From New
            <br />
            Heights
          </h1>
          <h2 className="hidden sm:block md:text-xl">
            Property Photography
            <br />& Filming
          </h2>
        </div>
        <button className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-neutral-300 px-3 py-2 text-sm transition-all hover:bg-white sm:bottom-10 sm:px-8 sm:py-3 sm:text-lg">
          Book now
        </button>
        <Image
          aria-hidden="true"
          className="w-full"
          src={mainBg}
          alt="backgroundimage"
        />
      </div>
      <div className="min-h-screen bg-neutral-300 pt-10">
        <h1 className="text-center text-2xl sm:text-4xl">What we do</h1>
        <div className="mx-auto mt-8 grid max-w-screen-lg grid-cols-1 gap-4 px-5 sm:grid-cols-3">
          <div className="flex flex-col justify-between rounded-md bg-neutral-400 px-6 py-5">
            <div>
              <h2 className="text-xl sm:text-2xl">Roof Inspection</h2>
              <p className={`mt-2 text-sm ${lato.className}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                sit amet enim sed dolor imperdiet placerat. Cras tempor metus ac
                purus fermentum feugiat. Nullam scelerisque dictum magna
                facilisis varius. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Quisque
                semper eleifend massa vel cursus. Etiam convallis augue vitae mi
                viverra, vitae venenatis diam consequat.
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <a
                href="#"
                className="rounded-full bg-yellow-400 px-5 py-2 transition-all hover:bg-yellow-300 sm:px-8 sm:py-3"
              >
                View
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-md bg-neutral-400 px-8 py-5">
            <div>
              <h2 className="text-xl sm:text-2xl">
                Property Photography & Filming
              </h2>
              <p className={`mt-2 text-sm ${lato.className}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                sit amet enim sed dolor imperdiet placerat. Cras tempor metus ac
                purus fermentum feugiat. Nullam scelerisque dictum magna
                facilisis varius. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Quisque
                semper eleifend massa vel cursus. Etiam convallis augue vitae mi
                viverra, vitae venenatis diam consequat.
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <a
                href="#"
                className="rounded-full bg-yellow-400 px-5 py-2 transition-all hover:bg-yellow-300 sm:px-8 sm:py-3"
              >
                View
              </a>
            </div>
          </div>
          <div className="flex flex-col justify-between rounded-md bg-neutral-400 px-8 py-5">
            <div>
              <h2 className="text-xl sm:text-2xl">
                Landscape Photography & Filming
              </h2>
              <p className={`mt-2 text-sm ${lato.className}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                sit amet enim sed dolor imperdiet placerat. Cras tempor metus ac
                purus fermentum feugiat. Nullam scelerisque dictum magna
                facilisis varius. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Quisque
                semper eleifend massa vel cursus. Etiam convallis augue vitae mi
                viverra, vitae venenatis diam consequat.
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <a
                href="#"
                className="rounded-full bg-yellow-400 px-5 py-2 transition-all hover:bg-yellow-300 sm:px-8 sm:py-3"
              >
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
