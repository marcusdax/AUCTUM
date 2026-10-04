import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as useLedger, p as useExchange } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, i as FieldRow, o as Stamp, r as Eyebrow, t as Button } from "./ui-DI4E79SW.mjs";
import { r as formatDate } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partners-BdtMabSx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PartnersPage() {
	const sellers = useExchange((s) => s.sellers);
	const listings = useExchange((s) => s.listings);
	const registerPartner = useExchange((s) => s.registerPartner);
	const verifySeller = useExchange((s) => s.verifySeller);
	const lots = useLedger((s) => s.lots);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [webhookUrl, setWebhookUrl] = (0, import_react.useState)("");
	const [storeUrl, setStoreUrl] = (0, import_react.useState)("");
	const [model, setModel] = (0, import_react.useState)("affiliate");
	const [lotText, setLotText] = (0, import_react.useState)("");
	const [createdId, setCreatedId] = (0, import_react.useState)(null);
	const [err, setErr] = (0, import_react.useState)(null);
	function submit(e) {
		e.preventDefault();
		setErr(null);
		if (name.trim().length < 2 || !email.includes("@")) {
			setErr("Name and a working email are the partnership minimum.");
			return;
		}
		const codes = lotText.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean);
		const lotIds = lots.filter((l) => codes.some((c) => c === l.code || c === l.id)).map((l) => l.id);
		const id = registerPartner({
			name,
			email,
			webhookUrl,
			storeUrl,
			integrationModel: model,
			lotIds
		});
		setCreatedId(id);
	}
	const created = sellers.find((s) => s.id === createdId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Partners" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 max-w-[16ch] font-display text-4xl sm:text-5xl",
					children: "You keep the customer. We keep the proof."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-slate",
					children: "Affiliate-first. No fees. Buyers discover named lots on Auctum Exchange. You are notified in under a second. Fulfillment never leaves your store."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stamp, {
				className: "-rotate-3",
				children: "No extraction"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/partners/desk",
			className: `mt-6 ${buttonClass("ghost")}`,
			children: "Seller desk"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1.1fr_0.9fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Join the Exchange" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl",
					children: "Partnership intake"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 space-y-4",
					onSubmit: submit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Business name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (e) => setName(e.target.value),
								className: inputClass,
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Contact email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: inputClass,
								required: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Store URL",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: storeUrl,
								onChange: (e) => setStoreUrl(e.target.value),
								placeholder: "https://yourstore.com/coffee",
								className: inputClass
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Webhook URL · optional",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: webhookUrl,
								onChange: (e) => setWebhookUrl(e.target.value),
								placeholder: "https://hooks.yours.com/auctum",
								className: inputClass
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "meta",
							children: "Integration model"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex gap-3",
							children: ["affiliate", "dropship"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-11 items-center gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "radio",
									name: "model",
									checked: model === m,
									onChange: () => setModel(m)
								}), m]
							}, m))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Lot codes to list · one per line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: lotText,
								onChange: (e) => setLotText(e.target.value),
								rows: 4,
								placeholder: "AL-VN-26-084\nAL-CO-26-018",
								className: inputClass
							})
						}),
						err ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-stamp",
							children: err
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							tone: "stamp",
							children: "Submit partnership"
						})
					]
				}),
				created ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 border-t border-hair pt-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "meta",
							children: "Recorded"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-2xl",
							children: created.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "API key",
								value: created.apiKey
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
								label: "Status",
								value: created.verifiedAt ? "Verified" : "Pending verification"
							})]
						}),
						!created.verifiedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							tone: "ghost",
							className: "mt-4",
							onClick: () => verifySeller(created.id),
							children: "Verify origin & go live"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-sage",
							children: "Listings are live with the verified-origin badge."
						})
					]
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Anchor set" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: "Sellers already on the sheet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-5 divide-y divide-hair",
						children: sellers.map((s) => {
							const n = listings.filter((l) => l.sellerId === s.id && l.live).length;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-display text-xl",
										children: s.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-slate",
										children: s.pitch
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 meta",
										children: [
											s.verifiedAt ? `Verified ${formatDate(s.verifiedAt)}` : "Pending",
											" · ",
											n,
											" live ·",
											" ",
											s.webhookUrl ? "webhook" : "email only"
										]
									})
								]
							}, s.id);
						})
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "The agreement, in one breath" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed",
					children: "Auctum never scrapes a store. Partnership is signed, lots are verified against the ledger, and the AUCTUM VERIFIED ORIGIN badge is earned — not bought. Affiliate clicks are intent. Drop-ship, when it comes, is a later door."
				})] })]
			})]
		})]
	});
}
var inputClass = "mt-2 w-full border border-hair-strong bg-sheet px-3 py-3 text-sm text-ink placeholder:text-slate";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "meta",
			children: label
		}), children]
	});
}
//#endregion
export { PartnersPage as component };
