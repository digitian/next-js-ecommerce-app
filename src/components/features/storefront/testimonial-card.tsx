import { Card, CardContent, CardFooter, CardHeader } from "@/src/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { Star, User } from "lucide-react";
import type { Testimonial } from "@/src/types/testimonial.types";
import { cn } from "@/src/lib/utils";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <Card className={cn("flex h-full flex-col", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-0.5 text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-4",
                i < testimonial.rating ? "fill-current" : "text-muted-foreground opacity-30"
              )}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="leading-relaxed text-muted-foreground">
          &quot;{testimonial.text}&quot;
        </p>
      </CardContent>
      <CardFooter className="pt-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>
              <User className="size-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">{testimonial.name}</span>
            <span className="text-xs text-muted-foreground">
              {new Date(testimonial.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
