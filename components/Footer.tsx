import { site } from "@/content/content";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[520px] text-[13px] leading-relaxed text-ink-subtle">
          <span className="font-medium text-ink-muted">{site.name}:</span>{" "}
          {site.thesisLine}
        </p>
        <a
          href={site.sumiroUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-accent transition-colors hover:text-accent-2"
        >
          sumiro.studio
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 17 17 7M7 7h10v10" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
