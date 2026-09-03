# Handover: Order Management & User Account Integration

## Completed Work (Checkout & Cart)
The previous agent successfully implemented the cart and checkout features. The cart leverages Zustand (`useCartStore`) for client-side state. The checkout wizard uses `react-hook-form` + `zod` for multi-step validation, and handles masked inputs for credit cards. Upon successful order placement (via a mock `POST /api/orders`), the cart is cleared and the user is redirected to a print-friendly invoice success screen (`/checkout/success`).

## Your Objective
Your primary goal is to build out the **Order History & Details** experience for authenticated users.

### Specific Tasks

1. **Type Definitions & Mock Data**
   - Review and update `src/types/order.types.ts` to ensure `Order`, `OrderItem`, and `OrderSummary` types are fully defined.
   - Populate `src/lib/api/mockdata/orders.ts` with mock historical orders linked to mock user IDs so we have data to fetch.

2. **API Routes (Data Access Layer)**
   - Implement `src/lib/api/orders.ts` to expose functions like `getUserOrders(userId)` and `getOrderById(orderId)`.
   - Ensure the Next.js Route Handlers (`src/app/api/orders/route.ts` and `src/app/api/orders/[id]/route.ts`) are hooked up to these data functions to simulate REST endpoints with realistic delays (following the architecture defined in `AGENTS.md`).

3. **Account Dashboard Integration**
   - Update `src/app/(storefront)/account/page.tsx` (the main account dashboard) to include a visual summary/list of the user's recent orders.
   - Ensure the UI matches the clean, premium aesthetic of the application (use shadcn/ui components like `Table`, `Card`, and `Badge` for statuses).

4. **Order History & Detail Pages**
   - Create a dedicated Order History list page (e.g., `src/app/(storefront)/account/orders/page.tsx`) if the user wants to see their full history.
   - Create a dedicated Order Detail page (e.g., `src/app/(storefront)/account/orders/[id]/page.tsx`) that acts as a historical receipt, similar in structure to the `success-view` but tailored for past orders.

### Critical Rules to Remember
- **Hybrid Data Fetching**: Server Components (like `page.tsx`) should call `src/lib/api/orders.ts` *directly* (no `fetch`). Only Client Components should use `fetch('/api/...')` when necessary.
- **shadcn/ui ONLY**: Use the existing design system. Do not write custom CSS utilities for buttons, tables, or cards. Check `src/components/ui/` for available primitives or run `npx shadcn@latest add <component>` to add missing ones.
- **Aesthetics**: Maintain the premium, minimalist (IKEA/Muji-inspired) design language. Use subtle borders, lots of whitespace, and modern typography.
- **Auth Integration**: Secure the data. Make sure mock endpoints and data access functions check for the current user's session (using the mock auth setup or `useAuthStore` where appropriate, though server-side auth is preferred for data fetching).

Good luck!
