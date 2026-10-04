import { POLICY } from "@/lib/policy";
import { currentVariance, meanVariance, type CalibrationPoint, withinTolerance } from "@/lib/education";
import { formatDate } from "@/lib/format";

export function DriftChart({ points }: { points: CalibrationPoint[] }) {
  const w = 560;
  const h = 160;
  const pad = 12;
  const min = -POLICY.cuppingVariance.probation;
  const max = POLICY.cuppingVariance.probation;
  const xs = points.map((_, i) => pad + (i / Math.max(points.length - 1, 1)) * (w - pad * 2));
  const y = (v: number) => pad + ((max - v) / (max - min)) * (h - pad * 2);
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${xs[i]!.toFixed(1)},${y(p.delta).toFixed(1)}`)
    .join(" ");
  const last = currentVariance(points);
  const mean = meanVariance(points);
  const ok = withinTolerance(last);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="kicker">Calibration · Cupper Tier 2</p>
          <h3 className="mt-1 font-display text-2xl">Variance vs. panel</h3>
        </div>
        <span className={`font-mono text-sm tabular ${ok ? "text-sage" : "text-stamp"}`}>
          {last >= 0 ? "+" : ""}
          {last.toFixed(2)} pts
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-40 w-full" role="img" aria-label="Calibration drift">
        <rect x="0" y={y(max)} width={w} height={y(min) - y(max)} fill="currentColor" className="text-sage/10" />
        <line x1="0" y1={y(0)} x2={w} y2={y(0)} stroke="currentColor" className="text-hair-strong" strokeWidth="1" />
        <path d={d} fill="none" stroke="currentColor" className="text-ink" strokeWidth="1.8" />
        {points.map((p, i) => (
          <circle key={p.id} cx={xs[i]} cy={y(p.delta)} r={i === points.length - 1 ? 3.5 : 2} className="fill-ink" />
        ))}
      </svg>
      <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div>
          <dt className="meta">Current</dt>
          <dd className="tabular">{last.toFixed(2)} pts</dd>
        </div>
        <div>
          <dt className="meta">Mean 90d</dt>
          <dd className="tabular">{mean.toFixed(2)} pts</dd>
        </div>
        <div>
          <dt className="meta">Sessions</dt>
          <dd className="tabular">{points.length}</dd>
        </div>
        <div>
          <dt className="meta">Status</dt>
          <dd>{ok ? "Within tolerance" : "Drift flagged"}</dd>
        </div>
      </dl>
      <p className="mt-4 text-xs text-slate">
        Last session {formatDate(points[points.length - 1]?.at ?? "")}. This data is private to you and
        your QC manager. It is never displayed on a public profile and never feeds Trust.
      </p>
    </div>
  );
}
