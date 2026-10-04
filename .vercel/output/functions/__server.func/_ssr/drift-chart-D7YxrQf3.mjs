import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as meanVariance, M as currentVariance, V as POLICY, z as withinTolerance } from "./router-DSNp4tp8.mjs";
import { r as formatDate } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drift-chart-D7YxrQf3.js
var import_jsx_runtime = require_jsx_runtime();
function DriftChart({ points }) {
	const w = 560;
	const h = 160;
	const pad = 12;
	const min = -POLICY.cuppingVariance.probation;
	const max = POLICY.cuppingVariance.probation;
	const xs = points.map((_, i) => pad + i / Math.max(points.length - 1, 1) * 536);
	const y = (v) => pad + (max - v) / (max - min) * 136;
	const d = points.map((p, i) => `${i === 0 ? "M" : "L"}${xs[i].toFixed(1)},${y(p.delta).toFixed(1)}`).join(" ");
	const last = currentVariance(points);
	const mean = meanVariance(points);
	const ok = withinTolerance(last);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "kicker",
				children: "Calibration · Cupper Tier 2"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-display text-2xl",
				children: "Variance vs. panel"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `font-mono text-sm tabular ${ok ? "text-sage" : "text-stamp"}`,
				children: [
					last >= 0 ? "+" : "",
					last.toFixed(2),
					" pts"
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 ${w} ${h}`,
			className: "mt-4 h-40 w-full",
			role: "img",
			"aria-label": "Calibration drift",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "0",
					y: y(max),
					width: w,
					height: y(min) - y(max),
					fill: "currentColor",
					className: "text-sage/10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "0",
					y1: y(0),
					x2: w,
					y2: y(0),
					stroke: "currentColor",
					className: "text-hair-strong",
					strokeWidth: "1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d,
					fill: "none",
					stroke: "currentColor",
					className: "text-ink",
					strokeWidth: "1.8"
				}),
				points.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: xs[i],
					cy: y(p.delta),
					r: i === points.length - 1 ? 3.5 : 2,
					className: "fill-ink"
				}, p.id))
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "meta",
					children: "Current"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
					className: "tabular",
					children: [last.toFixed(2), " pts"]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "meta",
					children: "Mean 90d"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
					className: "tabular",
					children: [mean.toFixed(2), " pts"]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "meta",
					children: "Sessions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
					className: "tabular",
					children: points.length
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
					className: "meta",
					children: "Status"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: ok ? "Within tolerance" : "Drift flagged" })] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-4 text-xs text-slate",
			children: [
				"Last session ",
				formatDate(points[points.length - 1]?.at ?? ""),
				". This data is private to you and your QC manager. It is never displayed on a public profile and never feeds Trust."
			]
		})
	] });
}
//#endregion
export { DriftChart as t };
