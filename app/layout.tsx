import type { Metadata } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";

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
      <body className="bg-[#070b14] text-slate-100 antialiased">
        <Analytics />
        {children}
        <footer className="border-t border-white/10 mt-24">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <a href="https://websitereviewai.com" target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-cyan-400/50 transition">
                <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-sm">SiteInsight AI</div>
                <p className="text-xs text-slate-400 mt-1">Get your website reviewed by AI</p>
              </a>
              <a href="https://contentmorph-ai-ten.vercel.app" target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-cyan-400/50 transition">
                <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-sm">ContentMorph AI</div>
                <p className="text-xs text-slate-400 mt-1">Repurpose content into any format</p>
              </a>
              <a href="https://thumbnailforge-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-cyan-400/50 transition">
                <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-sm">ThumbnailForge AI</div>
                <p className="text-xs text-slate-400 mt-1">Generate YouTube thumbnails with AI</p>
              </a>
              <a href="https://emailsubject-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="group rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 hover:border-cyan-400/50 transition">
                <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-sm">EmailSubject AI</div>
                <p className="text-xs text-slate-400 mt-1">Test email subject lines with AI</p>
              </a>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
              <p>© 2026 ModelHub AI. All rights reserved.</p>
              <p className="mt-2 sm:mt-0">Built with ✨ by Money Z</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
