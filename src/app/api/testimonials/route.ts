import { getTestimonials } from "@/src/lib/api/testimonials";

export async function GET() {
  try {
    const data = await getTestimonials();
    return Response.json({ success: true, data });
  } catch {
    return Response.json(
      { success: false, error: "Failed to fetch testimonials" },
      { status: 500 }
    );
  }
}
