# 🚬 Teller — Tobacco Countdown Tracker

A colorful, single-page **Next.js** app to track your tobacco reduction journey. Cross off rolls as you use them — progress saves automatically in your browser. ✨

---

## 📋 Program overview

| Phase | Days | Roll budget |
|-------|------|-------------|
| 1️⃣    | 7    | 7 rolls     |
| 2️⃣    | 4    | 4 rolls     |
| 3️⃣    | 4    | 2 rolls     |

**Total:** 15 days · 13 rolls max 🎯

Each phase is a **total budget** — use your rolls anytime within that phase's day window.

---

## ✨ Features

- ✅ **Cross off rolls** — tap to mark used, tap again to undo
- 💾 **Auto-save** — progress stored in `localStorage` (survives refresh)
- 🌈 **Colorful gradient UI** — animated background with glass-style cards
- 📱 **Responsive** — works great on phone and desktop
- 🔄 **Reset** — clear all progress with confirmation

---

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🌐

---

## 🎮 How to use

1. **Tap a roll** 🚬 to mark it as used (crossed off)
2. **Tap again** ↩️ to undo
3. **Reset progress** 🗑️ clears all saved data (with confirmation)

Progress is saved under the key `teller-used-rolls` in your browser.

---

## 🏗️ Build for production

```bash
npm run build
npm start
```

---

## 📄 License

MIT © [raimonvibe](./LICENSE)

Made with 💜 by **raimonvibe**
