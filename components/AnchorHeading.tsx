"use client";

import { useState } from "react";

type Props = {
  id: string;
  level: 2 | 3;
  children: React.ReactNode;
};

/** Heading with an anchor that copies its deep link on click. */
export default function AnchorHeading({ id, level, children }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard blocked (insecure origin, or denied). The hash still updates.
    }
    window.history.replaceState(null, "", `#${id}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const Tag = level === 2 ? "h2" : "h3";

  return (
    <div className="group relative flex items-center gap-2">
      <Tag
        id={id}
        // Anchor offset comes from `scroll-padding-top` on <html>, so it is not
        // repeated here. Setting both would double the offset.
        className={
          level === 2
            ? "text-[30px] font-semibold leading-[1.12] sm:text-[34px]"
            : "text-[19px] font-semibold leading-snug"
        }
      >
        {children}
      </Tag>

      <button
        type="button"
        onClick={copy}
        aria-label={`Copy link to ${typeof children === "string" ? children : "section"}`}
        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-all hover:bg-surface-sunken focus-visible:opacity-100 group-hover:opacity-100 ${
          copied
            ? "text-accent opacity-100"
            : "text-ink-subtle opacity-0 hover:text-accent"
        }`}
      >
        {copied ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        )}
      </button>

      {/* Announce the copy without laying out a tooltip, which would overhang
          the viewport on narrow screens. The check icon is the visual cue. */}
      <span role="status" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
