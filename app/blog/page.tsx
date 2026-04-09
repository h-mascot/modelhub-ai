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
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {post.title}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              {post.description}
            </p>
            <Link
              href={`/blog/${post.slug}`}
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
