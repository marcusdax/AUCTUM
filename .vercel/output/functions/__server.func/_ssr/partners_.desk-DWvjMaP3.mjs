import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as cn, C as listingById, g as useLedger, h as lotById, p as useExchange, w as sellerById } from "./router-DSNp4tp8.mjs";
import { a as Sheet, r as Eyebrow, s as Stat, t as Button } from "./ui-DI4E79SW.mjs";
import { n as formatCents, r as formatDate } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partners_.desk-DWvjMaP3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeskPage() {
	const sellers = useExchange((s) => s.sellers);
	const clicks = useExchange((s) => s.clicks);
	const listings = useExchange((s) => s.listings);
	const testWebhook = useExchange((s) => s.testWebhook);
	const retryClick = useExchange((s) => s.retryClick);
	const lots = useLedger((s) => s.lots);
	const verified = sellers.filter((s) => s.verifiedAt);
	const [sellerId, setSellerId] = (0, import_react.useState)(verified[0]?.id ?? sellers[0]?.id ?? "");
	const seller = sellerById(sellers, sellerId);
	const mine = (0, import_react.useMemo)(() => clicks.filter((c) => c.sellerId === sellerId), [clicks, sellerId]);
	const delivered = mine.filter((c) => c.status === "delivered").length;
	const failed = mine.filter((c) => c.status === "failed").length;
	const intent = mine.reduce((n, c) => n + c.priceCents, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Seller desk" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl sm:text-5xl",
				children: "Who clicked, what, and when."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-slate",
				children: "No dark patterns. The payload is signed with your API key. Webhook first, email if the hook is silent. Time to notify is the promise."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: sellers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSellerId(s.id),
					className: cn("min-h-11 border px-3 font-mono text-[11px] tracking-[0.14em] uppercase", sellerId === s.id ? "border-ink bg-ink text-paper" : "border-hair-strong bg-paper"),
					children: s.name
				}, s.id))
			})
		] }), seller ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Clicks",
						value: mine.length,
						hint: "Intent recorded"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Delivered",
						value: delivered,
						hint: seller.webhookUrl ? "Webhook" : "Email fallback"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Failed",
						value: failed,
						hint: "Retry from this desk"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Intent",
						value: formatCents(intent),
						hint: "Not a conversion — yet"
					}) })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "meta",
						children: "Endpoint"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-2xl",
						children: seller.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-slate",
						children: seller.webhookUrl ?? "Email only — no webhook on file"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-mono text-[11px] text-slate",
						children: seller.apiKey
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					tone: "ghost",
					onClick: () => testWebhook(seller.id),
					children: "Send test event"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Notification log" }), mine.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-slate",
				children: "No clicks yet. Test the webhook or wait for a buyer."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 divide-y divide-hair",
				children: mine.map((c) => {
					const listing = listingById(listings, c.listingId);
					const lot = listing ? lotById(lots, listing.lotId) : void 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-2 py-4 sm:grid-cols-[1fr_auto]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[10px] tracking-[0.14em] text-slate uppercase",
								children: [
									formatDate(c.clickedAt),
									" · ",
									c.channel,
									" · ",
									c.status,
									c.statusCode ? ` · ${c.statusCode}` : ""
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-xl",
								children: lot?.title ?? c.lotId
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-slate",
								children: [
									c.buyerEmail,
									" · ×",
									c.qty,
									" · ",
									formatCents(c.priceCents),
									" · sig ",
									c.signature
								]
							}),
							c.error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-stamp",
								children: c.error
							}) : null
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [lot ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/autopsy/$lotId",
								params: { lotId: lot.id },
								className: "meta hover:text-ink",
								children: "Autopsy"
							}) : null, c.status === "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								tone: "quiet",
								className: "min-h-9 px-2",
								onClick: () => retryClick(c.id),
								children: "Retry"
							}) : null]
						})]
					}, c.id);
				})
			})] })
		] }) : null]
	});
}
//#endregion
export { DeskPage as component };
