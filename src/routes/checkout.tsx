import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button, Eyebrow, Sheet, buttonClass } from "@/components/ui";
import { FunnelRail } from "@/components/funnel";
import { listingById, sellerById, type Seller } from "@/lib/exchange";
import { useExchange } from "@/lib/exchange-store";
import { formatCents } from "@/lib/format";
import { lotById, useLedger } from "@/lib/store";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

function CheckoutPage() {
  const cart = useExchange((s) => s.cart);
  const listings = useExchange((s) => s.listings);
  const sellers = useExchange((s) => s.sellers);
  const buyerEmail = useExchange((s) => s.buyerEmail);
  const setBuyerEmail = useExchange((s) => s.setBuyerEmail);
  const checkoutSeller = useExchange((s) => s.checkoutSeller);
  const lots = useLedger((s) => s.lots);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const groups = useMemo(() => {
    const map = new Map<string, { seller: Seller; total: number; lines: number }>();
    for (const line of cart) {
      const listing = listingById(listings, line.listingId);
      if (!listing) continue;
      const seller = sellerById(sellers, listing.sellerId);
      if (!seller) continue;
      const cur = map.get(seller.id) ?? { seller, total: 0, lines: 0 };
      cur.total += listing.priceCents * line.qty;
      cur.lines += line.qty;
      map.set(seller.id, cur);
    }
    return [...map.values()];
  }, [cart, listings, sellers]);

  if (!cart.length && !pending) {
    return (
      <Sheet>
        <h1 className="font-display text-3xl">Nothing to hand off</h1>
        <Link to="/exchange" className={`mt-4 ${buttonClass("stamp")}`}>
          Open Exchange
        </Link>
      </Sheet>
    );
  }

  function handoff(sellerId: string) {
    setError(null);
    if (!buyerEmail.includes("@")) {
      setError("A real email is how the seller knows who arrived.");
      return;
    }
    setPending(true);
    const clickId = checkoutSeller(sellerId);
    if (!clickId) {
      setPending(false);
      setError("Handoff could not be recorded.");
      return;
    }
    void navigate({ to: "/handoff/$clickId", params: { clickId } });
  }

  return (
    <div className="space-y-6">
      <FunnelRail step={2} />
      <Sheet>
        <Eyebrow>Affiliate checkout</Eyebrow>
        <h1 className="mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl">Buy on the seller's store.</h1>
        <p className="mt-3 max-w-xl text-slate">
          Auctum records the click — not the purchase. Payment and fulfillment stay with the seller. They
          are notified before you arrive.
        </p>
        <label className="mt-6 block max-w-md">
          <span className="meta">Buyer email</span>
          <input
            type="email"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            placeholder="you@roastery.com"
            className="mt-2 w-full border border-hair-strong bg-sheet px-3 py-3 text-sm"
            autoComplete="email"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-stamp">{error}</p> : null}
      </Sheet>

      {groups.map((g) => (
        <Sheet key={g.seller.id}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="meta">{g.seller.integrationModel}</p>
              <h2 className="mt-1 font-display text-2xl">{g.seller.name}</h2>
              <p className="mt-2 text-sm text-slate">
            {g.lines} unit{g.lines === 1 ? "" : "s"} · referral carries auctum-ref and UTM. One seller at a
            time. Auctum does not take the payment.
          </p>
            </div>
            <p className="font-display text-2xl tabular">{formatCents(g.total)}</p>
          </div>
          <ul className="mt-4 space-y-2">
            {cart
              .filter((line) => listingById(listings, line.listingId)?.sellerId === g.seller.id)
              .map((line) => {
                const listing = listingById(listings, line.listingId)!;
                const lot = lotById(lots, listing.lotId);
                return (
                  <li key={line.listingId} className="flex justify-between gap-3 text-sm">
                    <span>
                      {lot?.title} · ×{line.qty}
                    </span>
                    <span className="font-mono tabular">{formatCents(listing.priceCents * line.qty)}</span>
                  </li>
                );
              })}
          </ul>
          <Button type="button" tone="stamp" className="mt-6" onClick={() => handoff(g.seller.id)}>
            Buy on {g.seller.name}
          </Button>
        </Sheet>
      ))}
    </div>
  );
}
