import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as AuctumSeal } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, r as Eyebrow } from "./ui-DI4E79SW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ecosystem-j4F2IPDK.js
var import_jsx_runtime = require_jsx_runtime();
var contexts = [
	{
		name: "Catalog",
		owns: "Lots, attributes, availability",
		event: "LotCreated"
	},
	{
		name: "CRM",
		owns: "Organizations, contacts, graph",
		event: "RelationshipQualified"
	},
	{
		name: "Samples",
		owns: "Inventory and logistics",
		event: "SampleShipped"
	},
	{
		name: "Orders",
		owns: "Locks, contracts, fulfillment",
		event: "PriceLocked"
	},
	{
		name: "Billing",
		owns: "Invoices, VietQR, fees",
		event: "PaymentSettled"
	},
	{
		name: "Spaces",
		owns: "Profiles, themes, modules",
		event: "SpaceVerified"
	},
	{
		name: "Feeds",
		owns: "Stories, follows, ranking",
		event: "StoryPublished"
	},
	{
		name: "Reputation",
		owns: "Cupping, badges, bands",
		event: "ScoreRecorded"
	},
	{
		name: "Connections",
		owns: "Threads, tips, intros",
		event: "TipSettled"
	},
	{
		name: "Documents",
		owns: "OCR intake, WORM export",
		event: "DocumentAccepted"
	},
	{
		name: "Exchange",
		owns: "Sellers, listings, affiliate clicks",
		event: "BuyerClickedProduct"
	}
];
var doors = [
	{
		tier: "Tier 0",
		name: "SMS / USSD / IVR",
		for: "Feature phones, price and status checks"
	},
	{
		tier: "Tier 1",
		name: "Offline PWA / Zalo",
		for: "Low-end phones, queue-sync, compressed media"
	},
	{
		tier: "Tier 2",
		name: "Full social web",
		for: "Spaces, video, cupping, the market"
	},
	{
		tier: "Agent",
		name: "Field application",
		for: "Capture, verification, commissions"
	}
];
function EcosystemPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuctumSeal, { size: 80 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Ecosystem" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl sm:text-5xl",
						children: "One ledger. Four doors."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-slate",
						children: "Auctum Ledger is the event-driven spine. LotSpace is the social face. Karmic Circle is the origin operator. Nothing in the network is allowed to disagree with the record."
					})
				] })]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: doors.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					className: "sm:px-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "meta",
							children: d.tier
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl",
							children: d.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-slate",
							children: d.for
						})
					]
				}, d.tier))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Bounded contexts" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-3xl",
					children: "The map"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-px bg-hair sm:grid-cols-2",
					children: contexts.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-paper p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-xl",
								children: c.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-slate",
								children: c.owns
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-mono text-[11px] tracking-[0.12em] text-stamp uppercase",
								children: c.event
							})
						]
					}, c.name))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				padded: false,
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/images/jute-warehouse.jpg",
						alt: "",
						className: "aspect-[3/2] h-full w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Reference flow" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								className: "mt-4 space-y-2 text-sm",
								children: [
									"Farmer → agent capture",
									"Space verification → LotCreated",
									"Feed projection → roaster discovers",
									"SampleRequested → fulfillment",
									"Offer → PriceLocked → Order",
									"Billing → Payment → Autopsy updated",
									"Consumer scans → Follow / Tip",
									"Connection event → future trade"
								].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "grid grid-cols-[2rem_1fr] gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-slate",
										children: String(i + 1).padStart(2, "0")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: step })]
								}, step))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/market",
								className: buttonClass("stamp", "mt-8"),
								children: "Enter the market"
							})
						]
					})]
				})
			})
		]
	});
}
//#endregion
export { EcosystemPage as component };
