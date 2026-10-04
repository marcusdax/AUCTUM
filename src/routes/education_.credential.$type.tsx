import { createFileRoute, Link } from "@tanstack/react-router";
import { DriftChart } from "@/components/drift-chart";
import { Eyebrow, FieldRow, Sheet, buttonClass } from "@/components/ui";
import { CREDENTIAL_META, calibrationPoints, daysUntil } from "@/lib/education";
import type { CredentialType } from "@/lib/education";
import { useEducation } from "@/lib/education-store";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/education_/credential/$type")({ component: CredentialPage });

function CredentialPage() {
  const { type } = Route.useParams();
  const credentials = useEducation((s) => s.credentials);
  const cred = credentials.find((c) => c.type === type);
  const meta = CREDENTIAL_META[type as CredentialType];
  if (!cred || !meta) {
    return (
      <Sheet>
        <h1 className="font-display text-3xl">No such credential</h1>
        <Link to="/education" className="mt-4 inline-block meta hover:text-ink">
          Return to readiness
        </Link>
      </Sheet>
    );
  }
  const days = daysUntil(cred.expiresAt);
  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Credential record</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">{meta.label}</h1>
        <p className="mt-2 text-slate">{meta.gates}</p>
        <dl className="mt-6">
          <FieldRow label="State" value={<span className="uppercase">{cred.state}</span>} />
          <FieldRow label="Issued" value={formatDate(cred.issuedAt)} />
          <FieldRow
            label="Expires"
            value={`${formatDate(cred.expiresAt)} · ${days >= 0 ? `${days} days remaining` : `lapsed ${Math.abs(days)} days`}`}
          />
          <FieldRow label="Issued by" value={cred.issuedBy} />
          <FieldRow label="Content" value={cred.contentVersion} />
          <FieldRow label="Source" value={cred.sourceRef} />
          <FieldRow label="Audience" value={meta.audience} />
          <FieldRow label="Authority" value={cred.authorityScope.join(" · ")} />
        </dl>
        <Link to="/education" className={buttonClass("ghost", "mt-6")}>
          Back to readiness
        </Link>
      </Sheet>
      {cred.type === "CUPPER_TIER_2" ? (
        <Sheet>
          <DriftChart points={calibrationPoints} />
        </Sheet>
      ) : null}
    </div>
  );
}
