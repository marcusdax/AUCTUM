import { createFileRoute, Link } from "@tanstack/react-router";
import { TrustMeter } from "@/components/trust-badge";
import { Button, Eyebrow, FieldRow, Sheet, Stat, buttonClass } from "@/components/ui";
import { explainChurn, inSegment, SEGMENTS, type SegmentId } from "@/lib/crm";
import { formatCents, formatDate, formatKg, roleLabel } from "@/lib/format";
import { accountById, useLedger } from "@/lib/store";
import { TRUST_LABELS } from "@/lib/trust";

export const Route = createFileRoute("/crm_/$accountId")({ component: AccountPage });

function AccountPage() {
  const { accountId } = Route.useParams();
  const accounts = useLedger((s) => s.accounts);
  const lots = useLedger((s) => s.lots);
  const documents = useLedger((s) => s.documents);
  const events = useLedger((s) => s.events);
  const threads = useLedger((s) => s.threads);
  const logTouch = useLedger((s) => s.logTouch);
  const queueFollowUp = useLedger((s) => s.queueFollowUp);
  const account = accountById(accounts, accountId);
  if (!account) {
    return (
      <Sheet>
        <h1 className="font-display text-3xl">No such file</h1>
      </Sheet>
    );
  }
  const relatedLots = lots.filter((l) => l.producerId === account.id || l.exporterId === account.id);
  const relatedDocs = documents.filter((d) => d.accountId === account.id);
  const relatedEvents = events.filter((e) => e.accountId === account.id);
  const reading = explainChurn(account, events, threads, lots);
  const segments = (Object.keys(SEGMENTS) as SegmentId[]).filter((id) => inSegment(id, account, events, threads));
  const peers = account.relationships
    .map((id) => accountById(accounts, id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <div className="space-y-6">
      <Sheet>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Eyebrow>
              CRM · {roleLabel(account.role)} · {account.lifecycle}
            </Eyebrow>
            <h1 className="mt-2 font-display text-4xl">{account.name}</h1>
            <p className="mt-2 max-w-xl text-slate">{account.tagline}</p>
          </div>
          <Link
            to="/spaces/$spaceId"
            params={{ spaceId: account.id.replace("acc-", "") }}
            className={buttonClass("ghost")}
          >
            Open Space
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Stat label="Churn risk" value={`${account.churnRisk}%`} />
          <Stat label="Volume YTD" value={formatKg(account.volumeKgYtd)} />
          <Stat label="Outstanding" value={formatCents(account.outstandingCents)} />
          <Stat label="Since" value={formatDate(account.since)} />
        </div>
      </Sheet>
      <Sheet>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Cadence</Eyebrow>
            <h2 className="mt-2 font-display text-2xl">
              {reading.overdue ? "Write before the week turns" : "Inside the cadence"}
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate">
              {reading.lastTouchAt
                ? `Last touch ${formatDate(reading.lastTouchAt)}. This role is written every ${reading.cadenceDays} days.`
                : `No touch recorded. This role is written every ${reading.cadenceDays} days.`}
            </p>
          </div>
          <Button tone="stamp" onClick={() => logTouch(account.id)}>
            Log a touch
          </Button>
        </div>
        <ul className="mt-6 space-y-4">
          {reading.factors.length === 0 ? <li className="text-sm text-slate">Nothing in the churn sum.</li> : null}
          {reading.factors.map((factor) => (
            <li key={factor.id}>
              <div className="flex justify-between gap-3 font-mono text-xs">
                <span>{factor.label}</span>
                <span className="tabular">{factor.points}</span>
              </div>
              <div className="mt-2 h-1.5 bg-raw">
                <div className="h-full bg-stamp" style={{ width: `${Math.min(100, factor.points * 2.5)}%` }} />
              </div>
              <p className="mt-1 text-sm text-slate">{factor.detail}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-sm">
          Live {reading.score}
          <span className="text-slate"> · filed {account.churnRisk}</span>
        </p>
        {segments.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {segments.map((id) => (
              <Button
                key={id}
                tone="ghost"
                onClick={() =>
                  queueFollowUp(
                    account.id,
                    id === "sample"
                      ? `Write ${account.name} about the sample`
                      : id === "reorder"
                        ? `Ask ${account.name} if the next lock is due`
                        : `Harvest note for ${account.name}`,
                  )
                }
              >
                Queue {SEGMENTS[id].title.toLowerCase()}
              </Button>
            ))}
          </div>
        ) : null}
      </Sheet>
      <div className="grid gap-6 lg:grid-cols-2">
        <Sheet>
          <Eyebrow>Honesty check</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">Trust travels with the tier</h2>
          <div className="mt-5">
            <TrustMeter trust={account.trust} />
          </div>
          <dl className="mt-6">
            {(Object.keys(TRUST_LABELS) as Array<keyof typeof TRUST_LABELS>).map((k) => (
              <FieldRow
                key={k}
                label={TRUST_LABELS[k]}
                value={
                  <span className="tabular">
                    {account.trust.components[k]} · {Math.round(
                      ({
                        documentVerification: 35,
                        transactionIntegrity: 25,
                        qcConsistency: 15,
                        relationshipHistory: 15,
                        agentAttestation: 10,
                      }[k] as number),
                    )}
                    %
                  </span>
                }
              />
            ))}
          </dl>
        </Sheet>
        <Sheet>
          <Eyebrow>Documents</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">File on the desk</h2>
          <ul className="mt-4 divide-y divide-hair">
            {relatedDocs.length ? (
              relatedDocs.map((d) => (
                <li key={d.id} className="flex items-baseline justify-between gap-3 py-3">
                  <div>
                    <p>{d.title}</p>
                    <p className="meta mt-1">
                      {d.kind} · {Math.round(d.confidence * 100)}%
                    </p>
                  </div>
                  <span className="meta">{d.status}</span>
                </li>
              ))
            ) : (
              <li className="py-3 text-sm text-slate">No documents yet. Scan from the OCR desk.</li>
            )}
          </ul>
          <Link to="/scan" className={buttonClass("stamp", "mt-4")}>
            Scan into this file
          </Link>
        </Sheet>
      </div>
      <Sheet>
        <Eyebrow>Graph</Eyebrow>
        <h2 className="mt-2 font-display text-2xl">Durable relationships</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {peers.map((p) => (
            <Link
              key={p.id}
              to="/crm/$accountId"
              params={{ accountId: p.id }}
              className="border border-hair bg-sheet px-4 py-3"
            >
              <p className="meta">{roleLabel(p.role)}</p>
              <p className="font-display text-lg">{p.name}</p>
            </Link>
          ))}
        </div>
        {relatedLots.length ? (
          <ul className="mt-6 divide-y divide-hair">
            {relatedLots.map((l) => (
              <li key={l.id} className="py-3">
                <Link to="/market/$lotId" params={{ lotId: l.id }} className="flex justify-between gap-3">
                  <span>
                    {l.code} · {l.title}
                  </span>
                  <span className="tabular text-slate">{formatCents(l.pricePerLbCents)}/lb</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        {relatedEvents.length ? (
          <ol className="mt-6 space-y-3">
            {relatedEvents.map((e) => (
              <li key={e.id}>
                <p className="meta">{formatDate(e.at)} · {e.kind}</p>
                <p className="text-sm">{e.summary}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </Sheet>
    </div>
  );
}
