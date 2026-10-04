import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as cn, E as useEducation, F as lessonById } from "./router-DSNp4tp8.mjs";
import { t as Button } from "./ui-DI4E79SW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inline-lesson-BC0DjaEt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InlineLesson({ lessonId, onDone, onDismiss }) {
	const lesson = lessonById(lessonId);
	if (!lesson) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonBody, {
		lesson,
		onDone,
		onDismiss
	});
}
function LessonBody({ lesson, onDone, onDismiss, locale = "en" }) {
	const completeLesson = useEducation((s) => s.completeLesson);
	const already = useEducation((s) => s.completedLessons).some((p) => p.lessonId === lesson.id);
	const [picks, setPicks] = (0, import_react.useState)({});
	const [submitted, setSubmitted] = (0, import_react.useState)(already);
	const [passed, setPassed] = (0, import_react.useState)(already);
	const vi = locale === "vi";
	function submit() {
		const ok = lesson.questions.every((q) => {
			return q.choices.find((c) => c.id === picks[q.id])?.correct;
		});
		setSubmitted(true);
		setPassed(ok);
		if (ok) {
			completeLesson(lesson.id, true);
			onDone?.();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("border border-hair bg-paper p-5", vi && "leading-[1.65]"),
		lang: vi ? "vi" : "en",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "kicker",
				children: [
					lesson.module,
					" · ~",
					lesson.minutes,
					" min · ",
					lesson.sourceRef
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-display text-2xl",
				children: vi && lesson.titleVi ? lesson.titleVi : lesson.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm",
				children: vi && lesson.bodyVi ? lesson.bodyVi : lesson.body
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 space-y-5",
				children: lesson.questions.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
					className: "text-sm font-medium",
					children: vi && q.promptVi ? q.promptVi : q.prompt
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 space-y-2",
					children: q.choices.map((c) => {
						const selected = picks[q.id] === c.id;
						const show = submitted && selected;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: cn("flex min-h-11 cursor-pointer items-center gap-3 border px-3 text-sm", selected ? "border-ink bg-sheet" : "border-hair", show && c.correct && "border-sage", show && !c.correct && "border-stamp"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: q.id,
								className: "accent-ink",
								checked: selected,
								onChange: () => setPicks((p) => ({
									...p,
									[q.id]: c.id
								}))
							}), vi && c.textVi ? c.textVi : c.text]
						}, c.id);
					})
				})] }, q.id))
			}),
			submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-4 text-sm", passed ? "text-sage" : "text-stamp"),
				children: passed ? vi ? "Đúng. Tiến độ đã được ghi." : "Correct. Progress is recorded." : vi ? "Chưa đúng. Thử lại — không bị phạt." : "Not yet. Retry is allowed. No penalty."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					tone: "stamp",
					onClick: submit,
					disabled: lesson.questions.some((q) => !picks[q.id]) && !already,
					children: vi ? "Trả lời" : "Submit answer"
				}), onDismiss ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					tone: "ghost",
					onClick: onDismiss,
					children: vi ? "Để sau" : "Skip for now"
				}) : null]
			}),
			onDismiss ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-slate",
				children: vi ? "Bỏ qua nghĩa là bạn chưa thể chấp nhận tài liệu cho đến khi hoàn thành bài này." : "Skipping means you cannot accept documents until this lesson is completed."
			}) : null,
			lesson.track === "D" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-slate",
				children: vi ? "Bài học này không ảnh hưởng đến thanh toán của bạn." : "This lesson does not affect your payment."
			}) : null
		]
	});
}
//#endregion
export { LessonBody as n, InlineLesson as t };
