import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lot-seal-yXjyAuxj.js
var import_jsx_runtime = require_jsx_runtime();
/** Archival lot seal — a geometric mark, not a fake scannable code. */
function LotSeal({ seed, label }) {
	const cells = pattern(seed, 7);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 70 70",
			width: "96",
			height: "96",
			"aria-hidden": true,
			className: "border border-ink bg-paper p-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "0",
				y: "0",
				width: "70",
				height: "70",
				fill: "transparent"
			}), cells.map((on, i) => {
				const x = i % 7 * 10;
				const y = Math.floor(i / 7) * 10;
				return on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x,
					y,
					width: "10",
					height: "10",
					fill: "currentColor"
				}, i) : null;
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "max-w-[12ch] text-center font-mono text-[9px] tracking-[0.14em] text-slate uppercase",
			children: label
		})]
	});
}
function pattern(seed, n) {
	const out = [];
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	for (let i = 0; i < n * n; i++) {
		h ^= i + 1;
		h = Math.imul(h, 16777619);
		const edge = i < n || i >= n * (n - 1) || i % n === 0 || i % n === n - 1;
		out.push(edge || (h >>> 0) % 3 !== 0);
	}
	return out;
}
//#endregion
export { LotSeal as t };
