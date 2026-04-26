"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      data-analytics-submit-event="newsletter_submit"
      data-analytics-location="blog_newsletter"
      data-analytics-label="newsletter_signup"
      className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <input
        type="email"
        placeholder="you@company.com"
        className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
        required
      />
      <button
        type="submit"
        className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:opacity-90"
      >
        {submitted ? "Subscribed" : "Subscribe"}
      </button>
      {submitted ? (
        <p className="sm:col-span-2 text-xs text-cyan-200">
          Nice. You are on the list for pricing updates, benchmark drops, and new tutorials.
        </p>
      ) : null}
    </form>
  );
}
