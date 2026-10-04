import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button, Eyebrow, FieldRow, Sheet, buttonClass } from "@/components/ui";
import { calibrationDocs, scenarioC } from "@/lib/education";
import { POLICY } from "@/lib/policy";
import { useEducation } from "@/lib/education-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/education_/assess/$assessmentId")({ component: AssessPage });

function AssessPage() {
  const { assessmentId } = Route.useParams();
  if (assessmentId === "e-cal") return <CalibrationSet />;
  if (assessmentId === "c-adj-2") return <ScenarioAssess />;
  return (
    <Sheet>
      <h1 className="font-display text-3xl">Assessment not issued</h1>
    </Sheet>
  );
}

function CalibrationSet() {
  const answers = useEducation((s) => s.calAnswers);
  const submitted = useEducation((s) => s.calSubmitted);
  const answerCal = useEducation((s) => s.answerCal);
  const submitCalibration = useEducation((s) => s.submitCalibration);
  const hasDoc = useEducation((s) => s.hasAuthority("DOC_OPERATOR"));
  const [result, setResult] = useState<{ agreementPct: number; passed: boolean } | null>(null);

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Track E · monthly calibration</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">The same twenty documents</h1>
        <p className="mt-3 max-w-xl text-slate">
          Inter-operator agreement is measured against a {POLICY.operatorAgreementPct.min}% target.
          This sitting uses three of the set. Recurring, not a one-time pass. Completing it renews
          DOC_OPERATOR.
        </p>
      </Sheet>
      {calibrationDocs.map((doc, i) => (
        <Sheet key={doc.id}>
          <p className="meta">
            Document {i + 1} of {calibrationDocs.length} · {doc.field}
          </p>
          <h2 className="mt-2 font-display text-2xl">{doc.title}</h2>
          <p className="mt-2 text-sm text-slate">{doc.imageHint}</p>
          <div className="mt-4 space-y-2">
            {doc.options.map((opt) => (
              <label
                key={opt}
                className={cn(
                  "flex min-h-11 cursor-pointer items-center gap-3 border px-3 text-sm",
                  answers[doc.id] === opt ? "border-ink bg-sheet" : "border-hair",
                )}
              >
                <input
                  type="radio"
                  name={doc.id}
                  className="accent-ink"
                  checked={answers[doc.id] === opt}
                  onChange={() => answerCal(doc.id, opt)}
                />
                {opt}
              </label>
            ))}
          </div>
        </Sheet>
      ))}
      <Sheet>
        {result || submitted ? (
          <div>
            <p className="kicker">{(result?.passed ?? hasDoc) ? "Passed" : "Below target"}</p>
            <p className="mt-2 font-display text-3xl tabular">
              {(result?.agreementPct ?? (hasDoc ? 100 : 0)).toFixed(2)}%
            </p>
            <p className="mt-2 text-sm text-slate">
              Target {POLICY.operatorAgreementPct.min}%. Decimal, not integer. Next calibration in 30
              days.
            </p>
            {hasDoc ? (
              <p className="mt-3 text-sm text-sage">DOC_OPERATOR is active. You may accept onto the ledger.</p>
            ) : null}
          </div>
        ) : (
          <Button
            tone="stamp"
            disabled={calibrationDocs.some((d) => !answers[d.id])}
            onClick={() => setResult(submitCalibration())}
          >
            Submit calibration
          </Button>
        )}
        <Link to="/scan" className={buttonClass("ghost", "mt-4")}>
          Return to the scan desk
        </Link>
      </Sheet>
    </div>
  );
}

function ScenarioAssess() {
  const submitScenario = useEducation((s) => s.submitScenario);
  const scenario = useEducation((s) => s.scenario);
  const [tier, setTier] = useState(scenario.tier);
  const [disposition, setDisposition] = useState(scenario.disposition);
  const [price, setPrice] = useState(scenario.price);
  const [passed, setPassed] = useState(scenario.passed);

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>Track C · {scenarioC.title}</Eyebrow>
        <h1 className="mt-2 font-display text-4xl">Disposition is money</h1>
        <p className="mt-3 max-w-xl text-slate">
          Pass = correct disposition and adjusted price within $0.01. The floor already paid does not
          reverse. Re-pricing cannot exceed a {POLICY.repricingCapPct.max}% cap.
        </p>
      </Sheet>
      <Sheet>
        <Eyebrow>Lot record</Eyebrow>
        <dl>
          <FieldRow label="Lot" value={scenarioC.lot} />
          <FieldRow label="Origin" value={scenarioC.origin} />
          <FieldRow label="Producer" value={scenarioC.producer} />
          <FieldRow label="Initial cup" value={scenarioC.initialCup.toFixed(2)} />
          <FieldRow label="Re-cup" value={scenarioC.recup.toFixed(2)} />
          <FieldRow label="Evidence" value={scenarioC.evidence} />
        </dl>
      </Sheet>
      <Sheet>
        <label className="block text-sm">
          Tier
          <select
            className="mt-2 block min-h-11 w-full border border-hair-strong bg-sheet px-3"
            value={tier}
            onChange={(e) => setTier(e.target.value)}
          >
            <option value="">Select</option>
            <option value="1">Tier 1 · minor variance</option>
            <option value="2">Tier 2 · quality-identity risk</option>
            <option value="3">Tier 3 · chain compromise</option>
          </select>
        </label>
        <label className="mt-4 block text-sm">
          Disposition
          <select
            className="mt-2 block min-h-11 w-full border border-hair-strong bg-sheet px-3"
            value={disposition}
            onChange={(e) => setDisposition(e.target.value)}
          >
            <option value="">Select</option>
            <option>Release</option>
            <option>Downgrade</option>
            <option>Reject & Claim</option>
            <option>Re-verify & Partition</option>
          </select>
        </label>
        <label className="mt-4 block text-sm">
          Adjusted FOB (USD/lb)
          <input
            className="mt-2 block min-h-11 w-full border border-hair-strong bg-sheet px-3 tabular"
            inputMode="decimal"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="3.71"
          />
        </label>
        {scenario.submitted || passed ? (
          <p className={`mt-4 text-sm ${passed ? "text-sage" : "text-stamp"}`}>
            {passed
              ? "3/3. EXCEPTION_ADJUDICATOR content version updated."
              : "Not yet. Disposition and price are graded against the key."}
          </p>
        ) : null}
        <Button
          className="mt-5"
          tone="stamp"
          disabled={!tier || !disposition || !price}
          onClick={() => setPassed(submitScenario(tier, disposition, Number(price)))}
        >
          Submit adjudication
        </Button>
      </Sheet>
    </div>
  );
}
