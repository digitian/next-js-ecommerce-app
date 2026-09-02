import { getTestimonials } from "@/src/lib/api/testimonials";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const data = await getTestimonials();
    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
