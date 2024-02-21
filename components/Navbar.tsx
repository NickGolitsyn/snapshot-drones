export default function Navbar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services V", href: "services" },
    { name: "Portfolio", href: "portfolio" },
    { name: "Reviews", href: "reviews" },
    { name: `FAQ's`, href: "faq" },
    { name: "Contact us", href: "contact" },
  ];
  return (
    <nav className="mx-auto flex max-w-screen-lg items-center justify-between px-5 py-6">
      <div className="flex flex-col items-center">
        <h1 className="border-b border-black text-2xl font-bold">SNAPSHOT</h1>
        <p className="text-justify text-xs tracking-widest">DRONE SERVICES</p>
      </div>
      <div className="flex flex-col items-end">
        <a className="py-2 text-[#FAB72D] underline" href="tel:+44572647478">
          07572 647 478
        </a>
        <ul className="flex space-x-4">
          {navItems.map((item) => (
            <li className="border-r border-black pr-4">
              <a href={item.href}>{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
