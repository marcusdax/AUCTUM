import { Link } from "@tanstack/react-router";
import { formatCents, formatKg, stateLabel } from "@/lib/format";
import { accountById, useLedger } from "@/lib/store";
import type { Lot } from "@/lib/types";
import { TrustBadge } from "./trust-badge";

export function LotCard({ lot }: { lot: Lot }) {
  const accounts = useLedger((s) => s.accounts);
  const producer = accountById(accounts, lot.producerId);
  return (
    <Link
      to="/market/$lotId"
      params={{ lotId: lot.id }}
      className="group grid overflow-hidden bg-paper shadow-[var(--shadow-sheet)] transition-[box-shadow,transform] duration-200 ease-[var(--ease-out-folio)] hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-raw">
        <img
          src={lot.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-folio)] group-hover:scale-[1.03]"
        />
        <span className="absolute top-3 left-3 bg-paper/92 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
          {stateLabel(lot.availability)}
        </span>
      </div>
      <div className="flex flex-col gap-3 px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <p className="font-mono text-[10px] tracking-[0.18em] text-slate uppercase">{lot.code}</p>
          {producer ? <TrustBadge trust={producer.trust} size="sm" /> : null}
        </div>
        <h3 className="font-display text-xl leading-tight">{lot.title}</h3>
        <p className="text-sm text-slate">
          {lot.origin.region} · {lot.process} · {lot.varietal}
        </p>
        <div className="mt-1 flex items-end justify-between border-t border-hair pt-3">
          <div>
            <p className="meta">FOB</p>
            <p className="font-display text-lg tabular">{formatCents(lot.pricePerLbCents)}/lb</p>
          </div>
          <p className="text-sm text-slate tabular">{formatKg(lot.weightKg)}</p>
        </div>
      </div>
    </Link>
  );
}
