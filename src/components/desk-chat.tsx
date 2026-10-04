import { MessageSquare, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { answerDesk } from "@/lib/desk";
import { cn } from "@/lib/utils";

type Turn = { role: "you" | "desk"; text: string };

export function DeskChat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [turns, setTurns] = useState<Turn[]>([
    { role: "desk", text: "Ask the desk. Process codes, cups, roles, and the rules already written. I do not invent a dose." },
  ]);

  function ask(event: FormEvent) {
    event.preventDefault();
    const q = text.trim();
    if (!q) return;
    const next: Turn[] = [...turns, { role: "you", text: q }, { role: "desk", text: answerDesk(q) }];
    setTurns(next.slice(-8));
    setText("");
  }

  return (
    <div className="no-print fixed right-4 bottom-4 z-50 flex flex-col items-end gap-2">
      {open ? (
        <section className="flex max-h-[70dvh] w-[min(100vw-2rem,22rem)] flex-col bg-paper text-ink shadow-[var(--shadow-lift)]">
          <header className="flex items-center justify-between border-b border-hair px-4 py-3">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase">Desk</p>
            <button type="button" className="inline-flex size-11 items-center justify-center" aria-label="Close the desk" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </header>
          <ol className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {turns.map((turn, index) => (
              <li key={`${turn.role}-${index}`} className={cn("text-sm", turn.role === "you" ? "text-ink" : "text-slate")}>
                <span className="meta mr-2">{turn.role === "you" ? "You" : "Desk"}</span>
                {turn.text}
              </li>
            ))}
          </ol>
          <form onSubmit={ask} className="border-t border-hair p-3">
            <label className="sr-only" htmlFor="desk-ask">Ask the desk</label>
            <input
              id="desk-ask"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="WSH-01, roaster, bleach…"
              className="w-full border border-hair-strong bg-paper px-3 py-3 text-sm"
            />
          </form>
        </section>
      ) : null}
      <button type="button" className="inline-flex min-h-11 items-center gap-2 bg-ink px-4 text-paper" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        <MessageSquare size={16} />
        {open ? "Close" : "Ask the desk"}
      </button>
    </div>
  );
}
