import { formatCents } from "@/lib/format";
import type { Lot } from "@/lib/types";
import { FieldRow } from "./ui";

export function EconomicAutopsy({ lot }: { lot: Lot }) {
  const rows = [
    { label: "Farmgate", cents: lot.farmgateCents, hint: "Paid to the producer" },
    { label: "Logistics", cents: lot.logisticsCents, hint: "Mill, bagging, inland" },
    { label: "Premium", cents: lot.premiumCents, hint: "Quality / relationship" },
    { label: "FOB", cents: lot.fobCents, hint: "The offer on the sheet" },
  ];
  return (
    <div>
      <p className="kicker">Economic autopsy</p>
      <h3 className="mt-2 font-display text-2xl">Price is what it sells for.</h3>
      <p className="mt-2 max-w-prose text-sm text-slate">
        Value is everything that made it possible. This waterfall is the public proof layer — the same
        numbers live on the ledger.
      </p>
      <div className="mt-6 space-y-3">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm">{row.label}</span>
              <span className="font-mono text-sm tabular">{formatCents(row.cents)}/lb</span>
            </div>
            <div className="mt-1.5 h-1.5 bg-hair">
              <div
                className={row.label === "FOB" ? "h-full bg-stamp" : "h-full bg-ink"}
                style={{ width: `${Math.round((row.cents / lot.fobCents) * 100)}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-slate">{row.hint}</p>
          </div>
        ))}
      </div>
      <dl className="mt-6">
        <FieldRow label="Cup" value={`${lot.cupScore.toFixed(2)} · unrounded`} />
        <FieldRow label="Moisture" value={`${lot.moisturePct}%`} />
        <FieldRow label="Screen" value={lot.screen} />
        <FieldRow label="Harvest" value={lot.harvest} />
        <FieldRow label="Elevation" value={`${lot.origin.elevationM} m`} />
      </dl>
    </div>
  );
}
