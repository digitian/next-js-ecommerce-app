<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Project: nextjs-ecommerce

## Overview

A **single-brand home/lifestyle e-commerce storefront** (IKEA/Muji-inspired) built with Next.js 16, React 19, and TypeScript. This is the **frontend only** — the backend does not exist yet. All API interactions are mocked via Next.js Route Handlers serving static data.

**Phase**: Frontend development with mocked backend  
**Stack**: Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui (base-vega style) · Zustand · Auth.js · next-intl · react-hook-form + zod

---

## Directory Structure

All source code lives under `src/`. Respect this structure strictly — do not create files outside of it (except config files at the project root).

```
src/
├── app/                              # Next.js App Router (pages & layouts)
│   ├── api/                          # Route Handlers — mock backend endpoints
│   │   ├── products/
│   │   │   ├── route.ts              # GET /api/products (listing, filtering, pagination)
│   │   │   └── [slug]/
│   │   │       └── route.ts          # GET /api/products/:slug
│   │   ├── cart/
│   │   │   └── route.ts              # GET, POST, PUT, DELETE /api/cart
│   │   ├── orders/
│   │   │   └── route.ts              # GET, POST /api/orders
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts          # Auth.js catch-all handler
│   │   └── blog/
│   │       └── route.ts              # GET /api/blog
│   ├── (storefront)/                 # Public storefront routes
│   │   ├── page.tsx                  # Home / landing page
│   │   ├── layout.tsx                # Storefront layout
│   │   ├── products/
│   │   │   ├── page.tsx              # Product listing (filtering, sorting, search)
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Product detail page
│   │   ├── cart/
│   │   │   └── page.tsx              # Shopping cart
│   │   └── checkout/
│   │       └── page.tsx              # Checkout flow
│   ├── (auth)/                       # Authentication routes
│   │   ├── layout.tsx                # Authentication layout
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── forgot-password/
│   │       └── page.tsx
│   ├── (admin)/                      # Protected — requires admin role
│   │   └── dashboard/
│   │       └── page.tsx              # Product & order management
│   ├── (content)/                    # Static / content pages
│   │   ├── blog/
│   │   │   ├── page.tsx              # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Blog post detail
│   │   └── contact/
│   │       └── page.tsx              # Contact / support form
│   ├── layout.tsx                    # Root layout
│   └── favicon.ico
│
├── components/
│   ├── ui/                           # shadcn primitives — DO NOT edit directly
│   ├── common/                       # Shared composite components
│   │   ├── header.tsx                # Site header with nav
│   │   ├── footer.tsx                # Site footer
│   │   ├── navbar.tsx                # Navigation bar
│   │   └── search-bar.tsx            # Search with autocomplete
│   ├── features/                     # Feature-specific components
│   │   ├── product-card.tsx
│   │   ├── cart-item.tsx
│   │   ├── checkout-form.tsx
│   │   ├── order-summary.tsx
│   │   └── ...
│
├── hooks/                            # Custom React hooks & Zustand stores
│   ├── use-cart-store.ts             # Cart state (Zustand)
│   ├── use-auth-store.ts            # Auth session state (Zustand)
│   ├── use-ui-store.ts              # UI state — sidebar, modals (Zustand)
│   ├── use-local-storage.ts          # localStorage read/write
│   ├── use-media-query.ts            # Responsive breakpoint detection
│   └── ...
│
├── lib/
│   ├── api/                          # Data-access layer
│   │   ├── products.ts               # getProducts(), getProductBySlug() — direct data access
│   │   ├── auth.ts                   # Auth helper functions
│   │   ├── cart.ts                   # Cart data functions
│   │   ├── orders.ts                 # Order data functions
│   │   └── mockdata/                 # Static mock data (typed TS files)
│   │       ├── products.ts
│   │       ├── users.ts
│   │       ├── orders.ts
│   │       ├── categories.ts
│   │       └── blog-posts.ts
│   ├── helpers/                      # Pure utility/helper functions
│   │   ├── format-currency.ts        # Multi-currency formatting via Intl.NumberFormat
│   │   ├── format-date.ts
│   │   └── ...
│   ├── constants/                    # App-wide constants
│   │   ├── routes.ts                 # Route path constants
│   │   ├── config.ts                 # App config (API base URL, pagination defaults, etc.)
│   │   └── enums.ts                  # Shared enums (OrderStatus, UserRole, etc.)
│   └── utils.ts                      # shadcn cn() utility — DO NOT move
│
├── styles/
│   └── globals.css                   # Global styles, Tailwind directives, CSS variables
│
└── types/                            # TypeScript type definitions (organized by domain)
    ├── product.types.ts              # Product, Category, ProductVariant
    ├── cart.types.ts                 # CartItem, Cart
    ├── user.types.ts                 # User, UserProfile, AuthSession
    ├── order.types.ts                # Order, OrderItem, OrderStatus
    ├── blog.types.ts                 # BlogPost, BlogCategory
    └── api.types.ts                  # ApiResponse<T>, PaginatedResponse<T>, ApiError
```

---

## Technology & Library Rules

### UI Kit — shadcn/ui (MANDATORY)

- **Always use shadcn/ui components** for all UI elements. Never build a custom button, input, dialog, select, table, etc. when a shadcn component exists.
- Use the shadcn CLI to add new components: `npx shadcn@latest add <component>`
- shadcn primitives live in `src/components/ui/` and must **not** be edited directly. To customize behavior, wrap them in `src/components/common/` or `src/components/features/`.
- Use shadcn's `<Form>` component (which wraps react-hook-form) for all forms.
- Use shadcn's `Sonner` (toast) for notifications: cart add/remove, auth feedback, form success/error.
- Use shadcn's `Skeleton` component for all loading states — no raw spinners or "Loading..." text.
- **Styling rule for shadcn components (className policy)**:
  - Use the component's native props and CVA variants (`variant`, `size`, etc.) for all **visual** styling.
  - **DO NOT** override visual styles (colors, borders, shadows, font sizes, border-radius) via `className`. This breaks the design system.
  - `className` is **allowed only for layout utilities**: margin, padding, width, flex/grid positioning, gap.
  ```tsx
  // ✅ Correct — variant for style, className for layout
  <Button variant="outline" size="lg" className="w-full mt-4">
    Add to Cart
  </Button>

  // ❌ Wrong — overriding visual styles via className
  <Button className="bg-blue-500 text-white rounded-xl shadow-lg">
    Add to Cart
  </Button>
  ```
  - If you need a visual style that doesn't exist as a variant, create a new CVA variant in a wrapped component inside `src/components/common/` — do not ad-hoc style the primitive.

### State Management — Zustand

- Use Zustand for all client-side state: cart, auth session, UI state (sidebar open, modal state, etc.).
- Create **one store per domain**: `useCartStore`, `useAuthStore`, `useUIStore`, etc.
- Stores live in `src/hooks/` (e.g., `src/hooks/use-cart-store.ts`) since they are consumed like hooks.
- Persist cart and auth state to localStorage using Zustand's `persist` middleware.
- **Always use selectors** to prevent unnecessary re-renders:
  ```ts
  // ✅ Correct — only re-renders when `items` changes
  const items = useCartStore((state) => state.items);

  // ❌ Wrong — re-renders on ANY store change
  const { items } = useCartStore();
  ```

### Forms — react-hook-form + zod

- All forms use `react-hook-form` with `zod` schemas for validation.
- Define zod schemas alongside the form component or in `src/types/` if shared.
- Use shadcn's `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>` wrappers.

### Data Fetching — Hybrid Approach

This project uses a **hybrid data-fetching strategy** with no Axios dependency:

- **Server Components** call data-access functions in `src/lib/api/` **directly** (no HTTP round-trip). These functions import from `src/lib/api/mockdata/` in the mock phase.
- **Client Components** use native `fetch('/api/...')` to hit Route Handlers in `src/app/api/` when they need server data (e.g., mutations, infinite scrolling).
- **Route Handlers** (`src/app/api/`) serve as the mock REST API. They import from the same `src/lib/api/mockdata/` source of truth and add HTTP semantics (status codes, headers, delay simulation).
- **No Axios**. Use native `fetch` everywhere. It integrates natively with Next.js caching and deduplication.

```
┌─────────────────────┐         ┌──────────────────────┐
│   Server Component  │────────▶│  src/lib/api/*.ts     │──┐
│   (page.tsx)        │ direct  │  (data functions)     │  │
└─────────────────────┘ import  └──────────────────────┘  │  ┌──────────────────┐
                                                          ├─▶│  mockdata/*.ts    │
┌─────────────────────┐ fetch   ┌──────────────────────┐  │  │  (single source   │
│   Client Component  │────────▶│  app/api/*/route.ts   │──┘  │   of truth)       │
│   ("use client")    │ /api/.. │  (Route Handlers)     │     └──────────────────┘
└─────────────────────┘         └──────────────────────┘
```

### Authentication — Auth.js (NextAuth v5)

- Use Auth.js with a **credentials provider** that validates against mock user data.
- Protect routes via Next.js middleware (`middleware.ts` at project root).
- `(account)/` routes require any authenticated user.
- `(admin)/` routes require `role: "admin"`.
- Store session info in Zustand's `useAuthStore` for client-side access.

### Internationalization — next-intl

- Set up next-intl infrastructure with **English (en)** as the primary locale.
- All user-facing strings should use translation keys from the start, even if only English is available.
- This ensures adding new locales later requires zero refactoring — only translation files.

### Currency — Multi-currency

- Support multiple currencies from the start.
- Store all prices in the **smallest currency unit** (e.g., cents for USD, kuruş for TRY).
- Use `Intl.NumberFormat` for display formatting (helper in `src/lib/helpers/format-currency.ts`).
- Currency selection stored in user preferences / localStorage.

### Theme

- **Light mode only** for the initial phase.
- All design tokens defined as CSS variables in `src/styles/globals.css`.
- Dark mode can be added later via `next-themes` — structure CSS variables to make this easy.

### Icons — Lucide React

- Use `lucide-react` for all icons (already installed via shadcn).
- Import icons individually: `import { ShoppingCart } from "lucide-react"`.

### Library-First Principle

> **Always search for a well-maintained npm package before writing custom code.**
>
> Before implementing any utility, hook, or feature from scratch, check if a reliable library exists. This keeps the codebase smaller, more reliable, and easier to maintain. Only write custom code when no suitable package exists or when the library would be overkill for the use case.

---

## Strict Anti-Patterns

These are **hard rules** to prevent hallucination of outdated patterns. Violating any of these is a build-breaking or architecture-breaking mistake.

### Tailwind CSS v4 — CSS-First Configuration

- **DO NOT** create `tailwind.config.js` or `tailwind.config.ts`. Tailwind v4 has **no JavaScript config file**.
- **DO NOT** use `@tailwind base;`, `@tailwind components;`, `@tailwind utilities;` directives. Use `@import "tailwindcss";` instead.
- All theme customization happens via `@theme` directives in `src/styles/globals.css`:
  ```css
  @import "tailwindcss";

  @theme {
    --color-brand-cream: oklch(0.96 0.02 90);
    --font-display: "Inter", sans-serif;
  }
  ```
- Refer to the existing `src/styles/globals.css` for the shadcn theme variable pattern already in place.

### Next.js App Router — No Pages Router Patterns

- **DO NOT** use `getServerSideProps`, `getStaticProps`, `getStaticPaths`, or `getInitialProps`. These are Pages Router APIs and do not exist in the App Router.
- **DO NOT** import from `next/router`. Use `next/navigation` instead (`useRouter`, `usePathname`, `useSearchParams`, `redirect`).
- **DO NOT** create `_app.tsx`, `_document.tsx`, or any Pages Router file conventions.
- Use `generateStaticParams` instead of `getStaticPaths`.
- Use `generateMetadata` instead of `<Head>` from `next/head`.

### Server Components — Default Boundary

- **All `page.tsx` and `layout.tsx` files MUST remain Server Components** (no `"use client"` directive).
- **DO NOT** fetch data inside `"use client"` components unless there is a specific client-side need (e.g., infinite scrolling, real-time updates, user-initiated mutations).
- Pass server-fetched data as props from Server Components to Client Components:
  ```tsx
  // ✅ page.tsx (Server Component) — fetches data
  import { getProducts } from "@/src/lib/api/products";
  import { ProductGrid } from "@/src/components/features/product-grid";

  export default async function ProductsPage() {
    const products = await getProducts();
    return <ProductGrid products={products} />;
  }
  ```
- Interactive UI (click handlers, forms, state, browser APIs) must be extracted into `"use client"` child components. Keep these components **small and leaf-level**.

### Zustand — Selector Mandate

- **NEVER** destructure the entire store. Always use selectors:
  ```ts
  // ✅
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);

  // ❌
  const { items, addItem } = useCartStore();
  ```

---

## Mock API Conventions

### Architecture

1. **Mock data files** live in `src/lib/api/mockdata/` as **typed TypeScript files** (not raw `.json`). Each file exports typed arrays/objects matching the types in `src/types/`.

2. **Data-access functions** live in `src/lib/api/` (e.g., `products.ts`, `orders.ts`). These are plain async functions that import from `mockdata/` and apply filtering, sorting, and pagination in-memory. Server Components call these directly.

3. **Route Handlers** live in `src/app/api/` and serve as thin HTTP wrappers around the same data-access functions. They add HTTP semantics (status codes, headers) and delay simulation for Client Component consumption.

### Route Handler Pattern

```ts
// src/app/api/products/route.ts
import { getProducts } from "@/src/lib/api/products";
import { NextRequest } from "next/server";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(request: NextRequest) {
  await delay(200 + Math.random() * 300); // simulate 200-500ms latency

  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");

  const products = await getProducts({ category, sort });

  return Response.json({ success: true, data: products });
}
```

### Data-Access Function Pattern

```ts
// src/lib/api/products.ts
import { products } from "./mockdata/products";
import type { Product } from "@/src/types/product";

export async function getProducts(filters?: {
  category?: string | null;
  sort?: string | null;
}): Promise<Product[]> {
  let result = [...products];

  if (filters?.category) {
    result = result.filter((p) => p.category === filters.category);
  }

  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug) ?? null;
}
```

### Realistic Behavior

Route Handlers should simulate:
- Network latency (200–500ms random delay)
- Pagination (limit/offset or cursor-based)
- Filtering and sorting (applied in data-access functions)
- Error responses (404 for missing resources, 401 for unauthenticated, 400 for bad input)

### Transition to Real Backend

When the backend is ready:
1. Replace data-access function implementations to use `fetch` against the real API.
2. Route Handlers can be removed or kept as a BFF (Backend-for-Frontend) proxy layer.
3. All consuming components (pages, Client Components) remain unchanged.

---

## Coding Conventions

### File Naming
- **Files**: `kebab-case.ts` / `kebab-case.tsx` (e.g., `product-card.tsx`, `use-cart-store.ts`)
- **Components**: `PascalCase` (e.g., `ProductCard`, `CartItem`)
- **Hooks**: `camelCase` prefixed with `use` (e.g., `useCartStore`, `useMediaQuery`)
- **Types/Interfaces**: `PascalCase` (e.g., `Product`, `CartItem`, `ApiResponse<T>`)
- **Constants**: `UPPER_SNAKE_CASE` for true constants, `camelCase` for config objects

### Exports
- **Named exports** for all components, hooks, and utilities.
- **Default exports** only for Next.js pages and layouts (required by the framework).

### Types
- All shared types in `src/types/`, organized by domain (`product.ts`, `cart.ts`, `user.ts`, etc.).
- Component-specific types (props) can be co-located in the component file.
- API response types in `src/types/api.ts` — use generics: `ApiResponse<T>`, `PaginatedResponse<T>`.

### Imports — Order & Style
Group imports in this order, separated by blank lines:
1. React / Next.js imports
2. External library imports
3. Internal modules (`@/src/...`)
4. Type imports
5. Style imports

Always use the `@/src/...` path alias. Never use relative imports that go above the current directory (`../../`).

### Components
- One component per file.
- Keep components focused — extract sub-components when a file exceeds ~150 lines.
- Prefer Server Components by default. Add `"use client"` only when the component needs interactivity, hooks, or browser APIs.

### Semantic HTML
- Use semantic HTML5 elements to structure every page and component:
  - `<header>`, `<footer>`, `<nav>` for site-level structure
  - `<main>` for primary content (exactly one per page, already in root layout)
  - `<section>` for thematic groupings (e.g., "Featured Products", "Testimonials")
  - `<article>` for self-contained content (blog posts, product cards)
  - `<aside>` for sidebar/supplementary content (filters, related products)
- **Avoid `<div>` soup.** Use `<div>` only for non-semantic layout wrappers (flex/grid containers, spacing wrappers). If a block has a meaning, it gets a semantic tag.

### Accessibility (a11y)
- **Heading hierarchy**: Exactly one `<h1>` per page. Follow strict sequence (`<h1>` → `<h2>` → `<h3>`) — never skip levels (e.g., no `<h1>` → `<h3>`).
- **Image alt text**: Every `<Image>` must have a meaningful `alt` attribute. Decorative images use `alt=""`. Product images must describe the product (e.g., `alt="Oak dining table in a sunlit room"`).
- **Focus states**: All interactive elements must have visible focus indicators. shadcn components provide these by default — do not remove or override them.
- **Keyboard navigation**: All custom interactive components must be fully keyboard-accessible (Enter/Space to activate, Escape to dismiss, arrow keys for lists/menus).
- **ARIA labels**: Add `aria-label` or `aria-labelledby` to icon-only buttons, navigation landmarks, and any interactive element without visible text.
- Prefer shadcn/ui components — they handle most a11y patterns automatically.

### SEO — Metadata Strategy
- **Root layout** exports a static `metadata` object with global defaults (site name, default OG image, Twitter card type).
- **Every page** must export a dynamic `generateMetadata` function that overrides per-page fields:
  - `title` — descriptive, unique per page
  - `description` — compelling summary
  - `openGraph` — `title`, `description`, `images`, `type`
  - `twitter` — `card`, `title`, `description`, `images`
  ```ts
  // src/app/(storefront)/products/[slug]/page.tsx
  import type { Metadata } from "next";
  import { getProductBySlug } from "@/src/lib/api/products";

  export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) return {};

    return {
      title: product.name,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: [{ url: product.image }],
      },
    };
  }
  ```
- Pages that don't need dynamic data can export a static `metadata` object instead.

### Error Handling & UX
- Add React error boundaries per route group (`error.tsx`) to prevent full-page crashes.
- Use `loading.tsx` files with shadcn `Skeleton` components for route-level loading states.
- Use shadcn's `Sonner` for toast notifications on user actions (cart add/remove, auth, form results).

### Images
- Always use Next.js `<Image>` component with explicit `width`, `height`, or `fill` + proper `sizes`.
- Every image must have a meaningful `alt` attribute (see Accessibility section above).
- Product images should maintain consistent aspect ratios (e.g., 4:3 for listings, 1:1 for thumbnails).

---

## Design Direction

- **Brand feel**: Warm, minimal, premium home/lifestyle brand (think IKEA × Muji).
- **Aesthetic**: Fresh, highly modern, state-of-the-art. Crisp typography, high contrast text, abundant whitespace. Every page should feel polished and intentional — no generic or "template" looks.
- **Typography**: Inter as the primary font (already configured). Use font weight contrast (light headings, medium body, or vice versa) to create visual hierarchy.
- **Color palette**: Warm neutrals, natural tones (cream, sand, olive, charcoal), with subtle accent colors for CTAs. High contrast between text and background for readability.
- **Imagery**: Room-scene, lifestyle photography style — products shown in context, not isolated on white.
- **Spacing**: Generous whitespace. Let the products breathe. Use consistent spacing scales.
- **Animations**: Subtle, purposeful micro-animations (hover effects, page transitions, add-to-cart feedback). Nothing flashy.
- **Layout**: Clean grid-based layouts. Product grids, asymmetric hero sections, full-bleed imagery.

### Centered Max-Width Layout (MANDATORY)

The application must **not** stretch full-width on large screens. All page content must be constrained and centered:

- **Content container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` — applied in `<main>` or a shared layout wrapper.
- **Header/Footer**: The outer element spans full viewport width (for background colors/borders), but **inner content** is constrained to the same `max-w-7xl mx-auto` pattern.
- **Hero sections**: May use full-bleed backgrounds/images, but text content inside must respect the max-width constraint.

```tsx
// ✅ Root layout pattern
<body>
  <Header />           {/* full-width background, inner content constrained */}
  <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {children}
  </main>
  <Footer />           {/* full-width background, inner content constrained */}
</body>

// ✅ Inside Header component
<header className="w-full border-b">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* logo, nav, cart icon */}
  </div>
</header>
```

---

## Environment Variables

Even in the mock phase, define these patterns in `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_DEFAULT_CURRENCY=USD
NEXT_PUBLIC_DEFAULT_LOCALE=en
AUTH_SECRET=<random-string-for-auth-js>
```

---

## Git Conventions

Use conventional commits for clean history:
- `feat:` — new feature
- `fix:` — bug fix
- `chore:` — maintenance, config, deps
- `style:` — formatting, no logic change
- `refactor:` — code restructure, no behavior change
- `docs:` — documentation only

---

## LLM Output Directives

These rules govern how AI assistants respond when working on this project.

### Think First
Before generating code, briefly outline the approach in a markdown list:
- Which files will be created or modified
- The component tree (parent → children) for UI work
- Which data functions or Route Handlers are involved
- Any new dependencies required

### No Yapping
- Omit conversational filler ("Sure!", "Great question!", "Let me help you with that").
- Do not explain basic Next.js, React, or TypeScript concepts unless explicitly asked.
- Jump straight to the solution. Provide context only when it affects a design decision.

### Code Output
- **New files**: Provide the complete, copy-pasteable file contents.
- **Modifying large existing files**: Use `// ... existing code ...` to indicate unchanged sections. Show only the modified blocks with enough surrounding context to locate the edit.
- **Always include the file path** as a comment or heading before each code block.
- **Respect all conventions** defined in this file — naming, exports, import order, Server/Client boundary.
