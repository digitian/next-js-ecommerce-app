import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/src/lib/api/auth";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function GET(request: NextRequest) {
  // Simulate network latency
  await delay(100);

  const token = request.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, error: "No active session" },
      { status: 401 }
    );
  }

  const user = await getSession(token);

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Invalid or expired session" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    data: user,
  });
}
