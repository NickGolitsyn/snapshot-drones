import type { Metadata } from "next";
import { Oxygen, Fjalla_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import localFont from "next/font/local";

const ostrich = localFont({
  src: "../public/OstrichSansBlack.otf",
  display: "swap",
});
const oxygen = Oxygen({ subsets: ["latin"], weight: ["300", "400", "700"] });
const fjalla = Fjalla_One({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fjalla.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
