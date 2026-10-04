/** Archival lot seal — a geometric mark, not a fake scannable code. */
export function LotSeal({ seed, label }: { seed: string; label: string }) {
  const cells = pattern(seed, 7);
  return (
    <div className="inline-flex flex-col items-center gap-2">
      <svg viewBox="0 0 70 70" width="96" height="96" aria-hidden className="border border-ink bg-paper p-1">
        <rect x="0" y="0" width="70" height="70" fill="transparent" />
        {cells.map((on, i) => {
          const x = (i % 7) * 10;
          const y = Math.floor(i / 7) * 10;
          return on ? <rect key={i} x={x} y={y} width="10" height="10" fill="currentColor" /> : null;
        })}
      </svg>
      <p className="max-w-[12ch] text-center font-mono text-[9px] tracking-[0.14em] text-slate uppercase">{label}</p>
    </div>
  );
}

function pattern(seed: string, n: number) {
  const out: boolean[] = [];
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  for (let i = 0; i < n * n; i++) {
    h ^= i + 1;
    h = Math.imul(h, 16777619);
    const edge = i < n || i >= n * (n - 1) || i % n === 0 || i % n === n - 1;
    out.push(edge || (h >>> 0) % 3 !== 0);
  }
  return out;
}
