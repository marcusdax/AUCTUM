import { Link } from "@tanstack/react-router";
import { assessEudr } from "@/lib/eudr";
import { areaHa } from "@/lib/geo";
import { plotFor, usePlots } from "@/lib/plot-store";
import { useLedger } from "@/lib/store";
import type { Lot } from "@/lib/types";
import { buttonClass, Eyebrow } from "./ui";

export function EudrPanel({ lot }: { lot: Lot }) {
  const docs = useLedger((s) => s.documents);
  const plots = usePlots((s) => s.plots);
  const file = assessEudr(lot, docs);
  const drawn = plotFor(plots, lot.producerId);

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <Eyebrow>EUDR · the plot</Eyebrow>
        <p className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">{file.mark}</p>
      </div>
      <h2 className="mt-2 max-w-[24ch] font-display text-3xl">{file.headline}</h2>
      <p className="mt-3 max-w-xl text-sm text-slate">
        Coffee placed on the Union market needs a polygon of the plot, not a town, and a statement that the land was not deforested after 31 December 2020. The farmer is not charged to put the plot on the file. This desk will not call a lot cleared.
      </p>
      <ul className="mt-6">
        {file.lines.map((line) => (
          <li key={line.label} className="grid grid-cols-[0.7rem_1fr] gap-4 border-t border-hair py-3">
            <span className={line.ok ? "mt-1.5 size-2.5 bg-ink" : "mt-1.5 size-2.5 border border-stamp"} />
            <div>
              <p className="meta">{line.label}</p>
              <p className="mt-1 text-sm">{line.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      {drawn ? (
        <p className="mt-4 text-sm">
          A {drawn.vertices.length === 1 ? "point" : `boundary of ${areaHa(drawn.vertices).toFixed(2)} ha`} is drawn on the Space. It has not been accepted as the packet.
        </p>
      ) : (
        <p className="mt-4 text-sm text-slate">No boundary has been drawn on the Space.</p>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/eudr" className={buttonClass("stamp")}>
          The EU book
        </Link>
        <Link to="/scan" className={buttonClass("ghost")}>
          Capture a geolocation packet
        </Link>
      </div>
    </div>
  );
}
