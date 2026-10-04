import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { TrustBadge } from "@/components/trust-badge";
import { Button, Eyebrow, Sheet, Stat } from "@/components/ui";
import {
  bookChurn,
  explainChurn,
  inSegment,
  LIFECYCLE_ORDER,
  nextLotStep,
  OPERATOR_ID,
  SEGMENTS,
  STEP_LABEL,
  type SegmentId,
} from "@/lib/crm";
import { formatCents, formatKg, roleLabel } from "@/lib/format";
import { useLedger } from "@/lib/store";
import type { Lifecycle } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/crm")({ component: CrmPage });

const FACTOR_LABEL = {
  silence: "Silence",
  receivables: "Unpaid",
  stage: "Stage",
  trust: "Trust",
  sample: "Sample stuck",
} as const;

function Bar({ value, max }: { value: number; max: number }) {
  return (
    <div className="h-1.5 bg-raw">
      <div className="h-full bg-stamp" style={{ width: `${max === 0 ? 0 : Math.min(100, (value / max) * 100)}%` }} />
    </div>
  );
}

function CrmPage() {
  const accounts = useLedger((s) => s.accounts);
  const lots = useLedger((s) => s.lots);
  const events = useLedger((s) => s.events);
  const threads = useLedger((s) => s.threads);
  const tasks = useLedger((s) => s.tasks);
  const logTouch = useLedger((s) => s.logTouch);
  const queueFollowUp = useLedger((s) => s.queueFollowUp);
  const advanceFulfillment = useLedger((s) => s.advanceFulfillment);
  const [stage, setStage] = useState<Lifecycle | "all">("all");

  const book = useMemo(
    () =>
      accounts
        .filter((account) => account.id !== OPERATOR_ID)
        .map((account) => ({ account, reading: explainChurn(account, events, threads, lots) }))
        .sort((a, b) => b.reading.score - a.reading.score),
    [accounts, events, threads, lots],
  );
  const due = book.filter((row) => row.reading.overdue);
  const factors = bookChurn(book.map((row) => row.reading));
  const factorPeak = Math.max(1, ...Object.values(factors));
  const stageCounts = LIFECYCLE_ORDER.map((id) => ({
    id,
    count: accounts.filter((account) => account.lifecycle === id).length,
  }));
  const stagePeak = Math.max(1, ...stageCounts.map((row) => row.count));
  const ar = accounts.reduce((sum, account) => sum + account.outstandingCents, 0);
  const steps = lots.flatMap((lot) => {
    const next = nextLotStep(lot);
    return next ? [{ lot, next }] : [];
  });
  const visible = stage === "all" ? book : book.filter((row) => row.account.lifecycle === stage);

  function queue(segment: SegmentId, accountId: string, name: string) {
    const title = {
      sample: `Write ${name} about the sample`,
      reorder: `Ask ${name} if the next lock is due`,
      harvest: `Harvest note for ${name}`,
    }[segment];
    queueFollowUp(accountId, title);
  }

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>CRM · small book</Eyebrow>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Who to write, and why the number moved</h1>
        <p className="mt-3 max-w-xl text-slate">
          A stay-in-touch clock, a stage rail, and three segments. Churn is the sum of silence, unpaid money,
          stage, trust, and a sample that has not come home. Logging a touch resets the clock. It does not send a message.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Stat label="Write today" value={due.length} />
          <Stat label="Live churn, mean" value={book.length ? Math.round(book.reduce((sum, row) => sum + row.reading.score, 0) / book.length) : 0} hint="Calculated" />
          <Stat label="Fulfillment" value={steps.length} hint="Steps waiting" />
          <Stat label="Open AR" value={formatCents(ar)} />
        </div>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Sheet>
          <Eyebrow>When to make contact</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">Outside the cadence</h2>
          <ul className="mt-4 divide-y divide-hair">
            {due.length === 0 ? <li className="py-3 text-sm text-slate">Everyone is inside their cadence.</li> : null}
            {due.map(({ account, reading }) => (
              <li key={account.id} className="flex flex-wrap items-start justify-between gap-3 py-4">
                <div>
                  <Link to="/crm/$accountId" params={{ accountId: account.id }} className="font-display text-xl">
                    {account.name}
                  </Link>
                  <p className="mt-1 text-sm text-slate">
                    {roleLabel(account.role)} · {reading.daysQuiet === null ? "no touch recorded" : `${reading.daysQuiet} days quiet`} · every {reading.cadenceDays} days
                  </p>
                  <p className="mt-1 text-sm">{reading.factors[0]?.detail}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={cn("font-mono tabular", reading.score >= 30 ? "text-stamp" : "text-ink")}>{reading.score}</span>
                  <Button tone="ghost" className="min-h-9" onClick={() => logTouch(account.id)}>
                    Log touch
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Sheet>
        <Sheet>
          <Eyebrow>Why the book is uneasy</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">Churn, by cause</h2>
          <ul className="mt-5 space-y-4">
            {(Object.keys(FACTOR_LABEL) as Array<keyof typeof FACTOR_LABEL>).map((id) => (
              <li key={id}>
                <div className="flex justify-between font-mono text-xs">
                  <span>{FACTOR_LABEL[id]}</span>
                  <span className="tabular">{factors[id]}</span>
                </div>
                <div className="mt-2">
                  <Bar value={factors[id]} max={factorPeak} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate">Points are summed across the book, not averaged into a vanity score.</p>
        </Sheet>
      </div>

      <Sheet>
        <Eyebrow>Stage rail</Eyebrow>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {stageCounts.map((row) => (
            <button key={row.id} type="button" onClick={() => setStage(stage === row.id ? "all" : row.id)} className="text-left">
              <p className={cn("meta capitalize", stage === row.id && "text-ink")}>{row.id}</p>
              <p className="mt-1 font-display text-2xl tabular">{row.count}</p>
              <div className="mt-2">
                <Bar value={row.count} max={stagePeak} />
              </div>
            </button>
          ))}
        </div>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-3">
        {(Object.keys(SEGMENTS) as SegmentId[]).map((id) => {
          const members = book.filter((row) => inSegment(id, row.account, events, threads));
          return (
            <Sheet key={id}>
              <Eyebrow>Segment · {members.length}</Eyebrow>
              <h2 className="mt-2 font-display text-2xl">{SEGMENTS[id].title}</h2>
              <p className="mt-2 text-sm text-slate">{SEGMENTS[id].body}</p>
              <ul className="mt-4 divide-y divide-hair">
                {members.slice(0, 4).map(({ account }) => {
                  const title = {
                    sample: `Write ${account.name} about the sample`,
                    reorder: `Ask ${account.name} if the next lock is due`,
                    harvest: `Harvest note for ${account.name}`,
                  }[id];
                  const queued = tasks.some((task) => task.status === "open" && task.accountId === account.id && task.title === title);
                  return (
                    <li key={account.id} className="flex items-center justify-between gap-3 py-3">
                      <span>{account.name}</span>
                      <Button tone="quiet" className="min-h-9" disabled={queued} onClick={() => queue(id, account.id, account.name)}>
                        {queued ? "On the desk" : "Queue"}
                      </Button>
                    </li>
                  );
                })}
                {members.length === 0 ? <li className="py-3 text-sm text-slate">No one in this segment.</li> : null}
              </ul>
            </Sheet>
          );
        })}
      </div>

      <Sheet>
        <Eyebrow>Fulfillment</Eyebrow>
        <h2 className="mt-2 font-display text-2xl">Sample to order, one step at a time</h2>
        <ul className="mt-4 divide-y divide-hair">
          {steps.map(({ lot, next }) => (
            <li key={lot.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <Link to="/market/$lotId" params={{ lotId: lot.id }} className="font-display text-lg">
                  {lot.code}
                </Link>
                <p className="meta mt-1">
                  {lot.availability} → {next} · {STEP_LABEL[lot.availability]}
                </p>
              </div>
              <Button tone="ghost" className="min-h-9" onClick={() => advanceFulfillment(lot.id)}>
                {STEP_LABEL[lot.availability]}
              </Button>
            </li>
          ))}
        </ul>
      </Sheet>

      <Sheet padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-hair">
                {["Account", "Role", "Trust", "Lifecycle", "Live churn", "Quiet", "AR"].map((heading) => (
                  <th key={heading} className="px-5 py-3 font-mono text-[10px] font-medium tracking-[0.16em] text-slate uppercase">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map(({ account, reading }) => (
                <tr key={account.id} className="border-b border-hair last:border-0 hover:bg-sheet">
                  <td className="px-5 py-4">
                    <Link to="/crm/$accountId" params={{ accountId: account.id }} className="block">
                      <span className="font-display text-lg">{account.name}</span>
                      <span className="mt-0.5 block text-xs text-slate">
                        {account.locale}, {account.country}
                      </span>
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-slate">{roleLabel(account.role)}</td>
                  <td className="px-5 py-4">
                    <TrustBadge trust={account.trust} size="sm" />
                  </td>
                  <td className="px-5 py-4 capitalize">{account.lifecycle}</td>
                  <td className="px-5 py-4">
                    <span className={cn("tabular", reading.score >= 30 ? "text-stamp" : "text-ink")}>{reading.score}</span>
                    {Math.abs(reading.score - account.churnRisk) >= 8 ? (
                      <span className="mt-0.5 block text-xs text-slate">filed {account.churnRisk}</span>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 tabular text-slate">
                    {reading.daysQuiet === null ? "—" : `${reading.daysQuiet}d`}
                  </td>
                  <td className="px-5 py-4 tabular">{formatCents(account.outstandingCents)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-5 py-3 text-xs text-slate">Volume still sits on the file. {formatKg(accounts.reduce((sum, account) => sum + account.volumeKgYtd, 0))} across the book. {tasks.filter((task) => task.status === "open").length} agent tasks open.</p>
      </Sheet>
    </div>
  );
}
