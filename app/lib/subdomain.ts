export type Subdomain = "app" | "www";

export function getSubdomain(host: string): Subdomain {
  const hostname = host.split(":")[0];
  if (hostname.startsWith("app.")) return "app";
  return "www";
}

export function isAppSubdomain(host: string): boolean {
  return getSubdomain(host) === "app";
}

export function isWwwSubdomain(host: string): boolean {
  return getSubdomain(host) === "www";
}
