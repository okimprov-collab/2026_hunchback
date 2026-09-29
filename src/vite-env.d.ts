/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TICKETING_URL?: string;
  readonly VITE_GOOGLE_SCRIPT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
