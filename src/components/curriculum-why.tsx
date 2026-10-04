import { useState } from "react";
import { curriculumWhy } from "@/lib/curriculum-why";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./ui";

export function CurriculumWhy() {
  const [id, setId] = useState(curriculumWhy[0].id);
  const person = curriculumWhy.find((row) => row.id === id) ?? curriculumWhy[0];

  return (
    <section>
      <Eyebrow>Why finish it</Eyebrow>
      <h2 className="mt-2 max-w-[22ch] font-display text-3xl">The point, for the person who has to do the work.</h2>
      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Who is taking the curriculum">
        {curriculumWhy.map((row) => (
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
        <h3 className="font-display text-4xl leading-none">{person.title}</h3>
        <p className="mt-4 max-w-2xl font-display text-2xl leading-snug">{person.point}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <p className="text-sm">
            <span className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">Take</span>
            <span className="mt-1 block">{person.take}</span>
          </p>
          <p className="text-sm">
            <span className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">Leave</span>
            <span className="mt-1 block">{person.leave}</span>
          </p>
        </div>
        <dl className="mt-6 space-y-4 border-t border-hair pt-4">
          {person.stakes.map((stake) => (
            <div key={stake.label}>
              <dt className="font-mono text-[10px] tracking-[0.16em] uppercase">{stake.label}</dt>
              <dd className="mt-1 text-sm text-slate">{stake.value}</dd>
            </div>
          ))}
        </dl>
      </article>
    </section>
  );
}
