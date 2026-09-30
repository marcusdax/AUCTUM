import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Eyebrow, Sheet, buttonClass } from "@/components/ui";
import { formatDate } from "@/lib/format";
import { accountById, useLedger } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/messages")({ component: MessagesPage });

function MessagesPage() {
  const threads = useLedger((s) => s.threads);
  const messages = useLedger((s) => s.messages);
  const accounts = useLedger((s) => s.accounts);
  const sendMessage = useLedger((s) => s.sendMessage);
  const [activeId, setActiveId] = useState(threads[0]?.id ?? "");
  const [draft, setDraft] = useState("");
  const active = threads.find((t) => t.id === activeId);
  const trail = messages.filter((m) => m.threadId === activeId);

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Messages · Deals</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">A thread that can become a contract</h1>
        <p className="mt-3 max-w-xl text-slate">
          Follow, intro, sample, offer, lock, tip. Free-form text never becomes the authoritative price.
        </p>
      </Sheet>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.2fr]">
        <Sheet padded={false}>
          <ul>
            {threads.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(t.id)}
                  className={cn(
                    "w-full border-b border-hair px-5 py-4 text-left last:border-0",
                    t.id === activeId ? "bg-sheet" : "hover:bg-sheet/60",
                  )}
                >
                  <p className="meta">
                    {t.deal} · {formatDate(t.updatedAt)}
                  </p>
                  <p className="mt-1 font-display text-lg">{t.subject}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate">{t.preview}</p>
                </button>
              </li>
            ))}
          </ul>
        </Sheet>
        <Sheet>
          {active ? (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Eyebrow>{active.deal}</Eyebrow>
                  <h2 className="mt-1 font-display text-2xl">{active.subject}</h2>
                  <p className="mt-1 text-sm text-slate">
                    {active.parties
                      .map((id) => accountById(accounts, id)?.name)
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
                {active.lotId ? (
                  <Link
                    to="/market/$lotId"
                    params={{ lotId: active.lotId }}
                    className={buttonClass("ghost")}
                  >
                    Open lot
                  </Link>
                ) : null}
              </div>
              <ol className="mt-6 space-y-4">
                {trail.map((m) => {
                  const who = accountById(accounts, m.fromId);
                  return (
                    <li key={m.id} className="border-t border-hair pt-3">
                      <p className="meta">
                        {who?.name} · {formatDate(m.at)}
                      </p>
                      <p className="mt-1 text-sm">{m.body}</p>
                    </li>
                  );
                })}
              </ol>
              <form
                className="mt-6 flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  const text = draft.trim();
                  if (!text) return;
                  sendMessage(active.id, text);
                  setDraft("");
                }}
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Reply as Karmic Circle desk"
                  className="min-h-11 flex-1 border border-hair-strong bg-sheet px-3 text-sm text-ink placeholder:text-slate"
                />
                <Button type="submit">Send</Button>
              </form>
            </>
          ) : (
            <p className="text-sm text-slate">Select a thread.</p>
          )}
        </Sheet>
      </div>
    </div>
  );
}
