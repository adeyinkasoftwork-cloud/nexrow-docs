"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { headingIds, ownerSectionOf } from "@/lib/toc";

/* ── Active heading (IntersectionObserver) ───────────────────────────────── */

type ActiveState = { activeId: string; activeSectionId: string };

const ActiveContext = createContext<ActiveState>({
  activeId: "",
  activeSectionId: "",
});

export function useActive() {
  return useContext(ActiveContext);
}

/* ── Mobile nav drawer ───────────────────────────────────────────────────── */

type DrawerState = { open: boolean; setOpen: (v: boolean) => void };

const DrawerContext = createContext<DrawerState>({ open: false, setOpen: () => {} });

export function useDrawer() {
  return useContext(DrawerContext);
}

/* ── Provider ────────────────────────────────────────────────────────────── */

/**
 * Distance from the viewport top at which a heading counts as "current". Sits
 * just below where anchors land (`scroll-padding-top: 6.5rem` = 104px), so a
 * heading you jump to reads as active immediately.
 */
const ACTIVATION_LINE = 120;

export default function Providers({ children }: { children: React.ReactNode }) {
  const ids = useMemo(() => headingIds(), []);
  const owners = useMemo(() => ownerSectionOf(), []);

  const [activeId, setActiveId] = useState<string>(ids[0] ?? "");
  const [open, setOpen] = useState(false);
  const frame = useRef<number | null>(null);

  const compute = useCallback(() => {
    let current = ids[0] ?? "";

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      // ids are in document order, so the last one above the line wins.
      if (el.getBoundingClientRect().top - ACTIVATION_LINE <= 1) current = id;
      else break;
    }

    // At the very bottom, the last heading may never cross the line.
    const atBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;
    if (atBottom) current = ids[ids.length - 1] ?? current;

    setActiveId((prev) => (prev === current ? prev : current));
  }, [ids]);

  const schedule = useCallback(() => {
    if (frame.current !== null) return;
    frame.current = window.requestAnimationFrame(() => {
      frame.current = null;
      compute();
    });
  }, [compute]);

  useEffect(() => {
    const observer = new IntersectionObserver(schedule, {
      // Watch a band just under the sticky header.
      rootMargin: `-${ACTIVATION_LINE}px 0px -55% 0px`,
      threshold: [0, 1],
    });

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    // The observer only fires on crossings, so cover load, scroll and resize too.
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    compute();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, [ids, schedule, compute]);

  // Drawer: lock body scroll and close on Escape.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = useMemo<ActiveState>(
    () => ({ activeId, activeSectionId: owners[activeId] ?? "" }),
    [activeId, owners],
  );

  const drawer = useMemo<DrawerState>(() => ({ open, setOpen }), [open]);

  return (
    <ActiveContext.Provider value={active}>
      <DrawerContext.Provider value={drawer}>{children}</DrawerContext.Provider>
    </ActiveContext.Provider>
  );
}
