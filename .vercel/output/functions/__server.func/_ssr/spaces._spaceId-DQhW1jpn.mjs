import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as TRUST_LABELS, n as Route, s as useLedger } from "./router-DCZEKINX.mjs";
import { a as Sheet, i as FieldRow, r as Eyebrow, s as Stat, t as Button } from "./ui-iD4xH4Yo.mjs";
import { a as roleLabel, i as formatKg, n as formatCents, r as formatDate } from "./format-CABBNuv4.mjs";
import { n as TrustMeter } from "./trust-badge-C0yL7r1E.mjs";
import { t as LotCard } from "./lot-card-CY5SgKOV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spaces._spaceId-DQhW1jpn.js
var import_jsx_runtime = require_jsx_runtime();
function SpacePage() {
	const { spaceId } = Route.useParams();
	const accounts = useLedger((s) => s.accounts);
	const lots = useLedger((s) => s.lots);
	const stories = useLedger((s) => s.stories);
	const documents = useLedger((s) => s.documents);
	const following = useLedger((s) => s.following);
	const follow = useLedger((s) => s.follow);
	const account = accounts.find((a) => a.id === `acc-${spaceId}` || a.id.replace("acc-", "") === spaceId);
	if (!account) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl",
		children: "Space unpublished"
	}) });
	const mine = lots.filter((l) => l.producerId === account.id || l.exporterId === account.id);
	const mineStories = stories.filter((s) => s.accountId === account.id);
	const mineDocs = documents.filter((d) => d.accountId === account.id);
	const followed = following.includes(account.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				padded: false,
				className: "overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-h-56",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: account.image,
							alt: "",
							className: "h-64 w-full object-cover sm:h-80"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 p-6 sm:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[10px] tracking-[0.2em] text-stamp-soft uppercase",
									children: [
										roleLabel(account.role),
										" · ",
										account.district
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-1 font-display text-4xl text-paper sm:text-5xl",
									children: account.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-xl text-sm text-paper/80",
									children: account.tagline
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 p-6 sm:grid-cols-4 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Trust",
							value: account.trust.score,
							hint: account.trust.band
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Volume YTD",
							value: formatKg(account.volumeKgYtd)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "AR",
							value: formatCents(account.outstandingCents),
							hint: "Outstanding"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								tone: followed ? "ghost" : "stamp",
								onClick: () => follow(account.id),
								children: followed ? "Following" : "Follow this Space"
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[0.9fr_1.1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Proof strip" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: "Reputation that travels"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustMeter, { trust: account.trust })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6",
						children: [
							Object.keys(TRUST_LABELS).map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: TRUST_LABELS[k],
								value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular",
									children: account.trust.components[k]
								})
							}, k)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "On ledger since",
								value: formatDate(account.since)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Language",
								value: account.language
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/crm/$accountId",
						params: { accountId: account.id },
						className: "mt-5 inline-block meta hover:text-ink",
						children: "Open CRM file"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Ledger" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: "Lots from this Space"
					}),
					mine.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-4 sm:grid-cols-2",
						children: mine.slice(0, 4).map((lot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotCard, { lot }, lot.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-slate",
						children: "No lots on the sheet yet. Registration is not participation."
					})
				] })]
			}),
			mineStories.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Media wall" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				children: mineStories.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "grid gap-3 sm:grid-cols-[140px_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: st.image,
						alt: "",
						className: "aspect-[3/2] object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl",
						children: st.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-slate",
						children: st.lede
					})] })]
				}, st.id))
			})] }) : null,
			mineDocs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Compliance file" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-hair",
				children: mineDocs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-baseline justify-between gap-2 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: d.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "meta",
						children: d.status
					})]
				}, d.id))
			})] }) : null
		]
	});
}
//#endregion
export { SpacePage as component };
