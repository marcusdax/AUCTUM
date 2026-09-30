import { S as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as accountById, r as Route$1, s as useLedger } from "./router-DCZEKINX.mjs";
import { a as Sheet, i as FieldRow, r as Eyebrow, t as Button } from "./ui-iD4xH4Yo.mjs";
import { a as roleLabel, i as formatKg, n as formatCents, o as stateLabel } from "./format-CABBNuv4.mjs";
import { t as TrustBadge } from "./trust-badge-C0yL7r1E.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market._lotId-CIXjPWBY.js
var import_jsx_runtime = require_jsx_runtime();
function EconomicAutopsy({ lot }) {
	const rows = [
		{
			label: "Farmgate",
			cents: lot.farmgateCents,
			hint: "Paid to the producer"
		},
		{
			label: "Logistics",
			cents: lot.logisticsCents,
			hint: "Mill, bagging, inland"
		},
		{
			label: "Premium",
			cents: lot.premiumCents,
			hint: "Quality / relationship"
		},
		{
			label: "FOB",
			cents: lot.fobCents,
			hint: "The offer on the sheet"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "kicker",
			children: "Economic autopsy"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-2 font-display text-2xl",
			children: "Price is what it sells for."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-prose text-sm text-slate",
			children: "Value is everything that made it possible. This waterfall is the public proof layer — the same numbers live on the ledger."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-3",
			children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm",
						children: row.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-sm tabular",
						children: [formatCents(row.cents), "/lb"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1.5 h-1.5 bg-hair",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: row.label === "FOB" ? "h-full bg-stamp" : "h-full bg-ink",
						style: { width: `${Math.round(row.cents / lot.fobCents * 100)}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-slate",
					children: row.hint
				})
			] }, row.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Cup",
					value: `${lot.cupScore.toFixed(2)} · unrounded`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Moisture",
					value: `${lot.moisturePct}%`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Screen",
					value: lot.screen
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Harvest",
					value: lot.harvest
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Elevation",
					value: `${lot.origin.elevationM} m`
				})
			]
		})
	] });
}
function LotPage() {
	const { lotId } = Route$1.useParams();
	const lots = useLedger((s) => s.lots);
	const accounts = useLedger((s) => s.accounts);
	const stories = useLedger((s) => s.stories);
	const requestSample = useLedger((s) => s.requestSample);
	const expressInterest = useLedger((s) => s.expressInterest);
	const lockPrice = useLedger((s) => s.lockPrice);
	const follow = useLedger((s) => s.follow);
	const following = useLedger((s) => s.following);
	const lot = lots.find((l) => l.id === lotId);
	if (!lot) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl",
		children: "Lot not on the sheet"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/market",
		className: "mt-4 inline-block meta hover:text-ink",
		children: "Return to market"
	})] });
	const producer = accountById(accounts, lot.producerId);
	const exporter = accountById(accounts, lot.exporterId);
	const related = stories.filter((s) => s.lotId === lot.id);
	const followed = producer ? following.includes(producer.id) : false;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: lot.code }),
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
									children: stateLabel(lot.availability)
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
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "meta",
									children: "FOB"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-4xl tabular",
									children: [formatCents(lot.pricePerLbCents), "/lb"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-slate",
									children: [
										formatKg(lot.weightKg),
										" · ",
										lot.bags,
										" bags · cup ",
										lot.cupScore.toFixed(2)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											tone: "stamp",
											disabled: !lot.sampleReady || lot.availability === "locked",
											onClick: () => requestSample(lot.id),
											children: "Request sample"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											tone: "ghost",
											onClick: () => expressInterest(lot.id),
											children: "Open offer"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											tone: "ghost",
											disabled: lot.availability === "locked",
											onClick: () => lockPrice(lot.id),
											children: "Price lock"
										})
									]
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EconomicAutopsy, { lot }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "People behind the lot" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: "Identity before the claim"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-4",
						children: [producer ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/crm/$accountId",
							params: { accountId: producer.id },
							className: "block border-t border-hair pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "meta",
									children: roleLabel(producer.role)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl",
									children: producer.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-slate",
									children: producer.tagline
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustBadge, {
										trust: producer.trust,
										size: "sm"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										tone: "quiet",
										className: "min-h-9 px-2",
										onClick: (e) => {
											e.preventDefault();
											follow(producer.id);
										},
										children: followed ? "Following" : "Follow"
									})]
								})
							]
						}) : null, exporter ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/spaces/$spaceId",
							params: { spaceId: exporter.id.replace("acc-", "") },
							className: "block border-t border-hair pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "meta",
									children: roleLabel(exporter.role)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl",
									children: exporter.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-slate",
									children: exporter.tagline
								})
							]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Process",
								value: lot.process
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Varietal",
								value: lot.varietal
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Farmgate",
								value: `${formatCents(lot.farmgateCents)}/lb`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Followers",
								value: lot.followers
							})
						]
					})
				] })]
			}),
			related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Stories" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				children: related.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl",
					children: st.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-slate",
					children: st.lede
				})] }, st.id))
			})] }) : null
		]
	});
}
//#endregion
export { LotPage as component };
