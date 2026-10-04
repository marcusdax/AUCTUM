import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  accounts as seedAccounts,
  AGENT_ID,
  agentTasks as seedTasks,
  documents as seedDocs,
  events as seedEvents,
  followingIds as seedFollowing,
  lots as seedLots,
  messages as seedMessages,
  stories as seedStories,
  threads as seedThreads,
} from "./data";
import { nextLotStep } from "./crm";
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
  fieldMeta?: DocumentRecord["fieldMeta"];
  previewUrl?: string;
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
  reviseField: (id: string, key: string, value: string) => void;
  ingestScan: (draft: ScanDraft) => string;
  completeTask: (id: string) => void;
  logTouch: (accountId: string) => void;
  queueFollowUp: (accountId: string, title: string) => void;
  advanceFulfillment: (lotId: string) => void;
  sendMessage: (threadId: string, body: string) => void;
  publishStory: (input: { title: string; body: string; lotId?: string; kind: "note" | "lot"; image?: string }) => void;
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
      reviseField: (id, key, value) =>
        set((s) => ({
          documents: s.documents.map((doc) =>
            doc.id === id
              ? {
                  ...doc,
                  fields: { ...doc.fields, [key]: value },
                  fieldMeta: doc.fieldMeta?.map((field) => (field.key === key ? { ...field, touched: true } : field)),
                }
              : doc,
          ),
        })),
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
          fieldMeta: draft.fieldMeta,
          previewUrl: draft.previewUrl,
          notes:
            draft.kind === "qc"
              ? "Proposal only. Accepting files the sheet. The lot cup score does not move."
              : undefined,
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
      logTouch: (accountId) =>
        set((s) => ({
          accounts: s.accounts.map((account) =>
            account.id === accountId ? { ...account, churnRisk: Math.max(0, account.churnRisk - 6) } : account,
          ),
          events: [
            {
              id: `ev-${Date.now()}`,
              at: now(),
              kind: "crm.touch",
              actor: "Karmic Circle",
              summary: "A person recorded a touch. The cadence clock resets. Nothing was sent on their behalf.",
              accountId,
            },
            ...s.events,
          ],
        })),
      queueFollowUp: (accountId, title) =>
        set((s) => {
          const open = s.tasks.some((task) => task.status === "open" && task.accountId === accountId && task.title === title);
          if (open) return s;
          const due = new Date(Date.now() + 3 * 86_400_000).toISOString().slice(0, 10);
          return {
            tasks: [
              {
                id: `tk-${Date.now()}`,
                agentId: AGENT_ID,
                kind: "follow-up" as const,
                title,
                accountId,
                due,
                status: "open" as const,
              },
              ...s.tasks,
            ],
            events: [
              {
                id: `ev-${Date.now()}`,
                at: now(),
                kind: "crm.queued",
                actor: "CRM desk",
                summary: `Queued for the agent: ${title}`,
                accountId,
              },
              ...s.events,
            ],
          };
        }),
      advanceFulfillment: (lotId) =>
        set((s) => {
          const lot = s.lots.find((row) => row.id === lotId);
          if (!lot) return s;
          const next = nextLotStep(lot);
          if (!next) return s;
          const summary: Record<string, string> = {
            sample: `Sample allocated on ${lot.code}.`,
            offer: `Sample returned on ${lot.code}. Offer is open.`,
            contracted: `${lot.code} confirmed as an order.`,
            fulfilled: `${lot.code} marked fulfilled.`,
          };
          return {
            lots: s.lots.map((row) => (row.id === lotId ? { ...row, availability: next } : row)),
            events: [
              {
                id: `ev-${Date.now()}`,
                at: now(),
                kind: `fulfillment.${next}`,
                actor: "CRM desk",
                summary: summary[next] ?? `${lot.code} moved to ${next}.`,
                lotId,
                accountId: lot.producerId,
              },
              ...s.events,
            ],
          };
        }),
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
      publishStory: ({ title, body, lotId, kind, image }) =>
        set((s) => ({
          stories: [
            {
              id: `st-${Date.now()}`,
              spaceId: "space-desk",
              accountId: "desk",
              lotId,
              kind,
              title: title.trim() || (lotId ? "A lot, passed on" : "A note"),
              lede: body.trim().slice(0, 140),
              body: body.trim(),
              image: image ?? "",
              publishedAt: now(),
            },
            ...s.stories,
          ],
        })),
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

