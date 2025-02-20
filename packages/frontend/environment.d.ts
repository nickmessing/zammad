/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  // eslint-disable-next-line import/no-default-export
  export default component
}

// eslint-disable-next-line unicorn/prevent-abbreviations
interface ImportMetaEnv {
  readonly VITE_APOLLO_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
