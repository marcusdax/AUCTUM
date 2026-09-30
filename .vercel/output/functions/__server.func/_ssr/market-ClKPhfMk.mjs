import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as cn, s as useLedger } from "./router-DCZEKINX.mjs";
import { a as Sheet, r as Eyebrow } from "./ui-iD4xH4Yo.mjs";
import { t as LotCard } from "./lot-card-CY5SgKOV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-ClKPhfMk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var origins = [
	"All",
	"Vietnam",
	"Ethiopia",
	"Colombia",
	"Kenya"
];
var processes = [
	"All",
	"Washed",
	"Honey",
	"Natural"
];
function MarketPage() {
	const lots = useLedger((s) => s.lots);
	const [origin, setOrigin] = (0, import_react.useState)("All");
	const [process, setProcess] = (0, import_react.useState)("All");
	const filtered = (0, import_react.useMemo)(() => lots.filter((l) => {
		if (origin !== "All" && l.origin.country !== origin) return false;
		if (process !== "All" && l.process !== process) return false;
		return true;
	}), [
		lots,
		origin,
		process
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Market" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl sm:text-5xl",
					children: "The live offer sheet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-slate",
					children: "Ranked by availability, fit, and trust — never solely by engagement. A lot is a tradable object with a story, a cup, and a waterfall."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-wrap gap-2",
					children: origins.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: origin === o,
						onClick: () => setOrigin(o),
						children: o
					}, o))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: processes.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
						active: process === p,
						onClick: () => setProcess(p),
						children: p
					}, p))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "meta",
				children: [
					filtered.length,
					" lot",
					filtered.length === 1 ? "" : "s"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((lot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotCard, { lot }, lot.id))
			})
		]
	});
}
function FilterChip({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("min-h-11 border px-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-150", active ? "border-ink bg-ink text-paper" : "border-hair-strong bg-paper text-ink hover:border-ink"),
		children
	});
}
//#endregion
export { MarketPage as component };
