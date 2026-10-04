import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as useLedger } from "./router-DSNp4tp8.mjs";
import { a as Sheet, r as Eyebrow, t as Button } from "./ui-DI4E79SW.mjs";
import { a as roleLabel, r as formatDate } from "./format-CABBNuv4.mjs";
import { t as TrustBadge } from "./trust-badge-C0yL7r1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/following-D1lxUMSb.js
var import_jsx_runtime = require_jsx_runtime();
function FollowingPage() {
	const following = useLedger((s) => s.following);
	const accounts = useLedger((s) => s.accounts);
	const stories = useLedger((s) => s.stories);
	const follow = useLedger((s) => s.follow);
	const people = accounts.filter((a) => following.includes(a.id));
	const feed = stories.filter((s) => following.includes(s.accountId)).sort((a, b) => a.publishedAt < b.publishedAt ? 1 : -1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Following" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl",
					children: "Stay close to chosen people"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-slate",
					children: "A follow is a relationship signal. Chronological safety valve: this feed is recency, not a popularity contest."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-3 overflow-x-auto pb-2",
				children: people.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-56 bg-paper p-4 shadow-[var(--shadow-sheet)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "meta",
							children: roleLabel(p.role)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-lg",
							children: p.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
								trust: p.trust,
								size: "sm"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							tone: "quiet",
							className: "mt-2 px-0",
							onClick: () => follow(p.id),
							children: "Unfollow"
						})
					]
				}, p.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: feed.map((st) => {
					const who = people.find((p) => p.id === st.accountId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
						className: "grid gap-5 sm:grid-cols-[180px_1fr] sm:p-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: st.image,
							alt: "",
							className: "aspect-[3/2] w-full object-cover sm:h-full"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:py-6 sm:pr-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "meta",
									children: [
										who?.name,
										" · ",
										formatDate(st.publishedAt)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 font-display text-2xl",
									children: st.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-slate",
									children: st.body
								}),
								st.lotId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/market/$lotId",
									params: { lotId: st.lotId },
									className: "mt-3 inline-block meta hover:text-ink",
									children: "Open the lot"
								}) : null
							]
						})]
					}, st.id);
				})
			})
		]
	});
}
//#endregion
export { FollowingPage as component };
