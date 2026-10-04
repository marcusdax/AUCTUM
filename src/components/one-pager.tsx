import { QrMark } from "./bag";
import { bagCopy } from "@/lib/bag";
import { formatCents } from "@/lib/format";
import { floorLine, humanNarrative } from "@/lib/print-copy";
import type { Account, Lot } from "@/lib/types";

export type PrintFormat = "sheet" | "card" | "menu" | "label";

export const PRINT_FORMATS: { id: PrintFormat; title: string; use: string }[] = [
  { id: "sheet", title: "One-pager", use: "A letter left on the bar or sent with a sample." },
  { id: "card", title: "Counter card", use: "Stands beside the cups. The mark is large enough to scan across the bar." },
  { id: "menu", title: "Menu slip", use: "One lot, one line, on the menu." },
  { id: "label", title: "Bag label", use: "The smallest piece that still opens the lot." },
];

function Mark({ logo, who }: { logo: string | null; who: string }) {
  if (logo) return <img src={logo} alt="" className="h-12 w-auto max-w-[120px] object-contain outline-none" />;
  return <p className="font-mono text-[10px] tracking-[0.18em] text-stamp uppercase">{who}</p>;
}

export function PrintPiece({
  format,
  lot,
  producer,
  shopName,
  line,
  logo,
}: {
  format: PrintFormat;
  lot: Lot;
  producer?: Account;
  shopName: string;
  line: string;
  logo: string | null;
}) {
  const copy = bagCopy(lot, producer?.name ?? lot.origin.farm);
  const who = shopName.trim() || "This counter";
  const person = humanNarrative(lot, producer);
  const floor = floorLine(lot, producer);
  const extra = line.trim();

  if (format === "label") {
    return (
      <article className="one-pager w-[70mm] border-t border-brass bg-paper p-4 text-ink shadow-[var(--shadow-sheet)]">
        <Mark logo={logo} who={who} />
        <p className="mt-3 font-display text-xl leading-tight">{producer?.name ?? lot.origin.farm}</p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-slate uppercase">{lot.code}</p>
        <p className="mt-2 text-sm">Floor {formatCents(lot.farmgateCents)}/lb</p>
        <div className="mt-3">
          <QrMark lotId={lot.id} size={96} />
        </div>
      </article>
    );
  }

  if (format === "menu") {
    return (
      <article className="one-pager flex w-[92mm] items-end justify-between gap-3 border-t border-brass bg-paper p-4 text-ink shadow-[var(--shadow-sheet)]">
        <div>
          <Mark logo={logo} who={who} />
          <h2 className="mt-3 font-display text-2xl leading-tight">{copy.headline}</h2>
          <p className="mt-2 text-sm">{floor}</p>
          {extra ? <p className="mt-1 text-sm text-slate">{extra}</p> : null}
        </div>
        <QrMark lotId={lot.id} size={88} />
      </article>
    );
  }

  if (format === "card") {
    return (
      <article className="one-pager grid w-[148mm] gap-6 border-t border-brass bg-paper p-6 text-ink shadow-[var(--shadow-sheet)] sm:grid-cols-[1fr_auto]">
        <div>
          <Mark logo={logo} who={who} />
          <h2 className="mt-4 font-display text-3xl leading-[0.95]">{copy.headline}</h2>
          <p className="mt-3 text-sm">{person}</p>
          {extra ? <p className="mt-2 text-sm text-slate">{extra}</p> : null}
        </div>
        <QrMark lotId={lot.id} size={132} />
      </article>
    );
  }

  return (
    <article className="one-pager border-t border-brass bg-paper px-8 py-8 text-ink shadow-[var(--shadow-sheet)]">
      <div className="flex items-start justify-between gap-6">
        <Mark logo={logo} who={who} />
        <p className="text-right font-mono text-[10px] tracking-[0.16em] text-slate uppercase">{lot.code}</p>
      </div>
      <h2 className="mt-8 max-w-[18ch] font-display text-4xl leading-[0.95]">{copy.headline}</h2>
      <p className="mt-4 max-w-md font-display text-xl leading-snug">{copy.lede}</p>
      <p className="mt-6 meta">The person</p>
      <p className="mt-2 max-w-lg text-sm">{person}</p>
      <p className="mt-3 max-w-lg text-sm">
        A later sale can change the share. It does not take the floor back. The cup stays {lot.cupScore.toFixed(2)}, unrounded.
      </p>
      {extra ? <p className="mt-3 max-w-lg text-sm text-slate">{extra}</p> : null}
      <div className="mt-8 flex items-end justify-between gap-6 border-t border-hair pt-6">
        <QrMark lotId={lot.id} size={148} />
        <p className="max-w-[22ch] text-right font-mono text-[10px] tracking-[0.14em] text-slate uppercase">
          {who}
          <span className="mt-2 block normal-case tracking-normal">Quiet paper around the mark. The logo stays beside it. The address is this lot.</span>
        </p>
      </div>
    </article>
  );
}
