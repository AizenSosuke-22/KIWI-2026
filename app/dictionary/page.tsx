"use client";

import { useState } from "react";
import { useKivi } from "@/lib/store";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { Plus, Trash2, Upload, ArrowRight } from "lucide-react";

export default function DictionaryPage() {
  const { dictionary, addDictionaryEntry, deleteDictionaryEntry } = useKivi();
  const [showAdd, setShowAdd] = useState(false);
  const [spoken, setSpoken] = useState("");
  const [written, setWritten] = useState("");
  const [note, setNote] = useState("");

  const handleAdd = () => {
    if (!spoken.trim() || !written.trim()) return;
    addDictionaryEntry({
      spoken: spoken.trim(),
      written: written.trim(),
      note: note.trim() || undefined,
    });
    setSpoken(""); setWritten(""); setNote("");
    setShowAdd(false);
  };

  return (
    <div className="px-10 py-10 max-w-4xl">
      <div className="flex items-start justify-between mb-8">
        <PageHeader
          title="dictionary"
          subtitle="words kivi never misspells."
        />
        <button
          className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md"
          style={{
            backgroundColor: "var(--color-cream-card)",
            border: "1px solid var(--color-border)",
            color: "var(--color-ink)",
          }}
        >
          <Upload size={12} /> import
        </button>
      </div>

      {/* Header example card */}
      <Card variant="outlined" className="p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--color-ink-faint)" }}>
              you say
            </div>
            <div
              className="text-xl italic"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
            >
              "aditya shatriya"
            </div>
          </div>
          <ArrowRight size={20} style={{ color: "var(--color-green)" }} />
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--color-ink-faint)" }}>
              kivi writes
            </div>
            <div className="text-xl" style={{ color: "var(--color-ink)" }}>
              Aaditya Kshatriya
            </div>
          </div>
        </div>
      </Card>

      <button
        onClick={() => setShowAdd(true)}
        className="w-full mb-6 py-3 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors"
        style={{
          border: "1px dashed var(--color-border-strong)",
          color: "var(--color-ink-muted)",
        }}
      >
        <Plus size={14} /> teach kivi a term
      </button>

      <div>
        <div className="text-[11px] uppercase tracking-wider mb-3" style={{ color: "var(--color-ink-faint)" }}>
          {dictionary.length} term{dictionary.length !== 1 ? "s" : ""}
        </div>
        <div className="space-y-1">
          {dictionary.map(entry => (
            <div
              key={entry.id}
              className="group flex items-start gap-3 p-3 rounded-lg transition-colors hover:bg-black/[0.02]"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm flex items-center gap-3">
                  <span className="italic" style={{ color: "var(--color-ink-muted)", fontFamily: "var(--font-serif)" }}>
                    "{entry.spoken}"
                  </span>
                  <ArrowRight size={12} style={{ color: "var(--color-ink-faint)" }} />
                  <span className="font-medium">{entry.written}</span>
                </div>
                {(entry.note || entry.alsoHeardAs) && (
                  <div className="mt-1 text-xs" style={{ color: "var(--color-ink-muted)" }}>
                    {entry.note && <span>{entry.note}</span>}
                    {entry.note && entry.alsoHeardAs && <span> · </span>}
                    {entry.alsoHeardAs && <span>also heard as "{entry.alsoHeardAs}"</span>}
                  </div>
                )}
              </div>
              <button
                onClick={() => deleteDictionaryEntry(entry.id)}
                className="p-1.5 rounded-md hover:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={13} style={{ color: "var(--color-terracotta)" }} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="teach kivi a term">
        <div className="space-y-4">
          <Input
            label="when you say"
            value={spoken}
            onChange={(e) => setSpoken(e.target.value)}
            placeholder="how the word sounds"
          />
          <Input
            label="kivi should write"
            value={written}
            onChange={(e) => setWritten(e.target.value)}
            placeholder="the correct spelling"
          />
          <Input
            label="note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder='e.g. "use in casual only"'
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowAdd(false)}
              className="text-sm px-4 py-2 rounded-md"
              style={{ color: "var(--color-ink-muted)" }}
            >
              cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={!spoken.trim() || !written.trim()}
              className="text-sm px-4 py-2 rounded-md font-medium disabled:opacity-40"
              style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
            >
              add term
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
