"use client";
import Image from "next/image";
import logo from "@/public/logo-2026.svg";
import { Fragment, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { Dialog, Transition } from "@headlessui/react";
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

function BrandLockup({
  isScrolled,
  className,
  variant = "header",
}: {
  isScrolled: boolean;
  className?: string;
  variant?: "header" | "menu";
}) {
  const TitleTag = variant === "header" ? "h1" : "span";
  const SubtitleTag = variant === "header" ? "p" : "span";

  return (
    <a
      className={cn(
        "flex items-center",
        isScrolled ? "gap-2 sm:gap-3" : "gap-1.5 sm:gap-2",
        className,
      )}
      href="/"
    >
      <Image
        src={logo}
        className={cn(
          "shrink-0 origin-center object-contain transition-all duration-500",
          isScrolled ? "h-12 w-12 rotate-90" : "h-16 w-3 rotate-0",
        )}
        alt="Snapshot Drone Services logo"
      />
      <div className="flex flex-col items-center">
        <TitleTag
          className={cn(
            `text-2xl font-bold lg:text-3xl ${fjalla.className}`,
            isScrolled ? "border-b-0" : "border-b border-black",
          )}
        >
          SNAPSHOT
        </TitleTag>
        <SubtitleTag
          className={cn(
            `w-full overflow-hidden text-center text-sm tracking-[0.03em] transition-all duration-300 lg:tracking-[0.15em] ${fjalla.className}`,
            isScrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100",
          )}
          aria-hidden={isScrolled}
        >
          DRONE SERVICES
        </SubtitleTag>
      </div>
    </a>
  );
}

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
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -25 }}
          transition={{ delay: 0.35 }}
        >
          <BrandLockup isScrolled={isScrolled} />
        </motion.div>
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
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 md:hidden" onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900/20 backdrop-blur-[2px]" aria-hidden="true" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-300"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-200"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto flex h-full w-screen max-w-sm flex-col overflow-y-auto bg-white px-6 pb-6 shadow-xl ring-1 ring-neutral-900/10 sm:py-6">
                    <div className="flex min-h-16 items-center justify-between gap-4">
                      <BrandLockup isScrolled={isScrolled} className="min-w-0" variant="menu" />
                      <button
                        type="button"
                        className="-m-2.5 shrink-0 rounded-md p-2.5 text-neutral-700"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-6 flow-root flex-1">
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
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
