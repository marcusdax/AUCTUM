import { createFileRoute, Link } from "@tanstack/react-router";
import { TrustBadge } from "@/components/trust-badge";
import { Button, Eyebrow, Sheet } from "@/components/ui";
import { formatDate, roleLabel } from "@/lib/format";
import { useLedger } from "@/lib/store";

export const Route = createFileRoute("/following")({ component: FollowingPage });

function FollowingPage() {
  const following = useLedger((s) => s.following);
  const accounts = useLedger((s) => s.accounts);
  const stories = useLedger((s) => s.stories);
  const follow = useLedger((s) => s.follow);
  const people = accounts.filter((a) => following.includes(a.id));
  const feed = stories
    .filter((s) => following.includes(s.accountId))
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Following</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Stay close to chosen people</h1>
        <p className="mt-3 max-w-xl text-slate">
          A follow is a relationship signal. Chronological safety valve: this feed is recency, not a
          popularity contest.
        </p>
      </Sheet>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {people.map((p) => (
          <div key={p.id} className="min-w-56 bg-paper p-4 shadow-[var(--shadow-sheet)]">
            <p className="meta">{roleLabel(p.role)}</p>
            <p className="mt-1 font-display text-lg">{p.name}</p>
            <div className="mt-3">
              <TrustBadge trust={p.trust} size="sm" />
            </div>
            <Button tone="quiet" className="mt-2 px-0" onClick={() => follow(p.id)}>
              Unfollow
            </Button>
          </div>
        ))}
      </div>
      <div className="space-y-4">
        {feed.map((st) => {
          const who = people.find((p) => p.id === st.accountId);
          return (
            <Sheet key={st.id} className="grid gap-5 sm:grid-cols-[180px_1fr] sm:p-0">
              <img src={st.image} alt="" className="aspect-[3/2] w-full object-cover sm:h-full" />
              <div className="sm:py-6 sm:pr-6">
                <p className="meta">
                  {who?.name} · {formatDate(st.publishedAt)}
                </p>
                <h2 className="mt-2 font-display text-2xl">{st.title}</h2>
                <p className="mt-2 text-sm text-slate">{st.body}</p>
                {st.lotId ? (
                  <Link
                    to="/market/$lotId"
                    params={{ lotId: st.lotId }}
                    className="mt-3 inline-block meta hover:text-ink"
                  >
                    Open the lot
                  </Link>
                ) : null}
              </div>
            </Sheet>
          );
        })}
      </div>
    </div>
  );
}
