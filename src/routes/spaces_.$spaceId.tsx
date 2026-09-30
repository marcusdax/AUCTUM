import { createFileRoute, Link } from "@tanstack/react-router";
import { LotCard } from "@/components/lot-card";
import { TrustMeter } from "@/components/trust-badge";
import { Button, Eyebrow, FieldRow, Sheet, Stat } from "@/components/ui";
import { formatCents, formatDate, formatKg, roleLabel } from "@/lib/format";
import { useLedger } from "@/lib/store";
import { TRUST_LABELS } from "@/lib/trust";

export const Route = createFileRoute("/spaces_/$spaceId")({ component: SpacePage });

function SpacePage() {
  const { spaceId } = Route.useParams();
  const accounts = useLedger((s) => s.accounts);
  const lots = useLedger((s) => s.lots);
  const stories = useLedger((s) => s.stories);
  const documents = useLedger((s) => s.documents);
  const following = useLedger((s) => s.following);
  const follow = useLedger((s) => s.follow);
  const account = accounts.find((a) => a.id === `acc-${spaceId}` || a.id.replace("acc-", "") === spaceId);
  if (!account) {
    return (
      <Sheet>
        <h1 className="font-display text-3xl">Space unpublished</h1>
      </Sheet>
    );
  }
  const mine = lots.filter((l) => l.producerId === account.id || l.exporterId === account.id);
  const mineStories = stories.filter((s) => s.accountId === account.id);
  const mineDocs = documents.filter((d) => d.accountId === account.id);
  const followed = following.includes(account.id);

  return (
    <div className="space-y-6">
      <Sheet padded={false} className="overflow-hidden">
        <div className="relative min-h-56">
          <img src={account.image} alt="" className="h-64 w-full object-cover sm:h-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <p className="font-mono text-[10px] tracking-[0.2em] text-stamp-soft uppercase">
              {roleLabel(account.role)} · {account.district}
            </p>
            <h1 className="mt-1 font-display text-4xl text-paper sm:text-5xl">{account.name}</h1>
            <p className="mt-2 max-w-xl text-sm text-paper/80">{account.tagline}</p>
          </div>
        </div>
        <div className="grid gap-6 p-6 sm:grid-cols-4 sm:p-8">
          <Stat label="Trust" value={account.trust.score} hint={account.trust.band} />
          <Stat label="Volume YTD" value={formatKg(account.volumeKgYtd)} />
          <Stat label="AR" value={formatCents(account.outstandingCents)} hint="Outstanding" />
          <div className="flex items-end">
            <Button tone={followed ? "ghost" : "stamp"} onClick={() => follow(account.id)}>
              {followed ? "Following" : "Follow this Space"}
            </Button>
          </div>
        </div>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Sheet>
          <Eyebrow>Proof strip</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">Reputation that travels</h2>
          <div className="mt-5">
            <TrustMeter trust={account.trust} />
          </div>
          <dl className="mt-6">
            {(Object.keys(TRUST_LABELS) as Array<keyof typeof TRUST_LABELS>).map((k) => (
              <FieldRow
                key={k}
                label={TRUST_LABELS[k]}
                value={<span className="tabular">{account.trust.components[k]}</span>}
              />
            ))}
            <FieldRow label="On ledger since" value={formatDate(account.since)} />
            <FieldRow label="Language" value={account.language} />
          </dl>
          <Link
            to="/crm/$accountId"
            params={{ accountId: account.id }}
            className="mt-5 inline-block meta hover:text-ink"
          >
            Open CRM file
          </Link>
        </Sheet>
        <Sheet>
          <Eyebrow>Ledger</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">Lots from this Space</h2>
          {mine.length ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {mine.slice(0, 4).map((lot) => (
                <LotCard key={lot.id} lot={lot} />
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-slate">No lots on the sheet yet. Registration is not participation.</p>
          )}
        </Sheet>
      </div>

      {mineStories.length ? (
        <Sheet>
          <Eyebrow>Media wall</Eyebrow>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {mineStories.map((st) => (
              <article key={st.id} className="grid gap-3 sm:grid-cols-[140px_1fr]">
                <img src={st.image} alt="" className="aspect-[3/2] object-cover" />
                <div>
                  <h3 className="font-display text-xl">{st.title}</h3>
                  <p className="mt-1 text-sm text-slate">{st.lede}</p>
                </div>
              </article>
            ))}
          </div>
        </Sheet>
      ) : null}

      {mineDocs.length ? (
        <Sheet>
          <Eyebrow>Compliance file</Eyebrow>
          <ul className="mt-4 divide-y divide-hair">
            {mineDocs.map((d) => (
              <li key={d.id} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                <span>{d.title}</span>
                <span className="meta">{d.status}</span>
              </li>
            ))}
          </ul>
        </Sheet>
      ) : null}
    </div>
  );
}
