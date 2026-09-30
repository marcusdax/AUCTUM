import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as AuctumSeal, l as marketPulse, o as accountById, s as useLedger } from "./router-DCZEKINX.mjs";
import { a as Sheet, n as DoubleRule, o as Stamp, r as Eyebrow, s as Stat, t as Button } from "./ui-iD4xH4Yo.mjs";
import { a as roleLabel, n as formatCents, r as formatDate } from "./format-CABBNuv4.mjs";
import { t as TrustBadge } from "./trust-badge-C0yL7r1E.mjs";
import { t as LotCard } from "./lot-card-CY5SgKOV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-N3F2lFrF.js
var import_jsx_runtime = require_jsx_runtime();
function Compass() {
	const lots = useLedger((s) => s.lots);
	const events = useLedger((s) => s.events);
	const accounts = useLedger((s) => s.accounts);
	const stories = useLedger((s) => s.stories);
	const featured = lots.filter((l) => l.availability === "available" || l.availability === "sample").slice(0, 3);
	const karmic = accountById(accounts, "acc-karmic");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				className: "overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuctumSeal, { size: 72 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "LotSpace · Compass" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 max-w-[14ch] font-display text-[clamp(2.4rem,6vw,4.6rem)] leading-[0.92]",
								children: "Every farm gets a Space."
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, {
							className: "-rotate-6",
							children: "Verified origin"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-[34ch] font-display text-[clamp(1.35rem,2.4vw,2rem)] leading-snug",
						children: "Every lot gets a ledger. Every relationship becomes durable."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xl text-slate",
						children: "Auctum Ledger is the verified spine. LotSpace is the social face. Karmic Circle operates Vietnam origin. A profile is also a trading instrument. A cupping result is also reputation."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/market",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								tone: "stamp",
								children: ["Open the market ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/scan",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								tone: "ghost",
								children: "Scan a document"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DoubleRule, { className: "mt-10 mb-8" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-6 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "C-market",
								value: formatCents(marketPulse.cMarketCents),
								hint: "Reference, not the whole account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Lots on offer",
								value: marketPulse.lotsOnOffer,
								hint: "Verified availability"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Farms verified",
								value: marketPulse.farmersVerified,
								hint: "Cooperative coverage"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Locks this month",
								value: marketPulse.locksThisMonth,
								hint: "Immutable snapshots"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[1.4fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Featured supply" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-3xl",
						children: "On the sheet"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/market",
						className: "meta hover:text-ink",
						children: "All lots"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2",
					children: featured.map((lot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotCard, { lot }, lot.id))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-6",
					children: [karmic ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Flagship operator" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl",
							children: karmic.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-slate",
							children: karmic.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, { trust: karmic.trust })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/spaces/$spaceId",
							params: { spaceId: "karmic" },
							className: "mt-5 inline-flex",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								tone: "ghost",
								children: "Enter the Space"
							})
						})
					] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Ledger pulse" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl",
							children: "What just happened"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-5 space-y-4",
							children: events.slice(0, 5).map((ev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "border-t border-hair pt-3 first:border-0 first:pt-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-[10px] tracking-[0.14em] text-slate uppercase",
									children: [
										formatDate(ev.at),
										" · ",
										ev.kind
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm",
									children: ev.summary
								})]
							}, ev.id))
						})
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				padded: false,
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[21/9] min-h-48",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/vn-highlands.jpg",
							alt: "",
							className: "h-full w-full object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-ink/70 to-ink/10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-0 flex flex-col justify-end p-6 sm:p-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] tracking-[0.2em] text-stamp-soft uppercase",
									children: "The craft"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 max-w-[18ch] font-display text-3xl text-paper sm:text-4xl",
									children: "Origin dignity is a design constraint."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/craft",
									className: "mt-4 inline-flex",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "Read the essay" })
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Stories from followed Spaces" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-3",
				children: stories.slice(0, 3).map((st) => {
					const who = accountById(accounts, st.accountId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stories",
						className: "bg-paper p-5 shadow-[var(--shadow-sheet)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "meta",
								children: who ? roleLabel(who.role) : ""
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
					}, st.id);
				})
			})] })
		]
	});
}
//#endregion
export { Compass as component };
