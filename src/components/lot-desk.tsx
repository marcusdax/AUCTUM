import { assessEudr } from "@/lib/eudr";
import { formatCents, formatKg } from "@/lib/format";
import { useLedger } from "@/lib/store";
import type { Lot, LotState } from "@/lib/types";
import { Eyebrow } from "./ui";

const LB_PER_KG = 2.2046226218;

const rail: { id: LotState; label: string }[] = [
  { id: "verified", label: "On the file" },
  { id: "sample", label: "Sample out" },
  { id: "available", label: "On offer" },
  { id: "offer", label: "Offer open" },
  { id: "locked", label: "Locked" },
  { id: "contracted", label: "Contracted" },
  { id: "fulfilled", label: "Received" },
];

function at(state: LotState) {
  if (state === "draft" || state === "captured" || state === "pending") return -1;
  return rail.findIndex((step) => step.id === state);
}

export function LotDesk({ lot }: { lot: Lot }) {
  const kgEach = lot.bags > 0 ? lot.weightKg / lot.bags : lot.weightKg;
  const bagCents = Math.round(lot.pricePerLbCents * kgEach * LB_PER_KG);
  const here = at(lot.availability);
  const docs = useLedger((s) => s.documents);
  const eudr = assessEudr(lot, docs);

  return (
    <div>
      <Eyebrow>On this file</Eyebrow>
      <h2 className="mt-2 font-display text-3xl">The bag, the place, and what is not in the price.</h2>
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">One bag</p>
            <p className="mt-2 font-display text-4xl leading-none tabular">{formatCents(bagCents)}</p>
            <p className="mt-3 text-sm text-slate">
              {formatKg(kgEach)} in each of {lot.bags} bags, at {formatCents(lot.pricePerLbCents)} a pound. A small roaster can read the unit. This desk does not yet move a single bag across a border.
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">The plot</p>
            <p className="mt-2 font-display text-2xl leading-snug">{eudr.headline}</p>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">The fee</p>
            <p className="mt-2 font-display text-4xl leading-none tabular">{formatCents(lot.farmgateCents)}</p>
            <p className="mt-3 text-sm text-slate">Farmgate, on its own line. No per-kilo desk fee is folded into it.</p>
          </div>
        </div>
        <ol aria-label="Where the lot is">
          {rail.map((step, index) => (
            <li key={step.id} className="grid grid-cols-[1rem_1fr] gap-3">
              <span className="relative flex justify-center">
                <span
                  className={
                    index === here
                      ? "relative z-10 mt-1.5 size-2.5 bg-stamp"
                      : index < here
                        ? "relative z-10 mt-1.5 size-2 bg-ink"
                        : "relative z-10 mt-1.5 size-2 border border-hair-strong bg-paper"
                  }
                />
                {index < rail.length - 1 ? <span className="absolute top-3 bottom-0 w-px bg-hair" /> : null}
              </span>
              <span className={index === here ? "pb-4 font-display text-lg leading-none" : "pb-4 text-sm text-slate"}>
                {step.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="folio-double mt-2 flex flex-wrap items-end justify-between gap-4 pt-4">
        <p className="font-display text-5xl leading-none tabular">{lot.cupScore.toFixed(2)}</p>
        <p className="max-w-sm text-sm text-slate">
          Moisture {lot.moisturePct}%. Screen {lot.screen}. The score is the figure on the lot. No panel is named, so it cannot close a claim.
        </p>
      </div>
    </div>
  );
}
