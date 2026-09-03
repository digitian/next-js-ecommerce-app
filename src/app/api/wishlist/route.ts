import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/src/lib/api/auth";
import { getUserWishlist, addToWishlist, removeFromWishlist } from "@/src/lib/api/wishlist";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  
  const user = await getSession(token);
  if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const wishlist = await getUserWishlist(user.id);
  
  return NextResponse.json({ success: true, data: wishlist });
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  
  const user = await getSession(token);
  if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const schema = z.object({
    id: z.string(),
    product: z.any(),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
  }

  const wishlist = await addToWishlist(user.id, {
    id: parsed.data.id,
    product: parsed.data.product,
    addedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true, data: wishlist });
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get("session")?.value;
  if (!token) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  
  const user = await getSession(token);
  if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const itemId = searchParams.get("itemId");

  if (!itemId) {
    return NextResponse.json({ success: false, error: "Missing itemId" }, { status: 400 });
  }

  const wishlist = await removeFromWishlist(user.id, itemId);

  return NextResponse.json({ success: true, data: wishlist });
}
