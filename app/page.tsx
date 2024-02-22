import Image from "next/image";
import mainBg from "@/public/mainbg.jpg";
import { Fjalla_One } from "next/font/google";

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
        <Image
          aria-hidden="true"
          className="w-full"
          src={mainBg}
          alt="backgroundimage"
        />
      </div>
    </main>
  );
}
