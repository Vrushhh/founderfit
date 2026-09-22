import type { Answers } from "./types";

const KEY = "nextmove.answers";

export const session = {
  load(): Answers {
    if (typeof window === "undefined") return {};
    try {
      const raw = window.sessionStorage.getItem(KEY);
      return raw ? (JSON.parse(raw) as Answers) : {};
    } catch {
      return {};
    }
  },
  save(answers: Answers) {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(KEY, JSON.stringify(answers));
  },
  clear() {
    if (typeof window !== "undefined") window.sessionStorage.removeItem(KEY);
  },
};
