"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const currency = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function SavingsCalculator() {
  const [tools, setTools] = useState(3);
  const [avgCost, setAvgCost] = useState(20);
  const [seats, setSeats] = useState(1);

  const numbers = useMemo(() => {
    const currentMonthly = tools * avgCost * seats;
    const modelHubMonthly = seats === 1 ? 15 : seats * 39;
    const monthlySavings = Math.max(currentMonthly - modelHubMonthly, 0);
    const yearlySavings = monthlySavings * 12;

    return {
      currentMonthly,
      modelHubMonthly,
      monthlySavings,
      yearlySavings,
    };
  }, [avgCost, seats, tools]);

  return (
    <section className="mt-16 rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-cyan-500/10 to-slate-950 p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Savings calculator</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold text-white md:text-4xl">
            See how much duplicate AI subscriptions are really costing you.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Most teams do not need five separate AI tabs, five bills, and five workflows. Estimate your current stack, then compare it to a single ModelHub plan.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <label className="block rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <span className="text-sm text-slate-300">Paid AI tools</span>
              <input
                type="range"
                min={1}
                max={8}
                value={tools}
                onChange={(event) => setTools(Number(event.target.value))}
                className="mt-4 w-full accent-emerald-400"
              />
              <div className="mt-3 text-2xl font-semibold text-white">{tools}</div>
            </label>

            <label className="block rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <span className="text-sm text-slate-300">Avg monthly cost per tool</span>
              <input
                type="range"
                min={10}
                max={60}
                step={5}
                value={avgCost}
                onChange={(event) => setAvgCost(Number(event.target.value))}
                className="mt-4 w-full accent-emerald-400"
              />
              <div className="mt-3 text-2xl font-semibold text-white">{currency.format(avgCost)}</div>
            </label>

            <label className="block rounded-2xl border border-white/10 bg-slate-950/50 p-4">
              <span className="text-sm text-slate-300">Team seats</span>
              <input
                type="range"
                min={1}
                max={10}
                value={seats}
                onChange={(event) => setSeats(Number(event.target.value))}
                className="mt-4 w-full accent-emerald-400"
              />
              <div className="mt-3 text-2xl font-semibold text-white">{seats}</div>
            </label>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-400">Current monthly spend</div>
              <div className="mt-2 text-3xl font-semibold text-white">{currency.format(numbers.currentMonthly)}</div>
            </div>
            <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-4">
              <div className="text-sm text-emerald-200">Estimated ModelHub plan</div>
              <div className="mt-2 text-3xl font-semibold text-white">{currency.format(numbers.modelHubMonthly)}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-400">Monthly savings</div>
              <div className="mt-2 text-3xl font-semibold text-white">{currency.format(numbers.monthlySavings)}</div>
            </div>
            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4">
              <div className="text-sm text-cyan-200">Annual savings</div>
              <div className="mt-2 text-3xl font-semibold text-white">{currency.format(numbers.yearlySavings)}</div>
            </div>
          </div>

          <p className="mt-5 text-sm leading-6 text-slate-300">
            If your team mainly needs one workflow with access to multiple top models, consolidating tools can cut software spend fast and reduce context switching at the same time.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/pricing"
              data-analytics-event="pricing_click"
              data-analytics-location="modelhub_savings_calculator"
              data-analytics-label="view_pricing"
              className="rounded-2xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:opacity-90"
            >
              View plans
            </Link>
            <Link
              href="/compare"
              data-analytics-event="cta_click"
              data-analytics-location="modelhub_savings_calculator"
              data-analytics-label="compare_models"
              className="rounded-2xl border border-white/10 px-5 py-3 font-medium text-white transition hover:border-emerald-400"
            >
              Compare models
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Estimate based on list pricing. Actual savings depend on usage, seats, and how many standalone AI subscriptions you can replace.
          </p>
        </div>
      </div>
    </section>
  );
}
