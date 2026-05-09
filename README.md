# Ordinacija Smile

Public website for Ordinacija Smile, a dental practice. The experience is a single-page layout with a WebGL hero, scroll-driven storytelling sections (studio, services, heritage, and contact-style blocks), motion transitions, and a custom cursor—aimed at a calm, premium feel rather than a typical clinical template.

**Stack:** React 19, Vite, TypeScript, Tailwind CSS v4, Three.js, and Motion. Optional Gemini features use `@google/genai` when API keys are configured.

## Local development

Requires [Node.js](https://nodejs.org/) (LTS).

```bash
npm install
```


```bash
npm run dev
```

The dev server runs on port **5173**.

### Contact form (`Concierge`)

Point **`VITE_CONCIERGE_FORM_URL`** (in `.env`) at an HTTPS endpoint that accepts **`POST`** with **`application/x-www-form-urlencoded`** fields: **`name`**, **`phone`**, **`service`** (slug), **`service_label`**, **`subject`**. Compatible with typical Formspree-style handlers and Zapier/Make webhooks (configure the hook to read form fields). The site must be allowed by that server’s **CORS** policy for browser submissions.

| Command | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Typecheck with TypeScript (`tsc --noEmit`) |
