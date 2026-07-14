"use client";

import { groupOrder, sections, type SectionGroup } from "@/content/content";
import { useActive, useDrawer } from "@/components/Providers";

export default function Sidebar() {
  const { open, setOpen } = useDrawer();

  return (
    <>
      {/* Mobile scrim */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="sidebar-nav"
        className={`fixed inset-y-0 left-0 z-50 w-[280px] overflow-y-auto border-r border-line bg-surface px-4 pb-10 pt-5 transition-transform duration-200 ease-out lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100dvh-4rem)] lg:w-[260px] lg:shrink-0 lg:translate-x-0 lg:bg-transparent lg:pt-8 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav aria-label="Documentation sections">
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
      <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-ink-subtle">
        {group}
      </p>
      <ul className="space-y-0.5">
        {items.map((section) => {
          const isActive = activeSectionId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={onNavigate}
                aria-current={isActive ? "true" : undefined}
                className={`group relative flex items-center rounded-lg px-3 py-[7px] text-[13.5px] transition-colors ${
                  isActive
                    ? "bg-surface-sunken font-medium text-ink"
                    : "text-ink-muted hover:bg-surface-sunken/60 hover:text-ink"
                }`}
              >
                {/* Gradient active indicator */}
                <span
                  aria-hidden="true"
                  className={`nx-gradient absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
                {section.navLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
