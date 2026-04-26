import Link from "next/link";
import { PricingCard } from "@/components/PricingCard";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { MODELS } from "@/lib/models";

const homepageComparisonPrompt = "Compare how two AI models would handle this task: write a clear customer update email about a delayed product launch. Show which answer is stronger and why.";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For testing prompts before you commit to another AI subscription.",
    features: ["10 messages per day", "GLM-5 access", "Saved local chat history"],
    cta: "Start free",
    href: "/chat",
  },
  {
    name: "Pro",
    price: "$15/mo",
    description: "The default plan for founders, operators, and indie hackers.",
    features: ["500 messages per month", "Compare mode", "Priority model routing"],
    cta: "Choose Pro",
    href: "https://buy.stripe.com/test_00g7sE3h0000000000",
    highlighted: true,
  },
  {
    name: "Power",
    price: "$39/mo",
    description: "Unlimited usage for teams that live inside AI all day.",
    features: ["Unlimited messages", "Fastest routing", "Early-access models"],
    cta: "Choose Power",
    href: "https://buy.stripe.com/test_3cs4gq2cW000000000",
  },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10 lg:px-12">
      <header className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur md:p-10">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold tracking-wide text-white">
            ModelHub AI
          </Link>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <Link href="/chat" data-analytics-event="cta_click" data-analytics-location="modelhub_nav" data-analytics-label="chat">Chat</Link>
            <Link href="/compare" data-analytics-event="cta_click" data-analytics-location="modelhub_nav" data-analytics-label="compare">Compare</Link>
            <Link href="/pricing" data-analytics-event="pricing_click" data-analytics-location="modelhub_nav" data-analytics-label="pricing">Pricing</Link>
            <Link href="/blog" data-analytics-event="cta_click" data-analytics-location="modelhub_nav" data-analytics-label="blog">Blog</Link>
          </div>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.85fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
              One workspace for the best LLMs
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white md:text-7xl">
              Stop paying for five AI apps just to find the one good answer.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              ModelHub AI lets you chat with top models in one clean interface, switch mid-thread, and compare answers side by side before you ship.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/chat"
                data-analytics-event="cta_click"
                data-analytics-location="modelhub_hero"
                data-analytics-label="launch_chat"
                className="rounded-2xl bg-white px-6 py-3 font-medium text-slate-950 transition hover:opacity-90"
              >
                Launch chat
              </Link>
              <Link
                href={{ pathname: "/compare", query: { prompt: homepageComparisonPrompt, source: "homepage", cta: "hero_compare" } }}
                data-analytics-event="cta_click"
                data-analytics-location="modelhub_hero"
                data-analytics-label="compare_models"
                className="rounded-2xl border border-white/10 px-6 py-3 font-medium text-slate-100 transition hover:border-cyan-400"
              >
                Compare models
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Live models</p>
            <div className="mt-6 space-y-4">
              {MODELS.map((model) => (
                <div key={model.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{model.name}</h3>
                      <p className="text-sm text-slate-400">{model.vendor}</p>
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-200">
                      {model.badge}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{model.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          ["Switch models instantly", "Move from GLM-5 to MiniMax mid-conversation without losing context."],
          ["Compare before deciding", "Run the same prompt across two models and spot the strongest answer fast."],
          ["Save your chat history", "MVP uses localStorage so your past prompts stay close while you iterate."],
        ].map(([title, body]) => (
          <div key={title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">{body}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-[2rem] border border-cyan-400/20 bg-cyan-400/10 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Fastest path to value</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Start with one prompt. See which model actually earns a spot in your stack.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-200">
              Most people do not need another AI subscription. They need one place to test the same task across the best models, keep the winner, and move on.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href={{ pathname: "/compare", query: { prompt: homepageComparisonPrompt, source: "homepage", cta: "midpage_compare" } }}
                data-analytics-event="cta_click"
                data-analytics-location="modelhub_midpage_value"
                data-analytics-label="run_first_comparison"
                className="rounded-2xl bg-white px-6 py-3 font-medium text-slate-950 transition hover:opacity-90"
              >
                Run your first comparison
              </Link>
              <Link
                href="/pricing"
                data-analytics-event="pricing_click"
                data-analytics-location="modelhub_midpage_value"
                data-analytics-label="see_plan_limits"
                className="rounded-2xl border border-white/20 px-6 py-3 font-medium text-white transition hover:border-white/40"
              >
                See plan limits
              </Link>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
            <p className="text-sm font-medium text-cyan-300">A simple buyer journey</p>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              {[
                "Paste the prompt you already use for work.",
                "Compare answers from the top models side by side.",
                "Upgrade only if the time saved is obvious.",
              ].map((step, index) => (
                <div key={step} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-xs font-semibold text-cyan-200">
                    {index + 1}
                  </span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Use Cases & Tutorials</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">How top operators use ModelHub</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Coding & Debugging",
              desc: "Compare Claude's logic vs GPT-5's syntax on the same gnarly bug.",
              icon: "💻",
              link: "/blog/claude-vs-gpt5-coding-2026",
            },
            {
              title: "Marketing Copy",
              desc: "Generate 50 ad hooks with Gemini, refine the best 5 with Claude.",
              icon: "✍️",
              link: "/blog/best-llm-for-marketing-copy-2026",
            },
            {
              title: "Data Analysis",
              desc: "Upload CSVs to Claude for deep reasoning, use Gemini for chart viz.",
              icon: "📊",
              link: "/blog/gemini-pro-vs-claude-for-data-analysis",
            },
            {
              title: "AI Agent Building",
              desc: "Test structured JSON outputs across all major function-calling models.",
              icon: "🤖",
              link: "/blog/building-agents-which-model-has-best-tool-calling",
            },
          ].map((useCase) => (
            <Link key={useCase.title} href={useCase.link} data-analytics-event="cta_click" data-analytics-location="modelhub_use_cases" data-analytics-label={useCase.title.toLowerCase().replace(/[^a-z0-9]+/g, "_")} className="group rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/10 hover:border-cyan-400/50 flex flex-col h-full">
              <div className="text-3xl mb-4">{useCase.icon}</div>
              <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">{useCase.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300 flex-grow">{useCase.desc}</p>
              <div className="mt-6 text-sm font-medium text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">Read tutorial →</div>
            </Link>
          ))}
        </div>
      </section>

      <SavingsCalculator />

      <section className="mt-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Pricing</p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Simple plans for real usage</h2>
          </div>
          <Link href="/pricing" data-analytics-event="pricing_click" data-analytics-location="modelhub_home_pricing" data-analytics-label="view_pricing_page" className="text-sm text-slate-300 hover:text-white">
            View pricing page →
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.name} {...plan} />
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">From the lab</p>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">More AI Tools from Money Z</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a href="https://websitereviewai.com" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-cyan-400/50">
            <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-sm">SiteInsight AI</div>
            <p className="text-xs text-slate-400 mt-2">Get your website reviewed by AI in seconds</p>
          </a>
          <a href="https://contentmorph-ai-ten.vercel.app" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-cyan-400/50">
            <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-sm">ContentMorph AI</div>
            <p className="text-xs text-slate-400 mt-2">Repurpose your content into any format instantly</p>
          </a>
          <a href="https://thumbnailforge-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-cyan-400/50">
            <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-sm">ThumbnailForge AI</div>
            <p className="text-xs text-slate-400 mt-2">Generate YouTube thumbnails with AI in seconds</p>
          </a>
          <a href="https://emailsubject-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-cyan-400/50">
            <div className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-sm">EmailSubject AI</div>
            <p className="text-xs text-slate-400 mt-2">Test &amp; score email subject lines with AI</p>
          </a>
        </div>
      </section>
    </main>
  );
}
