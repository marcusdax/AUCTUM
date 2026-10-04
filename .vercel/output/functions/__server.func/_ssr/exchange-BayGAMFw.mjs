import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as cn, S as formatLabel, f as cartCount, g as useLedger, m as accountById, p as useExchange, w as sellerById } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, o as Stamp, r as Eyebrow, t as Button } from "./ui-DI4E79SW.mjs";
import { n as formatCents } from "./format-CABBNuv4.mjs";
import { t as TrustBadge } from "./trust-badge-C0yL7r1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exchange-BayGAMFw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ListingCard({ listing, lot }) {
	const sellers = useExchange((s) => s.sellers);
	const addToCart = useExchange((s) => s.addToCart);
	const accounts = useLedger((s) => s.accounts);
	const seller = sellerById(sellers, listing.sellerId);
	const producer = accountById(accounts, lot.producerId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "flex flex-col bg-paper shadow-[var(--shadow-sheet)] transition-[box-shadow] duration-200 hover:shadow-[var(--shadow-lift)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/exchange/$listingId",
			params: { listingId: listing.id },
			className: "group block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative aspect-[3/2] overflow-hidden bg-raw",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: lot.image,
						alt: "",
						className: "h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-folio)] group-hover:scale-[1.03]"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-3 left-3 bg-paper/92 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-ink uppercase",
						children: formatLabel(listing.format)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-3 right-3 bg-ink/90 px-2 py-1 font-mono text-[10px] tracking-[0.16em] text-paper uppercase",
						children: "Verified origin"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2 px-4 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[10px] tracking-[0.18em] text-slate uppercase",
							children: lot.code
						}), producer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
							trust: producer.trust,
							size: "sm"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-xl leading-tight",
						children: lot.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-slate",
						children: [
							lot.origin.region,
							" · ",
							lot.process,
							" · cup ",
							lot.cupScore.toFixed(2)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [seller?.name, seller?.verifiedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 font-mono text-[10px] tracking-[0.14em] text-sage uppercase",
							children: "Live"
						}) : null]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-auto flex items-end justify-between gap-3 border-t border-hair px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "meta",
				children: [listing.bagGrams, " g"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg tabular",
				children: formatCents(listing.priceCents)
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				tone: "stamp",
				className: "min-h-11 px-3",
				onClick: () => addToCart(listing.id),
				children: "Add"
			})]
		})]
	});
}
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
var cups = [
	"All",
	"85+",
	"87+",
	"89+"
];
var formats = [
	"All",
	"Roasted",
	"Green"
];
function ExchangePage() {
	const listings = useExchange((s) => s.listings);
	const sellers = useExchange((s) => s.sellers);
	const cart = useExchange((s) => s.cart);
	const lots = useLedger((s) => s.lots);
	const [origin, setOrigin] = (0, import_react.useState)("All");
	const [process, setProcess] = (0, import_react.useState)("All");
	const [cup, setCup] = (0, import_react.useState)("All");
	const [format, setFormat] = (0, import_react.useState)("All");
	const [sellerId, setSellerId] = (0, import_react.useState)("All");
	const count = cartCount(cart);
	const live = (0, import_react.useMemo)(() => listings.filter((l) => {
		if (!l.live) return false;
		const lot = lots.find((x) => x.id === l.lotId);
		if (!lot) return false;
		if (origin !== "All" && lot.origin.country !== origin) return false;
		if (process !== "All" && lot.process !== process) return false;
		if (cup === "85+" && lot.cupScore < 85) return false;
		if (cup === "87+" && lot.cupScore < 87) return false;
		if (cup === "89+" && lot.cupScore < 89) return false;
		if (format === "Roasted" && l.format !== "roasted-bag") return false;
		if (format === "Green" && l.format === "roasted-bag") return false;
		if (sellerId !== "All" && l.sellerId !== sellerId) return false;
		return true;
	}), [
		listings,
		lots,
		origin,
		process,
		cup,
		format,
		sellerId
	]);
	const verifiedSellers = sellers.filter((s) => s.verifiedAt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Auctum Exchange" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl",
							children: "Verified coffee, sold honestly."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-slate",
							children: "Named farmers. Named prices. Buyers discover the lot here. The original seller is notified in real time and keeps fulfillment. No fees. No extraction."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, {
						className: "-rotate-3",
						children: "Affiliate first"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/cart",
						className: buttonClass("stamp"),
						children: ["Cart", count ? ` · ${count}` : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/partners",
						className: buttonClass("ghost"),
						children: "Sell on Exchange"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap gap-2",
					children: origins.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: origin === o,
						onClick: () => setOrigin(o),
						children: o
					}, o))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [
						processes.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: process === p,
							onClick: () => setProcess(p),
							children: p
						}, p)),
						cups.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: cup === c,
							onClick: () => setCup(c),
							children: c
						}, c)),
						formats.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: format === f,
							onClick: () => setFormat(f),
							children: f
						}, f))
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: sellerId === "All",
						onClick: () => setSellerId("All"),
						children: "All sellers"
					}), verifiedSellers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: sellerId === s.id,
						onClick: () => setSellerId(s.id),
						children: s.name
					}, s.id))]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "meta",
				children: [
					live.length,
					" listing",
					live.length === 1 ? "" : "s",
					" · ",
					verifiedSellers.length,
					" verified sellers"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
				children: live.map((listing) => {
					const lot = lots.find((l) => l.id === listing.lotId);
					if (!lot) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListingCard, {
						listing,
						lot
					}, listing.id);
				})
			}),
			live.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Nothing on this cut"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-slate",
				children: "Widen origin, cup, or seller. Live listings never invent availability."
			})] }) : null
		]
	});
}
function Chip({ active, children, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("min-h-11 border px-3 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-150", active ? "border-ink bg-ink text-paper" : "border-hair-strong bg-paper text-ink hover:border-ink"),
		children
	});
}
//#endregion
export { ExchangePage as component };
