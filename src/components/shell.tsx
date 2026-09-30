import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AuctumSeal } from "./auctum-mark";

const primary = [
  { to: "/", label: "Compass" },
  { to: "/market", label: "Market" },
  { to: "/stories", label: "Stories" },
  { to: "/spaces", label: "Spaces" },
  { to: "/crm", label: "CRM" },
] as const;

const more = [
  { to: "/following", label: "Following" },
  { to: "/messages", label: "Messages" },
  { to: "/scan", label: "Scan" },
  { to: "/trust", label: "Trust" },
  { to: "/agent", label: "Agent" },
  { to: "/craft", label: "The Craft" },
  { to: "/ecosystem", label: "Ecosystem" },
] as const;

export function FolioShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const markHydrated = useLedger((s) => s.markHydrated);

  useEffect(() => {
    const result = useLedger.persist.rehydrate();
    Promise.resolve(result).then(() => markHydrated());
  }, [markHydrated]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-dvh bg-raw text-ink">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-hair bg-ink text-paper">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3 pr-2">
            <AuctumSeal size={34} inverse />
            <span className="leading-none">
              <span className="block font-display text-lg tracking-tight">Auctum Ledger</span>
              <span className="mt-0.5 hidden font-mono text-[9px] tracking-[0.22em] text-stamp-soft uppercase sm:block">
                Verified, from origin
              </span>
            </span>
          </Link>
          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primary.map((item) => (
              <NavLink key={item.to} to={item.to} label={item.label} pathname={pathname} />
            ))}
          </nav>
          <button
            type="button"
            className="ml-auto inline-flex size-11 items-center justify-center text-paper lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
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
                {item.label}
              </Link>
            ))}
            <span className="ml-auto font-mono text-[10px] tracking-[0.16em] text-stamp-soft uppercase">
              LotSpace · Karmic Circle desk
            </span>
          </div>
        </div>
        {open ? (
          <div className="border-t border-white/10 px-4 py-4 lg:hidden">
            <div className="grid grid-cols-2 gap-1">
              {[...primary, ...more].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex min-h-11 items-center px-2 font-mono text-[11px] tracking-[0.14em] text-paper uppercase"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>
      <main id="content" className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        {children}
      </main>
      <footer className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <div className="folio-double mb-4" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.16em] text-slate uppercase">
            Auctum Ledger · One ledger, four doors · Rev 2026.09
          </p>
          <p className="max-w-sm text-xs text-slate">
            Social objects cannot contradict the verified record. Farmer sovereignty. Trust is a product
            feature.
          </p>
        </div>
      </footer>
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
