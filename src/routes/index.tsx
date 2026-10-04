import { createFileRoute, Link } from "@tanstack/react-router";
import { Landing } from "@/components/landing";
import { LiveTape } from "@/components/live-tape";
import { LotCard } from "@/components/lot-card";
import { TrustBadge } from "@/components/trust-badge";
import { Eyebrow, Sheet, buttonClass } from "@/components/ui";
import { roleLabel } from "@/lib/format";
import { useT } from "@/lib/locale-store";
import { accountById, useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Compass });

function Compass() {
  const lots = useLedger((s) => s.lots);
  const events = useLedger((s) => s.events);
  const accounts = useLedger((s) => s.accounts);
  const stories = useLedger((s) => s.stories);
  const featured = lots.filter((l) => l.availability === "available" || l.availability === "sample").slice(0, 3);
  const karmic = accountById(accounts, "acc-karmic");
  const t = useT();

  return (
    <div className="space-y-8">
      <Landing />

      <LiveTape />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {(
          [
            { to: "/market", title: "Ledger", body: "The name, the cup, and the price. A lock is the desk." },
            { to: "/spaces", title: "LotSpace", body: "The person who grew it. The story opens the lot." },
            { to: "/education", title: "Learn", body: "What you may do, until when, and the remedy." },
            { to: "/scan", title: "Scan", body: "A page becomes a proposal. A person accepts." },
            { to: "/craft", title: "Craft", body: "A method or a cup. The recipe stays in the packet." },
          ] as const
        ).map((door) => (
          <Link key={door.to} to={door.to} className="bg-paper p-4 shadow-[var(--shadow-sheet)] hover:shadow-[var(--shadow-lift)]">
            <h2 className="font-display text-2xl">{door.title}</h2>
            <p className="mt-2 text-sm text-slate">{door.body}</p>
          </Link>
        ))}
      </div>

      <Sheet>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>{t("home.exEye")}</Eyebrow>
            <h2 className="mt-1 font-display text-3xl">{t("home.exH")}</h2>
            <p className="mt-2 max-w-xl text-slate">{t("home.exBody")}</p>
          </div>
          <Link to="/exchange" className={buttonClass("stamp")}>
            {t("home.enter")}
          </Link>
        </div>
      </Sheet>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <Eyebrow>Featured supply</Eyebrow>
              <h2 className="mt-1 font-display text-3xl">On the sheet</h2>
            </div>
            <Link to="/market" className="meta hover:text-ink">
              All lots
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {featured.map((lot) => (
              <LotCard key={lot.id} lot={lot} />
            ))}
          </div>
        </div>
        <aside className="space-y-6">
          {karmic ? (
            <Sheet>
              <Eyebrow>Flagship operator</Eyebrow>
              <h2 className="mt-2 font-display text-2xl">{karmic.name}</h2>
              <p className="mt-2 text-sm text-slate">{karmic.tagline}</p>
              <div className="mt-4">
                <TrustBadge trust={karmic.trust} />
              </div>
              <Link to="/spaces/$spaceId" params={{ spaceId: "karmic" }} className={cn("mt-5", buttonClass("ghost"))}>
                Enter the Space
              </Link>
            </Sheet>
          ) : null}
          <Sheet>
            <Eyebrow>Ledger pulse</Eyebrow>
            <h2 className="mt-2 font-display text-2xl">Newest on the file</h2>
            <ol className="mt-5 space-y-4">
              {events.slice(0, 4).map((ev) => (
                <li key={ev.id} className="border-t border-hair pt-3 first:border-0 first:pt-0">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-slate uppercase">{ev.kind}</p>
                  <p className="mt-1 text-sm">{ev.summary}</p>
                </li>
              ))}
            </ol>
          </Sheet>
        </aside>
      </div>

      <Sheet padded={false} className="overflow-hidden">
        <div className="relative aspect-[21/9] min-h-48">
          <img src="/images/vn-highlands.jpg" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 to-ink/10" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
            <p className="font-mono text-[10px] tracking-[0.2em] text-stamp-soft uppercase">The craft</p>
            <h2 className="mt-2 max-w-[18ch] font-display text-3xl text-paper sm:text-4xl">
              Origin dignity is a design constraint.
            </h2>
            <Link to="/craft" className={cn("mt-4", buttonClass("solid"))}>
              Read the essay
            </Link>
          </div>
        </div>
      </Sheet>

      <div>
        <Eyebrow>Stories from followed Spaces</Eyebrow>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {stories.slice(0, 3).map((st) => {
            const who = accountById(accounts, st.accountId);
            return (
              <Link
                key={st.id}
                to="/stories"
                className="bg-paper p-5 shadow-[var(--shadow-sheet)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)]"
              >
                <p className="meta">{who ? roleLabel(who.role) : ""}</p>
                <h3 className="mt-2 font-display text-xl leading-snug">{st.title}</h3>
                <p className="mt-2 text-sm text-slate">{st.lede}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
