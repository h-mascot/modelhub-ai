import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://modelhub-ai.vercel.app"),
  title: {
    default: "ModelHub AI — Compare & Chat With the Best LLMs in One Place",
    template: "%s | ModelHub AI",
  },
  description:
    "Compare GPT-5, Claude 4, Gemini 2, GLM-5 and more side by side. One workspace, all the best AI models. Free tier available.",
  keywords: [
    "AI model comparison",
    "LLM aggregator",
    "compare ChatGPT Claude Gemini",
    "multi-model AI chat",
    "AI subscription alternative",
    "best AI model 2026",
    "GPT-5 vs Claude",
    "AI for developers",
    "AI for startups",
    "reduce AI costs",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://modelhub-ai.vercel.app",
    siteName: "ModelHub AI",
    title: "ModelHub AI — Compare & Chat With the Best LLMs in One Place",
    description:
      "Stop paying for five AI apps. Compare GPT-5, Claude 4, Gemini 2, and GLM-5 side by side. Free tier available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ModelHub AI — One workspace for the best LLMs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ModelHub AI — Compare & Chat With the Best LLMs",
    description:
      "Stop paying for five AI apps. Compare top AI models side by side. Free tier available.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="canonical" href="https://modelhub-ai.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "ModelHub AI",
              url: "https://modelhub-ai.vercel.app",
              description:
                "Compare and chat with the best LLMs in one workspace. Side-by-side model comparison for developers, marketers, and teams.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              offers: [
                {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                  description: "Free tier — 10 messages per day",
                },
                {
                  "@type": "Offer",
                  price: "15",
                  priceCurrency: "USD",
                  description: "Pro — 500 messages per month, compare mode",
                },
                {
                  "@type": "Offer",
                  price: "39",
                  priceCurrency: "USD",
                  description: "Power — unlimited messages, priority routing",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-[#070b14] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
