import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as listingById, S as formatLabel, f as cartCount, g as useLedger, h as lotById, p as useExchange, w as sellerById } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, r as Eyebrow, t as Button } from "./ui-DI4E79SW.mjs";
import { n as formatCents } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-B63_PeEn.js
var import_jsx_runtime = require_jsx_runtime();
function CartPage() {
	const cart = useExchange((s) => s.cart);
	const listings = useExchange((s) => s.listings);
	const sellers = useExchange((s) => s.sellers);
	const setQty = useExchange((s) => s.setQty);
	const removeLine = useExchange((s) => s.removeLine);
	const lots = useLedger((s) => s.lots);
	const count = cartCount(cart);
	const total = cart.reduce((n, line) => {
		const listing = listingById(listings, line.listingId);
		return n + (listing ? listing.priceCents * line.qty : 0);
	}, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Cart" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl sm:text-5xl",
				children: "Intent, not a capture."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-slate",
				children: "Auctum does not take payment on affiliate listings. You review here, then buy on the seller's store. They keep the customer. We keep the record."
			})
		] }), count === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "The cart is empty"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-slate",
				children: "Open the Exchange and add a verified listing."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/exchange",
				className: `mt-5 ${buttonClass("stamp")}`,
				children: "Browse Exchange"
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "divide-y divide-hair",
			children: cart.map((line) => {
				const listing = listingById(listings, line.listingId);
				if (!listing) return null;
				const lot = lotById(lots, listing.lotId);
				const seller = sellerById(sellers, listing.sellerId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-start gap-4 py-4 first:pt-0 last:pb-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: lot?.image,
							alt: "",
							className: "size-20 object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/exchange/$listingId",
									params: { listingId: listing.id },
									className: "font-display text-xl leading-tight hover:text-stamp",
									children: lot?.title ?? listing.sku
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-slate",
									children: [
										seller?.name,
										" · ",
										formatLabel(listing.format),
										" · ",
										listing.bagGrams,
										" g"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "meta",
										children: ["Qty", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: 1,
											max: 24,
											value: line.qty,
											onChange: (e) => setQty(listing.id, Number(e.target.value) || 1),
											className: "ml-2 w-16 border border-hair-strong bg-sheet px-2 py-1 font-mono text-sm tabular"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										tone: "quiet",
										className: "min-h-9 px-2",
										onClick: () => removeLine(listing.id),
										children: "Remove"
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl tabular",
							children: formatCents(listing.priceCents * line.qty)
						})
					]
				}, line.listingId);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap items-end justify-between gap-4 border-t border-hair pt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "meta",
				children: "Intent total"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl tabular",
				children: formatCents(total)
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/checkout",
				className: buttonClass("stamp"),
				children: "Continue to handoff"
			})]
		})] })]
	});
}
//#endregion
export { CartPage as component };
