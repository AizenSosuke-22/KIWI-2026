"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Mic, Accessibility, Languages, Sparkles, Check, ArrowRight } from "lucide-react";
import Kbd from "@/components/ui/Kbd";

type Step = "signin" | "mic" | "accessibility" | "language" | "demo";

export default function OnboardingPage() {
  const [step, setStep] = useState<Step>("signin");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [micGranted, setMicGranted] = useState(false);
  const [accessibilityGranted, setAccessibilityGranted] = useState(false);
  const [languages, setLanguages] = useState<string[]>(["English", "Hindi"]);
  const router = useRouter();

  const finish = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kivi-onboarded", "true");
    }
    router.push("/");
  };

  const steps: Step[] = ["signin", "mic", "accessibility", "language", "demo"];
  const stepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div
              key={s}
              className="h-1 rounded-full transition-all"
              style={{
                width: i === stepIndex ? "32px" : "8px",
                backgroundColor: i <= stepIndex ? "var(--color-green)" : "var(--color-border-strong)",
              }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {step === "signin" && (
              <div>
                <h1 className="text-3xl mb-2" style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>
                  welcome to <span className="underline-squiggle">kivi</span>
                </h1>
                <p className="text-sm mb-6" style={{ color: "var(--color-ink-muted)" }}>
                  sign in with your email. we will send a one-time code to confirm.
                </p>
                <label className="block text-sm mb-1.5" style={{ color: "var(--color-ink-muted)" }}>
                  email or mobile
                </label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-md text-sm outline-none mb-3"
                  style={{
                    backgroundColor: "var(--color-cream)",
                    color: "var(--color-ink)",
                    border: "1px solid var(--color-border-strong)",
                  }}
                />
                {otpSent && (
                  <>
                    <label className="block text-sm mb-1.5" style={{ color: "var(--color-ink-muted)" }}>
                      one-time code
                    </label>
                    <input
                      value={otp}
                      onChange={e => setOtp(e.target.value)}
                      placeholder="6-digit code"
                      className="w-full px-3.5 py-2.5 rounded-md text-sm outline-none mb-3 tracking-widest"
                      style={{
                        backgroundColor: "var(--color-cream)",
                        color: "var(--color-ink)",
                        border: "1px solid var(--color-border-strong)",
                      }}
                    />
                  </>
                )}
                {!otpSent ? (
                  <button
                    onClick={() => setOtpSent(true)}
                    disabled={!email.trim()}
                    className="w-full px-4 py-2.5 rounded-md font-medium text-sm disabled:opacity-40"
                    style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
                  >
                    send code
                  </button>
                ) : (
                  <button
                    onClick={() => setStep("mic")}
                    disabled={otp.length < 4}
                    className="w-full px-4 py-2.5 rounded-md font-medium text-sm disabled:opacity-40 flex items-center justify-center gap-2"
                    style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
                  >
                    verify & continue <ArrowRight size={14} />
                  </button>
                )}
              </div>
            )}

            {step === "mic" && (
              <PermissionCard
                icon={<Mic size={22} style={{ color: "var(--color-green)" }} />}
                title="let kivi hear you"
                body="kivi needs microphone access to turn your speech into text. audio never leaves your device unless you explicitly enable retention."
                granted={micGranted}
                onGrant={() => setMicGranted(true)}
                onContinue={() => setStep("accessibility")}
              />
            )}

            {step === "accessibility" && (
              <PermissionCard
                icon={<Accessibility size={22} style={{ color: "var(--color-green)" }} />}
                title="let kivi type into other apps"
                body="accessibility access lets kivi place your dictated text wherever your cursor is — slack, gmail, cursor, any app you use."
                granted={accessibilityGranted}
                onGrant={() => setAccessibilityGranted(true)}
                onContinue={() => setStep("language")}
              />
            )}

            {step === "language" && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-green-light)" }}
                  >
                    <Languages size={22} style={{ color: "var(--color-green)" }} />
                  </div>
                  <div>
                    <h1 className="text-2xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
                      what do you speak?
                    </h1>
                    <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                      pick every language you might dictate in. you can change this later.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["English", "Hindi", "Tamil", "Marathi", "Bengali", "Telugu", "Kannada", "Malayalam", "Gujarati", "Punjabi", "Urdu", "Odia"].map(lang => {
                    const selected = languages.includes(lang);
                    return (
                      <button
                        key={lang}
                        onClick={() => setLanguages(selected ? languages.filter(l => l !== lang) : [...languages, lang])}
                        className="px-3 py-1.5 rounded-full text-xs transition-all"
                        style={{
                          backgroundColor: selected ? "var(--color-green-light)" : "var(--color-cream)",
                          color: selected ? "var(--color-green-deep)" : "var(--color-ink-muted)",
                          border: `1px solid ${selected ? "var(--color-green)" : "var(--color-border)"}`,
                        }}
                      >
                        {selected && "✓ "}{lang}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setStep("demo")}
                  disabled={languages.length === 0}
                  className="w-full px-4 py-2.5 rounded-md font-medium text-sm disabled:opacity-40 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
                >
                  continue <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === "demo" && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-green-light)" }}
                  >
                    <Sparkles size={22} style={{ color: "var(--color-green)" }} />
                  </div>
                  <div>
                    <h1 className="text-2xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>
                      you are ready
                    </h1>
                    <p className="text-sm" style={{ color: "var(--color-ink-muted)" }}>
                      here is the one thing you need to remember.
                    </p>
                  </div>
                </div>
                <div
                  className="rounded-xl p-5 mb-5"
                  style={{ backgroundColor: "var(--color-green-light)" }}
                >
                  <div className="text-[11px] uppercase tracking-wider mb-3" style={{ color: "var(--color-green-deep)" }}>
                    the core loop
                  </div>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex items-center gap-2">
                      <Kbd>⌃</Kbd><Kbd>⌘</Kbd>
                      <span>opens a dictation session</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Kbd>⌃</Kbd><Kbd>⌘</Kbd>
                      <span>press again to commit the text</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Kbd>esc</Kbd>
                      <span>discards without typing</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={finish}
                  className="w-full px-4 py-2.5 rounded-md font-medium text-sm mb-2 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
                >
                  take the full tour
                </button>
                <button
                  onClick={finish}
                  className="w-full px-4 py-2 text-sm"
                  style={{ color: "var(--color-ink-muted)" }}
                >
                  skip and explore on my own
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function PermissionCard({ icon, title, body, granted, onGrant, onContinue }: {
  icon: React.ReactNode;
  title: string;
  body: string;
  granted: boolean;
  onGrant: () => void;
  onContinue: () => void;
}) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--color-green-light)" }}>
          {icon}
        </div>
        <div>
          <h1 className="text-2xl" style={{ fontFamily: "var(--font-serif)", fontWeight: 500 }}>{title}</h1>
        </div>
      </div>
      <p className="text-sm mb-6" style={{ color: "var(--color-ink-muted)" }}>{body}</p>
      {!granted ? (
        <button
          onClick={onGrant}
          className="w-full px-4 py-2.5 rounded-md font-medium text-sm"
          style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
        >
          grant permission
        </button>
      ) : (
        <>
          <div
            className="mb-3 flex items-center gap-2 px-3 py-2.5 rounded-md text-sm"
            style={{ backgroundColor: "var(--color-green-light)", color: "var(--color-green-deep)" }}
          >
            <Check size={14} /> granted
          </div>
          <button
            onClick={onContinue}
            className="w-full px-4 py-2.5 rounded-md font-medium text-sm flex items-center justify-center gap-2"
            style={{ backgroundColor: "var(--color-green)", color: "var(--color-cream)" }}
          >
            continue <ArrowRight size={14} />
          </button>
        </>
      )}
    </div>
  );
}
