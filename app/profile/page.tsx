"use client";

import { USER_STATS } from "@/lib/mockData";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import { LogOut, Sparkles, Flame } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="px-10 py-10 max-w-4xl">
      <PageHeader title="profile" />

      <Card variant="outlined" className="p-6 mb-5">
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{
              backgroundColor: "var(--color-green)",
              color: "var(--color-cream)",
              fontFamily: "var(--font-serif)",
              fontWeight: 500,
            }}
          >
            {USER_STATS.name[0]}
          </div>
          <div>
            <div className="text-xl mb-0.5" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
              {USER_STATS.name}
            </div>
            <div className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
              {USER_STATS.email}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: "var(--color-border)" }}>
          <button
            className="text-xs px-3 py-1.5 rounded-md"
            style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-border)", color: "var(--color-ink)" }}
          >
            edit info
          </button>
          <button
            className="text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5"
            style={{ color: "var(--color-terracotta)" }}
          >
            <LogOut size={12} /> sign out
          </button>
        </div>
      </Card>

      <Card variant="outlined" className="p-6 mb-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider mb-1" style={{ color: "var(--color-ink-faint)" }}>
              your plan
            </div>
            <div className="text-xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
              {USER_STATS.plan}
            </div>
            <div className="text-xs mt-1" style={{ color: "var(--color-ink-muted)" }}>
              member since {USER_STATS.memberSince}
            </div>
          </div>
          <button
            className="text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5"
            style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
          >
            <Sparkles size={12} /> upgrade to pro
          </button>
        </div>
      </Card>

      <Card variant="outlined" className="p-6">
        <div className="text-[11px] uppercase tracking-wider mb-4" style={{ color: "var(--color-ink-faint)" }}>
          usage
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-3xl font-medium tabular-nums mb-1" style={{ fontFamily: "var(--font-serif)" }}>
              {USER_STATS.totalWords.toLocaleString()}
            </div>
            <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>words dictated all-time</div>
          </div>
          <div>
            <div className="text-3xl font-medium tabular-nums mb-1" style={{ fontFamily: "var(--font-serif)" }}>
              {USER_STATS.totalSessions}
            </div>
            <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>dictation sessions</div>
          </div>
          <div>
            <div className="text-3xl font-medium tabular-nums mb-1 flex items-baseline gap-1" style={{ fontFamily: "var(--font-serif)" }}>
              {USER_STATS.currentStreak}
              <Flame size={16} style={{ color: "var(--color-terracotta)" }} />
            </div>
            <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>day streak</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
