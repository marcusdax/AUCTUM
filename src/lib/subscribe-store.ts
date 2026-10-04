import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PlanId } from "./pricing";

export type SeatRequest = {
  id: string;
  name: string;
  email: string;
  planId: PlanId;
  place: string;
  at: string;
};

type SubscribeState = {
  requests: SeatRequest[];
  register: (input: Omit<SeatRequest, "id" | "at">) => SeatRequest;
  markHydrated: () => void;
};

export const useSubscribe = create<SubscribeState>()(
  persist(
    (set, get) => ({
      requests: [],
      register: (input) => {
        const row: SeatRequest = { ...input, id: `seat-${Date.now()}`, at: new Date().toISOString() };
        set({ requests: [row, ...get().requests] });
        return row;
      },
      markHydrated: () => set({}),
    }),
    {
      name: "auctum-subscribe-v1",
      skipHydration: true,
      partialize: (state) => ({ requests: state.requests }),
    },
  ),
);
