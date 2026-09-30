import { createFileRoute, Link } from "@tanstack/react-router";
import { AuctumSeal } from "@/components/auctum-mark";
import { Eyebrow, Sheet, buttonClass } from "@/components/ui";

export const Route = createFileRoute("/ecosystem")({ component: EcosystemPage });

const contexts = [
  { name: "Catalog", owns: "Lots, attributes, availability", event: "LotCreated" },
  { name: "CRM", owns: "Organizations, contacts, graph", event: "RelationshipQualified" },
  { name: "Samples", owns: "Inventory and logistics", event: "SampleShipped" },
  { name: "Orders", owns: "Locks, contracts, fulfillment", event: "PriceLocked" },
  { name: "Billing", owns: "Invoices, VietQR, fees", event: "PaymentSettled" },
  { name: "Spaces", owns: "Profiles, themes, modules", event: "SpaceVerified" },
  { name: "Feeds", owns: "Stories, follows, ranking", event: "StoryPublished" },
  { name: "Reputation", owns: "Cupping, badges, bands", event: "ScoreRecorded" },
  { name: "Connections", owns: "Threads, tips, intros", event: "TipSettled" },
  { name: "Documents", owns: "OCR intake, WORM export", event: "DocumentAccepted" },
];

const doors = [
  { tier: "Tier 0", name: "SMS / USSD / IVR", for: "Feature phones, price and status checks" },
  { tier: "Tier 1", name: "Offline PWA / Zalo", for: "Low-end phones, queue-sync, compressed media" },
  { tier: "Tier 2", name: "Full social web", for: "Spaces, video, cupping, the market" },
  { tier: "Agent", name: "Field application", for: "Capture, verification, commissions" },
];

function EcosystemPage() {
  return (
    <div className="space-y-6">
      <Sheet>
        <div className="flex flex-wrap items-start gap-5">
          <AuctumSeal size={80} />
          <div>
            <Eyebrow>Ecosystem</Eyebrow>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl">One ledger. Four doors.</h1>
            <p className="mt-3 max-w-xl text-slate">
              Auctum Ledger is the event-driven spine. LotSpace is the social face. Karmic Circle is the
              origin operator. Nothing in the network is allowed to disagree with the record.
            </p>
          </div>
        </div>
      </Sheet>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {doors.map((d) => (
          <Sheet key={d.tier} className="sm:px-5">
            <p className="meta">{d.tier}</p>
            <h2 className="mt-2 font-display text-2xl">{d.name}</h2>
            <p className="mt-2 text-sm text-slate">{d.for}</p>
          </Sheet>
        ))}
      </div>

      <Sheet>
        <Eyebrow>Bounded contexts</Eyebrow>
        <h2 className="mt-2 font-display text-3xl">The map</h2>
        <div className="mt-6 grid gap-px bg-hair sm:grid-cols-2">
          {contexts.map((c) => (
            <div key={c.name} className="bg-paper p-5">
              <h3 className="font-display text-xl">{c.name}</h3>
              <p className="mt-1 text-sm text-slate">{c.owns}</p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-stamp uppercase">{c.event}</p>
            </div>
          ))}
        </div>
      </Sheet>

      <Sheet padded={false} className="overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <img src="/images/jute-warehouse.jpg" alt="" className="aspect-[3/2] h-full w-full object-cover" />
          <div className="p-6 sm:p-8">
            <Eyebrow>Reference flow</Eyebrow>
            <ol className="mt-4 space-y-2 text-sm">
              {[
                "Farmer → agent capture",
                "Space verification → LotCreated",
                "Feed projection → roaster discovers",
                "SampleRequested → fulfillment",
                "Offer → PriceLocked → Order",
                "Billing → Payment → Autopsy updated",
                "Consumer scans → Follow / Tip",
                "Connection event → future trade",
              ].map((step, i) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-2">
                  <span className="font-mono text-[11px] text-slate">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <Link to="/market" className={buttonClass("stamp", "mt-8")}>
              Enter the market
            </Link>
          </div>
        </div>
      </Sheet>
    </div>
  );
}
