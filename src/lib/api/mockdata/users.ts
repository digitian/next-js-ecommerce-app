import type { User } from "@/src/types/user.types";

export interface MockUserRecord extends User {
  password: string;
}

// Initial seed mock users
const initialUsers: MockUserRecord[] = [
  {
    id: "usr_1",
    firstName: "John",
    lastName: "Doe",
    email: "customer@example.com",
    password: "Password123!",
    role: "customer",
  },
  {
    id: "usr_2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    password: "Password123!",
    role: "customer",
  },
];

// Persistent across module reloads in Node.js dev environment if attached to globalThis
const globalAuth = globalThis as unknown as {
  __mockUsers?: MockUserRecord[];
  __mockSessions?: Map<string, string>; // token -> userId
};

if (!globalAuth.__mockUsers) {
  globalAuth.__mockUsers = [...initialUsers];
}

if (!globalAuth.__mockSessions) {
  globalAuth.__mockSessions = new Map<string, string>();
}

const mockUsers = globalAuth.__mockUsers;
const mockSessions = globalAuth.__mockSessions;

export function sanitizeUser(userRecord: MockUserRecord): User {
  const { password: _, ...user } = userRecord;
  return user;
}

export function findUserByEmail(email: string): MockUserRecord | undefined {
  return mockUsers.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase()
  );
}

// MOCK ONLY — replace with bcrypt/argon2 hashing when a real backend lands.
export function validateCredentials(
  email: string,
  password: string
): User | null {
  const user = findUserByEmail(email);
  // MOCK ONLY — plaintext comparison; use a constant-time hash compare in production.
  if (!user || user.password !== password) {
    return null;
  }
  return sanitizeUser(user);
}

export function createSession(userId: string): string {
  const token = `mock-session-${Math.random().toString(36).substring(2, 11)}-${Date.now()}`;
  mockSessions.set(token, userId);
  return token;
}

export function getSessionUser(token: string): User | null {
  if (!token) return null;
  const userId = mockSessions.get(token);
  if (!userId) return null;
  const user = mockUsers.find((u) => u.id === userId);
  if (!user) return null;
  return sanitizeUser(user);
}

export function destroySession(token: string): boolean {
  if (!token) return false;
  return mockSessions.delete(token);
}

export function registerUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): { success: boolean; user?: User; error?: string } {
  const existing = findUserByEmail(data.email);
  if (existing) {
    return { success: false, error: "A user with this email already exists." };
  }

  const newUser: MockUserRecord = {
    id: `usr_${Date.now()}`,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    // MOCK ONLY — store plaintext; hash with bcrypt/argon2 in production.
    password: data.password,
    role: "customer",
  };

  mockUsers.push(newUser);
  return { success: true, user: sanitizeUser(newUser) };
}
