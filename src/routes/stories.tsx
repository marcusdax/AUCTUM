import { createFileRoute, Link } from "@tanstack/react-router";
import { Eyebrow, Sheet } from "@/components/ui";
import { formatDate, roleLabel } from "@/lib/format";
import { accountById, useLedger } from "@/lib/store";

export const Route = createFileRoute("/stories")({ component: StoriesPage });

function StoriesPage() {
  const stories = useLedger((s) => s.stories);
  const accounts = useLedger((s) => s.accounts);
  const [hero, ...rest] = stories;

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Stories</Eyebrow>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">Origin media, with a name attached</h1>
        <p className="mt-3 max-w-xl text-slate">
          A story is also provenance. Ranking prefers relationship, recency, and source quality — never
          empty engagement.
        </p>
      </Sheet>
      {hero ? (
        <Link
          to={hero.lotId ? "/market/$lotId" : "/spaces/$spaceId"}
          params={
            hero.lotId
              ? { lotId: hero.lotId }
              : { spaceId: hero.accountId.replace("acc-", "") }
          }
          className="grid overflow-hidden bg-paper shadow-[var(--shadow-sheet)] lg:grid-cols-2"
        >
          <img src={hero.image} alt="" className="aspect-[3/2] h-full w-full object-cover" />
          <div className="flex flex-col justify-end p-6 sm:p-8">
            <p className="meta">
              {formatDate(hero.publishedAt)} · {accountById(accounts, hero.accountId)?.name}
            </p>
            <h2 className="mt-3 font-display text-3xl">{hero.title}</h2>
            <p className="mt-3 text-slate">{hero.lede}</p>
            <p className="mt-4 max-w-prose text-sm">{hero.body}</p>
          </div>
        </Link>
      ) : null}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((st) => {
          const who = accountById(accounts, st.accountId);
          return (
            <article key={st.id} className="overflow-hidden bg-paper shadow-[var(--shadow-sheet)]">
              <img src={st.image} alt="" className="aspect-[3/2] w-full object-cover" />
              <div className="p-4">
                <p className="meta">
                  {who ? roleLabel(who.role) : ""} · {formatDate(st.publishedAt)}
                </p>
                <h3 className="mt-2 font-display text-xl leading-snug">{st.title}</h3>
                <p className="mt-2 text-sm text-slate">{st.lede}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
