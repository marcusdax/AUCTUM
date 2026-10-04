import { useState, type FormEvent } from "react";
import type { Review } from "@/lib/exchange";
import { useExchange } from "@/lib/exchange-store";
import { formatDate } from "@/lib/format";
import { useT } from "@/lib/locale-store";
import { cn } from "@/lib/utils";
import { Marks } from "./rating";
import { Button } from "./ui";

export function ReviewList({ reviews }: { reviews: Review[] }) {
  const t = useT();
  if (!reviews.length) return null;
  return (
    <ol className="divide-y divide-hair">
      {reviews.map((review) => (
        <li key={review.id} className="py-4 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-display text-xl">{review.buyerName}</p>
            <Marks value={review.stars} />
          </div>
          <p className="mt-1 meta">
            {formatDate(review.createdAt)} · {review.orderId} · {t("rev.asFiled")} {review.asDescribed} · {t("rev.handoff")} {review.fulfillment}
          </p>
          <p className="mt-2 text-sm leading-relaxed">{review.body}</p>
        </li>
      ))}
    </ol>
  );
}

const marks = [1, 2, 3, 4, 5] as const;

export function ReviewForm({ listingId }: { listingId: string }) {
  const buyerEmail = useExchange((s) => s.buyerEmail);
  const clicks = useExchange((s) => s.clicks);
  const reviews = useExchange((s) => s.reviews);
  const submitReview = useExchange((s) => s.submitReview);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(buyerEmail);
  const [stars, setStars] = useState(5);
  const [asDescribed, setAsDescribed] = useState(5);
  const [fulfillment, setFulfillment] = useState(5);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const t = useT();

  const eligible = clicks.some(
    (c) =>
      c.listingId === listingId &&
      c.buyerEmail.toLowerCase() === email.trim().toLowerCase() &&
      c.status === "delivered" &&
      c.qty > 0,
  );
  const already = reviews.some(
    (r) => r.listingId === listingId && r.buyerEmail.toLowerCase() === email.trim().toLowerCase(),
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const message = submitReview({ listingId, buyerName: name, buyerEmail: email, stars, asDescribed, fulfillment, body });
    setError(message);
    setDone(!message);
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <p className="text-sm text-slate">{t("rev.gate")}</p>
      <label className="block">
        <span className="meta">{t("rev.name")}</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
      </label>
      <label className="block">
        <span className="meta">{t("rev.email")}</span>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
      </label>
      <MarkField label={t("rev.overall")} value={stars} onChange={setStars} />
      <MarkField label={t("rev.asFiled")} value={asDescribed} onChange={setAsDescribed} />
      <MarkField label={t("rev.handoff")} value={fulfillment} onChange={setFulfillment} />
      <label className="block">
        <span className="meta">{t("rev.what")}</span>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={4} className={inputClass} />
      </label>
      {!eligible && email.includes("@") ? <p className="text-sm text-stamp">{t("rev.noHandoff")}</p> : null}
      {already ? <p className="text-sm text-slate">{t("rev.already")}</p> : null}
      {error ? <p className="text-sm text-stamp">{error}</p> : null}
      {done ? <p className="text-sm text-sage">{t("rev.done")}</p> : null}
      <Button type="submit" tone="stamp" disabled={already}>
        {t("rev.submit")}
      </Button>
    </form>
  );
}

function MarkField({ label, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <fieldset>
      <legend className="meta">{label}</legend>
      <div className="mt-2 flex gap-2">
        {marks.map((n) => (
          <label
            key={n}
            className={cn(
              "inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center border font-mono text-sm",
              value === n ? "border-ink bg-ink text-paper" : "border-hair-strong bg-sheet text-ink",
            )}
          >
            <input type="radio" className="sr-only" name={label} checked={value === n} onChange={() => onChange(n)} />
            <span className="font-mono text-sm">{n}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const inputClass = "mt-2 w-full border border-hair-strong bg-sheet px-3 py-3 text-sm text-ink";
