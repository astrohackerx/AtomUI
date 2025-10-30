/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOLANA_NETWORK: string;
  readonly VITE_PROGRAM_ID: string;
  readonly VITE_ATOM_MINT: string;
  readonly VITE_MIN_CREATE_BURN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
