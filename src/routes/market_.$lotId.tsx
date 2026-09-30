import { createFileRoute, Link } from "@tanstack/react-router";
import { EconomicAutopsy } from "@/components/autopsy";
import { TrustBadge } from "@/components/trust-badge";
import { Button, Eyebrow, FieldRow, Sheet } from "@/components/ui";
import { formatCents, formatKg, roleLabel, stateLabel } from "@/lib/format";
import { accountById, useLedger } from "@/lib/store";

export const Route = createFileRoute("/market_/$lotId")({ component: LotPage });

function LotPage() {
  const { lotId } = Route.useParams();
  const lots = useLedger((s) => s.lots);
  const accounts = useLedger((s) => s.accounts);
  const stories = useLedger((s) => s.stories);
  const requestSample = useLedger((s) => s.requestSample);
  const expressInterest = useLedger((s) => s.expressInterest);
  const lockPrice = useLedger((s) => s.lockPrice);
  const follow = useLedger((s) => s.follow);
  const following = useLedger((s) => s.following);
  const lot = lots.find((l) => l.id === lotId);
  if (!lot) {
    return (
      <Sheet>
        <h1 className="font-display text-3xl">Lot not on the sheet</h1>
        <Link to="/market" className="mt-4 inline-block meta hover:text-ink">
          Return to market
        </Link>
      </Sheet>
    );
  }
  const producer = accountById(accounts, lot.producerId);
  const exporter = accountById(accounts, lot.exporterId);
  const related = stories.filter((s) => s.lotId === lot.id);
  const followed = producer ? following.includes(producer.id) : false;

  return (
    <div className="space-y-6">
      <Sheet padded={false} className="overflow-hidden">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-64">
            <img src={lot.image} alt="" className="h-full max-h-[520px] w-full object-cover" />
          </div>
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <Eyebrow>{lot.code}</Eyebrow>
              <h1 className="mt-2 font-display text-4xl">{lot.title}</h1>
              <p className="mt-2 text-slate">
                {lot.origin.farm} · {lot.origin.region}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="border border-ink px-2 py-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                  {stateLabel(lot.availability)}
                </span>
                {producer ? <TrustBadge trust={producer.trust} /> : null}
              </div>
              <p className="mt-5 text-sm">{lot.notes}</p>
              <p className="mt-3 text-sm text-slate">{lot.flavor.join(" · ")}</p>
            </div>
            <div className="mt-8">
              <p className="meta">FOB</p>
              <p className="font-display text-4xl tabular">{formatCents(lot.pricePerLbCents)}/lb</p>
              <p className="mt-1 text-sm text-slate">
                {formatKg(lot.weightKg)} · {lot.bags} bags · cup {lot.cupScore.toFixed(2)}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button
                  tone="stamp"
                  disabled={!lot.sampleReady || lot.availability === "locked"}
                  onClick={() => requestSample(lot.id)}
                >
                  Request sample
                </Button>
                <Button tone="ghost" onClick={() => expressInterest(lot.id)}>
                  Open offer
                </Button>
                <Button
                  tone="ghost"
                  disabled={lot.availability === "locked"}
                  onClick={() => lockPrice(lot.id)}
                >
                  Price lock
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-2">
        <Sheet>
          <EconomicAutopsy lot={lot} />
        </Sheet>
        <Sheet>
          <Eyebrow>People behind the lot</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">Identity before the claim</h2>
          <div className="mt-5 space-y-4">
            {producer ? (
              <div className="border-t border-hair pt-4">
                <Link to="/crm/$accountId" params={{ accountId: producer.id }} className="block">
                  <p className="meta">{roleLabel(producer.role)}</p>
                  <p className="font-display text-xl">{producer.name}</p>
                  <p className="text-sm text-slate">{producer.tagline}</p>
                </Link>
                <div className="mt-3 flex gap-2">
                  <TrustBadge trust={producer.trust} size="sm" />
                  <Button
                    type="button"
                    tone="quiet"
                    className="min-h-9 px-2"
                    onClick={() => follow(producer.id)}
                  >
                    {followed ? "Following" : "Follow"}
                  </Button>
                </div>
              </div>
            ) : null}
            {exporter ? (
              <Link
                to="/spaces/$spaceId"
                params={{ spaceId: exporter.id.replace("acc-", "") }}
                className="block border-t border-hair pt-4"
              >
                <p className="meta">{roleLabel(exporter.role)}</p>
                <p className="font-display text-xl">{exporter.name}</p>
                <p className="text-sm text-slate">{exporter.tagline}</p>
              </Link>
            ) : null}
          </div>
          <dl className="mt-6">
            <FieldRow label="Process" value={lot.process} />
            <FieldRow label="Varietal" value={lot.varietal} />
            <FieldRow label="Farmgate" value={`${formatCents(lot.farmgateCents)}/lb`} />
            <FieldRow label="Followers" value={lot.followers} />
          </dl>
        </Sheet>
      </div>

      {related.length ? (
        <Sheet>
          <Eyebrow>Stories</Eyebrow>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((st) => (
              <div key={st.id}>
                <h3 className="font-display text-xl">{st.title}</h3>
                <p className="mt-1 text-sm text-slate">{st.lede}</p>
              </div>
            ))}
          </div>
        </Sheet>
      ) : null}
    </div>
  );
}
