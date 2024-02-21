"use client";
import Image from "next/image";
import logo from "@/public/snapshotLogo.svg";
import { useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 0, name: "Home", href: "/" },
    { id: 1, name: "Services V", href: "services" },
    { id: 2, name: "Portfolio", href: "portfolio" },
    { id: 3, name: "Reviews", href: "reviews" },
    { id: 4, name: `FAQ's`, href: "faq" },
    { id: 5, name: "Contact us", href: "contact" },
  ];
  return (
    <header>
      {/* <nav className="mx-auto flex max-w-screen-lg items-center justify-between px-5 py-6">
        <div className="flex items-center">
          <Image src={logo} className="h-16" alt={"logo"} />
          <div className="flex flex-col items-center">
            <h1 className="border-b border-black text-2xl font-bold">
              SNAPSHOT
            </h1>
            <p className="text-justify text-xs tracking-widest">
              DRONE SERVICES
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <a className="py-2 text-[#FAB72D] underline" href="tel:+44572647478">
            07572 647 478
          </a>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.id} className="border-r border-black pr-4">
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav> */}
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <a className="flex items-center" href="/">
          <Image src={logo} className="h-16" alt={"logo"} />
          <div className="flex flex-col items-center">
            <h1 className="border-b border-black text-2xl font-bold">
              SNAPSHOT
            </h1>
            <p className="text-justify text-xs tracking-widest">
              DRONE SERVICES
            </p>
          </div>
        </a>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden flex-col items-end lg:flex">
          <a className="py-2 text-[#FAB72D] underline" href="tel:+44572647478">
            07572 647 478
          </a>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.id} className="border-r border-black pr-4">
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
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
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
