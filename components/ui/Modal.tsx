"use client";

import { ReactNode, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
};

export default function Modal({ open, onClose, title, children, size = "md" }: Props) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(44, 38, 32, 0.35)" }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 4 }}
              transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
              className={`w-full ${sizes[size]} rounded-2xl pointer-events-auto`}
              style={{
                backgroundColor: "var(--color-cream)",
                boxShadow: "0 20px 60px rgba(44, 38, 32, 0.25)",
              }}
            >
              {title !== undefined && (
                <div
                  className="flex items-center justify-between px-6 py-4 border-b"
                  style={{ borderColor: "var(--color-border)" }}
                >
                  <h3
                    className="text-lg"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                  >
                    {title}
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-md hover:bg-black/5"
                    aria-label="Close"
                  >
                    <X size={16} style={{ color: "var(--color-ink-muted)" }} />
                  </button>
                </div>
              )}
              <div className="p-6">{children}</div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
