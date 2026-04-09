import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

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
        tags: (post.content.match(/tags:\s*"?([^"\n]+)"?/) || [])[1]
          ?.split(",")
          .map((t: string) => t.trim()),
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

  // Extract tags from frontmatter for display
  const tagsMatch = post.content.match(/^tags:\s*"?([^"\n]+)"?/);
  const tags = tagsMatch
    ? tagsMatch[1].split(",").map((t) => t.trim())
    : [];

  return (
    <main className="mx-auto max-w-4xl px-6 py-10 md:px-10">
      <Link href="/blog" className="text-sm text-slate-300 hover:text-white">
        ← Back to blog
      </Link>
      <article className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-12">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
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
            Try comparing models yourself — free
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Stop guessing which AI is best. Prompt them both side by side on
            ModelHub AI.
          </p>
          <Link
            href="/chat"
            className="mt-4 inline-block rounded-2xl bg-white px-6 py-3 font-medium text-slate-950 transition hover:opacity-90"
          >
            Start chatting free
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
