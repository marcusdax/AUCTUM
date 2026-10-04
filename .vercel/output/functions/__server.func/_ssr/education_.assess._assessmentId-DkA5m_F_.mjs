import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as calibrationDocs, B as cn, E as useEducation, L as scenarioC, V as POLICY, i as Route$2 } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, i as FieldRow, r as Eyebrow, t as Button } from "./ui-DI4E79SW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/education_.assess._assessmentId-DkA5m_F_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AssessPage() {
	const { assessmentId } = Route$2.useParams();
	if (assessmentId === "e-cal") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalibrationSet, {});
	if (assessmentId === "c-adj-2") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioAssess, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl",
		children: "Assessment not issued"
	}) });
}
function CalibrationSet() {
	const answers = useEducation((s) => s.calAnswers);
	const submitted = useEducation((s) => s.calSubmitted);
	const answerCal = useEducation((s) => s.answerCal);
	const submitCalibration = useEducation((s) => s.submitCalibration);
	const hasDoc = useEducation((s) => s.hasAuthority("DOC_OPERATOR"));
	const [result, setResult] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Track E · monthly calibration" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl",
					children: "The same twenty documents"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 max-w-xl text-slate",
					children: [
						"Inter-operator agreement is measured against a ",
						POLICY.operatorAgreementPct.min,
						"% target. This sitting uses three of the set. Recurring, not a one-time pass. Completing it renews DOC_OPERATOR."
					]
				})
			] }),
			calibrationDocs.map((doc, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "meta",
					children: [
						"Document ",
						i + 1,
						" of ",
						calibrationDocs.length,
						" · ",
						doc.field
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl",
					children: doc.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-slate",
					children: doc.imageHint
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 space-y-2",
					children: doc.options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: cn("flex min-h-11 cursor-pointer items-center gap-3 border px-3 text-sm", answers[doc.id] === opt ? "border-ink bg-sheet" : "border-hair"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: doc.id,
							className: "accent-ink",
							checked: answers[doc.id] === opt,
							onChange: () => answerCal(doc.id, opt)
						}), opt]
					}, opt))
				})
			] }, doc.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [result || submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: result?.passed ?? hasDoc ? "Passed" : "Below target"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 font-display text-3xl tabular",
					children: [(result?.agreementPct ?? (hasDoc ? 100 : 0)).toFixed(2), "%"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-slate",
					children: [
						"Target ",
						POLICY.operatorAgreementPct.min,
						"%. Decimal, not integer. Next calibration in 30 days."
					]
				}),
				hasDoc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-sage",
					children: "DOC_OPERATOR is active. You may accept onto the ledger."
				}) : null
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				tone: "stamp",
				disabled: calibrationDocs.some((d) => !answers[d.id]),
				onClick: () => setResult(submitCalibration()),
				children: "Submit calibration"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/scan",
				className: buttonClass("ghost", "mt-4"),
				children: "Return to the scan desk"
			})] })
		]
	});
}
function ScenarioAssess() {
	const submitScenario = useEducation((s) => s.submitScenario);
	const scenario = useEducation((s) => s.scenario);
	const [tier, setTier] = (0, import_react.useState)(scenario.tier);
	const [disposition, setDisposition] = (0, import_react.useState)(scenario.disposition);
	const [price, setPrice] = (0, import_react.useState)(scenario.price);
	const [passed, setPassed] = (0, import_react.useState)(scenario.passed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eyebrow, { children: ["Track C · ", scenarioC.title] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl",
					children: "Disposition is money"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 max-w-xl text-slate",
					children: [
						"Pass = correct disposition and adjusted price within $0.01. The floor already paid does not reverse. Re-pricing cannot exceed a ",
						POLICY.repricingCapPct.max,
						"% cap."
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Lot record" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Lot",
					value: scenarioC.lot
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Origin",
					value: scenarioC.origin
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Producer",
					value: scenarioC.producer
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Initial cup",
					value: scenarioC.initialCup.toFixed(2)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Re-cup",
					value: scenarioC.recup.toFixed(2)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
					label: "Evidence",
					value: scenarioC.evidence
				})
			] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "block text-sm",
					children: ["Tier", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "mt-2 block min-h-11 w-full border border-hair-strong bg-sheet px-3",
						value: tier,
						onChange: (e) => setTier(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "1",
								children: "Tier 1 · minor variance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "2",
								children: "Tier 2 · quality-identity risk"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "3",
								children: "Tier 3 · chain compromise"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block text-sm",
					children: ["Disposition", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "mt-2 block min-h-11 w-full border border-hair-strong bg-sheet px-3",
						value: disposition,
						onChange: (e) => setDisposition(e.target.value),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Release" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Downgrade" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Reject & Claim" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Re-verify & Partition" })
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block text-sm",
					children: ["Adjusted FOB (USD/lb)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-2 block min-h-11 w-full border border-hair-strong bg-sheet px-3 tabular",
						inputMode: "decimal",
						value: price,
						onChange: (e) => setPrice(e.target.value),
						placeholder: "3.71"
					})]
				}),
				scenario.submitted || passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `mt-4 text-sm ${passed ? "text-sage" : "text-stamp"}`,
					children: passed ? "3/3. EXCEPTION_ADJUDICATOR content version updated." : "Not yet. Disposition and price are graded against the key."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5",
					tone: "stamp",
					disabled: !tier || !disposition || !price,
					onClick: () => setPassed(submitScenario(tier, disposition, Number(price))),
					children: "Submit adjudication"
				})
			] })
		]
	});
}
//#endregion
export { AssessPage as component };
