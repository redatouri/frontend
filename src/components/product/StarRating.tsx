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
  const value = Number(rating);
  const filled = Math.round(value);

  return (
    <div
      className={cn(
        "inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-bg-subtle px-3 py-1.5",
        size === "md" && "px-4 py-2",
        className,
      )}
      aria-label={`${value} out of 5 stars`}
    >
      <span
        className={cn(
          "font-semibold tabular-nums text-text-primary",
          size === "sm" ? "text-sm" : "text-base",
        )}
      >
        {value.toFixed(1)}
      </span>

      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              size === "sm" ? "size-3" : "size-3.5",
              i < filled
                ? "fill-amber-500 text-amber-500"
                : "fill-zinc-200 text-zinc-200",
            )}
          />
        ))}
      </div>

      {reviewCount != null && reviewLabel && (
        <span className="text-xs text-text-muted">
          {reviewLabel.replace("{count}", String(reviewCount))}
        </span>
      )}
    </div>
  );
}
