"use client";

import { useEffect, useState } from "react";

function readMediaQuery(query: string): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

export function useMediaQuery(query: string, defaultValue = false): boolean {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? defaultValue : readMediaQuery(query),
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 768px)");
}
