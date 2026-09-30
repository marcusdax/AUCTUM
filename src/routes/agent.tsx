import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Eyebrow, Sheet, Stat } from "@/components/ui";
import { AGENT_ID } from "@/lib/data";
import { formatCents, formatDate, roleLabel } from "@/lib/format";
import { accountById, useLedger } from "@/lib/store";

export const Route = createFileRoute("/agent")({ component: AgentPage });

function AgentPage() {
  const accounts = useLedger((s) => s.accounts);
  const tasks = useLedger((s) => s.tasks);
  const completeTask = useLedger((s) => s.completeTask);
  const agent = accountById(accounts, AGENT_ID);
  const open = tasks.filter((t) => t.status === "open");
  const done = tasks.filter((t) => t.status === "done");
  const territory = accounts.filter((a) => a.country === "Vietnam" && a.id !== AGENT_ID);

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Field agent OS</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">{agent?.name}</h1>
        <p className="mt-2 max-w-xl text-slate">{agent?.tagline}</p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Stat label="Open tasks" value={open.length} />
          <Stat label="Territory" value={territory.length} hint="Visible farms" />
          <Stat label="Commission pending" value={formatCents(agent?.outstandingCents ?? 0)} />
          <Stat label="Trust" value={agent?.trust.score ?? "—"} />
        </div>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-2">
        <Sheet>
          <Eyebrow>Today</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">Queue</h2>
          <ul className="mt-4 divide-y divide-hair">
            {open.map((t) => (
              <li key={t.id} className="flex flex-wrap items-start justify-between gap-3 py-3">
                <div>
                  <p className="meta">{t.kind} · due {formatDate(t.due)}</p>
                  <p className="mt-1">{t.title}</p>
                </div>
                <Button tone="ghost" className="min-h-9" onClick={() => completeTask(t.id)}>
                  Mark done
                </Button>
              </li>
            ))}
          </ul>
          {done.length ? (
            <p className="mt-4 text-sm text-slate">{done.length} completed this cycle.</p>
          ) : null}
        </Sheet>
        <Sheet>
          <Eyebrow>Territory</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">Cư M'gar desk</h2>
          <ul className="mt-4 divide-y divide-hair">
            {territory.map((a) => (
              <li key={a.id} className="py-3">
                <Link to="/spaces/$spaceId" params={{ spaceId: a.id.replace("acc-", "") }}>
                  <p className="font-display text-lg">{a.name}</p>
                  <p className="text-sm text-slate">
                    {roleLabel(a.role)} · trust {a.trust.score} · {a.trust.band}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Sheet>
      </div>
      <Sheet>
        <Eyebrow>Doctrine</Eyebrow>
        <p className="mt-2 max-w-prose font-display text-2xl leading-snug">
          The collector becomes an agent when the commission and the name are both visible.
        </p>
        <p className="mt-3 max-w-prose text-sm text-slate">
          Activation is identity verified, plus one ledger-backed economic event, plus one relationship
          within ninety days. Registration is not participation.
        </p>
      </Sheet>
    </div>
  );
}
