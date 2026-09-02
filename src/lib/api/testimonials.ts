import { testimonials } from "./mockdata/testimonials";
import type { Testimonial } from "@/src/types/testimonial.types";

export async function getTestimonials(): Promise<Testimonial[]> {
  // Simulate network latency (200-500ms)
  await new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300));
  return testimonials;
}
