import { createFileRoute, Link } from "@tanstack/react-router";
import { SeatForm } from "@/components/seat-form";
import { Eyebrow, Sheet } from "@/components/ui";
import { plans, subscribeBenefits } from "@/lib/pricing";
import { useSubscribe } from "@/lib/subscribe-store";

export const Route = createFileRoute("/subscribe")({ component: SubscribePage });

function SubscribePage() {
  const requests = useSubscribe((s) => s.requests);

  return (
    <div className="space-y-8">
      <Sheet>
        <Eyebrow>One benefit · four desks</Eyebrow>
        <h1 className="mt-3 max-w-[16ch] font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.92]">
          The file, in front of the person who pays you.
        </h1>
        <p className="mt-5 max-w-xl text-slate">
          Farmers and consumers are not subscriptions. Their tabs are{" "}
          <Link to="/farmers" className="underline decoration-stamp underline-offset-4">
            Farmers
          </Link>{" "}
          and{" "}
          <Link to="/consumers" className="underline decoration-stamp underline-offset-4">
            Consumers
          </Link>
          . A paid seat puts the same file where a guest, a roaster, or a buyer will open it. Nothing here is charged.
        </p>
        <ul className="mt-8">
          {subscribeBenefits.map((row) => {
            const plan = plans.find((item) => item.id === row.seat);
            return (
              <li key={row.who} className="grid gap-1 border-t border-hair py-4 sm:grid-cols-[9rem_8rem_1fr] sm:gap-6">
                <p className="font-display text-2xl">{row.who}</p>
                <p className="font-mono text-[11px] tracking-[0.14em] text-stamp uppercase">
                  {plan?.title} · {plan?.price}
                </p>
                <p className="text-sm">{plan?.brief}</p>
              </li>
            );
          })}
        </ul>
      </Sheet>

      <Sheet>
        <Eyebrow>Register a seat</Eyebrow>
        <h2 className="mt-2 font-display text-3xl">Your name, and which desk.</h2>
        <SeatForm initial="bar" />
      </Sheet>

      {requests.length ? (
        <Sheet>
          <Eyebrow>On this browser</Eyebrow>
          <ul className="mt-4">
            {requests.map((row) => (
              <li key={row.id} className="border-t border-hair py-3 text-sm">
                <span className="font-display text-xl">{row.name}</span>
                <span className="mt-1 block text-slate">
                  {row.planId} · {row.email}
                  {row.place ? ` · ${row.place}` : ""}
                </span>
              </li>
            ))}
          </ul>
        </Sheet>
      ) : null}
    </div>
  );
}
