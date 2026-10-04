import { createFileRoute, Link } from "@tanstack/react-router";
import { SeatForm } from "@/components/seat-form";
import { buttonClass, Eyebrow, Sheet } from "@/components/ui";
import { plans } from "@/lib/pricing";

export const Route = createFileRoute("/farmers")({ component: FarmersPage });

function FarmersPage() {
  const plan = plans.find((row) => row.id === "farmer");
  return (
    <div className="space-y-8">
      <Sheet>
        <Eyebrow>Farmer · {plan?.price}</Eyebrow>
        <h1 className="mt-3 max-w-[14ch] font-display text-[clamp(2.4rem,6vw,4.4rem)] leading-[0.92]">{plan?.brief}</h1>
        <p className="mt-5 max-w-xl text-slate">{plan?.point}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/spaces/$spaceId" params={{ spaceId: "mai" }} className={buttonClass("stamp")}>
            Open a Space
          </Link>
          <Link to="/education" className={buttonClass("ghost")}>
            The three sittings
          </Link>
        </div>
      </Sheet>
      <Sheet>
        <Eyebrow>Register</Eyebrow>
        <h2 className="mt-2 font-display text-3xl">A name on the file. Not a bill.</h2>
        <SeatForm initial="farmer" />
      </Sheet>
    </div>
  );
}
