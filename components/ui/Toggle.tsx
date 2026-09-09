"use client";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
};

export default function Toggle({ checked, onChange, label }: Props) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
        style={{
          backgroundColor: checked ? "var(--color-green)" : "var(--color-border-strong)",
        }}
      >
        <span
          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
          style={{
            transform: checked ? "translateX(18px)" : "translateX(2px)",
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        />
      </button>
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}
