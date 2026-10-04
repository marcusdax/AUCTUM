import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as listingById, S as formatLabel, c as Route$7, g as useLedger, h as lotById, m as accountById, p as useExchange, w as sellerById } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, i as FieldRow, r as Eyebrow, t as Button } from "./ui-DI4E79SW.mjs";
import { a as roleLabel, i as formatKg, n as formatCents } from "./format-CABBNuv4.mjs";
import { t as LotSeal } from "./lot-seal-yXjyAuxj.mjs";
import { t as TrustBadge } from "./trust-badge-C0yL7r1E.mjs";
import { t as TruePriceReceipt } from "./true-price-BhkkE8jE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/exchange_._listingId-BUvqJC5w.js
var import_jsx_runtime = require_jsx_runtime();
function ListingPage() {
	const { listingId } = Route$7.useParams();
	const listings = useExchange((s) => s.listings);
	const sellers = useExchange((s) => s.sellers);
	const addToCart = useExchange((s) => s.addToCart);
	const lots = useLedger((s) => s.lots);
	const accounts = useLedger((s) => s.accounts);
	const listing = listingById(listings, listingId);
	const lot = listing ? lotById(lots, listing.lotId) : void 0;
	const seller = listing ? sellerById(sellers, listing.sellerId) : void 0;
	if (!listing || !lot || !seller) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl",
		children: "Listing not live"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/exchange",
		className: "mt-4 inline-block meta hover:text-ink",
		children: "Return to Exchange"
	})] });
	const producer = accountById(accounts, lot.producerId);
	const others = listings.filter((l) => l.lotId === lot.id && l.id !== listing.id && l.live);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
			padded: false,
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-[1.2fr_0.8fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-64",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: lot.image,
						alt: "",
						className: "h-full max-h-[520px] w-full object-cover"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between p-6 sm:p-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eyebrow, { children: [
							lot.code,
							" · ",
							formatLabel(listing.format)
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 font-display text-4xl",
							children: lot.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-slate",
							children: [
								lot.origin.farm,
								" · ",
								lot.origin.region
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "border border-ink px-2 py-1 font-mono text-[10px] tracking-[0.16em] uppercase",
								children: "Auctum verified origin"
							}), producer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, { trust: producer.trust }) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-sm",
							children: lot.notes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-slate",
							children: lot.flavor.join(" · ")
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "meta",
								children: [
									seller.name,
									" · ",
									listing.bagGrams,
									" g"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-4xl tabular",
								children: formatCents(listing.priceCents)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-slate",
								children: [
									"FOB ",
									formatCents(lot.pricePerLbCents),
									"/lb · ",
									formatKg(lot.weightKg),
									" on the sheet · cup",
									" ",
									lot.cupScore.toFixed(2)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										tone: "stamp",
										disabled: !listing.live,
										onClick: () => addToCart(listing.id),
										children: "Add to cart"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/cart",
										className: buttonClass("ghost"),
										children: "Review cart"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/autopsy/$lotId",
										params: { lotId: lot.id },
										className: buttonClass("quiet"),
										children: "Autopsy"
									})
								]
							})
						]
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruePriceReceipt, {
				lot,
				listing
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Seller of record" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl",
							children: seller.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-slate",
							children: seller.pitch
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 meta",
							children: [
								seller.locale,
								" · ",
								seller.integrationModel
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotSeal, {
						seed: lot.code,
						label: lot.code
					})]
				}),
				producer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 border-t border-hair pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta",
						children: roleLabel(producer.role)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/crm/$accountId",
						params: { accountId: producer.id },
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: producer.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate",
							children: producer.tagline
						})]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
							label: "SKU",
							value: listing.sku
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
							label: "Process",
							value: lot.process
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
							label: "Varietal",
							value: lot.varietal
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
							label: "Store",
							value: seller.storeUrl.replace("https://", "")
						})
					]
				}),
				others.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 border-t border-hair pt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta",
						children: "Also listed by"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-2",
						children: others.map((o) => {
							const who = sellerById(sellers, o.sellerId);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/exchange/$listingId",
								params: { listingId: o.id },
								className: "text-sm hover:text-stamp",
								children: [
									who?.name,
									" · ",
									formatLabel(o.format),
									" · ",
									formatCents(o.priceCents)
								]
							}) }, o.id);
						})
					})]
				}) : null
			] })]
		})]
	});
}
//#endregion
export { ListingPage as component };
