import { beforeEach, describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { GET, POST, DELETE } from "./route";

const validProduct = {
  id: "prod_camden",
  slug: "sofa-camden",
  name: "Camden 3-Seat Sofa",
  category: { id: "cat_1", slug: "living-room", title: "Living Room", showcase_image: "/a.jpg", thumb_image: "/a-thumb.jpg" },
  sub_category: { id: "sub_1", slug: "sofas", title: "Sofas", category_id: "cat_1", showcase_image: "/b.jpg", thumb_image: "/b-thumb.jpg" },
  brief_description: "A comfortable sofa.",
  description: "Full description",
  price: 129900,
  images: [{ url: "/images/camden.jpg", alt: "Camden sofa" }],
};

function requestWithSession(
  url: string,
  init: { method?: string; body?: string; sessionToken?: string } = {}
) {
  const { sessionToken, method, body } = init;
  const headers = new Headers();
  if (sessionToken) headers.set("cookie", `session=${sessionToken}`);
  return new NextRequest(url, { method, body, headers });
}

async function freshModules() {
  const g = globalThis as unknown as { __mockUsers?: unknown; __mockSessions?: unknown };
  delete g.__mockUsers;
  delete g.__mockSessions;
  const { createSession } = await import("@/src/lib/api/mockdata/users");
  return { createSession };
}

describe("/api/wishlist", () => {
  let sessionToken: string;

  beforeEach(async () => {
    const { createSession } = await freshModules();
    sessionToken = createSession("usr_1");
  });

  describe("GET", () => {
    it("returns 401 without a session cookie", async () => {
      const res = await GET(requestWithSession("http://localhost/api/wishlist"));
      expect(res.status).toBe(401);
    });

    it("returns the caller's wishlist (empty by default) when authenticated", async () => {
      const res = await GET(requestWithSession("http://localhost/api/wishlist", { sessionToken }));
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
    });
  });

  describe("POST", () => {
    it("returns 401 without a session cookie", async () => {
      const res = await POST(
        requestWithSession("http://localhost/api/wishlist", {
          method: "POST",
          body: JSON.stringify({ id: "prod_camden", product: validProduct }),
        })
      );
      expect(res.status).toBe(401);
    });

    it("rejects a payload with a missing product field (was previously z.any())", async () => {
      const res = await POST(
        requestWithSession("http://localhost/api/wishlist", {
          method: "POST",
          sessionToken,
          body: JSON.stringify({ id: "prod_camden", product: { id: "prod_camden" } }),
        })
      );
      const body = await res.json();

      expect(res.status).toBe(400);
      expect(body.success).toBe(false);
    });

    it("rejects a payload with the wrong type for a required field", async () => {
      const res = await POST(
        requestWithSession("http://localhost/api/wishlist", {
          method: "POST",
          sessionToken,
          body: JSON.stringify({ id: "prod_camden", product: { ...validProduct, price: "not-a-number" } }),
        })
      );
      expect(res.status).toBe(400);
    });

    it("accepts a well-formed product and adds it to the wishlist", async () => {
      const res = await POST(
        requestWithSession("http://localhost/api/wishlist", {
          method: "POST",
          sessionToken,
          body: JSON.stringify({ id: "prod_camden", product: validProduct }),
        })
      );
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data).toHaveLength(1);
      expect(body.data[0].id).toBe("prod_camden");
    });
  });

  describe("DELETE", () => {
    it("returns 400 when itemId is missing", async () => {
      const res = await DELETE(
        requestWithSession("http://localhost/api/wishlist", { method: "DELETE", sessionToken })
      );
      expect(res.status).toBe(400);
    });

    it("removes an item by itemId", async () => {
      await POST(
        requestWithSession("http://localhost/api/wishlist", {
          method: "POST",
          sessionToken,
          body: JSON.stringify({ id: "prod_camden", product: validProduct }),
        })
      );

      const res = await DELETE(
        requestWithSession("http://localhost/api/wishlist?itemId=prod_camden", {
          method: "DELETE",
          sessionToken,
        })
      );
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.data).toHaveLength(0);
    });
  });
});
