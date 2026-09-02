import { getProductBySlug } from "@/src/lib/api/products";
export async function GET() { 
    return Response.json(await getProductBySlug("sofa-karlstad")); 
}
