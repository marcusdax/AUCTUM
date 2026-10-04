import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Button, Eyebrow, Sheet, Stat } from "@/components/ui";
import { listingById, sellerById } from "@/lib/exchange";
import { useExchange } from "@/lib/exchange-store";
import { formatCents, formatDate } from "@/lib/format";
import { lotById, useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/partners_/desk")({ component: DeskPage });

function DeskPage() {
  const sellers = useExchange((s) => s.sellers);
  const clicks = useExchange((s) => s.clicks);
  const listings = useExchange((s) => s.listings);
  const testWebhook = useExchange((s) => s.testWebhook);
  const retryClick = useExchange((s) => s.retryClick);
  const acknowledgeConversion = useExchange((s) => s.acknowledgeConversion);
  const lots = useLedger((s) => s.lots);
  const verified = sellers.filter((s) => s.verifiedAt);
  const [sellerId, setSellerId] = useState(verified[0]?.id ?? sellers[0]?.id ?? "");
  const seller = sellerById(sellers, sellerId);
  const mine = useMemo(() => clicks.filter((c) => c.sellerId === sellerId), [clicks, sellerId]);
  const buyer = mine.filter((c) => !c.orderId.startsWith("test-"));
  const delivered = buyer.filter((c) => c.status === "delivered").length;
  const failed = buyer.filter((c) => c.status === "failed").length;
  const webhookTries = buyer.filter((c) => c.channel === "webhook").length;
  const webhookOk = buyer.filter((c) => c.channel === "webhook" && c.status === "delivered").length;
  const emailN = buyer.filter((c) => c.channel === "email").length;
  const converted = buyer.filter((c) => c.convertedAt).length;
  const intent = buyer.reduce((n, c) => n + c.priceCents, 0);
  const webhookRate = webhookTries ? Math.round((webhookOk / webhookTries) * 100) : null;
  const fallbackRate = buyer.length ? Math.round((emailN / buyer.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Seller desk</Eyebrow>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Who clicked, what, and when.</h1>
        <p className="mt-3 max-w-xl text-slate">
          No dark patterns. The payload is signed with your API key. Webhook first, email if the hook is
          silent. Time to notify is the promise.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {sellers.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSellerId(s.id)}
              className={cn(
                "min-h-11 border px-3 font-mono text-[11px] tracking-[0.14em] uppercase",
                sellerId === s.id ? "border-ink bg-ink text-paper" : "border-hair-strong bg-paper",
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </Sheet>

      {seller ? (
        <>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            <Sheet>
              <Stat label="Clicks" value={buyer.length} hint="Buyer intent, tests excluded" />
            </Sheet>
            <Sheet>
              <Stat
                label="Webhook"
                value={webhookRate === null ? "—" : `${webhookRate}%`}
                hint={webhookTries ? `${webhookOk}/${webhookTries} delivered` : "No webhook clicks"}
              />
            </Sheet>
            <Sheet>
              <Stat label="Email fallback" value={`${fallbackRate}%`} hint={`${emailN} of ${buyer.length || 0}`} />
            </Sheet>
            <Sheet>
              <Stat label="Failed" value={failed} hint="Retry from this desk" />
            </Sheet>
            <Sheet>
              <Stat label="Conversions" value={converted} hint="Seller acknowledged" />
            </Sheet>
            <Sheet>
              <Stat label="Intent" value={formatCents(intent)} hint={delivered ? "Notify < 1s" : "Not a sale"} />
            </Sheet>
          </div>

          <Sheet>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="meta">Endpoint</p>
                <p className="mt-1 font-display text-2xl">{seller.name}</p>
                <Link to="/exchange/seller/$sellerId" params={{ sellerId: seller.id }} className="mt-1 inline-block meta hover:text-ink">
                  Public profile
                </Link>
                <p className="mt-2 text-sm text-slate">
                  {seller.webhookUrl ?? "Email only — no webhook on file"}
                </p>
                <p className="mt-1 font-mono text-[11px] text-slate">{seller.apiKey}</p>
              </div>
              <Button type="button" tone="ghost" onClick={() => testWebhook(seller.id)}>
                Send test event
              </Button>
            </div>
          </Sheet>

          <Sheet>
            <Eyebrow>Notification log</Eyebrow>
            {mine.length === 0 ? (
              <p className="mt-4 text-sm text-slate">No clicks yet. Test the webhook or wait for a buyer.</p>
            ) : (
              <ol className="mt-4 divide-y divide-hair">
                {mine.map((c) => {
                  const listing = listingById(listings, c.listingId);
                  const lot = listing ? lotById(lots, listing.lotId) : undefined;
                  return (
                    <li key={c.id} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto]">
                      <div>
                        <p className="font-mono text-[10px] tracking-[0.14em] text-slate uppercase">
                          {formatDate(c.clickedAt)} · {c.channel} · {c.status}
                          {c.statusCode ? ` · ${c.statusCode}` : ""}
                        </p>
                        <p className="mt-1 font-display text-xl">{lot?.title ?? c.lotId}</p>
                        <p className="text-sm text-slate">
                          {c.buyerEmail} · ×{c.qty} · {formatCents(c.priceCents)} · sig {c.signature}
                        </p>
                        {c.error ? <p className="mt-1 text-sm text-stamp">{c.error}</p> : null}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {lot ? (
                          <Link to="/autopsy/$lotId" params={{ lotId: lot.id }} className="meta hover:text-ink">
                            Autopsy
                          </Link>
                        ) : null}
                        {c.status === "failed" ? (
                          <Button type="button" tone="quiet" className="min-h-9 px-2" onClick={() => retryClick(c.id)}>
                            Retry
                          </Button>
                        ) : null}
                        {c.convertedAt ? (
                          <span className="font-mono text-[10px] tracking-[0.14em] text-sage uppercase">
                            Converted {formatDate(c.convertedAt)}
                          </span>
                        ) : c.status === "delivered" && c.qty > 0 ? (
                          <Button
                            type="button"
                            tone="ghost"
                            className="min-h-9 px-2"
                            onClick={() => acknowledgeConversion(c.id)}
                          >
                            Acknowledge sale
                          </Button>
                        ) : null}
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </Sheet>
        </>
      ) : null}
    </div>
  );
}
