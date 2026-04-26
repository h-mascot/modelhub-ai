"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function AcquisitionTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const source = searchParams.get("source");
    if (!source || typeof window === "undefined" || typeof window.plausible !== "function") return;

    window.plausible("signup_landing", {
      props: {
        source,
        article: searchParams.get("article") || "unknown",
        intent: searchParams.get("intent") || "unknown",
        cta: searchParams.get("cta") || "unknown",
      },
    });
  }, [searchParams]);

  return null;
}
