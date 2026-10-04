import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as truePrice, U as sharePctForScore } from "./router-DSNp4tp8.mjs";
import { i as FieldRow } from "./ui-DI4E79SW.mjs";
import { n as formatCents } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/true-price-BhkkE8jE.js
var import_jsx_runtime = require_jsx_runtime();
function TruePriceReceipt({ lot, listing }) {
	const rows = truePrice(lot, listing);
	const share = sharePctForScore(lot.cupScore);
	const max = listing.priceCents || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "True price receipt"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-2 font-display text-2xl",
			children: "Show the math. Never collapse it."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 max-w-prose text-sm text-slate",
			children: [
				"Farmgate, movement, premium, seller cost, and the price on the bag — for this unit, not a marketing average. Revenue share at cup ",
				lot.cupScore.toFixed(2),
				" is ",
				share,
				"%."
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-3",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: row.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono text-sm tabular",
						children: formatCents(row.cents)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 h-1.5 bg-hair",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: row.tone === "stamp" ? "h-full bg-stamp" : row.tone === "brass" ? "h-full bg-brass" : "h-full bg-ink",
						style: { width: `${Math.min(100, Math.round(row.cents / max * 100))}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-slate",
					children: row.hint
				})
			] }, row.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Cup",
					value: `${lot.cupScore.toFixed(2)} · unrounded`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Moisture",
					value: `${lot.moisturePct}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Unit",
					value: `${listing.bagGrams} g · ${listing.sku}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Harvest",
					value: lot.harvest
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Elevation",
					value: `${lot.origin.elevationM} m`
				})
			]
		})
	] });
}
//#endregion
export { TruePriceReceipt as t };
