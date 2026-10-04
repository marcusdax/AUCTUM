import { useEffect, useState } from "react";
import { ago, readStation, STATIONS, type Reading } from "@/lib/feeds";
import { formatDate } from "@/lib/format";
import { usePayments } from "@/lib/payments-store";
import { useLedger } from "@/lib/store";
import { Eyebrow, Sheet } from "./ui";

export function LiveTape() {
  const events = useLedger((s) => s.events);
  const lots = useLedger((s) => s.lots);
  const txns = usePayments((s) => s.txns);
  const [readings, setReadings] = useState<Reading[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let stop = false;
    async function pull() {
      try {
        const rows = await Promise.all(STATIONS.map((station) => readStation(station)));
        if (!stop) {
          setReadings(rows);
          setFailed(false);
        }
      } catch {
        if (!stop) setFailed(true);
      }
    }
    void pull();
    const poll = window.setInterval(() => void pull(), 60_000);
    const tick = window.setInterval(() => setNow(Date.now()), 15_000);
    return () => {
      stop = true;
      window.clearInterval(poll);
      window.clearInterval(tick);
    };
  }, []);

  const offers = lots.filter((lot) => lot.availability === "available" || lot.availability === "offer").length;
  const samples = lots.filter((lot) => lot.availability === "sample").length;
  const locks = lots.filter((lot) => lot.availability === "locked").length;
  const suspense = txns.filter((txn) => txn.matchStatus === "unmatched" || txn.matchStatus === "refused").length;
  const clock = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
    hourCycle: "h23",
  }).format(now);

  return (
    <Sheet>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow>Live tape</Eyebrow>
          <h2 className="mt-2 font-display text-3xl">What the desks can see now</h2>
        </div>
        <p className="font-mono text-sm tabular">Buôn Ma Thuột {clock}</p>
      </div>
      <p className="mt-3 max-w-xl text-sm text-slate">
        Origin weather is read from the public forecast, once a minute. The C-market figure above stays the
        filed reference. The futures tape did not answer, so it is not invented here.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {failed ? <p className="text-sm text-stamp sm:col-span-2">The origin tape did not answer. The ledger below still did.</p> : null}
        {!readings && !failed ? <p className="text-sm text-slate sm:col-span-2">Reading the stations…</p> : null}
        {readings?.map((reading) => (
          <div key={reading.id} className="border-t border-hair pt-3">
            <p className="font-display text-xl">{reading.name}</p>
            <p className="meta">{reading.detail}</p>
            <p className="mt-2 font-mono text-sm tabular">
              {reading.temperatureC.toFixed(1)}°C · {Math.round(reading.humidity)}% · {reading.rainMm.toFixed(1)} mm
            </p>
            <p className="mt-1 text-xs text-slate">Observed {reading.observedAt.replace("T", " ")}</p>
          </div>
        ))}
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-hair pt-4 sm:grid-cols-4">
        <div>
          <dt className="meta">On offer</dt>
          <dd className="font-display text-2xl tabular">{offers}</dd>
        </div>
        <div>
          <dt className="meta">Samples out</dt>
          <dd className="font-display text-2xl tabular">{samples}</dd>
        </div>
        <div>
          <dt className="meta">Locks</dt>
          <dd className="font-display text-2xl tabular">{locks}</dd>
        </div>
        <div>
          <dt className="meta">Unmatched money</dt>
          <dd className="font-display text-2xl tabular">{suspense}</dd>
        </div>
      </dl>
      <ol className="mt-6 space-y-3">
        {events.slice(0, 6).map((event) => (
          <li key={event.id} className="flex flex-wrap items-baseline justify-between gap-3 border-t border-hair pt-3">
            <div>
              <p className="font-mono text-[10px] tracking-[0.14em] text-slate uppercase">{event.kind}</p>
              <p className="mt-1 text-sm">{event.summary}</p>
            </div>
            <p className="font-mono text-xs text-slate">{ago(event.at, now)} · {formatDate(event.at)}</p>
          </li>
        ))}
      </ol>
    </Sheet>
  );
}
