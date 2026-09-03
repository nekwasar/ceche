"use client";

import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Overview", href: "/help" },
  { label: "Documentation", href: "/help/docs" },
  { label: "API Reference", href: "/help/api" },
  { label: "FAQ", href: "/help/faq" },
  { label: "Contact", href: "/help/contact" },
  { label: "Changelog", href: "/help/changelog" },
];

export function DocsMiniNav() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/help") return pathname === "/help";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:block sticky top-36 min-w-[180px] self-start py-6">
        <div className="flex flex-col gap-3">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 text-sm transition-all no-underline ${
                  active
                    ? "font-bold text-[#9E2A2B] border-b-2 border-[#9E2A2B]"
                    : "font-normal text-[#666] border-b-2 border-transparent hover:text-[#111]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile horizontal nav */}
      <nav className="md:hidden overflow-x-auto py-4 -mx-4 px-4">
        <div className="flex gap-2 min-w-max">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap no-underline transition-all ${
                  active
                    ? "bg-[#9E2A2B] text-white"
                    : "bg-[#EFECE6] text-[#666] hover:bg-[#E5DFD3]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
