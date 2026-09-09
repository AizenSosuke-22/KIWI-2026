"use client";

import { useState } from "react";
import { useKivi } from "@/lib/store";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Modal from "@/components/ui/Modal";
import { Plus, Trash2, ArrowRight } from "lucide-react";

export default function ShortcutsPage() {
  const { shortcuts, addShortcut, deleteShortcut } = useKivi();
  const [showAdd, setShowAdd] = useState(false);
  const [trigger, setTrigger] = useState("");
  const [expansion, setExpansion] = useState("");

  const handleAdd = () => {
    if (!trigger.trim() || !expansion.trim()) return;
    addShortcut({ trigger: trigger.trim(), expansion: expansion.trim() });
    setTrigger(""); setExpansion("");
    setShowAdd(false);
  };

  return (
    <div className="px-10 py-10 max-w-4xl">
      <PageHeader
        title="shortcuts"
        subtitle="short phrase, full block. teach kivi once, use forever."
      />

      {/* Header example card */}
      <Card variant="outlined" className="p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--color-ink-faint)" }}>
              you say
            </div>
            <div
              className="text-xl italic"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}
            >
              "my sign-off"
            </div>
          </div>
          <ArrowRight size={20} style={{ color: "var(--color-green)" }} className="mt-4" />
          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: "var(--color-ink-faint)" }}>
              kivi writes
            </div>
            <div
              className="text-sm whitespace-pre-line p-3 rounded-lg"
              style={{
                backgroundColor: "var(--color-cream)",
                color: "var(--color-ink)",
                border: "1px solid var(--color-border)",
              }}
            >
              {"Warm regards,\nPriyadarshi Ubale\nSarvam AI"}
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
        <Plus size={14} /> teach kivi a shortcut
      </button>

      <div>
        <div className="text-[11px] uppercase tracking-wider mb-3" style={{ color: "var(--color-ink-faint)" }}>
          {shortcuts.length} shortcut{shortcuts.length !== 1 ? "s" : ""}
        </div>
        <div className="space-y-3">
          {shortcuts.map(s => (
            <Card key={s.id} variant="outlined" className="p-4 group">
              <div className="flex items-start gap-4">
                <div
                  className="italic px-3 py-1.5 rounded shrink-0"
                  style={{
                    backgroundColor: "var(--color-cream)",
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-ink)",
                  }}
                >
                  "{s.trigger}"
                </div>
                <ArrowRight size={14} style={{ color: "var(--color-ink-faint)" }} className="mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <pre
                    className="text-sm whitespace-pre-wrap font-sans"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {s.expansion}
                  </pre>
                </div>
                <button
                  onClick={() => deleteShortcut(s.id)}
                  className="p-1.5 rounded-md hover:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                >
                  <Trash2 size={13} style={{ color: "var(--color-terracotta)" }} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal open={showAdd} onClose={() => setShowAdd(false)} title="teach kivi a shortcut">
        <div className="space-y-4">
          <Input
            label="trigger phrase"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            placeholder='e.g. "my address"'
          />
          <Textarea
            label="expansion"
            value={expansion}
            onChange={(e) => setExpansion(e.target.value)}
            placeholder="what kivi writes when you say the trigger"
            rows={5}
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
              disabled={!trigger.trim() || !expansion.trim()}
              className="text-sm px-4 py-2 rounded-md font-medium disabled:opacity-40"
              style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
            >
              add shortcut
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
