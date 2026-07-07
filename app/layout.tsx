import type { Metadata } from "next";
import { Oxygen, Fjalla_One } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";

const ostrich = localFont({
  src: "../public/OstrichSansBlack.otf",
  display: "swap",
});
const oxygen = Oxygen({ subsets: ["latin"], weight: ["300", "400", "700"] });
const fjalla = Fjalla_One({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Snapshot Drone Services",
  description: "Snapshot Drone Services",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
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
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
