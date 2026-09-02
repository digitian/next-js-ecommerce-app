import {
  validateCredentials,
  createSession,
  getSessionUser,
  destroySession,
  registerUser,
} from "./mockdata/users";
import type { User, AuthSession } from "@/src/types/user.types";

/**
 * High-level data access functions for authentication.
 * When migrating to a real backend, replace these implementations with API calls (e.g. fetch to external backend).
 */

export async function authenticateUser(
  email: string,
  password: string
): Promise<AuthSession | null> {
  const user = validateCredentials(email, password);
  if (!user) {
    return null;
  }
  const token = createSession(user.id);
  return { user, token };
}

export async function getSession(token: string): Promise<User | null> {
  if (!token) return null;
  return getSessionUser(token);
}

export async function endSession(token: string): Promise<void> {
  if (!token) return;
  destroySession(token);
}

export async function createAccount(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<{ success: boolean; user?: User; error?: string }> {
  return registerUser(data);
}
