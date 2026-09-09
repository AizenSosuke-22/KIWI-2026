export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <h1
        className="text-4xl leading-tight"
        style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
      >
        <span className="underline-squiggle">{title}</span>
      </h1>
      {subtitle && (
        <p
          className="mt-3 text-base max-w-2xl"
          style={{ color: "var(--color-ink-muted)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
