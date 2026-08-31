"use client";

import { useMemo, useState } from "react";
import { Star, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Progress } from "@/src/components/ui/progress";
import { Button } from "@/src/components/ui/button";
import type { Review } from "@/src/types/product.types";

interface ProductReviewsProps {
  reviews?: Review[];
}

export function ProductReviews({ reviews = [] }: ProductReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const { totalReviews, averageScore, distribution } = useMemo(() => {
    const total = reviews.length;
    if (total === 0) {
      return {
        totalReviews: 0,
        averageScore: "0.0",
        distribution: [5, 4, 3, 2, 1].map((star) => ({ star, count: 0, percentage: 0 }))
      };
    }

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = (sum / total).toFixed(1);

    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      if (counts[r.rating] !== undefined) {
        counts[r.rating] += 1;
      }
    });

    const dist = [5, 4, 3, 2, 1].map((star) => {
      const count = counts[star] || 0;
      return {
        star,
        count,
        percentage: Math.round((count / total) * 100)
      };
    });

    return {
      totalReviews: total,
      averageScore: avg,
      distribution: dist
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (selectedRating === null) return reviews;
    return reviews.filter((r) => r.rating === selectedRating);
  }, [reviews, selectedRating]);

  const handleRatingFilter = (star: number) => {
    setSelectedRating((prev) => (prev === star ? null : star));
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start w-full">
      {/* Left Column: Rating Summary Widget */}
      <aside className="w-full md:w-64 lg:w-72 shrink-0 flex flex-col" aria-label="Customer Reviews Summary">
        {/* Score & Stars */}
        <div className="flex flex-col items-start">
          <span className="text-5xl font-bold tracking-tight text-foreground leading-none">
            {averageScore}
          </span>
          <div className="flex items-center gap-1 mt-3" aria-label={`Average rating ${averageScore} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= Math.round(Number(averageScore));
              return (
                <Star
                  key={star}
                  className={cn(
                    "size-5",
                    isFilled
                      ? "fill-foreground text-foreground"
                      : "fill-muted text-muted-foreground/30"
                  )}
                />
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground mt-2 font-normal">
            Based on {totalReviews} reviews
          </p>
        </div>

        {/* Rating Breakdown */}
        <div className="flex flex-col gap-2 mt-6 w-full" role="group" aria-label="Filter reviews by rating">
          {distribution.map(({ star, count, percentage }) => {
            const isSelected = selectedRating === star;
            return (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingFilter(star)}
                className={cn(
                  "flex items-center gap-3 py-1 px-1.5 -mx-1.5 rounded-md text-left transition-colors cursor-pointer group hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected && "bg-muted font-medium"
                )}
                aria-pressed={isSelected}
                aria-label={`Filter by ${star} star reviews (${count} reviews)`}
              >
                <span className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground shrink-0 w-7">
                  <span>{star}</span>
                  <Star className="size-3 fill-muted-foreground text-muted-foreground group-hover:fill-foreground group-hover:text-foreground" />
                </span>
                <div className="flex-1">
                  <Progress value={percentage} className="w-full" />
                </div>
                <span className="text-sm text-muted-foreground tabular-nums text-right w-4 shrink-0 group-hover:text-foreground">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Filter Clear Button */}
        {selectedRating !== null && (
          <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Filtering by {selectedRating} stars
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedRating(null)}
              className="h-7 px-2 text-xs"
            >
              <X data-icon="inline-start" className="size-3" />
              Clear
            </Button>
          </div>
        )}
      </aside>

      {/* Right Column: Reviews List */}
      <section className="flex-1 w-full flex flex-col gap-6" aria-label="Customer Reviews List">
        {selectedRating !== null && (
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <p className="text-sm font-medium text-foreground">
              Showing {filteredReviews.length} {filteredReviews.length === 1 ? "review" : "reviews"} with {selectedRating} stars
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedRating(null)}
            >
              Show all reviews
            </Button>
          </div>
        )}

        {filteredReviews.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground text-sm">
            No reviews found for {selectedRating} stars.
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredReviews.map((review) => (
              <article
                key={review.id}
                className="flex flex-col gap-3 pb-6 border-b border-border last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">{review.author}</span>
                  <time className="text-sm text-muted-foreground">{review.date}</time>
                </div>
                <div className="flex items-center gap-1 text-foreground" aria-label={`${review.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={cn(
                        "size-4",
                        star <= review.rating
                          ? "fill-foreground text-foreground"
                          : "fill-muted text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {review.content}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
