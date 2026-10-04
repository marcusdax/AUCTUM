import { C as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as cn } from "./router-DSNp4tp8.mjs";
import { t as bandLabel } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trust-badge-C0yL7r1E.js
var import_jsx_runtime = require_jsx_runtime();
var bandClass = {
	sealed: "border-sage text-sage",
	verified: "border-ink text-ink",
	provisional: "border-brass text-brass",
	watch: "border-stamp text-stamp",
	restricted: "border-stamp bg-stamp/10 text-stamp"
};
function TrustBadge({ trust, size = "md" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2 border font-mono uppercase tracking-[0.16em]", size === "sm" ? "px-2 py-1 text-[9px]" : "px-2.5 py-1.5 text-[10px]", bandClass[trust.band]),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular",
			children: trust.score
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "opacity-70",
			children: bandLabel(trust.band)
		})]
	});
}
function TrustMeter({ trust }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-display text-3xl tabular leading-none",
				children: trust.score
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, { trust })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 bg-hair",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full", trust.band === "sealed" && "bg-sage", trust.band === "verified" && "bg-ink", trust.band === "provisional" && "bg-brass", (trust.band === "watch" || trust.band === "restricted") && "bg-stamp"),
				style: { width: `${trust.score}%` }
			})
		})]
	});
}
//#endregion
export { TrustMeter as n, TrustBadge as t };
