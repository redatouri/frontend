import { cn } from "@/lib/utils";

type Category = "camera" | "audio" | "lighting" | "gimbal" | "lens" | "default";

interface ProductPlaceholderProps {
  category?: Category;
  className?: string;
  label?: string;
}

const icons: Record<Category, string> = {
  camera: "📷",
  audio: "🎙️",
  lighting: "💡",
  gimbal: "🎬",
  lens: "🔭",
  default: "📦",
};

export function ProductPlaceholder({
  category = "default",
  className,
  label,
}: ProductPlaceholderProps) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={label ?? "Product placeholder"}
    >
      <defs>
        <linearGradient id="ph-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D0D0F" />
          <stop offset="100%" stopColor="#1E1E22" />
        </linearGradient>
        <pattern id="ph-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 0 0 0 20"
            fill="none"
            stroke="#27272A"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#ph-bg)" />
      <rect width="400" height="400" fill="url(#ph-grid)" opacity="0.5" />
      <line x1="40" y1="360" x2="360" y2="360" stroke="#E8B923" strokeWidth="2" opacity="0.6" />
      <text
        x="200"
        y="190"
        textAnchor="middle"
        fontSize="64"
        fill="#E8B923"
        opacity="0.8"
      >
        {icons[category]}
      </text>
      {label && (
        <text
          x="200"
          y="250"
          textAnchor="middle"
          fontSize="14"
          fill="#A1A1AA"
          fontFamily="system-ui, sans-serif"
        >
          {label}
        </text>
      )}
      <text
        x="200"
        y="320"
        textAnchor="middle"
        fontSize="11"
        fill="#71717A"
        fontFamily="system-ui, sans-serif"
        letterSpacing="3"
      >
        MOVIECAM
      </text>
    </svg>
  );
}
