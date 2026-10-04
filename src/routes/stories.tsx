import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PRINT_FORMATS } from "@/components/one-pager";
import { buttonClass, Eyebrow, Sheet } from "@/components/ui";
import { formatDate, roleLabel } from "@/lib/format";
import { useMaterials } from "@/lib/materials-store";
import { humanNarrative } from "@/lib/print-copy";
import { useSocial } from "@/lib/social-store";
import { accountById, useLedger } from "@/lib/store";

export const Route = createFileRoute("/stories")({ component: FeedPage });

function FeedPage() {
  const stories = useLedger((s) => s.stories);
  const accounts = useLedger((s) => s.accounts);
  const lots = useLedger((s) => s.lots);
  const following = useLedger((s) => s.following);
  const follow = useLedger((s) => s.follow);
  const publishStory = useLedger((s) => s.publishStory);
  const shopName = useMaterials((s) => s.shopName);
  const setLotId = useMaterials((s) => s.setLotId);
  const setFormat = useMaterials((s) => s.setFormat);
  const keeps = useSocial((s) => s.keeps);
  const replies = useSocial((s) => s.replies);
  const toggleKeep = useSocial((s) => s.toggleKeep);
  const reply = useSocial((s) => s.reply);
  const [kind, setKind] = useState<"note" | "lot">("note");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [lotId, setPostLot] = useState("");
  const [openReply, setOpenReply] = useState<string | null>(null);
  const [replyBody, setReplyBody] = useState("");
  const voice = shopName.trim() || "Your desk";
  const feed = [...stories].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <div className="space-y-6">
        <Sheet>
          <Eyebrow>Feed</Eyebrow>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">What was written, in the order it was written.</h1>
          <p className="mt-3 max-w-xl text-sm text-slate">
            A post can be a note or a lot passed on. Keeping a post does not move Trust. A reply does not become a price.
          </p>
        </Sheet>

        <Sheet>
          <Eyebrow>Add a post · {voice}</Eyebrow>
          <form
            className="mt-4 grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              const text = body.trim();
              if (text.length < 2) return;
              const chosen = kind === "lot" ? lotId || lots[0]?.id : lotId;
              if (kind === "lot" && !chosen) return;
              const lot = lots.find((row) => row.id === chosen);
              publishStory({
                kind,
                title,
                body: text,
                lotId: chosen || undefined,
                image: lot?.image,
              });
              setTitle("");
              setBody("");
            }}
          >
            <div className="flex flex-wrap gap-2">
              <button type="button" className={buttonClass(kind === "note" ? "stamp" : "ghost")} onClick={() => setKind("note")}>
                A note
              </button>
              <button
                type="button"
                className={buttonClass(kind === "lot" ? "stamp" : "ghost")}
                onClick={() => {
                  setKind("lot");
                  setPostLot((current) => current || lots[0]?.id || "");
                }}
              >
                Pass a lot
              </button>
            </div>
            <label className="grid gap-1 text-sm">
              <span className="meta">Title</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} className="min-h-11 border border-hair-strong bg-paper px-3" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="meta">{kind === "lot" ? "What you are passing on" : "The note"}</span>
              <textarea value={body} onChange={(event) => setBody(event.target.value)} rows={4} className="border border-hair-strong bg-paper px-3 py-2" required />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="meta">{kind === "lot" ? "Lot · required" : "Lot · optional"}</span>
              <select value={kind === "lot" ? lotId || lots[0]?.id || "" : lotId} onChange={(event) => setPostLot(event.target.value)} className="min-h-11 border border-hair-strong bg-paper px-3">
                {kind === "note" ? <option value="">No lot. This note is not proof.</option> : null}
                {lots.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.code} · {row.title}
                  </option>
                ))}
              </select>
            </label>
            {kind === "note" && !lotId ? <p className="text-sm text-stamp">Without a lot, this stays a note. It will not be offered as proof.</p> : null}
            <button type="submit" className={buttonClass("stamp", "w-fit")}>
              Post
            </button>
          </form>
        </Sheet>

        {feed.map((story) => {
          const who = accountById(accounts, story.accountId);
          const lot = lots.find((row) => row.id === story.lotId);
          const producer = lot ? accountById(accounts, lot.producerId) : undefined;
          const name = story.accountId === "desk" ? voice : who?.name ?? "Unnamed";
          const kept = keeps.includes(story.id);
          const thread = replies.filter((row) => row.storyId === story.id);
          return (
            <article key={story.id} className="bg-paper shadow-[var(--shadow-sheet)]">
              {story.image ? <img src={story.image} alt="" className="aspect-[2/1] w-full object-cover" /> : null}
              <div className="p-5 sm:p-6">
                <p className="meta">
                  {name}
                  {who ? ` · ${roleLabel(who.role)}` : ""}
                  {" · "}
                  {formatDate(story.publishedAt)}
                  {story.kind === "note" && !story.lotId ? " · not proof" : ""}
                </p>
                <h2 className="mt-2 font-display text-3xl leading-tight">{story.title}</h2>
                <p className="mt-3 text-sm">{story.body}</p>
                {lot ? (
                  <p className="mt-4 border-t border-hair pt-3 text-sm">
                    <span className="meta">The person</span>
                    <span className="mt-1 block">{humanNarrative(lot, producer)}</span>
                  </p>
                ) : null}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button type="button" className={buttonClass(kept ? "stamp" : "ghost")} onClick={() => toggleKeep(story.id)}>
                    {kept ? "Kept" : "Keep"}
                  </button>
                  <button type="button" className={buttonClass("ghost")} onClick={() => setOpenReply(openReply === story.id ? null : story.id)}>
                    Reply
                  </button>
                  {who && story.accountId !== "desk" ? (
                    <button type="button" className={buttonClass("quiet")} onClick={() => follow(who.id)}>
                      {following.includes(who.id) ? "Following" : "Follow"}
                    </button>
                  ) : null}
                  {story.lotId ? (
                    <Link to="/autopsy/$lotId" params={{ lotId: story.lotId }} className={buttonClass("quiet")}>
                      Open the autopsy
                    </Link>
                  ) : null}
                </div>
                {story.lotId ? (
                  <div className="mt-4 border-t border-hair pt-3">
                    <p className="meta">Print this lot</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {PRINT_FORMATS.map((piece) => (
                        <Link
                          key={piece.id}
                          to="/materials"
                          className={buttonClass("ghost")}
                          onClick={() => {
                            setLotId(story.lotId!);
                            setFormat(piece.id);
                          }}
                        >
                          {piece.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
                {thread.length ? (
                  <ul className="mt-4 space-y-2">
                    {thread.map((row) => (
                      <li key={row.id} className="border-t border-hair pt-2 text-sm">
                        <span className="meta">{voice}</span>
                        <span className="mt-1 block">{row.body}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {openReply === story.id ? (
                  <form
                    className="mt-3 flex flex-wrap gap-2"
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (replyBody.trim().length < 2) return;
                      reply(story.id, replyBody);
                      setReplyBody("");
                      setOpenReply(null);
                    }}
                  >
                    <input
                      value={replyBody}
                      onChange={(event) => setReplyBody(event.target.value)}
                      className="min-h-11 min-w-0 flex-1 border border-hair-strong bg-paper px-3"
                      placeholder="A reply. Not a price."
                    />
                    <button type="submit" className={buttonClass("stamp")}>
                      Send
                    </button>
                  </form>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      <aside className="space-y-4">
        <Sheet>
          <Eyebrow>People</Eyebrow>
          <ul className="mt-3">
            {accounts.slice(0, 6).map((account) => (
              <li key={account.id} className="flex items-center justify-between gap-3 border-t border-hair py-2 text-sm">
                <Link to="/spaces/$spaceId" params={{ spaceId: account.id.replace("acc-", "") }} className="font-display text-lg">
                  {account.name}
                </Link>
                <button type="button" className="meta hover:text-ink" onClick={() => follow(account.id)}>
                  {following.includes(account.id) ? "Following" : "Follow"}
                </button>
              </li>
            ))}
          </ul>
          <Link to="/following" className="mt-3 inline-block meta hover:text-ink">
            The people you keep
          </Link>
        </Sheet>
        <Sheet>
          <Eyebrow>Print</Eyebrow>
          <p className="mt-2 text-sm text-slate">A post that names a lot can leave the screen as a letter, a card, a menu slip, or a bag label.</p>
          <Link to="/materials" className={buttonClass("ghost", "mt-4")}>
            Open the print desk
          </Link>
        </Sheet>
      </aside>
    </div>
  );
}
