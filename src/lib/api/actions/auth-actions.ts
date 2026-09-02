"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authenticateUser, createAccount, endSession } from "@/src/lib/api/auth";
import type { User } from "@/src/types/user.types";

export type AuthActionResult = {
  success: boolean;
  user?: User;
  error?: string;
};

export async function loginAction(data: {
  email: string;
  password: string;
}): Promise<AuthActionResult> {
  try {
    const session = await authenticateUser(data.email, data.password);
    if (!session) {
      return {
        success: false,
        error: "Invalid email or password. Please check your credentials.",
      };
    }

    const cookieStore = await cookies();
    cookieStore.set("session", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return {
      success: true,
      user: session.user,
    };
  } catch (error) {
    console.error("Login action error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during login. Please try again.",
    };
  }
}

export async function registerAction(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<AuthActionResult> {
  try {
    const result = await createAccount(data);
    if (!result.success) {
      return {
        success: false,
        error: result.error || "Failed to create account.",
      };
    }

    return {
      success: true,
      user: result.user,
    };
  } catch (error) {
    console.error("Register action error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during registration. Please try again.",
    };
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (token) {
    await endSession(token);
  }

  cookieStore.delete("session");
  redirect("/");
}
