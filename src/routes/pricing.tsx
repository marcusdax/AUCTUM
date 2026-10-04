import { createFileRoute, Link } from "@tanstack/react-router";
import { jobs, neighbors, plans, subscribeBenefits } from "@/lib/pricing";
import { useSeat } from "@/lib/seat";
import { buttonClass, Eyebrow } from "@/components/ui";

export const Route = createFileRoute("/pricing")({ component: PricingPage });

function PricingPage() {
  const setAudience = useSeat((s) => s.setAudience);
  const setTier = useSeat((s) => s.setTier);
  const tier = useSeat((s) => s.tier);

  return (
    <div className="space-y-8">
      <header className="bg-paper p-6 shadow-[var(--shadow-sheet)] sm:p-10">
        <Eyebrow>Seats · not a checkout</Eyebrow>
        <h1 className="mt-3 max-w-[14ch] font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.92]">
          Charge the desk that acts. Never the name.
        </h1>
        <p className="mt-5 max-w-xl text-slate">
          The figures below are a proposal. Nothing on this page is billed. The reason to subscribe is on{" "}
          <Link to="/subscribe" className="underline decoration-stamp underline-offset-4">
            Register
          </Link>
          : the file, in front of the person who pays you.
        </p>
        <p className="mt-3 font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">
          Now previewing {tier === "open" ? "Open" : "Desk"}
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {plans.map((plan) => (
          <article key={plan.id} className="flex flex-col bg-paper p-6 shadow-[var(--shadow-sheet)]">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="font-display text-3xl">{plan.title}</h2>
              <p className="font-display text-3xl">{plan.price}</p>
            </div>
            <p className="mt-3 font-display text-2xl leading-snug">{plan.brief}</p>
            <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-slate uppercase">{plan.cadence}</p>
            <p className="mt-4 text-sm">{plan.point}</p>
            <p className="mt-2 text-sm text-slate">{plan.who}</p>
            <ul className="mt-4 space-y-1 text-sm">
              {plan.includes.map((line) => (
                <li key={line}>Includes {line.charAt(0).toLowerCase() + line.slice(1)}</li>
              ))}
              {plan.excludes.map((line) => (
                <li key={line} className="text-slate">
                  Does not include {line.charAt(0).toLowerCase() + line.slice(1)}
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={buttonClass("ghost", "mt-6")}
              onClick={() => {
                setAudience(plan.audience);
                setTier(plan.tier);
              }}
            >
              Preview this seat
            </button>
          </article>
        ))}
      </div>

      <section className="space-y-4">
        <Eyebrow>Four different jobs</Eyebrow>
        <h2 className="font-display text-3xl">Most of these products are not this one.</h2>
        {jobs.map((row) => (
          <article key={row.job} className="border-t border-ink bg-paper p-5">
            <h3 className="font-display text-2xl">{row.job}</h3>
            <p className="mt-3 text-sm text-slate">{row.them}</p>
            <p className="mt-3 text-sm">{row.us}</p>
          </article>
        ))}
      </section>

      <section className="space-y-4">
        <Eyebrow>Published elsewhere</Eyebrow>
        <h2 className="font-display text-3xl">What the other desks actually charge</h2>
        <p className="max-w-2xl text-sm text-slate">
          Read from their public pages in 2026. Cropster’s roast system, RoastPATH’s curves, Algrano’s per-kilo service fee, and Bext360’s free producer plan. We do not sell the first two. We should not copy the third.
        </p>
        {neighbors.map((row) => (
          <article key={row.name} className="border-t border-ink bg-paper p-5">
            <h3 className="font-display text-2xl">{row.name}</h3>
            <p className="mt-1 text-sm">{row.model}</p>
            <ul className="mt-3 space-y-2 text-sm text-slate">
              {row.prices.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm">{row.note}</p>
          </article>
        ))}
      </section>

      <section className="bg-paper p-6 shadow-[var(--shadow-sheet)]">
        <Eyebrow>How it sits in the desk</Eyebrow>
        <h2 className="mt-2 font-display text-3xl">Two switches, not five products.</h2>
        <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <p>
            Open and Bar preview as Open. Sample, offer, lock, and accept stay refused, and the refusal says why. A café does not need a lock to pour.
          </p>
          <p>
            Roaster and Trade preview as Desk. That is the only switch that writes. Trade is the same switch plus the claim record. It is not a second ledger.
          </p>
          <p>
            Credentials still gate the signature. A paid seat does not make a cupper, and it does not let an uncredentialed person accept a page.
          </p>
          <p>
            The house — cupping, the cabinet, the exception — is not for sale. Cropster Origin starts at €199 for a mill. This desk does not rent that room out.
          </p>
        </div>
        <Link to="/market" className={buttonClass("stamp", "mt-6")}>
          Try the book on this seat
        </Link>
      </section>
    </div>
  );
}
