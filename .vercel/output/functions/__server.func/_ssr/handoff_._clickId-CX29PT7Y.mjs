import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as listingById, g as useLedger, h as lotById, p as useExchange, s as Route$6, w as sellerById } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, i as FieldRow, o as Stamp, r as Eyebrow } from "./ui-DI4E79SW.mjs";
import { n as formatCents, r as formatDate } from "./format-CABBNuv4.mjs";
import { t as LotSeal } from "./lot-seal-yXjyAuxj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/handoff_._clickId-CX29PT7Y.js
var import_jsx_runtime = require_jsx_runtime();
function HandoffPage() {
	const { clickId } = Route$6.useParams();
	const clicks = useExchange((s) => s.clicks);
	const sellers = useExchange((s) => s.sellers);
	const listings = useExchange((s) => s.listings);
	const lots = useLedger((s) => s.lots);
	const click = clicks.find((c) => c.id === clickId);
	const cohort = click ? clicks.filter((c) => c.orderId === click.orderId) : [];
	const seller = click ? sellerById(sellers, click.sellerId) : void 0;
	if (!click || !seller) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl",
		children: "Handoff not on the ledger"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/exchange",
		className: "mt-4 inline-block meta hover:text-ink",
		children: "Return to Exchange"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Handoff recorded" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl",
					children: [seller.name, " has been notified."]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-slate",
					children: "Intent is on the immutable ledger. Payment stays with the seller. This page is the receipt of the click — not a capture of the customer."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, {
				className: "-rotate-6",
				children: click.status
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-6 sm:grid-cols-[1fr_auto]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Order",
					value: click.orderId
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Buyer",
					value: click.buyerEmail
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Channel",
					value: `${click.channel} · ${click.attempts} attempt`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Signature",
					value: click.signature
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Clicked",
					value: formatDate(click.clickedAt)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Referral",
					value: `auctum-ref=${click.orderId}`
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotSeal, {
				seed: click.orderId,
				label: click.orderId
			})]
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Lots in this handoff" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 divide-y divide-hair",
				children: cohort.map((c) => {
					const listing = listingById(listings, c.listingId);
					const lot = listing ? lotById(lots, listing.lotId) : void 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl",
							children: lot?.title ?? c.lotId
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-slate",
							children: [
								"×",
								c.qty,
								" · ",
								formatCents(c.priceCents)
							]
						})] }), lot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/autopsy/$lotId",
							params: { lotId: lot.id },
							className: "meta hover:text-ink",
							children: "Autopsy"
						}) : null]
					}, c.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 text-sm text-slate",
				children: [
					"Simulated store: ",
					click.referralUrl.replace("https://", ""),
					". In production this is a redirect. The seller sees the same payload, HMAC-signed, on their desk."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/partners/desk",
					className: buttonClass("stamp"),
					children: "Open seller desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/exchange",
					className: buttonClass("ghost"),
					children: "Continue browsing"
				})]
			})
		] })]
	});
}
//#endregion
export { HandoffPage as component };
