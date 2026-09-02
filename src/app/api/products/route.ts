import { getProducts } from "@/src/lib/api/products";
import { NextRequest } from "next/server";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function GET(request: NextRequest) {
    // Simulate network latency
    await delay(200 + Math.random() * 300);

    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const skip = searchParams.has("skip") ? parseInt(searchParams.get("skip")!) : undefined;
    const take = searchParams.has("take") ? parseInt(searchParams.get("take")!) : undefined;

    const result = await getProducts({ category, sort, skip, take });

    return Response.json({ success: true, data: result });
}
