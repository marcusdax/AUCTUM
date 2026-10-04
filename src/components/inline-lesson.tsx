import { useState } from "react";
import { lessonById, type Lesson } from "@/lib/education";
import { useEducation } from "@/lib/education-store";
import { Button } from "./ui";
import { cn } from "@/lib/utils";

export function InlineLesson({
  lessonId,
  onDone,
  onDismiss,
}: {
  lessonId: string;
  onDone?: () => void;
  onDismiss?: () => void;
}) {
  const lesson = lessonById(lessonId);
  if (!lesson) return null;
  return <LessonBody lesson={lesson} onDone={onDone} onDismiss={onDismiss} />;
}

export function LessonBody({
  lesson,
  onDone,
  onDismiss,
  locale = "en",
}: {
  lesson: Lesson;
  onDone?: () => void;
  onDismiss?: () => void;
  locale?: "en" | "vi";
}) {
  const completeLesson = useEducation((s) => s.completeLesson);
  const completedLessons = useEducation((s) => s.completedLessons);
  const already = completedLessons.some((p) => p.lessonId === lesson.id);
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(already);
  const [passed, setPassed] = useState(already);
  const vi = locale === "vi";

  function submit() {
    const ok = lesson.questions.every((q) => {
      const choice = q.choices.find((c) => c.id === picks[q.id]);
      return choice?.correct;
    });
    setSubmitted(true);
    setPassed(ok);
    if (ok) {
      completeLesson(lesson.id, true);
      onDone?.();
    }
  }

  return (
    <div className={cn("border border-hair bg-paper p-5", vi && "leading-[1.65]")} lang={vi ? "vi" : "en"}>
      <p className="kicker">
        {lesson.module} · ~{lesson.minutes} min · {lesson.sourceRef}
      </p>
      <h3 className="mt-2 font-display text-2xl">{vi && lesson.titleVi ? lesson.titleVi : lesson.title}</h3>
      <p className="mt-3 text-sm">{vi && lesson.bodyVi ? lesson.bodyVi : lesson.body}</p>
      <div className="mt-5 space-y-5">
        {lesson.questions.map((q) => (
          <fieldset key={q.id}>
            <legend className="text-sm font-medium">
              {vi && q.promptVi ? q.promptVi : q.prompt}
            </legend>
            <div className="mt-2 space-y-2">
              {q.choices.map((c) => {
                const selected = picks[q.id] === c.id;
                const show = submitted && selected;
                return (
                  <label
                    key={c.id}
                    className={cn(
                      "flex min-h-11 cursor-pointer items-center gap-3 border px-3 text-sm",
                      selected ? "border-ink bg-sheet" : "border-hair",
                      show && c.correct && "border-sage",
                      show && !c.correct && "border-stamp",
                    )}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      className="accent-ink"
                      checked={selected}
                      onChange={() => setPicks((p) => ({ ...p, [q.id]: c.id }))}
                    />
                    {vi && c.textVi ? c.textVi : c.text}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
      {submitted ? (
        <p className={cn("mt-4 text-sm", passed ? "text-sage" : "text-stamp")}>
          {passed
            ? vi
              ? "Đúng. Tiến độ đã được ghi."
              : "Correct. Progress is recorded."
            : vi
              ? "Chưa đúng. Thử lại — không bị phạt."
              : "Not yet. Retry is allowed. No penalty."}
        </p>
      ) : null}
      <div className="mt-5 flex flex-wrap gap-2">
        <Button tone="stamp" onClick={submit} disabled={lesson.questions.some((q) => !picks[q.id]) && !already}>
          {vi ? "Trả lời" : "Submit answer"}
        </Button>
        {onDismiss ? (
          <Button tone="ghost" onClick={onDismiss}>
            {vi ? "Để sau" : "Skip for now"}
          </Button>
        ) : null}
      </div>
      {onDismiss ? (
        <p className="mt-3 text-xs text-slate">
          {vi
            ? "Bỏ qua nghĩa là bạn chưa thể chấp nhận tài liệu cho đến khi hoàn thành bài này."
            : "Skipping means you cannot accept documents until this lesson is completed."}
        </p>
      ) : null}
      {lesson.track === "D" ? (
        <p className="mt-3 text-xs text-slate">
          {vi
            ? "Bài học này không ảnh hưởng đến thanh toán của bạn."
            : "This lesson does not affect your payment."}
        </p>
      ) : null}
    </div>
  );
}
