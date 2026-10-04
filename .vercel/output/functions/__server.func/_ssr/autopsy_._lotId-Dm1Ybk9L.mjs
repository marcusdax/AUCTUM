import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as formatLabel, g as useLedger, h as lotById, m as accountById, p as useExchange, u as Route$10, w as sellerById } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, i as FieldRow, o as Stamp, r as Eyebrow } from "./ui-DI4E79SW.mjs";
import { a as roleLabel, i as formatKg, n as formatCents } from "./format-CABBNuv4.mjs";
import { t as EconomicAutopsy } from "./autopsy-T70ACsRy.mjs";
import { t as LotSeal } from "./lot-seal-yXjyAuxj.mjs";
import { t as TrustBadge } from "./trust-badge-C0yL7r1E.mjs";
import { t as TruePriceReceipt } from "./true-price-BhkkE8jE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/autopsy_._lotId-Dm1Ybk9L.js
var import_jsx_runtime = require_jsx_runtime();
function AutopsyPage() {
	const { lotId } = Route$10.useParams();
	const lots = useLedger((s) => s.lots);
	const accounts = useLedger((s) => s.accounts);
	const documents = useLedger((s) => s.documents);
	const listings = useExchange((s) => s.listings);
	const sellers = useExchange((s) => s.sellers);
	const lot = lotById(lots, lotId);
	if (!lot) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl",
		children: "No autopsy for this lot"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/exchange",
		className: "mt-4 inline-block meta hover:text-ink",
		children: "Exchange"
	})] });
	const producer = accountById(accounts, lot.producerId);
	const exporter = accountById(accounts, lot.exporterId);
	const live = listings.filter((l) => l.lotId === lot.id && l.live);
	const primary = live[0];
	const docs = documents.filter((d) => d.lotId === lot.id && d.status === "accepted");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eyebrow, { children: ["Public autopsy · ", lot.code] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl sm:text-5xl",
						children: lot.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 max-w-xl text-slate",
						children: [
							lot.origin.farm,
							", ",
							lot.origin.region,
							". ",
							lot.origin.elevationM,
							" m. The file is the lot."
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, {
						className: "-rotate-6",
						children: "Verified origin"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LotSeal, {
						seed: lot.code,
						label: `auctum.coffee/autopsy/${lot.id}`
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-3",
				children: [producer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, { trust: producer.trust }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "border border-ink px-2 py-1 font-mono text-[10px] tracking-[0.16em] uppercase",
					children: [
						"Cup ",
						lot.cupScore.toFixed(2),
						" unrounded"
					]
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					padded: false,
					className: "overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: lot.image,
						alt: "",
						className: "aspect-[3/2] w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6 sm:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: lot.notes
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-slate",
								children: lot.flavor.join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Producer",
										value: producer?.name ?? "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
										label: "Operator",
										value: exporter?.name ?? "—"
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
										label: "On sheet",
										value: formatKg(lot.weightKg)
									})
								]
							}),
							producer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/crm/$accountId",
								params: { accountId: producer.id },
								className: "mt-4 inline-block meta hover:text-ink",
								children: [roleLabel(producer.role), " file"]
							}) : null
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: primary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TruePriceReceipt, {
					lot,
					listing: primary
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EconomicAutopsy, { lot }) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Where to buy" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl",
					children: "Exchange + the seller's store"
				}),
				live.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-slate",
					children: "This lot is on the trade sheet, not yet on the Exchange."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-5 divide-y divide-hair",
					children: live.map((l) => {
						const seller = sellerById(sellers, l.sellerId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-wrap items-center justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl",
								children: seller?.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-slate",
								children: [
									formatLabel(l.format),
									" · ",
									l.bagGrams,
									" g · ",
									formatCents(l.priceCents)
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/exchange/$listingId",
								params: { listingId: l.id },
								className: buttonClass("ghost"),
								children: "Buy via Exchange"
							})]
						}, l.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/market/$lotId",
						params: { lotId: lot.id },
						className: buttonClass("ghost"),
						children: "Trade sheet"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-flex min-h-11 items-center px-4 text-sm text-slate",
						children: "Tip the farmer — reserved. Direct payment is a later door."
					})]
				})
			] }),
			docs.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Retained file" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: docs.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "text-sm",
					children: [d.title, " · accepted"]
				}, d.id))
			})] }) : null
		]
	});
}
//#endregion
export { AutopsyPage as component };
