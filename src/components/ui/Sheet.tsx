"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "start" | "end";
  title?: string;
  className?: string;
}

export function Sheet({
  open,
  onClose,
  children,
  side = "end",
  title,
  className,
}: SheetProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-label="Close"
      />
      <div
        className={cn(
          "absolute top-0 flex h-full w-full max-w-[320px] flex-col bg-bg-elevated shadow-2xl sm:max-w-[360px]",
          side === "end" ? "end-0" : "start-0",
          className,
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-border px-4 py-4">
            <h2 className="font-display text-lg font-semibold">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="flex size-10 items-center justify-center rounded-full text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>,
    document.body,
  );
}
