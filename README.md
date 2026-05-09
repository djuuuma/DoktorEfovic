# Ordinacija Smile

Marketing website for **Ordinacija Smile** — built with React, Vite, TypeScript, Tailwind CSS, and Three.js. Gemini-powered features use the Google GenAI SDK when configured.

## Repository

Source code: **[github.com/djuuuma/DoktorEfovic](https://github.com/djuuuma/DoktorEfovic)**

From this machine, if `origin` is not set yet:

```bash
git remote add origin https://github.com/djuuuma/DoktorEfovic.git
git push -u origin main
```

- **Clone (HTTPS):** `git clone https://github.com/djuuuma/DoktorEfovic.git`
- **Clone (SSH):** `git clone git@github.com:djuuuma/DoktorEfovic.git`

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Environment variables: copy [.env.example](.env.example) to `.env.local` and set your keys (at minimum `GEMINI_API_KEY` if you use Gemini features). Never commit `.env.local` or real secrets.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   The app is configured to listen on port **5173** (see `package.json`).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Dev server (Vite)        |
| `npm run build`| Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Typecheck (`tsc --noEmit`) |

## Optional: Google AI Studio

If you use [Google AI Studio](https://ai.google.dev/) to run or deploy the app, you can open the linked project when applicable: https://ai.studio/apps/b8578587-8f0b-4f7e-adbc-520286d072a2

Secrets there are separate from your local `.env.local` file.
