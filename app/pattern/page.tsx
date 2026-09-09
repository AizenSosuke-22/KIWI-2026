"use client";

import { USER_STATS } from "@/lib/mockData";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import { Lock, Sparkles } from "lucide-react";
import { useState } from "react";
import Toggle from "@/components/ui/Toggle";

export default function PatternPage() {
  const [showPreview, setShowPreview] = useState(false);
  const progressPct = (USER_STATS.totalWords / USER_STATS.patternUnlockTarget) * 100;
  const remaining = USER_STATS.patternUnlockTarget - USER_STATS.totalWords;

  if (!showPreview) {
    return (
      <div className="px-10 py-10 max-w-4xl">
        <PageHeader
          title="pattern"
          subtitle="how you speak, over time. observations by default. suggestions if you want them."
        />

        <Card variant="outlined" className="p-8 text-center">
          <div
            className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
            style={{ backgroundColor: "var(--color-green-light)" }}
          >
            <Lock size={20} style={{ color: "var(--color-green-deep)" }} />
          </div>
          <h2
            className="text-2xl mb-2"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
          >
            still building your pattern
          </h2>
          <p className="text-sm max-w-md mx-auto mb-6" style={{ color: "var(--color-ink-muted)" }}>
            pattern needs enough of your speech to see anything meaningful. keep dictating —
            insights unlock at {USER_STATS.patternUnlockTarget.toLocaleString()} words.
          </p>

          <div className="max-w-sm mx-auto mb-6">
            <div className="flex items-baseline justify-between mb-2">
              <span
                className="text-3xl font-medium tabular-nums"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {USER_STATS.totalWords.toLocaleString()}
              </span>
              <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
                / {USER_STATS.patternUnlockTarget.toLocaleString()}
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden mb-2"
              style={{ backgroundColor: "var(--color-border)" }}
            >
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: "var(--color-green)",
                }}
              />
            </div>
            <div className="text-xs" style={{ color: "var(--color-ink-faint)" }}>
              {remaining.toLocaleString()} words to go
            </div>
          </div>

          <button
            onClick={() => setShowPreview(true)}
            className="text-xs underline"
            style={{ color: "var(--color-ink-muted)" }}
          >
            preview what pattern will look like →
          </button>
        </Card>
      </div>
    );
  }

  return <PatternPreview onBack={() => setShowPreview(false)} />;
}

function PatternPreview({ onBack }: { onBack: () => void }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  return (
    <div className="px-10 py-10 max-w-5xl">
      <button
        onClick={onBack}
        className="text-xs mb-4 flex items-center gap-1"
        style={{ color: "var(--color-ink-muted)" }}
      >
        ← back to locked view
      </button>
      <div
        className="text-[10px] uppercase tracking-wider mb-2 inline-block px-2 py-0.5 rounded"
        style={{
          backgroundColor: "var(--color-terracotta-soft)",
          color: "var(--color-terracotta)",
        }}
      >
        preview
      </div>
      <PageHeader
        title="pattern"
        subtitle="observations from the last 30 days of your dictations."
      />

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard label="words this month" value="12,340" trend="+18%" />
        <StatCard label="speaking speed" value="142 wpm" trend="steady" />
        <StatCard label="active sessions" value="87" trend="+12" />
        <StatCard label="languages used" value="2" sub="english, hindi" />
      </div>

      <Card variant="outlined" className="p-6 mb-5">
        <div
          className="text-[11px] uppercase tracking-wider mb-4"
          style={{ color: "var(--color-ink-faint)" }}
        >
          where you use kivi
        </div>
        <div className="space-y-3">
          {[
            { app: "Slack", pct: 34, count: "4,190 words" },
            { app: "Gmail", pct: 26, count: "3,210 words" },
            { app: "Claude", pct: 19, count: "2,340 words" },
            { app: "Cursor", pct: 12, count: "1,480 words" },
            { app: "WhatsApp", pct: 9, count: "1,120 words" },
          ].map(row => (
            <div key={row.app} className="flex items-center gap-3">
              <div className="w-20 text-sm">{row.app}</div>
              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "var(--color-border)" }}>
                <div
                  className="h-full"
                  style={{ width: `${row.pct}%`, backgroundColor: "var(--color-green)" }}
                />
              </div>
              <div className="w-24 text-xs text-right tabular-nums" style={{ color: "var(--color-ink-muted)" }}>
                {row.count}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card variant="outlined" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} style={{ color: "var(--color-green)" }} />
              <div className="text-sm font-medium">improvement suggestions</div>
            </div>
            <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
              off by default. turn on if you want kivi to surface things you could work on.
            </div>
          </div>
          <Toggle checked={showSuggestions} onChange={setShowSuggestions} />
        </div>

        {showSuggestions && (
          <div className="mt-4 space-y-3">
            {[
              {
                observation: "you paused an average of 2.1s between sentences this week.",
                suggestion: "some users find drafting a rough one-liner before dictating helps reduce pauses.",
              },
              {
                observation: `"actually" appeared in 34% of your sessions.`,
                suggestion: "if you want to reduce filler, try pausing where you'd normally say it.",
              },
              {
                observation: "average sentence length dropped from 22 to 17 words over the last two weeks.",
                suggestion: "readers generally find 15-20 word sentences easiest — you're in a good range.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3 rounded-lg"
                style={{ backgroundColor: "var(--color-cream)" }}
              >
                <div className="text-sm mb-1">{item.observation}</div>
                <div className="text-xs italic" style={{ color: "var(--color-ink-muted)" }}>
                  {item.suggestion}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function StatCard({ label, value, trend, sub }: { label: string; value: string; trend?: string; sub?: string }) {
  return (
    <Card variant="outlined" className="p-4">
      <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: "var(--color-ink-faint)" }}>
        {label}
      </div>
      <div
        className="text-2xl font-medium tabular-nums mb-0.5"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {value}
      </div>
      {trend && (
        <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
          {trend}
        </div>
      )}
      {sub && (
        <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
          {sub}
        </div>
      )}
    </Card>
  );
}
