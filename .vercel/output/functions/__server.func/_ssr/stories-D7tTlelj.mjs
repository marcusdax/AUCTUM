import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as useLedger, m as accountById } from "./router-DSNp4tp8.mjs";
import { a as Sheet, r as Eyebrow } from "./ui-DI4E79SW.mjs";
import { a as roleLabel, r as formatDate } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stories-D7tTlelj.js
var import_jsx_runtime = require_jsx_runtime();
function StoriesPage() {
	const stories = useLedger((s) => s.stories);
	const accounts = useLedger((s) => s.accounts);
	const [hero, ...rest] = stories;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Stories" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl sm:text-5xl",
					children: "Origin media, with a name attached"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-slate",
					children: "A story is also provenance. Ranking prefers relationship, recency, and source quality — never empty engagement."
				})
			] }),
			hero ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: hero.lotId ? "/market/$lotId" : "/spaces/$spaceId",
				params: hero.lotId ? { lotId: hero.lotId } : { spaceId: hero.accountId.replace("acc-", "") },
				className: "grid overflow-hidden bg-paper shadow-[var(--shadow-sheet)] lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero.image,
					alt: "",
					className: "aspect-[3/2] h-full w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-end p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "meta",
							children: [
								formatDate(hero.publishedAt),
								" · ",
								accountById(accounts, hero.accountId)?.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl",
							children: hero.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-slate",
							children: hero.lede
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-prose text-sm",
							children: hero.body
						})
					]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: rest.map((st) => {
					const who = accountById(accounts, st.accountId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "overflow-hidden bg-paper shadow-[var(--shadow-sheet)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: st.image,
							alt: "",
							className: "aspect-[3/2] w-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "meta",
									children: [
										who ? roleLabel(who.role) : "",
										" · ",
										formatDate(st.publishedAt)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 font-display text-xl leading-snug",
									children: st.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-slate",
									children: st.lede
								})
							]
						})]
					}, st.id);
				})
			})
		]
	});
}
//#endregion
export { StoriesPage as component };
