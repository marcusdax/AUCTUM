import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { people, protocols } from "@/lib/landing";
import { curriculumWhy } from "@/lib/curriculum-why";
import { useSeat } from "@/lib/seat";
import { cn } from "@/lib/utils";
import { buttonClass, Eyebrow } from "./ui";

export function Landing() {
  const [id, setId] = useState(people[0].id);
  const setAudience = useSeat((s) => s.setAudience);
  const person = people.find((row) => row.id === id) ?? people[0];
  const why = curriculumWhy.find((row) => row.id === person.id);

  return (
    <div className="space-y-8">
      <section className="border-l-[3px] border-stamp bg-paper p-6 shadow-[var(--shadow-sheet)] sm:p-10">
        <Eyebrow>Auctum Ledger</Eyebrow>
        <h1 className="mt-3 max-w-[16ch] font-display text-[clamp(2.6rem,7vw,5rem)] leading-[0.92]">
          The farmer and the buyer share one file.
        </h1>
        <p className="mt-6 max-w-[34ch] font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-snug">
          The mark on the bag opens the autopsy. The autopsy opens the Space.
        </p>
        <p className="mt-4 max-w-xl text-slate">
          A story that cannot open a lot does not ship. The subsistence floor is what makes the sentence on a menu true: the person named was paid before the coffee was sold on. Quality changes their share. It does not take the floor back.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/autopsy/$lotId" params={{ lotId: "lot-084" }} className={buttonClass("stamp")}>
            Open one autopsy
          </Link>
          <Link to="/spaces/$spaceId" params={{ spaceId: "karmic" }} className={buttonClass("ghost")}>
            Enter the Space
          </Link>
          <Link to="/pricing" className={buttonClass("ghost")}>
            How a seat is priced
          </Link>
        </div>
      </section>

      <section>
        <Eyebrow>Who is buying, or pouring</Eyebrow>
        <div className="mt-3 flex flex-wrap gap-2" role="tablist" aria-label="Who this is for">
          {people.map((row) => (
            <button
              key={row.id}
              type="button"
              role="tab"
              aria-selected={row.id === person.id}
              onClick={() => setId(row.id)}
              className={cn(
                "min-h-11 border px-3 text-left font-mono text-[10px] tracking-[0.14em] uppercase",
                row.id === person.id ? "border-ink bg-ink text-paper" : "border-hair-strong bg-paper",
              )}
            >
              {row.title}
            </button>
          ))}
        </div>
        <article className="mt-4 bg-paper p-6 shadow-[var(--shadow-sheet)] sm:p-8" role="tabpanel">
          <h2 className="font-display text-4xl leading-none">{person.title}</h2>
          <p className="mt-4 max-w-xl font-display text-2xl leading-snug">{person.promise}</p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">The connection</dt>
              <dd className="mt-2 text-sm">{person.connection}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">The mark</dt>
              <dd className="mt-2 text-sm">{person.autopsy}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">The floor, in the story</dt>
              <dd className="mt-2 text-sm">{person.floor}</dd>
            </div>
            <div>
              <dt className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">What you are taught</dt>
              <dd className="mt-2 text-sm">{why?.point ?? person.curriculum}</dd>
            </div>
          </dl>
          <p className="mt-6 border-t border-hair pt-4 text-sm text-slate">{person.protocol}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/education"
              className={buttonClass("stamp")}
              onClick={() => setAudience(person.audience)}
            >
              Open the curriculum
            </Link>
            <Link to="/market" className={buttonClass("ghost")} onClick={() => setAudience(person.audience)}>
              See the book
            </Link>
          </div>
        </article>
      </section>

      <section>
        <Eyebrow>The rules, on the file</Eyebrow>
        <h2 className="mt-2 max-w-[20ch] font-display text-3xl">Four procedures. Every persona meets them as a record, not as a handbook.</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {protocols.map((rule) => (
            <div key={rule.id} className="border-t border-ink bg-paper p-5">
              <h3 className="font-display text-2xl">{rule.title}</h3>
              <p className="mt-2 text-sm text-slate">{rule.line}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 max-w-2xl text-xs text-slate">
          The partnership states a floor for Vietnamese robusta of not less than three dollars a pound, and a lot addendum may only sit above that benchmark. This desk shows the receipt. It does not yet pay the floor.
        </p>
      </section>
    </div>
  );
}
