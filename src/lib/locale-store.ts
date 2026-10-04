import { create } from "zustand";
import { persist } from "zustand/middleware";
import { guessLocale, translate, type LocaleId, type MessageKey } from "./i18n";

type LocaleState = {
  locale: LocaleId;
  setLocale: (locale: LocaleId) => void;
  markHydrated: () => void;
};

export const useLocale = create<LocaleState>()(
  persist(
    (set) => ({
      locale: guessLocale(typeof navigator === "undefined" ? undefined : navigator.language),
      setLocale: (locale) => set({ locale }),
      markHydrated: () => set({}),
    }),
    {
      name: "auctum-locale-v1",
      skipHydration: true,
      partialize: (s) => ({ locale: s.locale }),
    },
  ),
);

export function useT() {
  const locale = useLocale((s) => s.locale);
  return (key: MessageKey, vars?: Record<string, string | number>) => translate(locale, key, vars);
}
