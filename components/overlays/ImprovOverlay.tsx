"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Plus, Sparkles, Star } from "lucide-react";
import { useKivi } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function ImprovOverlay() {
  const { overlay, closeOverlay, transformations, useTransformation } = useKivi();
  const router = useRouter();
  const [selectedTransformationId, setSelectedTransformationId] = useState<string | null>(null);
  const [committed, setCommitted] = useState(false);

  const isOpen = overlay.kind === "improv";
  const selectedText = isOpen ? overlay.selectedText : "";

  // Slot picker: recent, most-used, favourite (with fallback to second most-used)
  const recent = [...transformations].filter(t => t.lastUsed).sort((a, b) => (b.lastUsed ?? "").localeCompare(a.lastUsed ?? ""))[0];
  const mostUsed = [...transformations].sort((a, b) => b.useCount - a.useCount)[0];
  const favourite = transformations.find(t => t.isFavourite);
  const secondMostUsed = [...transformations].sort((a, b) => b.useCount - a.useCount)[1];

  const slots: (typeof transformations[0] | null)[] = [
    recent ?? null,
    mostUsed && mostUsed.id !== recent?.id ? mostUsed : (secondMostUsed ?? null),
    favourite && favourite.id !== recent?.id && favourite.id !== mostUsed?.id ? favourite : (secondMostUsed && secondMostUsed.id !== mostUsed?.id ? secondMostUsed : null),
  ];

  const apply = (id: string) => {
    setSelectedTransformationId(id);
    useTransformation(id);
    setTimeout(() => {
      setCommitted(true);
      setTimeout(() => {
        closeOverlay();
        setSelectedTransformationId(null);
        setCommitted(false);
      }, 900);
    }, 700);
  };

  const openLibrary = () => {
    closeOverlay();
    router.push("/improv");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeOverlay}
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(44, 38, 32, 0.15)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[560px]"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "var(--color-cream)",
                boxShadow: "0 20px 60px rgba(44, 38, 32, 0.25)",
                border: "1px solid var(--color-border)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles size={14} style={{ color: "var(--color-green)" }} />
                  <span
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "var(--color-ink-muted)" }}
                  >
                    improv
                  </span>
                </div>
                <button onClick={closeOverlay} className="p-1 rounded hover:bg-black/5">
                  <X size={14} style={{ color: "var(--color-ink-muted)" }} />
                </button>
              </div>

              {/* Selected text preview */}
              <div
                className="px-5 py-3 text-sm border-b"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-ink-muted)",
                  backgroundColor: "var(--color-cream-card)",
                }}
              >
                <span
                  className="text-[10px] uppercase tracking-wider mr-2"
                  style={{ color: "var(--color-ink-faint)" }}
                >
                  selected
                </span>
                <span className="italic">"{selectedText}"</span>
              </div>

              {/* Committed feedback */}
              {committed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-5 py-3 text-sm"
                  style={{
                    backgroundColor: "var(--color-green-light)",
                    color: "var(--color-green-deep)",
                  }}
                >
                  ✓ applied — text reshaped in place.
                </motion.div>
              )}

              {/* Slots */}
              {!committed && (
                <div className="p-4">
                  <div
                    className="text-[10px] uppercase tracking-wider mb-3 px-1"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    three moves
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {slots.map((slot, i) => {
                      const isSelected = slot && selectedTransformationId === slot.id;
                      const kinds = ["recent", "most used", "favourite"];
                      return (
                        <button
                          key={i}
                          disabled={!slot || !!selectedTransformationId}
                          onClick={() => slot && apply(slot.id)}
                          className="text-left p-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{
                            backgroundColor: isSelected ? "var(--color-green-light)" : "var(--color-cream-card)",
                            border: `1px solid ${isSelected ? "var(--color-green)" : "var(--color-border)"}`,
                          }}
                        >
                          <div className="flex items-center gap-1 mb-1.5">
                            {i === 2 && slot?.isFavourite && (
                              <Star size={10} fill="currentColor" style={{ color: "var(--color-terracotta)" }} />
                            )}
                            <span
                              className="text-[10px] uppercase tracking-wider"
                              style={{ color: "var(--color-ink-faint)" }}
                            >
                              {kinds[i]}
                            </span>
                          </div>
                          {slot ? (
                            <div>
                              <div className="text-sm font-medium mb-0.5">{slot.name}</div>
                              <div
                                className="text-xs line-clamp-2"
                                style={{ color: "var(--color-ink-muted)" }}
                              >
                                {slot.description}
                              </div>
                            </div>
                          ) : (
                            <div className="text-xs" style={{ color: "var(--color-ink-faint)" }}>
                              nothing pinned yet
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* + Library button */}
                  <button
                    onClick={openLibrary}
                    className="mt-3 w-full px-3 py-2.5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
                    style={{
                      color: "var(--color-ink-muted)",
                      border: "1px dashed var(--color-border-strong)",
                    }}
                  >
                    <Plus size={14} />
                    open full library
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
