import { createFileRoute, Link } from "@tanstack/react-router";
import { SeatForm } from "@/components/seat-form";
import { buttonClass, Eyebrow, Sheet } from "@/components/ui";
import { plans } from "@/lib/pricing";

export const Route = createFileRoute("/consumers")({ component: ConsumersPage });

function ConsumersPage() {
  const plan = plans.find((row) => row.id === "consumer");
  return (
    <div className="space-y-8">
      <Sheet>
        <Eyebrow>Consumer · {plan?.price}</Eyebrow>
        <h1 className="mt-3 max-w-[14ch] font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.92]">{plan?.brief}</h1>
        <p className="mt-5 max-w-xl text-slate">{plan?.point}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/autopsy/$lotId" params={{ lotId: "lot-084" }} className={buttonClass("stamp")}>
            Open one bag
          </Link>
          <Link to="/market" className={buttonClass("ghost")}>
            The book
          </Link>
        </div>
      </Sheet>
      <Sheet>
        <Eyebrow>Register</Eyebrow>
        <h2 className="mt-2 font-display text-3xl">Follow the file. You are not sold a seat.</h2>
        <SeatForm initial="consumer" />
      </Sheet>
    </div>
  );
}
