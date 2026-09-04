import { describe, expect, it } from "vitest";

// The mock-auth module keeps its user/session tables on `globalThis` so they
// survive dev-mode HMR. That means the module itself can be safely
// re-imported per test, but we must clear the globals by hand first or
// state (e.g. newly-registered users) would leak between tests.
async function freshAuthModule() {
  const g = globalThis as unknown as { __mockUsers?: unknown; __mockSessions?: unknown };
  delete g.__mockUsers;
  delete g.__mockSessions;
  const mod = await import("./users");
  return mod;
}

describe("mock auth data layer", () => {
  describe("validateCredentials", () => {
    it("returns the sanitized user for correct credentials", async () => {
      const { validateCredentials } = await freshAuthModule();
      const user = validateCredentials("customer@example.com", "Password123!");
      expect(user).not.toBeNull();
      expect(user?.email).toBe("customer@example.com");
      expect(user).not.toHaveProperty("password");
    });

    it("is case-insensitive and trims whitespace on email", async () => {
      const { validateCredentials } = await freshAuthModule();
      const user = validateCredentials("  CUSTOMER@EXAMPLE.COM  ", "Password123!");
      expect(user?.email).toBe("customer@example.com");
    });

    it("returns null for a wrong password", async () => {
      const { validateCredentials } = await freshAuthModule();
      expect(validateCredentials("customer@example.com", "wrong-password")).toBeNull();
    });

    it("returns null for an unknown email", async () => {
      const { validateCredentials } = await freshAuthModule();
      expect(validateCredentials("nobody@example.com", "Password123!")).toBeNull();
    });
  });

  describe("createSession / getSessionUser / destroySession", () => {
    it("round-trips a session token to the correct user", async () => {
      const { createSession, getSessionUser } = await freshAuthModule();
      const token = createSession("usr_1");
      const user = getSessionUser(token);
      expect(user?.id).toBe("usr_1");
    });

    it("returns null for an unknown token", async () => {
      const { getSessionUser } = await freshAuthModule();
      expect(getSessionUser("not-a-real-token")).toBeNull();
    });

    it("invalidates a session after destroySession", async () => {
      const { createSession, getSessionUser, destroySession } = await freshAuthModule();
      const token = createSession("usr_1");
      expect(destroySession(token)).toBe(true);
      expect(getSessionUser(token)).toBeNull();
    });
  });

  describe("registerUser", () => {
    it("registers a new user with a sanitized (password-free) return value", async () => {
      const { registerUser } = await freshAuthModule();
      const result = registerUser({
        firstName: "New",
        lastName: "User",
        email: "new.user@example.com",
        password: "Sup3rSecret!",
      });

      expect(result.success).toBe(true);
      expect(result.user?.email).toBe("new.user@example.com");
      expect(result.user).not.toHaveProperty("password");
    });

    it("immediately allows the newly registered user to log in", async () => {
      const { registerUser, validateCredentials } = await freshAuthModule();
      registerUser({
        firstName: "New",
        lastName: "User",
        email: "new.user@example.com",
        password: "Sup3rSecret!",
      });

      const user = validateCredentials("new.user@example.com", "Sup3rSecret!");
      expect(user?.email).toBe("new.user@example.com");
    });

    it("rejects registration with an email that's already taken", async () => {
      const { registerUser } = await freshAuthModule();
      const result = registerUser({
        firstName: "Dupe",
        lastName: "Doe",
        email: "customer@example.com", // already seeded
        password: "AnotherPass1!",
      });

      expect(result.success).toBe(false);
      expect(result.error).toMatch(/already exists/i);
    });
  });
});
