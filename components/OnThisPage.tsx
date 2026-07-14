"use client";

import { useMemo } from "react";
import { buildToc } from "@/lib/toc";
import { useActive } from "@/components/Providers";

/**
 * Right-hand outline. Sections are always listed; the active section expands to
 * reveal its sub-headings, so the panel stays a page map without becoming a wall.
 * Hidden below lg.
 */
export default function OnThisPage() {
  const toc = useMemo(() => buildToc(), []);
  const { activeId, activeSectionId } = useActive();

  return (
    <aside className="hidden w-[240px] shrink-0 lg:block">
      <div className="sticky top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto pb-10 pt-8 pl-6">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-ink-subtle">
          On this page
        </p>

        <nav aria-label="On this page">
          <ul className="space-y-px border-l border-line">
            {toc.map((entry) => {
              const isActiveSection = activeSectionId === entry.sectionId;
              const isActiveHeading = activeId === entry.sectionId;

              return (
                <li key={entry.sectionId}>
                  <a
                    href={`#${entry.sectionId}`}
                    aria-current={isActiveHeading ? "true" : undefined}
                    className={`-ml-px block border-l-2 py-1 pl-3 text-[12.5px] leading-snug transition-colors ${
                      isActiveSection
                        ? "border-accent font-medium text-ink"
                        : "border-transparent text-ink-subtle hover:border-line-strong hover:text-ink-muted"
                    }`}
                  >
                    {entry.title}
                  </a>

                  {isActiveSection && entry.subs.length > 0 && (
                    <ul className="animate-fade-up space-y-px pb-1">
                      {entry.subs.map((sub) => {
                        const isActiveSub = activeId === sub.id;
                        return (
                          <li key={sub.id}>
                            <a
                              href={`#${sub.id}`}
                              aria-current={isActiveSub ? "true" : undefined}
                              className={`-ml-px block border-l-2 py-[3px] pl-6 text-[12px] leading-snug transition-colors ${
                                isActiveSub
                                  ? "border-accent font-medium text-accent"
                                  : "border-transparent text-ink-subtle hover:text-ink-muted"
                              }`}
                            >
                              {sub.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
