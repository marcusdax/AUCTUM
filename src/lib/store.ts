import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  accounts as seedAccounts,
  agentTasks as seedTasks,
  documents as seedDocs,
  events as seedEvents,
  followingIds as seedFollowing,
  lots as seedLots,
  messages as seedMessages,
  stories as seedStories,
  threads as seedThreads,
} from "./data";
import { bumpComponent, computeTrust } from "./trust";
import type {
  Account,
  AgentTask,
  DocumentRecord,
  LedgerEvent,
  Lot,
  Message,
  Story,
  Thread,
} from "./types";

type ScanDraft = {
  kind: DocumentRecord["kind"];
  title: string;
  accountId: string;
  lotId?: string;
  fields: Record<string, string>;
  confidence: number;
};

type LedgerState = {
  accounts: Account[];
  lots: Lot[];
  stories: Story[];
  documents: DocumentRecord[];
  threads: Thread[];
  messages: Message[];
  tasks: AgentTask[];
  events: LedgerEvent[];
  following: string[];
  hydrated: boolean;
  markHydrated: () => void;
  follow: (accountId: string) => void;
  requestSample: (lotId: string) => void;
  expressInterest: (lotId: string) => void;
  lockPrice: (lotId: string) => void;
  setDocStatus: (id: string, status: DocumentRecord["status"]) => void;
  ingestScan: (draft: ScanDraft) => string;
  completeTask: (id: string) => void;
  sendMessage: (threadId: string, body: string) => void;
  reset: () => void;
};

function now() {
  return new Date().toISOString();
}

function applyDocToTrust(account: Account, status: DocumentRecord["status"]): Account {
  if (status !== "accepted" && status !== "rejected") return account;
  const delta = status === "accepted" ? 4 : -8;
  const components = bumpComponent(account.trust.components, "documentVerification", delta);
  return { ...account, trust: computeTrust(components) };
}

const seed = {
  accounts: seedAccounts,
  lots: seedLots,
  stories: seedStories,
  documents: seedDocs,
  threads: seedThreads,
  messages: seedMessages,
  tasks: seedTasks,
  events: seedEvents,
  following: seedFollowing,
};

export const useLedger = create<LedgerState>()(
  persist(
    (set) => ({
      ...seed,
      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      follow: (accountId) =>
        set((s) => ({
          following: s.following.includes(accountId)
            ? s.following.filter((id) => id !== accountId)
            : [...s.following, accountId],
        })),
      requestSample: (lotId) =>
        set((s) => {
          const lot = s.lots.find((l) => l.id === lotId);
          if (!lot) return s;
          const event: LedgerEvent = {
            id: `ev-${Date.now()}`,
            at: now(),
            kind: "sample.requested",
            actor: "Atlas Roastworks",
            summary: `Sample requested on ${lot.code}.`,
            lotId,
            accountId: "acc-atlas",
          };
          return {
            lots: s.lots.map((l) => (l.id === lotId ? { ...l, availability: "sample" } : l)),
            events: [event, ...s.events],
          };
        }),
      expressInterest: (lotId) =>
        set((s) => {
          const lot = s.lots.find((l) => l.id === lotId);
          if (!lot) return s;
          return {
            lots: s.lots.map((l) =>
              l.id === lotId && l.availability === "available" ? { ...l, availability: "offer" } : l,
            ),
            events: [
              {
                id: `ev-${Date.now()}`,
                at: now(),
                kind: "offer.opened",
                actor: "Atlas Roastworks",
                summary: `Interest recorded on ${lot.code}.`,
                lotId,
              },
              ...s.events,
            ],
          };
        }),
      lockPrice: (lotId) =>
        set((s) => {
          const lot = s.lots.find((l) => l.id === lotId);
          if (!lot) return s;
          return {
            lots: s.lots.map((l) => (l.id === lotId ? { ...l, availability: "locked" } : l)),
            events: [
              {
                id: `ev-${Date.now()}`,
                at: now(),
                kind: "price.locked",
                actor: "Auctum Ledger",
                summary: `Lock snapshot ${formatLock(lot)} written.`,
                lotId,
              },
              ...s.events,
            ],
          };
        }),
      setDocStatus: (id, status) =>
        set((s) => {
          const doc = s.documents.find((d) => d.id === id);
          if (!doc) return s;
          const documents = s.documents.map((d) => (d.id === id ? { ...d, status } : d));
          const accounts = s.accounts.map((a) =>
            a.id === doc.accountId ? applyDocToTrust(a, status) : a,
          );
          const event: LedgerEvent = {
            id: `ev-${Date.now()}`,
            at: now(),
            kind: `document.${status}`,
            actor: "Trust desk",
            summary: `${doc.title} marked ${status}.`,
            lotId: doc.lotId,
            accountId: doc.accountId,
          };
          return { documents, accounts, events: [event, ...s.events] };
        }),
      ingestScan: (draft) => {
        const id = `doc-scan-${Date.now()}`;
        const record: DocumentRecord = {
          id,
          kind: draft.kind,
          title: draft.title,
          accountId: draft.accountId,
          lotId: draft.lotId,
          status: "review",
          confidence: draft.confidence,
          capturedAt: now(),
          fields: draft.fields,
        };
        set((s) => ({
          documents: [record, ...s.documents],
          events: [
            {
              id: `ev-${Date.now()}`,
              at: now(),
              kind: "document.extracted",
              actor: "OCR desk",
              summary: `Extracted ${draft.title} at ${Math.round(draft.confidence * 100)}% confidence.`,
              accountId: draft.accountId,
              lotId: draft.lotId,
            },
            ...s.events,
          ],
        }));
        return id;
      },
      completeTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t)),
        })),
      sendMessage: (threadId, body) =>
        set((s) => {
          const msg: Message = {
            id: `m-${Date.now()}`,
            threadId,
            fromId: "acc-karmic",
            body,
            at: now(),
          };
          return {
            messages: [...s.messages, msg],
            threads: s.threads.map((t) =>
              t.id === threadId ? { ...t, preview: body, updatedAt: now() } : t,
            ),
          };
        }),
      reset: () => set({ ...seed, hydrated: true }),
    }),
    {
      name: "auctum-ledger-v1",
      skipHydration: true,
      partialize: (s) => ({
        accounts: s.accounts,
        lots: s.lots,
        stories: s.stories,
        documents: s.documents,
        threads: s.threads,
        messages: s.messages,
        tasks: s.tasks,
        events: s.events,
        following: s.following,
      }),
    },
  ),
);

function formatLock(lot: Lot) {
  return `${(lot.pricePerLbCents / 100).toFixed(2)} / lb on ${lot.code}`;
}

export function accountById(accounts: Account[], id: string) {
  return accounts.find((a) => a.id === id);
}

export function lotById(lots: Lot[], id: string) {
  return lots.find((l) => l.id === id);
}

