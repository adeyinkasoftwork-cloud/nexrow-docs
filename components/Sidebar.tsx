"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { groupOrder, sections, type SectionGroup } from "@/content/content";
import { useActive, useDrawer } from "@/components/Providers";

/**
 * The active indicator used to be a per-item gradient bar toggled between
 * opacity 0 and 1, so it blinked out of one row and into another. There is now a
 * single thumb that lives in the nav and travels: it measures the active link
 * and slides to it. Same vocabulary as the section rail, one scale down.
 */
export default function Sidebar() {
  const { open, setOpen } = useDrawer();
  const { activeSectionId } = useActive();

  const navRef = useRef<HTMLElement>(null);
  const [thumb, setThumb] = useState({ top: 0, height: 0, visible: false });

  const measure = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    const link = nav.querySelector<HTMLElement>(
      `[data-nav-id="${CSS.escape(activeSectionId)}"]`,
    );
    if (!link) {
      setThumb((t) => ({ ...t, visible: false }));
      return;
    }

    // The thumb is shorter than the row and centred on it, so it reads as a
    // marker against the row rather than as a border on it.
    const height = 16;
    setThumb({
      top: link.offsetTop + (link.offsetHeight - height) / 2,
      height,
      visible: true,
    });
  }, [activeSectionId]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <>
      {/* Mobile scrim */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-200 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="sidebar-nav"
        className={`fixed inset-y-0 left-0 z-50 w-[280px] overflow-y-auto border-r border-line bg-surface px-4 pb-10 pt-5 shadow-lift transition-transform duration-200 ease-out lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100dvh-4rem)] lg:w-[260px] lg:shrink-0 lg:translate-x-0 lg:border-r-0 lg:bg-transparent lg:pt-8 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav ref={navRef} aria-label="Documentation sections" className="relative">
          {/* The travelling thumb. */}
          <span
            aria-hidden="true"
            style={{
              transform: `translateY(${thumb.top}px)`,
              height: `${thumb.height}px`,
            }}
            className={`nx-gradient-y absolute left-0 top-0 w-[3px] rounded-full transition-[transform,opacity] duration-300 ease-out ${
              thumb.visible ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Its bloom, so the marker glows the way the section rail does. */}
          <span
            aria-hidden="true"
            style={{
              transform: `translateY(${thumb.top}px)`,
              height: `${thumb.height}px`,
            }}
            className={`nx-rail-glow absolute left-0 top-0 w-[3px] transition-[transform,opacity] duration-300 ease-out ${
              thumb.visible ? "opacity-50" : "opacity-0"
            }`}
          />

          {groupOrder.map((group) => (
            <NavGroup key={group} group={group} onNavigate={() => setOpen(false)} />
          ))}
        </nav>
      </aside>
    </>
  );
}

function NavGroup({
  group,
  onNavigate,
}: {
  group: SectionGroup;
  onNavigate: () => void;
}) {
  const { activeSectionId } = useActive();
  const items = sections.filter((section) => section.group === group);

  return (
    <div className="mb-7 last:mb-0">
      <p className="mb-2 px-3 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
        {group}
      </p>
      <ul className="space-y-0.5">
        {items.map((section) => {
          const isActive = activeSectionId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                data-nav-id={section.id}
                onClick={onNavigate}
                aria-current={isActive ? "true" : undefined}
                className={`block rounded-lg px-3 py-[7px] text-[13.5px] transition-colors duration-200 ${
                  isActive
                    ? "bg-surface-sunken font-semibold text-ink"
                    : "text-ink-muted hover:bg-surface-sunken/60 hover:text-ink"
                }`}
              >
                {section.navLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
