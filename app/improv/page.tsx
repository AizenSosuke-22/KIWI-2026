"use client";

import { useKivi } from "@/lib/store";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import Kbd from "@/components/ui/Kbd";
import Textarea from "@/components/ui/Textarea";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { Plus, Star, Play, Trash2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ImprovPage() {
  const { transformations, addTransformation, updateTransformation, deleteTransformation, openOverlay } = useKivi();
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newInstr, setNewInstr] = useState("");

  const handleCreate = () => {
    if (!newName.trim() || !newInstr.trim()) return;
    addTransformation({
      name: newName.trim(),
      description: newDesc.trim() || "custom transformation",
      instruction: newInstr.trim(),
    });
    setNewName("");
    setNewDesc("");
    setNewInstr("");
    setShowCreate(false);
  };

  const toggleFavourite = (id: string) => {
    // Only one favourite allowed at a time
    const current = transformations.find(t => t.id === id);
    if (!current) return;
    transformations.forEach(t => {
      if (t.isFavourite && t.id !== id) {
        updateTransformation(t.id, prev => ({ ...prev, isFavourite: false }));
      }
    });
    updateTransformation(id, t => ({ ...t, isFavourite: !t.isFavourite }));
  };

  const sortedByUse = [...transformations].sort((a, b) => b.useCount - a.useCount);

  return (
    <div className="px-10 py-10 max-w-5xl">
      <PageHeader
        title="improv"
        subtitle="reshape any text you've already written. select the text in any app, press the hotkey, pick a move."
      />

      <Card
        variant="outlined"
        className="p-5 mb-6"
        style={{ backgroundColor: "var(--color-green-light)" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-sm font-medium mb-1">how it works</div>
            <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
              select any text in any app, press <Kbd>⌃</Kbd> <Kbd>⌥</Kbd> <Kbd>I</Kbd>, and pick from your three most-relevant moves. the overlay shows the most recent, the most used, and your favourite.
            </div>
          </div>
        </div>
      </Card>

      <div className="mb-3 flex items-center justify-between">
        <div className="text-[11px] uppercase tracking-wider" style={{ color: "var(--color-ink-faint)" }}>
          your library · {transformations.length}
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md"
          style={{
            backgroundColor: "var(--color-cream-card)",
            border: "1px solid var(--color-border)",
            color: "var(--color-ink)",
          }}
        >
          <Plus size={12} /> new transformation
        </button>
      </div>

      <div className="space-y-2">
        {sortedByUse.map(t => (
          <Card key={t.id} variant="outlined" className="p-4 flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-medium">{t.name}</h4>
                {t.isDefault && (
                  <span
                    className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: "var(--color-cream)",
                      color: "var(--color-ink-faint)",
                    }}
                  >
                    seeded
                  </span>
                )}
              </div>
              <p className="text-xs mb-2" style={{ color: "var(--color-ink-muted)" }}>
                {t.description}
              </p>
              <div
                className="text-xs italic p-2 rounded"
                style={{ backgroundColor: "var(--color-cream)", color: "var(--color-ink-muted)" }}
              >
                {t.instruction}
              </div>
              <div className="mt-2 flex items-center gap-2 text-[11px]" style={{ color: "var(--color-ink-faint)" }}>
                <span>used {t.useCount}×</span>
                {t.lastUsed && (
                  <>
                    <span>·</span>
                    <span>last used {t.lastUsed}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => toggleFavourite(t.id)}
                className="p-1.5 rounded-md hover:bg-black/5"
                title={t.isFavourite ? "unfavourite" : "favourite"}
              >
                <Star
                  size={14}
                  fill={t.isFavourite ? "currentColor" : "none"}
                  style={{ color: t.isFavourite ? "var(--color-terracotta)" : "var(--color-ink-faint)" }}
                />
              </button>
              <button
                onClick={() => openOverlay({ kind: "improv", selectedText: "The meeting is scheduled for tomorrow at 3 PM in conference room B." })}
                className="p-1.5 rounded-md hover:bg-black/5"
                title="try it"
              >
                <Play size={14} style={{ color: "var(--color-ink-muted)" }} />
              </button>
              {!t.isDefault && (
                <button
                  onClick={() => deleteTransformation(t.id)}
                  className="p-1.5 rounded-md hover:bg-black/5"
                  title="delete"
                >
                  <Trash2 size={14} style={{ color: "var(--color-terracotta)" }} />
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        title="create a transformation"
      >
        <div className="space-y-4">
          <Input
            label="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="e.g. make it sound like an executive summary"
          />
          <Input
            label="short description"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="what does it do, in one line?"
          />
          <Textarea
            label="instruction for kivi"
            value={newInstr}
            onChange={(e) => setNewInstr(e.target.value)}
            placeholder='e.g. "Rewrite the selected text as a three-bullet executive summary. Lead with the outcome. Cut all preamble."'
            rows={4}
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowCreate(false)}
              className="text-sm px-4 py-2 rounded-md"
              style={{ color: "var(--color-ink-muted)" }}
            >
              cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!newName.trim() || !newInstr.trim()}
              className="text-sm px-4 py-2 rounded-md font-medium disabled:opacity-40"
              style={{
                backgroundColor: "var(--color-green)",
                color: "var(--color-cream)",
              }}
            >
              create
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
