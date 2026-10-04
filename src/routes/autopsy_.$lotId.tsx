import { createFileRoute, Link } from "@tanstack/react-router";
import { EconomicAutopsy } from "@/components/autopsy";
import { BagPanel } from "@/components/bag";
import { EudrPanel } from "@/components/eudr-panel";
import { LotDesk } from "@/components/lot-desk";
import { TrustBadge } from "@/components/trust-badge";
import { TruePriceReceipt } from "@/components/true-price";
import { Eyebrow, FieldRow, Sheet, buttonClass } from "@/components/ui";
import { formatLabel, sellerById, stationFile } from "@/lib/exchange";
import { useExchange } from "@/lib/exchange-store";
import { formatCents, formatKg, roleLabel } from "@/lib/format";
import { accountById, lotById, useLedger } from "@/lib/store";

export const Route = createFileRoute("/autopsy_/$lotId")({ component: AutopsyPage });

function AutopsyPage() {
  const { lotId } = Route.useParams();
  const lots = useLedger((s) => s.lots);
  const accounts = useLedger((s) => s.accounts);
  const documents = useLedger((s) => s.documents);
  const listings = useExchange((s) => s.listings);
  const sellers = useExchange((s) => s.sellers);
  const lot = lotById(lots, lotId);

  if (!lot) {
    return (
      <Sheet>
        <h1 className="font-display text-3xl">No autopsy for this lot</h1>
        <Link to="/exchange" className="mt-4 inline-block meta hover:text-ink">
          Exchange
        </Link>
      </Sheet>
    );
  }

  const producer = accountById(accounts, lot.producerId);
  const exporter = accountById(accounts, lot.exporterId);
  const live = listings.filter((l) => l.lotId === lot.id && l.live);
  const primary = live[0];
  const docs = documents.filter((d) => d.lotId === lot.id && d.status === "accepted");
  const station = stationFile[lot.id];

  return (
    <div className="space-y-6">
      <Sheet>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Eyebrow>Public autopsy · {lot.code}</Eyebrow>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl">{lot.title}</h1>
            <p className="mt-3 max-w-xl text-slate">
              {lot.origin.farm}, {lot.origin.region}. {lot.origin.elevationM} m. The file is the lot.
            </p>
          </div>
          <div className="flex items-start gap-4">
            {producer ? <TrustBadge trust={producer.trust} /> : null}
          </div>
        </div>
        <p className="mt-4 font-mono text-sm">Cup {lot.cupScore.toFixed(2)} unrounded</p>
      </Sheet>

      <Sheet>
        <LotDesk lot={lot} />
      </Sheet>
      <Sheet>
        <EudrPanel lot={lot} />
      </Sheet>

      <Sheet>
        <BagPanel lot={lot} producer={producer} />
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-2">
        <Sheet padded={false} className="overflow-hidden">
          <img src={lot.image} alt="" className="aspect-[3/2] w-full object-cover" />
          <div className="p-6 sm:p-8">
            <p className="text-sm">{lot.notes}</p>
            <p className="mt-2 text-sm text-slate">{lot.flavor.join(" · ")}</p>
            <dl className="mt-6">
              <FieldRow label="Producer" value={producer?.name ?? "—"} />
              <FieldRow label="Operator" value={exporter?.name ?? "—"} />
              <FieldRow label="Process" value={lot.process} />
              <FieldRow label="Varietal" value={lot.varietal} />
              <FieldRow label="On sheet" value={formatKg(lot.weightKg)} />
              {station ? (
                <FieldRow label="Station" value={`${station.lat}, ${station.lng} · ${station.label}`} />
              ) : null}
            </dl>
            {producer ? (
              <Link to="/crm/$accountId" params={{ accountId: producer.id }} className="mt-4 inline-block meta hover:text-ink">
                {roleLabel(producer.role)} file
              </Link>
            ) : null}
          </div>
        </Sheet>
        <Sheet>
          {primary ? <TruePriceReceipt lot={lot} listing={primary} /> : <EconomicAutopsy lot={lot} />}
        </Sheet>
      </div>

      <Sheet>
        <Eyebrow>Where to buy</Eyebrow>
        <h2 className="mt-2 font-display text-2xl">Exchange + the seller's store</h2>
        {live.length === 0 ? (
          <p className="mt-3 text-sm text-slate">This lot is on the trade sheet, not yet on the Exchange.</p>
        ) : (
          <ul className="mt-5 divide-y divide-hair">
            {live.map((l) => {
              const seller = sellerById(sellers, l.sellerId);
              return (
                <li key={l.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <Link to="/exchange/seller/$sellerId" params={{ sellerId: l.sellerId }} className="font-display text-xl hover:text-stamp">
                      {seller?.name}
                    </Link>
                    <p className="text-sm text-slate">
                      {formatLabel(l.format)} · {l.bagGrams} g · {formatCents(l.priceCents)}
                    </p>
                  </div>
                  <Link to="/exchange/$listingId" params={{ listingId: l.id }} className={buttonClass("ghost")}>
                    Buy via Exchange
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/market/$lotId" params={{ lotId: lot.id }} className={buttonClass("ghost")}>
            Trade sheet
          </Link>
          <span className="inline-flex min-h-11 items-center px-4 text-sm text-slate">
            Tip the farmer — reserved. Direct payment is a later door.
          </span>
        </div>
      </Sheet>

      {docs.length ? (
        <Sheet>
          <Eyebrow>Retained file</Eyebrow>
          <ul className="mt-4 space-y-2">
            {docs.map((d) => (
              <li key={d.id} className="text-sm">
                {d.title} · accepted
              </li>
            ))}
          </ul>
        </Sheet>
      ) : null}
    </div>
  );
}
