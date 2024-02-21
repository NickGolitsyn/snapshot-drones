import Image from "next/image";
import mainBg from "@/public/mainbg.jpg";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <h1 className="absolute left-0 top-1/2 -translate-y-1/2 transform pl-3 text-5xl font-bold uppercase text-white">
          Property
          <br />
          Photography
          <br />& Filming
        </h1>
        {/* <div className="absolute left-0 top-1/2 -translate-y-1/2 transform uppercase text-white">
          <h1 className=" text-5xl font-bold">
            Fresh
            <br />
            Perspectives
            <br />
            From <br />
            New Heights
          </h1>
          <h2>Property Photography & Filming</h2>
        </div> */}
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
