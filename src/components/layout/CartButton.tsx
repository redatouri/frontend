"use client";

import { useEffect, useState } from "react";

export function CartButton({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex size-12 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-bg-subtle hover:text-text-primary"
      aria-label="Cart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
      {mounted && count > 0 && (
        <span className="absolute -end-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-bg-primary">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
