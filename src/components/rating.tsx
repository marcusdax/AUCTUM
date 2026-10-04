import { reviewStats, type Review } from "@/lib/exchange";
import { useT } from "@/lib/locale-store";
import { cn } from "@/lib/utils";

export function Marks({ value, label }: { value: number; label?: string }) {
  const filled = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1" aria-label={label ?? `${value.toFixed(1)} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={cn("inline-block h-2 w-3", i <= filled ? "bg-brass" : "bg-hair")} />
      ))}
    </span>
  );
}

export function RatingLine({ reviews }: { reviews: Review[] }) {
  const t = useT();
  const stats = reviewStats(reviews);
  if (!stats) return <span className="font-mono text-[10px] tracking-[0.14em] text-slate uppercase">{t("rev.emptyLine")}</span>;
  return (
    <span className="inline-flex items-center gap-2">
      <Marks value={stats.avg} />
      <span className="font-mono text-[10px] tracking-[0.14em] text-slate uppercase">
        {stats.avg.toFixed(1)} · {stats.count}
      </span>
    </span>
  );
}

export function RatingSummary({ reviews }: { reviews: Review[] }) {
  const t = useT();
  const stats = reviewStats(reviews);
  if (!stats) {
    return <p className="text-sm text-slate">{t("rev.none")}</p>;
  }
  const max = Math.max(...stats.dist, 1);
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-display text-5xl tabular leading-none">{stats.avg.toFixed(1)}</p>
          <div className="mt-3">
            <Marks value={stats.avg} label={`${stats.avg.toFixed(1)} of 5 from ${stats.count} buyer notes`} />
          </div>
          <p className="mt-2 meta">
            {stats.count} {t("rev.notTrust")}
          </p>
        </div>
        <dl className="min-w-40 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-slate">{t("rev.asFiled")}</dt>
            <dd className="font-mono tabular">{stats.asDescribed.toFixed(1)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-slate">{t("rev.handoff")}</dt>
            <dd className="font-mono tabular">{stats.fulfillment.toFixed(1)}</dd>
          </div>
        </dl>
      </div>
      <ol className="mt-6 space-y-1.5">
        {[5, 4, 3, 2, 1].map((mark) => {
          const n = stats.dist[mark - 1] ?? 0;
          return (
            <li key={mark} className="grid grid-cols-[1.5rem_1fr_2rem] items-center gap-2">
              <span className="font-mono text-[10px] text-slate">{mark}</span>
              <span className="h-1.5 bg-hair">
                <span className="block h-full bg-brass" style={{ width: `${Math.round((n / max) * 100)}%` }} />
              </span>
              <span className="text-right font-mono text-[10px] text-slate">{n}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
