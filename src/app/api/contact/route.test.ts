import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { POST } from "./route";

const validPayload = {
  name: "Jane Visitor",
  email: "jane@example.com",
  subject: "Question about shipping",
  message: "Do you ship internationally?",
  token: "turnstile-token-abc",
};

function postRequest(body: unknown) {
  return new NextRequest("http://localhost/api/contact", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "content-type": "application/json" },
  });
}

beforeEach(() => {
  process.env.TURNSTILE_SECRET_KEY = "test-secret";
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("POST /api/contact", () => {
  it("rejects a payload that fails zod validation before ever checking Turnstile", async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);

    const res = await POST(postRequest({ ...validPayload, email: "not-an-email" }));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.success).toBe(false);
    expect(body.errors).toBeDefined();
    expect(fetchSpy).not.toHaveBeenCalled(); // fails fast, never spends a Turnstile call
  });

  it("rejects a message that's too short", async () => {
    vi.stubGlobal("fetch", vi.fn());
    const res = await POST(postRequest({ ...validPayload, message: "too short" }));
    expect(res.status).toBe(400);
  });

  it("returns 400 when the Turnstile verification fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => ({ success: false }),
      })
    );

    const res = await POST(postRequest(validPayload));
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.message).toMatch(/captcha/i);
  });

  it("creates the message and returns 201 when validation and Turnstile both succeed", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: async () => ({ success: true }),
      })
    );

    const res = await POST(postRequest(validPayload));
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data).toMatchObject({
      name: validPayload.name,
      email: validPayload.email,
      subject: validPayload.subject,
      message: validPayload.message,
    });
    // The raw captcha token must never be persisted alongside the message.
    expect(body.data).not.toHaveProperty("token");
  });
});
