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
          <h2 className="text-xs md:text-xl">
            Property Photography
            <br />& Filming
          </h2>
        </div>
        <button className="absolute bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-gray-300 px-8 py-3 text-lg transition-all hover:bg-white">
          Book now
        </button>
        <Image
          aria-hidden="true"
          className="w-full"
          src={mainBg}
          alt="backgroundimage"
        />
      </div>
      <div className="min-h-screen bg-gray-300 pt-10">
        <h1 className="text-center text-4xl">What we do</h1>
        <div className="mx-auto mt-8 grid max-w-screen-lg grid-cols-1 gap-4 px-5 sm:grid-cols-3">
          <div className="h-fit rounded-md bg-gray-400 px-6 py-5">
            <h2 className="text-2xl">Roof Inspection</h2>
            <p className={`mt-2 text-sm ${lato.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit
              amet enim sed dolor imperdiet placerat. Cras tempor metus ac purus
              fermentum feugiat. Nullam scelerisque dictum magna facilisis
              varius. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Quisque semper eleifend
              massa vel cursus. Etiam convallis augue vitae mi viverra, vitae
              venenatis diam consequat.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="#"
                className="rounded-full bg-yellow-400 px-8 py-3 transition-all hover:bg-yellow-300"
              >
                View
              </a>
            </div>
          </div>
          <div className="h-fit rounded-md bg-gray-400 px-8 py-5">
            <h2 className="text-2xl">Property Photography & Filming</h2>
            <p className={`mt-2 text-sm ${lato.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit
              amet enim sed dolor imperdiet placerat. Cras tempor metus ac purus
              fermentum feugiat. Nullam scelerisque dictum magna facilisis
              varius. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Quisque semper eleifend
              massa vel cursus. Etiam convallis augue vitae mi viverra, vitae
              venenatis diam consequat.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="#"
                className="rounded-full bg-yellow-400 px-8 py-3 transition-all hover:bg-yellow-300"
              >
                View
              </a>
            </div>
          </div>
          <div className="h-fit rounded-md bg-gray-400 px-8 py-5">
            <h2 className="text-2xl">Landscape Photography & Filming</h2>
            <p className={`mt-2 text-sm ${lato.className}`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit
              amet enim sed dolor imperdiet placerat. Cras tempor metus ac purus
              fermentum feugiat. Nullam scelerisque dictum magna facilisis
              varius. Class aptent taciti sociosqu ad litora torquent per
              conubia nostra, per inceptos himenaeos. Quisque semper eleifend
              massa vel cursus. Etiam convallis augue vitae mi viverra, vitae
              venenatis diam consequat.
            </p>
            <div className="mt-6 flex justify-center">
              <a
                href="#"
                className="rounded-full bg-yellow-400 px-8 py-3 transition-all hover:bg-yellow-300"
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
