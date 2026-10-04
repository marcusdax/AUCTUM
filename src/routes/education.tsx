import { createFileRoute, Link } from "@tanstack/react-router";
import { BlockedActionPanel } from "@/components/blocked-panel";
import { CredentialCard } from "@/components/credential-card";
import { CurriculumWhy } from "@/components/curriculum-why";
import { DriftChart } from "@/components/drift-chart";
import { InlineLesson } from "@/components/inline-lesson";
import { Button, Eyebrow, Sheet, Stat, buttonClass } from "@/components/ui";
import {
  OPERATOR,
  blockedActions,
  calibrationPoints,
  currentVariance,
  farmerPackage,
  tracks,
} from "@/lib/education";
import { useEducation } from "@/lib/education-store";
import { formatDate } from "@/lib/format";
import { useT } from "@/lib/locale-store";

export const Route = createFileRoute("/education")({ component: EducationPage });

function EducationPage() {
  const credentials = useEducation((s) => s.credentials);
  const events = useEducation((s) => s.events);
  const inline = useEducation((s) => s.inlineLessonId);
  const beginRemedy = useEducation((s) => s.beginRemedy);
  const closeInline = useEducation((s) => s.closeInline);
  const reset = useEducation((s) => s.reset);
  const blocked = blockedActions(credentials);

  const hardBlocks = blocked.filter((b) => b.reason === "lapsed" || b.reason === "drift");
  const warns = blocked.filter((b) => b.reason === "stale");
  const next = hardBlocks[0] ?? warns[0];
  const t = useT();

  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>{t("edu.eye")}</Eyebrow>
        <h1 className="mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl">{t("edu.h1")}</h1>
        <p className="mt-3 max-w-xl text-slate">
          {OPERATOR.name} · {OPERATOR.title}. {t("edu.body")}
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Stat label="Held" value={credentials.length} hint="Typed, expiring grants" />
          <Stat label="Blocked" value={hardBlocks.length} hint="Money-adjacent authorities" />
          <Stat
            label="Cup drift"
            value={`${currentVariance(calibrationPoints) >= 0 ? "+" : ""}${currentVariance(calibrationPoints).toFixed(2)}`}
            hint="Private · 90 days"
          />
          <Stat label="Desk" value="KC" hint={OPERATOR.desk} />
        </div>
      </Sheet>

      <Sheet padded={false} className="overflow-hidden">
        <div className="relative bg-ink">
          <video
            className="aspect-video w-full object-cover"
            src="/video/cupping-session.mp4"
            poster="/images/cupping-table.jpg"
            controls
            playsInline
            muted
            autoPlay
            loop
            preload="metadata"
          >
            A cupping session: white bowls, a ceramic spoon, the crust broken.
          </video>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <Eyebrow>Cupping room</Eyebrow>
            <p className="font-mono text-[10px] tracking-[0.16em] text-stamp uppercase">Session film · not a live panel</p>
          </div>
          <h2 className="mt-2 font-display text-3xl">Three bowls. One spoon.</h2>
          <p className="mt-2 max-w-xl text-sm text-slate">
            The procedure, played on this page: crust, slurp, the bowl left standing. It does not score a lot on the book, and it is not a camera in a room we are standing in. A score that moves money still needs a named cupper and a panel.
          </p>
        </div>
      </Sheet>

      {inline ? (
        <Sheet>
          <Eyebrow>Summoned at the point of work</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">Before you can continue</h2>
          <div className="mt-4">
            <InlineLesson lessonId={inline} onDone={closeInline} onDismiss={closeInline} />
          </div>
        </Sheet>
      ) : null}

      {hardBlocks.map((b) => (
        <BlockedActionPanel key={b.action} block={b} onBegin={beginRemedy} />
      ))}

      <div>
        <Eyebrow>Credentials</Eyebrow>
        <h2 className="mt-1 font-display text-3xl">Authority on this desk</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {credentials.map((c) => (
            <CredentialCard
              key={c.id}
              credential={c}
              onRenew={() => {
                const block = blocked.find((b) => b.credentialType === c.type);
                const step = block?.steps[0];
                if (step?.lessonId) beginRemedy(step.lessonId);
              }}
            />
          ))}
        </div>
      </div>

      <Sheet>
        <DriftChart points={calibrationPoints} />
      </Sheet>

      {warns.map((b) => (
        <BlockedActionPanel key={b.action} block={b} onBegin={beginRemedy} />
      ))}

      {next ? (
        <Sheet>
          <Eyebrow>Recommended next</Eyebrow>
          <h2 className="mt-2 font-display text-2xl">{next.steps[0]?.title}</h2>
          <p className="mt-2 text-sm text-slate">
            {next.action}. ~{next.estimatedMinutes} minutes.{" "}
            {next.isRenewal ? "Renewal, not re-enrolment." : ""}
          </p>
        </Sheet>
      ) : null}

      <CurriculumWhy />

      <Sheet>
        <Eyebrow>For the person who grows it</Eyebrow>
        <h2 className="mt-2 font-display text-3xl">Three sittings. None of them gate the floor.</h2>
        <p className="mt-3 max-w-xl text-sm text-slate">
          The map can show the boundary, the rain, and the canopy. These sittings say what those pictures are allowed to mean. Finishing them does not change a payment.
        </p>
        <ul className="mt-5">
          {farmerPackage.map((lesson) => (
            <li key={lesson.id} className="border-t border-hair py-3">
              <Link to="/education/lesson/$lessonId" params={{ lessonId: lesson.id }} className="font-display text-2xl">
                {lesson.title}
              </Link>
              <p className="text-sm text-slate">{lesson.titleVi}</p>
            </li>
          ))}
        </ul>
      </Sheet>

      <Sheet>
        <Eyebrow>Tracks · below the fold</Eyebrow>
        <h2 className="mt-2 font-display text-2xl">Curriculum is the path to a credential</h2>
        <p className="mt-2 max-w-xl text-sm text-slate">
          Course browsing is secondary. Each track terminates in an assessment that issues or renews
          authority.
        </p>
        <div className="mt-6 grid gap-px bg-hair sm:grid-cols-2">
          {tracks.map((t) => (
            <div key={t.id} className="bg-paper p-5">
              <p className="meta">Track {t.id}</p>
              <h3 className="mt-1 font-display text-xl">{t.title}</h3>
              <p className="mt-2 text-sm">{t.why}</p>
              <p className="mt-1 text-sm text-slate">{t.audience}</p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-stamp uppercase">
                Issues {t.issues}
              </p>
              {t.id === "D" ? (
                <Link to="/education/producer" className={buttonClass("ghost", "mt-4")}>
                  Open Vietnamese track
                </Link>
              ) : t.id === "E" ? (
                <Link
                  to="/education/assess/$assessmentId"
                  params={{ assessmentId: "e-cal" }}
                  className={buttonClass("ghost", "mt-4")}
                >
                  Monthly calibration
                </Link>
              ) : t.id === "C" ? (
                <Link
                  to="/education/assess/$assessmentId"
                  params={{ assessmentId: "c-adj-2" }}
                  className={buttonClass("ghost", "mt-4")}
                >
                  Adjudication scenario
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </Sheet>

      <Sheet>
        <Eyebrow>Ledger of competence</Eyebrow>
        <ol className="mt-4 space-y-3">
          {events.slice(0, 6).map((ev) => (
            <li key={ev.id} className="border-t border-hair pt-3 first:border-0 first:pt-0">
              <p className="meta">
                {formatDate(ev.at)} · {ev.kind}
              </p>
              <p className="mt-1 text-sm">{ev.summary}</p>
            </li>
          ))}
        </ol>
        <Button tone="quiet" className="mt-4 px-0" onClick={() => reset()}>
          Reset this desk
        </Button>
      </Sheet>
    </div>
  );
}
