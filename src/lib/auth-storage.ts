import type { AuthUser } from "@/types/api";

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

const STORAGE_KEY = "mila-raffo-admin-session";

export const authStorage = {
  get(): SessionTokens | null {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as SessionTokens;
    } catch {
      return null;
    }
  },
  set(session: SessionTokens) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  },
  clear() {
    window.localStorage.removeItem(STORAGE_KEY);
  },
};
