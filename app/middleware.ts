import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale } from "./i18n/config";
import { getSubdomain } from "./lib/subdomain";

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: true,
});

const APP_ONLY_PATHS = ["/login", "/signup", "/api-keys", "/appraise", "/scan", "/reveal"];
const WWW_ONLY_PATHS = ["/platform", "/solutions", "/resources", "/pricing", "/legal", "/company"];

function isAppOnlyPath(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(en|fr|de|es|pt|ko|zh|ja|it)(\/|$)/, "/") || "/";
  return APP_ONLY_PATHS.some((p) => pathWithoutLocale.startsWith(p));
}

function isWwwOnlyPath(pathname: string): boolean {
  const pathWithoutLocale = pathname.replace(/^\/(en|fr|de|es|pt|ko|zh|ja|it)(\/|$)/, "/") || "/";
  return WWW_ONLY_PATHS.some((p) => pathWithoutLocale.startsWith(p));
}

function removeLocalePrefix(pathname: string): string {
  const segments = pathname.split("/");
  if (locales.includes(segments[1] as any)) {
    segments.splice(1, 1);
  }
  return segments.join("/") || "/";
}

export default function middleware(request: NextRequest) {
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || "";
  const hostname = host.split(":")[0];
  const pathname = request.nextUrl.pathname;

  if (hostname === "ceche.net") {
    const url = request.nextUrl.clone();
    url.hostname = "www.ceche.net";
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  const subdomain = getSubdomain(host);

  if (subdomain === "www" && isAppOnlyPath(pathname)) {
    const cleanPath = removeLocalePrefix(pathname);
    const url = request.nextUrl.clone();
    url.hostname = "app.ceche.net";
    url.pathname = cleanPath;
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  if (subdomain === "app" && isWwwOnlyPath(pathname)) {
    const cleanPath = removeLocalePrefix(pathname);
    const url = request.nextUrl.clone();
    url.hostname = "www.ceche.net";
    url.pathname = cleanPath;
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  const response = intlMiddleware(request);

  if (response instanceof NextResponse) {
    const locale = response.headers.get("x-middleware-locale");
    if (locale === "en" && pathname.startsWith("/en")) {
      const url = request.nextUrl.clone();
      url.pathname = pathname.replace("/en", "") || "/";
      return NextResponse.redirect(url, 301);
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
