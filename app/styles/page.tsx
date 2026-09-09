"use client";

import { useKivi } from "@/lib/store";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";

export default function StylesPage() {
  const { styles } = useKivi();

  return (
    <div className="px-10 py-10 max-w-5xl">
      <PageHeader
        title="how you sound, app by app"
        subtitle="each style is a standing rule. pick the app, pick the voice, add a template if you want. kivi will apply it automatically when you dictate."
      />

      <div className="mb-6 flex items-center justify-between">
        <div>
          <div
            className="text-[11px] uppercase tracking-wider"
            style={{ color: "var(--color-ink-faint)" }}
          >
            your styles
          </div>
        </div>
        <button
          className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors"
          style={{
            backgroundColor: "var(--color-cream-card)",
            border: "1px solid var(--color-border)",
            color: "var(--color-ink)",
          }}
        >
          <Plus size={12} />
          create style
        </button>
      </div>

      <div className="space-y-3">
        {styles.map(style => (
          <Link key={style.id} href={`/styles/${style.id}`}>
            <Card
              variant="outlined"
              hoverable
              className="p-5 flex items-center justify-between group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3
                    className="text-lg"
                    style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}
                  >
                    {style.name}
                  </h3>
                  {style.apps.length > 0 && (
                    <div className="flex items-center gap-1">
                      {style.apps.slice(0, 3).map(app => (
                        <span
                          key={app.id}
                          className="text-xs px-1.5 py-0.5 rounded"
                          style={{
                            backgroundColor: "var(--color-cream)",
                            color: "var(--color-ink-muted)",
                          }}
                          title={app.name}
                        >
                          {app.icon}
                        </span>
                      ))}
                      {style.apps.length > 3 && (
                        <span
                          className="text-[10px]"
                          style={{ color: "var(--color-ink-faint)" }}
                        >
                          +{style.apps.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                  {style.description}
                </p>
                <div
                  className="mt-2 flex items-center gap-2 text-[11px]"
                  style={{ color: "var(--color-ink-faint)" }}
                >
                  <span>
                    active voice: <span style={{ color: "var(--color-ink-muted)" }}>{style.voices.find(v => v.id === style.activeVoiceId)?.name}</span>
                  </span>
                  {style.template && (
                    <>
                      <span>·</span>
                      <span>template: <span style={{ color: "var(--color-ink-muted)" }}>{style.template.name}</span></span>
                    </>
                  )}
                  {style.instructions && (
                    <>
                      <span>·</span>
                      <span>custom instructions</span>
                    </>
                  )}
                </div>
              </div>
              <ChevronRight
                size={18}
                style={{ color: "var(--color-ink-faint)" }}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
