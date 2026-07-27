import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  height?: number;
  priority?: boolean;
}

export function Logo({ className, height = 48, priority = false }: LogoProps) {
  return (
    <Image
      src="/logo.webp"
      alt="Movie Cam"
      width={Math.round(height * 2.4)}
      height={height}
      priority={priority}
      className={cn("block h-auto w-auto bg-transparent object-contain", className)}
      style={{ height, width: "auto", maxWidth: "none" }}
    />
  );
}
