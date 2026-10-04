import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ListingCard } from "@/components/listing-card";
import { FunnelRail } from "@/components/funnel";
import { Eyebrow, Sheet, Stamp, buttonClass } from "@/components/ui";
import { cartCount, useExchange } from "@/lib/exchange-store";
import { pluralCategory } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/locale-store";
import { useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/exchange")({ component: ExchangePage });

const origins = ["All", "Vietnam", "Ethiopia", "Colombia", "Kenya"] as const;
const processes = ["All", "Washed", "Honey", "Natural"] as const;
const cups = ["All", "85+", "87+", "89+"] as const;
const formats = ["All", "Roasted", "Green"] as const;

function ExchangePage() {
  const listings = useExchange((s) => s.listings);
  const sellers = useExchange((s) => s.sellers);
  const cart = useExchange((s) => s.cart);
  const lots = useLedger((s) => s.lots);
  const [origin, setOrigin] = useState<(typeof origins)[number]>("All");
  const [process, setProcess] = useState<(typeof processes)[number]>("All");
  const [cup, setCup] = useState<(typeof cups)[number]>("All");
  const [format, setFormat] = useState<(typeof formats)[number]>("All");
  const [sellerId, setSellerId] = useState("All");
  const count = cartCount(cart);
  const t = useT();
  const locale = useLocale((s) => s.locale);
  const originLabel: Record<(typeof origins)[number], string> = {
    All: t("ex.all"),
    Vietnam: t("ex.vietnam"),
    Ethiopia: t("ex.ethiopia"),
    Colombia: t("ex.colombia"),
    Kenya: t("ex.kenya"),
  };
  const processLabel: Record<(typeof processes)[number], string> = {
    All: t("ex.all"),
    Washed: t("ex.washed"),
    Honey: t("ex.honey"),
    Natural: t("ex.natural"),
  };
  const formatLabel: Record<(typeof formats)[number], string> = {
    All: t("ex.all"),
    Roasted: t("ex.roasted"),
    Green: t("ex.green"),
  };

  const live = useMemo(
    () =>
      listings.filter((l) => {
        if (!l.live) return false;
        const lot = lots.find((x) => x.id === l.lotId);
        if (!lot) return false;
        if (origin !== "All" && lot.origin.country !== origin) return false;
        if (process !== "All" && lot.process !== process) return false;
        if (cup === "85+" && lot.cupScore < 85) return false;
        if (cup === "87+" && lot.cupScore < 87) return false;
        if (cup === "89+" && lot.cupScore < 89) return false;
        if (format === "Roasted" && l.format !== "roasted-bag") return false;
        if (format === "Green" && l.format === "roasted-bag") return false;
        if (sellerId !== "All" && l.sellerId !== sellerId) return false;
        return true;
      }),
    [listings, lots, origin, process, cup, format, sellerId],
  );

  const verifiedSellers = sellers.filter((s) => s.verifiedAt);

  return (
    <div className="space-y-6">
      <FunnelRail step={0} />
      <Sheet>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Eyebrow>{t("ex.eye")}</Eyebrow>
            <h1 className="mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl">{t("ex.h1")}</h1>
            <p className="mt-3 max-w-xl text-slate">{t("ex.body")}</p>
          </div>
          <Stamp className="-rotate-3">{t("ex.stamp")}</Stamp>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/cart" className={buttonClass("stamp")}>
            {t("nav.cart")}
            {count ? ` · ${count}` : ""}
          </Link>
          <Link to="/partners" className={buttonClass("ghost")}>
            {t("ex.sell")}
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {origins.map((o) => (
            <Chip key={o} active={origin === o} onClick={() => setOrigin(o)}>
              {originLabel[o]}
            </Chip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {processes.map((p) => (
            <Chip key={p} active={process === p} onClick={() => setProcess(p)}>
              {processLabel[p]}
            </Chip>
          ))}
          {cups.map((c) => (
            <Chip key={c} active={cup === c} onClick={() => setCup(c)}>
              {c === "All" ? t("ex.all") : c}
            </Chip>
          ))}
          {formats.map((f) => (
            <Chip key={f} active={format === f} onClick={() => setFormat(f)}>
              {formatLabel[f]}
            </Chip>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Chip active={sellerId === "All"} onClick={() => setSellerId("All")}>
            {t("ex.sellers")}
          </Chip>
          {verifiedSellers.map((s) => (
            <Chip key={s.id} active={sellerId === s.id} onClick={() => setSellerId(s.id)}>
              {s.name}
            </Chip>
          ))}
        </div>
      </Sheet>

      <p className="meta">
        {t(pluralCategory(locale, live.length) === "one" ? "ex.countOne" : "ex.count", {
          n: live.length,
          s: verifiedSellers.length,
        })}
      </p>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {live.map((listing) => {
          const lot = lots.find((l) => l.id === listing.lotId);
          if (!lot) return null;
          return <ListingCard key={listing.id} listing={listing} lot={lot} />;
        })}
      </div>
      {live.length === 0 ? (
        <Sheet>
          <h2 className="font-display text-2xl">{t("ex.empty")}</h2>
          <p className="mt-2 text-sm text-slate">{t("ex.emptyBody")}</p>
        </Sheet>
      ) : null}
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-11 border px-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-150",
        active ? "border-ink bg-ink text-paper" : "border-hair-strong bg-paper text-ink hover:border-ink",
      )}
    >
      {children}
    </button>
  );
}
