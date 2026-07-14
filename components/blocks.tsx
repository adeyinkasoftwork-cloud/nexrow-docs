import type { Block } from "@/content/content";

/**
 * Surface hierarchy is the load-bearing decision in this file.
 *
 * Every block below picks one of three tiers on purpose, and the choice is what
 * creates the hierarchy that a single shared card style destroyed:
 *
 *   .nx-quiet     definitions, data model, "Later" roadmap: reference material
 *   .nx-raised    cards, "Next" roadmap, tables: the working surface
 *   .nx-featured  key insight, OKRs, "Now" roadmap: the things that matter
 *
 * The brand gradient appears in exactly one block here (the key-insight rail,
 * and the highlighted column of the competitive matrix). Everywhere brand colour
 * is wanted at small sizes, the solid accent token does the job.
 */

/* ── The aperture ────────────────────────────────────────────────────────── */

/**
 * The motif, taken from the logo: a vortex of arcs converging on a hollow eye.
 * That eye is what recurs across the site. At 9px it is the node on the section
 * rail; at 5px, here, it is the tick on every key result and roadmap item.
 *
 * A ring rather than a dot, because the void is the whole point: it is what the
 * logo's arcs are spiralling into, and it is what makes the marker read as this
 * site's marker rather than a bullet from any design system.
 */
function Aperture({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`nx-aperture h-[5px] w-[5px] ${className}`}
    />
  );
}

/* ── Callout ─────────────────────────────────────────────────────────────── */

/**
 * Three variants, three identities, deliberately not one card:
 *
 *   key      a featured surface. Gradient rail, brand bloom bleeding out of the
 *            left edge, gradient-tinted hairline, deep shadow. It is the loudest
 *            thing on the page after the hero, which is the point of an insight.
 *   info     no card at all. A tinted wash and an accent edge. It recedes into
 *            the prose it annotates.
 *   warning  the same recessive shape in amber, so the two annotations read as
 *            a pair and neither competes with the insight.
 */
export function Callout({
  variant,
  title,
  body,
}: {
  variant: "info" | "warning" | "key";
  title: string;
  body: string;
}) {
  if (variant === "key") {
    return (
      <div className="nx-featured nx-lift my-8 overflow-hidden py-5 pl-6 pr-6">
        {/* The bloom, escaping from behind the rail. Depth, not decoration. */}
        <span
          aria-hidden="true"
          className="nx-bloom -left-16 top-1/2 h-40 w-40 -translate-y-1/2"
        />
        {/* One of the five sanctioned uses of the gradient. */}
        <span
          aria-hidden="true"
          className="nx-gradient-y absolute inset-y-0 left-0 w-[3px]"
        />

        <div className="relative flex gap-3.5">
          <span
            aria-hidden="true"
            className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/25 bg-accent/10 text-accent"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2 9.6 8.6 3 11l6.6 2.4L12 20l2.4-6.6L21 11l-6.6-2.4z" />
            </svg>
          </span>
          <div>
            <p className="text-[16px] font-semibold leading-snug tracking-[-0.012em] text-ink">
              {title}
            </p>
            <p className="mt-2 text-[14.5px] leading-[1.7] text-ink-muted">{body}</p>
          </div>
        </div>
      </div>
    );
  }

  const tone =
    variant === "info"
      ? {
          edge: "bg-accent-2",
          wash: "bg-accent-2/[0.05]",
          icon: "text-accent-2",
          glyph: (
            <path d="M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" />
          ),
        }
      : {
          edge: "bg-amber-500",
          wash: "bg-amber-500/[0.06]",
          icon: "text-amber-600 dark:text-amber-400",
          glyph: (
            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
          ),
        };

  return (
    <div
      className={`relative my-6 overflow-hidden rounded-r-lg py-3.5 pl-5 pr-5 ${tone.wash}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-[2px] ${tone.edge}`}
      />
      <div className="flex gap-3">
        <span className={`mt-[3px] shrink-0 ${tone.icon}`} aria-hidden="true">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {tone.glyph}
          </svg>
        </span>
        <div>
          <p className="text-[13.5px] font-semibold text-ink">{title}</p>
          <p className="mt-0.5 text-[14px] leading-[1.7] text-ink-muted">{body}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Q & A ───────────────────────────────────────────────────────────────── */

/**
 * Not cards. Ten stacked boxes was the single biggest contributor to the
 * page-of-identical-rectangles problem, so this is an editorial list: hairline
 * rules, the numeral held out in the margin, and the number igniting to accent
 * on hover. Lighter, and it lets the callouts around it actually stand out.
 */
export function QA({ items }: { items: { q: string; a: string }[] }) {
  return (
    <ol className="my-6 border-t border-line">
      {items.map((item, i) => (
        <li
          key={item.q}
          className="group border-b border-line transition-colors duration-200 hover:bg-surface-sunken/50"
        >
          <div className="flex gap-4 px-1 py-4 sm:px-2">
            <span className="mt-[2px] w-6 shrink-0 font-mono text-[11px] font-semibold tracking-[0.08em] text-ink-subtle transition-colors duration-200 group-hover:text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-[15.5px] font-semibold leading-snug tracking-[-0.012em] text-ink">
                {item.q}
              </p>
              <p className="mt-1.5 text-[14.5px] leading-[1.7] text-ink-muted">
                {item.a}
              </p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── Comparison table ────────────────────────────────────────────────────── */

/**
 * The highlighted column is this section's one focal moment, so it gets the
 * gradient: a cap across the top of the column plus a faint accent wash down it.
 * The pinned first column casts an edge shadow, which is what tells you the
 * table scrolls sideways before you try it.
 */
export function ComparisonTable({
  columns,
  rows,
  highlightColumn,
}: {
  columns: string[];
  rows: { label: string; cells: string[] }[];
  highlightColumn?: number;
}) {
  return (
    <div className="my-8">
      <div className="nx-scroll-x overflow-x-auto rounded-xl border border-line bg-surface-raised shadow-ambient">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-surface-sunken">
              <th
                scope="col"
                className="nx-pinned sticky left-0 z-10 bg-surface-sunken px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-subtle"
              >
                <span className="sr-only">Criterion</span>
              </th>
              {columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={`relative px-4 py-3.5 text-[13px] font-semibold ${
                    i === highlightColumn
                      ? "bg-accent/[0.07] text-accent"
                      : "text-ink-muted"
                  }`}
                >
                  {i === highlightColumn && (
                    <span
                      aria-hidden="true"
                      className="nx-gradient absolute inset-x-0 top-0 h-[2px]"
                    />
                  )}
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="group border-b border-line last:border-0"
              >
                <th
                  scope="row"
                  className="nx-pinned sticky left-0 z-10 bg-surface-raised px-4 py-3.5 text-[13.5px] font-medium text-ink transition-colors duration-200 group-hover:bg-surface-sunken"
                >
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={`${row.label}-${i}`}
                    className={`whitespace-nowrap px-4 py-3.5 text-[13.5px] transition-colors duration-200 ${
                      i === highlightColumn
                        ? "bg-accent/[0.07] font-semibold text-ink group-hover:bg-accent/[0.11]"
                        : "text-ink-muted group-hover:bg-surface-sunken/50"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2.5 text-[12px] text-ink-subtle lg:hidden">
        Scroll the table sideways to see every competitor.
      </p>
    </div>
  );
}

/* ── OKRs ────────────────────────────────────────────────────────────────── */

/**
 * Featured surfaces with an identity of their own: a tinted header well holding
 * the objective id, then the key results as measured rows in a sunken tray,
 * rather than as a scatter of gradient-dotted pills. An OKR card should look
 * like an instrument, not like a tag cloud.
 */
export function OKRs({
  objectives,
}: {
  objectives: { id: string; period: string; title: string; krs: string[] }[];
}) {
  const periods = Array.from(new Set(objectives.map((o) => o.period)));

  return (
    <div className="my-8 space-y-10">
      {periods.map((period) => (
        <div key={period}>
          <p className="mb-4 flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
            <Aperture className="text-accent" />
            {period}
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </p>

          <div className="space-y-5">
            {objectives
              .filter((o) => o.period === period)
              .map((objective) => (
                <div
                  key={objective.id}
                  className="nx-featured nx-lift overflow-hidden"
                >
                  <span
                    aria-hidden="true"
                    className="nx-bloom -right-10 -top-16 h-44 w-44"
                  />

                  <div className="relative flex items-baseline gap-3 px-5 pt-5">
                    <span className="rounded-md border border-accent/25 bg-accent/10 px-2 py-[3px] font-mono text-[11.5px] font-bold tracking-[0.06em] text-accent">
                      {objective.id}
                    </span>
                    <p className="text-[16.5px] font-semibold leading-snug tracking-[-0.015em] text-ink">
                      {objective.title}
                    </p>
                  </div>

                  {/* The key results read as a measured tray bolted under the
                      objective, not as a scatter of pills. Full-width divided
                      rows rather than a 2-up grid: an odd number of KRs would
                      otherwise leave a dead cell, which looks like a bug. */}
                  <ul className="relative mt-4 divide-y divide-line border-t border-line bg-surface-sunken/60">
                    {objective.krs.map((kr) => (
                      <li
                        key={kr}
                        className="flex items-start gap-3 px-5 py-3 text-[13.5px] leading-snug text-ink-muted"
                      >
                        <Aperture className="mt-[6px] text-accent" />
                        {kr}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Stepper ─────────────────────────────────────────────────────────────── */

/** The connector is the section rail again, at a smaller scale. */
export function Stepper({
  steps,
}: {
  steps: { label: string; title: string; body: string }[];
}) {
  return (
    <ol className="my-8">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li
            key={step.label + step.title}
            className="group relative flex gap-5 pb-8 last:pb-0"
          >
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-[13px] top-8 bottom-0 w-px bg-gradient-to-b from-accent/35 to-line"
              />
            )}

            <span
              aria-hidden="true"
              className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface font-mono text-[11px] font-semibold text-ink-muted shadow-ambient transition-colors duration-200 group-hover:border-accent/50 group-hover:text-accent"
            >
              {i + 1}
            </span>

            <div className="pt-0.5">
              <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent">
                {step.label}
              </p>
              <p className="mt-1.5 text-[15.5px] font-semibold leading-snug tracking-[-0.012em] text-ink">
                {step.title}
              </p>
              <p className="mt-1 text-[14.5px] leading-[1.7] text-ink-muted">
                {step.body}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ── Roadmap ─────────────────────────────────────────────────────────────── */

/**
 * Three columns, three elevations. "Now" is a featured surface with a bloom and
 * a gradient-tinted hairline; "Next" is the default raised card; "Later" is a
 * quiet, sunken panel that visibly recedes. Previously all three were identical
 * cards distinguished only by a badge colour, which said nothing about time.
 */
const phaseStyle = {
  Now: {
    surface: "nx-featured nx-lift",
    badge:
      "bg-accent text-white shadow-[inset_0_1px_0_0_rgb(255_255_255/0.35),0_2px_10px_-2px_rgb(var(--accent)/0.55)]",
    tick: "text-accent",
    text: "text-ink-muted",
  },
  Next: {
    surface: "nx-raised nx-lift",
    badge: "border border-accent/30 bg-accent/10 text-accent",
    tick: "text-accent/50",
    text: "text-ink-muted",
  },
  Later: {
    surface: "nx-quiet",
    badge: "border border-line bg-surface-raised text-ink-subtle",
    tick: "text-line-strong",
    text: "text-ink-subtle",
  },
} as const;

export function Roadmap({
  columns,
}: {
  columns: { phase: "Now" | "Next" | "Later"; window: string; items: string[] }[];
}) {
  return (
    <div className="my-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {columns.map((column) => {
        const style = phaseStyle[column.phase];
        return (
          <div
            key={column.phase}
            className={`relative flex flex-col overflow-hidden p-5 ${style.surface}`}
          >
            {column.phase === "Now" && (
              <span
                aria-hidden="true"
                className="nx-bloom -right-12 -top-14 h-40 w-40"
              />
            )}

            <div className="relative flex items-center justify-between gap-2">
              <span
                className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.09em] ${style.badge}`}
              >
                {column.phase}
              </span>
              <span className="font-mono text-[11px] tracking-[0.04em] text-ink-subtle">
                {column.window}
              </span>
            </div>

            <ul className="relative mt-5 space-y-3">
              {column.items.map((item) => (
                <li
                  key={item}
                  className={`flex gap-3 text-[14px] leading-snug ${style.text}`}
                >
                  <Aperture className={`mt-[6px] ${style.tick}`} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ── Slides ──────────────────────────────────────────────────────────────── */

/**
 * Pitch slides get a deck identity: a large ghost numeral watermarked into the
 * corner, a quiet resting state, and a hover that lifts the card, ignites its
 * gradient hairline and brings the numeral up to accent. They should feel like
 * slides you could pull out of a rack, not like more content cards.
 */
export function Slides({
  items,
}: {
  items: { n: number; title: string; body: string }[];
}) {
  return (
    <ol className="my-8 grid gap-4 sm:grid-cols-2">
      {items.map((slide) => (
        <li
          key={slide.n}
          className="nx-quiet nx-lift group relative overflow-hidden p-5 transition-shadow"
        >
          {/* The watermark: the slide's number as furniture. It sits fully inside
              the card, because a numeral cropped by the card edge reads as a
              layout bug rather than as a deliberate mark. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-3 select-none font-mono text-[40px] font-bold leading-none tracking-tight text-ink/[0.07] transition-colors duration-300 group-hover:text-accent/25"
          >
            {String(slide.n).padStart(2, "0")}
          </span>

          {/* The hairline only ignites on hover, so the grid rests quiet. */}
          <span
            aria-hidden="true"
            className="nx-gradient pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-70"
          />

          <p className="relative pr-14 text-[15px] font-semibold leading-snug tracking-[-0.012em] text-ink">
            {slide.title}
          </p>
          <p className="relative mt-2 text-[14px] leading-[1.7] text-ink-muted">
            {slide.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ── Cards, definitions, code, data model ────────────────────────────────── */

/** The default working surface: raised, lit top edge, lifts on hover. */
export function Cards({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="my-8 grid gap-4 sm:grid-cols-2">
      {items.map((card) => (
        <div key={card.title} className="nx-raised nx-lift p-5">
          <p className="text-[15.5px] font-semibold leading-snug tracking-[-0.012em] text-ink">
            {card.title}
          </p>
          <p className="mt-2 text-[14.5px] leading-[1.7] text-ink-muted">
            {card.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Reference material: quiet, sunken, no elevation. It is meant to be scanned. */
export function Definitions({
  items,
}: {
  items: { term: string; detail: string }[];
}) {
  return (
    <dl className="nx-quiet my-6 divide-y divide-line overflow-hidden">
      {items.map((item) => (
        <div
          key={item.term}
          className="grid gap-1 px-5 py-3.5 sm:grid-cols-[168px_1fr] sm:gap-4"
        >
          <dt className="text-[13.5px] font-semibold tracking-[-0.006em] text-ink">
            {item.term}
          </dt>
          <dd className="text-[14.5px] leading-[1.7] text-ink-muted">
            {item.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Carved in, not raised: an inset shadow, the only recessed surface on the site. */
export function CodeBlock({ code, caption }: { code: string; caption?: string }) {
  return (
    <figure className="my-6">
      <div className="nx-well nx-scroll-x overflow-x-auto p-5">
        <pre className="font-mono text-[12.5px] leading-[1.75] text-ink-muted">
          <code>{code}</code>
        </pre>
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-[12.5px] text-ink-subtle">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function DataModel({
  fields,
}: {
  fields: { field: string; type: string; note: string }[];
}) {
  return (
    <div className="nx-quiet nx-scroll-x my-6 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            {["Field", "Type", "Notes"].map((head) => (
              <th
                key={head}
                scope="col"
                className="px-4 py-2.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-subtle"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr
              key={field.field}
              className="border-b border-line/70 transition-colors duration-200 last:border-0 hover:bg-surface-raised"
            >
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[12.5px] font-medium text-accent">
                {field.field}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[12.5px] text-ink-subtle">
                {field.type}
              </td>
              <td className="px-4 py-2.5 text-[13.5px] text-ink-muted">
                {field.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="my-5 space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3.5 text-[15.5px] leading-[1.7] text-ink-muted"
        >
          <span
            aria-hidden="true"
            className="mt-[10px] h-[3px] w-[3px] shrink-0 rounded-full bg-ink-subtle"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ── Renderer ────────────────────────────────────────────────────────────── */

export function BlockBody({ block }: { block: Block }) {
  switch (block.kind) {
    case "lead":
      // The lead is a distinct register: near-ink, larger, looser, tighter
      // tracking. It should not read as merely "a big paragraph".
      return (
        <p className="my-6 max-w-[60ch] text-[19px] font-normal leading-[1.6] tracking-[-0.014em] text-ink sm:text-[20px]">
          {block.text}
        </p>
      );
    case "prose":
      return (
        <div className="my-5 space-y-4">
          {block.paragraphs.map((p) => (
            <p key={p} className="text-[15.5px] leading-[1.75] text-ink-muted">
              {p}
            </p>
          ))}
        </div>
      );
    case "bullets":
      return <Bullets items={block.items} />;
    case "qa":
      return <QA items={block.items} />;
    case "callout":
      return (
        <Callout variant={block.variant} title={block.title} body={block.body} />
      );
    case "definitions":
      return <Definitions items={block.items} />;
    case "cards":
      return <Cards items={block.items} />;
    case "code":
      return <CodeBlock code={block.code} caption={block.caption} />;
    case "table":
      return (
        <ComparisonTable
          columns={block.columns}
          rows={block.rows}
          highlightColumn={block.highlightColumn}
        />
      );
    case "dataModel":
      return <DataModel fields={block.fields} />;
    case "stepper":
      return <Stepper steps={block.steps} />;
    case "okr":
      return <OKRs objectives={block.objectives} />;
    case "roadmap":
      return <Roadmap columns={block.columns} />;
    case "slides":
      return <Slides items={block.items} />;
  }
}
