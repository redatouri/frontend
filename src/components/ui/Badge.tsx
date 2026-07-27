import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "scarcity" | "success";
  className?: string;
}

const variants = {
  default: "bg-bg-subtle text-text-secondary",
  accent: "bg-accent-muted text-accent",
  scarcity: "bg-scarcity/20 text-scarcity",
  success: "bg-success/20 text-success",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
