import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, Sheet, buttonClass } from "@/components/ui";

export const Route = createFileRoute("/foundry")({ component: FoundrySoon });

const stages = [
  ["01 Intent", "A buyer names a process code or an archetype. The other door is filled in by the join, including one alternate route."],
  ["02 Guardrails", "pH is the endpoint, not the clock. Temperature control is required above HOUSE. The varietal can veto. Every added material is declared. Stacked sugar and heat is one risk, not four."],
  ["03 Packet", "The protocol packet is issued after confirmation. Pitch, curves, and endpoints live there. The menu never did."],
  ["04 Mill", "HOUSE needs standing capacity. SEMI needs a mill that can hold the dial. DE NOVO is a research lot with no promise of next season."],
  ["05 Hooks", "Cherry intake, ferment start, the curve, the landing, the dry mill, the cup, the shipment. A missing retained sample means the disappointment cannot be investigated."],
  ["06 Deviation", "Predicted cup against cupped cup. The gap is how a DE NOVO protocol earns its way to SEMI, and SEMI to HOUSE."],
];

function FoundrySoon() {
  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Coming soon · not an order</Eyebrow>
        <h1 className="mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl">The door is drawn. It does not open.</h1>
        <p className="mt-3 max-w-xl text-slate">
          Flavor Foundry will take a selection and return a protocol packet, a mill, and a verification
          record. None of that runs on this desk yet. What follows is the architecture, so the menu on
          the craft tab has somewhere honest to point.
        </p>
        <Link to="/craft" className={buttonClass("stamp", "mt-6")}>
          Use the menu
        </Link>
      </Sheet>
      <ol className="grid gap-4 lg:grid-cols-2">
        {stages.map(([title, body]) => (
          <li key={title}>
            <Sheet>
              <h2 className="font-display text-2xl">{title}</h2>
              <p className="mt-3 text-sm text-slate">{body}</p>
            </Sheet>
          </li>
        ))}
      </ol>
      <Sheet>
        <Eyebrow>Intended gates</Eyebrow>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="border-t border-hair pt-3">HOUSE is the standing capacity. The intended floor is five bags.</li>
          <li className="border-t border-hair pt-3">SEMI is tuned to the lot. The intended floor is ten bags.</li>
          <li className="border-t border-hair pt-3">DE NOVO is research. Think in seasons, not in a reorder button.</li>
          <li className="border-t border-hair pt-3">A score band on an archetype is an estimate. Printing it as a guarantee is how the desk loses the right to predict anything.</li>
        </ul>
      </Sheet>
    </div>
  );
}
