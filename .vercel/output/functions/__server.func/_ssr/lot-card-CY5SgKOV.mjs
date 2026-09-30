import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as accountById, s as useLedger } from "./router-DCZEKINX.mjs";
import { i as formatKg, n as formatCents, o as stateLabel } from "./format-CABBNuv4.mjs";
import { t as TrustBadge } from "./trust-badge-C0yL7r1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lot-card-CY5SgKOV.js
var import_jsx_runtime = require_jsx_runtime();
function LotCard({ lot }) {
	const accounts = useLedger((s) => s.accounts);
	const producer = accountById(accounts, lot.producerId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/market/$lotId",
		params: { lotId: lot.id },
		className: "group grid overflow-hidden bg-paper shadow-[var(--shadow-sheet)] transition-[box-shadow,transform] duration-200 ease-[var(--ease-out-folio)] hover:shadow-[var(--shadow-lift)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[3/2] overflow-hidden bg-raw",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: lot.image,
				alt: "",
				className: "h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-folio)] group-hover:scale-[1.03]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute top-3 left-3 bg-paper/92 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-ink uppercase",
				children: stateLabel(lot.availability)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-3 px-4 py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.18em] text-slate uppercase",
						children: lot.code
					}), producer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
						trust: producer.trust,
						size: "sm"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl leading-tight",
					children: lot.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-slate",
					children: [
						lot.origin.region,
						" · ",
						lot.process,
						" · ",
						lot.varietal
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-1 flex items-end justify-between border-t border-hair pt-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta",
						children: "FOB"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-lg tabular",
						children: [formatCents(lot.pricePerLbCents), "/lb"]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate tabular",
						children: formatKg(lot.weightKg)
					})]
				})
			]
		})]
	});
}
//#endregion
export { LotCard as t };
