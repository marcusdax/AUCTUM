import { C as require_jsx_runtime, b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as CREDENTIAL_META, E as useEducation, P as daysUntil, j as calibrationPoints, r as Route$1 } from "./router-DSNp4tp8.mjs";
import { a as Sheet, c as buttonClass, i as FieldRow, r as Eyebrow } from "./ui-DI4E79SW.mjs";
import { r as formatDate } from "./format-CABBNuv4.mjs";
import { t as DriftChart } from "./drift-chart-D7YxrQf3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/education_.credential._type-DBIZ1_3a.js
var import_jsx_runtime = require_jsx_runtime();
function CredentialPage() {
	const { type } = Route$1.useParams();
	const cred = useEducation((s) => s.credentials).find((c) => c.type === type);
	const meta = CREDENTIAL_META[type];
	if (!cred || !meta) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
		className: "font-display text-3xl",
		children: "No such credential"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/education",
		className: "mt-4 inline-block meta hover:text-ink",
		children: "Return to readiness"
	})] });
	const days = daysUntil(cred.expiresAt);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Credential record" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: meta.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-slate",
				children: meta.gates
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
						label: "State",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "uppercase",
							children: cred.state
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
						label: "Issued",
						value: formatDate(cred.issuedAt)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
						label: "Expires",
						value: `${formatDate(cred.expiresAt)} · ${days >= 0 ? `${days} days remaining` : `lapsed ${Math.abs(days)} days`}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
						label: "Issued by",
						value: cred.issuedBy
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
						label: "Content",
						value: cred.contentVersion
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
						label: "Source",
						value: cred.sourceRef
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
						label: "Audience",
						value: meta.audience
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldRow, {
						label: "Authority",
						value: cred.authorityScope.join(" · ")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/education",
				className: buttonClass("ghost", "mt-6"),
				children: "Back to readiness"
			})
		] }), cred.type === "CUPPER_TIER_2" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriftChart, { points: calibrationPoints }) }) : null]
	});
}
//#endregion
export { CredentialPage as component };
