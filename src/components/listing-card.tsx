import { Link } from "@tanstack/react-router";
import { formatLabel, sellerById, type Listing } from "@/lib/exchange";
import { useExchange } from "@/lib/exchange-store";
import { formatCents } from "@/lib/format";
import { accountById, useLedger } from "@/lib/store";
import type { Lot } from "@/lib/types";
import { RatingLine } from "./rating";
import { TrustBadge } from "./trust-badge";
import { Button } from "./ui";

export function ListingCard({ listing, lot }: { listing: Listing; lot: Lot }) {
  const sellers = useExchange((s) => s.sellers);
  const addToCart = useExchange((s) => s.addToCart);
  const accounts = useLedger((s) => s.accounts);
  const reviews = useExchange((s) => s.reviews);
  const seller = sellerById(sellers, listing.sellerId);
  const producer = accountById(accounts, lot.producerId);
  const notes = reviews.filter((r) => r.listingId === listing.id);

  return (
    <article className="flex flex-col bg-paper shadow-[var(--shadow-sheet)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)]">
      <Link to="/exchange/$listingId" params={{ listingId: listing.id }} className="group block">
        <div className="relative aspect-[3/2] overflow-hidden bg-raw">
          <img
            src={lot.image}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-folio)] group-hover:scale-[1.03]"
          />
          <span className="absolute top-3 left-3 bg-paper/92 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-ink uppercase">
            {formatLabel(listing.format)}
          </span>
          <span className="absolute top-3 right-3 bg-ink/90 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-paper uppercase">
            Verified origin
          </span>
        </div>
        <div className="flex flex-col gap-2 px-4 pt-4">
          <div className="flex items-start justify-between gap-3">
            <p className="font-mono text-[10px] tracking-[0.18em] text-slate uppercase">{lot.code}</p>
            {producer ? <TrustBadge trust={producer.trust} size="sm" /> : null}
          </div>
          <h3 className="font-display text-xl leading-tight">{lot.title}</h3>
          <p className="text-sm text-slate">
            {lot.origin.region} · {lot.process} · cup {lot.cupScore.toFixed(2)}
          </p>
        </div>
      </Link>
      <div className="mt-auto border-t border-hair px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {seller ? (
            <Link to="/exchange/seller/$sellerId" params={{ sellerId: seller.id }} className="text-sm hover:text-stamp">
              {seller.name}
            </Link>
          ) : (
            <span />
          )}
          <RatingLine reviews={notes} />
        </div>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <p className="meta">{listing.bagGrams} g</p>
            <p className="font-display text-lg tabular">{formatCents(listing.priceCents)}</p>
          </div>
          <Button type="button" tone="stamp" className="min-h-11 px-3" onClick={() => addToCart(listing.id)}>
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}
