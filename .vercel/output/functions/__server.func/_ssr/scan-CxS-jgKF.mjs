import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as ScanLine, r as ShieldCheck, t as X } from "../_libs/lucide-react.mjs";
import { B as cn, E as useEducation, g as useLedger, k as blockedActions } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, i as FieldRow, r as Eyebrow, t as Button } from "./ui-DI4E79SW.mjs";
import { r as formatDate } from "./format-CABBNuv4.mjs";
import { t as BlockedActionPanel } from "./blocked-panel-B960BgA_.mjs";
import { t as InlineLesson } from "./inline-lesson-BC0DjaEt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scan-CxS-jgKF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var kinds = [
	{
		id: "qc",
		label: "QC / cupping",
		title: "Cupping sheet · new intake",
		fields: {
			lot: "AL-VN-26-110",
			score: "84.90",
			moisture: "10.9%",
			method: "SCA / Q"
		}
	},
	{
		id: "contract",
		label: "Contract",
		title: "Offer letter · Atlas",
		fields: {
			buyer: "Atlas Roastworks",
			lots: "AL-VN-26-084",
			lock: "4.12 USD/lb",
			volume: "2,520 kg"
		}
	},
	{
		id: "receipt",
		label: "Farmgate receipt",
		title: "VietQR receipt · Mai",
		fields: {
			payee: "Trần Thị Mai",
			amount: "VND 48,200,000",
			rail: "PayOS",
			basis: "farmgate"
		}
	},
	{
		id: "eudr",
		label: "EUDR packet",
		title: "Geolocation packet",
		fields: {
			polygons: "member plots",
			deforestation: "clear",
			harvest: "2025/26"
		}
	},
	{
		id: "phytosanitary",
		label: "Phytosanitary",
		title: "Phyto certificate",
		fields: {
			authority: "PPD Vietnam",
			lots: "AL-VN-26-091",
			status: "issued"
		}
	},
	{
		id: "identity",
		label: "Identity",
		title: "Farm registration",
		fields: {
			legal: "New garden",
			district: "Ea H'leo",
			consent: "recorded"
		}
	}
];
function ScanPage() {
	const documents = useLedger((s) => s.documents);
	const accounts = useLedger((s) => s.accounts);
	const ingestScan = useLedger((s) => s.ingestScan);
	const setDocStatus = useLedger((s) => s.setDocStatus);
	const canAccept = useEducation((s) => s.hasAuthority("DOC_OPERATOR"));
	const credentials = useEducation((s) => s.credentials);
	const beginRemedy = useEducation((s) => s.beginRemedy);
	const inline = useEducation((s) => s.inlineLessonId);
	const closeInline = useEducation((s) => s.closeInline);
	const [kind, setKind] = (0, import_react.useState)("qc");
	const [stage, setStage] = (0, import_react.useState)("idle");
	const [activeId, setActiveId] = (0, import_react.useState)(null);
	const [showBlock, setShowBlock] = (0, import_react.useState)(false);
	const spec = kinds.find((k) => k.id === kind);
	const active = documents.find((d) => d.id === activeId) ?? documents.find((d) => d.status === "review");
	const docBlock = blockedActions(credentials).find((b) => b.credentialType === "DOC_OPERATOR");
	function runScan() {
		setStage("scanning");
		window.setTimeout(() => {
			const id = ingestScan({
				kind,
				title: spec.title,
				accountId: kind === "receipt" || kind === "identity" ? "acc-mai" : kind === "qc" ? "acc-saigon" : "acc-karmic",
				lotId: kind === "identity" ? void 0 : "lot-110",
				fields: spec.fields,
				confidence: .78 + Math.random() * .18
			});
			setActiveId(id);
			setStage("review");
		}, 900);
	}
	function tryAccept(id) {
		if (!canAccept) {
			setShowBlock(true);
			return;
		}
		setDocStatus(id, "accepted");
		setStage("idle");
		setShowBlock(false);
	}
	const queue = (0, import_react.useMemo)(() => documents.filter((d) => d.status === "queued" || d.status === "extracted" || d.status === "review"), [documents]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "OCR desk" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl sm:text-5xl",
					children: "Paper becomes a ledger object"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xl text-slate",
					children: "Human in the loop. Extraction is a proposal. Accept writes the file — and requires an active DOC_OPERATOR credential. Rejection carries no Trust penalty for the uploader."
				})
			] }),
			showBlock && docBlock && !canAccept ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockedActionPanel, {
				block: docBlock,
				onBegin: (id) => {
					beginRemedy(id);
					setShowBlock(true);
				}
			}) : null,
			inline ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Before you can accept this document" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineLesson, {
					lessonId: inline,
					onDismiss: closeInline,
					onDone: () => {
						closeInline();
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/education/assess/$assessmentId",
					params: { assessmentId: "e-cal" },
					className: buttonClass("stamp", "mt-4"),
					children: "Continue to monthly calibration"
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[0.9fr_1.1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Capture" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-2xl",
						children: "What is on the glass"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setKind(k.id),
							className: cn("min-h-11 border px-3 font-mono text-[11px] tracking-[0.12em] uppercase", kind === k.id ? "border-ink bg-ink text-paper" : "border-hair-strong bg-transparent"),
							children: k.label
						}, k.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: runScan,
						disabled: stage === "scanning",
						className: "relative mt-6 flex min-h-56 w-full flex-col items-center justify-center overflow-hidden border border-dashed border-hair-strong bg-sheet",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/cupping-table.jpg",
							alt: "",
							className: "absolute inset-0 h-full w-full object-cover opacity-30"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex flex-col items-center gap-3 text-ink",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanLine, { size: 28 }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-xl",
									children: stage === "scanning" ? "Reading the sheet…" : "Place a document"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-slate",
									children: "Simulated Claude vision extraction"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-4 w-full",
						tone: "stamp",
						onClick: runScan,
						disabled: stage === "scanning",
						children: "Run extraction"
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Review" }), active && (stage === "review" || active.status === "review") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-baseline justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: active.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-sm tabular",
							children: [Math.round(active.confidence * 100), "%"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-slate",
						children: [
							accounts.find((a) => a.id === active.accountId)?.name,
							" · ",
							formatDate(active.capturedAt)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-5",
						children: Object.entries(active.fields).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
							label: k,
							value: v
						}, k))
					}),
					active.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-stamp",
						children: active.notes
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							tone: "stamp",
							onClick: () => tryAccept(active.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), " Accept onto ledger"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							tone: "ghost",
							onClick: () => {
								setDocStatus(active.id, "rejected");
								setStage("idle");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 }), " Reject"]
						})]
					}),
					!canAccept ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-stamp",
						children: "DOC_OPERATOR is lapsed. Accept is blocked until the renewal path is complete."
					}) : null
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-slate",
					children: "Extracted fields appear here beside the capture. Nothing writes until a human accepts."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Queue" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl",
					children: "Waiting on the desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-hair",
					children: queue.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex flex-wrap items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: d.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "meta mt-1",
							children: [
								d.kind,
								" · ",
								d.status,
								" · ",
								Math.round(d.confidence * 100),
								"%"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								tone: "quiet",
								className: "min-h-9",
								onClick: () => setActiveId(d.id),
								children: "Review"
							}), d.status !== "accepted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								tone: "ghost",
								className: "min-h-9",
								onClick: () => tryAccept(d.id),
								children: "Accept"
							}) : null]
						})]
					}, d.id))
				})
			] })
		]
	});
}
//#endregion
export { ScanPage as component };
