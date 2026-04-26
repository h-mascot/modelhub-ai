import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { NewsletterForm } from "./newsletter-form";

export const metadata: Metadata = {
  title: "Blog — LLM Pricing, Model Strategy & AI Decisions",
  description:
    "Practical guides on comparing AI models, reducing AI costs, and building multi-model workflows. Updated weekly by the ModelHub AI team.",
  alternates: {
    canonical: "https://modelhub-ai.vercel.app/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredCollections = [
    {
      title: "Cost comparisons",
      description: "High-intent pricing breakdowns for teams deciding whether to keep separate AI subscriptions.",
      href: "/blog/openai-vs-anthropic-vs-google-pricing-guide-2026",
    },
    {
      title: "LLM routing playbooks",
      description: "Practical tutorials on choosing the right model per task instead of forcing one model to do everything.",
      href: "/blog/the-model-routing-playbook-for-ai-power-users",
    },
    {
      title: "Team adoption guides",
      description: "Onboarding, procurement, and rollout guides that help companies turn experimentation into actual usage.",
      href: "/blog/how-to-onboard-your-team-onto-multi-model-ai-workflows",
    },
  ];

  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Blog</p>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            LLM pricing, model strategy, and practical AI decisions.
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Guides for developers, marketers, and teams who need to pick the
            right AI model — and stop overpaying for it.
          </p>
        </div>
        <Link href="/" className="text-sm text-slate-300 hover:text-white">
          Back home →
        </Link>
      </div>

      <section className="mb-10 grid gap-4 md:grid-cols-3">
        {featuredCollections.map((collection) => (
          <Link
            key={collection.title}
            href={collection.href}
            data-analytics-event="cta_click"
            data-analytics-location="blog_cluster_cards"
            data-analytics-label={collection.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-5 transition-all hover:border-cyan-400/30"
          >
            <p className="text-sm font-medium text-cyan-300">{collection.title}</p>
            <p className="mt-2 text-sm leading-7 text-slate-300">{collection.description}</p>
          </Link>
        ))}
      </section>

      <div className="grid gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-all hover:border-cyan-400/30"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.category}</span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {post.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              {post.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/blog/${post.slug}`}
              data-analytics-event="article_open"
              data-analytics-location="blog_index"
              data-analytics-label={post.slug}
              className="mt-5 inline-flex text-sm text-cyan-300 hover:text-cyan-200"
            >
              Read article →
            </Link>
          </article>
        ))}
      </div>

      {/* Newsletter signup CTA */}
      <section className="mt-16 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-8 text-center">
        <h3 className="text-2xl font-semibold text-white">
          Get weekly AI model updates
        </h3>
        <p className="mt-2 text-sm text-slate-300">
          New model launches, pricing changes, and benchmark shifts. No spam.
        </p>
        <NewsletterForm />
      </section>
    </main>
  );
}
