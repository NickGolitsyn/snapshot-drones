"use client";
import Image from "next/image";
import logo from "@/public/logo-2026.svg";
import mobileLogo from "@/public/mobile-logo-2026.svg";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import localFont from "next/font/local";
import { Fjalla_One } from "next/font/google";
import { useEffect } from "react";

const ostrich = localFont({
  src: "../public/OstrichSansBlack.otf",
  display: "swap",
});

const fjalla = Fjalla_One({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: 0, name: "Home", href: "/" },
    { id: 1, name: "Services", href: "/#services" },
    { id: 2, name: "Equipment", href: "/#equipment" },
    { id: 3, name: "Get a Quote", href: "/#quote" },
    { id: 5, name: "Portfolio", href: "/#gallery" },
  ];
  return (
    <header
      id="site-header"
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/85" : "bg-white",
      )}
    >
      <nav
        className={cn(
          "mx-auto flex max-w-screen-2xl items-center justify-between px-6 transition-all duration-300 lg:px-8",
          isScrolled ? "py-3" : "py-6",
        )}
        aria-label="Global"
      >
        <motion.a
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -25 }}
          transition={{ delay: 0.35 }}
          className="flex items-center gap-2 sm:gap-3"
          href="/"
        >
          <Image
            src={logo}
            className={cn(
              "h-16 w-16 shrink-0 origin-center object-contain transition-all duration-500",
              isScrolled
                ? "h-12 w-12 translate-x-0 rotate-90"
                : "-translate-x-2 sm:-translate-x-1 rotate-0",
            )}
            alt={"logo"}
          />
          <div className="flex flex-col items-center">
            <h1
              className={cn(
                `text-2xl lg:text-3xl font-bold ${fjalla.className}`,
                isScrolled ? "border-b-0" : "border-b border-black",
              )}
            >
              SNAPSHOT
            </h1>
            <p
              className={cn(
                `w-full overflow-hidden text-center text-sm tracking-[0.03em] lg:tracking-[0.15em] transition-all duration-300 ${fjalla.className}`,
                isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
              )}
              aria-hidden={isScrolled}
            >
              DRONE SERVICES
            </p>
          </div>
        </motion.a>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:flex">
          <motion.ul
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 25 }}
            transition={{ delay: 0.35 }}
            className="flex items-center gap-3"
          >
            <a
              className="inline-flex items-center gap-2 rounded-full bg-[#FAB72D] px-3 py-2 text-sm font-medium text-neutral-900 hover:bg-[#e6a600]"
              href="tel:+44572647478"
              aria-label="Call 07572 647 478"
            >
              <PhoneIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="hidden lg:inline">07572 647 478</span>
            </a>
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <NavigationMenuLink
                      asChild
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent",
                      )}
                    >
                      <Link href={item.href}>{item.name}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </motion.ul>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10">
          <div className="flex items-center justify-between">
            <a className="h-16 w-16 outline-none" href="/">
              <Image src={mobileLogo} className="h-16" alt={"logo"} />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-neutral-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-neutral-500/10">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-neutral-900 hover:bg-neutral-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  className="py-2 pl-2 pr-4 text-base text-[#FAB72D] underline"
                  href="tel:+44572647478"
                >
                  07572 647 478
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
