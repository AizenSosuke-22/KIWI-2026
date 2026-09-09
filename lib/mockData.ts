// All the mock data that powers the prototype.
// Nothing here is fetched from a server — the app runs entirely off this.

export type WritingVoice = {
  id: string;
  name: string;
  description: string;
  example: string;
};

export type StyleApp = {
  id: string;
  name: string;
  icon: string; // emoji stand-in for app icon
};

export type Style = {
  id: string;
  name: string;
  description: string;
  apps: StyleApp[];
  voices: WritingVoice[];
  activeVoiceId: string;
  instructions: string;
  template?: { name: string; description: string } | null;
  saySample: string;
};

export type Transformation = {
  id: string;
  name: string;
  description: string;
  instruction: string;
  createdAt: string;
  lastUsed: string | null;
  useCount: number;
  isFavourite: boolean;
  isDefault?: boolean;
};

export type DictionaryEntry = {
  id: string;
  spoken: string;
  written: string;
  note?: string;
  alsoHeardAs?: string;
};

export type ShortcutEntry = {
  id: string;
  trigger: string;
  expansion: string;
};

export type TranslateProfile = {
  id: string;
  name: string;
  from: { code: string; label: string; sampleWord: string };
  to: { code: string; label: string };
  script: "native" | "roman";
  apps: StyleApp[];
};

export type HistoryTake = {
  id: string;
  app: StyleApp;
  text: string;
  timestamp: Date;
  style?: string;
  language?: string;
  translated?: boolean;
  words: number;
};

// -- Apps that Kivi knows about --
export const APPS: Record<string, StyleApp> = {
  slack: { id: "slack", name: "Slack", icon: "💬" },
  gmail: { id: "gmail", name: "Gmail", icon: "✉️" },
  outlook: { id: "outlook", name: "Outlook", icon: "📧" },
  claude: { id: "claude", name: "Claude", icon: "✳️" },
  chatgpt: { id: "chatgpt", name: "ChatGPT", icon: "◎" },
  cursor: { id: "cursor", name: "Cursor", icon: "⌘" },
  vscode: { id: "vscode", name: "VS Code", icon: "▶" },
  word: { id: "word", name: "Microsoft Word", icon: "📝" },
  docs: { id: "docs", name: "Google Docs", icon: "📄" },
  whatsapp: { id: "whatsapp", name: "WhatsApp", icon: "🟢" },
  messages: { id: "messages", name: "Messages", icon: "💭" },
  notion: { id: "notion", name: "Notion", icon: "◼" },
  linkedin: { id: "linkedin", name: "LinkedIn", icon: "in" },
  chrome: { id: "chrome", name: "Chrome", icon: "🌐" },
};

// -- Default seeded styles --
export const SEED_STYLES: Style[] = [
  {
    id: "email",
    name: "email",
    description: "composed, direct, and ready to send",
    apps: [APPS.gmail, APPS.outlook],
    voices: [
      {
        id: "professional",
        name: "professional",
        description: "conventional and to the point.",
        example: "Hi Maya,\n\nThe launch review moved to 3 tomorrow. Please send the final numbers by noon.\n\nBest,\nPriyadarshi",
      },
      {
        id: "friendly",
        name: "friendly",
        description: "the same note, with warmth.",
        example: "Hi Maya,\n\nThe launch review moved to 3 tomorrow. Please send the final numbers by noon.\n\nThanks,\nPriyadarshi",
      },
      {
        id: "formal",
        name: "formal",
        description: "highest formality, full forms.",
        example: "Dear Maya,\n\nThe launch review has been moved to 3 PM tomorrow. Please send the final numbers by noon.\n\nKind regards,\nPriyadarshi",
      },
    ],
    activeVoiceId: "professional",
    instructions: "",
    template: null,
    saySample: "email Maya say the launch review moved to three tomorrow please send the final numbers by noon sign off Priyadarshi",
  },
  {
    id: "work-messaging",
    name: "work messaging",
    description: "voice and formatting for slack, teams, and other work chat.",
    apps: [APPS.slack],
    voices: [
      {
        id: "clear",
        name: "clear",
        description: "clean sentences, shorthand kept.",
        example: "Hey, FYI — I do not know if the launch review can stay at 3 tomorrow. Please check the final numbers by noon and let me know.",
      },
      {
        id: "casual",
        name: "casual",
        description: "lowercase workplace shorthand.",
        example: "hey FYI idk if the launch review can stay at 3 tomorrow. please check the final numbers by noon and let me know",
      },
      {
        id: "formal",
        name: "formal",
        description: "everything spelled out, properly.",
        example: "Hey, for your information, I do not know if the launch review can stay at 3 tomorrow. Please check the final numbers by noon and let me know.",
      },
    ],
    activeVoiceId: "formal",
    instructions: "Refine the text to be cleaner, more formal, and better organized.",
    template: null,
    saySample: "hey for your information I do not know if the launch review can stay at three tomorrow please check the final numbers by noon and let me know",
  },
  {
    id: "personal-messaging",
    name: "personal messaging",
    description: "natural, easy, and unmistakably you",
    apps: [APPS.whatsapp, APPS.messages],
    voices: [
      {
        id: "casual",
        name: "casual",
        description: "how you actually talk to friends.",
        example: "hey! running like 10 min late, save me a chair 🙏",
      },
      {
        id: "warm",
        name: "warm",
        description: "casual but complete sentences.",
        example: "Hey! I'm running about 10 minutes late — could you save me a chair?",
      },
      {
        id: "quick",
        name: "quick",
        description: "shortest possible, punctuation optional.",
        example: "10 min late save me a chair",
      },
    ],
    activeVoiceId: "casual",
    instructions: "",
    template: null,
    saySample: "hey running like ten minutes late save me a chair",
  },
  {
    id: "developer",
    name: "developer",
    description: "terse, and your code stays code",
    apps: [APPS.cursor, APPS.vscode, APPS.claude],
    voices: [
      {
        id: "terse",
        name: "terse",
        description: "no fluff. code terms preserved exactly.",
        example: "fix the useEffect in Header.tsx — it's causing a re-render loop when props.user changes.",
      },
      {
        id: "descriptive",
        name: "descriptive",
        description: "explains intent alongside the ask.",
        example: "There's a re-render loop in Header.tsx caused by the useEffect. It triggers whenever props.user changes. Please fix.",
      },
      {
        id: "structured",
        name: "structured",
        description: "issue → cause → ask, in that order.",
        example: "Issue: infinite re-renders in Header.tsx.\nCause: useEffect triggers on props.user change.\nAsk: refactor the effect to break the loop.",
      },
    ],
    activeVoiceId: "terse",
    instructions: "Use exact code terms. No corporate fluff.",
    template: null,
    saySample: "fix the use effect in header dot tsx it's causing a rerender loop when props dot user changes",
  },
];

// -- Default seeded improv transformations --
export const SEED_TRANSFORMATIONS: Transformation[] = [
  {
    id: "make-formal",
    name: "make it more formal",
    description: "raise the register without changing the meaning.",
    instruction: "Rewrite the selected text in a more formal register. Preserve meaning exactly. Use complete sentences, spell out contractions, and remove casual phrasing.",
    createdAt: "2026-08-01",
    lastUsed: "2026-09-08",
    useCount: 47,
    isFavourite: false,
    isDefault: true,
  },
  {
    id: "bullet-points",
    name: "convert to bullet points",
    description: "reorganise flowing prose into a scannable list.",
    instruction: "Reformat the selected text as a bulleted list. Preserve every point. Group related items. Use short, parallel bullets.",
    createdAt: "2026-08-01",
    lastUsed: "2026-09-07",
    useCount: 31,
    isFavourite: true,
    isDefault: true,
  },
  {
    id: "fix-grammar",
    name: "fix grammar and spelling",
    description: "quiet cleanup. no rewording.",
    instruction: "Fix grammar, spelling, and punctuation errors in the selected text. Do not change wording, tone, or structure.",
    createdAt: "2026-08-01",
    lastUsed: "2026-09-09",
    useCount: 89,
    isFavourite: false,
    isDefault: true,
  },
  {
    id: "make-shorter",
    name: "make it shorter",
    description: "cut length by roughly half.",
    instruction: "Reduce the selected text to roughly half its length. Keep the most important points. Cut adjectives and hedging first.",
    createdAt: "2026-08-15",
    lastUsed: "2026-09-05",
    useCount: 18,
    isFavourite: false,
  },
  {
    id: "translate-to-hindi",
    name: "translate to hindi",
    description: "same meaning, hindi in devanagari.",
    instruction: "Translate the selected text to Hindi. Use Devanagari script. Preserve meaning; adjust idioms naturally.",
    createdAt: "2026-08-22",
    lastUsed: "2026-08-30",
    useCount: 7,
    isFavourite: false,
  },
];

// -- Dictionary seed --
export const SEED_DICTIONARY: DictionaryEntry[] = [
  {
    id: "1",
    spoken: "aditya shatriya",
    written: "Aaditya Kshatriya",
    note: "use in casual/personal messaging only, not in professional",
    alsoHeardAs: "emcee",
  },
  {
    id: "2",
    spoken: "iit madras",
    written: "IIT Madras",
  },
  {
    id: "3",
    spoken: "sarvam",
    written: "Sarvam",
    note: "always capitalised",
  },
  {
    id: "4",
    spoken: "kivi",
    written: "Kivi",
    note: "always capitalised, never all caps",
  },
  {
    id: "5",
    spoken: "hinglish",
    written: "Hinglish",
  },
];

// -- Shortcuts seed --
export const SEED_SHORTCUTS: ShortcutEntry[] = [
  {
    id: "1",
    trigger: "my sign-off",
    expansion: "Warm regards,\nPriyadarshi Ubale\nSarvam AI",
  },
  {
    id: "2",
    trigger: "meeting agenda",
    expansion: "1. Recap\n2. Blockers\n3. Next steps\n4. Owner assignments",
  },
  {
    id: "3",
    trigger: "email intro",
    expansion: "Hope this finds you well. I wanted to reach out about",
  },
];

// -- Translate profiles seed --
export const SEED_TRANSLATE_PROFILES: TranslateProfile[] = [
  {
    id: "hindi-to-english",
    name: "hindi to english",
    from: { code: "hi", label: "Hindi", sampleWord: "नमस्ते" },
    to: { code: "en", label: "English" },
    script: "roman",
    apps: [APPS.gmail, APPS.slack, APPS.claude],
  },
  {
    id: "english-to-hindi-native",
    name: "english to hindi (devanagari)",
    from: { code: "en", label: "English", sampleWord: "hello" },
    to: { code: "hi", label: "Hindi" },
    script: "native",
    apps: [APPS.whatsapp, APPS.messages],
  },
  {
    id: "tamil-to-english",
    name: "tamil to english",
    from: { code: "ta", label: "Tamil", sampleWord: "வணக்கம்" },
    to: { code: "en", label: "English" },
    script: "roman",
    apps: [APPS.gmail],
  },
];

// -- History seed --
export const SEED_HISTORY: HistoryTake[] = [
  {
    id: "h1",
    app: APPS.slack,
    text: "yeah I'll ship the auth fix by end of day today. Blocker was the token refresh race condition — it's sorted now.",
    timestamp: new Date(Date.now() - 1000 * 60 * 12),
    style: "work messaging",
    language: "english",
    words: 24,
  },
  {
    id: "h2",
    app: APPS.claude,
    text: "help me draft a product vision for a dictation app that specifically targets Indian users who speak fluently but write English with difficulty. Focus on the bridging role.",
    timestamp: new Date(Date.now() - 1000 * 60 * 43),
    style: "developer",
    language: "english",
    words: 32,
  },
  {
    id: "h3",
    app: APPS.whatsapp,
    text: "aaj shaam ko free ho? coffee pe milte hain, saade paanch bajay usual jagah",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    style: "personal messaging",
    language: "hindi (roman)",
    words: 15,
  },
  {
    id: "h4",
    app: APPS.gmail,
    text: "Dear Prof. Kumar, following up on our discussion regarding the placement schedule for the next batch. Have attached the finalised list per our conversation.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    style: "email",
    language: "english",
    words: 26,
  },
  {
    id: "h5",
    app: APPS.gmail,
    text: "Dear Sir, I would like to formally submit my leave application for the period of 15th to 20th September.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    style: "email",
    language: "hindi → english",
    translated: true,
    words: 20,
  },
  {
    id: "h6",
    app: APPS.cursor,
    text: "refactor the AuthProvider component — extract the token refresh logic into a separate hook called useAuthRefresh. keep the same public API.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 7),
    style: "developer",
    language: "english",
    words: 23,
  },
  {
    id: "h7",
    app: APPS.slack,
    text: "quick standup update: finished the sidebar shell, moved to the styles editor. no blockers.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22),
    style: "work messaging",
    language: "english",
    words: 14,
  },
  {
    id: "h8",
    app: APPS.notion,
    text: "Meeting notes from placement committee, 8th September. Discussed the pending offer rollout for the CS batch. Action items assigned to team leads.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25),
    style: "email",
    language: "english",
    words: 24,
  },
  {
    id: "h9",
    app: APPS.chatgpt,
    text: "summarize the attached research paper on Indic ASR models in three bullet points, focus on the architecture and the training data",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28),
    style: "developer",
    language: "english",
    words: 22,
  },
  {
    id: "h10",
    app: APPS.linkedin,
    text: "Excited to share that I have completed the internship assignment for the Product UI/UX role at Sarvam. Grateful for the opportunity to think deeply about designing for the Indian market.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30),
    style: "email",
    language: "english",
    words: 32,
  },
];

// -- User profile stats (mock) --
export const USER_STATS = {
  name: "Priyadarshi Ubale",
  email: "me23b084@smail.iitm.ac.in",
  plan: "Free (Alpha)",
  memberSince: "August 2026",
  totalWords: 1240, // used for pattern unlock calculation
  totalSessions: 87,
  currentStreak: 4,
  patternUnlockTarget: 5000,
};

// -- Facts for the home screen rotating card --
export const FACTS = [
  {
    category: "india",
    text: "India has over 121 languages spoken by at least 10,000 people each. Only 22 are recognised in the Constitution.",
  },
  {
    category: "india",
    text: "Fewer than 10% of Indian households own a computer or laptop, but over 95% own a mobile phone.",
  },
  {
    category: "india",
    text: "Roughly 44% of India's population is bilingual. About 12% is trilingual — one of the highest rates in the world.",
  },
  {
    category: "birds",
    text: "Kiwis are the only birds in the world with nostrils at the tip of their beak.",
  },
  {
    category: "birds",
    text: "A kiwi bird lays an egg roughly 20% of its body weight — proportionally the largest egg of any bird.",
  },
  {
    category: "ai",
    text: "The average person speaks at 150 words per minute but types at 40. Dictation closes about two-thirds of that gap.",
  },
  {
    category: "ai",
    text: "The first speech recognition system, Audrey by Bell Labs (1952), could recognise the digits 0-9 with 90% accuracy — for one specific speaker.",
  },
];
