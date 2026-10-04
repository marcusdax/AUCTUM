import { useState } from "react";
import { plans, type PlanId } from "@/lib/pricing";
import { useSubscribe } from "@/lib/subscribe-store";
import { buttonClass } from "./ui";

export function SeatForm({ initial }: { initial: PlanId }) {
  const register = useSubscribe((s) => s.register);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [place, setPlace] = useState("");
  const [planId, setPlanId] = useState<PlanId>(initial);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const chosen = plans.find((plan) => plan.id === planId);

  return (
    <form
      className="mt-6 grid max-w-lg gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const cleanName = name.trim();
        const cleanEmail = email.trim();
        if (cleanName.length < 2) {
          setError("The register needs a name.");
          return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
          setError("That email cannot be written down.");
          return;
        }
        const row = register({ name: cleanName, email: cleanEmail, planId, place: place.trim() });
        setDone(row.id);
        setError(null);
        setName("");
        setEmail("");
        setPlace("");
      }}
    >
      <label className="grid gap-1 text-sm">
        <span className="meta">Name</span>
        <input value={name} onChange={(event) => setName(event.target.value)} className="min-h-11 border border-hair-strong bg-paper px-3" required />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="meta">Email</span>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-11 border border-hair-strong bg-paper px-3" required />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="meta">Place, if you have one</span>
        <input value={place} onChange={(event) => setPlace(event.target.value)} className="min-h-11 border border-hair-strong bg-paper px-3" />
      </label>
      <fieldset className="grid gap-2">
        <legend className="meta">Seat</legend>
        {plans.map((plan) => (
          <label key={plan.id} className="flex min-h-11 items-start gap-3 py-1 text-sm">
            <input className="mt-1" type="radio" name="seat" checked={planId === plan.id} onChange={() => setPlanId(plan.id)} />
            <span>
              {plan.title} · {plan.price}
              <span className="mt-0.5 block text-slate">{plan.brief}</span>
            </span>
          </label>
        ))}
      </fieldset>
      {chosen?.price === "$0" ? <p className="text-sm text-slate">This seat is not a subscription. The register only keeps your name.</p> : null}
      {error ? <p className="text-sm text-stamp">{error}</p> : null}
      {done ? <p className="text-sm">Recorded as {done}. No card was taken. No invoice was sent.</p> : null}
      <button type="submit" className={buttonClass("stamp", "w-fit")}>
        Register this seat
      </button>
    </form>
  );
}
