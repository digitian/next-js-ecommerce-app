import { getTestimonials } from "@/src/lib/api/testimonials";
import { TestimonialCarousel } from "./testimonial-carousel";

export async function TestimonialsSection() {
  const testimonials = await getTestimonials();

  return (
    <section className="container mx-auto py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Loved by Our Customers
        </h2>
        <p className="mt-4 max-w-[700px] text-muted-foreground md:text-lg">
          See what others are saying about our quality and how our furniture has transformed their spaces.
        </p>
      </div>
      <TestimonialCarousel testimonials={testimonials} />
    </section>
  );
}
