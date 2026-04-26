type Props = {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted?: boolean;
};

export function PricingCard({
  name,
  price,
  description,
  features,
  cta,
  href,
  highlighted,
}: Props) {
  return (
    <div
      className={`rounded-3xl border p-8 ${
        highlighted
          ? "border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_60px_rgba(34,211,238,0.12)]"
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{name}</p>
          <h3 className="mt-3 text-4xl font-semibold text-white">{price}</h3>
        </div>
        {highlighted ? (
          <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
            Most Popular
          </span>
        ) : null}
      </div>
      <p className="text-sm leading-6 text-slate-300">{description}</p>
      <ul className="mt-6 space-y-3 text-sm text-slate-200">
        {features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <a
        href={href}
        data-analytics-event="pricing_click"
        data-analytics-location="pricing_card"
        data-analytics-label={name.toLowerCase()}
        className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-3 font-medium text-slate-950 transition hover:opacity-90"
      >
        {cta}
      </a>
    </div>
  );
}
