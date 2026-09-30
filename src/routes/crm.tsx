import { createFileRoute, Link } from "@tanstack/react-router";
import { TrustBadge } from "@/components/trust-badge";
import { Eyebrow, Sheet, Stat } from "@/components/ui";
import { formatCents, formatKg, roleLabel } from "@/lib/format";
import { useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/crm")({ component: CrmPage });

function CrmPage() {
  const accounts = useLedger((s) => s.accounts);
  const ar = accounts.reduce((n, a) => n + a.outstandingCents, 0);
  const atRisk = accounts.filter((a) => a.lifecycle === "at-risk" || a.churnRisk >= 30).length;
  const retained = accounts.filter((a) => a.lifecycle === "retained").length;

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>CRM</Eyebrow>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Relationships with a ledger attached</h1>
        <p className="mt-3 max-w-xl text-slate">
          Lifecycle, outstanding, churn, and trust travel with every profile. A conversation can graduate
          into a sample, an offer, a lock, a receipt.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Stat label="Accounts" value={accounts.length} />
          <Stat label="Retained" value={retained} />
          <Stat label="Watch / risk" value={atRisk} />
          <Stat label="AR aging" value={formatCents(ar)} />
        </div>
      </Sheet>
      <Sheet padded={false}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-hair">
                {["Account", "Role", "Trust", "Lifecycle", "Churn", "Volume", "AR"].map((h) => (
                  <th key={h} className="px-5 py-3 font-mono text-[10px] font-medium tracking-[0.16em] text-slate uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a.id} className="border-b border-hair last:border-0 hover:bg-sheet">
                  <td className="px-5 py-4">
                    <Link to="/crm/$accountId" params={{ accountId: a.id }} className="block">
                      <span className="font-display text-lg">{a.name}</span>
                      <span className="mt-0.5 block text-xs text-slate">
                        {a.locale}, {a.country}
                      </span>
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-slate">{roleLabel(a.role)}</td>
                  <td className="px-5 py-4">
                    <TrustBadge trust={a.trust} size="sm" />
                  </td>
                  <td className="px-5 py-4 capitalize">{a.lifecycle}</td>
                  <td className="px-5 py-4">
                    <span className={cn("tabular", a.churnRisk >= 30 ? "text-stamp" : "text-ink")}>
                      {a.churnRisk}%
                    </span>
                  </td>
                  <td className="px-5 py-4 tabular">{formatKg(a.volumeKgYtd)}</td>
                  <td className="px-5 py-4 tabular">{formatCents(a.outstandingCents)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sheet>
    </div>
  );
}
