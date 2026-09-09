"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import {
  SEED_STYLES,
  SEED_TRANSFORMATIONS,
  SEED_DICTIONARY,
  SEED_SHORTCUTS,
  SEED_TRANSLATE_PROFILES,
  SEED_HISTORY,
  Style,
  Transformation,
  DictionaryEntry,
  ShortcutEntry,
  TranslateProfile,
  HistoryTake,
} from "./mockData";

type OverlayState =
  | { kind: "none" }
  | { kind: "dictation"; targetApp: string; styleId: string }
  | { kind: "improv"; selectedText: string }
  | { kind: "translate"; targetApp: string; profileId: string };

type KiviContextValue = {
  styles: Style[];
  transformations: Transformation[];
  dictionary: DictionaryEntry[];
  shortcuts: ShortcutEntry[];
  translateProfiles: TranslateProfile[];
  history: HistoryTake[];
  overlay: OverlayState;

  // actions
  updateStyle: (id: string, updater: (s: Style) => Style) => void;
  addTransformation: (t: Omit<Transformation, "id" | "createdAt" | "lastUsed" | "useCount" | "isFavourite">) => void;
  updateTransformation: (id: string, updater: (t: Transformation) => Transformation) => void;
  deleteTransformation: (id: string) => void;
  useTransformation: (id: string) => void;
  addDictionaryEntry: (e: Omit<DictionaryEntry, "id">) => void;
  deleteDictionaryEntry: (id: string) => void;
  addShortcut: (e: Omit<ShortcutEntry, "id">) => void;
  deleteShortcut: (id: string) => void;
  addTranslateProfile: (p: Omit<TranslateProfile, "id">) => void;
  updateTranslateProfile: (id: string, updater: (p: TranslateProfile) => TranslateProfile) => void;
  deleteTranslateProfile: (id: string) => void;
  addHistoryTake: (t: Omit<HistoryTake, "id" | "timestamp">) => void;
  openOverlay: (state: OverlayState) => void;
  closeOverlay: () => void;
};

const KiviContext = createContext<KiviContextValue | null>(null);

export function KiviProvider({ children }: { children: ReactNode }) {
  const [styles, setStyles] = useState<Style[]>(SEED_STYLES);
  const [transformations, setTransformations] = useState<Transformation[]>(SEED_TRANSFORMATIONS);
  const [dictionary, setDictionary] = useState<DictionaryEntry[]>(SEED_DICTIONARY);
  const [shortcuts, setShortcuts] = useState<ShortcutEntry[]>(SEED_SHORTCUTS);
  const [translateProfiles, setTranslateProfiles] = useState<TranslateProfile[]>(SEED_TRANSLATE_PROFILES);
  const [history, setHistory] = useState<HistoryTake[]>(SEED_HISTORY);
  const [overlay, setOverlay] = useState<OverlayState>({ kind: "none" });

  const updateStyle = useCallback((id: string, updater: (s: Style) => Style) => {
    setStyles(prev => prev.map(s => s.id === id ? updater(s) : s));
  }, []);

  const addTransformation = useCallback((t: Omit<Transformation, "id" | "createdAt" | "lastUsed" | "useCount" | "isFavourite">) => {
    setTransformations(prev => [
      ...prev,
      {
        ...t,
        id: `t-${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
        lastUsed: null,
        useCount: 0,
        isFavourite: false,
      },
    ]);
  }, []);

  const updateTransformation = useCallback((id: string, updater: (t: Transformation) => Transformation) => {
    setTransformations(prev => prev.map(t => t.id === id ? updater(t) : t));
  }, []);

  const deleteTransformation = useCallback((id: string) => {
    setTransformations(prev => prev.filter(t => t.id !== id));
  }, []);

  const useTransformation = useCallback((id: string) => {
    setTransformations(prev => prev.map(t =>
      t.id === id
        ? { ...t, useCount: t.useCount + 1, lastUsed: new Date().toISOString().slice(0, 10) }
        : t
    ));
  }, []);

  const addDictionaryEntry = useCallback((e: Omit<DictionaryEntry, "id">) => {
    setDictionary(prev => [{ ...e, id: `d-${Date.now()}` }, ...prev]);
  }, []);

  const deleteDictionaryEntry = useCallback((id: string) => {
    setDictionary(prev => prev.filter(d => d.id !== id));
  }, []);

  const addShortcut = useCallback((e: Omit<ShortcutEntry, "id">) => {
    setShortcuts(prev => [{ ...e, id: `s-${Date.now()}` }, ...prev]);
  }, []);

  const deleteShortcut = useCallback((id: string) => {
    setShortcuts(prev => prev.filter(s => s.id !== id));
  }, []);

  const addTranslateProfile = useCallback((p: Omit<TranslateProfile, "id">) => {
    setTranslateProfiles(prev => [...prev, { ...p, id: `tp-${Date.now()}` }]);
  }, []);

  const updateTranslateProfile = useCallback((id: string, updater: (p: TranslateProfile) => TranslateProfile) => {
    setTranslateProfiles(prev => prev.map(p => p.id === id ? updater(p) : p));
  }, []);

  const deleteTranslateProfile = useCallback((id: string) => {
    setTranslateProfiles(prev => prev.filter(p => p.id !== id));
  }, []);

  const addHistoryTake = useCallback((t: Omit<HistoryTake, "id" | "timestamp">) => {
    setHistory(prev => [
      { ...t, id: `h-${Date.now()}`, timestamp: new Date() },
      ...prev,
    ]);
  }, []);

  const openOverlay = useCallback((state: OverlayState) => setOverlay(state), []);
  const closeOverlay = useCallback(() => setOverlay({ kind: "none" }), []);

  // Global escape-key handler for closing overlays
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && overlay.kind !== "none") {
        setOverlay({ kind: "none" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [overlay.kind]);

  const value: KiviContextValue = {
    styles,
    transformations,
    dictionary,
    shortcuts,
    translateProfiles,
    history,
    overlay,
    updateStyle,
    addTransformation,
    updateTransformation,
    deleteTransformation,
    useTransformation,
    addDictionaryEntry,
    deleteDictionaryEntry,
    addShortcut,
    deleteShortcut,
    addTranslateProfile,
    updateTranslateProfile,
    deleteTranslateProfile,
    addHistoryTake,
    openOverlay,
    closeOverlay,
  };

  return <KiviContext.Provider value={value}>{children}</KiviContext.Provider>;
}

export function useKivi() {
  const ctx = useContext(KiviContext);
  if (!ctx) throw new Error("useKivi must be used inside <KiviProvider>");
  return ctx;
}
