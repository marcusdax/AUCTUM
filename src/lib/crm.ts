import type { Account, LedgerEvent, Lifecycle, Lot, LotState, Thread } from "./types";

export const OPERATOR_ID = "acc-karmic";

const CADENCE: Record<Account["role"], number> = {
  farmer: 21,
  collector: 14,
  coop: 30,
  exporter: 14,
  roaster: 14,
  importer: 21,
  lab: 45,
  agent: 7,
};

const STAGE_POINTS: Record<Lifecycle, number> = {
  prospect: 16,
  qualified: 8,
  sampling: 10,
  contracted: 4,
  retained: 0,
  "at-risk": 28,
};

export const LIFECYCLE_ORDER: Lifecycle[] = ["prospect", "qualified", "sampling", "contracted", "retained", "at-risk"];

export type ChurnFactor = {
  id: "silence" | "receivables" | "stage" | "trust" | "sample";
  label: string;
  points: number;
  detail: string;
};

export type ChurnReading = {
  score: number;
  factors: ChurnFactor[];
  lastTouchAt: string | null;
  daysQuiet: number | null;
  cadenceDays: number;
  overdue: boolean;
};

const NEXT: Partial<Record<LotState, LotState>> = {
  available: "sample",
  sample: "offer",
  offer: "contracted",
  locked: "contracted",
  contracted: "fulfilled",
};

export const STEP_LABEL: Partial<Record<LotState, string>> = {
  available: "Allocate sample",
  sample: "Sample returned",
  offer: "Confirm the order",
  locked: "Release the lock into a contract",
  contracted: "Mark fulfilled",
};

export function daysSince(iso: string, now = Date.now()) {
  return Math.max(0, Math.floor((now - new Date(iso).getTime()) / 86_400_000));
}

export function cadenceDays(account: Account) {
  if (account.lifecycle === "at-risk") return 7;
  return CADENCE[account.role];
}

export function lastTouchAt(account: Account, events: LedgerEvent[], threads: Thread[]) {
  const stamps = [
    ...events.filter((event) => event.accountId === account.id).map((event) => event.at),
    ...threads.filter((thread) => thread.parties.includes(account.id)).map((thread) => thread.updatedAt),
  ];
  if (!stamps.length) return null;
  return stamps.reduce((latest, stamp) => (stamp > latest ? stamp : latest));
}

export function explainChurn(
  account: Account,
  events: LedgerEvent[],
  threads: Thread[],
  lots: Lot[],
  now = Date.now(),
): ChurnReading {
  const cadence = cadenceDays(account);
  const lastTouch = lastTouchAt(account, events, threads);
  const daysQuiet = lastTouch ? daysSince(lastTouch, now) : null;
  const factors: ChurnFactor[] = [];

  if (daysQuiet === null) {
    factors.push({
      id: "silence",
      label: "Silence",
      points: 40,
      detail: "No touch is on the ledger. The file's opening date is not a conversation.",
    });
  } else if (daysQuiet > cadence) {
    factors.push({
      id: "silence",
      label: "Silence",
      points: Math.min(40, Math.round(((daysQuiet - cadence) / cadence) * 22)),
      detail: `${daysQuiet} days quiet. This role is written every ${cadence} days.`,
    });
  }

  if (account.outstandingCents > 0 && account.role !== "agent" && account.role !== "lab") {
    factors.push({
      id: "receivables",
      label: "Unpaid",
      points: Math.min(22, Math.max(4, Math.round(account.outstandingCents / 20_000))),
      detail: "Money still open on the file. Age it on the payments desk, then write.",
    });
  }

  const stage = STAGE_POINTS[account.lifecycle];
  if (stage > 0) {
    factors.push({
      id: "stage",
      label: "Stage",
      points: stage,
      detail:
        account.lifecycle === "at-risk"
          ? "The file is already marked at risk."
          : `${account.lifecycle} is not yet a retained book.`,
    });
  }

  if (account.trust.score < 75) {
    factors.push({
      id: "trust",
      label: "Trust",
      points: Math.min(15, Math.round((75 - account.trust.score) / 2)),
      detail: `Trust ${account.trust.score} sits under the line where silence gets expensive.`,
    });
  }

  const stuck = lots.some((lot) => {
    const theirs = lot.producerId === account.id || lot.exporterId === account.id;
    if (!theirs || lot.availability !== "sample") return false;
    const shipped = events.find((event) => event.lotId === lot.id && event.kind === "sample.shipped");
    return !shipped || daysSince(shipped.at, now) > 7;
  });
  if (stuck) {
    factors.push({
      id: "sample",
      label: "Sample stuck",
      points: 12,
      detail: "A sample has been out more than a week without a return on the ledger.",
    });
  }

  const score = Math.min(100, factors.reduce((sum, factor) => sum + factor.points, 0));
  const overdue = daysQuiet === null || daysQuiet >= cadence;
  return { score, factors, lastTouchAt: lastTouch, daysQuiet, cadenceDays: cadence, overdue };
}

export function bookChurn(readings: ChurnReading[]) {
  const totals: Record<ChurnFactor["id"], number> = { silence: 0, receivables: 0, stage: 0, trust: 0, sample: 0 };
  for (const reading of readings) {
    for (const factor of reading.factors) totals[factor.id] += factor.points;
  }
  return totals;
}

export type SegmentId = "sample" | "reorder" | "harvest";

export const SEGMENTS: Record<SegmentId, { title: string; body: string }> = {
  sample: {
    title: "Sample follow-up",
    body: "A sample moved. Seven days is enough. Write before the cup goes cold.",
  },
  reorder: {
    title: "Reorder window",
    body: "A retained buyer with no lock or payment inside forty-five days.",
  },
  harvest: {
    title: "Harvest note",
    body: "Farmers and cooperatives in Vietnam. One note about the next pick, not a newsletter.",
  },
};

export function inSegment(
  id: SegmentId,
  account: Account,
  events: LedgerEvent[],
  threads: Thread[],
  now = Date.now(),
) {
  if (account.id === OPERATOR_ID) return false;
  if (id === "harvest") return account.country === "Vietnam" && (account.role === "farmer" || account.role === "coop");
  if (id === "sample") {
    const onSample =
      threads.some((thread) => thread.deal === "sample" && thread.parties.includes(account.id)) ||
      events.some((event) => event.accountId === account.id && event.kind.startsWith("sample."));
    if (!onSample) return false;
    const touch = events.find((event) => event.accountId === account.id && event.kind === "crm.touch");
    return !touch;
  }
  if (id === "reorder") {
    if (account.role !== "roaster" && account.role !== "importer") return false;
    if (account.lifecycle !== "retained" && account.lifecycle !== "contracted") return false;
    const commercial = [
      ...events.filter(
        (event) =>
          event.accountId === account.id && (event.kind === "price.locked" || event.kind === "payment.received"),
      ),
      ...threads.filter((thread) => thread.deal === "lock" && thread.parties.includes(account.id)),
    ].map((row) => ("at" in row ? row.at : row.updatedAt));
    if (!commercial.length) return true;
    const latest = commercial.reduce((a, b) => (a > b ? a : b));
    return daysSince(latest, now) > 45;
  }
  return false;
}

export function nextLotStep(lot: Lot): LotState | null {
  if (lot.availability === "available" && !lot.sampleReady) return null;
  return NEXT[lot.availability] ?? null;
}
