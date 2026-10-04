import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as FieldRow } from "./ui-DI4E79SW.mjs";
import { n as formatCents } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/autopsy-T70ACsRy.js
var import_jsx_runtime = require_jsx_runtime();
function EconomicAutopsy({ lot }) {
	const rows = [
		{
			label: "Farmgate",
			cents: lot.farmgateCents,
			hint: "Paid to the producer"
		},
		{
			label: "Logistics",
			cents: lot.logisticsCents,
			hint: "Mill, bagging, inland"
		},
		{
			label: "Premium",
			cents: lot.premiumCents,
			hint: "Quality / relationship"
		},
		{
			label: "FOB",
			cents: lot.fobCents,
			hint: "The offer on the sheet"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "Economic autopsy"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-2 font-display text-2xl",
			children: "Price is what it sells for."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-prose text-sm text-slate",
			children: "Value is everything that made it possible. This waterfall is the public proof layer — the same numbers live on the ledger."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-3",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: row.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-sm tabular",
						children: [formatCents(row.cents), "/lb"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 h-1.5 bg-hair",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: row.label === "FOB" ? "h-full bg-stamp" : "h-full bg-ink",
						style: { width: `${Math.round(row.cents / lot.fobCents * 100)}%` }
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
					label: "Screen",
					value: lot.screen
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
export { EconomicAutopsy as t };
