import { cn } from "@/lib/utils";
import { forwardRef, type LabelHTMLAttributes } from "react";

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("mb-2 block text-sm font-medium text-text-secondary", className)}
      {...props}
    />
  ),
);
Label.displayName = "Label";
