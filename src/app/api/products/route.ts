import { getProducts } from "@/src/lib/api/products";
import { NextRequest } from "next/server";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(request: NextRequest) {
    // Simulate network latency
    await delay(200 + Math.random() * 300);

    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");

    const products = await getProducts({ category });

    return Response.json({ success: true, data: products });
}
