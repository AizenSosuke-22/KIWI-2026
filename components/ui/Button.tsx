import { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth,
  className = "",
  style,
  ...rest
}: Props) {
  const sizes: Record<Size, string> = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  const styleMap: Record<Variant, React.CSSProperties> = {
    primary: {
      backgroundColor: "var(--color-green)",
      color: "var(--color-cream)",
    },
    secondary: {
      backgroundColor: "var(--color-cream-card)",
      color: "var(--color-ink)",
      border: "1px solid var(--color-border)",
    },
    ghost: {
      backgroundColor: "transparent",
      color: "var(--color-ink-muted)",
    },
    danger: {
      backgroundColor: "transparent",
      color: "var(--color-terracotta)",
    },
  };

  return (
    <button
      className={`rounded-md font-medium transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      style={{ ...styleMap[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
