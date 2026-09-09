"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Card from "@/components/ui/Card";
import Toggle from "@/components/ui/Toggle";
import Kbd from "@/components/ui/Kbd";
import Modal from "@/components/ui/Modal";
import { Search, RefreshCw, Play, ChevronRight } from "lucide-react";

type Section =
  | "general"
  | "language"
  | "circle"
  | "system"
  | "plan"
  | "invite"
  | "team"
  | "privacy"
  | "account"
  | "advanced";

export default function SettingsPage() {
  const [section, setSection] = useState<Section>("general");
  const [query, setQuery] = useState("");

  return (
    <div className="flex min-h-screen">
      {/* Settings sub-sidebar */}
      <div
        className="w-60 shrink-0 border-r px-4 py-8"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div className="relative mb-6">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--color-ink-faint)" }}
          />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="search settings"
            className="w-full pl-8 pr-3 py-2 rounded-md text-sm outline-none"
            style={{
              backgroundColor: "var(--color-cream)",
              color: "var(--color-ink)",
              border: "1px solid var(--color-border-strong)",
            }}
          />
        </div>

        <div className="mb-5">
          <div className="text-[11px] uppercase tracking-wider mb-2 px-2" style={{ color: "var(--color-ink-faint)" }}>
            how kivi behaves
          </div>
          <ul className="space-y-0.5">
            <SidebarItem label="general" active={section === "general"} onClick={() => setSection("general")} />
            <SidebarItem label="language & script" active={section === "language"} onClick={() => setSection("language")} badge="new" />
            <SidebarItem label="the circle" active={section === "circle"} onClick={() => setSection("circle")} />
            <SidebarItem label="system" active={section === "system"} onClick={() => setSection("system")} />
          </ul>
        </div>

        <div>
          <div className="text-[11px] uppercase tracking-wider mb-2 px-2" style={{ color: "var(--color-ink-faint)" }}>
            you & your team
          </div>
          <ul className="space-y-0.5">
            <SidebarItem label="plan & billing" active={section === "plan"} onClick={() => setSection("plan")} />
            <SidebarItem label="invite friends" active={section === "invite"} onClick={() => setSection("invite")} />
            <SidebarItem label="team" active={section === "team"} onClick={() => setSection("team")} />
            <SidebarItem label="data & privacy" active={section === "privacy"} onClick={() => setSection("privacy")} />
            <SidebarItem label="account" active={section === "account"} onClick={() => setSection("account")} />
            <SidebarItem label="advanced" active={section === "advanced"} onClick={() => setSection("advanced")} />
          </ul>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-10 py-10 max-w-3xl">
          {section === "general" && <GeneralSection />}
          {section === "language" && <LanguageSection />}
          {section === "circle" && <CircleSection />}
          {section === "system" && <SystemSection />}
          {section === "plan" && <PlanSection />}
          {section === "invite" && <InviteSection />}
          {section === "team" && <TeamSection />}
          {section === "privacy" && <PrivacySection />}
          {section === "account" && <AccountSection />}
          {section === "advanced" && <AdvancedSection />}
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ label, active, onClick, badge }: { label: string; active: boolean; onClick: () => void; badge?: string }) {
  return (
    <li>
      <button
        onClick={onClick}
        className="w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors flex items-center justify-between"
        style={{
          backgroundColor: active ? "var(--color-green-light)" : "transparent",
          color: active ? "var(--color-green-deep)" : "var(--color-ink)",
          fontWeight: active ? 500 : 400,
        }}
      >
        <span>{label}</span>
        {badge && (
          <span
            className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded"
            style={{ backgroundColor: "var(--color-terracotta-soft)", color: "var(--color-terracotta)" }}
          >
            {badge}
          </span>
        )}
      </button>
    </li>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
        {title}
      </h1>
      <button className="text-xs flex items-center gap-1.5" style={{ color: "var(--color-ink-muted)" }}>
        <RefreshCw size={11} /> reset
      </button>
    </div>
  );
}

function Row({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div
      className="flex items-center justify-between p-4"
      style={{ borderBottom: "1px solid var(--color-border)" }}
    >
      <div className="flex-1 min-w-0 mr-4">
        <div className="text-sm">{label}</div>
        {sub && <div className="text-xs mt-0.5" style={{ color: "var(--color-ink-muted)" }}>{sub}</div>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function GeneralSection() {
  const [appearance, setAppearance] = useState<"light" | "dark">("light");
  const [greeting, setGreeting] = useState(true);
  const [factCard, setFactCard] = useState(true);
  const [factCategory, setFactCategory] = useState<"all" | "india" | "birds" | "ai">("all");
  const [hotkeyModal, setHotkeyModal] = useState<{ id: string; label: string } | null>(null);

  return (
    <>
      <SectionHeader title="general" />

      <Card variant="outlined" className="mb-6 overflow-hidden">
        <div className="text-[11px] uppercase tracking-wider px-4 pt-4 mb-2" style={{ color: "var(--color-ink-faint)" }}>
          appearance & home
        </div>
        <Row label="appearance" sub="dark mode is a fast-follow; light is what we ship first.">
          <div className="flex gap-1 p-1 rounded-md" style={{ backgroundColor: "var(--color-cream)" }}>
            <button
              onClick={() => setAppearance("light")}
              className="px-3 py-1 rounded text-xs"
              style={{
                backgroundColor: appearance === "light" ? "var(--color-green-light)" : "transparent",
                color: appearance === "light" ? "var(--color-green-deep)" : "var(--color-ink-muted)",
                fontWeight: appearance === "light" ? 500 : 400,
              }}
            >
              light
            </button>
            <button
              onClick={() => setAppearance("dark")}
              disabled
              className="px-3 py-1 rounded text-xs disabled:opacity-40"
              style={{ color: "var(--color-ink-muted)" }}
            >
              dark (soon)
            </button>
          </div>
        </Row>
        <Row label="welcome greeting" sub='shows "good morning, priyadarshi" on the home screen.'>
          <Toggle checked={greeting} onChange={setGreeting} />
        </Row>
        <Row label="fact card" sub="the rotating did-you-know card on the home screen.">
          <Toggle checked={factCard} onChange={setFactCard} />
        </Row>
        {factCard && (
          <Row label="fact category" sub="pick what you want to see, or leave it random.">
            <select
              value={factCategory}
              onChange={e => setFactCategory(e.target.value as typeof factCategory)}
              className="text-xs px-2.5 py-1.5 rounded-md outline-none"
              style={{
                backgroundColor: "var(--color-cream)",
                border: "1px solid var(--color-border-strong)",
                color: "var(--color-ink)",
              }}
            >
              <option value="all">all (random)</option>
              <option value="india">india</option>
              <option value="birds">birds</option>
              <option value="ai">ai</option>
            </select>
          </Row>
        )}
      </Card>

      <Card variant="outlined" className="mb-6 overflow-hidden">
        <div className="text-[11px] uppercase tracking-wider px-4 pt-4 mb-2" style={{ color: "var(--color-ink-faint)" }}>
          keyboard shortcuts
        </div>
        <Row label="dictate" sub="opens a dictation session. same combo commits.">
          <button
            onClick={() => setHotkeyModal({ id: "dictate", label: "dictate" })}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-black/5"
          >
            <Kbd>⌃</Kbd><Kbd>⌘</Kbd>
          </button>
        </Row>
        <Row label="improv" sub="reshape selected text with a saved transformation.">
          <button
            onClick={() => setHotkeyModal({ id: "improv", label: "improv" })}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-black/5"
          >
            <Kbd>⌃</Kbd><Kbd>⌥</Kbd><Kbd>I</Kbd>
          </button>
        </Row>
        <Row label="translate" sub="start a translate session using the active profile.">
          <button
            onClick={() => setHotkeyModal({ id: "translate", label: "translate" })}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-black/5"
          >
            <Kbd>⌃</Kbd><Kbd>⇧</Kbd><Kbd>T</Kbd>
          </button>
        </Row>
        <Row label="discard session" sub="cancel any overlay without typing anything.">
          <Kbd>esc</Kbd>
        </Row>
        <div
          className="px-4 py-3 text-xs"
          style={{ backgroundColor: "var(--color-cream)", color: "var(--color-ink-muted)" }}
        >
          <strong style={{ color: "var(--color-ink)" }}>binding safety.</strong> kivi automatically prevents you from setting two hotkeys to the same combo. no separate toggle needed.
        </div>
      </Card>

      <Card variant="outlined" className="overflow-hidden">
        <div className="text-[11px] uppercase tracking-wider px-4 pt-4 mb-2" style={{ color: "var(--color-ink-faint)" }}>
          onboarding
        </div>
        <Row label="welcome demo" sub="replay the interactive tour you saw when kivi was first installed.">
          <button
            className="text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5"
            style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-border)", color: "var(--color-ink)" }}
          >
            <Play size={11} /> replay
          </button>
        </Row>
      </Card>

      <Modal
        open={!!hotkeyModal}
        onClose={() => setHotkeyModal(null)}
        title={`change ${hotkeyModal?.label ?? ""} hotkey`}
      >
        <div className="text-sm mb-4" style={{ color: "var(--color-ink-muted)" }}>
          Press the new key combination. Kivi will check it does not conflict with your other hotkeys.
        </div>
        <div
          className="p-6 rounded-lg text-center"
          style={{ backgroundColor: "var(--color-cream)", border: "2px dashed var(--color-border-strong)" }}
        >
          <div className="text-xs mb-2" style={{ color: "var(--color-ink-faint)" }}>
            waiting for input...
          </div>
          <div className="flex items-center justify-center gap-1">
            <Kbd>⌃</Kbd><Kbd>⌘</Kbd>
          </div>
        </div>
      </Modal>
    </>
  );
}

function LanguageSection() {
  const [autoDetect, setAutoDetect] = useState(true);
  const [preferredScript, setPreferredScript] = useState<"native" | "roman">("roman");
  const [codeSwitching, setCodeSwitching] = useState(true);

  return (
    <>
      <SectionHeader title="language & script" />
      <div className="text-xs mb-5" style={{ color: "var(--color-ink-muted)" }}>
        moved out of styles. these settings apply globally to how kivi transcribes your speech.
      </div>

      <Card variant="outlined" className="mb-5 overflow-hidden">
        <div className="text-[11px] uppercase tracking-wider px-4 pt-4 mb-2" style={{ color: "var(--color-ink-faint)" }}>
          language
        </div>
        <Row label="auto-detect language" sub="let kivi figure out what you are speaking each session.">
          <Toggle checked={autoDetect} onChange={setAutoDetect} />
        </Row>
        <Row label="primary language" sub="the language you use most often.">
          <select
            className="text-xs px-2.5 py-1.5 rounded-md outline-none"
            style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-border-strong)" }}
            defaultValue="en"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="mr">Marathi</option>
            <option value="bn">Bengali</option>
            <option value="te">Telugu</option>
            <option value="kn">Kannada</option>
            <option value="ml">Malayalam</option>
            <option value="gu">Gujarati</option>
            <option value="pa">Punjabi</option>
          </select>
        </Row>
      </Card>

      <Card variant="outlined" className="overflow-hidden">
        <div className="text-[11px] uppercase tracking-wider px-4 pt-4 mb-2" style={{ color: "var(--color-ink-faint)" }}>
          script
        </div>
        <Row label="preferred script for indic languages" sub="native (देवनागरी) or roman (namaste).">
          <div className="flex gap-1 p-1 rounded-md" style={{ backgroundColor: "var(--color-cream)" }}>
            <button
              onClick={() => setPreferredScript("native")}
              className="px-3 py-1 rounded text-xs"
              style={{
                backgroundColor: preferredScript === "native" ? "var(--color-green-light)" : "transparent",
                color: preferredScript === "native" ? "var(--color-green-deep)" : "var(--color-ink-muted)",
                fontWeight: preferredScript === "native" ? 500 : 400,
              }}
            >
              native
            </button>
            <button
              onClick={() => setPreferredScript("roman")}
              className="px-3 py-1 rounded text-xs"
              style={{
                backgroundColor: preferredScript === "roman" ? "var(--color-green-light)" : "transparent",
                color: preferredScript === "roman" ? "var(--color-green-deep)" : "var(--color-ink-muted)",
                fontWeight: preferredScript === "roman" ? 500 : 400,
              }}
            >
              roman
            </button>
          </div>
        </Row>
        <Row label="code-switching" sub="mix english into indic sentences the way you actually speak.">
          <Toggle checked={codeSwitching} onChange={setCodeSwitching} />
        </Row>
      </Card>
    </>
  );
}

function CircleSection() {
  const [size, setSize] = useState<"normal" | "mini" | "large">("normal");
  const [position, setPosition] = useState<"top" | "top-left" | "top-right">("top");
  const [tooltips, setTooltips] = useState(true);
  const [sounds, setSounds] = useState(false);

  return (
    <>
      <SectionHeader title="the circle" />
      <div className="text-xs mb-5" style={{ color: "var(--color-ink-muted)" }}>
        controls how the dictation overlay looks and behaves. renamed from "the orb" — same job, better name.
      </div>

      <Card variant="outlined" className="mb-5 overflow-hidden">
        <div className="text-[11px] uppercase tracking-wider px-4 pt-4 mb-2" style={{ color: "var(--color-ink-faint)" }}>
          appearance
        </div>
        <Row label="size" sub="how large the circle appears when active.">
          <div className="flex gap-1 p-1 rounded-md" style={{ backgroundColor: "var(--color-cream)" }}>
            {(["mini", "normal", "large"] as const).map(s => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className="px-3 py-1 rounded text-xs"
                style={{
                  backgroundColor: size === s ? "var(--color-green-light)" : "transparent",
                  color: size === s ? "var(--color-green-deep)" : "var(--color-ink-muted)",
                  fontWeight: size === s ? 500 : 400,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </Row>
        <Row label="position on screen" sub="where the circle appears when a session opens.">
          <select
            value={position}
            onChange={e => setPosition(e.target.value as typeof position)}
            className="text-xs px-2.5 py-1.5 rounded-md outline-none"
            style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-border-strong)" }}
          >
            <option value="top">top center</option>
            <option value="top-left">top left</option>
            <option value="top-right">top right</option>
          </select>
        </Row>
      </Card>

      <Card variant="outlined" className="overflow-hidden">
        <div className="text-[11px] uppercase tracking-wider px-4 pt-4 mb-2" style={{ color: "var(--color-ink-faint)" }}>
          behaviour
        </div>
        <Row label="show tooltips" sub="tiny hints appear near the circle during your first few sessions.">
          <Toggle checked={tooltips} onChange={setTooltips} />
        </Row>
        <Row label="session sounds" sub="a soft chime when a session opens and commits. off by default.">
          <Toggle checked={sounds} onChange={setSounds} />
        </Row>
      </Card>
    </>
  );
}

function SystemSection() {
  const [startup, setStartup] = useState(true);
  const [menuBar, setMenuBar] = useState(true);
  const [updates, setUpdates] = useState(true);

  return (
    <>
      <SectionHeader title="system" />
      <Card variant="outlined" className="overflow-hidden">
        <Row label="launch on startup" sub="open kivi automatically when you sign in.">
          <Toggle checked={startup} onChange={setStartup} />
        </Row>
        <Row label="show in menu bar" sub="keep the kivi icon at the top of your screen.">
          <Toggle checked={menuBar} onChange={setMenuBar} />
        </Row>
        <Row label="auto-install updates" sub="patches and small updates roll out silently.">
          <Toggle checked={updates} onChange={setUpdates} />
        </Row>
        <Row label="version" sub="kivi 2.0.0 · sarvam alpha">
          <span className="text-xs" style={{ color: "var(--color-ink-muted)" }}>up to date</span>
        </Row>
      </Card>
    </>
  );
}

function PlanSection() {
  return (
    <>
      <SectionHeader title="plan & billing" />
      <Card variant="outlined" className="p-6 mb-5">
        <div className="text-[11px] uppercase tracking-wider mb-2" style={{ color: "var(--color-ink-faint)" }}>
          current plan
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <div className="text-2xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
            free · alpha
          </div>
        </div>
        <div className="text-xs mb-4" style={{ color: "var(--color-ink-muted)" }}>
          you are on the sarvam alpha. all features included at no cost while we tune the models for indic languages.
        </div>
        <button
          className="text-sm px-4 py-2 rounded-md font-medium"
          style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
        >
          upgrade to pro
        </button>
      </Card>
      <Card variant="outlined" className="p-6">
        <div className="text-[11px] uppercase tracking-wider mb-3" style={{ color: "var(--color-ink-faint)" }}>
          alpha usage this month
        </div>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <div className="text-2xl font-medium tabular-nums" style={{ fontFamily: "var(--font-serif)" }}>1,240</div>
            <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>words</div>
          </div>
          <div>
            <div className="text-2xl font-medium tabular-nums" style={{ fontFamily: "var(--font-serif)" }}>87</div>
            <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>sessions</div>
          </div>
          <div>
            <div className="text-2xl font-medium tabular-nums" style={{ fontFamily: "var(--font-serif)" }}>∞</div>
            <div className="text-xs" style={{ color: "var(--color-ink-muted)" }}>limit</div>
          </div>
        </div>
      </Card>
    </>
  );
}

function InviteSection() {
  return (
    <>
      <SectionHeader title="invite friends" />
      <Card variant="outlined" className="p-6">
        <div className="text-sm mb-4">
          share kivi with a friend. both of you get one month of pro when they sign up.
        </div>
        <div className="flex gap-2">
          <input
            readOnly
            value="https://kivi.sarvam.ai/join/PRIYADARSHI"
            className="flex-1 px-3 py-2 rounded-md text-sm outline-none"
            style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-border-strong)" }}
          />
          <button
            className="text-sm px-4 py-2 rounded-md font-medium"
            style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
          >
            copy link
          </button>
        </div>
      </Card>
    </>
  );
}

function TeamSection() {
  return (
    <>
      <SectionHeader title="team" />
      <Card variant="outlined" className="p-6 text-center">
        <div className="text-sm mb-1" style={{ color: "var(--color-ink)" }}>
          you are not on a team yet.
        </div>
        <div className="text-xs mb-4" style={{ color: "var(--color-ink-muted)" }}>
          create or join a team to share styles, dictionaries, and shortcuts.
        </div>
        <button
          className="text-sm px-4 py-2 rounded-md font-medium"
          style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
        >
          create team
        </button>
      </Card>
    </>
  );
}

function PrivacySection() {
  const [saveHistory, setSaveHistory] = useState(true);
  const [audioRetention, setAudioRetention] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  return (
    <>
      <SectionHeader title="data & privacy" />
      <Card variant="outlined" className="mb-5 overflow-hidden">
        <div className="text-[11px] uppercase tracking-wider px-4 pt-4 mb-2" style={{ color: "var(--color-ink-faint)" }}>
          your data
        </div>
        <Row label="save dictation history" sub="keep a log of every take. required for pattern insights.">
          <Toggle checked={saveHistory} onChange={setSaveHistory} />
        </Row>
        <Row label="retain audio" sub="keep the audio itself, not just the text. off by default.">
          <Toggle checked={audioRetention} onChange={setAudioRetention} />
        </Row>
        <Row label="anonymous product analytics" sub="helps sarvam improve kivi. never linked to your account.">
          <Toggle checked={analytics} onChange={setAnalytics} />
        </Row>
      </Card>
      <Card variant="outlined" className="overflow-hidden">
        <Row label="export all my data" sub="download everything as json.">
          <button className="text-xs px-3 py-1.5 rounded-md" style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-border)" }}>
            export
          </button>
        </Row>
        <Row label="delete all my data" sub="cannot be undone.">
          <button className="text-xs px-3 py-1.5 rounded-md" style={{ color: "var(--color-terracotta)" }}>
            delete
          </button>
        </Row>
      </Card>
    </>
  );
}

function AccountSection() {
  return (
    <>
      <SectionHeader title="account" />
      <Card variant="outlined" className="overflow-hidden mb-5">
        <Row label="email" sub="me23b084@smail.iitm.ac.in">
          <button className="text-xs px-2 py-1 rounded" style={{ color: "var(--color-ink-muted)" }}>change</button>
        </Row>
        <Row label="mobile" sub="+91 · ••••• ••••23">
          <button className="text-xs px-2 py-1 rounded" style={{ color: "var(--color-ink-muted)" }}>change</button>
        </Row>
        <Row label="linked accounts" sub="google, apple.">
          <ChevronRight size={14} style={{ color: "var(--color-ink-faint)" }} />
        </Row>
      </Card>
      <Card variant="outlined" className="p-4">
        <div className="text-sm mb-1" style={{ color: "var(--color-terracotta)" }}>danger zone</div>
        <div className="text-xs mb-3" style={{ color: "var(--color-ink-muted)" }}>
          permanently delete your account and everything associated with it.
        </div>
        <button
          className="text-xs px-3 py-1.5 rounded-md"
          style={{ color: "var(--color-terracotta)", border: "1px solid var(--color-terracotta)" }}
        >
          delete my account
        </button>
      </Card>
    </>
  );
}

function AdvancedSection() {
  const [debug, setDebug] = useState(false);
  const [experimental, setExperimental] = useState(false);
  return (
    <>
      <SectionHeader title="advanced" />
      <Card variant="outlined" className="overflow-hidden">
        <Row label="debug mode" sub="show internal state, model responses, and timings. developer only.">
          <Toggle checked={debug} onChange={setDebug} />
        </Row>
        <Row label="experimental features" sub="try things sarvam is still testing. may be unstable.">
          <Toggle checked={experimental} onChange={setExperimental} />
        </Row>
        <Row label="model version" sub="saaras v4 (default)">
          <select
            className="text-xs px-2.5 py-1.5 rounded-md outline-none"
            style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-border-strong)" }}
            defaultValue="v4"
          >
            <option value="v4">saaras v4 (recommended)</option>
            <option value="v3">saaras v3</option>
          </select>
        </Row>
      </Card>
    </>
  );
}
