import { createFileRoute, Link } from "@tanstack/react-router";
import { LotSeal } from "@/components/lot-seal";
import { FunnelRail } from "@/components/funnel";
import { Eyebrow, FieldRow, Sheet, Stamp, buttonClass } from "@/components/ui";
import { listingById, sellerById } from "@/lib/exchange";
import { useExchange } from "@/lib/exchange-store";
import { formatCents, formatDate } from "@/lib/format";
import { lotById, useLedger } from "@/lib/store";

export const Route = createFileRoute("/handoff_/$clickId")({ component: HandoffPage });

function HandoffPage() {
  const { clickId } = Route.useParams();
  const clicks = useExchange((s) => s.clicks);
  const sellers = useExchange((s) => s.sellers);
  const listings = useExchange((s) => s.listings);
  const lots = useLedger((s) => s.lots);
  const click = clicks.find((c) => c.id === clickId);
  const cohort = click ? clicks.filter((c) => c.orderId === click.orderId) : [];
  const seller = click ? sellerById(sellers, click.sellerId) : undefined;

  if (!click || !seller) {
    return (
      <Sheet>
        <h1 className="font-display text-3xl">Handoff not on the ledger</h1>
        <Link to="/exchange" className="mt-4 inline-block meta hover:text-ink">
          Return to Exchange
        </Link>
      </Sheet>
    );
  }

  const payload = {
    event: "buyer.clicked_product",
    orderId: click.orderId,
    sellerId: click.sellerId,
    productId: click.lotId,
    listingId: click.listingId,
    buyerEmail: click.buyerEmail,
    qty: click.qty,
    price: click.priceCents,
    currency: "USD",
    auctumAutopsyUrl: `/autopsy/${click.lotId}`,
    sellerStoreUrl: click.referralUrl,
    clickedAt: click.clickedAt,
  };

  return (
    <div className="space-y-6">
      <FunnelRail step={3} />
      <Sheet>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Eyebrow>Handoff recorded</Eyebrow>
            <h1 className="mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl">
              {seller.name} has been notified.
            </h1>
            <p className="mt-3 max-w-xl text-slate">
              Intent is on the immutable ledger. Payment stays with the seller. This page is the receipt
              of the click — not a capture of the customer.
            </p>
          </div>
          <Stamp className="-rotate-6">{click.status}</Stamp>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-[1fr_auto]">
          <dl>
            <FieldRow label="Order" value={click.orderId} />
            <FieldRow label="Buyer" value={click.buyerEmail} />
            <FieldRow label="Channel" value={`${click.channel} · ${click.attempts} attempt`} />
            <FieldRow label="Signature" value={click.signature} />
            <FieldRow label="Clicked" value={formatDate(click.clickedAt)} />
            <FieldRow label="Referral" value={`auctum-ref=${click.orderId}`} />
          </dl>
          <LotSeal seed={click.orderId} label={click.orderId} />
        </div>
      </Sheet>

      <Sheet>
        <Eyebrow>Lots in this handoff</Eyebrow>
        <ul className="mt-4 divide-y divide-hair">
          {cohort.map((c) => {
            const listing = listingById(listings, c.listingId);
            const lot = listing ? lotById(lots, listing.lotId) : undefined;
            return (
              <li key={c.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-display text-xl">{lot?.title ?? c.lotId}</p>
                  <p className="text-sm text-slate">
                    ×{c.qty} · {formatCents(c.priceCents)}
                  </p>
                </div>
                {lot ? (
                  <Link to="/autopsy/$lotId" params={{ lotId: lot.id }} className="meta hover:text-ink">
                    Autopsy
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ul>
        <p className="mt-6 text-sm text-slate">
          Signed with {seller.apiKey.slice(0, 12)}… Header X-Auctum-Signature {click.signature}. Header
          X-Auctum-Event buyer.clicked_product. Channel {click.channel}
          {click.statusCode ? `, HTTP ${click.statusCode}` : ""}.
        </p>
        <pre className="mt-3 overflow-x-auto bg-ink p-4 font-mono text-[11px] leading-relaxed text-paper">
          {JSON.stringify(payload, null, 2)}
        </pre>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={click.referralUrl} className={buttonClass("stamp")} target="_blank" rel="noreferrer">
            Continue to {seller.name}
          </a>
          <Link to="/partners/desk" className={buttonClass("ghost")}>
            Open seller desk
          </Link>
          <Link to="/exchange/$listingId" params={{ listingId: click.listingId }} className={buttonClass("quiet")}>
            File a buyer note
          </Link>
          <Link to="/exchange" className={buttonClass("quiet")}>
            Continue browsing
          </Link>
        </div>
      </Sheet>
    </div>
  );
}
