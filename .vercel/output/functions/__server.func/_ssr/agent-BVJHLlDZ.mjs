import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as AGENT_ID, o as accountById, s as useLedger } from "./router-DCZEKINX.mjs";
import { a as Sheet, r as Eyebrow, s as Stat, t as Button } from "./ui-iD4xH4Yo.mjs";
import { a as roleLabel, n as formatCents, r as formatDate } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/agent-BVJHLlDZ.js
var import_jsx_runtime = require_jsx_runtime();
function AgentPage() {
	const accounts = useLedger((s) => s.accounts);
	const tasks = useLedger((s) => s.tasks);
	const completeTask = useLedger((s) => s.completeTask);
	const agent = accountById(accounts, AGENT_ID);
	const open = tasks.filter((t) => t.status === "open");
	const done = tasks.filter((t) => t.status === "done");
	const territory = accounts.filter((a) => a.country === "Vietnam" && a.id !== "acc-duc");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Field agent OS" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl",
					children: agent?.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-slate",
					children: agent?.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Open tasks",
							value: open.length
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Territory",
							value: territory.length,
							hint: "Visible farms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Commission pending",
							value: formatCents(agent?.outstandingCents ?? 0)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Trust",
							value: agent?.trust.score ?? "—"
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Today" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: "Queue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-hair",
						children: open.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-start justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "meta",
								children: [
									t.kind,
									" · due ",
									formatDate(t.due)
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1",
								children: t.title
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								tone: "ghost",
								className: "min-h-9",
								onClick: () => completeTask(t.id),
								children: "Mark done"
							})]
						}, t.id))
					}),
					done.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm text-slate",
						children: [done.length, " completed this cycle."]
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Territory" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: "Cư M'gar desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-hair",
						children: territory.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "py-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/spaces/$spaceId",
								params: { spaceId: a.id.replace("acc-", "") },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg",
									children: a.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-slate",
									children: [
										roleLabel(a.role),
										" · trust ",
										a.trust.score,
										" · ",
										a.trust.band
									]
								})]
							})
						}, a.id))
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Doctrine" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-prose font-display text-2xl leading-snug",
					children: "The collector becomes an agent when the commission and the name are both visible."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-prose text-sm text-slate",
					children: "Activation is identity verified, plus one ledger-backed economic event, plus one relationship within ninety days. Registration is not participation."
				})
			] })
		]
	});
}
//#endregion
export { AgentPage as component };
