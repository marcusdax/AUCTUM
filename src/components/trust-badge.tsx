import { bandLabel } from "@/lib/format";
import type { Trust, TrustBand } from "@/lib/types";
import { cn } from "@/lib/utils";

const bandClass: Record<TrustBand, string> = {
  sealed: "border-sage text-sage",
  verified: "border-ink text-ink",
  provisional: "border-brass text-brass",
  watch: "border-stamp text-stamp",
  restricted: "border-stamp bg-stamp/10 text-stamp",
};

export function TrustBadge({
  trust,
  size = "md",
}: {
  trust: Trust;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border font-mono uppercase tracking-[0.16em]",
        size === "sm" ? "px-2 py-1 text-[9px]" : "px-2.5 py-1.5 text-[10px]",
        bandClass[trust.band],
      )}
    >
      <span className="tabular">{trust.score}</span>
      <span className="opacity-70">{bandLabel(trust.band)}</span>
    </span>
  );
}

export function TrustMeter({ trust }: { trust: Trust }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-3xl tabular leading-none">{trust.score}</span>
        <TrustBadge trust={trust} />
      </div>
      <div className="h-1.5 bg-hair">
        <div
          className={cn(
            "h-full",
            trust.band === "sealed" && "bg-sage",
            trust.band === "verified" && "bg-ink",
            trust.band === "provisional" && "bg-brass",
            (trust.band === "watch" || trust.band === "restricted") && "bg-stamp",
          )}
          style={{ width: `${trust.score}%` }}
        />
      </div>
    </div>
  );
}
