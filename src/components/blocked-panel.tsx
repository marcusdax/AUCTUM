import { Link } from "@tanstack/react-router";
import type { BlockedAction } from "@/lib/education";
import { daysSince } from "@/lib/education";
import { useEducation } from "@/lib/education-store";
import { formatDate } from "@/lib/format";
import { Button, buttonClass } from "./ui";

export function BlockedActionPanel({
  block,
  onBegin,
  compact = false,
}: {
  block: BlockedAction;
  onBegin: (lessonId: string) => void;
  compact?: boolean;
}) {
  const credentials = useEducation((s) => s.credentials);
  const cred = credentials.find((c) => c.type === block.credentialType);
  const first = block.steps[0];
  return (
    <aside className="border border-stamp/40 bg-paper p-5 shadow-[var(--shadow-sheet)]">
      <p className="kicker text-stamp">
        {block.reason === "stale" ? "Content superseded" : "Authority blocked"}
      </p>
      <h3 className="mt-2 font-display text-2xl">{block.action}</h3>
      <p className="mt-2 text-sm">
        You cannot {block.action.toLowerCase()} without an active {block.credentialType} credential.
      </p>
      {!compact && cred ? (
        <dl className="mt-4 border border-hair bg-sheet px-4 py-3 text-sm">
          <div className="flex justify-between gap-3 py-1">
            <dt className="meta">Credential state</dt>
            <dd className="uppercase">{cred.state}</dd>
          </div>
          <div className="flex justify-between gap-3 py-1">
            <dt className="meta">{cred.state === "lapsed" ? "Lapsed on" : "Issued"}</dt>
            <dd>
              {formatDate(cred.state === "lapsed" ? cred.expiresAt : cred.issuedAt)}
              {cred.state === "lapsed" ? ` (${daysSince(cred.expiresAt)} days ago)` : ""}
            </dd>
          </div>
          <div className="flex justify-between gap-3 py-1">
            <dt className="meta">Context</dt>
            <dd>{block.actionContext}</dd>
          </div>
        </dl>
      ) : null}
      <div className="mt-4 border border-hair px-4 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="meta">Shortest path to unblocked</p>
          <p className="font-mono text-[11px] tabular">~{block.estimatedMinutes} min</p>
        </div>
        <ol className="mt-3 space-y-2">
          {block.steps.map((step, i) => (
            <li key={step.id} className="grid grid-cols-[1.5rem_1fr_auto] gap-2 text-sm">
              <span className="font-mono text-slate">{String(i + 1).padStart(2, "0")}</span>
              <span>{step.title}</span>
              <span className="tabular text-slate">~{step.minutes} min</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-slate">
          {block.isRenewal
            ? "This is a renewal path. Prior progress is preserved."
            : "First issue. History starts here."}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {first?.lessonId ? (
          <Button tone="stamp" onClick={() => onBegin(first.lessonId!)}>
            Begin renewal path
          </Button>
        ) : first?.assessmentId ? (
          <Link
            to="/education/assess/$assessmentId"
            params={{ assessmentId: first.assessmentId }}
            className={buttonClass("stamp")}
          >
            Begin renewal path
          </Link>
        ) : null}
        <Link
          to="/education/credential/$type"
          params={{ type: block.credentialType }}
          className={buttonClass("ghost")}
        >
          View full credential
        </Link>
      </div>
    </aside>
  );
}
