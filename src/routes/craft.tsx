import { createFileRoute, Link } from "@tanstack/react-router";
import { AuctumSeal } from "@/components/auctum-mark";
import { DoubleRule, Eyebrow, Sheet, buttonClass } from "@/components/ui";

export const Route = createFileRoute("/craft")({ component: CraftPage });

function CraftPage() {
  return (
    <div className="space-y-6">
      <Sheet>
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>The Craft</Eyebrow>
            <h1 className="mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl">
              Museum quality is a way of looking.
            </h1>
          </div>
          <AuctumSeal size={64} />
        </div>
        <p className="mt-6 max-w-[46ch] font-display text-2xl leading-snug">
          Price is what a lot sells for. <em className="text-stamp">Value is everything that made it possible.</em>
        </p>
        <DoubleRule className="my-8" />
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="space-y-4 text-[15px] leading-relaxed">
            <p>
              LotSpace should be designed as a social ledger rather than a conventional social network.
              Auctum Ledger remains the verified data spine. Karmic Circle is the flagship verified seller
              and Vietnam origin operator. The product must connect social identity to actual transactions,
              not advertising-driven attention.
            </p>
            <p>
              The governing move is dual-purpose primitives. A profile is also a trading instrument. A
              story is also provenance. A follow is also a relationship signal. A cupping result is also
              reputation telemetry. A QR scan is also a demand bridge. A tip is also a trust event. A
              collector is also a field agent.
            </p>
            <p>
              This is the mechanism that makes the network economically coherent. No social object may
              contradict the verified record. The farmer is the author of the identity layer, not an
              object inside a QR trace.
            </p>
          </article>
          <article className="space-y-4 text-[15px] leading-relaxed">
            <h2 className="font-display text-2xl">Design constitution</h2>
            <ul className="space-y-3">
              {[
                ["One Ledger", "Social never overwrites the audit log."],
                ["Four Doors", "SMS, offline PWA, full web, and agents resolve to one identity."],
                ["Transaction-first", "Features create, accelerate, document, or retain trade."],
                ["Farmer sovereignty", "The Space is owned. Reputation is portable evidence."],
                ["Revenue before scale", "SaaS, verification, collector economics from the first release."],
                ["Origin dignity", "Real work, real names, documented economics."],
              ].map(([k, v]) => (
                <li key={k} className="grid grid-cols-[140px_1fr] gap-3 border-t border-hair pt-3">
                  <span className="meta">{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Sheet>
      <div className="grid gap-6 lg:grid-cols-2">
        <Sheet padded={false} className="overflow-hidden">
          <img src="/images/parchment-beds.jpg" alt="" className="aspect-[3/2] w-full object-cover" />
          <div className="p-6">
            <h2 className="font-display text-2xl">Gestalt on the sheet</h2>
            <p className="mt-2 text-sm text-slate">
              Proximity, similarity, continuity, figure-ground. Related facts sit together. Same-type
              cards share structure. The eye follows the left edge of the folio. Incomplete shapes still
              read as lots. The lot is figure; the sage field is ground.
            </p>
          </div>
        </Sheet>
        <Sheet padded={false} className="overflow-hidden">
          <img src="/images/cupping-table.jpg" alt="" className="aspect-[3/2] w-full object-cover" />
          <div className="p-6">
            <h2 className="font-display text-2xl">Fitts on the desk</h2>
            <p className="mt-2 text-sm text-slate">
              Primary actions are large and near the claim they govern. Sample, offer, and lock live on
              the lot, not in a distant toolbar. Touch targets hold 44px. The stamp is the infinite edge
              of the brand — you cannot miss it.
            </p>
          </div>
        </Sheet>
      </div>
      <Sheet>
        <Eyebrow>Typographic law</Eyebrow>
        <p className="mt-3 max-w-xl font-display text-2xl leading-snug">
          Zilla Slab for the voice. IBM Plex Sans for the body. IBM Plex Mono for the evidence.
        </p>
        <p className="mt-4 max-w-prose text-sm text-slate">
          Display type is reserved for claims that deserve a museum wall. Numbers that move are tabular.
          Headings are balanced. Body is pretty. The oxblood stamp is used the way a ledger uses red —
          rarely, and for the thing that must not be missed.
        </p>
        <Link to="/ecosystem" className={buttonClass("stamp", "mt-6")}>
          See the ecosystem
        </Link>
      </Sheet>
    </div>
  );
}
