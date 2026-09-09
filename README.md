# Kivi Prototype

A UI/UX redesign of Kivi by Sarvam, built for the Product UI/UX & Design assignment.

## What is this

Kivi is a Mac dictation and language-transformation app for Indian users who speak fluently but struggle to write in English or formal text. This prototype implements the complete redesign, including a reimagined Styles feature, a new Translate feature, a new Improv feature, and a Pattern insight feature.

**Positioning statement:** see `POSITIONING.md`
**Product vision:** see `VISION.md`

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000

For step-by-step instructions, see `RUN.md`.

## What is in the prototype

### Navigation (left sidebar)
- **Record** — the home screen. Try dictation, improv, and translate. Rotating fact card. Hotkey cheatsheet. Progress toward Pattern unlock.
- **History** — searchable log of every dictation take, grouped by day.
- **Pattern** — currently locked (unlocks at 5,000 words). Click through to preview what unlocked Pattern looks like — observations by default, improvement suggestions opt-in.
- **Dictionary** — words Kivi never misspells. Add, edit, delete.
- **Shortcuts** — expand short phrases into full blocks.
- **Styles** — the star of the redesign. Rich per-app style bundles with apps, writing voice, template upload, and free-form instructions. Click any style to open the full editor.
- **Translate** — new top-level feature. Saved profiles for language pairs and scripts.
- **Improv** — new top-level feature. On-demand transformations of any selected text.
- **Profile** — account, plan, usage stats.
- **Settings** — full multi-section settings (general, language & script, the circle, system, plan & billing, and more).

### Global hotkeys (work anywhere in the app)
- `Ctrl + Cmd` — start a dictation session. Press again to commit.
- `Ctrl + Alt + I` — open Improv on selected text.
- `Ctrl + Shift + T` — start a Translate session.
- `Esc` — discard any active overlay.

### The overlays
- **Dictation overlay:** appears at the top of the screen when a session opens. Radial waveform inside a green circle, active app and style shown below, real timer.
- **Improv overlay:** shows three quick-transformation slots (recent, most-used, favourite) plus a `+` for the full library.
- **Translate overlay:** gradient circle showing the language pair, with source and target displayed.

### Onboarding
Visit `/onboarding` to see the 5-step first-run experience: sign in with email + OTP, mic permission, accessibility permission, language selection, and the interactive demo intro.

## Tech stack

- **Next.js 15** (App Router) with React 19 and TypeScript
- **Tailwind CSS v4** for styling
- **Framer Motion** for all animations and transitions
- **Lucide React** for icons
- **Fraunces** (serif) + **Inter** (sans) via next/font/google

## Design system

- Warm cream base (`#F5F1E8`), muted greens, terracotta spice, warm brown-black ink. No pure white or pure black anywhere.
- Fraunces for titles, Inter for body.
- Rounded corners on every card and container.
- All animations 100-400ms; slower moments (bird flap, page transitions) up to 800ms.
- Light mode only for this prototype; dark mode is a defensible fast-follow.

## What is simulated

Per the brief ("The prototype may use mocked data and simulated product behaviour"), the following are simulated rather than real:
- Speech recognition. Pressing the hotkey opens the overlay and simulates the listening → polishing → committing flow.
- Improv transformations. Clicking a transformation simulates the application.
- Translate output. Pre-scripted sample translations per profile.
- All data (styles, transformations, dictionary entries, history) is in-memory. Refreshing the browser resets to the seeded state.

The interactions themselves are real: hotkey handling, state management, animations, and every UI flow work end-to-end.

## Notes for the reviewer

The four differentiating bets versus Wispr Flow and the other established dictation tools:
1. **Indic dialect and language accuracy** (positioning)
2. **Speak-to-formal-English Translate** (vision)
3. **Pattern insight for language improvement** (vision)
4. **The fluent-speaker, weak-writer thesis** (positioning)

Dictionary, Shortcuts, Improv, and Styles are table-stakes for this category. Kivi executes them well, but they are not the differentiators.

The Styles page is where the redesign brief specifically points. See `/styles` and click any style (e.g. `/styles/email`) to see the depth: apps, three-voice preview with live "you say → Kivi types" comparison, template upload with an honest v1 disclosure, and free-form instructions.
