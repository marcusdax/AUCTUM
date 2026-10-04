import { truePrice, type Listing } from "@/lib/exchange";
import { formatCents } from "@/lib/format";
import { sharePctForScore } from "@/lib/policy";
import type { Lot } from "@/lib/types";
import { FieldRow } from "./ui";

export function TruePriceReceipt({ lot, listing }: { lot: Lot; listing: Listing }) {
  const rows = truePrice(lot, listing);
  const share = sharePctForScore(lot.cupScore);
  const max = listing.priceCents || 1;
  return (
    <div>
      <p className="kicker">True price receipt</p>
      <h3 className="mt-2 font-display text-2xl">Show the math. Never collapse it.</h3>
      <p className="mt-2 max-w-prose text-sm text-slate">
        Farmgate, movement, premium, seller cost, and the price on the bag — for this unit, not a
        marketing average. Revenue share at cup {lot.cupScore.toFixed(2)} is {share}%.
      </p>
      <div className="mt-6 space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm">{row.label}</span>
              <span className="font-mono text-sm tabular">{formatCents(row.cents)}</span>
            </div>
            <div className="mt-1.5 h-1.5 bg-hair">
              <div
                className={
                  row.tone === "stamp" ? "h-full bg-stamp" : row.tone === "brass" ? "h-full bg-brass" : "h-full bg-ink"
                }
                style={{ width: `${Math.min(100, Math.round((row.cents / max) * 100))}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-slate">{row.hint}</p>
          </div>
        ))}
      </div>
      <dl className="mt-6">
        <FieldRow label="Cup" value={`${lot.cupScore.toFixed(2)} · unrounded`} />
        <FieldRow label="Moisture" value={`${lot.moisturePct}%`} />
        <FieldRow label="Unit" value={`${listing.bagGrams} g · ${listing.sku}`} />
        <FieldRow label="Harvest" value={lot.harvest} />
        <FieldRow label="Elevation" value={`${lot.origin.elevationM} m`} />
      </dl>
    </div>
  );
}
