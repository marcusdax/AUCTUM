import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Audience = "drinker" | "farmer" | "business" | "operator";
export type Tier = "open" | "desk";

export const AUDIENCES: { id: Audience; title: string; line: string }[] = [
  { id: "drinker", title: "I drink it", line: "Read the bag. The name, the price, and the cup are open." },
  { id: "farmer", title: "I grow it", line: "Your lot, your name, and the card you can take to the tank." },
  { id: "business", title: "I buy or sell it", line: "Sample, offer, and a file a café can be handed." },
  { id: "operator", title: "I work the desk", line: "The queue, the accept, and the settlement." },
];

type Door = "ledger" | "space" | "learn" | "scan" | "craft";

const LINES: Record<Door, Record<Audience, string>> = {
  ledger: {
    drinker: "Open shows you the name, the cup, and the price. Locking a lot is desk work.",
    farmer: "Open shows your lot and who is asking. A sample request and a lock are the desk.",
    business: "Open is the sheet. The desk is where an offer becomes a lock that does not move.",
    operator: "The book. Availability, trust, and the price on the lot.",
  },
  space: {
    drinker: "The person who grew it, and the story the mark on the bag opens. This room is free to read.",
    farmer: "A room in your name. The story has to open the lot, or it does not ship.",
    business: "Proof you can hand to a café. A story without a file is not proof.",
    operator: "Spaces stay attached to people. The ledger does not get overwritten by a caption.",
  },
  learn: {
    drinker: "How to read a score. The practical that lets someone sign a sheet is desk work.",
    farmer: "What you may sign, and what is still blocked, with the remedy in the same breath.",
    business: "A claim on a bag is cleared by a credential, not by marketing.",
    operator: "Readiness. What is held, what expires, and the shortest path back to allowed.",
  },
  scan: {
    drinker: "You can watch a page become a proposal. Accepting it onto the ledger is the desk.",
    farmer: "Bring the paper. Open can see the reading. A person with standing accepts it.",
    business: "Contracts and cupping sheets enter as proposals. The accept is what the subscription is for.",
    operator: "Capture, contrast, propose. A credentialed person accepts. Nothing writes itself.",
  },
  craft: {
    drinker: "Point at a taste. See the method. The recipe is not on this sheet, and it is not for sale yet.",
    farmer: "Nine cards for the tank, with the number that means done. The packet is the paid work.",
    business: "Two doors into one catalog. Ordering the protocol is drawn, and it is not open.",
    operator: "The menu sells the method class. The packet stays the asset.",
  },
};

export function doorFor(pathname: string): Door | null {
  if (pathname.startsWith("/market") || pathname.startsWith("/autopsy")) return "ledger";
  if (pathname.startsWith("/spaces") || pathname.startsWith("/stories")) return "space";
  if (pathname.startsWith("/education")) return "learn";
  if (pathname.startsWith("/scan")) return "scan";
  if (pathname.startsWith("/craft") || pathname.startsWith("/foundry")) return "craft";
  return null;
}

export function seatLine(pathname: string, audience: Audience, tier: Tier) {
  const door = doorFor(pathname);
  if (!door) return null;
  const access = tier === "open" ? "Open" : "Desk";
  return `${access}. ${LINES[door][audience]}`;
}

type SeatState = {
  audience: Audience;
  tier: Tier;
  setAudience: (audience: Audience) => void;
  setTier: (tier: Tier) => void;
  markHydrated: () => void;
};

export const useSeat = create<SeatState>()(
  persist(
    (set) => ({
      audience: "drinker",
      tier: "open",
      setAudience: (audience) => set({ audience }),
      setTier: (tier) => set({ tier }),
      markHydrated: () => set({}),
    }),
    {
      name: "auctum-seat-v1",
      skipHydration: true,
      partialize: (state) => ({ audience: state.audience, tier: state.tier }),
    },
  ),
);
