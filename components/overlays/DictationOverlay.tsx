"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { useKivi } from "@/lib/store";

export default function DictationOverlay() {
  const { overlay, closeOverlay, addHistoryTake, styles } = useKivi();
  const [phase, setPhase] = useState<"listening" | "processing" | "committing">("listening");
  const [seconds, setSeconds] = useState(0);
  const [simulatedText, setSimulatedText] = useState("");
  const startTimeRef = useRef<number>(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isOpen = overlay.kind === "dictation";
  const style = isOpen ? styles.find(s => s.id === overlay.styleId) : null;
  const targetApp = isOpen ? overlay.targetApp : "";

  // Timer
  useEffect(() => {
    if (!isOpen) return;
    setPhase("listening");
    setSeconds(0);
    setSimulatedText("");
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 250);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  // Commit path: press same hotkey again → simulate cleanup then commit
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      // Ctrl+Meta (or Ctrl+Cmd on Mac) again = commit
      if ((e.ctrlKey && e.metaKey) || (e.ctrlKey && e.altKey && e.key === "d")) {
        e.preventDefault();
        commit();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, style]);

  const commit = () => {
    if (!style) return;
    setPhase("processing");
    // Simulate the cleanup + commit path
    setTimeout(() => {
      setPhase("committing");
      const activeVoice = style.voices.find(v => v.id === style.activeVoiceId) ?? style.voices[0];
      const committed = activeVoice.example;
      setSimulatedText(committed);
      setTimeout(() => {
        addHistoryTake({
          app: { id: targetApp, name: targetApp, icon: "◎" },
          text: committed,
          style: style.name,
          language: "english",
          words: committed.split(/\s+/).length,
        });
        closeOverlay();
      }, 900);
    }, 700);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Subtle dim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 pointer-events-none"
            style={{ backgroundColor: "rgba(44, 38, 32, 0.05)" }}
          />

          {/* The circle */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.85 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
          >
            {/* Circle */}
            <div className="relative">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center relative overflow-hidden"
                style={{
                  backgroundColor: "var(--color-green)",
                  boxShadow: "0 8px 32px rgba(74, 107, 78, 0.35), 0 2px 8px rgba(44, 38, 32, 0.1)",
                }}
              >
                {phase === "listening" && <Waveform />}
                {phase === "processing" && <ProcessingRing />}
                {phase === "committing" && <CommitCheck />}
              </div>

              {/* Close button */}
              <button
                onClick={closeOverlay}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: "var(--color-cream)",
                  color: "var(--color-ink-muted)",
                  border: "1px solid var(--color-border)",
                }}
                aria-label="Cancel dictation"
              >
                <X size={12} />
              </button>
            </div>

            {/* Info below the circle */}
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
                {phase === "listening" ? "listening" : phase === "processing" ? "polishing" : "committed"}
              </span>
              <span style={{ color: "var(--color-border-strong)" }}>·</span>
              <span style={{ color: "var(--color-ink-muted)" }}>
                {targetApp}
              </span>
              <span style={{ color: "var(--color-border-strong)" }}>·</span>
              <span style={{ color: "var(--color-ink-muted)" }}>
                {style?.name}
              </span>
              {phase === "listening" && (
                <>
                  <span style={{ color: "var(--color-border-strong)" }}>·</span>
                  <span
                    className="tabular-nums"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    {seconds}s
                  </span>
                </>
              )}
            </div>

            {/* Hint */}
            {phase === "listening" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-3 text-xs"
                style={{ color: "var(--color-ink-faint)" }}
              >
                press <kbd style={{ color: "var(--color-ink)" }}>⌃⌘</kbd> again to commit · <kbd style={{ color: "var(--color-ink)" }}>esc</kbd> to discard
              </motion.div>
            )}

            {phase === "committing" && simulatedText && (
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
                {simulatedText}
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Waveform() {
  const bars = 12;
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="w-0.5 rounded-full"
          style={{ backgroundColor: "var(--color-cream)" }}
          animate={{
            height: [4, 22, 8, 18, 6, 20, 10, 4],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.06,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ProcessingRing() {
  return (
    <motion.div
      className="w-8 h-8 rounded-full border-2"
      style={{
        borderColor: "var(--color-cream)",
        borderTopColor: "transparent",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

function CommitCheck() {
  return (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <motion.path
        d="M8 16l6 6L24 10"
        stroke="var(--color-cream)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
    </motion.svg>
  );
}
