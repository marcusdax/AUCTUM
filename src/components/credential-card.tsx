import { Link } from "@tanstack/react-router";
import { CREDENTIAL_META, daysUntil, type Credential } from "@/lib/education";
import { formatDate } from "@/lib/format";
import { buttonClass } from "./ui";
import { cn } from "@/lib/utils";

const stateLabel: Record<Credential["state"], string> = {
  active: "Active",
  expiring: "Expiring",
  stale: "Stale",
  lapsed: "Lapsed",
  probationary: "Probationary",
};

export function CredentialCard({
  credential,
  onRenew,
}: {
  credential: Credential;
  onRenew?: () => void;
}) {
  const days = daysUntil(credential.expiresAt);
  const meta = CREDENTIAL_META[credential.type];
  return (
    <article
      data-state={credential.state}
      className={cn(
        "border bg-paper p-5 shadow-[var(--shadow-sheet)]",
        "border-l-[3px]",
        credential.state === "active" && "border-hair border-l-sage",
        credential.state === "expiring" && "border-brass border-l-brass",
        credential.state === "stale" && "border-dashed border-slate border-l-slate opacity-90",
        credential.state === "lapsed" && "border-stamp/50 border-l-stamp opacity-80",
        credential.state === "probationary" && "border-stamp border-l-stamp",
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="font-mono text-[12px] tracking-[0.16em] uppercase">{meta.label}</h3>
        <span
          className={cn(
            "font-mono text-[10px] tracking-[0.18em] uppercase",
            credential.state === "active" && "text-sage",
            credential.state === "expiring" && "text-brass",
            credential.state === "stale" && "text-slate",
            (credential.state === "lapsed" || credential.state === "probationary") && "text-stamp",
          )}
        >
          ● {stateLabel[credential.state]}
        </span>
      </header>
      <p
        className={cn(
          "mt-3 text-sm",
          credential.state === "lapsed" && "text-slate line-through decoration-stamp",
        )}
      >
        {credential.authorityScope.join(" · ")}
      </p>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="meta">Issued</dt>
          <dd>{formatDate(credential.issuedAt)}</dd>
        </div>
        <div>
          <dt className="meta">Expires</dt>
          <dd className="tabular">
            {formatDate(credential.expiresAt)}
            {days >= 0 ? ` · ${days} days remaining` : ` · lapsed ${Math.abs(days)} days`}
          </dd>
        </div>
        <div>
          <dt className="meta">Content</dt>
          <dd>{credential.contentVersion}</dd>
        </div>
        <div>
          <dt className="meta">Source</dt>
          <dd>{credential.sourceRef}</dd>
        </div>
      </dl>
      {credential.staleness ? (
        <p className="mt-3 font-mono text-[11px] tracking-[0.08em] text-brass uppercase">
          Content {credential.contentVersion} superseded by {credential.staleness.supersededBy}
        </p>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-2">
        {onRenew && (credential.state === "lapsed" || credential.state === "expiring" || credential.state === "stale") ? (
          <button type="button" className={buttonClass("stamp")} onClick={onRenew}>
            {credential.state === "stale" ? "Take delta module" : "Begin renewal"}
          </button>
        ) : null}
        <Link
          to="/education/credential/$type"
          params={{ type: credential.type }}
          className={buttonClass("ghost")}
        >
          Full record
        </Link>
      </div>
    </article>
  );
}
