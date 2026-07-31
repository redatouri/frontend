import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ProductGridColumns = 3 | 4;

interface ProductGridProps {
  children: ReactNode;
  columns?: ProductGridColumns;
  className?: string;
}

const desktopCols: Record<ProductGridColumns, string> = {
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export function ProductGrid({ children, columns = 3, className }: ProductGridProps) {
  return (
    <div
      className={cn(
        "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 scrollbar-hide",
        "md:mx-0 md:grid md:snap-none md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:gap-8",
        desktopCols[columns],
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ProductGridItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-[82vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink",
        className,
      )}
    >
      {children}
    </div>
  );
}
