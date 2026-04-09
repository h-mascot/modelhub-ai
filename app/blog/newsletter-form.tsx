"use client";

export function NewsletterForm() {
  return (
    <form
      className="mt-4 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      action="#"
      onSubmit={(e) => {
        e.preventDefault();
        alert(
          "Thanks for your interest! Newsletter signup will be available soon."
        );
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
        Subscribe
      </button>
    </form>
  );
}
