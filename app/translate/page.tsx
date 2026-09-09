"use client";

import { useKivi } from "@/lib/store";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import Kbd from "@/components/ui/Kbd";
import { ArrowRight, ChevronRight, Plus, Play } from "lucide-react";
import Link from "next/link";

export default function TranslatePage() {
  const { translateProfiles, openOverlay } = useKivi();

  return (
    <div className="px-10 py-10 max-w-5xl">
      <PageHeader
        title="translate"
        subtitle="speak in one language, write in another. saved profiles apply automatically when you press the hotkey."
      />

      <Card
        variant="outlined"
        className="p-5 mb-6 flex items-center justify-between"
        style={{ backgroundColor: "var(--color-green-light)" }}
      >
        <div className="flex items-center gap-3">
          <div>
            <div className="text-sm font-medium mb-0.5">how it works</div>
            <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
              pick a profile below, place your cursor in any app, then press <Kbd>⌃</Kbd> <Kbd>⇧</Kbd> <Kbd>T</Kbd> to start translating.
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--color-ink-faint)" }}>
          your profiles
        </div>
        <button
          className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md"
          style={{
            backgroundColor: "var(--color-cream-card)",
            border: "1px solid var(--color-border)",
            color: "var(--color-ink)",
          }}
        >
          <Plus size={12} /> new profile
        </button>
      </div>

      <div className="space-y-3">
        {translateProfiles.map(profile => (
          <Card key={profile.id} variant="outlined" className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3
                    className="text-lg"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                  >
                    {profile.name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 mb-4 text-sm">
                  <span
                    className="px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: "var(--color-cream)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {profile.from.label}
                  </span>
                  <ArrowRight size={14} style={{ color: "var(--color-ink-faint)" }} />
                  <span
                    className="px-2.5 py-1 rounded-md"
                    style={{
                      backgroundColor: "var(--color-cream)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {profile.to.label}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-xs"
                    style={{
                      backgroundColor: "var(--color-green-light)",
                      color: "var(--color-green-deep)",
                    }}
                  >
                    {profile.script} script
                  </span>
                </div>

                {/* Live example */}
                <div
                  className="p-3 rounded-lg mb-4"
                  style={{ backgroundColor: "var(--color-cream)" }}
                >
                  <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: "var(--color-ink-faint)" }}>
                    example
                  </div>
                  <div className="text-sm mb-1" style={{ color: "var(--color-ink-muted)" }}>
                    <span className="text-[10px] uppercase tracking-wider mr-2" style={{ color: "var(--color-ink-faint)" }}>you say</span>
                    {profile.from.label === "Hindi" ? "meeting kal shaam ko hai" :
                     profile.from.label === "Tamil" ? "naalaikku meeting" :
                     "please send the report"}
                  </div>
                  <div className="text-sm" style={{ color: "var(--color-ink)" }}>
                    <span className="text-[10px] uppercase tracking-wider mr-2" style={{ color: "var(--color-ink-faint)" }}>kivi writes</span>
                    {profile.script === "native" && profile.to.code === "hi"
                      ? "कृपया रिपोर्ट भेज दें।"
                      : profile.to.code === "en"
                        ? "The meeting is tomorrow evening."
                        : "meeting kal shaam ko hai"}
                  </div>
                </div>

                {profile.apps.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs" style={{ color: "var(--color-ink-faint)" }}>applies to</span>
                    <div className="flex items-center gap-1">
                      {profile.apps.map(app => (
                        <span
                          key={app.id}
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: "var(--color-cream)",
                            color: "var(--color-ink-muted)",
                          }}
                        >
                          {app.icon} {app.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => openOverlay({ kind: "translate", targetApp: profile.apps[0]?.name ?? "Slack", profileId: profile.id })}
                className="ml-4 flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium"
                style={{
                  backgroundColor: "var(--color-green)",
                  color: "var(--color-cream)",
                }}
              >
                <Play size={12} /> try it
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
