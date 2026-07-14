import type { Section as SectionType } from "@/content/content";
import { subHeadingId } from "@/lib/toc";
import AnchorHeading from "@/components/AnchorHeading";
import { BlockBody } from "@/components/blocks";

export default function Section({
  section,
  index,
}: {
  section: SectionType;
  index: number;
}) {
  return (
    <section
      aria-labelledby={section.id}
      className="border-b border-line py-12 first:pt-8 last:border-0 sm:py-14"
    >
      <p className="mb-2 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.09em] text-ink-subtle">
        <span className="nx-gradient-text font-bold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span aria-hidden="true" className="h-3 w-px bg-line" />
        {section.group}
      </p>

      <AnchorHeading id={section.id} level={2}>
        {section.title}
      </AnchorHeading>

      {/* Gradient accent under the section heading. */}
      <div aria-hidden="true" className="nx-gradient-rule mt-3 w-12 rounded-full" />

      <p className="mt-3 text-[15px] leading-relaxed text-ink-subtle">
        {section.summary}
      </p>

      <div className="mt-6">
        {section.blocks.map((block, i) => (
          <div key={`${section.id}-block-${i}`}>
            {block.heading && (
              <div className="mt-9 first:mt-0">
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
      </div>
    </section>
  );
}
