import Image from "next/image";
import logo from "@/public/snapshotLogo.svg";

export default function Navbar() {
  const navItems = [
    { id: 0, name: "Home", href: "/" },
    { id: 1, name: "Services V", href: "services" },
    { id: 2, name: "Portfolio", href: "portfolio" },
    { id: 3, name: "Reviews", href: "reviews" },
    { id: 4, name: `FAQ's`, href: "faq" },
    { id: 5, name: "Contact us", href: "contact" },
  ];
  return (
    <nav className="mx-auto flex max-w-screen-lg items-center justify-between px-5 py-6">
      <div className="flex items-center">
        <Image src={logo} className="h-16" alt={"logo"} />
        <div className="flex flex-col items-center">
          <h1 className="border-b border-black text-2xl font-bold">SNAPSHOT</h1>
          <p className="text-justify text-xs tracking-widest">DRONE SERVICES</p>
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
    </nav>
  );
}
