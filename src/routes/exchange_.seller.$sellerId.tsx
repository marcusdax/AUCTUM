import { createFileRoute, Link } from "@tanstack/react-router";
import { ListingCard } from "@/components/listing-card";
import { RatingSummary } from "@/components/rating";
import { ReviewList } from "@/components/review-panel";
import { Eyebrow, FieldRow, Sheet, Stamp, buttonClass } from "@/components/ui";
import { sellerById } from "@/lib/exchange";
import { useExchange } from "@/lib/exchange-store";
import { formatDate } from "@/lib/format";
import { useT } from "@/lib/locale-store";
import { useLedger } from "@/lib/store";

export const Route = createFileRoute("/exchange_/seller/$sellerId")({ component: SellerProfilePage });

function SellerProfilePage() {
  const { sellerId } = Route.useParams();
  const sellers = useExchange((s) => s.sellers);
  const listings = useExchange((s) => s.listings);
  const reviews = useExchange((s) => s.reviews);
  const lots = useLedger((s) => s.lots);
  const t = useT();
  const seller = sellerById(sellers, sellerId);

  if (!seller) {
    return (
      <Sheet>
        <h1 className="font-display text-3xl">{t("sel.missing")}</h1>
        <Link to="/exchange" className="mt-4 inline-block meta hover:text-ink">
          {t("sel.return")}
        </Link>
      </Sheet>
    );
  }

  const live = listings.filter((l) => l.sellerId === seller.id && l.live);
  const notes = reviews.filter((r) => r.sellerId === seller.id);

  return (
    <div className="space-y-6">
      <Sheet>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Eyebrow>{t("sel.eye")}</Eyebrow>
            <h1 className="mt-2 font-display text-4xl sm:text-5xl">{seller.name}</h1>
            <p className="mt-3 max-w-xl text-slate">{seller.pitch}</p>
            <p className="mt-3 meta">
              {seller.locale} · {seller.integrationModel}
              {seller.verifiedAt ? ` · ${t("sel.verified")} ${formatDate(seller.verifiedAt)}` : ` · ${t("sel.pending")}`}
            </p>
          </div>
          <Stamp className="-rotate-3">{seller.verifiedAt ? t("sel.stampLive") : t("sel.stampWait")}</Stamp>
        </div>
        <dl className="mt-8 max-w-xl">
          <FieldRow label={t("sel.store")} value={seller.storeUrl.replace("https://", "")} />
          <FieldRow label={t("sel.notice")} value={seller.webhookUrl ? t("sel.webhook") : t("sel.emailOnly")} />
          <FieldRow label={t("sel.agreement")} value={seller.agreementVersion ?? t("sel.unsigned")} />
          <FieldRow label={t("sel.signed")} value={seller.signedName ?? "—"} />
        </dl>
        <p className="mt-6 max-w-xl text-sm text-slate">
          {t("sel.doctrine")}
        </p>
        <Link to="/exchange" className={`mt-6 ${buttonClass("ghost")}`}>
          {t("sel.back")}
        </Link>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Sheet>
          <Eyebrow>{t("rev.eye")}</Eyebrow>
          <div className="mt-4">
            <RatingSummary reviews={notes} />
          </div>
        </Sheet>
        <Sheet>
          <ReviewList reviews={notes} />
          {notes.length === 0 ? <p className="text-sm text-slate">{t("sel.noneNotes")}</p> : null}
        </Sheet>
      </div>

      <div>
        <Eyebrow>{t("sel.live")}</Eyebrow>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((listing) => {
            const lot = lots.find((l) => l.id === listing.lotId);
            if (!lot) return null;
            return <ListingCard key={listing.id} listing={listing} lot={lot} />;
          })}
        </div>
        {live.length === 0 ? (
          <Sheet className="mt-4">
            <p className="text-sm text-slate">{t("sel.noneLive")}</p>
          </Sheet>
        ) : null}
      </div>
    </div>
  );
}
