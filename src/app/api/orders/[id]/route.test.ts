import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import type { Order } from "@/src/types/order.types";

vi.mock("@/src/lib/api/orders", () => ({
  getOrderById: vi.fn(),
}));

const mockOrder: Order = {
  id: "ord_1001",
  userId: "usr_1",
  date: "2026-08-15T10:30:00Z",
  status: "delivered",
  total: 179900,
  subtotal: 129900,
  tax: 3000,
  shippingCost: 2000,
  discount: 0,
  items: [
    { id: "item_1", productId: "prod_camden", productSlug: "sofa-camden", title: "Camden 3-Seat Sofa", quantity: 1, price: 129900, image: "/images/camden.jpg" },
  ],
  shippingAddress: {
    firstName: "John",
    lastName: "Doe",
    addressLine1: "123 Main St",
    city: "Seattle",
    state: "WA",
    zipCode: "98101",
    country: "US",
  },
  paymentMethod: { brand: "Visa", last4: "4242" },
};

function requestWithCookie(id: string, sessionValue?: string) {
  return new NextRequest(`http://localhost/api/orders/${id}`, {
    headers: sessionValue !== undefined ? { cookie: `session=${sessionValue}` } : {},
  });
}

async function freshAuthModules() {
  const g = globalThis as unknown as { __mockUsers?: unknown; __mockSessions?: unknown };
  delete g.__mockUsers;
  delete g.__mockSessions;
  vi.resetModules();
  const { createSession } = await import("@/src/lib/api/mockdata/users");
  const { GET } = await import("./route");
  const { getOrderById } = await import("@/src/lib/api/orders");
  return { createSession, GET, getOrderById: vi.mocked(getOrderById) };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/orders/[id]", () => {
  it("returns 401 when there is no session cookie", async () => {
    const { GET } = await freshAuthModules();

    const res = await GET(requestWithCookie("ord_1001"), { params: Promise.resolve({ id: "ord_1001" }) });

    expect(res.status).toBe(401);
  });

  it("returns 401 when the session cookie doesn't match a real session", async () => {
    const { GET } = await freshAuthModules();

    const res = await GET(requestWithCookie("ord_1001", "not-a-real-token"), {
      params: Promise.resolve({ id: "ord_1001" }),
    });

    expect(res.status).toBe(401);
  });

  it("returns 403 when the order belongs to a different user (IDOR check)", async () => {
    const { createSession, GET, getOrderById } = await freshAuthModules();
    getOrderById.mockResolvedValue(mockOrder); // owned by usr_1

    const token = createSession("usr_2"); // a *different* logged-in user
    const res = await GET(requestWithCookie("ord_1001", token), {
      params: Promise.resolve({ id: "ord_1001" }),
    });

    expect(res.status).toBe(403);
  });

  it("returns 404 when the order doesn't exist", async () => {
    const { createSession, GET, getOrderById } = await freshAuthModules();
    getOrderById.mockResolvedValue(null);

    const token = createSession("usr_1");
    const res = await GET(requestWithCookie("ord_does_not_exist", token), {
      params: Promise.resolve({ id: "ord_does_not_exist" }),
    });

    expect(res.status).toBe(404);
  });

  it("returns 200 with the order when the requester owns it", async () => {
    const { createSession, GET, getOrderById } = await freshAuthModules();
    getOrderById.mockResolvedValue(mockOrder);

    const token = createSession("usr_1"); // the order's real owner
    const res = await GET(requestWithCookie("ord_1001", token), {
      params: Promise.resolve({ id: "ord_1001" }),
    });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.id).toBe("ord_1001");
  });
});
