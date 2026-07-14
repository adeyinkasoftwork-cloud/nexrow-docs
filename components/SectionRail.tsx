"use client";

import { useActive } from "@/components/Providers";

/**
 * The signature.
 *
 * Each section paints a 1px hairline in the left gutter. Because sections stack
 * flush, those hairlines join into one continuous spine running the length of
 * the document. The segment owned by the section you are currently reading
 * ignites with the brand gradient and blooms, so a light travels down the spine
 * as you scroll, and a diamond node marks the head of the lit run.
 *
 * This is the one place the gradient is allowed to move, and it is the reason
 * the gradient could be taken away from the dots, pills and chips elsewhere:
 * here it actually signifies something (where you are).
 */
export default function SectionRail({ sectionId }: { sectionId: string }) {
  const { activeSectionId } = useActive();
  const active = activeSectionId === sectionId;

  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-3 w-px sm:-left-6 lg:-left-8"
    >
      {/* The dormant spine. */}
      <span className="absolute inset-0 bg-line" />

      {/* The lit run. */}
      <span
        className={`nx-gradient-y absolute inset-0 transition-opacity duration-700 ease-out ${
          active ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Its bloom, which is what makes the light read as light. */}
      <span
        className={`nx-rail-glow absolute inset-y-8 -left-px w-[3px] transition-opacity duration-700 ease-out ${
          active ? "opacity-40" : "opacity-0"
        }`}
      />

      {/* The node, at the height of the section's index numeral. */}
      <span
        className={`nx-node absolute -left-[3px] top-[6px] ${active ? "is-on" : ""}`}
      />
    </span>
  );
}
