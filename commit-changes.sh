#!/usr/bin/env bash
# Grouped commit script for the Phase 1 + Phase 2 portfolio-readiness pass.
# Review each `git diff --staged` if you want, then run this from the repo root
# on your own machine (where your git identity is already configured).
# Delete this file once you're done — it isn't part of the app.
set -e

# 1. Rebrand: remove IKEA trademarks from the mock product catalog
git add src/lib/api/mockdata/products.ts
git commit -m "content: rename product catalog off IKEA trademarks

Replaces every real IKEA product line name (KARLSTAD, LACK, MALM, HEMNES,
TÖRNVIKEN, HEKTAR, ÅRSTID, POMP, GURLI) with an original fictional name,
along with matching slugs."

# 2. Fix TypeScript build blockers (button pattern, zod v4)
git add src/components/features/cart/cart-view.tsx \
        src/components/features/checkout/checkout-schemas.ts
git commit -m "fix: resolve TypeScript build errors

- Replace unsupported <Button asChild> usage with the base-ui
  render={<Link />} + nativeButton={false} composition pattern.
- Replace zod v3's required_error param with v4's error param shape.

next build type-checks by default, so these were blocking production
builds outright."

# 3. Extract shared hydration-guard hook
git add src/hooks/use-hydrated.ts \
        src/components/features/checkout/success-view.tsx \
        src/components/features/storefront/cart-trigger.tsx \
        src/components/features/products/product-card.tsx
git commit -m "refactor: extract useHydrated() hook

Replaces the repeated useState(false) + useEffect(() => setMounted(true))
SSR/CSR hydration-guard pattern (flagged by eslint-plugin-react-hooks'
set-state-in-effect rule) with a single useSyncExternalStore-based hook,
reused across every component that gates on client-only Zustand state."

# 4. Fix React Hooks correctness errors (refs, immutability)
git add src/components/features/storefront/hero-carousel.tsx \
        src/components/features/storefront/testimonial-carousel.tsx \
        src/components/ui/carousel.tsx \
        src/components/features/products/product-filters.tsx \
        src/components/features/products/category-product-list.tsx \
        src/components/common/storefront/header/localization-switcher.tsx
git commit -m "fix: resolve react-hooks/refs and immutability lint errors

- Carousels: replace useRef(Autoplay(...)) read during render with
  useState(() => Autoplay(...)) (react-hooks/refs).
- carousel.tsx / product-filters.tsx / category-product-list.tsx:
  justified eslint-disable-next-line comments on legitimate
  sync-with-external-system effects (embla API, URL sync, infinite scroll).
- localization-switcher.tsx: move document.cookie writes into an effect
  instead of mutating during the click handler (react-hooks/immutability)."

# 5. Clean up unused vars/imports and explicit `any` types
git add src/components/common/storefront/header/desktop-mega-menu.tsx \
        src/components/common/storefront/header/mobile-nav-sheet.tsx \
        src/components/features/checkout/checkout-wizard.tsx \
        src/components/features/checkout/order-summary.tsx \
        src/components/features/auth/forgot-password-form.tsx \
        src/components/features/storefront/contact-form.tsx \
        src/components/ui/stateful-button.tsx \
        src/hooks/use-cart-store.ts \
        src/app/api/orders/[id]/route.ts \
        src/app/api/orders/route.ts \
        src/app/api/testimonials/route.ts \
        eslint.config.mjs
git commit -m "fix: clean up remaining ESLint errors and warnings

Removes unused imports/params, replaces explicit any with real types
in desktop-mega-menu.tsx and checkout-wizard.tsx, converts unused
catch (error) to bare catch, and adds an ignoreRestSiblings override
for the 'destructure to omit a field' idiom used across several files."

# 6. Unescaped-entity fixes across pages
git add "src/app/(storefront)/about/page.tsx" \
        "src/app/(storefront)/account/orders/[id]/page.tsx" \
        "src/app/(storefront)/account/orders/page.tsx" \
        "src/app/(storefront)/contact/page.tsx" \
        src/components/common/storefront/header/search-bar.tsx \
        src/components/features/storefront/testimonial-card.tsx
git commit -m "fix: escape apostrophes and quotes in JSX text

react/no-unescaped-entities fixes across the about, account, and
contact pages."

# 7. Wire up the wishlist feature
git add src/hooks/use-wishlist-store.ts \
        src/lib/api/wishlist.ts \
        src/types/wishlist.types.ts \
        src/app/api/wishlist/ \
        src/components/features/storefront/wishlist-trigger.tsx \
        src/components/features/storefront/wishlist-view.tsx \
        "src/app/(storefront)/account/wishlist/" \
        "src/app/(storefront)/account/page.tsx" \
        src/components/common/storefront/header/middle-action-bar.tsx
git commit -m "feat: wire up the wishlist feature

The store, API route, page, and header trigger already existed; the
account-dashboard link still pointed at a disabled 'Coming Soon'
button. Links it to /account/wishlist and fixes a hardcoded page
title that didn't use the app-name env var."

# 8. Remove dead code
git add -A -- src/app/api/test/route.ts public/file.svg public/globe.svg \
        public/next.svg public/vercel.svg public/window.svg
git commit -m "chore: remove leftover debug route and unused boilerplate assets

Deletes /api/test (a two-line scratch endpoint with no auth) and the
five unused create-next-app boilerplate SVGs — confirmed zero
references anywhere in src/."

# 9. Add error/loading/not-found pages
git add "src/app/(storefront)/loading.tsx" src/app/error.tsx src/app/not-found.tsx
git commit -m "feat: add route-level error, loading, and not-found pages

- app/(storefront)/loading.tsx: header + product-grid skeleton.
- app/error.tsx: client error boundary with a reset button and a
  link home.
- app/not-found.tsx: branded 404 page.

Closes the gap between the project's own conventions doc (which
mandates both) and what actually existed (neither)."

# 10. SEO: metadataBase, robots.ts, sitemap.ts
git add src/app/layout.tsx src/app/robots.ts src/app/sitemap.ts .env.example
git commit -m "feat: add root SEO metadata, robots.ts, and sitemap.ts

- layout.tsx: title template, description, metadataBase (from a new
  NEXT_PUBLIC_SITE_URL env var), and default Open Graph / Twitter
  card fields.
- robots.ts: allows everything except /account, /cart, /checkout, /api.
- sitemap.ts: every static page plus every category and product route,
  generated from getCategories() / getProducts()."

# 11. Remove dead Google auth buttons
git add src/components/features/auth/login-form.tsx \
        src/components/features/auth/register-form.tsx
git commit -m "fix: remove non-functional Login/Register with Google buttons

Neither button had an onClick or a configured OAuth provider behind
it. Removed rather than stubbed, since this project has no real
backend to wire one up to."

# 12. Content + docs
git add src/components/common/storefront/footer/site-footer.tsx \
        .gitignore README.md LICENSE
git commit -m "docs: replace footer placeholder copy, rewrite README, add LICENSE

- site-footer.tsx: real brand copy in place of Lorem ipsum.
- .gitignore: fix a bug where the blanket .env* rule was silently
  excluding .env.example too; add a !.env.example exception.
- README.md: full rewrite (was 100% create-next-app boilerplate).
- LICENSE: MIT.
"

echo ""
echo "Done. Remaining in the working tree (not part of this script):"
git status --short
