import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as listingById, g as useLedger, h as lotById, p as useExchange, w as sellerById } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, r as Eyebrow, t as Button } from "./ui-DI4E79SW.mjs";
import { n as formatCents } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BAQtAMbJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const cart = useExchange((s) => s.cart);
	const listings = useExchange((s) => s.listings);
	const sellers = useExchange((s) => s.sellers);
	const buyerEmail = useExchange((s) => s.buyerEmail);
	const setBuyerEmail = useExchange((s) => s.setBuyerEmail);
	const checkoutSeller = useExchange((s) => s.checkoutSeller);
	const lots = useLedger((s) => s.lots);
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	const groups = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const line of cart) {
			const listing = listingById(listings, line.listingId);
			if (!listing) continue;
			const seller = sellerById(sellers, listing.sellerId);
			if (!seller) continue;
			const cur = map.get(seller.id) ?? {
				seller,
				total: 0,
				lines: 0
			};
			cur.total += listing.priceCents * line.qty;
			cur.lines += line.qty;
			map.set(seller.id, cur);
		}
		return [...map.values()];
	}, [
		cart,
		listings,
		sellers
	]);
	if (!cart.length && !pending) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl",
		children: "Nothing to hand off"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/exchange",
		className: `mt-4 ${buttonClass("stamp")}`,
		children: "Open Exchange"
	})] });
	function handoff(sellerId) {
		setError(null);
		if (!buyerEmail.includes("@")) {
			setError("A real email is how the seller knows who arrived.");
			return;
		}
		setPending(true);
		const clickId = checkoutSeller(sellerId);
		if (!clickId) {
			setPending(false);
			setError("Handoff could not be recorded.");
			return;
		}
		navigate({
			to: "/handoff/$clickId",
			params: { clickId }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Affiliate checkout" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl",
				children: "Buy on the seller's store."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-slate",
				children: "Auctum records the click — not the purchase. Payment and fulfillment stay with the seller. They are notified before you arrive."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-6 block max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "meta",
					children: "Buyer email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "email",
					value: buyerEmail,
					onChange: (e) => setBuyerEmail(e.target.value),
					placeholder: "you@roastery.com",
					className: "mt-2 w-full border border-hair-strong bg-sheet px-3 py-3 text-sm",
					autoComplete: "email"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-stamp",
				children: error
			}) : null
		] }), groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta",
						children: g.seller.integrationModel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl",
						children: g.seller.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate",
						children: g.seller.pitch
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tabular",
					children: formatCents(g.total)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: cart.filter((line) => listingById(listings, line.listingId)?.sellerId === g.seller.id).map((line) => {
					const listing = listingById(listings, line.listingId);
					const lot = lotById(lots, listing.lotId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							lot?.title,
							" · ×",
							line.qty
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono tabular",
							children: formatCents(listing.priceCents * line.qty)
						})]
					}, line.listingId);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "button",
				tone: "stamp",
				className: "mt-6",
				onClick: () => handoff(g.seller.id),
				children: ["Buy on ", g.seller.name]
			})
		] }, g.seller.id))]
	});
}
//#endregion
export { CheckoutPage as component };
