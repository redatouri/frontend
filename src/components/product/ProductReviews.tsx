"use client";

import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { StarRating } from "./StarRating";
import { useTranslations } from "next-intl";

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
  reviews: { author: string; quote: string; rating: number }[];
}

export function ProductReviews({ rating, reviewCount, reviews }: ProductReviewsProps) {
  const t = useTranslations("product");

  return (
    <ScrollReveal className="section-padding bg-bg-elevated">
      <div className="container-page">
        <p className="editorial-eyebrow">{t("reviewsEyebrow")}</p>
        <h2 className="mt-4 font-display text-display-lg font-semibold">{t("reviewsTitle")}</h2>

        <div className="mt-8 flex flex-wrap items-end gap-6 border-b border-border pb-8">
          <div>
            <p className="font-display text-5xl font-semibold text-text-primary">
              {rating.toFixed(1)}
            </p>
            <StarRating
              rating={rating}
              reviewCount={reviewCount}
              reviewLabel={t("reviews", { count: reviewCount })}
              size="md"
              className="mt-2"
            />
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote
              key={review.author}
              className="border border-border bg-bg-primary p-6"
            >
              <StarRating rating={review.rating} reviewCount={0} reviewLabel="" size="sm" />
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                &ldquo;{review.quote}&rdquo;
              </p>
              <footer className="mt-4 text-sm font-semibold text-text-primary">
                {review.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}
