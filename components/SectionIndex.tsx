"use client";

import { useActive } from "@/components/Providers";

/**
 * The section numeral. It sits level with the rail's node and shares its state:
 * when the rail lights, the number turns accent. Previously this was gradient
 * text on every section at all times, which spent the brand on a label. Now the
 * colour is earned by being the section you are actually reading.
 */
export default function SectionIndex({
  sectionId,
  index,
}: {
  sectionId: string;
  index: number;
}) {
  const { activeSectionId } = useActive();

  return (
    <span className={`nx-index ${activeSectionId === sectionId ? "is-on" : ""}`}>
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}
