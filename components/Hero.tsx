import { site } from "@/content/content";

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden pb-2 pt-10 sm:pt-14">
      {/* Faint radial glow behind the hero. */}
      <div
        aria-hidden="true"
        className="nx-gradient-radial pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[620px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ opacity: "var(--hero-glow-opacity)" }}
      />

      <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised px-3 py-1.5 text-[12px] font-medium text-ink-muted">
        <span aria-hidden="true" className="nx-gradient h-1.5 w-1.5 rounded-full" />
        Solana, USDC, non-custodial escrow
      </div>

      <h1 className="mt-6 text-[40px] font-semibold leading-[1.08] tracking-tight sm:text-[52px]">
        <span className="nx-gradient-text">Escrow,</span>
        <br />
        in one link.
      </h1>

      <p className="mt-5 max-w-[600px] text-[17px] leading-relaxed text-ink-muted sm:text-[18px]">
        {site.name} holds your client&apos;s USDC the moment the deal is agreed, and
        pays you the second they approve. No bank, no account, no 10% cut.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <a
          href="#overview"
          className="nx-cta nx-gradient inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[14px] font-semibold text-white transition-transform hover:-translate-y-px"
        >
          <span className="relative z-10">Read the thesis</span>
          <svg
            className="relative z-10"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>

        <a
          href="#pitch-deck"
          className="inline-flex items-center rounded-lg border border-line bg-surface-raised px-4 py-2.5 text-[14px] font-medium text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
        >
          Jump to the pitch
        </a>
      </div>

      <dl className="mt-10 grid max-w-[620px] grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
        {[
          { k: "Take rate", v: "~1%" },
          { k: "Settlement", v: "~400ms" },
          { k: "Fee per tx", v: "Sub-cent" },
          { k: "MVP", v: "14 days" },
        ].map((stat) => (
          <div key={stat.k} className="bg-surface-raised px-4 py-3.5">
            <dt className="text-[11.5px] uppercase tracking-wide text-ink-subtle">
              {stat.k}
            </dt>
            <dd className="mt-1 text-[17px] font-semibold text-ink">{stat.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
