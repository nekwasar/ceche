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
    <nav
      style={{
        position: "sticky",
        top: 144,
        minWidth: 180,
        alignSelf: "flex-start",
        background: "transparent",
        padding: "24px 0",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <a
              key={link.href}
              href={link.href}
              style={{
                display: "block",
                padding: "8px 12px",
                fontSize: 14,
                fontWeight: active ? 700 : 400,
                color: active ? "#9E2A2B" : "#666666",
                textDecoration: "none",
                borderBottom: active ? "2px solid #9E2A2B" : "2px solid transparent",
                transition: "all 0.15s ease",
              }}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
