# Running the Kivi prototype locally

## Requirements
- **Node.js** version 20 or newer. You have v26.8.1, which is fine.
- **npm** (comes with Node.js).

## Steps

### 1. Unzip and open the folder

Unzip `kivi-prototype.zip` wherever you keep your projects. You will get a folder named `kivi-prototype`.

### 2. Open a terminal in that folder

**Windows:**
- Open the `kivi-prototype` folder in File Explorer.
- Click the address bar at the top, type `cmd`, press Enter.
- A Command Prompt window opens, already inside the folder.

Or open Command Prompt normally and run:
```
cd "path\to\kivi-prototype"
```

### 3. Install dependencies

```
npm install
```

This downloads all the libraries (Next.js, React, Tailwind, Framer Motion, Lucide) into a `node_modules` folder. Takes 30-60 seconds. You may see some warnings — warnings are fine, errors are not. If you see "npm ERR!" tell me what it says.

### 4. Start the development server

```
npm run dev
```

You should see output like:
```
▲ Next.js 15.x.x
- Local:        http://localhost:3000
- ready in 1.2s
```

### 5. Open the app

Open your browser to **http://localhost:3000**.

### 6. Try things

- Click through every item in the left sidebar to see each page.
- Press `Ctrl + Cmd` anywhere in the app to trigger a dictation overlay. Press again to commit (simulated).
- Press `Ctrl + Alt + I` to open Improv. Pick one of the three quick moves.
- Press `Ctrl + Shift + T` to open Translate.
- Press `Esc` to discard any overlay.
- Click on a Style (e.g. "email") to open the full editor with the three writing voices.
- Click on the Kivi bird in the top-right of the Record page.

### 7. See the onboarding

Visit **http://localhost:3000/onboarding** to see the 5-step first-run flow.

## To stop the server

Go back to the terminal and press `Ctrl + C`.

## To restart

Just run `npm run dev` again.

## If something goes wrong

- **"port 3000 already in use"** — another app is using that port. Either stop that app, or Next.js will offer to use port 3001 instead.
- **"cannot find module 'next'"** — dependencies didn't install. Run `npm install` again.
- **The browser shows a Next.js error page** — copy the exact error text and send it to me.
