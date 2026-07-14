import { sections, type Section } from "@/content/content";

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[’'“”"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Stable id for a block-level (h3) heading inside a section. */
export function subHeadingId(sectionId: string, heading: string): string {
  return `${sectionId}--${slugify(heading)}`;
}

export type TocEntry = {
  sectionId: string;
  title: string;
  subs: { id: string; title: string }[];
};

export function buildToc(list: Section[] = sections): TocEntry[] {
  return list.map((section) => ({
    sectionId: section.id,
    title: section.navLabel,
    subs: section.blocks
      .filter((block) => Boolean(block.heading))
      .map((block) => ({
        id: subHeadingId(section.id, block.heading as string),
        title: block.heading as string,
      })),
  }));
}

/** Every observable heading id, in document order. */
export function headingIds(list: Section[] = sections): string[] {
  const ids: string[] = [];
  for (const section of list) {
    ids.push(section.id);
    for (const block of section.blocks) {
      if (block.heading) ids.push(subHeadingId(section.id, block.heading));
    }
  }
  return ids;
}

/** Maps any heading id back to the section that owns it. */
export function ownerSectionOf(list: Section[] = sections): Record<string, string> {
  const map: Record<string, string> = {};
  for (const section of list) {
    map[section.id] = section.id;
    for (const block of section.blocks) {
      if (block.heading) map[subHeadingId(section.id, block.heading)] = section.id;
    }
  }
  return map;
}
