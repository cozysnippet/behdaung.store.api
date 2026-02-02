// src/types/index.ts
export interface User {
  id: string;
  username: string;
  email: string;
}

// Global Cloudflare Bindings (D1, KV, etc.)
export type Bindings = {
  GOOGLE_CLIENT_ID: string;
  JWT_SECRET: string;
}