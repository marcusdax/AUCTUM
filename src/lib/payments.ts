const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

export type Currency = "VND" | "USD";

export type InvoiceStatus = "open" | "partially_paid" | "paid" | "void";

export type Invoice = {
  id: string;
  counterparty: string;
  lotCode: string;
  currency: Currency;
  totalMinor: number;
  paidMinor: number;
  dueAt: string;
  memoToken: string;
  status: InvoiceStatus;
};

export type MatchStatus = "matched" | "partial" | "overpaid" | "unmatched" | "refused";

export type ProviderTxn = {
  id: string;
  provider: "payos" | "casso";
  providerTxnId: string;
  amountMinor: number;
  currency: Currency;
  memo: string;
  signatureValid: boolean;
  matchStatus: MatchStatus;
  allocatedMinor: number;
  residualMinor: number;
  invoiceId?: string;
  note: string;
};

export type PaymentIntent = {
  id: string;
  invoiceId: string;
  amountMinor: number;
  currency: Currency;
  idempotencyKey: string;
};

export type IdempotencyRecord = {
  key: string;
  fingerprint: string;
  intentId: string;
};

export type AgingBucket = "current" | "d30" | "d60" | "d90" | "d90p";

export const AGING_LABEL: Record<AgingBucket, string> = {
  current: "Current",
  d30: "30",
  d60: "60",
  d90: "90",
  d90p: "90+",
};

export function memoToken(seed: string) {
  let hash = 2166136261;
  for (const char of seed) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  let body = "";
  let n = hash >>> 0;
  for (let i = 0; i < 6; i += 1) {
    body += CROCKFORD[n % 32];
    n = Math.floor(n / 32) + (i + 3) * 19;
  }
  const prefix = `AUC${body}`;
  const sum = [...prefix].reduce((total, char) => total + char.charCodeAt(0), 0);
  return `${prefix}${CROCKFORD[sum % 32]}`;
}

export function fingerprint(value: unknown) {
  const text = JSON.stringify(value);
  let hash = 5381;
  for (let i = 0; i < text.length; i += 1) hash = (hash << 5) + hash + text.charCodeAt(i);
  return (hash >>> 0).toString(16).padStart(8, "0");
}

export function daysPastDue(dueAt: string, now = Date.now()) {
  return Math.floor((now - new Date(dueAt).getTime()) / 86_400_000);
}

export function agingBucket(dueAt: string, now = Date.now()): AgingBucket {
  const days = daysPastDue(dueAt, now);
  if (days <= 30) return "current";
  if (days <= 60) return "d30";
  if (days <= 90) return "d60";
  if (days <= 120) return "d90";
  return "d90p";
}

export function outstanding(invoice: Invoice) {
  return Math.max(0, invoice.totalMinor - invoice.paidMinor);
}

export function agingSummary(invoices: Invoice[], now = Date.now()) {
  const buckets: Record<AgingBucket, number> = { current: 0, d30: 0, d60: 0, d90: 0, d90p: 0 };
  for (const invoice of invoices) {
    if (invoice.status === "paid" || invoice.status === "void" || invoice.currency !== "VND") continue;
    buckets[agingBucket(invoice.dueAt, now)] += outstanding(invoice);
  }
  return buckets;
}

function stripMemo(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

export function matchInvoice(invoices: Invoice[], memo: string, amountMinor: number) {
  const cleaned = stripMemo(memo);
  const exact = invoices.find((invoice) => invoice.status !== "void" && invoice.status !== "paid" && cleaned.includes(invoice.memoToken));
  if (exact) return { invoice: exact, method: "memo" as const };
  const open = invoices.filter((invoice) => invoice.status === "open" || invoice.status === "partially_paid");
  const exactAmount = open.filter((invoice) => outstanding(invoice) === amountMinor);
  if (exactAmount.length === 1) return { invoice: exactAmount[0], method: "heuristic" as const };
  return { invoice: undefined, method: "none" as const };
}

export function allocate(invoice: Invoice, amountMinor: number): { invoice: Invoice; allocated: number; residual: number; settled: boolean; overpaid: boolean } {
  const room = outstanding(invoice);
  const allocated = Math.min(room, amountMinor);
  const residual = amountMinor - allocated;
  const paidMinor = invoice.paidMinor + allocated;
  const status: InvoiceStatus = paidMinor >= invoice.totalMinor ? "paid" : paidMinor > 0 ? "partially_paid" : invoice.status;
  return {
    invoice: { ...invoice, paidMinor, status },
    allocated,
    residual,
    settled: status === "paid" && invoice.status !== "paid",
    overpaid: residual > 0 && status === "paid",
  };
}

export function daysAgo(days: number, now = Date.now()) {
  return new Date(now - days * 86_400_000).toISOString();
}

export function seedInvoices(now = Date.now()): Invoice[] {
  const rows: Array<Omit<Invoice, "memoToken" | "status"> & { paidMinor: number }> = [
    { id: "inv-084", counterparty: "Atlas Roastworks", lotCode: "AL-VN-26-084", currency: "VND", totalMinor: 120_000_000, paidMinor: 0, dueAt: daysAgo(5, now) },
    { id: "inv-091", counterparty: "Northwind", lotCode: "AL-VN-26-091", currency: "VND", totalMinor: 86_000_000, paidMinor: 20_000_000, dueAt: daysAgo(40, now) },
    { id: "inv-110", counterparty: "Saigon QC", lotCode: "AL-VN-26-110", currency: "VND", totalMinor: 48_200_000, paidMinor: 0, dueAt: daysAgo(70, now) },
    { id: "inv-old", counterparty: "Harbor & Co", lotCode: "AL-ET-26-014", currency: "VND", totalMinor: 15_000_000, paidMinor: 0, dueAt: daysAgo(140, now) },
  ];
  return rows.map((row) => ({
    ...row,
    memoToken: memoToken(row.id),
    status: row.paidMinor <= 0 ? "open" : row.paidMinor >= row.totalMinor ? "paid" : "partially_paid",
  }));
}

export function formatMinor(amount: number, currency: Currency) {
  if (currency === "VND") return `₫${new Intl.NumberFormat("vi-VN").format(amount)}`;
  return `$${(amount / 100).toFixed(2)}`;
}
