import { createFileRoute, Link } from "@tanstack/react-router";
import { LessonBody } from "@/components/inline-lesson";
import { Eyebrow, Sheet, buttonClass } from "@/components/ui";
import { lessonById } from "@/lib/education";

export const Route = createFileRoute("/education_/lesson/$lessonId")({ component: LessonPage });

function LessonPage() {
  const { lessonId } = Route.useParams();
  const lesson = lessonById(lessonId);
  if (!lesson) {
    return (
      <Sheet>
        <h1 className="font-display text-3xl">Lesson not on this version</h1>
      </Sheet>
    );
  }
  return (
    <div className="space-y-6">
      <Sheet>
        <Eyebrow>
          Track {lesson.track} · {lesson.contentVersion}
        </Eyebrow>
        <h1 className="mt-2 font-display text-4xl">{lesson.title}</h1>
        <p className="mt-2 text-sm text-slate">
          Summoned as a sitting. Completion is idempotent. Thresholds live in the policy module, not
          in this copy.
        </p>
      </Sheet>
      <LessonBody lesson={lesson} />
      <Link to="/education" className={buttonClass("ghost")}>
        Return to readiness
      </Link>
    </div>
  );
}
