"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * The <head> script in layout.tsx has already set the class before paint, so
 * this component only has to read what is on <html> and keep it in sync.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("nexrow-theme", next);
    } catch {
      // Private mode, or storage disabled. The toggle still works for this visit.
    }
    setTheme(next);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      // Render a stable label until the client knows the theme, to avoid a
      // hydration mismatch on the icon.
      aria-label={
        theme === null ? "Toggle theme" : isDark ? "Switch to light mode" : "Switch to dark mode"
      }
      title={isDark ? "Light mode" : "Dark mode"}
      className="nx-lift group relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border border-line bg-surface-raised text-ink-muted shadow-ambient hover:text-accent"
    >
      {/* Was a wash of the full brand gradient, which is a lot of brand to spend
          on a 36px button. Now the accent blooms up from underneath instead. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-4 h-8 rounded-full bg-accent opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-30"
      />
      <span className="relative">{isDark ? <SunIcon /> : <MoonIcon />}</span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}
