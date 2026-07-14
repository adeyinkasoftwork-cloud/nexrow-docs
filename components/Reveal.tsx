"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fades and lifts its children in as they enter the viewport, once.
 *
 * Used sparingly, twice per section (the heading group, then the body), so the
 * page reads as arriving rather than as animating. The hidden start state lives
 * behind `html.js` in globals.css, so with JavaScript off nothing is ever stuck
 * invisible, and prefers-reduced-motion pins it visible outright.
 */
export default function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      // Fire a little before the element is fully on screen: the movement should
      // be finishing as you arrive at it, not starting.
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shown]);

  return (
    <div ref={ref} className={`nx-reveal ${shown ? "is-in" : ""} ${className}`}>
      {children}
    </div>
  );
}
