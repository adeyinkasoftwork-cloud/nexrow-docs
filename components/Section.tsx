import type { Section as SectionType } from "@/content/content";
import { subHeadingId } from "@/lib/toc";
import AnchorHeading from "@/components/AnchorHeading";
import { BlockBody } from "@/components/blocks";
import SectionRail from "@/components/SectionRail";
import SectionIndex from "@/components/SectionIndex";
import Reveal from "@/components/Reveal";

export default function Section({
  section,
  index,
  startsGroup,
}: {
  section: SectionType;
  index: number;
  startsGroup: boolean;
}) {
  /**
   * Rhythm, not metronome. A section that opens a new group (Thesis -> Product)
   * takes a long breath; one that continues a group sits closer to its sibling.
   * The page then has chapters you can feel without reading a word.
   */
  const topPad =
    index === 0
      ? "pt-8 sm:pt-10"
      : startsGroup
        ? "pt-24 sm:pt-32"
        : "pt-12 sm:pt-16";

  return (
    <section
      aria-labelledby={section.id}
      className={`relative border-b border-line pb-12 last:border-0 sm:pb-16 ${topPad}`}
    >
      <SectionRail sectionId={section.id} />

      <Reveal>
        <p className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-subtle">
          <SectionIndex sectionId={section.id} index={index} />
          <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
          {section.group}
        </p>

        <AnchorHeading id={section.id} level={2}>
          {section.title}
        </AnchorHeading>

        <p className="mt-4 max-w-[62ch] text-[16px] leading-[1.65] text-ink-muted">
          {section.summary}
        </p>
      </Reveal>

      <Reveal className="mt-9">
        {section.blocks.map((block, i) => (
          <div key={`${section.id}-block-${i}`}>
            {block.heading && (
              // Sub-headings within a section get a deliberately large breath
              // above them, so they group their own blocks rather than floating
              // in an evenly spaced stream.
              <div className="mt-14 first:mt-0">
                <AnchorHeading
                  id={subHeadingId(section.id, block.heading)}
                  level={3}
                >
                  {block.heading}
                </AnchorHeading>
              </div>
            )}
            <BlockBody block={block} />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
