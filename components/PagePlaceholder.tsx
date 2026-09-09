import PageHeader from "./PageHeader";

export default function PagePlaceholder({
  title,
  subtitle,
  note,
}: {
  title: string;
  subtitle?: string;
  note?: string;
}) {
  return (
    <div className="px-10 py-10 max-w-5xl">
      <PageHeader title={title} subtitle={subtitle} />
      <div
        className="rounded-xl border p-8 text-sm"
        style={{
          backgroundColor: "var(--color-cream-card)",
          borderColor: "var(--color-border)",
          color: "var(--color-ink-muted)",
        }}
      >
        {note ?? "This section is being built in the next chunk. The shell and design system are in place — real content lands here soon."}
      </div>
    </div>
  );
}
