import { createFileRoute, Link } from "@tanstack/react-router";
import { LotSeal } from "@/components/lot-seal";
import { TrustBadge } from "@/components/trust-badge";
import { TruePriceReceipt } from "@/components/true-price";
import { RatingSummary } from "@/components/rating";
import { ReviewForm, ReviewList } from "@/components/review-panel";
import { Button, Eyebrow, FieldRow, Sheet, buttonClass } from "@/components/ui";
import { formatLabel, listingById, sellerById } from "@/lib/exchange";
import { useExchange } from "@/lib/exchange-store";
import { formatCents, formatKg, roleLabel } from "@/lib/format";
import { useT } from "@/lib/locale-store";
import { accountById, lotById, useLedger } from "@/lib/store";

export const Route = createFileRoute("/exchange_/$listingId")({ component: ListingPage });

function ListingPage() {
  const { listingId } = Route.useParams();
  const listings = useExchange((s) => s.listings);
  const sellers = useExchange((s) => s.sellers);
  const addToCart = useExchange((s) => s.addToCart);
  const reviews = useExchange((s) => s.reviews);
  const t = useT();
  const lots = useLedger((s) => s.lots);
  const accounts = useLedger((s) => s.accounts);
  const listing = listingById(listings, listingId);
  const lot = listing ? lotById(lots, listing.lotId) : undefined;
  const seller = listing ? sellerById(sellers, listing.sellerId) : undefined;

  if (!listing || !lot || !seller) {
    return (
      <Sheet>
        <h1 className="font-display text-3xl">Listing not live</h1>
        <Link to="/exchange" className="mt-4 inline-block meta hover:text-ink">
          Return to Exchange
        </Link>
      </Sheet>
    );
  }

  const producer = accountById(accounts, lot.producerId);
  const others = listings.filter((l) => l.lotId === lot.id && l.id !== listing.id && l.live);
  const notes = reviews.filter((r) => r.listingId === listing.id);

  return (
    <div className="space-y-6">
      <Sheet padded={false} className="overflow-hidden">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-64">
            <img src={lot.image} alt="" className="h-full max-h-[520px] w-full object-cover" />
          </div>
          <div className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <Eyebrow>
                {lot.code} · {formatLabel(listing.format)}
              </Eyebrow>
              <h1 className="mt-2 font-display text-4xl">{lot.title}</h1>
              <p className="mt-2 text-slate">
                {lot.origin.farm} · {lot.origin.region}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className="border border-ink px-2 py-1 font-mono text-[10px] tracking-[0.16em] uppercase">
                  Auctum verified origin
                </span>
                {producer ? <TrustBadge trust={producer.trust} /> : null}
              </div>
              <p className="mt-5 text-sm">{lot.notes}</p>
              <p className="mt-3 text-sm text-slate">{lot.flavor.join(" · ")}</p>
            </div>
            <div className="mt-8">
              <p className="meta">
                {seller.name} · {listing.bagGrams} g
              </p>
              <p className="font-display text-4xl tabular">{formatCents(listing.priceCents)}</p>
              <p className="mt-1 text-sm text-slate">
                FOB {formatCents(lot.pricePerLbCents)}/lb · {formatKg(lot.weightKg)} on the sheet · cup{" "}
                {lot.cupScore.toFixed(2)}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button tone="stamp" disabled={!listing.live} onClick={() => addToCart(listing.id)}>
                  Add to cart
                </Button>
                <Link to="/cart" className={buttonClass("ghost")}>
                  Review cart
                </Link>
                <Link to="/autopsy/$lotId" params={{ lotId: lot.id }} className={buttonClass("quiet")}>
                  Autopsy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-2">
        <Sheet>
          <TruePriceReceipt lot={lot} listing={listing} />
        </Sheet>
        <Sheet>
          <div className="flex items-start justify-between gap-4">
            <div>
              <Eyebrow>Seller of record</Eyebrow>
              <Link to="/exchange/seller/$sellerId" params={{ sellerId: seller.id }} className="mt-2 block hover:text-stamp">
                <h2 className="font-display text-2xl">{seller.name}</h2>
              </Link>
              <p className="mt-2 text-sm text-slate">{seller.pitch}</p>
              <p className="mt-3 meta">{seller.locale} · {seller.integrationModel}</p>
            </div>
            <LotSeal seed={lot.code} label={lot.code} />
          </div>
          {producer ? (
            <div className="mt-6 border-t border-hair pt-4">
              <p className="meta">{roleLabel(producer.role)}</p>
              <Link to="/crm/$accountId" params={{ accountId: producer.id }} className="block">
                <p className="font-display text-xl">{producer.name}</p>
                <p className="text-sm text-slate">{producer.tagline}</p>
              </Link>
            </div>
          ) : null}
          <dl className="mt-6">
            <FieldRow label="SKU" value={listing.sku} />
            <FieldRow label="Process" value={lot.process} />
            <FieldRow label="Varietal" value={lot.varietal} />
            <FieldRow label="Store" value={seller.storeUrl.replace("https://", "")} />
          </dl>
          {others.length ? (
            <div className="mt-6 border-t border-hair pt-4">
              <p className="meta">Also listed by</p>
              <ul className="mt-2 space-y-2">
                {others.map((o) => {
                  const who = sellerById(sellers, o.sellerId);
                  return (
                    <li key={o.id}>
                      <Link to="/exchange/$listingId" params={{ listingId: o.id }} className="text-sm hover:text-stamp">
                        {who?.name} · {formatLabel(o.format)} · {formatCents(o.priceCents)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </Sheet>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Sheet>
          <Eyebrow>{t("rev.eye")}</Eyebrow>
          <p className="mt-2 text-sm text-slate">{t("rev.about")}</p>
          <div className="mt-5">
            <RatingSummary reviews={notes} />
          </div>
          <div className="mt-6">
            <ReviewList reviews={notes} />
          </div>
        </Sheet>
        <Sheet>
          <Eyebrow>{t("rev.file")}</Eyebrow>
          <div className="mt-4">
            <ReviewForm listingId={listing.id} />
          </div>
        </Sheet>
      </div>
    </div>
  );
}
