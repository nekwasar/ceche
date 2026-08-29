"use client";

import { useEffect, useState } from "react";
import { getSubdomain, type Subdomain } from "@/lib/subdomain";
import { WwwHomepage } from "@/components/WwwHomepage";
import { AppHomepage } from "@/components/AppHomepage";

export default function HomePage() {
  const [subdomain, setSubdomain] = useState<Subdomain>("www");

  useEffect(() => {
    const host = window.location.hostname;
    setSubdomain(getSubdomain(host));
  }, []);

  if (subdomain === "app") {
    return <AppHomepage />;
  }

  return <WwwHomepage />;
}
