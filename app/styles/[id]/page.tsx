"use client";

import { useKivi } from "@/lib/store";
import { APPS, StyleApp } from "@/lib/mockData";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus, X, Upload, FileText, Check } from "lucide-react";
import Card from "@/components/ui/Card";
import Textarea from "@/components/ui/Textarea";
import { useState } from "react";
import Modal from "@/components/ui/Modal";

export default function StyleEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { styles, updateStyle } = useKivi();
  const style = styles.find(s => s.id === params.id);
  const [showAddApp, setShowAddApp] = useState(false);
  const [showTemplateEditor, setShowTemplateEditor] = useState(false);
  const [templateName, setTemplateName] = useState(style?.template?.name ?? "");
  const [templateDesc, setTemplateDesc] = useState(style?.template?.description ?? "");

  if (!style) {
    return (
      <div className="px-10 py-10">
        <p style={{ color: "var(--color-ink-muted)" }}>Style not found.</p>
      </div>
    );
  }

  const activeVoice = style.voices.find(v => v.id === style.activeVoiceId) ?? style.voices[0];
  const usedAppIds = new Set(style.apps.map(a => a.id));
  const availableApps = Object.values(APPS).filter(a => !usedAppIds.has(a.id));

  const setActiveVoice = (voiceId: string) => {
    updateStyle(style.id, s => ({ ...s, activeVoiceId: voiceId }));
  };

  const addApp = (app: StyleApp) => {
    updateStyle(style.id, s => ({ ...s, apps: [...s.apps, app] }));
    setShowAddApp(false);
  };

  const removeApp = (appId: string) => {
    updateStyle(style.id, s => ({ ...s, apps: s.apps.filter(a => a.id !== appId) }));
  };

  const setInstructions = (val: string) => {
    updateStyle(style.id, s => ({ ...s, instructions: val }));
  };

  const saveTemplate = () => {
    updateStyle(style.id, s => ({
      ...s,
      template: templateName ? { name: templateName, description: templateDesc } : null,
    }));
    setShowTemplateEditor(false);
  };

  const removeTemplate = () => {
    updateStyle(style.id, s => ({ ...s, template: null }));
    setTemplateName("");
    setTemplateDesc("");
  };

  return (
    <div className="px-10 py-10 max-w-4xl">
      <button
        onClick={() => router.push("/styles")}
        className="text-sm mb-6 flex items-center gap-1.5 transition-opacity hover:opacity-70"
        style={{ color: "var(--color-ink-muted)" }}
      >
        <ArrowLeft size={14} /> all styles
      </button>

      <div className="mb-8 flex items-start gap-4">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-xl shrink-0"
          style={{
            backgroundColor: "var(--color-green)",
            color: "var(--color-cream)",
            fontFamily: "var(--font-serif)",
            fontWeight: 500,
          }}
        >
          {style.name[0].toUpperCase()}
        </div>
        <div>
          <h1
            className="text-3xl leading-tight"
            style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}
          >
            {style.name}
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-ink-muted)" }}>
            {style.description}
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Apps section */}
        <Card variant="outlined" className="p-5">
          <div
            className="text-[11px] uppercase tracking-wider mb-3"
            style={{ color: "var(--color-ink-faint)" }}
          >
            apps
          </div>
          <div className="flex flex-wrap gap-2">
            {style.apps.map(app => (
              <div
                key={app.id}
                className="flex items-center gap-2 pl-3 pr-1.5 py-1.5 rounded-md text-sm"
                style={{
                  backgroundColor: "var(--color-cream)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <span>{app.icon}</span>
                <span>{app.name}</span>
                <button
                  onClick={() => removeApp(app.id)}
                  className="p-0.5 rounded hover:bg-black/5"
                  aria-label={`Remove ${app.name}`}
                >
                  <X size={12} style={{ color: "var(--color-ink-muted)" }} />
                </button>
              </div>
            ))}
            <button
              onClick={() => setShowAddApp(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors"
              style={{
                color: "var(--color-green-deep)",
                border: "1px dashed var(--color-border-strong)",
              }}
            >
              <Plus size={12} /> add app
            </button>
          </div>
        </Card>

        {/* Writing style / voice section */}
        <Card variant="outlined" className="p-5">
          <div
            className="text-[11px] uppercase tracking-wider mb-1"
            style={{ color: "var(--color-ink-faint)" }}
          >
            writing style
          </div>
          <div className="text-xs mb-4" style={{ color: "var(--color-ink-muted)" }}>
            <span style={{ color: "var(--color-ink-faint)" }}>you say</span> {style.saySample}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {style.voices.map(voice => {
              const isActive = voice.id === style.activeVoiceId;
              return (
                <button
                  key={voice.id}
                  onClick={() => setActiveVoice(voice.id)}
                  className="text-left p-4 rounded-lg transition-all relative"
                  style={{
                    backgroundColor: isActive ? "var(--color-green-light)" : "var(--color-cream)",
                    border: `1px solid ${isActive ? "var(--color-green)" : "var(--color-border)"}`,
                  }}
                >
                  {isActive && (
                    <div
                      className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "var(--color-green)" }}
                    >
                      <Check size={10} style={{ color: "var(--color-cream)" }} />
                    </div>
                  )}
                  <div
                    className="text-sm font-medium mb-1"
                    style={{ color: isActive ? "var(--color-green-deep)" : "var(--color-ink)" }}
                  >
                    {voice.name}
                  </div>
                  <div
                    className="text-xs mb-3"
                    style={{ color: "var(--color-ink-muted)" }}
                  >
                    {voice.description}
                  </div>
                  <div
                    className="text-xs whitespace-pre-line leading-relaxed"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {voice.example}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Template section */}
        <Card variant="outlined" className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div
                className="text-[11px] uppercase tracking-wider"
                style={{ color: "var(--color-ink-faint)" }}
              >
                template
              </div>
              <div className="text-xs mt-1" style={{ color: "var(--color-ink-muted)" }}>
                give kivi a reference document and it'll follow the structural format when dictating.
              </div>
            </div>
            {!style.template && (
              <button
                onClick={() => setShowTemplateEditor(true)}
                className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors"
                style={{
                  backgroundColor: "var(--color-cream)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-ink)",
                }}
              >
                <Upload size={12} /> add template
              </button>
            )}
          </div>

          {style.template ? (
            <div
              className="flex items-start gap-3 p-3 rounded-lg"
              style={{ backgroundColor: "var(--color-cream)" }}
            >
              <FileText size={16} style={{ color: "var(--color-green)" }} className="mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium">{style.template.name}</div>
                <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>
                  {style.template.description}
                </div>
              </div>
              <button
                onClick={() => setShowTemplateEditor(true)}
                className="text-xs px-2 py-1 rounded"
                style={{ color: "var(--color-ink-muted)" }}
              >
                edit
              </button>
              <button
                onClick={removeTemplate}
                className="text-xs px-2 py-1 rounded"
                style={{ color: "var(--color-terracotta)" }}
              >
                remove
              </button>
            </div>
          ) : (
            <div
              className="text-xs italic p-3 rounded-lg"
              style={{
                backgroundColor: "var(--color-cream)",
                color: "var(--color-ink-faint)",
              }}
            >
              no template — kivi will use its own defaults.
            </div>
          )}
        </Card>

        {/* Instructions section */}
        <Card variant="outlined" className="p-5">
          <div
            className="text-[11px] uppercase tracking-wider mb-1"
            style={{ color: "var(--color-ink-faint)" }}
          >
            your instructions
          </div>
          <div className="text-xs mb-3" style={{ color: "var(--color-ink-muted)" }}>
            standing rules for this voice — kivi will follow them every time.
          </div>
          <Textarea
            value={style.instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder='tell kivi what to preserve, remove, or change — e.g. "always keep names in English"'
            rows={3}
          />
        </Card>
      </div>

      {/* Add-app modal */}
      <Modal open={showAddApp} onClose={() => setShowAddApp(false)} title="add an app">
        {availableApps.length === 0 ? (
          <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
            All available apps are already added.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {availableApps.map(app => (
              <button
                key={app.id}
                onClick={() => addApp(app)}
                className="flex items-center gap-3 p-3 rounded-lg text-left transition-colors hover:bg-black/5"
                style={{ border: "1px solid var(--color-border)" }}
              >
                <span className="text-lg">{app.icon}</span>
                <span className="text-sm">{app.name}</span>
              </button>
            ))}
          </div>
        )}
      </Modal>

      {/* Template editor modal */}
      <Modal
        open={showTemplateEditor}
        onClose={() => setShowTemplateEditor(false)}
        title={style.template ? "edit template" : "add a template"}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-1.5" style={{ color: "var(--color-ink-muted)" }}>
              template name
            </label>
            <input
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="e.g. medium article, journal paper"
              className="w-full px-3.5 py-2.5 rounded-md text-sm outline-none"
              style={{
                backgroundColor: "var(--color-cream)",
                color: "var(--color-ink)",
                border: "1px solid var(--color-border-strong)",
              }}
            />
          </div>
          <Textarea
            label="what should kivi mimic?"
            value={templateDesc}
            onChange={(e) => setTemplateDesc(e.target.value)}
            placeholder="describe the format — headings, paragraph density, bullet style. keep it structural, not stylistic."
            rows={4}
          />
          <div
            className="text-xs p-3 rounded-md"
            style={{
              backgroundColor: "var(--color-terracotta-soft)",
              color: "var(--color-ink)",
            }}
          >
            <strong>heads up:</strong> template mimicry is v1 — it captures structural patterns
            well (headings, bullets, paragraph density) but doesn't attempt to copy voice or
            vocabulary. use the instructions field for those.
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowTemplateEditor(false)}
              className="text-sm px-4 py-2 rounded-md"
              style={{ color: "var(--color-ink-muted)" }}
            >
              cancel
            </button>
            <button
              onClick={saveTemplate}
              className="text-sm px-4 py-2 rounded-md font-medium"
              style={{
                backgroundColor: "var(--color-green)",
                color: "var(--color-cream)",
              }}
            >
              save template
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
