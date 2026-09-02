import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Leaf, PenTool, ShieldCheck, Heart } from "lucide-react";

import { Button, buttonVariants } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import PageHeaderComponent from "@/src/components/common/page-header";

export const metadata: Metadata = {
  title: "About Us | Storefront",
  description: "Learn more about our heritage, craftsmanship, and commitment to sustainable minimal design.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <Breadcrumb className="my-4 sm:my-6 md:my-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>About Us</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      {/* Hero Section */}
      <PageHeaderComponent
        title="Simplicity in Every Detail."
        description="We believe that a well-designed home is the foundation for a well-lived life. Our pieces are crafted to bring balance, warmth, and enduring quality to your everyday spaces."
      />

      {/* Brand Story Section */}
      <section className="px-4 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/images/brand-story.jpg"
              alt="A cinematic, wide shot of a modern minimalist living room with warm natural light"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-medium tracking-tight">Our Heritage</h2>
            <div className="flex flex-col gap-4 text-muted-foreground leading-relaxed">
              <p>
                Founded on the principles of Scandinavian minimalism and traditional craftsmanship, we started with a simple idea: that everyday objects should be both deeply functional and quietly beautiful.
              </p>
              <p>
                Every piece in our collection is thoughtfully designed to strip away the unnecessary, leaving only what is essential. We work with artisans who share our dedication to honest materials and timeless techniques, ensuring that our products don't just look good today, but will gracefully age in your home for generations.
              </p>
            </div>
            <Separator className="my-8 w-12" />
            <p className="font-medium text-foreground">
              "Design is not just what it looks like and feels like. Design is how it works."
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Bento Box */}
      <section className="bg-muted/50 py-24">
        <div className="px-4 max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-3xl font-medium tracking-tight">Core Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-background border-none shadow-sm">
              <CardHeader>
                <Leaf className="w-8 h-8 mb-4 text-primary" strokeWidth={1.5} />
                <CardTitle className="text-xl">Sustainable by Design</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  We source eco-friendly materials and prioritize ethical manufacturing to minimize our environmental footprint while maximizing durability.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="bg-background border-none shadow-sm">
              <CardHeader>
                <PenTool className="w-8 h-8 mb-4 text-primary" strokeWidth={1.5} />
                <CardTitle className="text-xl">Thoughtful Minimalism</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  We strip away the superfluous to reveal the essential. Our designs are quiet, purposeful, and adaptable to any living space.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background border-none shadow-sm">
              <CardHeader>
                <ShieldCheck className="w-8 h-8 mb-4 text-primary" strokeWidth={1.5} />
                <CardTitle className="text-xl">Uncompromising Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  We partner with masterful artisans and rigorously test our products to ensure they withstand the test of time and daily use.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-background border-none shadow-sm">
              <CardHeader>
                <Heart className="w-8 h-8 mb-4 text-primary" strokeWidth={1.5} />
                <CardTitle className="text-xl">Community & Care</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  We believe a home is made by the people in it. We are dedicated to fostering a community of design lovers and providing exceptional care to our customers at every step of their journey.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24 max-w-3xl mx-auto text-center flex flex-col gap-8">
        <h2 className="text-3xl font-medium tracking-tight">Ready to elevate your space?</h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Explore our curated collection of furniture and home essentials designed for modern living.
        </p>
        <div className="flex justify-center">
          <Link href="/products" className={buttonVariants({variant: 'default', size: 'lg'})}>
            Explore the Collection
            <ArrowRight data-icon="inline-end" />
          </Link>
        </div>
      </section>
    </div>
  );
}
