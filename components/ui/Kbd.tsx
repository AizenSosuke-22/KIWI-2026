import { ReactNode } from "react";

export default function Kbd({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center px-1.5 py-0.5 text-[11px] font-medium rounded"
      style={{
        backgroundColor: "var(--color-cream)",
        color: "var(--color-ink)",
        border: "1px solid var(--color-border-strong)",
        fontFamily: "var(--font-sans)",
        boxShadow: "0 1px 0 var(--color-border-strong)",
      }}
    >
      {children}
    </span>
  );
}
