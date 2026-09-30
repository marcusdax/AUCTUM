import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as cn, s as useLedger } from "./router-DCZEKINX.mjs";
import { a as Sheet, r as Eyebrow, s as Stat } from "./ui-iD4xH4Yo.mjs";
import { a as roleLabel, i as formatKg, n as formatCents } from "./format-CABBNuv4.mjs";
import { t as TrustBadge } from "./trust-badge-C0yL7r1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/crm-Bp94Wgpl.js
var import_jsx_runtime = require_jsx_runtime();
function CrmPage() {
	const accounts = useLedger((s) => s.accounts);
	const ar = accounts.reduce((n, a) => n + a.outstandingCents, 0);
	const atRisk = accounts.filter((a) => a.lifecycle === "at-risk" || a.churnRisk >= 30).length;
	const retained = accounts.filter((a) => a.lifecycle === "retained").length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "CRM" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl sm:text-5xl",
				children: "Relationships with a ledger attached"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-slate",
				children: "Lifecycle, outstanding, churn, and trust travel with every profile. A conversation can graduate into a sample, an offer, a lock, a receipt."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Accounts",
						value: accounts.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Retained",
						value: retained
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Watch / risk",
						value: atRisk
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "AR aging",
						value: formatCents(ar)
					})
				]
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			padded: false,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-hair",
						children: [
							"Account",
							"Role",
							"Trust",
							"Lifecycle",
							"Churn",
							"Volume",
							"AR"
						].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "px-5 py-3 font-mono text-[10px] font-medium tracking-[0.16em] text-slate uppercase",
							children: h
						}, h))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-hair last:border-0 hover:bg-sheet",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/crm/$accountId",
									params: { accountId: a.id },
									className: "block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-lg",
										children: a.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-0.5 block text-xs text-slate",
										children: [
											a.locale,
											", ",
											a.country
										]
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-slate",
								children: roleLabel(a.role)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
									trust: a.trust,
									size: "sm"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 capitalize",
								children: a.lifecycle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: cn("tabular", a.churnRisk >= 30 ? "text-stamp" : "text-ink"),
									children: [a.churnRisk, "%"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 tabular",
								children: formatKg(a.volumeKgYtd)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 tabular",
								children: formatCents(a.outstandingCents)
							})
						]
					}, a.id)) })]
				})
			})
		})]
	});
}
//#endregion
export { CrmPage as component };
