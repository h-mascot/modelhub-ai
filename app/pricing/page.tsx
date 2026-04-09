import Link from "next/link";
import type { Metadata } from "next";
import { PricingCard } from "@/components/PricingCard";

export const metadata: Metadata = {
  title: "Pricing — Simple Plans for Real AI Usage",
  description:
    "Start free with 10 messages/day. Upgrade to Pro ($15/mo) for 500 messages and compare mode, or Power ($39/mo) for unlimited access to every top LLM.",
  alternates: {
    canonical: "https://modelhub-ai.vercel.app/pricing",
  },
};

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Try ModelHub AI before you add another tool to the stack.",
    features: ["10 messages per day", "GLM-5 access", "Local chat history"],
    cta: "Start free",
    href: "/chat",
  },
  {
    name: "Pro",
    price: "$15/mo",
    description:
      "For builders who want solid volume without managing multiple subscriptions.",
    features: ["500 messages per month", "Compare mode", "Priority routing"],
    cta: "Buy Pro",
    href: "https://buy.stripe.com/test_00g7sE3h0000000000",
    highlighted: true,
  },
  {
    name: "Power",
    price: "$39/mo",
    description:
      "Unlimited prompts and maximum speed for heavy users and small teams.",
    features: ["Unlimited messages", "Early-access models", "Priority support"],
    cta: "Buy Power",
    href: "https://buy.stripe.com/test_3cs4gq2cW000000000",
  },
];

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 md:px-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Pricing
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            Pick the plan that matches your prompt volume.
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Cancel anytime. No lock-in. Start free and upgrade when you're ready.
          </p>
        </div>
        <Link href="/" className="text-sm text-slate-300 hover:text-white">
          Back home →
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </div>

      {/* Savings comparison */}
      <section className="mt-20 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-semibold text-white">
          How much could you save?
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Most teams pay for 3–5 separate AI subscriptions. ModelHub replaces
          them all.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { service: "ChatGPT Plus", price: "$20/mo" },
            { service: "Claude Pro", price: "$20/mo" },
            { service: "Gemini Advanced", price: "$20/mo" },
            { service: "Perplexity Pro", price: "$20/mo" },
          ].map((item) => (
            <div
              key={item.service}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-sm font-medium text-white">{item.service}</p>
              <p className="text-lg font-semibold text-red-400">{item.price}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-4">
            <p className="text-sm font-medium text-white">ModelHub Power</p>
            <p className="text-lg font-semibold text-cyan-300">$39/mo</p>
          </div>
          <p className="text-sm text-slate-300">
            <span className="font-semibold text-white">Save $41+/mo</span> by
            consolidating your AI stack.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-white">
            Built for people tired of subscription bloat
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "I canceled ChatGPT Plus, Claude Pro, and Gemini Advanced. ModelHub gives me all three for a fraction of the cost.",
              author: "Sarah J.",
              role: "Indie Hacker",
            },
            {
              quote:
                "The side-by-side comparison mode saved me hours of debugging. When GPT-5 fails, Claude usually catches the issue.",
              author: "Michael T.",
              role: "Senior Developer",
            },
            {
              quote:
                "Best $15 I spend every month. Having all my prompts in one workspace makes context switching painless.",
              author: "Elena R.",
              role: "Founder",
            },
          ].map((testimonial) => (
            <div
              key={testimonial.author}
              className="rounded-2xl bg-white/5 p-6 border border-white/10"
            >
              <p className="text-sm italic text-slate-300">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-300 font-bold">
                  {testimonial.author[0]}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-xs text-slate-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-20 mb-10">
        <h2 className="text-3xl font-semibold text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 max-w-3xl">
          {[
            {
              q: "How does the 'Compare mode' work?",
              a: "Compare mode sends a single prompt to two different models (e.g., GPT-5 and Claude 4) simultaneously so you can evaluate quality side by side.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Yes. Cancel from your account dashboard — you keep access until the end of your billing cycle.",
            },
            {
              q: "What does 'priority model routing' mean?",
              a: "During high-traffic periods, Pro and Power users get priority access to API endpoints so your prompts are processed without queues.",
            },
            {
              q: "Is my chat history private?",
              a: "Free tier saves history locally in your browser. Paid tiers encrypt it end-to-end so only you can access your conversations.",
            },
            {
              q: "Which models are available?",
              a: "GLM-5, GLM-4, and MiniMax are available now. GPT and Claude integrations are coming soon.",
            },
          ].map((faq) => (
            <div
              key={faq.q}
              className="rounded-2xl bg-white/5 p-6 border border-white/10"
            >
              <h3 className="text-lg font-medium text-white">{faq.q}</h3>
              <p className="mt-2 text-sm text-slate-300">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mb-10 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-8 text-center">
        <h3 className="text-2xl font-semibold text-white">
          Start free. Upgrade when it clicks.
        </h3>
        <p className="mt-2 text-sm text-slate-300">
          No credit card required for the free tier. 10 messages per day with
          GLM-5.
        </p>
        <Link
          href="/chat"
          className="mt-4 inline-block rounded-2xl bg-white px-6 py-3 font-medium text-slate-950 transition hover:opacity-90"
        >
          Launch chat
        </Link>
      </section>
    </main>
  );
}
