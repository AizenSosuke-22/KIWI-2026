"use client";

import { useKivi } from "@/lib/store";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Search, Filter, Copy, Check } from "lucide-react";

function formatRelative(date: Date): string {
  const diffMin = (Date.now() - date.getTime()) / 60000;
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${Math.round(diffMin)}m ago`;
  const diffHr = diffMin / 60;
  if (diffHr < 24) return `${Math.round(diffHr)}h ago`;
  return `${Math.round(diffHr / 24)}d ago`;
}

function groupByDay(items: ReturnType<typeof useKivi>["history"]) {
  const groups: Record<string, typeof items> = {};
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);

  items.forEach(item => {
    const d = new Date(item.timestamp);
    const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    let key: string;
    if (day.getTime() === today.getTime()) key = "today";
    else if (day.getTime() === yesterday.getTime()) key = "yesterday";
    else key = day.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
}

export default function HistoryPage() {
  const { history } = useKivi();
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = history.filter(h =>
    h.text.toLowerCase().includes(query.toLowerCase()) ||
    h.app.name.toLowerCase().includes(query.toLowerCase())
  );
  const grouped = groupByDay(filtered);

  const copy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="px-10 py-10 max-w-5xl">
      <PageHeader title="history" />

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-ink-faint)" }}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search your words — try: the launch review"
            className="w-full pl-10 pr-3.5 py-2.5 rounded-md text-sm outline-none"
            style={{
              backgroundColor: "var(--color-cream)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-border-strong)",
            }}
          />
        </div>
        <button
          className="px-3.5 py-2.5 rounded-md text-sm flex items-center gap-2"
          style={{
            backgroundColor: "var(--color-cream)",
            color: "var(--color-ink)",
            border: "1px solid var(--color-border-strong)",
          }}
        >
          <Filter size={14} /> filter
        </button>
      </div>

      <div className="text-xs mb-4" style={{ color: "var(--color-ink-muted)" }}>
        {filtered.length} take{filtered.length !== 1 ? "s" : ""}
      </div>

      {Object.entries(grouped).map(([day, items]) => (
        <div key={day} className="mb-6">
          <div
            className="text-xs mb-3"
            style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-serif)" }}
          >
            {day}
          </div>
          <div className="space-y-0">
            {items.map(item => (
              <div
                key={item.id}
                className="group flex items-start gap-3 py-3 px-2"
                style={{ borderBottom: "1px solid var(--color-border)" }}
              >
                <span className="text-lg mt-0.5">{item.app.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm line-clamp-2" style={{ color: "var(--color-ink)" }}>
                    {item.text}
                  </p>
                  <div
                    className="mt-1.5 flex items-center gap-2 text-[11px]"
                    style={{ color: "var(--color-ink-faint)" }}
                  >
                    <span>{item.app.name}</span>
                    {item.style && (<><span>·</span><span>{item.style}</span></>)}
                    {item.language && (<><span>·</span><span>{item.language}</span></>)}
                    {item.translated && (
                      <span
                        className="px-1.5 py-0.5 rounded"
                        style={{
                          backgroundColor: "var(--color-terracotta-soft)",
                          color: "var(--color-terracotta)",
                        }}
                      >
                        translated
                      </span>
                    )}
                    <span>·</span>
                    <span>{item.words} words</span>
                  </div>
                </div>
                <div
                  className="text-[11px] tabular-nums shrink-0"
                  style={{ color: "var(--color-ink-faint)" }}
                >
                  {formatRelative(new Date(item.timestamp))}
                </div>
                <button
                  onClick={() => copy(item.id, item.text)}
                  className="p-1.5 rounded-md hover:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  {copiedId === item.id ? (
                    <Check size={13} style={{ color: "var(--color-green)" }} />
                  ) : (
                    <Copy size={13} style={{ color: "var(--color-ink-muted)" }} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
