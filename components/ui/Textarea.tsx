"use client";

import { TextareaHTMLAttributes, forwardRef } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  hint?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, hint, className = "", ...rest }, ref) => (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm mb-1.5"
          style={{ color: "var(--color-ink-muted)" }}
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`w-full px-3.5 py-2.5 rounded-md text-sm outline-none transition-colors resize-none ${className}`}
        style={{
          backgroundColor: "var(--color-cream)",
          color: "var(--color-ink)",
          border: "1px solid var(--color-border-strong)",
          fontFamily: "var(--font-sans)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-green)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border-strong)";
        }}
        {...rest}
      />
      {hint && (
        <p
          className="mt-1.5 text-xs"
          style={{ color: "var(--color-ink-faint)" }}
        >
          {hint}
        </p>
      )}
    </div>
  )
);

Textarea.displayName = "Textarea";
export default Textarea;
