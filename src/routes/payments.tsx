import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Eyebrow, Sheet } from "@/components/ui";
import { useT } from "@/lib/locale-store";
import { AGING_LABEL, agingSummary, formatMinor, outstanding, type AgingBucket } from "@/lib/payments";
import { usePayments } from "@/lib/payments-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/payments")({ component: PaymentsPage });

const order: AgingBucket[] = ["current", "d30", "d60", "d90", "d90p"];

function PaymentsPage() {
  const t = useT();
  const invoices = usePayments((s) => s.invoices);
  const txns = usePayments((s) => s.txns);
  const lastNote = usePayments((s) => s.lastNote);
  const createIntent = usePayments((s) => s.createIntent);
  const receivePayos = usePayments((s) => s.receivePayos);
  const receiveCasso = usePayments((s) => s.receiveCasso);
  const reset = usePayments((s) => s.reset);
  const [copied, setCopied] = useState<string | null>(null);
  const buckets = agingSummary(invoices);
  const peak = Math.max(1, ...order.map((key) => buckets[key]));
  const suspense = txns.filter((txn) => txn.matchStatus === "unmatched" || txn.matchStatus === "refused" || txn.residualMinor > 0);
  const pilot = invoices.find((invoice) => invoice.id === "inv-084");

  async function copyMemo(token: string) {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(token);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>{t("pay.eye")}</Eyebrow>
        <h1 className="mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl">{t("pay.h1")}</h1>
        <p className="mt-3 max-w-xl text-slate">{t("pay.body")}</p>
        <p className="mt-4 border border-hair bg-sheet px-3 py-2 font-mono text-xs">{lastNote}</p>
      </Sheet>

      <Sheet>
        <Eyebrow>Aging · Asia/Ho_Chi_Minh</Eyebrow>
        <div className="mt-4 grid gap-4 sm:grid-cols-5">
          {order.map((key) => (
            <div key={key}>
              <p className="meta">{AGING_LABEL[key]}</p>
              <p className="mt-1 font-mono text-sm tabular">{formatMinor(buckets[key], "VND")}</p>
              <div className="mt-2 h-1.5 bg-raw">
                <div className="h-full bg-stamp" style={{ width: `${(buckets[key] / peak) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Sheet>
          <Eyebrow>Open invoices</Eyebrow>
          <ul className="mt-3 divide-y divide-hair">
            {invoices.map((invoice) => (
              <li key={invoice.id} className="py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-xl">{invoice.counterparty}</p>
                  <p className="font-mono text-sm tabular">{formatMinor(outstanding(invoice), invoice.currency)} due</p>
                </div>
                <p className="meta mt-1">
                  {invoice.lotCode} · {invoice.status.replace("_", " ")} · {invoice.id}
                </p>
                <button
                  type="button"
                  onClick={() => void copyMemo(invoice.memoToken)}
                  className="mt-2 min-h-11 font-mono text-sm tracking-[0.14em]"
                >
                  {invoice.memoToken}
                  <span className="ml-2 text-slate">{copied === invoice.memoToken ? "copied" : "copy memo"}</span>
                </button>
              </li>
            ))}
          </ul>
        </Sheet>

        <Sheet>
          <Eyebrow>Pilot · {pilot?.memoToken}</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">Settle Atlas without double credit</h2>
          <p className="mt-2 text-sm text-slate">
            Ninety percent first. The remainder second. A repeated webhook must not pay the invoice twice. A Casso
            callback that cannot be re-fetched must not move money.
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <Button
              tone="stamp"
              onClick={() => {
                if (!pilot) return;
                const intent = createIntent("atlas-week", { invoiceId: pilot.id, amountMinor: pilot.totalMinor });
                if (!intent.ok) return;
                receivePayos({
                  providerTxnId: "payos-atlas-90",
                  amountMinor: Math.round(pilot.totalMinor * 0.9),
                  memo: pilot.memoToken,
                  signatureOk: true,
                });
              }}
            >
              PayOS · 90% · signed
            </Button>
            <Button
              tone="ghost"
              onClick={() => {
                if (!pilot) return;
                receivePayos({
                  providerTxnId: "payos-atlas-rest",
                  amountMinor: pilot.totalMinor - Math.round(pilot.totalMinor * 0.9),
                  memo: pilot.memoToken,
                  signatureOk: true,
                });
              }}
            >
              PayOS · remainder
            </Button>
            <Button
              tone="ghost"
              onClick={() => {
                if (!pilot) return;
                receivePayos({
                  providerTxnId: "payos-atlas-90",
                  amountMinor: Math.round(pilot.totalMinor * 0.9),
                  memo: pilot.memoToken,
                  signatureOk: true,
                });
              }}
            >
              Replay the same webhook
            </Button>
            <Button
              tone="quiet"
              onClick={() =>
                receivePayos({
                  providerTxnId: "payos-forged",
                  amountMinor: 1_000_000,
                  memo: "AUCFAKE",
                  signatureOk: false,
                })
              }
            >
              Forged signature
            </Button>
            <Button
              tone="quiet"
              onClick={() =>
                receiveCasso({
                  providerTxnId: "casso-miss",
                  amountMinor: 48_200_000,
                  memo: invoices.find((invoice) => invoice.id === "inv-110")?.memoToken ?? "",
                  tokenOk: true,
                  refetchOk: false,
                })
              }
            >
              Casso · token ok, re-fetch fails
            </Button>
            <Button
              tone="quiet"
              onClick={() => {
                createIntent("atlas-week", { invoiceId: "inv-084", amountMinor: 1 });
              }}
            >
              Reuse the intent key
            </Button>
            <Button tone="ghost" onClick={() => reset()}>
              Reset the desk
            </Button>
          </div>
        </Sheet>
      </div>

      <Sheet>
        <Eyebrow>Exception queue</Eyebrow>
        <h2 className="mt-2 font-display text-2xl">Unmatched money stays visible</h2>
        {suspense.length === 0 ? <p className="mt-3 text-sm text-slate">Nothing in suspense.</p> : null}
        <ul className="mt-2 divide-y divide-hair">
          {txns.map((txn) => (
            <li key={txn.id} className="flex flex-wrap items-baseline justify-between gap-3 py-3">
              <div>
                <p className="font-mono text-sm">
                  {txn.provider} · {txn.providerTxnId}
                </p>
                <p className={cn("mt-1 text-sm", txn.matchStatus === "refused" || txn.matchStatus === "unmatched" ? "text-stamp" : "text-slate")}>
                  {txn.note}
                </p>
              </div>
              <p className="font-mono text-sm tabular">
                {formatMinor(txn.allocatedMinor, txn.currency)}
                {txn.residualMinor ? ` · left ${formatMinor(txn.residualMinor, txn.currency)}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </Sheet>
    </div>
  );
}
