import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  allocate,
  fingerprint,
  matchInvoice,
  seedInvoices,
  type IdempotencyRecord,
  type Invoice,
  type PaymentIntent,
  type ProviderTxn,
} from "./payments";

type IntentBody = { invoiceId: string; amountMinor: number };

type PaymentsState = {
  invoices: Invoice[];
  txns: ProviderTxn[];
  intents: PaymentIntent[];
  idempotency: IdempotencyRecord[];
  lastNote: string;
  hydrated: boolean;
  markHydrated: () => void;
  createIntent: (key: string, body: IntentBody) => { ok: true; intent: PaymentIntent; replayed: boolean } | { ok: false; code: "GS-PAY-1001" };
  receivePayos: (input: { providerTxnId: string; amountMinor: number; memo: string; signatureOk: boolean }) => string;
  receiveCasso: (input: { providerTxnId: string; amountMinor: number; memo: string; tokenOk: boolean; refetchOk: boolean }) => string;
  reset: () => void;
};

function applyMatch(invoices: Invoice[], txn: Omit<ProviderTxn, "matchStatus" | "allocatedMinor" | "residualMinor" | "invoiceId" | "note"> & { note?: string }): { invoices: Invoice[]; txn: ProviderTxn } {
  const found = matchInvoice(invoices, txn.memo, txn.amountMinor);
  if (!found.invoice) {
    return {
      invoices,
      txn: { ...txn, matchStatus: "unmatched", allocatedMinor: 0, residualMinor: txn.amountMinor, note: "Suspense. Money is real and unassigned." },
    };
  }
  const result = allocate(found.invoice, txn.amountMinor);
  const note =
    found.method === "heuristic"
      ? "Heuristic match. One open invoice, exact amount. Review before you trust it."
      : result.overpaid
        ? "Paid. Excess sits unallocated."
        : result.invoice.status === "partially_paid"
          ? "Partial. Remainder keeps its original age."
          : "Matched on memo.";
  return {
    invoices: invoices.map((invoice) => (invoice.id === result.invoice.id ? result.invoice : invoice)),
    txn: {
      ...txn,
      invoiceId: result.invoice.id,
      allocatedMinor: result.allocated,
      residualMinor: result.residual,
      matchStatus: result.overpaid ? "overpaid" : result.invoice.status === "partially_paid" ? "partial" : "matched",
      note,
    },
  };
}

export const usePayments = create<PaymentsState>()(
  persist(
    (set, get) => ({
      invoices: seedInvoices(),
      txns: [],
      intents: [],
      idempotency: [],
      lastNote: "Desk is quiet.",
      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      createIntent: (key, body) => {
        const fp = fingerprint(body);
        const prior = get().idempotency.find((row) => row.key === key);
        if (prior && prior.fingerprint !== fp) {
          set({ lastNote: "GS-PAY-1001 IdempotencyKeyReuse. Same key, different body." });
          return { ok: false, code: "GS-PAY-1001" };
        }
        if (prior) {
          const intent = get().intents.find((row) => row.id === prior.intentId);
          if (intent) {
            set({ lastNote: "Replay. Same key, same body, original intent returned." });
            return { ok: true, intent, replayed: true };
          }
        }
        const intent: PaymentIntent = {
          id: `pi-${body.invoiceId}-${get().intents.length + 1}`,
          invoiceId: body.invoiceId,
          amountMinor: body.amountMinor,
          currency: "VND",
          idempotencyKey: key,
        };
        set((s) => ({
          intents: [...s.intents, intent],
          idempotency: [...s.idempotency, { key, fingerprint: fp, intentId: intent.id }],
          lastNote: `Intent ${intent.id} opened.`,
        }));
        return { ok: true, intent, replayed: false };
      },
      receivePayos: (input) => {
        if (!input.signatureOk) {
          set({ lastNote: "PayOS 401. Signature failed. No transaction written." });
          return "401";
        }
        const existing = get().txns.find((txn) => txn.provider === "payos" && txn.providerTxnId === input.providerTxnId);
        if (existing) {
          set({ lastNote: "PayOS replay. One row. No second allocation." });
          return "200-replay";
        }
        const draft = applyMatch(get().invoices, {
          id: `txn-${input.providerTxnId}`,
          provider: "payos",
          providerTxnId: input.providerTxnId,
          amountMinor: input.amountMinor,
          currency: "VND",
          memo: input.memo,
          signatureValid: true,
        });
        set({ invoices: draft.invoices, txns: [draft.txn, ...get().txns], lastNote: `PayOS 200. ${draft.txn.note}` });
        return "200";
      },
      receiveCasso: (input) => {
        if (!input.tokenOk) {
          set({ lastNote: "Casso rejected. Token mismatch." });
          return "401";
        }
        const existing = get().txns.find((txn) => txn.provider === "casso" && txn.providerTxnId === input.providerTxnId);
        if (existing) {
          set({ lastNote: "Casso replay. No second allocation." });
          return "200-replay";
        }
        if (!input.refetchOk) {
          const txn: ProviderTxn = {
            id: `txn-${input.providerTxnId}`,
            provider: "casso",
            providerTxnId: input.providerTxnId,
            amountMinor: input.amountMinor,
            currency: "VND",
            memo: input.memo,
            signatureValid: false,
            matchStatus: "refused",
            allocatedMinor: 0,
            residualMinor: input.amountMinor,
            note: "Token accepted, API re-fetch failed. Paid amount unchanged.",
          };
          set({ txns: [txn, ...get().txns], lastNote: txn.note });
          return "exception";
        }
        const draft = applyMatch(get().invoices, {
          id: `txn-${input.providerTxnId}`,
          provider: "casso",
          providerTxnId: input.providerTxnId,
          amountMinor: input.amountMinor,
          currency: "VND",
          memo: input.memo,
          signatureValid: true,
        });
        set({ invoices: draft.invoices, txns: [draft.txn, ...get().txns], lastNote: `Casso re-fetched. ${draft.txn.note}` });
        return "200";
      },
      reset: () => set({ invoices: seedInvoices(), txns: [], intents: [], idempotency: [], lastNote: "Desk reset.", hydrated: true }),
    }),
    {
      name: "auctum-payments-v1",
      skipHydration: true,
      partialize: (s) => ({
        invoices: s.invoices,
        txns: s.txns,
        intents: s.intents,
        idempotency: s.idempotency,
      }),
    },
  ),
);
