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

  const productSchema = z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    category: z.object({
      id: z.string(),
      slug: z.string(),
      title: z.string(),
      showcase_image: z.string(),
      thumb_image: z.string(),
    }),
    sub_category: z.object({
      id: z.string(),
      slug: z.string(),
      title: z.string(),
      category_id: z.string(),
      showcase_image: z.string(),
      thumb_image: z.string(),
    }),
    brief_description: z.string(),
    description: z.string(),
    price: z.number(),
    base_price: z.number().optional(),
    discount_percentage: z.number().optional(),
    images: z.array(z.object({ url: z.string(), alt: z.string() })),
    rating: z.number().nullable().optional(),
    review_count: z.number().nullable().optional(),
    availability: z.enum(["in-stock", "out-of-stock", "pre-order"]).optional(),
    sku: z.string().optional(),
    tags: z.array(z.string()).optional(),
    specifications: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    care_instructions: z.string().optional(),
  });

  const schema = z.object({
    id: z.string(),
    product: productSchema,
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
  }

  const wishlist = await addToWishlist(user.id, {
    id: parsed.data.id,
    // Store a lightweight snapshot (matching WishlistItemProductSnapshot),
    // not the full validated product payload — same shape the client
    // already builds in useWishlistStore's addItem/toggleItem calls.
    product: {
      id: parsed.data.product.id,
      slug: parsed.data.product.slug,
      name: parsed.data.product.name,
      price: parsed.data.product.price,
      base_price: parsed.data.product.base_price,
      image: parsed.data.product.images[0]?.url ?? "",
    },
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
