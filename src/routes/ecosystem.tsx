import { createFileRoute, Link } from "@tanstack/react-router";
import { AuctumSeal } from "@/components/auctum-mark";
import { Eyebrow, Sheet, buttonClass } from "@/components/ui";
import { PERSONAS } from "@/lib/desk";

export const Route = createFileRoute("/ecosystem")({ component: EcosystemPage });

const contexts = [
  { name: "Catalog", owns: "Lots, attributes, availability", event: "LotCreated", worth: "A lot is a file, not a product card." },
  { name: "CRM", owns: "Organizations, contacts, graph", event: "RelationshipQualified", worth: "The clock tells you who to write. It does not send the letter." },
  { name: "Samples", owns: "Inventory and logistics", event: "SampleShipped", worth: "A sample is a step. It comes home or it counts against the file." },
  { name: "Orders", owns: "Locks, contracts, fulfillment", event: "PriceLocked", worth: "A lock is a sentence. It does not get revised in the caption." },
  { name: "Billing", owns: "Invoices, VietQR, fees", event: "PaymentSettled", worth: "The memo matches the money, or the money sits in suspense." },
  { name: "Spaces", owns: "Profiles, themes, modules", event: "SpaceVerified", worth: "The person owns the room. The story has to open a lot." },
  { name: "Feeds", owns: "Stories, follows, ranking", event: "StoryPublished", worth: "Attention that cannot point at a file does not rank as proof." },
  { name: "Reputation", owns: "Cupping, badges, bands", event: "ScoreRecorded", worth: "Hundredths stay. A credential accepts them." },
  { name: "Connections", owns: "Threads, tips, intros", event: "TipSettled", worth: "A tip is a payment. A note is a handoff. Neither edits Trust." },
  { name: "Documents", owns: "OCR intake, WORM export", event: "DocumentAccepted", worth: "Extraction is a proposal. Accept is a person." },
  { name: "Exchange", owns: "Sellers, listings, affiliate clicks", event: "BuyerClickedProduct", worth: "The seller is told. The platform does not pretend to be the store." },
  { name: "Foundry", owns: "Method class, cup, packet", event: "ProtocolIssued", worth: "The menu is open. The packet is not. That is the point of the coming door." },
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
              Auctum is the brand. The Ledger is the spine. LotSpace is the face. Trading is the origin
              house. A social object that cannot point at the record does not ship. The revised motion
              is on the strategy sheet.
            </p>
            <Link to="/strategy" className={buttonClass("ghost", "mt-4")}>
              Read the revision
            </Link>
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
              <p className="mt-2 text-sm">{c.worth}</p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-stamp uppercase">{c.event}</p>
            </div>
          ))}
        </div>
      </Sheet>

      <Sheet>
        <Eyebrow>Who it is for</Eyebrow>
        <h2 className="mt-2 font-display text-3xl">A different value for each kind of person</h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2">
          {PERSONAS.map((persona) => (
            <li key={persona.role} className="border-t border-hair pt-4">
              <p className="meta">{persona.role}</p>
              <h3 className="mt-1 font-display text-2xl">{persona.title}</h3>
              <p className="mt-2 text-sm">{persona.value}</p>
              <p className="mt-2 text-sm text-slate">{persona.not}</p>
            </li>
          ))}
        </ul>
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
