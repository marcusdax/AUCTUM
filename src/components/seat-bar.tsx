import { AUDIENCES, useSeat, type Audience, type Tier } from "@/lib/seat";
import { cn } from "@/lib/utils";

export function SeatBar({ line }: { line: string | null }) {
  const audience = useSeat((s) => s.audience);
  const tier = useSeat((s) => s.tier);
  const setAudience = useSeat((s) => s.setAudience);
  const setTier = useSeat((s) => s.setTier);

  return (
    <div className="no-print mb-10">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <p className="max-w-xl font-display text-[1.65rem] leading-[1.15]">{line}</p>
        <div className="flex" role="group" aria-label="Access">
          {(["open", "desk"] as Tier[]).map((id) => (
            <button
              key={id}
              type="button"
              aria-pressed={tier === id}
              onClick={() => setTier(id)}
              className={cn(
                "min-h-11 border-b-2 px-3 font-mono text-[10px] tracking-[0.18em] uppercase",
                tier === id ? "border-stamp text-ink" : "border-transparent text-slate",
              )}
            >
              {id === "open" ? "Open" : "Desk"}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1" role="group" aria-label="Who is here">
        {AUDIENCES.map((row) => (
          <button
            key={row.id}
            type="button"
            aria-pressed={audience === row.id}
            onClick={() => setAudience(row.id as Audience)}
            className={cn(
              "min-h-11 text-left font-mono text-[10px] tracking-[0.16em] uppercase",
              audience === row.id ? "text-ink" : "text-slate",
            )}
          >
            {row.title}
          </button>
        ))}
      </div>
      <div className="folio-double mt-2" />
    </div>
  );
}
