import { createFileRoute, Link } from "@tanstack/react-router";
import { TrustBadge, TrustMeter } from "@/components/trust-badge";
import { Eyebrow, Sheet } from "@/components/ui";
import { bandLabel, roleLabel } from "@/lib/format";
import { useLedger } from "@/lib/store";
import { TRUST_LABELS, TRUST_WEIGHTS } from "@/lib/trust";
import type { TrustBand } from "@/lib/types";

export const Route = createFileRoute("/trust")({ component: TrustPage });

const policy: Record<TrustBand, string> = {
  sealed: "May publish price claims, lock, and appear in consumer autopsy.",
  verified: "May trade and sample. Price claims require a current QC sheet.",
  provisional: "Visible in market with a caution. No consumer QR until documents seal.",
  watch: "Offers held. Field audit required. OCR rejects accumulate here.",
  restricted: "Hidden from market. Human review of identity and receipts.",
};

function TrustPage() {
  const accounts = useLedger((s) => s.accounts);
  const ranked = [...accounts].sort((a, b) => b.trust.score - a.trust.score);
  const flagship = ranked[0];

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Trust desk</Eyebrow>
        <h1 className="mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl">
          Honesty that stays with the tier
        </h1>
        <p className="mt-3 max-w-xl text-slate">
          Trust is not a badge you buy. It is a weighted evidence score: documents, payments, cup
          consistency, relationship history, and the field agent who signed the capture.
        </p>
      </Sheet>

      <div className="grid gap-4 sm:grid-cols-5">
        {(Object.keys(TRUST_LABELS) as Array<keyof typeof TRUST_LABELS>).map((k) => (
          <Sheet key={k} className="sm:px-5 sm:py-5">
            <p className="meta">{Math.round(TRUST_WEIGHTS[k] * 100)}%</p>
            <h2 className="mt-2 font-display text-xl leading-snug">{TRUST_LABELS[k]}</h2>
          </Sheet>
        ))}
      </div>

      <Sheet>
        <Eyebrow>Policy</Eyebrow>
        <h2 className="mt-2 font-display text-2xl">What a band is allowed to do</h2>
        <dl className="mt-5 divide-y divide-hair">
          {(Object.keys(policy) as TrustBand[]).map((b) => (
            <div key={b} className="grid gap-2 py-3 sm:grid-cols-[140px_1fr]">
              <dt className="font-mono text-[11px] tracking-[0.16em] uppercase">{bandLabel(b)}</dt>
              <dd className="text-sm">{policy[b]}</dd>
            </div>
          ))}
        </dl>
      </Sheet>

      {flagship ? (
        <Sheet>
          <Eyebrow>Highest seal</Eyebrow>
          <div className="mt-2 grid gap-6 lg:grid-cols-[1fr_220px]">
            <div>
              <h2 className="font-display text-3xl">{flagship.name}</h2>
              <p className="mt-2 text-slate">{flagship.tagline}</p>
            </div>
            <TrustMeter trust={flagship.trust} />
          </div>
        </Sheet>
      ) : null}

      <Sheet padded={false}>
        <ul>
          {ranked.map((a) => (
            <li key={a.id} className="border-b border-hair last:border-0">
              <Link
                to="/crm/$accountId"
                params={{ accountId: a.id }}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-sheet"
              >
                <div>
                  <p className="font-display text-xl">{a.name}</p>
                  <p className="text-xs text-slate">
                    {roleLabel(a.role)} · {a.locale}
                  </p>
                </div>
                <TrustBadge trust={a.trust} />
              </Link>
            </li>
          ))}
        </ul>
      </Sheet>
    </div>
  );
}
