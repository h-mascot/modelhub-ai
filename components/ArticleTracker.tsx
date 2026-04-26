"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void;
  }
}

type Props = {
  slug: string;
  category: string;
  intent: string;
};

export function ArticleTracker({ slug, category, intent }: Props) {
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.plausible !== "function") return;

    window.plausible("article_view", {
      props: {
        slug,
        category,
        intent,
      },
    });
  }, [slug, category, intent]);

  return null;
}
