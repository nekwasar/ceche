const API_BASE: string =
  (import.meta.env.PUBLIC_API_URL as string | undefined) ?? "";

export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return API_BASE ? `${API_BASE.replace(/\/$/, "")}${p}` : p;
}

export async function apiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  return fetch(apiUrl(path), init);
}
