import { Banknote, ShieldCheck, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductTrustBadgesProps {
  cod: string;
  chooseCarefully: string;
  delivery: string;
  className?: string;
}

export function ProductTrustBadges({
  cod,
  chooseCarefully,
  delivery,
  className,
}: ProductTrustBadgesProps) {
  const items = [
    { icon: Banknote, label: cod },
    { icon: ShieldCheck, label: chooseCarefully },
    { icon: Truck, label: delivery },
  ];

  return (
    <div className={cn("grid gap-3 sm:grid-cols-3", className)}>
      {items.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-2.5 border border-border bg-bg-elevated px-4 py-3 text-sm font-medium text-text-primary"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-bg-elevated ring-1 ring-border">
            <Icon className="size-4 text-cyan" strokeWidth={1.5} />
          </span>
          <span className="leading-snug">{label}</span>
        </div>
      ))}
    </div>
  );
}
