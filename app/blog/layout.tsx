import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — LLM Pricing, Model Strategy & AI Decisions",
  description:
    "Practical guides on comparing AI models, reducing AI costs, and building multi-model workflows. Updated weekly by the ModelHub AI team.",
  alternates: {
    canonical: "https://modelhub-ai.vercel.app/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
