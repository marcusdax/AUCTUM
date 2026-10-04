import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, ScanLine, ShieldCheck, X } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { BlockedActionPanel } from "@/components/blocked-panel";
import { InlineLesson } from "@/components/inline-lesson";
import { Button, Eyebrow, Sheet, buttonClass } from "@/components/ui";
import { blockedActions } from "@/lib/education";
import { useSeat } from "@/lib/seat";
import { useEducation } from "@/lib/education-store";
import { formatDate } from "@/lib/format";
import { confidenceTone, criticalsOpen, prepareCapture, proposeExtraction } from "@/lib/ocr";
import { memoToken } from "@/lib/payments";
import { useLedger } from "@/lib/store";
import type { DocKind } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/scan")({ component: ScanPage });

const kinds: { id: DocKind; label: string }[] = [
  { id: "qc", label: "QC / cupping" },
  { id: "contract", label: "Contract" },
  { id: "receipt", label: "Farmgate receipt" },
  { id: "eudr", label: "EUDR packet" },
  { id: "phytosanitary", label: "Phytosanitary" },
  { id: "identity", label: "Identity" },
];

const toneClass = {
  ok: "bg-sage text-paper",
  watch: "bg-brass text-paper",
  warn: "bg-stamp text-paper",
} as const;

function ScanPage() {
  const documents = useLedger((s) => s.documents);
  const accounts = useLedger((s) => s.accounts);
  const ingestScan = useLedger((s) => s.ingestScan);
  const setDocStatus = useLedger((s) => s.setDocStatus);
  const reviseField = useLedger((s) => s.reviseField);
  const canAccept = useEducation((s) => s.hasAuthority("DOC_OPERATOR"));
  const tier = useSeat((s) => s.tier);
  const [held, setHeld] = useState(false);
  const credentials = useEducation((s) => s.credentials);
  const beginRemedy = useEducation((s) => s.beginRemedy);
  const inline = useEducation((s) => s.inlineLessonId);
  const closeInline = useEducation((s) => s.closeInline);
  const fileRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [kind, setKind] = useState<DocKind>("qc");
  const [stage, setStage] = useState<"idle" | "scanning" | "review">("idle");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showBlock, setShowBlock] = useState(false);
  const active = documents.find((d) => d.id === activeId) ?? documents.find((d) => d.status === "review");
  const docBlock = blockedActions(credentials).find((b) => b.credentialType === "DOC_OPERATOR");
  const openCritical = criticalsOpen(active?.fieldMeta);

  async function runScan(file?: File) {
    setStage("scanning");
    let previewUrl: string | undefined;
    if (file) {
      try {
        previewUrl = await prepareCapture(file);
      } catch {
        previewUrl = undefined;
      }
    }
    const proposal = proposeExtraction(kind, kind === "receipt" ? memoToken("inv-110") : undefined);
    const id = ingestScan({ ...proposal, previewUrl });
    setActiveId(id);
    setStage("review");
  }

  function tryAccept(id: string) {
    if (tier === "open") {
      setHeld(true);
      return;
    }
    const doc = documents.find((d) => d.id === id);
    if (doc && criticalsOpen(doc.fieldMeta)) return;
    if (!canAccept) {
      setShowBlock(true);
      return;
    }
    setDocStatus(id, "accepted");
    setStage("idle");
    setShowBlock(false);
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
          Capture, contrast, propose. A person accepts. Critical fields — cup score, moisture, price, volume,
          amount — must be touched even when the model is sure. A QC accept files a draft. It does not change
          the lot score.
        </p>
      </Sheet>

      {showBlock && docBlock && !canAccept ? (
        <BlockedActionPanel
          block={docBlock}
          onBegin={(id) => {
            beginRemedy(id);
            setShowBlock(true);
          }}
        />
      ) : null}

      {inline ? (
        <Sheet>
          <Eyebrow>Before you can accept this document</Eyebrow>
          <InlineLesson lessonId={inline} onDismiss={closeInline} onDone={() => closeInline()} />
          <Link to="/education/assess/$assessmentId" params={{ assessmentId: "e-cal" }} className={buttonClass("stamp", "mt-4")}>
            Continue to monthly calibration
          </Link>
        </Sheet>
      ) : null}

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
            onClick={() => fileRef.current?.click()}
            disabled={stage === "scanning"}
            className="relative mt-6 flex min-h-56 w-full flex-col items-center justify-center overflow-hidden border border-dashed border-hair-strong bg-sheet"
          >
            <img src="/images/cupping-table.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <span className="relative flex flex-col items-center gap-3 px-6 text-center text-ink">
              <ScanLine size={28} />
              <span className="font-display text-xl">{stage === "scanning" ? "Reading the sheet…" : "Photograph or drop a page"}</span>
              <span className="text-sm text-slate">SCA report, contract, warehouse receipt. Contrast is stretched before the proposal.</span>
            </span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/heic,application/pdf"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void runScan(file);
              event.target.value = "";
            }}
          />
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void runScan(file);
              event.target.value = "";
            }}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <Button className="flex-1" tone="stamp" onClick={() => cameraRef.current?.click()} disabled={stage === "scanning"}>
              <Camera size={16} /> Take photo
            </Button>
            <Button className="flex-1" tone="ghost" onClick={() => void runScan()} disabled={stage === "scanning"}>
              Propose without a file
            </Button>
          </div>
        </Sheet>

        <Sheet>
          <Eyebrow>Review</Eyebrow>
          {active && (stage === "review" || active.status === "review") ? (
            <div className="mt-4 grid gap-5 sm:grid-cols-[0.85fr_1.15fr]">
              <div className="border border-hair bg-sheet">
                <img
                  src={active.previewUrl ?? "/images/cupping-table.jpg"}
                  alt="Captured page"
                  className="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-2xl">{active.title}</h2>
                  <span className={cn("px-2 py-1 font-mono text-[11px]", toneClass[confidenceTone(active.confidence)])}>
                    {Math.round(active.confidence * 100)}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate">
                  {accounts.find((a) => a.id === active.accountId)?.name} · {formatDate(active.capturedAt)}
                </p>
                <div className="mt-4 space-y-3">
                  {Object.entries(active.fields).map(([key, value]) => {
                    const meta = active.fieldMeta?.find((field) => field.key === key);
                    const tone = confidenceTone(meta?.confidence ?? active.confidence);
                    return (
                      <label key={key} className="block">
                        <span className="flex items-center justify-between gap-2">
                          <span className="meta">
                            {key}
                            {meta?.critical ? " · critical" : ""}
                            {meta?.touched ? " · touched" : ""}
                          </span>
                          <span className={cn("px-1.5 py-0.5 font-mono text-[10px]", toneClass[tone])}>
                            {Math.round((meta?.confidence ?? active.confidence) * 100)}
                          </span>
                        </span>
                        <input
                          value={value}
                          onChange={(event) => reviseField(active.id, key, event.target.value)}
                          className={cn(
                            "mt-1 w-full border bg-paper px-3 py-2 font-mono text-sm",
                            meta?.critical && !meta.touched ? "border-stamp" : "border-hair-strong",
                          )}
                        />
                      </label>
                    );
                  })}
                </div>
                {active.notes ? <p className="mt-3 text-sm text-slate">{active.notes}</p> : null}
                {active.kind === "eudr" ? (
                  <p className="mt-3 text-sm text-slate">
                    A polygon is the field that matters. A town, a pin, or “member plots” without a boundary does not clear the lot. Accepting the page writes the ledger. It does not file a due diligence statement.
                  </p>
                ) : null}
                {openCritical ? (
                  <p className="mt-3 text-sm text-stamp">Touch every critical field before this sheet can be accepted.</p>
                ) : null}
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button tone="stamp" onClick={() => tryAccept(active.id)} disabled={openCritical}>
                    <ShieldCheck size={16} /> Accept onto ledger
                  </Button>
                  {held ? (
                    <p className="mt-3 text-sm text-stamp">
                      Open can read the proposal. Accepting it onto the ledger is the desk. Nothing is billed.
                    </p>
                  ) : null}
                  <Button
                    tone="ghost"
                    onClick={() => {
                      setDocStatus(active.id, "rejected");
                      setStage("idle");
                    }}
                  >
                    <X size={16} /> Reject
                  </Button>
                  {active.kind === "receipt" ? (
                    <Link to="/payments" className={buttonClass("quiet")}>
                      Open the receivables desk
                    </Link>
                  ) : null}
                </div>
                {!canAccept ? (
                  <p className="mt-3 text-xs text-stamp">DOC_OPERATOR is lapsed. Accept is blocked until the renewal path is complete.</p>
                ) : null}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-slate">The page sits on the left. The proposal sits on the right. Nothing writes until a human accepts.</p>
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
                  {criticalsOpen(d.fieldMeta) ? " · critical open" : ""}
                </p>
              </div>
              <Button tone="quiet" className="min-h-9" onClick={() => { setActiveId(d.id); setStage("review"); }}>
                Review
              </Button>
            </li>
          ))}
        </ul>
      </Sheet>
    </div>
  );
}
