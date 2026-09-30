import { createFileRoute, Link } from "@tanstack/react-router";
import { TrustBadge } from "@/components/trust-badge";
import { Eyebrow, Sheet } from "@/components/ui";
import { spaces } from "@/lib/data";
import { roleLabel } from "@/lib/format";
import { accountById, useLedger } from "@/lib/store";

export const Route = createFileRoute("/spaces")({ component: SpacesPage });

function SpacesPage() {
  const accounts = useLedger((s) => s.accounts);
  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Spaces</Eyebrow>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Rooms inside a coherent system</h1>
        <p className="mt-3 max-w-xl text-slate">
          A farmer Space is identity, shopfront, compliance file, and income ledger. Personal without
          becoming chaotic. Sanctioned modules only.
        </p>
      </Sheet>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {spaces.map((sp) => {
          const account = accountById(accounts, sp.accountId);
          if (!account) return null;
          const slug = account.id.replace("acc-", "");
          return (
            <Link
              key={sp.id}
              to="/spaces/$spaceId"
              params={{ spaceId: slug }}
              className="group overflow-hidden bg-paper shadow-[var(--shadow-sheet)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="relative aspect-[16/9]">
                <img src={sp.cover} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4">
                  <p className="font-mono text-[10px] tracking-[0.16em] text-stamp-soft uppercase">
                    {roleLabel(account.role)}
                  </p>
                  <h2 className="font-display text-2xl text-paper">{account.name}</h2>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 p-4">
                <p className="text-sm text-slate">
                  {account.locale}, {account.country}
                </p>
                <TrustBadge trust={account.trust} size="sm" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
