"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const navKeys = ["overview", "documentation", "apiReference", "faq", "contact", "changelog"] as const;
const navHrefs = ["/help", "/help/docs", "/help/api", "/help/faq", "/help/contact", "/help/changelog"];

export function DocsMiniNav() {
  const t = useTranslations("nav.sidebar");
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
          {navKeys.map((key, i) => {
            const active = isActive(navHrefs[i]);
            return (
              <a
                key={navHrefs[i]}
                href={navHrefs[i]}
                className={`block px-3 py-2 text-sm transition-all no-underline ${
                  active
                    ? "font-bold text-[#9E2A2B] border-b-2 border-[#9E2A2B]"
                    : "font-normal text-[#666] border-b-2 border-transparent hover:text-[#111]"
                }`}
              >
                {t(key)}
              </a>
            );
          })}
        </div>
      </nav>

      {/* Mobile horizontal nav */}
      <nav className="md:hidden overflow-x-auto py-4 -mx-4 px-4">
        <div className="flex gap-2 min-w-max">
          {navKeys.map((key, i) => {
            const active = isActive(navHrefs[i]);
            return (
              <a
                key={navHrefs[i]}
                href={navHrefs[i]}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap no-underline transition-all ${
                  active
                    ? "bg-[#9E2A2B] text-white"
                    : "bg-[#EFECE6] text-[#666] hover:bg-[#E5DFD3]"
                }`}
              >
                {t(key)}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
