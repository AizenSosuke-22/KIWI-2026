"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { X, Languages, ArrowRight } from "lucide-react";
import { useKivi } from "@/lib/store";

export default function TranslateOverlay() {
  const { overlay, closeOverlay, addHistoryTake, translateProfiles } = useKivi();
  const [phase, setPhase] = useState<"listening" | "translating" | "committing">("listening");
  const [seconds, setSeconds] = useState(0);
  const [translatedText, setTranslatedText] = useState("");
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isOpen = overlay.kind === "translate";
  const profile = isOpen ? translateProfiles.find(p => p.id === overlay.profileId) : null;
  const targetApp = isOpen ? overlay.targetApp : "";

  useEffect(() => {
    if (!isOpen) return;
    setPhase("listening");
    setSeconds(0);
    setTranslatedText("");
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 250);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      // Ctrl+Shift+T again = commit
      if (e.ctrlKey && e.shiftKey && (e.key === "T" || e.key === "t")) {
        e.preventDefault();
        commit();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, profile]);

  const sampleTranslations: Record<string, { source: string; target: string }> = {
    "hindi-to-english": {
      source: "kal shaam ko meeting kab hai, agenda bhi bhej dena",
      target: "When is the meeting tomorrow evening? Please send the agenda as well.",
    },
    "english-to-hindi-native": {
      source: "please send me the latest report by end of day",
      target: "कृपया आज दिन के अंत तक मुझे नवीनतम रिपोर्ट भेज दें।",
    },
    "tamil-to-english": {
      source: "naalaikku meeting eppo? agenda-vum anuppunga",
      target: "When is the meeting tomorrow? Please send the agenda too.",
    },
  };

  const commit = () => {
    if (!profile) return;
    setPhase("translating");
    setTimeout(() => {
      setPhase("committing");
      const sample = sampleTranslations[profile.id] ?? sampleTranslations["hindi-to-english"];
      setTranslatedText(sample.target);
      setTimeout(() => {
        addHistoryTake({
          app: { id: targetApp, name: targetApp, icon: "◎" },
          text: sample.target,
          style: profile.name,
          language: `${profile.from.label.toLowerCase()} → ${profile.to.label.toLowerCase()}`,
          translated: true,
          words: sample.target.split(/\s+/).length,
        });
        closeOverlay();
      }, 1200);
    }, 900);
  };

  return (
    <AnimatePresence>
      {isOpen && profile && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none"
            style={{ backgroundColor: "rgba(44, 38, 32, 0.05)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.85 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
          >
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, var(--color-green), var(--color-terracotta))",
                  boxShadow: "0 8px 32px rgba(74, 107, 78, 0.35), 0 2px 8px rgba(44, 38, 32, 0.1)",
                }}
              >
                {phase === "listening" && (
                  <div className="flex items-center gap-1">
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: "var(--color-cream)" }}
                    >
                      {profile.from.code.toUpperCase()}
                    </span>
                    <Languages size={16} style={{ color: "var(--color-cream)" }} />
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: "var(--color-cream)" }}
                    >
                      {profile.to.code.toUpperCase()}
                    </span>
                  </div>
                )}
                {phase === "translating" && (
                  <motion.div
                    className="w-8 h-8 rounded-full border-2"
                    style={{ borderColor: "var(--color-cream)", borderTopColor: "transparent" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                )}
                {phase === "committing" && (
                  <motion.svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <motion.path
                      d="M8 16l6 6L24 10"
                      stroke="var(--color-cream)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.svg>
                )}
              </div>

              <button
                onClick={closeOverlay}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "var(--color-cream)",
                  color: "var(--color-ink-muted)",
                  border: "1px solid var(--color-border)",
                }}
                aria-label="Cancel"
              >
                <X size={12} />
              </button>
            </div>

            <div
              className="mt-3 px-3 py-1.5 rounded-full text-xs flex items-center gap-2"
              style={{
                backgroundColor: "var(--color-cream)",
                color: "var(--color-ink)",
                border: "1px solid var(--color-border)",
                boxShadow: "0 4px 12px rgba(44, 38, 32, 0.08)",
              }}
            >
              <span
                className="text-[10px] uppercase tracking-wider"
                style={{ color: "var(--color-ink-faint)" }}
              >
                {phase === "listening" ? "listening" : phase === "translating" ? "translating" : "committed"}
              </span>
              <span style={{ color: "var(--color-border-strong)" }}>·</span>
              <span style={{ color: "var(--color-ink-muted)" }}>{profile.from.label}</span>
              <ArrowRight size={10} style={{ color: "var(--color-ink-faint)" }} />
              <span style={{ color: "var(--color-ink-muted)" }}>
                {profile.to.label} ({profile.script})
              </span>
              <span style={{ color: "var(--color-border-strong)" }}>·</span>
              <span style={{ color: "var(--color-ink-muted)" }}>{targetApp}</span>
              {phase === "listening" && (
                <>
                  <span style={{ color: "var(--color-border-strong)" }}>·</span>
                  <span className="tabular-nums" style={{ color: "var(--color-ink-faint)" }}>
                    {seconds}s
                  </span>
                </>
              )}
            </div>

            {phase === "listening" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 text-xs"
                style={{ color: "var(--color-ink-faint)" }}
              >
                press <kbd style={{ color: "var(--color-ink)" }}>⌃⇧T</kbd> again to translate & commit
              </motion.div>
            )}

            {phase === "committing" && translatedText && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 max-w-md px-4 py-3 rounded-xl text-sm"
                style={{
                  backgroundColor: "var(--color-cream)",
                  color: "var(--color-ink)",
                  border: "1px solid var(--color-green-highlight)",
                  boxShadow: "0 4px 20px rgba(74, 107, 78, 0.15)",
                }}
              >
                {translatedText}
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
