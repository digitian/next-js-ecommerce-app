import { getProducts } from "@/src/lib/api/products";
import { NextRequest } from "next/server";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(request: NextRequest) {
    // Simulate network latency
    await delay(200 + Math.random() * 300);

    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const sort = searchParams.get("sort");
    const minPrice = searchParams.has("minPrice") ? parseInt(searchParams.get("minPrice")!) : undefined;
    const maxPrice = searchParams.has("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined;
    const minRating = searchParams.has("minRating") ? parseFloat(searchParams.get("minRating")!) : undefined;
    const skip = searchParams.has("skip") ? parseInt(searchParams.get("skip")!) : undefined;
    const take = searchParams.has("take") ? parseInt(searchParams.get("take")!) : undefined;

    const result = await getProducts({ category, subcategory, sort, minPrice, maxPrice, minRating, skip, take });

    return Response.json({ success: true, data: result });
}
