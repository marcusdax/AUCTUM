import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as TRUST_LABELS, f as TRUST_WEIGHTS, s as useLedger } from "./router-DCZEKINX.mjs";
import { a as Sheet, r as Eyebrow } from "./ui-iD4xH4Yo.mjs";
import { a as roleLabel, t as bandLabel } from "./format-CABBNuv4.mjs";
import { n as TrustMeter, t as TrustBadge } from "./trust-badge-C0yL7r1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trust-BKHyyGwX.js
var import_jsx_runtime = require_jsx_runtime();
var policy = {
	sealed: "May publish price claims, lock, and appear in consumer autopsy.",
	verified: "May trade and sample. Price claims require a current QC sheet.",
	provisional: "Visible in market with a caution. No consumer QR until documents seal.",
	watch: "Offers held. Field audit required. OCR rejects accumulate here.",
	restricted: "Hidden from market. Human review of identity and receipts."
};
function TrustPage() {
	const ranked = [...useLedger((s) => s.accounts)].sort((a, b) => b.trust.score - a.trust.score);
	const flagship = ranked[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Trust desk" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl",
					children: "Honesty that stays with the tier"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-slate",
					children: "Trust is not a badge you buy. It is a weighted evidence score: documents, payments, cup consistency, relationship history, and the field agent who signed the capture."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-5",
				children: Object.keys(TRUST_LABELS).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					className: "sm:px-5 sm:py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "meta",
						children: [Math.round(TRUST_WEIGHTS[k] * 100), "%"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-xl leading-snug",
						children: TRUST_LABELS[k]
					})]
				}, k))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Policy" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl",
					children: "What a band is allowed to do"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-5 divide-y divide-hair",
					children: Object.keys(policy).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2 py-3 sm:grid-cols-[140px_1fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-mono text-[11px] tracking-[0.16em] uppercase",
							children: bandLabel(b)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "text-sm",
							children: policy[b]
						})]
					}, b))
				})
			] }),
			flagship ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Highest seal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 grid gap-6 lg:grid-cols-[1fr_220px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl",
					children: flagship.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-slate",
					children: flagship.tagline
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustMeter, { trust: flagship.trust })]
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				padded: false,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: ranked.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "border-b border-hair last:border-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/crm/$accountId",
						params: { accountId: a.id },
						className: "flex flex-wrap items-center justify-between gap-3 px-5 py-4 hover:bg-sheet",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: a.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate",
							children: [
								roleLabel(a.role),
								" · ",
								a.locale
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, { trust: a.trust })]
					})
				}, a.id)) })
			})
		]
	});
}
//#endregion
export { TrustPage as component };
