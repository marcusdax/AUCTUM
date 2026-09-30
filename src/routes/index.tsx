import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AuctumSeal } from "@/components/auctum-mark";
import { LotCard } from "@/components/lot-card";
import { TrustBadge } from "@/components/trust-badge";
import { DoubleRule, Eyebrow, Sheet, Stamp, Stat, buttonClass } from "@/components/ui";
import { marketPulse } from "@/lib/data";
import { formatCents, formatDate, roleLabel } from "@/lib/format";
import { accountById, useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Compass });

function Compass() {
  const lots = useLedger((s) => s.lots);
  const events = useLedger((s) => s.events);
  const accounts = useLedger((s) => s.accounts);
  const stories = useLedger((s) => s.stories);
  const featured = lots.filter((l) => l.availability === "available" || l.availability === "sample").slice(0, 3);
  const karmic = accountById(accounts, "acc-karmic");

  return (
    <div className="space-y-8">
      <Sheet className="overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <AuctumSeal size={72} />
            <div>
              <Eyebrow>LotSpace · Compass</Eyebrow>
              <h1 className="mt-2 max-w-[14ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.92]">
                Every farm gets a Space.
              </h1>
            </div>
          </div>
          <Stamp className="-rotate-6">Verified origin</Stamp>
        </div>
        <p className="mt-6 max-w-[34ch] font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-snug">
          Every lot gets a ledger. Every relationship becomes durable.
        </p>
        <p className="mt-4 max-w-xl text-slate">
          Auctum Ledger is the verified spine. LotSpace is the social face. Karmic Circle operates Vietnam
          origin. A profile is also a trading instrument. A cupping result is also reputation.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/market" className={buttonClass("stamp")}>
            Open the market <ArrowRight size={16} />
          </Link>
          <Link to="/scan" className={buttonClass("ghost")}>
            Scan a document
          </Link>
        </div>
        <DoubleRule className="mt-10 mb-8" />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Stat label="C-market" value={formatCents(marketPulse.cMarketCents)} hint="Reference, not the whole account" />
          <Stat label="Lots on offer" value={marketPulse.lotsOnOffer} hint="Verified availability" />
          <Stat label="Farms verified" value={marketPulse.farmersVerified} hint="Cooperative coverage" />
          <Stat label="Locks this month" value={marketPulse.locksThisMonth} hint="Immutable snapshots" />
        </div>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <Eyebrow>Featured supply</Eyebrow>
              <h2 className="mt-1 font-display text-3xl">On the sheet</h2>
            </div>
            <Link to="/market" className="meta hover:text-ink">
              All lots
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {featured.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        </div>
        <aside className="space-y-6">
          {karmic ? (
            <Sheet>
              <Eyebrow>Flagship operator</Eyebrow>
              <h2 className="mt-2 font-display text-2xl">{karmic.name}</h2>
              <p className="mt-2 text-sm text-slate">{karmic.tagline}</p>
              <div className="mt-4">
                <TrustBadge trust={karmic.trust} />
              </div>
              <Link to="/spaces/$spaceId" params={{ spaceId: "karmic" }} className={cn("mt-5", buttonClass("ghost"))}>
                Enter the Space
              </Link>
            </Sheet>
          ) : null}
          <Sheet>
            <Eyebrow>Ledger pulse</Eyebrow>
            <h2 className="mt-2 font-display text-2xl">What just happened</h2>
            <ol className="mt-5 space-y-4">
              {events.slice(0, 5).map((ev) => (
                <li key={ev.id} className="border-t border-hair pt-3 first:border-0 first:pt-0">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-slate uppercase">
                    {formatDate(ev.at)} · {ev.kind}
                  </p>
                  <p className="mt-1 text-sm">{ev.summary}</p>
                </li>
              ))}
            </ol>
          </Sheet>
        </aside>
      </div>

      <Sheet padded={false} className="overflow-hidden">
        <div className="relative aspect-[21/9] min-h-48">
          <img src="/images/vn-highlands.jpg" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-ink/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
            <p className="font-mono text-[10px] tracking-[0.2em] text-stamp-soft uppercase">The craft</p>
            <h2 className="mt-2 max-w-[18ch] font-display text-3xl text-paper sm:text-4xl">
              Origin dignity is a design constraint.
            </h2>
            <Link to="/craft" className={cn("mt-4", buttonClass("solid"))}>
              Read the essay
            </Link>
          </div>
        </div>
      </Sheet>

      <div>
        <Eyebrow>Stories from followed Spaces</Eyebrow>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {stories.slice(0, 3).map((st) => {
            const who = accountById(accounts, st.accountId);
            return (
              <Link
                key={st.id}
                to="/stories"
                className="bg-paper p-5 shadow-[var(--shadow-sheet)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)]"
              >
                <p className="meta">{who ? roleLabel(who.role) : ""}</p>
                <h3 className="mt-2 font-display text-xl leading-snug">{st.title}</h3>
                <p className="mt-2 text-sm text-slate">{st.lede}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
