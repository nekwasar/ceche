"use client";

import { useEffect, useState } from "react";
import { getSubdomain, type Subdomain } from "@/lib/subdomain";
import { Navbar } from "./Navbar";
import { AppHeader } from "./AppHeader";
import { Footer } from "./Footer";

export function SubdomainLayout({ children }: { children: React.ReactNode }) {
  const [subdomain, setSubdomain] = useState<Subdomain>("www");

  useEffect(() => {
    const host = window.location.hostname;
    setSubdomain(getSubdomain(host));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {subdomain === "www" ? <Navbar /> : <AppHeader />}
      <main className="flex-1">{children}</main>
      {subdomain === "www" && <Footer />}
    </div>
  );
}
