"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { buildToc } from "@/lib/toc";
import { useActive } from "@/components/Providers";

/**
 * Right-hand outline. Sections are always listed; the active section expands to
 * reveal its sub-headings, so the panel stays a page map without becoming a wall.
 * Hidden below lg.
 *
 * The active marker is a thumb that travels the rail rather than a border that
 * snaps between list items, matching the section rail and the sidebar. It is
 * re-measured whenever the active heading changes, because the expanding
 * sub-list moves every row below it.
 */
export default function OnThisPage() {
  const toc = useMemo(() => buildToc(), []);
  const { activeId, activeSectionId } = useActive();

  const listRef = useRef<HTMLUListElement>(null);
  const [thumb, setThumb] = useState({ top: 0, height: 0, visible: false });

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    // Prefer the exact heading; fall back to its owning section.
    const target =
      list.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(activeId)}"]`) ??
      list.querySelector<HTMLElement>(
        `[data-toc-id="${CSS.escape(activeSectionId)}"]`,
      );

    if (!target) {
      setThumb((t) => ({ ...t, visible: false }));
      return;
    }

    setThumb({
      top: target.offsetTop,
      height: target.offsetHeight,
      visible: true,
    });
  }, [activeId, activeSectionId]);

  useEffect(() => {
    // The sub-list expands in the same commit, so measure on the next frame.
    const raf = window.requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <aside className="hidden w-[240px] shrink-0 lg:block">
      <div className="sticky top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto pb-10 pl-6 pt-8">
        <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          On this page
        </p>

        <nav aria-label="On this page">
          <ul ref={listRef} className="relative space-y-px border-l border-line">
            {/* The travelling thumb, on the rail. */}
            <span
              aria-hidden="true"
              style={{
                transform: `translateY(${thumb.top}px)`,
                height: `${thumb.height}px`,
              }}
              className={`nx-gradient-y absolute -left-px top-0 w-[2px] transition-[transform,height,opacity] duration-300 ease-out ${
                thumb.visible ? "opacity-100" : "opacity-0"
              }`}
            />

            {toc.map((entry) => {
              const isActiveSection = activeSectionId === entry.sectionId;
              const isActiveHeading = activeId === entry.sectionId;

              return (
                <li key={entry.sectionId}>
                  <a
                    href={`#${entry.sectionId}`}
                    data-toc-id={entry.sectionId}
                    aria-current={isActiveHeading ? "true" : undefined}
                    className={`block py-1 pl-3 text-[12.5px] leading-snug transition-colors duration-200 ${
                      isActiveSection
                        ? "font-semibold text-ink"
                        : "text-ink-subtle hover:text-ink-muted"
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
                              data-toc-id={sub.id}
                              aria-current={isActiveSub ? "true" : undefined}
                              className={`block py-[3px] pl-6 text-[12px] leading-snug transition-colors duration-200 ${
                                isActiveSub
                                  ? "font-medium text-accent"
                                  : "text-ink-subtle hover:text-ink-muted"
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
