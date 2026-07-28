import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  reviewLabel?: string;
  size?: "sm" | "md";
  className?: string;
}

export function StarRating({
  rating,
  reviewCount,
  reviewLabel,
  size = "sm",
  className,
}: StarRatingProps) {
  const starSize = size === "sm" ? "size-3.5" : "size-4";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              starSize,
              i < Math.round(rating)
                ? "fill-rating text-rating"
                : "fill-transparent text-border",
            )}
          />
        ))}
      </div>
      <span className="text-sm text-text-secondary">
        {rating.toFixed(1)}
        {reviewCount != null && reviewLabel && (
          <span className="text-text-muted"> ({reviewLabel.replace("{count}", String(reviewCount))})</span>
        )}
      </span>
    </div>
  );
}
