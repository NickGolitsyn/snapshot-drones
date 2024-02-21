import Image from "next/image";
import mainBg from "@/public/mainbg.jpg";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <h1 className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-5xl font-bold uppercase text-white">
          Property
          <br />
          Photography
          <br />& Filming
        </h1>
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
