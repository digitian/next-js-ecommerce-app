import { NextRequest } from "next/server";
import { getProductBySlug, getProductReviews } from "@/src/lib/api/products";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  await delay(200 + Math.random() * 300);

  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return Response.json({ success: false, error: "Product not found" }, { status: 404 });
  }

  const reviews = await getProductReviews(product.id);

  return Response.json({ success: true, data: reviews });
}
