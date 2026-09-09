"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import DictationOverlay from "./overlays/DictationOverlay";
import ImprovOverlay from "./overlays/ImprovOverlay";
import TranslateOverlay from "./overlays/TranslateOverlay";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOnboarding = pathname.startsWith("/onboarding");
  const [mounted, setMounted] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(true);

  // Check localStorage on mount for onboarding completion
  useEffect(() => {
    setMounted(true);
    const done = typeof window !== "undefined" ? localStorage.getItem("kivi-onboarded") : "true";
    setHasCompletedOnboarding(done === "true");
  }, []);

  if (!mounted) {
    // Prevent hydration mismatch flash
    return <div style={{ minHeight: "100vh" }} />;
  }

  if (isOnboarding) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <DictationOverlay />
      <ImprovOverlay />
      <TranslateOverlay />
    </>
  );
}
