import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as accountById, s as useLedger, u as spaces } from "./router-DCZEKINX.mjs";
import { a as Sheet, r as Eyebrow } from "./ui-iD4xH4Yo.mjs";
import { a as roleLabel } from "./format-CABBNuv4.mjs";
import { t as TrustBadge } from "./trust-badge-C0yL7r1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spaces-Cl_qR7s1.js
var import_jsx_runtime = require_jsx_runtime();
function SpacesPage() {
	const accounts = useLedger((s) => s.accounts);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Spaces" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl sm:text-5xl",
				children: "Rooms inside a coherent system"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-slate",
				children: "A farmer Space is identity, shopfront, compliance file, and income ledger. Personal without becoming chaotic. Sanctioned modules only."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
			children: spaces.map((sp) => {
				const account = accountById(accounts, sp.accountId);
				if (!account) return null;
				const slug = account.id.replace("acc-", "");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/spaces/$spaceId",
					params: { spaceId: slug },
					className: "group overflow-hidden bg-paper shadow-[var(--shadow-sheet)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[16/9]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: sp.cover,
							alt: "",
							className: "h-full w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] tracking-[0.16em] text-stamp-soft uppercase",
								children: roleLabel(account.role)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl text-paper",
								children: account.name
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-slate",
							children: [
								account.locale,
								", ",
								account.country
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
							trust: account.trust,
							size: "sm"
						})]
					})]
				}, sp.id);
			})
		})]
	});
}
//#endregion
export { SpacesPage as component };
