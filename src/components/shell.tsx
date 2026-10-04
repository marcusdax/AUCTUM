import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useEducation } from "@/lib/education-store";
import { cartCount, useExchange } from "@/lib/exchange-store";
import { LOCALES, localeMeta } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/locale-store";
import { usePayments } from "@/lib/payments-store";
import { useSocial } from "@/lib/social-store";
import { useMaterials } from "@/lib/materials-store";
import { usePlots } from "@/lib/plot-store";
import { useSubscribe } from "@/lib/subscribe-store";
import { useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AuctumSeal } from "./auctum-mark";
import { DeskChat } from "./desk-chat";
import { SeatBar } from "./seat-bar";
import { tabSummary } from "@/lib/desk";
import { seatLine, useSeat } from "@/lib/seat";

const primary = [
  { to: "/market", key: "nav.ledger" },
  { to: "/spaces", key: "nav.lotspace" },
  { to: "/education", key: "nav.learn" },
  { to: "/scan", key: "nav.scan" },
  { to: "/craft", key: "nav.craft" },
] as const;

const more = [
  { to: "/exchange", key: "nav.exchange" },
  { to: "/crm", key: "nav.crm" },
  { to: "/stories", key: "nav.stories" },
  { to: "/following", key: "nav.following" },
  { to: "/messages", key: "nav.messages" },
  { to: "/payments", key: "nav.payments" },
  { to: "/trust", key: "nav.trust" },
  { to: "/agent", key: "nav.agent" },
  { to: "/partners", key: "nav.partners" },
  { to: "/foundry", key: "nav.foundry" },
  { to: "/strategy", key: "nav.strategy" },
  { to: "/pricing", key: "nav.pricing" },
  { to: "/eudr", key: "nav.eudr" },
  { to: "/subscribe", key: "nav.subscribe" },
  { to: "/farmers", key: "nav.farmers" },
  { to: "/consumers", key: "nav.consumers" },
  { to: "/materials", key: "nav.materials" },
  { to: "/ecosystem", key: "nav.ecosystem" },
] as const;

export function FolioShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const markHydrated = useLedger((s) => s.markHydrated);
  const markEdu = useEducation((s) => s.markHydrated);
  const markEx = useExchange((s) => s.markHydrated);
  const markPay = usePayments((s) => s.markHydrated);
  const markSeat = useSeat((s) => s.markHydrated);
  const markPlots = usePlots((s) => s.markHydrated);
  const markSub = useSubscribe((s) => s.markHydrated);
  const markMaterials = useMaterials((s) => s.markHydrated);
  const markSocial = useSocial((s) => s.markHydrated);
  const audience = useSeat((s) => s.audience);
  const tier = useSeat((s) => s.tier);
  const locale = useLocale((s) => s.locale);
  const setLocale = useLocale((s) => s.setLocale);
  const t = useT();
  const cart = useExchange((s) => s.cart);
  const count = cartCount(cart);

  useEffect(() => {
    const result = useLedger.persist.rehydrate();
    Promise.resolve(result).then(() => markHydrated());
    const edu = useEducation.persist.rehydrate();
    Promise.resolve(edu).then(() => markEdu());
    const ex = useExchange.persist.rehydrate();
    Promise.resolve(ex).then(() => markEx());
    const loc = useLocale.persist.rehydrate();
    Promise.resolve(loc).then(() => useLocale.getState().markHydrated());
    const pay = usePayments.persist.rehydrate();
    Promise.resolve(pay).then(() => markPay());
    const seat = useSeat.persist.rehydrate();
    Promise.resolve(seat).then(() => markSeat());
    const plots = usePlots.persist.rehydrate();
    Promise.resolve(plots).then(() => markPlots());
    const sub = useSubscribe.persist.rehydrate();
    Promise.resolve(sub).then(() => markSub());
    const materials = useMaterials.persist.rehydrate();
    Promise.resolve(materials).then(() => markMaterials());
    const social = useSocial.persist.rehydrate();
    Promise.resolve(social).then(() => markSocial());
  }, [markHydrated, markEdu, markEx, markPay, markSeat, markPlots, markSub, markMaterials, markSocial]);

  useEffect(() => {
    document.documentElement.lang = localeMeta(locale).html;
  }, [locale]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (pathname === "/brief") {
    return (
      <div className="min-h-dvh bg-raw text-ink">
        <main id="content">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-raw text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        {t("shell.skip")}
      </a>
      <header className="sticky top-0 z-40 bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3 pr-2">
            <AuctumSeal size={34} inverse />
            <span className="leading-none">
              <span className="block font-display text-lg tracking-tight">Auctum Ledger</span>
              <span className="mt-0.5 hidden font-mono text-[9px] tracking-[0.22em] text-stamp-soft uppercase sm:block">
                {t("shell.tagline")}
              </span>
            </span>
          </Link>
          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primary.map((item) => (
              <NavLink key={item.to} to={item.to} label={t(item.key)} pathname={pathname} />
            ))}
            <Link
              to="/cart"
              className={cn(
                "relative ml-1 flex min-h-11 items-center px-3 font-mono text-[11px] tracking-[0.16em] uppercase",
                pathname === "/cart" || pathname === "/checkout" ? "text-paper" : "text-stamp-soft hover:text-paper",
              )}
            >
              {t("nav.cart")}
              {count ? (
                <span className="ml-2 inline-flex min-w-5 items-center justify-center bg-stamp px-1.5 py-0.5 font-mono text-[10px] text-paper">
                  {count}
                </span>
              ) : null}
            </Link>
          </nav>
          <button
            type="button"
            className="ml-auto inline-flex size-11 items-center justify-center text-paper lg:hidden"
            aria-expanded={open}
            aria-label={open ? t("shell.close") : t("shell.open")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        <div className="hidden border-t border-white/10 lg:block">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-6 py-2">
            {more.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-150",
                  pathname === item.to || pathname.startsWith(`${item.to}/`)
                    ? "text-paper"
                    : "text-stamp-soft hover:text-paper",
                )}
              >
                {t(item.key)}
              </Link>
            ))}
            <LocaleSwitch locale={locale} setLocale={setLocale} label={t("lang.group")} />
            <span className="font-mono text-[10px] tracking-[0.16em] text-stamp-soft uppercase">{t("shell.desk")}</span>
          </div>
        </div>
        {open ? (
          <div className="border-t border-white/10 px-4 py-4 lg:hidden">
            <LocaleSwitch locale={locale} setLocale={setLocale} label={t("lang.group")} full />
            <div className="mt-3 grid grid-cols-2 gap-1">
              {[...primary, { to: "/cart" as const, key: "nav.cart" as const }, ...more].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex min-h-11 items-center px-2 font-mono text-[11px] tracking-[0.14em] text-paper uppercase"
                >
                  {t(item.key)}
                  {item.to === "/cart" && count ? ` · ${count}` : ""}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
        <div className="h-px bg-brass" />
      </header>
      <main id="content" className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <SeatBar line={seatLine(pathname, audience, tier) ?? tabSummary(pathname)} />
        {children}
      </main>
      <DeskChat />
      <footer className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="folio-double mb-4" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.16em] text-slate uppercase">{t("shell.footer")}</p>
          <p className="max-w-sm text-xs text-slate">{t("shell.doctrine")}</p>
        </div>
      </footer>
    </div>
  );
}

function LocaleSwitch({
  locale,
  setLocale,
  label,
  full = false,
}: {
  locale: (typeof LOCALES)[number]["id"];
  setLocale: (id: (typeof LOCALES)[number]["id"]) => void;
  label: string;
  full?: boolean;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1", full ? "" : "ml-auto")} role="group" aria-label={label}>
      {LOCALES.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={locale === item.id}
          lang={item.html}
          onClick={() => setLocale(item.id)}
          className={cn(
            "min-h-11 px-2 font-mono text-[10px] tracking-[0.14em] uppercase",
            locale === item.id ? "text-paper underline decoration-stamp underline-offset-4" : "text-stamp-soft hover:text-paper",
          )}
        >
          {full ? item.label : item.short}
        </button>
      ))}
    </div>
  );
}

function NavLink({
  to,
  label,
  pathname,
}: {
  to: string;
  label: string;
  pathname: string;
}) {
  const active = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
  return (
    <Link
      to={to}
      className={cn(
        "relative flex min-h-11 items-center px-3 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-150",
        active ? "text-paper" : "text-stamp-soft hover:text-paper",
      )}
    >
      {label}
      {active ? <span className="absolute inset-x-3 bottom-1 h-px bg-stamp" /> : null}
    </Link>
  );
}
