import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as cn, D as CREDENTIAL_META, E as useEducation, M as currentVariance, O as OPERATOR, P as daysUntil, R as tracks, j as calibrationPoints, k as blockedActions } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, r as Eyebrow, s as Stat, t as Button } from "./ui-DI4E79SW.mjs";
import { r as formatDate } from "./format-CABBNuv4.mjs";
import { t as BlockedActionPanel } from "./blocked-panel-B960BgA_.mjs";
import { t as DriftChart } from "./drift-chart-D7YxrQf3.mjs";
import { t as InlineLesson } from "./inline-lesson-BC0DjaEt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/education-9oPmpkP_.js
var import_jsx_runtime = require_jsx_runtime();
var stateLabel = {
	active: "Active",
	expiring: "Expiring",
	stale: "Stale",
	lapsed: "Lapsed",
	probationary: "Probationary"
};
function CredentialCard({ credential, onRenew }) {
	const days = daysUntil(credential.expiresAt);
	const meta = CREDENTIAL_META[credential.type];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		"data-state": credential.state,
		className: cn("border bg-paper p-5 shadow-[var(--shadow-sheet)]", "border-l-[3px]", credential.state === "active" && "border-hair border-l-sage", credential.state === "expiring" && "border-brass border-l-brass", credential.state === "stale" && "border-dashed border-slate border-l-slate opacity-90", credential.state === "lapsed" && "border-stamp/50 border-l-stamp opacity-80", credential.state === "probationary" && "border-stamp border-l-stamp"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-mono text-[12px] tracking-[0.16em] uppercase",
					children: meta.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: cn("font-mono text-[10px] tracking-[0.18em] uppercase", credential.state === "active" && "text-sage", credential.state === "expiring" && "text-brass", credential.state === "stale" && "text-slate", (credential.state === "lapsed" || credential.state === "probationary") && "text-stamp"),
					children: ["● ", stateLabel[credential.state]]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-3 text-sm", credential.state === "lapsed" && "text-slate line-through decoration-stamp"),
				children: credential.authorityScope.join(" · ")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid gap-2 text-sm sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "meta",
						children: "Issued"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(credential.issuedAt) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "meta",
						children: "Expires"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
						className: "tabular",
						children: [formatDate(credential.expiresAt), days >= 0 ? ` · ${days} days remaining` : ` · lapsed ${Math.abs(days)} days`]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "meta",
						children: "Content"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: credential.contentVersion })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "meta",
						children: "Source"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: credential.sourceRef })] })
				]
			}),
			credential.staleness ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 font-mono text-[11px] tracking-[0.08em] text-brass uppercase",
				children: [
					"Content ",
					credential.contentVersion,
					" superseded by ",
					credential.staleness.supersededBy
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [onRenew && (credential.state === "lapsed" || credential.state === "expiring" || credential.state === "stale") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: buttonClass("stamp"),
					onClick: onRenew,
					children: credential.state === "stale" ? "Take delta module" : "Begin renewal"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/education/credential/$type",
					params: { type: credential.type },
					className: buttonClass("ghost"),
					children: "Full record"
				})]
			})
		]
	});
}
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Education · Readiness" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl",
					children: "What you can do. Until when. Against what."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 max-w-xl text-slate",
					children: [
						OPERATOR.name,
						" · ",
						OPERATOR.title,
						". The tab is not a library. Teaching is summoned at the point of work. Credentials gate action. Drift never feeds Trust."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Held",
							value: credentials.length,
							hint: "Typed, expiring grants"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Blocked",
							value: hardBlocks.length,
							hint: "Money-adjacent authorities"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Cup drift",
							value: `${currentVariance(calibrationPoints) >= 0 ? "+" : ""}${currentVariance(calibrationPoints).toFixed(2)}`,
							hint: "Private · 90 days"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Desk",
							value: "KC",
							hint: OPERATOR.desk
						})
					]
				})
			] }),
			inline ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Summoned at the point of work" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl",
					children: "Before you can continue"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineLesson, {
						lessonId: inline,
						onDone: closeInline,
						onDismiss: closeInline
					})
				})
			] }) : null,
			hardBlocks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockedActionPanel, {
				block: b,
				onBegin: beginRemedy
			}, b.action)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Credentials" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-3xl",
					children: "Authority on this desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 lg:grid-cols-2",
					children: credentials.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CredentialCard, {
						credential: c,
						onRenew: () => {
							const step = blocked.find((b) => b.credentialType === c.type)?.steps[0];
							if (step?.lessonId) beginRemedy(step.lessonId);
						}
					}, c.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriftChart, { points: calibrationPoints }) }),
			warns.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockedActionPanel, {
				block: b,
				onBegin: beginRemedy
			}, b.action)),
			next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Recommended next" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl",
					children: next.steps[0]?.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-slate",
					children: [
						next.action,
						". ~",
						next.estimatedMinutes,
						" minutes.",
						" ",
						next.isRenewal ? "Renewal, not re-enrolment." : ""
					]
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Tracks · below the fold" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl",
					children: "Curriculum is the path to a credential"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-slate",
					children: "Course browsing is secondary. Each track terminates in an assessment that issues or renews authority."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-px bg-hair sm:grid-cols-2",
					children: tracks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-paper p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "meta",
								children: ["Track ", t.id]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-xl",
								children: t.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-slate",
								children: t.audience
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 font-mono text-[11px] tracking-[0.12em] text-stamp uppercase",
								children: ["Issues ", t.issues]
							}),
							t.id === "D" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/education/producer",
								className: buttonClass("ghost", "mt-4"),
								children: "Open Vietnamese track"
							}) : t.id === "E" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/education/assess/$assessmentId",
								params: { assessmentId: "e-cal" },
								className: buttonClass("ghost", "mt-4"),
								children: "Monthly calibration"
							}) : t.id === "C" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/education/assess/$assessmentId",
								params: { assessmentId: "c-adj-2" },
								className: buttonClass("ghost", "mt-4"),
								children: "Adjudication scenario"
							}) : null
						]
					}, t.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Ledger of competence" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-4 space-y-3",
					children: events.slice(0, 6).map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-t border-hair pt-3 first:border-0 first:pt-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "meta",
							children: [
								formatDate(ev.at),
								" · ",
								ev.kind
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: ev.summary
						})]
					}, ev.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					tone: "quiet",
					className: "mt-4 px-0",
					onClick: () => reset(),
					children: "Reset this desk"
				})
			] })
		]
	});
}
//#endregion
export { EducationPage as component };
