import { createFileRoute, Link } from "@tanstack/react-router";
import { assessEudr, EUDR_APPLIES, EUDR_CUTOFF, procedure, type EudrState } from "@/lib/eudr";
import { useLedger } from "@/lib/store";
import { Eyebrow, Sheet } from "@/components/ui";

export const Route = createFileRoute("/eudr")({ component: EudrDesk });

const order: EudrState[] = ["absent", "pin", "incomplete", "packet"];

const titles: Record<EudrState, string> = {
  absent: "No plot",
  pin: "Pin, not a plot",
  incomplete: "Packet open",
  packet: "Packet on the ledger",
};

function EudrDesk() {
  const lots = useLedger((s) => s.lots);
  const docs = useLedger((s) => s.documents);
  const rows = lots.map((lot) => ({ lot, file: assessEudr(lot, docs) }));
  const count = (state: EudrState) => rows.filter((row) => row.file.state === state).length;

  return (
    <div className="space-y-8">
      <Sheet>
        <Eyebrow>Regulation (EU) 2023/1115 · not a filing</Eyebrow>
        <h1 className="mt-3 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.92]">
          The plot, the risk, then the statement.
        </h1>
        <p className="mt-5 max-w-xl text-slate">
          Green coffee placed on the Union market has to be traceable to the plot, deforestation-free after {EUDR_CUTOFF}, and legally produced. Large and medium operators, and downstream operators and traders of any size, meet that duty from {EUDR_APPLIES}. A country being called low risk is not a reason to skip the plot. This page is the procedure and the state of these files. It does not submit a statement, and it is not legal advice.
        </p>
        <dl className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {order.map((state) => (
            <div key={state}>
              <dt className="meta">{titles[state]}</dt>
              <dd className="mt-1 font-display text-4xl leading-none tabular">{count(state)}</dd>
            </div>
          ))}
        </dl>
      </Sheet>

      <Sheet>
        <Eyebrow>Article 8 · before the coffee moves</Eyebrow>
        <ol className="mt-6">
          {procedure.map((step, index) => (
            <li key={step.article} className="grid grid-cols-[1rem_1fr] gap-4">
              <span className="relative flex justify-center">
                <span className="relative z-10 mt-1.5 size-2.5 bg-stamp" />
                {index < procedure.length - 1 ? <span className="absolute top-3 bottom-0 w-px bg-hair" /> : null}
              </span>
              <div className="pb-8">
                <p className="meta">{step.article}</p>
                <h2 className="mt-1 font-display text-3xl">{step.title}</h2>
                <p className="mt-2 max-w-xl text-sm text-slate">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="max-w-xl text-sm">
          A plot of 4 hectares or less may be a single point, latitude and longitude to at least six decimal places. Above 4 hectares the boundary is a polygon. Soluble coffee was brought into the annex in September 2026 and is not this book. These lots are green.
        </p>
      </Sheet>

      {order.map((state) => {
        const group = rows.filter((row) => row.file.state === state);
        if (!group.length) return null;
        return (
          <section key={state}>
            <Eyebrow>
              {titles[state]} · {group.length}
            </Eyebrow>
            <div className="mt-3 border-t border-brass bg-paper shadow-[var(--shadow-sheet)]">
              {group.map((row) => (
                <Link
                  key={row.lot.id}
                  to="/market/$lotId"
                  params={{ lotId: row.lot.id }}
                  className="grid gap-1 border-b border-hair px-5 py-4 last:border-0 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase">{row.lot.code}</span>
                  <span>
                    <span className="font-display text-2xl leading-none">{row.lot.title}</span>
                    <span className="mt-1 block text-sm text-slate">{row.file.headline}</span>
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-stamp uppercase">{row.file.mark}</span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
