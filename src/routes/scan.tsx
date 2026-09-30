import { createFileRoute } from "@tanstack/react-router";
import { ScanLine, ShieldCheck, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button, Eyebrow, FieldRow, Sheet } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { useLedger } from "@/lib/store";
import type { DocKind } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/scan")({ component: ScanPage });

const kinds: { id: DocKind; label: string; title: string; fields: Record<string, string> }[] = [
  {
    id: "qc",
    label: "QC / cupping",
    title: "Cupping sheet · new intake",
    fields: { lot: "AL-VN-26-110", score: "84.90", moisture: "10.9%", method: "SCA / Q" },
  },
  {
    id: "contract",
    label: "Contract",
    title: "Offer letter · Atlas",
    fields: { buyer: "Atlas Roastworks", lots: "AL-VN-26-084", lock: "4.12 USD/lb", volume: "2,520 kg" },
  },
  {
    id: "receipt",
    label: "Farmgate receipt",
    title: "VietQR receipt · Mai",
    fields: { payee: "Trần Thị Mai", amount: "VND 48,200,000", rail: "PayOS", basis: "farmgate" },
  },
  {
    id: "eudr",
    label: "EUDR packet",
    title: "Geolocation packet",
    fields: { polygons: "member plots", deforestation: "clear", harvest: "2025/26" },
  },
  {
    id: "phytosanitary",
    label: "Phytosanitary",
    title: "Phyto certificate",
    fields: { authority: "PPD Vietnam", lots: "AL-VN-26-091", status: "issued" },
  },
  {
    id: "identity",
    label: "Identity",
    title: "Farm registration",
    fields: { legal: "New garden", district: "Ea H'leo", consent: "recorded" },
  },
];

function ScanPage() {
  const documents = useLedger((s) => s.documents);
  const accounts = useLedger((s) => s.accounts);
  const ingestScan = useLedger((s) => s.ingestScan);
  const setDocStatus = useLedger((s) => s.setDocStatus);
  const [kind, setKind] = useState<DocKind>("qc");
  const [stage, setStage] = useState<"idle" | "scanning" | "review">("idle");
  const [activeId, setActiveId] = useState<string | null>(null);
  const spec = kinds.find((k) => k.id === kind)!;
  const active = documents.find((d) => d.id === activeId) ?? documents.find((d) => d.status === "review");

  function runScan() {
    setStage("scanning");
    window.setTimeout(() => {
      const id = ingestScan({
        kind,
        title: spec.title,
        accountId: kind === "receipt" || kind === "identity" ? "acc-mai" : kind === "qc" ? "acc-saigon" : "acc-karmic",
        lotId: kind === "identity" ? undefined : "lot-110",
        fields: spec.fields,
        confidence: 0.78 + Math.random() * 0.18,
      });
      setActiveId(id);
      setStage("review");
    }, 900);
  }

  const queue = useMemo(
    () => documents.filter((d) => d.status === "queued" || d.status === "extracted" || d.status === "review"),
    [documents],
  );

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>OCR desk</Eyebrow>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Paper becomes a ledger object</h1>
        <p className="mt-3 max-w-xl text-slate">
          Human in the loop. Extraction is a proposal. Accept writes the file and lifts document
          verification on the profile. Reject leaves a watch mark.
        </p>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Sheet>
          <Eyebrow>Capture</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">What is on the glass</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {kinds.map((k) => (
              <button
                key={k.id}
                type="button"
                onClick={() => setKind(k.id)}
                className={cn(
                  "min-h-11 border px-3 font-mono text-[11px] tracking-[0.12em] uppercase",
                  kind === k.id ? "border-ink bg-ink text-paper" : "border-hair-strong bg-transparent",
                )}
              >
                {k.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={runScan}
            disabled={stage === "scanning"}
            className="relative mt-6 flex min-h-56 w-full flex-col items-center justify-center overflow-hidden border border-dashed border-hair-strong bg-sheet"
          >
            <img
              src="/images/cupping-table.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <span className="relative flex flex-col items-center gap-3 text-ink">
              <ScanLine size={28} />
              <span className="font-display text-xl">
                {stage === "scanning" ? "Reading the sheet…" : "Place a document"}
              </span>
              <span className="text-sm text-slate">Simulated Claude vision extraction</span>
            </span>
          </button>
          <Button className="mt-4 w-full" tone="stamp" onClick={runScan} disabled={stage === "scanning"}>
            Run extraction
          </Button>
        </Sheet>

        <Sheet>
          <Eyebrow>Review</Eyebrow>
          {active && (stage === "review" || active.status === "review") ? (
            <>
              <div className="mt-2 flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl">{active.title}</h2>
                <span className="font-mono text-sm tabular">
                  {Math.round(active.confidence * 100)}%
                </span>
              </div>
              <p className="mt-1 text-sm text-slate">
                {accounts.find((a) => a.id === active.accountId)?.name} · {formatDate(active.capturedAt)}
              </p>
              <dl className="mt-5">
                {Object.entries(active.fields).map(([k, v]) => (
                  <FieldRow key={k} label={k} value={v} />
                ))}
              </dl>
              {active.notes ? <p className="mt-3 text-sm text-stamp">{active.notes}</p> : null}
              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  tone="stamp"
                  onClick={() => {
                    setDocStatus(active.id, "accepted");
                    setStage("idle");
                  }}
                >
                  <ShieldCheck size={16} /> Accept onto ledger
                </Button>
                <Button
                  tone="ghost"
                  onClick={() => {
                    setDocStatus(active.id, "rejected");
                    setStage("idle");
                  }}
                >
                  <X size={16} /> Reject
                </Button>
              </div>
            </>
          ) : (
            <p className="mt-6 text-sm text-slate">
              Extracted fields appear here beside the capture. Nothing writes until a human accepts.
            </p>
          )}
        </Sheet>
      </div>

      <Sheet>
        <Eyebrow>Queue</Eyebrow>
        <h2 className="mt-2 font-display text-2xl">Waiting on the desk</h2>
        <ul className="mt-4 divide-y divide-hair">
          {queue.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
              <div>
                <p>{d.title}</p>
                <p className="meta mt-1">
                  {d.kind} · {d.status} · {Math.round(d.confidence * 100)}%
                </p>
              </div>
              <div className="flex gap-2">
                <Button tone="quiet" className="min-h-9" onClick={() => setActiveId(d.id)}>
                  Review
                </Button>
                {d.status !== "accepted" ? (
                  <Button tone="ghost" className="min-h-9" onClick={() => setDocStatus(d.id, "accepted")}>
                    Accept
                  </Button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Sheet>
    </div>
  );
}
