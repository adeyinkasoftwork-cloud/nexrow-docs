"use client";

import { site } from "@/content/content";
import { useDrawer } from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const { open, setOpen } = useDrawer();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/80 backdrop-blur-md supports-[backdrop-filter]:bg-surface/70">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="sidebar-nav"
          className="-ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-raised text-ink-muted transition-colors hover:text-ink lg:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <a href="#overview" className="flex items-center gap-2.5">
          <Mark />
          <span className="nx-gradient-text text-[17px] font-semibold tracking-tight">
            {site.name}
          </span>
          <span className="hidden text-[13px] text-ink-subtle sm:inline">
            {site.tagline}
          </span>
        </a>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <span className="hidden items-center gap-1.5 rounded-full border border-line bg-surface-raised px-3 py-1.5 text-[12px] font-medium text-ink-muted md:inline-flex">
            <span
              aria-hidden="true"
              className="nx-gradient h-1.5 w-1.5 rounded-full"
            />
            {site.bountyTag}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

/** The wordmark glyph: a gradient-filled link/chain suggestion. */
function Mark() {
  return (
    <span
      aria-hidden="true"
      className="nx-gradient flex h-7 w-7 items-center justify-center rounded-[9px] text-white shadow-sm"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    </span>
  );
}

function MenuIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
