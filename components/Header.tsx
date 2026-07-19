"use client";

import Image from "next/image";
import { site } from "@/content/content";
import { useDrawer } from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const { open, setOpen } = useDrawer();

  return (
    /* Proper glass. A heavier blur plus a saturation boost, so the brand colour
       scrolling underneath stays alive through the bar instead of washing out to
       fog, and a hairline that fades toward both edges rather than ruling flat
       across the viewport. */
    <header className="sticky top-0 z-40 bg-surface/70 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-surface/55">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="sidebar-nav"
          className="nx-lift -ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-raised text-ink-muted shadow-ambient hover:text-ink lg:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <a href="#overview" className="group flex items-center gap-2.5">
          <Mark />
          <span className="nx-gradient-text text-[17px] font-semibold tracking-[-0.022em]">
            {site.name}
          </span>
          <span className="hidden text-[13px] text-ink-subtle sm:inline">
            {site.tagline}
          </span>
        </a>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line-strong/80 to-transparent"
      />
    </header>
  );
}

/**
 * The Nexrow mark. Rendered at 2x so it stays crisp on retina displays, and lit
 * from behind with its own colour so it sits in the page rather than on it.
 */
function Mark() {
  return (
    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
      <span
        aria-hidden="true"
        className="absolute h-6 w-6 rounded-full bg-accent opacity-40 blur-[10px] transition-opacity duration-300 group-hover:opacity-70"
      />
      <Image
        src="/logo.png"
        alt=""
        aria-hidden="true"
        width={56}
        height={56}
        priority
        className="relative h-7 w-7"
      />
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
