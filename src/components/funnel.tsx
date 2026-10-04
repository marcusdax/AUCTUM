import { Link } from "@tanstack/react-router";
import { useT } from "@/lib/locale-store";
import { cn } from "@/lib/utils";

const steps = [
  { to: "/exchange", key: "funnel.discover" },
  { to: "/cart", key: "funnel.cart" },
  { to: "/checkout", key: "funnel.handoff" },
  { to: "/partners/desk", key: "funnel.notify" },
] as const;

export function FunnelRail({ step }: { step: 0 | 1 | 2 | 3 }) {
  const t = useT();
  return (
    <ol className="flex flex-wrap gap-x-5 gap-y-2" aria-label={t("funnel.aria")}>
      {steps.map((s, i) => (
        <li key={s.to}>
          <Link
            to={s.to}
            aria-current={i === step ? "step" : undefined}
            className={cn(
              "inline-flex min-h-11 items-center font-mono text-[11px] tracking-[0.16em] uppercase",
              i === step ? "text-stamp" : i < step ? "text-ink" : "text-slate hover:text-ink",
            )}
          >
            {t(s.key)}
          </Link>
        </li>
      ))}
    </ol>
  );
}