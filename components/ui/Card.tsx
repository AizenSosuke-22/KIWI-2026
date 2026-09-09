import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined";
  onClick?: () => void;
  hoverable?: boolean;
  style?: React.CSSProperties;
};

export default function Card({
  children,
  className = "",
  variant = "default",
  onClick,
  hoverable,
  style,
}: Props) {
  const base = "rounded-xl transition-all";
  const variants = {
    default: "",
    elevated: "shadow-sm",
    outlined: "border",
  };

  return (
    <div
      onClick={onClick}
      className={`${base} ${variants[variant]} ${hoverable ? "cursor-pointer hover:shadow-md" : ""} ${className}`}
      style={{
        backgroundColor: "var(--color-cream-card)",
        borderColor: variant === "outlined" ? "var(--color-border)" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
