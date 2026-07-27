import { cn } from "@/lib/utils";
import { forwardRef, type SelectHTMLAttributes } from "react";

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-12 w-full appearance-none rounded-lg border border-border bg-bg-elevated px-4 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
