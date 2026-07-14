import type { Block } from "@/content/content";

/* ── Callout ─────────────────────────────────────────────────────────────── */

const calloutStyles = {
  key: {
    // The brand gradient carries the key-insight border.
    bar: "nx-gradient",
    icon: "text-accent",
    ring: "border-line",
    glyph: (
      <path d="M12 2 9.6 8.6 3 11l6.6 2.4L12 20l2.4-6.6L21 11l-6.6-2.4z" />
    ),
  },
  info: {
    bar: "bg-accent-2",
    icon: "text-accent-2",
    ring: "border-line",
    glyph: <path d="M12 16v-4M12 8h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z" />,
  },
  warning: {
    bar: "bg-amber-500",
    icon: "text-amber-600 dark:text-amber-400",
    ring: "border-line",
    glyph: (
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01" />
    ),
  },
} as const;

export function Callout({
  variant,
  title,
  body,
}: {
  variant: "info" | "warning" | "key";
  title: string;
  body: string;
}) {
  const style = calloutStyles[variant];

  return (
    <div
      className={`relative my-6 overflow-hidden rounded-xl border ${style.ring} bg-surface-raised pl-5 pr-5 py-4`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-[3px] ${style.bar}`}
      />
      <div className="flex gap-3">
        <span className={`mt-[3px] shrink-0 ${style.icon}`} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {style.glyph}
          </svg>
        </span>
        <div>
          <p className="text-[14px] font-semibold text-ink">{title}</p>
          <p className="mt-1 text-[14.5px] leading-relaxed text-ink-muted">{body}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Q & A ───────────────────────────────────────────────────────────────── */

export function QA({ items }: { items: { q: string; a: string }[] }) {
  return (
    <ol className="my-6 space-y-5">
      {items.map((item, i) => (
        <li key={item.q} className="nx-card p-5 transition-colors hover:border-line-strong">
          <div className="flex gap-3">
            <span className="mt-[1px] w-6 shrink-0 font-mono text-[12px] font-medium text-ink-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="text-[15px] font-semibold text-ink">{item.q}</p>
              <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">
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
    <div className="my-6">
      <div className="nx-scroll-x overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-surface-sunken">
              <th
                scope="col"
                className="sticky left-0 z-10 bg-surface-sunken px-4 py-3 text-[12px] font-semibold uppercase tracking-wide text-ink-subtle"
              >
                <span className="sr-only">Criterion</span>
              </th>
              {columns.map((col, i) => (
                <th
                  key={col}
                  scope="col"
                  className={`px-4 py-3 text-[13px] font-semibold ${
                    i === highlightColumn ? "text-accent" : "text-ink-muted"
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-line last:border-0 hover:bg-surface-sunken/50"
              >
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-surface-raised px-4 py-3 text-[13.5px] font-medium text-ink"
                >
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={`${row.label}-${i}`}
                    className={`whitespace-nowrap px-4 py-3 text-[13.5px] ${
                      i === highlightColumn
                        ? "font-medium text-ink"
                        : "text-ink-muted"
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
      <p className="mt-2 text-[12px] text-ink-subtle lg:hidden">
        Scroll the table sideways to see every competitor.
      </p>
    </div>
  );
}

/* ── Stat chip + OKRs ────────────────────────────────────────────────────── */

export function StatChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-raised py-1.5 pl-2.5 pr-3.5 text-[13px] text-ink-muted">
      <span
        aria-hidden="true"
        className="nx-gradient h-1.5 w-1.5 shrink-0 rounded-full"
      />
      {children}
    </span>
  );
}

export function OKRs({
  objectives,
}: {
  objectives: { id: string; period: string; title: string; krs: string[] }[];
}) {
  const periods = Array.from(new Set(objectives.map((o) => o.period)));

  return (
    <div className="my-6 space-y-8">
      {periods.map((period) => (
        <div key={period}>
          <p className="mb-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.09em] text-ink-subtle">
            {period}
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </p>

          <div className="space-y-4">
            {objectives
              .filter((o) => o.period === period)
              .map((objective) => (
                <div key={objective.id} className="nx-card p-5">
                  <p className="flex items-baseline gap-2.5">
                    <span className="nx-gradient-text font-mono text-[13px] font-bold">
                      {objective.id}
                    </span>
                    <span className="text-[15.5px] font-semibold text-ink">
                      {objective.title}
                    </span>
                  </p>
                  <ul className="mt-3.5 flex flex-wrap gap-2">
                    {objective.krs.map((kr) => (
                      <li key={kr}>
                        <StatChip>{kr}</StatChip>
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

export function Stepper({
  steps,
}: {
  steps: { label: string; title: string; body: string }[];
}) {
  return (
    <ol className="my-6">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={step.label + step.title} className="relative flex gap-4 pb-6 last:pb-0">
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-[15px] top-9 bottom-0 w-px bg-line"
              />
            )}
            <span
              aria-hidden="true"
              className="nx-gradient relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full p-px"
            >
              <span className="flex h-full w-full items-center justify-center rounded-full bg-surface font-mono text-[11px] font-semibold text-ink">
                {i + 1}
              </span>
            </span>

            <div className="pt-0.5">
              <p className="font-mono text-[11.5px] font-medium uppercase tracking-wide text-accent">
                {step.label}
              </p>
              <p className="mt-1 text-[15px] font-semibold text-ink">{step.title}</p>
              <p className="mt-1 text-[14.5px] leading-relaxed text-ink-muted">
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

const phaseBadge = {
  Now: "nx-gradient text-white",
  Next: "bg-accent/12 text-accent border border-accent/30",
  Later: "bg-surface-sunken text-ink-subtle border border-line",
} as const;

export function Roadmap({
  columns,
}: {
  columns: { phase: "Now" | "Next" | "Later"; window: string; items: string[] }[];
}) {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {columns.map((column) => (
        <div key={column.phase} className="nx-card flex flex-col p-5">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11.5px] font-semibold ${
                phaseBadge[column.phase]
              }`}
            >
              {column.phase}
            </span>
            <span className="font-mono text-[11px] text-ink-subtle">
              {column.window}
            </span>
          </div>

          <ul className="mt-4 space-y-2.5">
            {column.items.map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[14px] leading-snug text-ink-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-line-strong"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ── Slides ──────────────────────────────────────────────────────────────── */

export function Slides({
  items,
}: {
  items: { n: number; title: string; body: string }[];
}) {
  return (
    <ol className="my-6 grid gap-3 sm:grid-cols-2">
      {items.map((slide) => (
        <li
          key={slide.n}
          className="nx-card group relative overflow-hidden p-4 transition-colors hover:border-line-strong"
        >
          <span
            aria-hidden="true"
            className="nx-gradient absolute inset-x-0 top-0 h-px opacity-0 transition-opacity group-hover:opacity-100"
          />
          <div className="flex items-baseline gap-2.5">
            <span className="font-mono text-[11px] font-semibold text-ink-subtle">
              {String(slide.n).padStart(2, "0")}
            </span>
            <p className="text-[14.5px] font-semibold text-ink">{slide.title}</p>
          </div>
          <p className="mt-1.5 pl-[30px] text-[14px] leading-relaxed text-ink-muted">
            {slide.body}
          </p>
        </li>
      ))}
    </ol>
  );
}

/* ── Cards, definitions, code, data model ────────────────────────────────── */

export function Cards({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="my-6 grid gap-4 sm:grid-cols-2">
      {items.map((card) => (
        <div key={card.title} className="nx-card p-5">
          <p className="text-[15px] font-semibold text-ink">{card.title}</p>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-muted">
            {card.body}
          </p>
        </div>
      ))}
    </div>
  );
}

export function Definitions({
  items,
}: {
  items: { term: string; detail: string }[];
}) {
  return (
    <dl className="my-6 divide-y divide-line overflow-hidden rounded-xl border border-line">
      {items.map((item) => (
        <div
          key={item.term}
          className="grid gap-1 bg-surface-raised px-5 py-3.5 sm:grid-cols-[168px_1fr] sm:gap-4"
        >
          <dt className="text-[14px] font-semibold text-ink">{item.term}</dt>
          <dd className="text-[14.5px] leading-relaxed text-ink-muted">
            {item.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function CodeBlock({ code, caption }: { code: string; caption?: string }) {
  return (
    <figure className="my-6">
      <div className="nx-scroll-x overflow-x-auto rounded-xl border border-line bg-[rgb(var(--code-bg))] p-5">
        <pre className="font-mono text-[12.5px] leading-[1.7] text-ink-muted">
          <code>{code}</code>
        </pre>
      </div>
      {caption && (
        <figcaption className="mt-2 text-[12.5px] text-ink-subtle">
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
    <div className="nx-scroll-x my-6 overflow-x-auto rounded-xl border border-line">
      <table className="w-full min-w-[560px] border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-surface-sunken">
            <th
              scope="col"
              className="px-4 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-ink-subtle"
            >
              Field
            </th>
            <th
              scope="col"
              className="px-4 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-ink-subtle"
            >
              Type
            </th>
            <th
              scope="col"
              className="px-4 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-ink-subtle"
            >
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr
              key={field.field}
              className="border-b border-line bg-surface-raised last:border-0"
            >
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[12.5px] text-accent">
                {field.field}
              </td>
              <td className="whitespace-nowrap px-4 py-2.5 font-mono text-[12.5px] text-ink-subtle">
                {field.type}
              </td>
              <td className="px-4 py-2.5 text-[13.5px] text-ink-muted">{field.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="my-5 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-ink-muted">
          <span
            aria-hidden="true"
            className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-line-strong"
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
      return (
        <p className="my-5 text-[18px] leading-relaxed text-ink sm:text-[19px]">
          {block.text}
        </p>
      );
    case "prose":
      return (
        <div className="my-5 space-y-4">
          {block.paragraphs.map((p) => (
            <p key={p} className="text-[15px] leading-relaxed text-ink-muted">
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
