"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useKivi } from "@/lib/store";
import { APPS, FACTS, USER_STATS } from "@/lib/mockData";
import Card from "@/components/ui/Card";
import Kbd from "@/components/ui/Kbd";
import KiviBird from "@/components/KiviBird";
import { Mic, Wand2, Languages, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function RecordPage() {
  const { styles, translateProfiles, openOverlay, history } = useKivi();
  const [targetApp, setTargetApp] = useState("Slack");
  const [selectedStyleId, setSelectedStyleId] = useState(styles[0].id);
  const [selectedText, setSelectedText] = useState("The meeting is scheduled for tomorrow at 3 PM in conference room B.");
  const [selectedTranslateId, setSelectedTranslateId] = useState(translateProfiles[0].id);
  const [factIndex, setFactIndex] = useState(0);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setFactIndex(Math.floor(Math.random() * FACTS.length));
    const hour = new Date().getHours();
    setGreeting(
      hour < 5 ? "up late" :
      hour < 12 ? "good morning" :
      hour < 17 ? "good afternoon" :
      hour < 21 ? "good evening" :
      "good night"
    );
  }, []);

  // Global keyboard handlers for the three hotkeys
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+Cmd = dictation (Ctrl+Alt+D as browser-safe alternative)
      if ((e.ctrlKey && e.metaKey && !e.altKey && !e.shiftKey) || (e.ctrlKey && e.altKey && e.key.toLowerCase() === "d")) {
        e.preventDefault();
        openOverlay({ kind: "dictation", targetApp, styleId: selectedStyleId });
      }
      // Ctrl+Alt+I = improv
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "i") {
        e.preventDefault();
        openOverlay({ kind: "improv", selectedText });
      }
      // Ctrl+Shift+T = translate
      if (e.ctrlKey && e.shiftKey && (e.key === "T" || e.key === "t")) {
        e.preventDefault();
        openOverlay({ kind: "translate", targetApp, profileId: selectedTranslateId });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [targetApp, selectedStyleId, selectedText, selectedTranslateId, openOverlay]);

  const fact = FACTS[factIndex];
  const recentTakes = history.slice(0, 3);

  return (
    <div className="px-10 py-10 max-w-6xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="text-sm mb-1" style={{ color: "var(--color-ink-muted)" }}>
            {greeting}, {USER_STATS.name.split(" ")[0]}
          </p>
          <h1
            className="text-4xl leading-tight"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
          >
            <span className="underline-squiggle">ready when you are</span>
          </h1>
        </div>
        <KiviBird />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: dictation simulator */}
        <div className="col-span-2 space-y-5">
          {/* Try dictation card */}
          <Card variant="outlined" className="p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "var(--color-ink-faint)" }}>
                  try it
                </div>
                <h3
                  className="text-xl"
                  style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                >
                  dictate into a mock app
                </h3>
              </div>
              <div className="flex items-center gap-1.5">
                <Kbd>⌃</Kbd>
                <span style={{ color: "var(--color-ink-faint)" }}>+</span>
                <Kbd>⌘</Kbd>
              </div>
            </div>

            {/* App picker */}
            <div className="mb-4">
              <div className="text-xs mb-2" style={{ color: "var(--color-ink-muted)" }}>
                pretend cursor is in
              </div>
              <div className="flex flex-wrap gap-2">
                {[APPS.slack, APPS.gmail, APPS.claude, APPS.cursor, APPS.whatsapp, APPS.notion].map(app => (
                  <button
                    key={app.id}
                    onClick={() => setTargetApp(app.name)}
                    className="px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5"
                    style={{
                      backgroundColor: targetApp === app.name ? "var(--color-green-light)" : "var(--color-cream)",
                      color: targetApp === app.name ? "var(--color-green-deep)" : "var(--color-ink-muted)",
                      border: `1px solid ${targetApp === app.name ? "var(--color-green)" : "var(--color-border)"}`,
                    }}
                  >
                    <span>{app.icon}</span>
                    {app.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Style picker */}
            <div className="mb-5">
              <div className="text-xs mb-2" style={{ color: "var(--color-ink-muted)" }}>
                with style
              </div>
              <div className="flex flex-wrap gap-2">
                {styles.map(style => (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyleId(style.id)}
                    className="px-3 py-1.5 rounded-full text-xs transition-all"
                    style={{
                      backgroundColor: selectedStyleId === style.id ? "var(--color-green-light)" : "var(--color-cream)",
                      color: selectedStyleId === style.id ? "var(--color-green-deep)" : "var(--color-ink-muted)",
                      border: `1px solid ${selectedStyleId === style.id ? "var(--color-green)" : "var(--color-border)"}`,
                    }}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Trigger button */}
            <button
              onClick={() => openOverlay({ kind: "dictation", targetApp, styleId: selectedStyleId })}
              className="w-full px-4 py-3.5 rounded-lg flex items-center justify-center gap-2.5 text-sm font-medium transition-all hover:opacity-90"
              style={{
                backgroundColor: "var(--color-green)",
                color: "var(--color-cream)",
              }}
            >
              <Mic size={16} />
              start dictation
              <span style={{ color: "var(--color-green-light)", opacity: 0.7 }}>
                or press ⌃⌘
              </span>
            </button>
          </Card>

          {/* Improv + translate quick access */}
          <div className="grid grid-cols-2 gap-5">
            <Card variant="outlined" className="p-5">
              <div className="flex items-start justify-between mb-3">
                <Wand2 size={16} style={{ color: "var(--color-green)" }} />
                <div className="flex items-center gap-1">
                  <Kbd>⌃⌥I</Kbd>
                </div>
              </div>
              <h4 className="text-sm font-medium mb-1">improv selected text</h4>
              <p className="text-xs mb-3" style={{ color: "var(--color-ink-muted)" }}>
                reshape any text you've already written.
              </p>
              <button
                onClick={() => openOverlay({ kind: "improv", selectedText })}
                className="text-xs px-3 py-1.5 rounded-md transition-colors"
                style={{
                  backgroundColor: "var(--color-cream)",
                  color: "var(--color-ink)",
                  border: "1px solid var(--color-border)",
                }}
              >
                try with mock selection →
              </button>
            </Card>

            <Card variant="outlined" className="p-5">
              <div className="flex items-start justify-between mb-3">
                <Languages size={16} style={{ color: "var(--color-terracotta)" }} />
                <div className="flex items-center gap-1">
                  <Kbd>⌃⇧T</Kbd>
                </div>
              </div>
              <h4 className="text-sm font-medium mb-1">translate as you speak</h4>
              <p className="text-xs mb-3" style={{ color: "var(--color-ink-muted)" }}>
                pick a profile, speak in one language, write in another.
              </p>
              <select
                value={selectedTranslateId}
                onChange={(e) => setSelectedTranslateId(e.target.value)}
                className="text-xs px-2 py-1.5 rounded-md transition-colors mr-2 w-full mb-2"
                style={{
                  backgroundColor: "var(--color-cream)",
                  color: "var(--color-ink)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {translateProfiles.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button
                onClick={() => openOverlay({ kind: "translate", targetApp, profileId: selectedTranslateId })}
                className="text-xs px-3 py-1.5 rounded-md transition-colors w-full"
                style={{
                  backgroundColor: "var(--color-cream)",
                  color: "var(--color-ink)",
                  border: "1px solid var(--color-border)",
                }}
              >
                start translate session →
              </button>
            </Card>
          </div>

          {/* Recent takes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3
                className="text-lg"
                style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
              >
                recent takes
              </h3>
              <Link
                href="/history"
                className="text-xs flex items-center gap-1"
                style={{ color: "var(--color-ink-muted)" }}
              >
                all history <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-2">
              {recentTakes.map(take => (
                <Card key={take.id} variant="outlined" className="p-4 flex items-start gap-3">
                  <span className="text-lg mt-0.5">{take.app.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm line-clamp-2" style={{ color: "var(--color-ink)" }}>
                      {take.text}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 text-[11px]" style={{ color: "var(--color-ink-faint)" }}>
                      <span>{take.app.name}</span>
                      {take.style && (
                        <>
                          <span>·</span>
                          <span>{take.style}</span>
                        </>
                      )}
                      <span>·</span>
                      <span>{take.words} words</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right: fact card and pattern progress */}
        <div className="space-y-5">
          <motion.div
            key={factIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card variant="outlined" className="p-5">
              <div className="text-[11px] tracking-wider uppercase mb-3" style={{ color: "var(--color-ink-faint)" }}>
                did you know · {fact.category}
              </div>
              <p className="text-sm leading-relaxed">
                {fact.text}
              </p>
            </Card>
          </motion.div>

          {/* Pattern progress teaser */}
          <Card variant="outlined" className="p-5">
            <div className="text-[11px] tracking-wider uppercase mb-2" style={{ color: "var(--color-ink-faint)" }}>
              pattern · locked
            </div>
            <p className="text-sm mb-3" style={{ color: "var(--color-ink)" }}>
              Insights into your own speech unlock at 5,000 words.
            </p>
            <div className="mb-2 flex items-baseline gap-1">
              <span className="text-2xl font-medium tabular-nums" style={{ fontFamily: "var(--font-serif)" }}>
                {USER_STATS.totalWords.toLocaleString()}
              </span>
              <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
                / {USER_STATS.patternUnlockTarget.toLocaleString()} words
              </span>
            </div>
            <div
              className="h-1.5 rounded-full overflow-hidden"
              style={{ backgroundColor: "var(--color-border)" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(USER_STATS.totalWords / USER_STATS.patternUnlockTarget) * 100}%`,
                  backgroundColor: "var(--color-green)",
                }}
              />
            </div>
          </Card>

          {/* Hotkey cheatsheet */}
          <Card variant="outlined" className="p-5">
            <div className="text-[11px] tracking-wider uppercase mb-3" style={{ color: "var(--color-ink-faint)" }}>
              hotkeys
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span style={{ color: "var(--color-ink-muted)" }}>dictate</span>
                <div className="flex items-center gap-1">
                  <Kbd>⌃</Kbd><Kbd>⌘</Kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: "var(--color-ink-muted)" }}>improv</span>
                <div className="flex items-center gap-1">
                  <Kbd>⌃</Kbd><Kbd>⌥</Kbd><Kbd>I</Kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: "var(--color-ink-muted)" }}>translate</span>
                <div className="flex items-center gap-1">
                  <Kbd>⌃</Kbd><Kbd>⇧</Kbd><Kbd>T</Kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: "var(--color-ink-muted)" }}>discard</span>
                <Kbd>esc</Kbd>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
