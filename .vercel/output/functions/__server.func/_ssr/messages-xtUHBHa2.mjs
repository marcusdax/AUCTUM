import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as cn, g as useLedger, m as accountById } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, r as Eyebrow, t as Button } from "./ui-DI4E79SW.mjs";
import { r as formatDate } from "./format-CABBNuv4.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/messages-xtUHBHa2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MessagesPage() {
	const threads = useLedger((s) => s.threads);
	const messages = useLedger((s) => s.messages);
	const accounts = useLedger((s) => s.accounts);
	const sendMessage = useLedger((s) => s.sendMessage);
	const [activeId, setActiveId] = (0, import_react.useState)(threads[0]?.id ?? "");
	const [draft, setDraft] = (0, import_react.useState)("");
	const active = threads.find((t) => t.id === activeId);
	const trail = messages.filter((m) => m.threadId === activeId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Messages · Deals" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "A thread that can become a contract"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-slate",
				children: "Follow, intro, sample, offer, lock, tip. Free-form text never becomes the authoritative price."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[0.9fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				padded: false,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: threads.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setActiveId(t.id),
					className: cn("w-full border-b border-hair px-5 py-4 text-left last:border-0", t.id === activeId ? "bg-sheet" : "hover:bg-sheet/60"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "meta",
							children: [
								t.deal,
								" · ",
								formatDate(t.updatedAt)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-lg",
							children: t.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-sm text-slate",
							children: t.preview
						})
					]
				}) }, t.id)) })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: active.deal }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl",
							children: active.subject
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-slate",
							children: active.parties.map((id) => accountById(accounts, id)?.name).filter(Boolean).join(" · ")
						})
					] }), active.lotId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/market/$lotId",
						params: { lotId: active.lotId },
						className: buttonClass("ghost"),
						children: "Open lot"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 space-y-4",
					children: trail.map((m) => {
						const who = accountById(accounts, m.fromId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "border-t border-hair pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "meta",
								children: [
									who?.name,
									" · ",
									formatDate(m.at)
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: m.body
							})]
						}, m.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-6 flex flex-col gap-3 sm:flex-row",
					onSubmit: (e) => {
						e.preventDefault();
						const text = draft.trim();
						if (!text) return;
						sendMessage(active.id, text);
						setDraft("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						placeholder: "Reply as Karmic Circle desk",
						className: "min-h-11 flex-1 border border-hair-strong bg-sheet px-3 text-sm text-ink placeholder:text-slate"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						children: "Send"
					})]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate",
				children: "Select a thread."
			}) })]
		})]
	});
}
//#endregion
export { MessagesPage as component };
