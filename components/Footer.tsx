import { site } from "@/content/content";

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[520px] text-[13px] leading-relaxed text-ink-subtle">
          <span className="font-medium text-ink-muted">{site.name}:</span>{" "}
          {site.thesisLine}
        </p>
      </div>
    </footer>
  );
}
