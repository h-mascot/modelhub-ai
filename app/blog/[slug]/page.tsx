import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleTracker } from "@/components/ArticleTracker";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

function buildComparisonPrompt(title: string, category: string) {
  return `I need to choose the best AI model for this task: ${title}. Compare the strengths, weaknesses, and ideal use case for each answer, then recommend the better model for a ${category.toLowerCase()} workflow.`;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = getPostBySlug(slug);
    if (!post) return {};

    const title = post.title;
    const description = post.description;
    const url = `https://modelhub-ai.vercel.app/blog/${slug}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
        type: "article",
        publishedTime: post.date,
        authors: ["ModelHub AI"],
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
      alternates: {
        canonical: url,
      },
    };
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const paragraphs = post.content
    .split("\n\n")
    .map((block) => block.trim())
    .filter(Boolean);
  const comparisonPrompt = buildComparisonPrompt(post.title, post.category);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 md:px-10">
      <ArticleTracker slug={post.slug} category={post.category} intent={post.intent} />
      <Link href="/blog" className="text-sm text-slate-300 hover:text-white">
        ← Back to blog
      </Link>
      <article className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        {post.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-300">{post.description}</p>

        <div className="prose prose-invert mt-10 max-w-none">
          {paragraphs.map((paragraph) =>
            paragraph.startsWith("## ") ? (
              <h2 key={paragraph}>{paragraph.replace("## ", "")}</h2>
            ) : paragraph.startsWith("### ") ? (
              <h3 key={paragraph}>{paragraph.replace("### ", "")}</h3>
            ) : paragraph.startsWith("- ") ? (
              <ul key={paragraph}>
                {paragraph.split("\n").map((item) => (
                  <li key={item}>{item.replace(/^- /, "")}</li>
                ))}
              </ul>
            ) : (
              <p key={paragraph}>{paragraph}</p>
            ),
          )}
        </div>

        {/* CTA after article */}
        <div className="mt-12 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-8 text-center">
          <h3 className="text-xl font-semibold text-white">
            Run this decision in Compare mode
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Land on a prefilled comparison instead of a blank box, then adjust the prompt for your exact use case.
          </p>
          <Link
            href={{
              pathname: "/compare",
              query: {
                prompt: comparisonPrompt,
                source: "blog",
                article: post.slug,
                intent: post.intent,
                cta: post.cta,
              },
            }}
            data-analytics-event="article_cta_click"
            data-analytics-location="blog_post_cta"
            data-analytics-label={post.slug}
            className="mt-4 inline-block rounded-2xl bg-white px-6 py-3 font-medium text-slate-950 transition hover:opacity-90"
          >
            Open prefilled comparison
          </Link>
        </div>

        {/* Related articles nav */}
        <nav className="mt-10 border-t border-white/10 pt-8">
          <Link
            href="/blog"
            className="text-sm text-cyan-300 hover:text-cyan-200"
          >
            ← More articles
          </Link>
        </nav>
      </article>
    </main>
  );
}
