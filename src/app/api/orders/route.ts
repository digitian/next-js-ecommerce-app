import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/src/lib/api/auth";
import { getUserOrders } from "@/src/lib/api/orders";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST() {
  await delay(800 + Math.random() * 400); // simulate network latency
  
  try {
    // In a real app we would parse and validate the request body against a
    // Zod schema and persist the order — this mock just echoes a fake order id.
    
    return NextResponse.json({
      success: true,
      data: {
        orderId: `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        status: "processing",
        message: "Order placed successfully",
      }
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process order" },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const user = await getSession(token);
  if (!user) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await getUserOrders(user.id);
    return NextResponse.json({ success: true, data: orders });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 });
  }
}
