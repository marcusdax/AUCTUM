import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LngLat } from "./geo";

export type PlotDraft = {
  accountId: string;
  vertices: LngLat[];
  savedAt: string;
};

type PlotState = {
  plots: PlotDraft[];
  save: (accountId: string, vertices: LngLat[]) => void;
  clear: (accountId: string) => void;
  markHydrated: () => void;
};

export const usePlots = create<PlotState>()(
  persist(
    (set) => ({
      plots: [],
      save: (accountId, vertices) =>
        set((state) => ({
          plots: [
            { accountId, vertices, savedAt: new Date().toISOString() },
            ...state.plots.filter((plot) => plot.accountId !== accountId),
          ],
        })),
      clear: (accountId) => set((state) => ({ plots: state.plots.filter((plot) => plot.accountId !== accountId) })),
      markHydrated: () => set({}),
    }),
    {
      name: "auctum-plots-v1",
      skipHydration: true,
      partialize: (state) => ({ plots: state.plots }),
    },
  ),
);

export function plotFor(plots: PlotDraft[], accountId: string) {
  return plots.find((plot) => plot.accountId === accountId);
}
