"use client";
import Image from "next/image";
import logo from "@/public/snapshotLogo.svg";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import localFont from "next/font/local";
import { Fjalla_One } from "next/font/google";

const ostrich = localFont({
  src: "../public/OstrichSansBlack.otf",
  display: "swap",
});

const fjalla = Fjalla_One({ subsets: ["latin"], weight: "400" });

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 0, name: "Home", href: "/" },
    {
      id: 1,
      name: "Services",
      href: "/services",
      subItems: [
        { id: 0, subName: "Property", subHref: "/property" },
        { id: 1, subName: "Landscape", subHref: "/landscape" },
        { id: 2, subName: "Photography", subHref: "/photography" },
        { id: 3, subName: "Videography", subHref: "/videography" },
      ],
    },
    { id: 2, name: "Portfolio", href: "/portfolio" },
    { id: 3, name: "Reviews", href: "/reviews" },
    { id: 4, name: `FAQ's`, href: "/faq" },
    { id: 5, name: "Contact us", href: "/contact" },
  ];
  return (
    <header>
      <nav
        className="mx-auto flex max-w-screen-lg items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <a className="flex items-center" href="/">
          <Image src={logo} className="h-16" alt={"logo"} />
          <div className="flex flex-col items-center">
            <h1
              className={`border-b border-black text-4xl font-bold ${fjalla.className}`}
            >
              SNAPSHOT
            </h1>
            <p
              className={`w-full text-center text-sm tracking-[0.25em] ${fjalla.className}`}
            >
              DRONE SERVICES
            </p>
          </div>
        </a>
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden flex-col items-end md:flex">
          <div>
            <a
              className="py-2 pl-2 pr-4 text-sm text-[#FAB72D] underline"
              href="tel:+44572647478"
            >
              07572 647 478
            </a>
          </div>

          <ul className="flex space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.subItems ? (
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          {item.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            {item.subItems.map((subItem) => (
                              <ListItem
                                key={subItem.id}
                                href={`/services/${subItem.subHref}`}
                                title={subItem.subName}
                              >
                                {subItem.subName}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    ) : (
                      <NavigationMenuItem key={item.id}>
                        <Link href={item.href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            {item.name}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    )}
                  </React.Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </ul>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a className="flex items-center" href="/">
              <Image src={logo} className="h-16 rotate-90" alt={"logo"} />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  className="py-2 pl-2 pr-4 text-sm text-[#FAB72D] underline"
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

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
