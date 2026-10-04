import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ARCHETYPES, DIALS, FAMILIES, PROCESSES, RECIPES, type Tier } from "@/lib/foundry";
import { Eyebrow, buttonClass } from "./ui";
import { cn } from "@/lib/utils";

const tierClass: Record<Tier, string> = {
  HOUSE: "text-ink",
  SEMI: "text-slate",
  "DE NOVO": "text-stamp",
};

export function FoundryMenu() {
  const [door, setDoor] = useState<"process" | "cup">("process");
  const [family, setFamily] = useState<string>("All");
  const [selected, setSelected] = useState<string>("WSH-01");
  const [recipeId, setRecipeId] = useState<string>("r1");

  const processes = useMemo(
    () => PROCESSES.filter((card) => family === "All" || card.family === family),
    [family],
  );
  const activeProcess = PROCESSES.find((card) => card.code === selected);
  const activeCup = ARCHETYPES.find((card) => card.code === selected);
  const recipe = RECIPES.find((card) => card.id === recipeId) ?? RECIPES[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {(["process", "cup"] as const).map((id) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setDoor(id);
              setSelected(id === "process" ? "WSH-01" : "A-0202");
            }}
            className={cn(
              "min-h-11 border px-4 font-mono text-[11px] tracking-[0.14em] uppercase",
              door === id ? "border-ink bg-ink text-paper" : "border-hair-strong",
            )}
          >
            {id === "process" ? "Door I · I know the method" : "Door II · I know the cup"}
          </button>
        ))}
      </div>

      {door === "process" ? (
        <div className="flex flex-wrap gap-2">
          {["All", ...FAMILIES].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setFamily(name)}
              className={cn("min-h-11 px-2 font-mono text-[10px] tracking-[0.14em] uppercase", family === name ? "text-ink underline decoration-stamp underline-offset-4" : "text-slate")}
            >
              {name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <ul className="divide-y divide-hair border-y border-hair">
          {door === "process"
            ? processes.map((card) => (
                <li key={card.code}>
                  <button type="button" onClick={() => setSelected(card.code)} className="flex w-full items-baseline justify-between gap-3 py-3 text-left">
                    <span>
                      <span className="font-mono text-[11px] text-slate">{card.code}</span>
                      <span className="mt-0.5 block font-display text-xl">{card.name}</span>
                    </span>
                    <span className={cn("font-mono text-[10px] tracking-[0.14em]", tierClass[card.tier])}>{card.tier}</span>
                  </button>
                </li>
              ))
            : ARCHETYPES.map((card) => (
                <li key={card.code}>
                  <button type="button" onClick={() => setSelected(card.code)} className="flex w-full items-baseline justify-between gap-3 py-3 text-left">
                    <span>
                      <span className="font-mono text-[11px] text-slate">{card.code}</span>
                      <span className="mt-0.5 block font-display text-xl">{card.name}</span>
                    </span>
                    <span className="font-mono text-[10px] text-slate">{card.band}</span>
                  </button>
                </li>
              ))}
        </ul>
        <div className="border border-hair bg-sheet p-5">
          {door === "process" && activeProcess ? (
            <>
              <Eyebrow>{activeProcess.family} · {activeProcess.tier}</Eyebrow>
              <h3 className="mt-2 font-display text-3xl">{activeProcess.name}</h3>
              <p className="mt-3 text-sm">{activeProcess.mechanism}</p>
              <p className="mt-3 text-sm text-slate">{activeProcess.signature}</p>
              <p className="mt-3 text-sm text-stamp">Fails as — {activeProcess.failsAs}</p>
              <p className="mt-4 font-mono text-[11px] tracking-[0.12em] uppercase">Routes {activeProcess.routes.join(" · ")}</p>
            </>
          ) : null}
          {door === "cup" && activeCup ? (
            <>
              <Eyebrow>{activeCup.family} · estimate {activeCup.band}</Eyebrow>
              <h3 className="mt-2 font-display text-3xl">{activeCup.name}</h3>
              <p className="mt-3 text-sm">{activeCup.cup}</p>
              <p className="mt-4 text-sm text-slate">Primary {activeCup.primary}. Alternate {activeCup.alternate}. The band is a calibration estimate, not a promise.</p>
              <button type="button" className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase" onClick={() => { setDoor("process"); setSelected(activeCup.primary); setFamily("All"); }}>
                Open the primary route
              </button>
            </>
          ) : null}
          <p className="mt-5 text-xs text-slate">This sheet does not take an order. The protocol packet is the asset, and it is not issued here.</p>
          <Link to="/foundry" className={buttonClass("ghost", "mt-4")}>The door, when it opens</Link>
        </div>
      </div>

      <div>
        <Eyebrow>Nine dials</Eyebrow>
        <ul className="mt-3 grid gap-3 sm:grid-cols-3">
          {DIALS.map(([name, line]) => (
            <li key={name} className="border-t border-hair pt-3">
              <p className="font-display text-lg">{name}</p>
              <p className="mt-1 text-sm text-slate">{line}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Eyebrow>Field manual · wet hands</Eyebrow>
        <h3 className="mt-2 font-display text-2xl">Nine cards you can take to the tank</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {RECIPES.map((card) => (
            <button key={card.id} type="button" onClick={() => setRecipeId(card.id)} className={cn("min-h-11 border px-3 font-mono text-[10px] tracking-[0.12em] uppercase", recipe.id === card.id ? "border-ink bg-ink text-paper" : "border-hair-strong")}>
              {card.name}
            </button>
          ))}
        </div>
        <div className="mt-4 border border-hair p-5">
          <p className="font-mono text-[11px] tracking-[0.14em] text-slate uppercase">Maps to {recipe.maps}</p>
          <p className="mt-2 text-sm">{recipe.endpoint}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm">
            {recipe.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-stamp">{recipe.warn}</p>
        </div>
      </div>
    </div>
  );
}
