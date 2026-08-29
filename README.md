# Ceche Web

Marketing site and admin panel for [Ceche](https://github.com/nekwasar/ceche) —
the domain appraisal engine. Built with Astro (SSG + SSR hybrid), Tailwind CSS,
and DaisyUI. Consumes the Ceche HTTP API over HTTPS.

## Prerequisites

- Node.js 20+
- A running Ceche API (see [`nekwasar/ceche`](https://github.com/nekwasar/ceche))

## Setup

```bash
npm ci
cp .env.example .env.local   # set PUBLIC_API_URL
npm run dev                  # http://localhost:4321
```

## Environment Variables

| Variable | Description |
|---|---|
| `PUBLIC_API_URL` | Base URL of the Ceche API (e.g. `https://api.ceche.app`). Leave empty to use same-origin relative paths behind Nginx. |

## Build

```bash
npm run build                # outputs to dist/ (Node standalone server)
npm run preview
```

## Deploy

Deployed to Vercel via `.github/workflows/web.yml` on pushes to `main`.
Set `PUBLIC_API_URL` (plus `VERCEL_TOKEN`, `VERCEL_ORG_ID`,
`VERCEL_PROJECT_ID`) as repository secrets.

The API must allow this site's origin via the `CECHE_CORS_ORIGINS` env var on
the Ceche API server.

## Structure

- `src/pages/` — routes (public pages + `admin/*` panel)
- `src/layouts/` — `Base.astro` (public), `Admin.astro` (auth shell)
- `src/components/` — Nav, Footer, markdown renderer
- `src/lib/api.ts` — API base-URL helper (uses `PUBLIC_API_URL`)
