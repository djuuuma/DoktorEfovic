/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONCIERGE_FORM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
