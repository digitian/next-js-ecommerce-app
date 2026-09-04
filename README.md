# Marlow Home

A single-brand home & lifestyle e-commerce storefront — warm, minimal, Scandinavian-inspired furniture and decor. Built with Next.js 16 (App Router), React 19, and TypeScript, with a fully mocked backend so the whole experience runs with zero external services.

## What's here

A complete storefront experience, not just a product listing:

- **Catalog & discovery** — category browsing, filtering (price, category, rating), sorting, and infinite scroll on listing pages
- **Product pages** — image gallery, specifications, reviews, FAQs, care instructions, and similar-product recommendations
- **Cart & checkout** — a persisted Zustand cart, a multi-step checkout wizard (`react-hook-form` + `zod`) with shipping/payment validation, and a print-friendly order confirmation
- **Accounts** — session-based auth (login/register/forgot password), an account dashboard, and order history with per-order detail pages
- **Wishlist** — save products for later, synced per-session
- **Contact form** — Cloudflare Turnstile-verified, server-validated
- **Full SEO metadata** — every route exports page-specific `generateMetadata`

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, TypeScript, Tailwind CSS v4, shadcn/ui (base-ui) |
| State | Zustand (cart, auth, wishlist), each persisted to `localStorage` |
| Forms | react-hook-form + zod |
| Animation | motion (Framer Motion's successor) |

## Architecture: a mocked backend done properly

There is no database. This is deliberate — the project's goal is to demonstrate frontend and full-stack-shaped architecture without the overhead of standing up infrastructure for a demo. Instead:

```
Server Components  ──direct import──▶  src/lib/api/*.ts  ──▶  src/lib/api/mockdata/*.ts
   (page.tsx)                          (data-access layer)      (typed, in-memory "database")

Client Components  ──fetch()──▶  src/app/api/**/route.ts  ──▶  src/lib/api/*.ts
  ("use client")                  (Route Handlers, HTTP semantics,
                                    simulated network latency)
```

Server Components call the data-access layer directly — no HTTP round-trip. Client Components hit real Next.js Route Handlers, which simulate realistic latency, status codes, and auth checks against the same underlying data. Swapping the mock data-access layer for real database/API calls later would not require touching a single page or component — only `src/lib/api/*.ts`.

Auth follows the same idea: a real `httpOnly`/`secure` session cookie, set via a Server Action, checked against an in-memory user store. Order and wishlist endpoints independently verify resource ownership on both the API route and the server-rendered page — not just one or the other.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in a Turnstile site/secret key pair
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Test account:** `customer@example.com` / `Password123!` (shown on the login page itself).

## Testing

```bash
npm test              # unit + component + API route tests (Vitest)
npm run test:watch    # same, in watch mode
npm run test:e2e      # end-to-end flows (Playwright)
```

**Unit, component & API tests** (Vitest + React Testing Library, `*.test.ts`/`*.test.tsx` next to the code they cover) run against jsdom and don't need a running server — API route tests call the Next.js Route Handlers directly. They cover:

- Pure helpers and Zod schemas (currency formatting, the checkout form schema).
- The cart Zustand store (add/remove/update quantity, totals, checkout hand-off).
- The mock auth layer (login, session create/destroy, registration).
- Product card and cart item components (rendering, add-to-cart, wishlist toggle, quantity controls).
- `GET/POST/DELETE /api/wishlist`, `GET /api/orders/[id]` (including a 403 regression test for the IDOR fix — a signed-in user can't fetch another user's order), and `POST /api/contact` (validation-before-Turnstile ordering, and that the raw captcha token is never persisted).

**End-to-end tests** (Playwright, under `e2e/`) drive a real browser against a production build and cover the flows a reviewer is most likely to try by hand:

- Guest browses the catalog, adds a product to the cart, and completes checkout through to the order confirmation page.
- Logging in with the test account, viewing order history, and opening an order's detail page — plus the "can't view an order that isn't yours / doesn't exist" guard.
- Sorting and filtering the product listing page.

`npm run test:e2e` builds and starts the app itself (see `playwright.config.ts`), so no separate server needs to be running first.

## Known limitations

This is a frontend showcase, not a production system — worth being upfront about:

- **No real database.** All data lives in in-memory arrays inside the Next.js server process and resets on every restart. Orders/wishlists placed in one dev session won't survive a redeploy.
- **No real payment processing.** The checkout wizard collects and validates card details client-side but never sends them anywhere; "placing an order" just records a mock order.
- **Passwords are stored in plaintext** in the mock user store — fine for demo credentials, not a pattern to carry into a real backend.

## Project structure

```
src/
├── app/                 # App Router — pages, layouts, Route Handlers
│   ├── (storefront)/    # Public storefront: home, products, cart, checkout, account
│   ├── (auth)/           # Login, register, forgot-password
│   └── api/              # Mock REST API (Route Handlers)
├── components/
│   ├── ui/               # shadcn/ui primitives
│   ├── common/            # Shared composite components (header, footer)
│   └── features/          # Feature-specific components (cart, checkout, products…)
├── hooks/                 # Zustand stores
├── lib/
│   ├── api/               # Data-access layer + mock data (source of truth)
│   └── helpers/           # Formatting utilities (currency, etc.)
└── types/                 # Domain types, organized by feature
```

See [`AGENTS.md`](./AGENTS.md) for the full set of architectural conventions this codebase follows.

## License

MIT — see [`LICENSE`](./LICENSE).
