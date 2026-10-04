import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as cn } from "./router-DSNp4tp8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-DI4E79SW.js
var import_jsx_runtime = require_jsx_runtime();
function Eyebrow({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("kicker", className),
		children
	});
}
function DoubleRule({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("folio-double", className) });
}
function buttonClass(tone = "solid", className) {
	return cn("inline-flex min-h-11 items-center justify-center gap-2 px-4 text-[13px] font-medium tracking-wide transition-[transform,background-color,color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40", tone === "solid" && "bg-ink text-paper hover:bg-sage", tone === "stamp" && "bg-stamp text-paper hover:bg-ink", tone === "ghost" && "border border-hair-strong bg-transparent text-ink hover:bg-ink hover:text-paper", tone === "quiet" && "text-slate hover:text-ink", className);
}
function Button({ tone = "solid", className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: buttonClass(tone, className),
		...props,
		children
	});
}
function Stamp({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-block border-2 border-stamp px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.28em] text-stamp uppercase", className),
		children
	});
}
function Sheet({ children, className, padded = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("bg-paper text-ink shadow-[var(--shadow-sheet)]", padded && "px-5 py-6 sm:px-8 sm:py-8", className),
		children
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "meta",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 font-display text-2xl leading-none tracking-tight tabular text-ink",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-slate",
				children: hint
			}) : null
		]
	});
}
function FieldRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-[minmax(0,140px)_1fr] gap-3 border-b border-hair py-2.5 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "meta self-baseline",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-sm leading-snug text-ink",
			children: value
		})]
	});
}
//#endregion
export { Sheet as a, buttonClass as c, FieldRow as i, DoubleRule as n, Stamp as o, Eyebrow as r, Stat as s, Button as t };
