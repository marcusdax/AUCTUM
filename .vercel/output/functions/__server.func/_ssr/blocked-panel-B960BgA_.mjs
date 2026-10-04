import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as useEducation, N as daysSince } from "./router-DSNp4tp8.mjs";
import { c as buttonClass, t as Button } from "./ui-DI4E79SW.mjs";
import { r as formatDate } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blocked-panel-B960BgA_.js
var import_jsx_runtime = require_jsx_runtime();
function BlockedActionPanel({ block, onBegin, compact = false }) {
	const cred = useEducation((s) => s.credentials).find((c) => c.type === block.credentialType);
	const first = block.steps[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "border border-stamp/40 bg-paper p-5 shadow-[var(--shadow-sheet)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker text-stamp",
				children: block.reason === "stale" ? "Content superseded" : "Authority blocked"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-2 font-display text-2xl",
				children: block.action
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm",
				children: [
					"You cannot ",
					block.action.toLowerCase(),
					" without an active ",
					block.credentialType,
					" credential."
				]
			}),
			!compact && cred ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 border border-hair bg-sheet px-4 py-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "meta",
							children: "Credential state"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "uppercase",
							children: cred.state
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "meta",
							children: cred.state === "lapsed" ? "Lapsed on" : "Issued"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [formatDate(cred.state === "lapsed" ? cred.expiresAt : cred.issuedAt), cred.state === "lapsed" ? ` (${daysSince(cred.expiresAt)} days ago)` : ""] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-3 py-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "meta",
							children: "Context"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: block.actionContext })]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 border border-hair px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "meta",
							children: "Shortest path to unblocked"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-[11px] tabular",
							children: [
								"~",
								block.estimatedMinutes,
								" min"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-2",
						children: block.steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid grid-cols-[1.5rem_1fr_auto] gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-slate",
									children: String(i + 1).padStart(2, "0")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular text-slate",
									children: [
										"~",
										step.minutes,
										" min"
									]
								})
							]
						}, step.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-slate",
						children: block.isRenewal ? "This is a renewal path. Prior progress is preserved." : "First issue. History starts here."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [first?.lessonId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					tone: "stamp",
					onClick: () => onBegin(first.lessonId),
					children: "Begin renewal path"
				}) : first?.assessmentId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/education/assess/$assessmentId",
					params: { assessmentId: first.assessmentId },
					className: buttonClass("stamp"),
					children: "Begin renewal path"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/education/credential/$type",
					params: { type: block.credentialType },
					className: buttonClass("ghost"),
					children: "View full credential"
				})]
			})
		]
	});
}
//#endregion
export { BlockedActionPanel as t };
