import { Lato } from "next/font/google";
import roofImage from "../public/roof.png"; // Import the image

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

interface CardProps {
  title: string;
  description: string;
  imageUrl: string; // Rename the prop to 'imageUrl'
}

export default function Card({ title, description, imageUrl }: CardProps) {
  let imagePath;

  // Determine the image path based on the imageUrl prop
  switch (imageUrl) {
    case "roof.png":
      imagePath = roofImage;
      break;
    case "aerial.jpg":
      imagePath = require("../public/aerial.jpg"); // Use require for non-static imports
      break;
    case "wood.jpg":
      imagePath = require("../public/wood.jpg");
      break;
    // Add more cases for other images
    default:
      break;
  }

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-md">
      <div
        className={`absolute inset-0 bg-cover blur-[3px] brightness-75 transition-all duration-300 group-hover:scale-105 group-hover:blur-[2px] group-hover:brightness-100`}
        style={{ backgroundImage: `url(${imagePath})` }}
      ></div>

      <div className="relative flex h-full flex-col justify-between rounded-md p-6">
        <h2 className="text-xl text-white sm:text-2xl">{title}</h2>
        <p className={`mt-2 text-sm text-white ${lato.className}`}>
          {description}
        </p>

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
  );
}
