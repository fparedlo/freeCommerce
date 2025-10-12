/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALL_PRODUCTS: string;
  readonly VITE_TOP_PRODUCTS: string;
  readonly VITE_SEARCH_PRODUCTS: string;
  readonly VITE_CATEGORIES: string;
  readonly VITE_CATEGORY_BASE: string;
  readonly VITE_AUTH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
