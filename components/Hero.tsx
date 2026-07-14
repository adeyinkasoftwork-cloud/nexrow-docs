import { site } from "@/content/content";

export default function Hero() {
  return (
    /* overflow-x-clip, not overflow-hidden: the glows are wider than the content
       column, so the x axis must be contained or the page scrolls sideways at
       390px, but clipping y as well would cut the bloom off at the hero's top
       edge instead of letting it rise behind the glass header. */
    <div className="relative isolate overflow-x-clip pb-4 pt-12 sm:pt-16">
      {/* Two glows, not one. A violet core and a cooler, offset azure wash: the
          overlap is what gives the light a direction and the page a sky. Both
          breathe on a 12s cycle, far too slow to notice and just enough to stop
          the top of the page feeling like a screenshot. */}
      <div
        aria-hidden="true"
        className="nx-gradient-radial nx-breathe pointer-events-none absolute -top-40 left-1/2 -z-10 h-[460px] w-[680px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ opacity: "var(--hero-glow-opacity)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-[68%] -z-10 h-[320px] w-[420px] -translate-x-1/2 rounded-full bg-[rgb(var(--glow-blue))] opacity-[0.10] blur-3xl dark:opacity-[0.14]"
      />

      {/* Glass, to match the header, and the aperture motif in solid accent
          instead of the gradient speck that used to sit here. */}
      <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface-raised/70 py-1.5 pl-2.5 pr-3.5 text-[12px] font-medium text-ink-muted shadow-ambient backdrop-blur-md">
        <span
          aria-hidden="true"
          className="flex h-4 w-4 items-center justify-center rounded-full bg-accent/12"
        >
          <span className="nx-aperture h-[6px] w-[6px] text-accent" />
        </span>
        Solana, USDC, non-custodial escrow
      </div>

      <h1 className="mt-7 text-[44px] font-semibold leading-[1.04] sm:text-[60px]">
        <span className="nx-gradient-text">Escrow,</span>
        <br />
        in one link.
      </h1>

      <p className="mt-6 max-w-[600px] text-[17.5px] leading-[1.6] text-ink-muted sm:text-[19px]">
        {site.name} holds your client&apos;s USDC the moment the deal is agreed, and
        pays you the second they approve. No bank, no account, no 10% cut.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href="#overview"
          className="nx-cta nx-gradient inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-[14px] font-semibold text-white"
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
          className="nx-lift inline-flex items-center rounded-lg border border-line bg-surface-raised/80 px-4 py-2.5 text-[14px] font-medium text-ink-muted shadow-ambient backdrop-blur-md hover:text-ink"
        >
          Jump to the pitch
        </a>
      </div>

      {/* The stat strip is a featured surface: it is the hero's evidence, so it
          carries the gradient-tinted hairline and the deep shadow rather than
          sitting in the same 1px box as a definition list. */}
      <dl className="nx-featured mt-12 grid max-w-[620px] grid-cols-2 gap-px overflow-hidden bg-line sm:grid-cols-4">
        {[
          { k: "Take rate", v: "~1%" },
          { k: "Settlement", v: "~400ms" },
          { k: "Fee per tx", v: "Sub-cent" },
          { k: "MVP", v: "14 days" },
        ].map((stat) => (
          <div
            key={stat.k}
            className="group relative bg-surface-raised px-4 py-4 transition-colors duration-200 hover:bg-surface-sunken/60"
          >
            <dt className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-ink-subtle">
              {stat.k}
            </dt>
            {/* Tabular figures, but not a monospace face: these values are half
                words ("Sub-cent", "14 days") and mono sets them like code. */}
            <dd className="mt-1.5 text-[18px] font-semibold tabular-nums tracking-[-0.02em] text-ink">
              {stat.v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
