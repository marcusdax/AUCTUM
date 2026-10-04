import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as lessonById, n as Route } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, r as Eyebrow } from "./ui-DI4E79SW.mjs";
import { n as LessonBody } from "./inline-lesson-BC0DjaEt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/education_.lesson._lessonId-CnlAccH9.js
var import_jsx_runtime = require_jsx_runtime();
function LessonPage() {
	const { lessonId } = Route.useParams();
	const lesson = lessonById(lessonId);
	if (!lesson) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl",
		children: "Lesson not on this version"
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eyebrow, { children: [
					"Track ",
					lesson.track,
					" · ",
					lesson.contentVersion
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl",
					children: lesson.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-slate",
					children: "Summoned as a sitting. Completion is idempotent. Thresholds live in the policy module, not in this copy."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonBody, { lesson }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/education",
				className: buttonClass("ghost"),
				children: "Return to readiness"
			})
		]
	});
}
//#endregion
export { LessonPage as component };
