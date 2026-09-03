import { NextRequest, NextResponse } from "next/server";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
  await delay(800 + Math.random() * 400); // simulate network latency
  
  try {
    const body = await request.json();
    
    // In a real app we would validate `body` against Zod schema and save to DB
    
    return NextResponse.json({
      success: true,
      data: {
        orderId: `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
        status: "processing",
        message: "Order placed successfully",
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to process order" },
      { status: 400 }
    );
  }
}
