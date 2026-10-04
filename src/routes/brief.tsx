import { createFileRoute, Link } from "@tanstack/react-router";
import { AuctumSeal } from "@/components/auctum-mark";

export const Route = createFileRoute("/brief")({ component: BriefPage });

const doors = [
  ["Ledger", "The name, the cup, and the price."],
  ["LotSpace", "The person. The story opens the lot."],
  ["Learn", "What you may do, and until when."],
  ["Scan", "A page becomes a proposal."],
  ["Craft", "A method, or a cup. The recipe stays in the packet."],
];

function BriefPage() {
  return (
    <article className="brief mx-auto min-h-dvh max-w-[8.5in] bg-paper px-8 py-8 text-ink sm:px-12 sm:py-10">
      <style>{`
        @media print {
          @page { size: letter; margin: 0.45in; }
          html, body { background: white !important; }
          .brief { max-width: none; min-height: auto; padding: 0; box-shadow: none; }
          .no-print { display: none !important; }
        }
      `}</style>
      <header className="flex items-start justify-between gap-6">
        <div className="flex items-center gap-3">
          <AuctumSeal size={36} />
          <div>
            <p className="font-display text-xl leading-none">Auctum Ledger</p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-stamp uppercase">Verified, from origin</p>
          </div>
        </div>
        <p className="text-right font-mono text-[10px] tracking-[0.14em] text-slate uppercase">
          Leave-behind · one sheet
          <button type="button" className="no-print mt-2 block min-h-11 text-ink underline decoration-stamp underline-offset-4" onClick={() => window.print()}>
            Print
          </button>
        </p>
      </header>

      <h1 className="mt-8 max-w-[18ch] font-display text-[2.6rem] leading-[0.95]">
        Value is co-created, not extracted.
      </h1>
      <p className="mt-4 max-w-[42ch] text-[15px]">
        The bag is the campaign. The autopsy is the proof. The lock is what a subscription pays for.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-ink pt-4 sm:grid-cols-5">
        {doors.map(([title, line]) => (
          <div key={title}>
            <p className="font-display text-lg leading-tight">{title}</p>
            <p className="mt-1 text-xs text-slate">{line}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 border-t border-hair pt-4 sm:grid-cols-2">
        <section>
          <p className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">Open · free to read</p>
          <p className="mt-2 text-sm">
            The lot, the Space, the lesson, the scan proposal, and the menu. A drinker and a farmer can see the file. They are not the customer.
          </p>
        </section>
        <section>
          <p className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">Desk · the subscription</p>
          <p className="mt-2 text-sm">
            Request a sample. Open an offer. Lock a price. Accept a document onto the ledger. The roaster, the importer, and the exporter pay for the right to act.
          </p>
        </section>
      </div>

      <section className="mt-6 border-t border-hair pt-4">
        <p className="font-mono text-[10px] tracking-[0.16em] uppercase">Deliberately not on this sheet</p>
        <p className="mt-2 text-sm text-slate">
          A live card charge. A live bank settlement. An orderable fermentation protocol. A market-size claim. Weekly transacting roasters is the only number this desk will put on a board, and it is not invented here.
        </p>
      </section>

      <section className="mt-6 border-t border-ink pt-4">
        <p className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">The ask</p>
        <p className="mt-2 font-display text-2xl leading-snug">
          Three to five named sellers. Lots whose documents can clear. A bag whose mark opens this file.
        </p>
      </section>

      <footer className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-hair pt-4">
        <p className="max-w-[46ch] text-xs text-slate">
          This is a desk you can hold. It is not a company that has cleared customs, signed those sellers, or taken a payment. Nothing on the sheet is billed.
        </p>
        <Link to="/" className="no-print font-mono text-[10px] tracking-[0.14em] uppercase">
          Return to the desk
        </Link>
      </footer>
    </article>
  );
}
