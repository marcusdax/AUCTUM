import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as TRUST_LABELS, i as Route$2, o as accountById, s as useLedger } from "./router-DCZEKINX.mjs";
import { a as Sheet, i as FieldRow, r as Eyebrow, s as Stat, t as Button } from "./ui-iD4xH4Yo.mjs";
import { a as roleLabel, i as formatKg, n as formatCents, r as formatDate } from "./format-CABBNuv4.mjs";
import { n as TrustMeter } from "./trust-badge-C0yL7r1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm._accountId-CXRTAeNQ.js
var import_jsx_runtime = require_jsx_runtime();
function AccountPage() {
	const { accountId } = Route$2.useParams();
	const accounts = useLedger((s) => s.accounts);
	const lots = useLedger((s) => s.lots);
	const documents = useLedger((s) => s.documents);
	const events = useLedger((s) => s.events);
	const account = accountById(accounts, accountId);
	if (!account) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl",
		children: "No such file"
	}) });
	const relatedLots = lots.filter((l) => l.producerId === account.id || l.exporterId === account.id);
	const relatedDocs = documents.filter((d) => d.accountId === account.id);
	const relatedEvents = events.filter((e) => e.accountId === account.id);
	const peers = account.relationships.map((id) => accountById(accounts, id)).filter((x) => Boolean(x));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eyebrow, { children: [
						"CRM · ",
						roleLabel(account.role),
						" · ",
						account.lifecycle
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl",
						children: account.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-xl text-slate",
						children: account.tagline
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/spaces/$spaceId",
					params: { spaceId: account.id.replace("acc-", "") },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						tone: "ghost",
						children: "Open Space"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Churn risk",
						value: `${account.churnRisk}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Volume YTD",
						value: formatKg(account.volumeKgYtd)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Outstanding",
						value: formatCents(account.outstandingCents)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Since",
						value: formatDate(account.since)
					})
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Honesty check" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: "Trust travels with the tier"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustMeter, { trust: account.trust })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-6",
						children: Object.keys(TRUST_LABELS).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
							label: TRUST_LABELS[k],
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular",
								children: [
									account.trust.components[k],
									" · ",
									Math.round({
										documentVerification: 35,
										transactionIntegrity: 25,
										qcConsistency: 15,
										relationshipHistory: 15,
										agentAttestation: 10
									}[k]),
									"%"
								]
							})
						}, k))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Documents" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: "File on the desk"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 divide-y divide-hair",
						children: relatedDocs.length ? relatedDocs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-baseline justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: d.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "meta mt-1",
								children: [
									d.kind,
									" · ",
									Math.round(d.confidence * 100),
									"%"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "meta",
								children: d.status
							})]
						}, d.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "py-3 text-sm text-slate",
							children: "No documents yet. Scan from the OCR desk."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/scan",
						className: "mt-4 inline-block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							tone: "stamp",
							children: "Scan into this file"
						})
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Graph" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl",
					children: "Durable relationships"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-wrap gap-3",
					children: peers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/crm/$accountId",
						params: { accountId: p.id },
						className: "border border-hair bg-sheet px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "meta",
							children: roleLabel(p.role)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg",
							children: p.name
						})]
					}, p.id))
				}),
				relatedLots.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 divide-y divide-hair",
					children: relatedLots.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "py-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/market/$lotId",
							params: { lotId: l.id },
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								l.code,
								" · ",
								l.title
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "tabular text-slate",
								children: [formatCents(l.pricePerLbCents), "/lb"]
							})]
						})
					}, l.id))
				}) : null,
				relatedEvents.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 space-y-3",
					children: relatedEvents.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "meta",
						children: [
							formatDate(e.at),
							" · ",
							e.kind
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						children: e.summary
					})] }, e.id))
				}) : null
			] })
		]
	});
}
//#endregion
export { AccountPage as component };
