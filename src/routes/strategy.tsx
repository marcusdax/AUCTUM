import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, Sheet, buttonClass } from "@/components/ui";

export const Route = createFileRoute("/strategy")({ component: StrategyPage });

const held = [
  ["One company", "Auctum is the brand. Atelier, Trading, Ledger, Flavor Foundry, and LotSpace sit under it. Older names survive only as labels."],
  ["The roof", "Value is co-created, not extracted. The trade line is verified, from origin. The seal is earned."],
  ["The floor", "Subsistence is priced and paid on a clock. It is not a mood, and it is not clawed back except for confirmed fraud."],
  ["Four registers", "House, Ledger, Counter, Verification. Never two of them on one sheet. No punk at origin."],
  ["The north star", "Weekly transacting roasters. A scan, a follow, or a save does not enter the board unless it becomes a sample, an order, or a payment."],
];

const ideas = [
  {
    n: "01",
    title: "The bag is the campaign",
    body: "Sample boxes and the tiered call list still open the trade. What a competitor cannot photocopy is the object on the cup: a mark, an autopsy, a Space. The story names a person and a lot. If it cannot open the file, it does not ship. If the file is still open, the bag says so and wears no seal.",
  },
  {
    n: "02",
    title: "A credential clears a claim",
    body: "Marketing does not approve a cup score. A document operator does. The number on the bag is the number that was accepted. Education is the gate at the moment of work, not a library someone is hoped to read.",
  },
  {
    n: "03",
    title: "The cadence is a person",
    body: "The old automation codes stay internal. The action is a touch queued to the agent, on a clock that depends on the role. Churn is the sum of silence, unpaid money, stage, trust, and a sample that has not come home. The remedy is a call, a document, or a sample. A quiet discount that cuts the floor is a breach, not a save.",
  },
  {
    n: "04",
    title: "Notes are not evidence",
    body: "A buyer may describe a handoff after it happens. That note lives on the seller. It does not move Trust, the band, or the seal. A tip, when that door opens, will be a payment with a name. It will not edit the score.",
  },
  {
    n: "05",
    title: "Introductions, not copies",
    body: "Other catalogs are places a person may be met: a marketplace, a directory, a weekly offer list. Their pages are not scraped onto this ledger. A lot enters when someone with standing files it. A roaster enters when they are named, qualified, and offered a box or a kit.",
  },
  {
    n: "06",
    title: "Settlement is part of the proof",
    body: "In Vietnam the payment is a push, matched on a memo. A repeated webhook does not pay twice. A callback that cannot be re-fetched does not move the balance. Unmatched money stays visible. It is not smoothed into the story.",
  },
  {
    n: "07",
    title: "The paired count",
    body: "Beside weekly transacting roasters, count autopsy opens that become a follow, a sample, or an order. A scan that dies on the page is a design failure, not a reach number.",
  },
];

function StrategyPage() {
  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Strategy · revised against the desk</Eyebrow>
        <h1 className="mt-2 max-w-[18ch] font-display text-4xl sm:text-5xl">The roof holds. The motion changes.</h1>
        <p className="mt-3 max-w-xl text-slate">
          Identity Core, 21 August 2026, still governs the words. This revision adds seven ideas the
          product can already enforce. Market-size figures stay off the page until they are re-verified.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Link to="/spaces" className={buttonClass("stamp")}>
            See the bag
          </Link>
          <Link to="/brief" className={buttonClass("ghost")}>
            The one-page leave-behind
          </Link>
        </div>
      </Sheet>

      <Sheet>
        <Eyebrow>Held</Eyebrow>
        <h2 className="mt-2 font-display text-3xl">What this revision does not touch</h2>
        <ul className="mt-6 divide-y divide-hair">
          {held.map(([title, body]) => (
            <li key={title} className="grid gap-2 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <p className="font-display text-xl">{title}</p>
              <p className="text-sm text-slate">{body}</p>
            </li>
          ))}
        </ul>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-2">
        {ideas.map((idea) => (
          <Sheet key={idea.n}>
            <p className="font-mono text-[11px] tracking-[0.16em] text-stamp">{idea.n}</p>
            <h2 className="mt-2 font-display text-2xl">{idea.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">{idea.body}</p>
          </Sheet>
        ))}
      </div>

      <Sheet>
        <Eyebrow>Retired from the kit</Eyebrow>
        <h2 className="mt-2 font-display text-3xl">What we will not do because it was once written down</h2>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="border-t border-hair pt-3">Copy another house’s catalog and call it supply.</li>
          <li className="border-t border-hair pt-3">Let an unmanned sequence send the first word to a farmer or a roaster.</li>
          <li className="border-t border-hair pt-3">Treat a discount as the remedy for churn.</li>
          <li className="border-t border-hair pt-3">Put a seal on a lot whose documents are still in review.</li>
          <li className="border-t border-hair pt-3">Count attention that never becomes trade.</li>
        </ul>
        <p className="mt-6 max-w-xl text-sm text-slate">
          Phase 2 is unchanged in order: clear the name, re-verify the call list, send the box, onboard
          supply. The bag mark goes out with the first lot that clears, not after a consumer wave.
          Cold Front still waits until the cup keeps winning blind.
        </p>
      </Sheet>
    </div>
  );
}
