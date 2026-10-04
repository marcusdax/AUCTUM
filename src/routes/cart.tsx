import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Eyebrow, Sheet, buttonClass } from "@/components/ui";
import { FunnelRail } from "@/components/funnel";
import { formatLabel, listingById, sellerById } from "@/lib/exchange";
import { cartCount, useExchange } from "@/lib/exchange-store";
import { formatCents } from "@/lib/format";
import { lotById, useLedger } from "@/lib/store";

export const Route = createFileRoute("/cart")({ component: CartPage });

function CartPage() {
  const cart = useExchange((s) => s.cart);
  const listings = useExchange((s) => s.listings);
  const sellers = useExchange((s) => s.sellers);
  const setQty = useExchange((s) => s.setQty);
  const removeLine = useExchange((s) => s.removeLine);
  const lots = useLedger((s) => s.lots);
  const count = cartCount(cart);
  const total = cart.reduce((n, line) => {
    const listing = listingById(listings, line.listingId);
    return n + (listing ? listing.priceCents * line.qty : 0);
  }, 0);

  return (
    <div className="space-y-6">
      <FunnelRail step={1} />
      <Sheet>
        <Eyebrow>Cart</Eyebrow>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Intent, not a capture.</h1>
        <p className="mt-3 max-w-xl text-slate">
          Auctum does not take payment on affiliate listings. You review here, then buy on the seller's
          store. They keep the customer. We keep the record.
        </p>
      </Sheet>

      {count === 0 ? (
        <Sheet>
          <h2 className="font-display text-2xl">The cart is empty</h2>
          <p className="mt-2 text-sm text-slate">Open the Exchange and add a verified listing.</p>
          <Link to="/exchange" className={`mt-5 ${buttonClass("stamp")}`}>
            Browse Exchange
          </Link>
        </Sheet>
      ) : (
        <Sheet>
          <ul className="divide-y divide-hair">
            {cart.map((line) => {
              const listing = listingById(listings, line.listingId);
              if (!listing) return null;
              const lot = lotById(lots, listing.lotId);
              const seller = sellerById(sellers, listing.sellerId);
              return (
                <li key={line.listingId} className="flex flex-wrap items-start gap-4 py-4 first:pt-0 last:pb-0">
                  <img src={lot?.image} alt="" className="size-20 object-cover" />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/exchange/$listingId"
                      params={{ listingId: listing.id }}
                      className="font-display text-xl leading-tight hover:text-stamp"
                    >
                      {lot?.title ?? listing.sku}
                    </Link>
                    <p className="mt-1 text-sm text-slate">
                      {seller?.name} · {formatLabel(listing.format)} · {listing.bagGrams} g
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <label className="meta">
                        Qty
                        <input
                          type="number"
                          min={1}
                          max={24}
                          value={line.qty}
                          onChange={(e) => setQty(listing.id, Number(e.target.value) || 1)}
                          className="ml-2 w-16 border border-hair-strong bg-sheet px-2 py-1 font-mono text-sm tabular"
                        />
                      </label>
                      <Button type="button" tone="quiet" className="min-h-9 px-2" onClick={() => removeLine(listing.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                  <p className="font-display text-xl tabular">{formatCents(listing.priceCents * line.qty)}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-hair pt-5">
            <div>
              <p className="meta">Intent total</p>
              <p className="font-display text-3xl tabular">{formatCents(total)}</p>
            </div>
            <Link to="/checkout" className={buttonClass("stamp")}>
              Continue to handoff
            </Link>
          </div>
        </Sheet>
      )}
    </div>
  );
}
