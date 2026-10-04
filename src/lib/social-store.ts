import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Reply = { id: string; storyId: string; body: string; at: string };

type SocialState = {
  keeps: string[];
  replies: Reply[];
  toggleKeep: (storyId: string) => void;
  reply: (storyId: string, body: string) => void;
  markHydrated: () => void;
};

export const useSocial = create<SocialState>()(
  persist(
    (set, get) => ({
      keeps: [],
      replies: [],
      toggleKeep: (storyId) =>
        set({
          keeps: get().keeps.includes(storyId) ? get().keeps.filter((id) => id !== storyId) : [storyId, ...get().keeps],
        }),
      reply: (storyId, body) =>
        set({
          replies: [{ id: `rp-${Date.now()}`, storyId, body: body.trim(), at: new Date().toISOString() }, ...get().replies],
        }),
      markHydrated: () => set({}),
    }),
    { name: "auctum-social-v1", skipHydration: true, partialize: (s) => ({ keeps: s.keeps, replies: s.replies }) },
  ),
);
