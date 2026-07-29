import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "accent" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-accent text-on-accent hover:bg-accent-hover font-semibold",
  accent: "bg-accent text-on-accent hover:bg-accent-hover font-semibold",
  secondary: "border border-border text-text-primary hover:border-accent hover:text-accent",
  ghost: "text-text-secondary hover:text-text-primary hover:bg-bg-subtle",
  outline:
    "border border-border text-text-primary hover:border-accent hover:bg-accent hover:text-on-accent",
};

const sizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-sm uppercase tracking-[0.08em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
