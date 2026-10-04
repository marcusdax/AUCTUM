import { createFileRoute, Link } from "@tanstack/react-router";
import { BagPanel } from "@/components/bag";
import { TrustBadge } from "@/components/trust-badge";
import { Eyebrow, Sheet } from "@/components/ui";
import { spaces } from "@/lib/data";
import { roleLabel } from "@/lib/format";
import { accountById, useLedger } from "@/lib/store";

export const Route = createFileRoute("/spaces")({ component: SpacesPage });

function SpacesPage() {
  const accounts = useLedger((s) => s.accounts);
  const lots = useLedger((s) => s.lots);
  const stories = useLedger((s) => s.stories);
  const featured = lots.find((lot) => lot.id === "lot-084") ?? lots[0];
  const producer = featured ? accountById(accounts, featured.producerId) : undefined;

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>LotSpace · the bag is the campaign</Eyebrow>
        <h1 className="mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl">Every farm a Space. Every lot a file.</h1>
        <p className="mt-3 max-w-xl text-slate">
          Competitors hand you a mood. The mark on the bag opens an autopsy: a named person, a named
          farmgate, an unrounded cup, and the documents that were actually accepted. The story lives in
          the Space. It does not replace the file.
        </p>
      </Sheet>
      {featured ? (
        <Sheet>
          <BagPanel lot={featured} producer={producer} />
        </Sheet>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {spaces.map((sp) => {
          const account = accountById(accounts, sp.accountId);
          if (!account) return null;
          const slug = account.id.replace("acc-", "");
          const lotCount = lots.filter((lot) => lot.producerId === account.id || lot.exporterId === account.id).length;
          const storyCount = stories.filter((story) => story.accountId === account.id).length;
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
                  {lotCount} {lotCount === 1 ? "lot" : "lots"} · {storyCount} {storyCount === 1 ? "story" : "stories"}
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