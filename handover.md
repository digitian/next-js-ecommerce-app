# Handover Document

## 1. Project Overview & Context
- **Project**: Next.js E-Commerce Storefront (single-brand home/lifestyle inspired by IKEA / Muji).
- **Stack**: Next.js 16.3.3 (App Router, Turbopack), React 19.2.8, TypeScript 5, Tailwind CSS 4, shadcn/ui (Vega style based on @base-ui/react), Zustand 5, react-hook-form + zod.
- **Phase**: Frontend development with mocked backend layer. Backend API does not exist yet; all server operations are handled via Route Handlers and Server Actions simulating network latency and static data.

## 2. Completed Work in this Session

### Cart Infrastructure & UI
- **Types**: Created `src/types/cart.types.ts` defining `CartItem` and a `CartItemProductSnapshot` (which stores a lightweight version of the product to avoid complex client-side fetching).
- **State Management**: Implemented `useCartStore` (`src/hooks/use-cart-store.ts`) using Zustand 5 and the `persist` middleware configured for `localStorage`. Handles adding/removing items, quantity updates, and cart subtotal/item count calculations. Hydrates safely to prevent SSR hydration mismatches.
- **Cart Components**: 
  - Created `src/components/features/cart-item.tsx` to render individual cart items with `lucide-react` quantity controls.
  - Rewrote `CartTrigger` (`src/components/features/storefront/cart-trigger.tsx`) to connect dynamically to the Zustand store. It now maps the cart items, updates the bubble badge, and handles empty states.
  - Connected the "Shopping Bag" icon in `ProductCard` to trigger `addItem()` in the store.

### Mobile Navigation Fixes
- **Dynamic Categories**: Updated the server-side `src/app/(storefront)/layout.tsx` to fetch `subcategories` concurrently. Passed the `MobileNavSheet` component as a pre-hydrated `mobileNav` ReactNode prop down through `SiteHeader` to `MiddleActionBar`. This perfectly adheres to Next.js 13+ App Router patterns by keeping data fetching on the server while passing UI chunks into deep client components.
- **Auth State Integration**: Modified `MobileNavSheet` to use `useAuthStore`. It now conditionally renders "Sign In / Register" or "My Account / Order History / Wishlist / Log out" depending on the user's login state.
- **Custom Logout**: Added a custom `<button>` inside the mobile nav to trigger `logoutAction()` while visually matching the other text links.

### Base UI Bug Fixes
- Fixed a Base UI console error (`nativeButton` prop warnings) by removing the `nativeButton={false}` prop from the `Button` components inside the `SheetTrigger` for both `MobileNavSheet` and `CartTrigger`. (Note: Only use `nativeButton={false}` when you are actually overriding the `<button>` with a `<Link>`).

## 3. Goal for Next Agent
Your goal is to build out the full, dedicated **Cart (`/cart`)** and **Checkout (`/checkout`)** pages.

### Recommendations
1. **Cart Page**: You already have a robust client-side `useCartStore` to read from. Build a full-page version of the cart with a detailed summary, tax/shipping estimations (mocked), and a clear call-to-action to proceed to checkout.
2. **Checkout Page**: 
  - Implement a multi-step or single-page checkout flow using `react-hook-form` + `zod` for shipping/billing details.
  - If the user is logged in (check `useAuthStore`), pre-fill the form with their mock user data.
  - For payment, a simple mock UI (e.g., "Credit Card" dummy inputs) is sufficient.
  - Upon successful checkout, clear the cart (`clearCart()`) and route the user to an order confirmation page (e.g., `/checkout/success`).
3. **Backend Sync (Optional)**: If you implement the mock backend (`/api/cart`), ensure you sync the client-side Zustand store with it properly, or keep it purely client-side until the order is actually placed (POST `/api/orders`).

## 4. Key Rules & Technical Gotchas
- **Base UI Buttons with `<Link>`**: When using shadcn `<Button>` with `render={<Link href="..." />}`, always add `nativeButton={false}`. Do **NOT** add it if the Button is acting normally or used inside a trigger that expects a button.
- **Zustand Selectors**: Per `AGENTS.md`, never destructure the entire store. Always use individual selectors (`const items = useCartStore((s) => s.items)`).
- **Zod v4**: The project uses Zod 4.4.x where `error.errors` is deprecated in favor of `error.issues`.
- **Client/Server Boundaries**: Prefer fetching data in Server Components and passing it down. Avoid converting layout shells into Client Components just to fetch data.
