import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LotCard } from "@/components/lot-card";
import { Eyebrow, Sheet } from "@/components/ui";
import { useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/market")({ component: MarketPage });

const origins = ["All", "Vietnam", "Ethiopia", "Colombia", "Kenya"] as const;
const processes = ["All", "Washed", "Honey", "Natural"] as const;

function MarketPage() {
  const lots = useLedger((s) => s.lots);
  const [origin, setOrigin] = useState<(typeof origins)[number]>("All");
  const [process, setProcess] = useState<(typeof processes)[number]>("All");
  const filtered = useMemo(
    () =>
      lots.filter((l) => {
        if (origin !== "All" && l.origin.country !== origin) return false;
        if (process !== "All" && l.process !== process) return false;
        return true;
      }),
    [lots, origin, process],
  );

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Ledger</Eyebrow>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">The book, not a feed</h1>
        <p className="mt-3 max-w-xl text-slate">
          Ranked by availability, fit, and trust — never solely by engagement. A lot is a tradable
          object with a story, a cup, and a waterfall.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {origins.map((o) => (
            <FilterChip key={o} active={origin === o} onClick={() => setOrigin(o)}>
              {o}
            </FilterChip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {processes.map((p) => (
            <FilterChip key={p} active={process === p} onClick={() => setProcess(p)}>
              {p}
            </FilterChip>
          ))}
        </div>
      </Sheet>
      <p className="meta">
        {filtered.length} lot{filtered.length === 1 ? "" : "s"}
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((lot) => (
          <LotCard key={lot.id} lot={lot} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 border px-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-150",
        active ? "border-ink bg-ink text-paper" : "border-hair-strong bg-paper text-ink hover:border-ink",
      )}
    >
      {children}
    </button>
  );
}
