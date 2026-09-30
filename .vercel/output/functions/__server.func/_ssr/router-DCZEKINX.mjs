import { i as __toESM } from "../_runtime.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { J as require_react, S as require_jsx_runtime, _ as lazyRouteComponent, b as Link, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, x as useRouter, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Menu, n as TriangleAlert, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-C_uf36nf.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DCZEKINX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var TRUST_WEIGHTS = {
	documentVerification: .35,
	transactionIntegrity: .25,
	qcConsistency: .15,
	relationshipHistory: .15,
	agentAttestation: .1
};
var TRUST_LABELS = {
	documentVerification: "Document verification",
	transactionIntegrity: "Transaction integrity",
	qcConsistency: "QC consistency",
	relationshipHistory: "Relationship history",
	agentAttestation: "Agent attestation"
};
function bandFromScore(score) {
	if (score >= 90) return "sealed";
	if (score >= 75) return "verified";
	if (score >= 60) return "provisional";
	if (score >= 40) return "watch";
	return "restricted";
}
function computeTrust(components, at = (/* @__PURE__ */ new Date()).toISOString()) {
	const score = Math.round(components.documentVerification * TRUST_WEIGHTS.documentVerification + components.transactionIntegrity * TRUST_WEIGHTS.transactionIntegrity + components.qcConsistency * TRUST_WEIGHTS.qcConsistency + components.relationshipHistory * TRUST_WEIGHTS.relationshipHistory + components.agentAttestation * TRUST_WEIGHTS.agentAttestation);
	return {
		score,
		band: bandFromScore(score),
		components,
		updatedAt: at
	};
}
function bumpComponent(components, key, delta) {
	const next = Math.max(0, Math.min(100, components[key] + delta));
	return {
		...components,
		[key]: next
	};
}
var AGENT_ID = "acc-duc";
var accounts = [
	{
		id: "acc-karmic",
		name: "Karmic Circle",
		role: "exporter",
		locale: "Buôn Ma Thuột",
		district: "Đắk Lắk",
		country: "Vietnam",
		since: "2018-03-12",
		tagline: "Flagship verified origin operator. One ledger from farmgate to FOB.",
		image: "/images/vn-highlands.jpg",
		trust: computeTrust({
			documentVerification: 96,
			transactionIntegrity: 94,
			qcConsistency: 92,
			relationshipHistory: 93,
			agentAttestation: 90
		}, "2026-09-18T08:00:00Z"),
		lifecycle: "retained",
		churnRisk: 8,
		outstandingCents: 0,
		volumeKgYtd: 184200,
		relationships: [
			"acc-mai",
			"acc-coop",
			"acc-duc",
			"acc-atlas",
			"acc-saigon"
		],
		language: "vi"
	},
	{
		id: "acc-mai",
		name: "Trần Thị Mai",
		role: "farmer",
		locale: "Cư M'gar",
		district: "Đắk Lắk",
		country: "Vietnam",
		since: "2024-11-02",
		tagline: "Smallholder. Honey process Typica on 1.8 ha of basaltic soil.",
		image: "/images/cherries.jpg",
		trust: computeTrust({
			documentVerification: 84,
			transactionIntegrity: 81,
			qcConsistency: 86,
			relationshipHistory: 74,
			agentAttestation: 88
		}, "2026-09-22T04:10:00Z"),
		lifecycle: "contracted",
		churnRisk: 18,
		outstandingCents: 24e3,
		volumeKgYtd: 1860,
		relationships: [
			"acc-karmic",
			"acc-duc",
			"acc-coop"
		],
		phone: "+84 90 441 2291",
		language: "vi"
	},
	{
		id: "acc-coop",
		name: "Buôn Ma Thuột Cooperative",
		role: "coop",
		locale: "Buôn Ma Thuột",
		district: "Đắk Lắk",
		country: "Vietnam",
		since: "2016-06-01",
		tagline: "214 member farms. Collective Space, shared mill, EUDR file.",
		image: "/images/mill.jpg",
		trust: computeTrust({
			documentVerification: 90,
			transactionIntegrity: 88,
			qcConsistency: 87,
			relationshipHistory: 91,
			agentAttestation: 82
		}, "2026-09-12T11:00:00Z"),
		lifecycle: "retained",
		churnRisk: 11,
		outstandingCents: 0,
		volumeKgYtd: 96200,
		relationships: [
			"acc-karmic",
			"acc-mai",
			"acc-duc"
		],
		language: "vi"
	},
	{
		id: "acc-duc",
		name: "Nguyễn Văn Đức",
		role: "agent",
		locale: "Cư M'gar desk",
		district: "Đắk Lắk",
		country: "Vietnam",
		since: "2023-02-14",
		tagline: "Field agent. Territory of 63 farms. Capture, verify, commission.",
		image: "/images/parchment-beds.jpg",
		trust: computeTrust({
			documentVerification: 80,
			transactionIntegrity: 86,
			qcConsistency: 78,
			relationshipHistory: 72,
			agentAttestation: 70
		}, "2026-09-20T09:40:00Z"),
		lifecycle: "retained",
		churnRisk: 22,
		outstandingCents: 185e3,
		volumeKgYtd: 12400,
		relationships: [
			"acc-karmic",
			"acc-mai",
			"acc-coop"
		],
		language: "vi"
	},
	{
		id: "acc-atlas",
		name: "Atlas Roastworks",
		role: "roaster",
		locale: "Portland",
		district: "Oregon",
		country: "United States",
		since: "2021-09-08",
		tagline: "Menu provenance. Samples first, contracts on cup and price-lock.",
		image: "/images/cupping-table.jpg",
		trust: computeTrust({
			documentVerification: 93,
			transactionIntegrity: 95,
			qcConsistency: 88,
			relationshipHistory: 90,
			agentAttestation: 76
		}, "2026-09-16T17:20:00Z"),
		lifecycle: "sampling",
		churnRisk: 14,
		outstandingCents: 0,
		volumeKgYtd: 6400,
		relationships: ["acc-karmic", "acc-saigon"],
		language: "en"
	},
	{
		id: "acc-huila",
		name: "Casa Huila",
		role: "coop",
		locale: "Pitalito",
		district: "Huila",
		country: "Colombia",
		since: "2015-01-20",
		tagline: "Pink Bourbon and Caturra. Tile patio, family mill, sealed file.",
		image: "/images/colombia-patio.jpg",
		trust: computeTrust({
			documentVerification: 88,
			transactionIntegrity: 84,
			qcConsistency: 90,
			relationshipHistory: 81,
			agentAttestation: 77
		}, "2026-08-30T12:00:00Z"),
		lifecycle: "qualified",
		churnRisk: 27,
		outstandingCents: 0,
		volumeKgYtd: 22100,
		relationships: ["acc-atlas", "acc-karmic"],
		language: "es"
	},
	{
		id: "acc-yirga",
		name: "Yirga Forest Collective",
		role: "coop",
		locale: "Kochere",
		district: "Gedeo",
		country: "Ethiopia",
		since: "2019-11-11",
		tagline: "Garden lots under indigenous shade. Washed Kochere, station file open.",
		image: "/images/ethiopia-forest.jpg",
		trust: computeTrust({
			documentVerification: 68,
			transactionIntegrity: 74,
			qcConsistency: 80,
			relationshipHistory: 66,
			agentAttestation: 62
		}, "2026-09-04T06:00:00Z"),
		lifecycle: "prospect",
		churnRisk: 41,
		outstandingCents: 0,
		volumeKgYtd: 8400,
		relationships: ["acc-atlas"],
		language: "am"
	},
	{
		id: "acc-nyeri",
		name: "Nyeri Highlands FCS",
		role: "coop",
		locale: "Othaya",
		district: "Nyeri",
		country: "Kenya",
		since: "2012-04-04",
		tagline: "AA and AB separations. Factory cup, sealed QC, Brave Few buyers.",
		image: "/images/jute-warehouse.jpg",
		trust: computeTrust({
			documentVerification: 95,
			transactionIntegrity: 92,
			qcConsistency: 96,
			relationshipHistory: 89,
			agentAttestation: 84
		}, "2026-09-09T10:00:00Z"),
		lifecycle: "retained",
		churnRisk: 6,
		outstandingCents: 0,
		volumeKgYtd: 31200,
		relationships: ["acc-atlas", "acc-karmic"],
		language: "en"
	},
	{
		id: "acc-saigon",
		name: "Saigon Cup Lab",
		role: "lab",
		locale: "Thủ Đức",
		district: "Hồ Chí Minh",
		country: "Vietnam",
		since: "2020-05-19",
		tagline: "Q-grader desk. Unrounded scores. Blind table for Karmic Circle lots.",
		image: "/images/cupping-table.jpg",
		trust: computeTrust({
			documentVerification: 97,
			transactionIntegrity: 91,
			qcConsistency: 98,
			relationshipHistory: 94,
			agentAttestation: 88
		}, "2026-09-21T02:00:00Z"),
		lifecycle: "retained",
		churnRisk: 4,
		outstandingCents: 0,
		volumeKgYtd: 0,
		relationships: [
			"acc-karmic",
			"acc-atlas",
			"acc-coop"
		],
		language: "vi"
	},
	{
		id: "acc-mekong",
		name: "Mekong Trade Desk",
		role: "importer",
		locale: "Rotterdam",
		district: "South Holland",
		country: "Netherlands",
		since: "2017-08-22",
		tagline: "EUDR packet intake. VietQR settlement mirrored into the ledger.",
		image: "/images/jute-warehouse.jpg",
		trust: computeTrust({
			documentVerification: 86,
			transactionIntegrity: 90,
			qcConsistency: 79,
			relationshipHistory: 83,
			agentAttestation: 71
		}, "2026-09-11T15:00:00Z"),
		lifecycle: "contracted",
		churnRisk: 19,
		outstandingCents: 412e3,
		volumeKgYtd: 54e3,
		relationships: ["acc-karmic", "acc-coop"],
		language: "en"
	}
];
var lots = [
	{
		id: "lot-084",
		code: "AL-VN-26-084",
		title: "Cư M'gar Honey Typica",
		producerId: "acc-mai",
		exporterId: "acc-karmic",
		origin: {
			country: "Vietnam",
			region: "Đắk Lắk · Cư M'gar",
			farm: "Mai Garden",
			elevationM: 740
		},
		process: "Honey",
		varietal: "Typica",
		harvest: "2025/26",
		cupScore: 86.42,
		moisturePct: 10.8,
		screen: "16+",
		bags: 42,
		weightKg: 2520,
		farmgateCents: 318,
		fobCents: 412,
		pricePerLbCents: 412,
		logisticsCents: 54,
		premiumCents: 40,
		availability: "available",
		image: "/images/vn-highlands.jpg",
		notes: "Stone fruit, cane sugar, quiet cacao. Farmgate receipt on ledger.",
		flavor: [
			"stone fruit",
			"cane sugar",
			"cacao"
		],
		followers: 128,
		sampleReady: true
	},
	{
		id: "lot-091",
		code: "AL-VN-26-091",
		title: "Lâm Đồng Washed Caturra",
		producerId: "acc-coop",
		exporterId: "acc-karmic",
		origin: {
			country: "Vietnam",
			region: "Lâm Đồng · Lạc Dương",
			farm: "Cooperative mill lot B",
			elevationM: 1280
		},
		process: "Washed",
		varietal: "Caturra",
		harvest: "2025/26",
		cupScore: 85.17,
		moisturePct: 10.4,
		screen: "15+",
		bags: 120,
		weightKg: 7200,
		farmgateCents: 274,
		fobCents: 356,
		pricePerLbCents: 356,
		logisticsCents: 48,
		premiumCents: 34,
		availability: "sample",
		image: "/images/parchment-beds.jpg",
		notes: "Jasmine, green apple, long finish. Sample with Atlas Roastworks.",
		flavor: [
			"jasmine",
			"green apple",
			"honey"
		],
		followers: 86,
		sampleReady: true
	},
	{
		id: "lot-102",
		code: "AL-VN-26-102",
		title: "Gia Lai Natural Robusta",
		producerId: "acc-coop",
		exporterId: "acc-karmic",
		origin: {
			country: "Vietnam",
			region: "Gia Lai · Ia Grai",
			farm: "Member block 11",
			elevationM: 620
		},
		process: "Natural",
		varietal: "Robusta",
		harvest: "2025/26",
		cupScore: 83.08,
		moisturePct: 11.1,
		screen: "18",
		bags: 200,
		weightKg: 12e3,
		farmgateCents: 168,
		fobCents: 214,
		pricePerLbCents: 214,
		logisticsCents: 28,
		premiumCents: 18,
		availability: "available",
		image: "/images/mill.jpg",
		notes: "Dark chocolate, cedar, dense crema. Fine Robusta, unrounded.",
		flavor: [
			"dark chocolate",
			"cedar",
			"molasses"
		],
		followers: 54,
		sampleReady: true
	},
	{
		id: "lot-044",
		code: "AL-ET-26-044",
		title: "Kochere Washed Garden",
		producerId: "acc-yirga",
		exporterId: "acc-karmic",
		origin: {
			country: "Ethiopia",
			region: "Gedeo · Kochere",
			farm: "Yirga Forest Collective",
			elevationM: 1980
		},
		process: "Washed",
		varietal: "Heirloom",
		harvest: "2025/26",
		cupScore: 88.21,
		moisturePct: 10.2,
		screen: "14+",
		bags: 60,
		weightKg: 3600,
		farmgateCents: 410,
		fobCents: 548,
		pricePerLbCents: 548,
		logisticsCents: 86,
		premiumCents: 52,
		availability: "pending",
		image: "/images/ethiopia-forest.jpg",
		notes: "Bergamot, white peach, silk. Station file still provisional.",
		flavor: [
			"bergamot",
			"white peach",
			"jasmine"
		],
		followers: 201,
		sampleReady: false
	},
	{
		id: "lot-018",
		code: "AL-CO-26-018",
		title: "Pitalito Pink Bourbon",
		producerId: "acc-huila",
		exporterId: "acc-karmic",
		origin: {
			country: "Colombia",
			region: "Huila · Pitalito",
			farm: "Casa Huila patio 3",
			elevationM: 1750
		},
		process: "Washed",
		varietal: "Pink Bourbon",
		harvest: "2026",
		cupScore: 87.64,
		moisturePct: 10.6,
		screen: "16+",
		bags: 70,
		weightKg: 4200,
		farmgateCents: 392,
		fobCents: 510,
		pricePerLbCents: 510,
		logisticsCents: 72,
		premiumCents: 46,
		availability: "offer",
		image: "/images/colombia-patio.jpg",
		notes: "Rose, panela, tangerine. Offer open with Atlas.",
		flavor: [
			"rose",
			"panela",
			"tangerine"
		],
		followers: 174,
		sampleReady: true
	},
	{
		id: "lot-007",
		code: "AL-KE-26-007",
		title: "Othaya AA",
		producerId: "acc-nyeri",
		exporterId: "acc-karmic",
		origin: {
			country: "Kenya",
			region: "Nyeri · Othaya",
			farm: "Nyeri Highlands FCS",
			elevationM: 1780
		},
		process: "Washed",
		varietal: "SL28 / SL34",
		harvest: "2025/26",
		cupScore: 89.05,
		moisturePct: 10.1,
		screen: "AA",
		bags: 50,
		weightKg: 3e3,
		farmgateCents: 486,
		fobCents: 640,
		pricePerLbCents: 640,
		logisticsCents: 94,
		premiumCents: 60,
		availability: "locked",
		image: "/images/jute-warehouse.jpg",
		notes: "Blackcurrant, grapefruit, cane. Price-locked for Atlas Q4.",
		flavor: [
			"blackcurrant",
			"grapefruit",
			"cane"
		],
		followers: 240,
		sampleReady: false
	},
	{
		id: "lot-110",
		code: "AL-VN-26-110",
		title: "Cư M'gar Washed Typica",
		producerId: "acc-mai",
		exporterId: "acc-karmic",
		origin: {
			country: "Vietnam",
			region: "Đắk Lắk · Cư M'gar",
			farm: "Mai Garden",
			elevationM: 740
		},
		process: "Washed",
		varietal: "Typica",
		harvest: "2025/26",
		cupScore: 84.9,
		moisturePct: 10.9,
		screen: "16+",
		bags: 28,
		weightKg: 1680,
		farmgateCents: 292,
		fobCents: 378,
		pricePerLbCents: 378,
		logisticsCents: 50,
		premiumCents: 36,
		availability: "verified",
		image: "/images/cherries.jpg",
		notes: "Lemongrass, brown sugar. Sister lot to 084. Pending offer sheet.",
		flavor: [
			"lemongrass",
			"brown sugar",
			"lime"
		],
		followers: 41,
		sampleReady: true
	},
	{
		id: "lot-022",
		code: "AL-CO-26-022",
		title: "Huila Natural Caturra",
		producerId: "acc-huila",
		exporterId: "acc-karmic",
		origin: {
			country: "Colombia",
			region: "Huila · Pitalito",
			farm: "Casa Huila patio 1",
			elevationM: 1680
		},
		process: "Natural",
		varietal: "Caturra",
		harvest: "2026",
		cupScore: 86.11,
		moisturePct: 10.7,
		screen: "15+",
		bags: 40,
		weightKg: 2400,
		farmgateCents: 348,
		fobCents: 456,
		pricePerLbCents: 456,
		logisticsCents: 68,
		premiumCents: 40,
		availability: "available",
		image: "/images/colombia-patio.jpg",
		notes: "Dried fig, cocoa, round body. Tile patio, photographed.",
		flavor: [
			"dried fig",
			"cocoa",
			"orange"
		],
		followers: 99,
		sampleReady: true
	}
];
var spaces = accounts.map((a) => ({
	id: `space-${a.id.replace("acc-", "")}`,
	accountId: a.id,
	modules: [
		"identity",
		"proof",
		"ledger",
		"media",
		"offers",
		"reputation"
	],
	cover: a.image,
	published: a.trust.band !== "restricted"
}));
var stories = [
	{
		id: "st-1",
		spaceId: "space-mai",
		accountId: "acc-mai",
		lotId: "lot-084",
		title: "Honey week on the Mai garden",
		lede: "Mucilage left on the parchment for forty-two hours. The lot that became 084.",
		body: "The raised beds sat in a north wind. Trần Thị Mai turned the parchment at four and at sixteen. The ledger records moisture at 10.8. The photograph is the proof, not the story.",
		image: "/images/parchment-beds.jpg",
		publishedAt: "2026-09-14T03:00:00Z"
	},
	{
		id: "st-2",
		spaceId: "space-karmic",
		accountId: "acc-karmic",
		lotId: "lot-091",
		title: "A mill that keeps names",
		lede: "Buôn Ma Thuột Cooperative does not mill into anonymity. Each bag still points at a member.",
		body: "Lot 091 is washed Caturra from Lạc Dương. The cooperative mill logged fermentation at 18 hours. Saigon Cup Lab returned 85.17, unrounded. Atlas asked for a sample the same afternoon.",
		image: "/images/mill.jpg",
		publishedAt: "2026-09-18T09:00:00Z"
	},
	{
		id: "st-3",
		spaceId: "space-saigon",
		accountId: "acc-saigon",
		lotId: "lot-007",
		title: "The table does not round",
		lede: "Othaya AA cupped at 89.05. The decimal is the point.",
		body: "Q-graders at Saigon Cup Lab keep the hundredths. Auctum Ledger stores the score as recorded, not as a marketing integer. Kenya 007 is price-locked on that number.",
		image: "/images/cupping-table.jpg",
		publishedAt: "2026-09-09T11:30:00Z"
	},
	{
		id: "st-4",
		spaceId: "space-yirga",
		accountId: "acc-yirga",
		lotId: "lot-044",
		title: "Kochere under shade",
		lede: "Garden coffee, indigenous canopy, a station file still being sealed.",
		body: "The collective is provisional on documents, not on the cup. 88.21 washed. EUDR geolocation is queued. Trust waits on paper, not on flavor.",
		image: "/images/ethiopia-forest.jpg",
		publishedAt: "2026-09-04T07:20:00Z"
	},
	{
		id: "st-5",
		spaceId: "space-huila",
		accountId: "acc-huila",
		lotId: "lot-018",
		title: "Pink Bourbon on tile",
		lede: "Patio three, Pitalito. The geometry of drying is a quality control.",
		body: "Casa Huila dries on terracotta. The rows are the method. Offer is open; the waterfall is published on the lot page.",
		image: "/images/colombia-patio.jpg",
		publishedAt: "2026-08-28T16:00:00Z"
	},
	{
		id: "st-6",
		spaceId: "space-duc",
		accountId: "acc-duc",
		title: "Sixty-three farms, one desk",
		lede: "The collector becomes an agent when the commission and the name are both visible.",
		body: "Nguyễn Văn Đức's territory is Cư M'gar. Verification tasks are open. His name sits on Mai's Space. That is the honesty check.",
		image: "/images/vn-highlands.jpg",
		publishedAt: "2026-09-20T02:00:00Z"
	}
];
var documents = [
	{
		id: "doc-qc-084",
		kind: "qc",
		title: "Saigon cupping sheet · 084",
		accountId: "acc-saigon",
		lotId: "lot-084",
		status: "accepted",
		confidence: .97,
		capturedAt: "2026-09-12T04:22:00Z",
		fields: {
			lot: "AL-VN-26-084",
			score: "86.42",
			moisture: "10.8%",
			method: "SCA / Q",
			grader: "Lab desk A"
		}
	},
	{
		id: "doc-rx-084",
		kind: "receipt",
		title: "Farmgate receipt · Mai",
		accountId: "acc-mai",
		lotId: "lot-084",
		status: "accepted",
		confidence: .94,
		capturedAt: "2026-09-08T08:01:00Z",
		fields: {
			payee: "Trần Thị Mai",
			amount: "VND 192,400,000",
			basis: "3.18 USD/lb farmgate",
			rail: "VietQR / PayOS"
		}
	},
	{
		id: "doc-eudr-091",
		kind: "eudr",
		title: "EUDR geolocation packet · 091",
		accountId: "acc-coop",
		lotId: "lot-091",
		status: "review",
		confidence: .81,
		capturedAt: "2026-09-19T10:14:00Z",
		fields: {
			polygons: "214 member plots",
			deforestation: "clear",
			harvest: "2025/26",
			operator: "Karmic Circle"
		},
		notes: "Two plots need a second GPS ping."
	},
	{
		id: "doc-ct-007",
		kind: "contract",
		title: "Price-lock · Atlas × Othaya AA",
		accountId: "acc-atlas",
		lotId: "lot-007",
		status: "accepted",
		confidence: .99,
		capturedAt: "2026-09-10T18:40:00Z",
		fields: {
			buyer: "Atlas Roastworks",
			lots: "AL-KE-26-007",
			lock: "6.40 USD/lb",
			volume: "3,000 kg",
			window: "Q4 2026"
		}
	},
	{
		id: "doc-id-yirga",
		kind: "identity",
		title: "Collective registration · Kochere",
		accountId: "acc-yirga",
		status: "extracted",
		confidence: .72,
		capturedAt: "2026-09-21T05:55:00Z",
		fields: {
			legal: "Yirga Forest Collective",
			station: "Kochere 02",
			members: "48",
			language: "Amharic / English"
		},
		notes: "Stamp is occluded. Needs human accept."
	},
	{
		id: "doc-phyto-018",
		kind: "phytosanitary",
		title: "ICA phytosanitary · 018",
		accountId: "acc-huila",
		lotId: "lot-018",
		status: "queued",
		confidence: 0,
		capturedAt: "2026-09-28T13:00:00Z",
		fields: {}
	}
];
var threads = [
	{
		id: "th-1",
		subject: "Sample 091 — Lâm Đồng washed",
		parties: [
			"acc-atlas",
			"acc-karmic",
			"acc-saigon"
		],
		lotId: "lot-091",
		deal: "sample",
		updatedAt: "2026-09-27T16:10:00Z",
		preview: "Atlas: send 300g to Portland. Cup desk will return by Friday."
	},
	{
		id: "th-2",
		subject: "Offer · Pitalito Pink Bourbon",
		parties: [
			"acc-atlas",
			"acc-huila",
			"acc-karmic"
		],
		lotId: "lot-018",
		deal: "offer",
		updatedAt: "2026-09-26T11:02:00Z",
		preview: "Karmic Circle: 5.10 FOB, 70 bags, October stem."
	},
	{
		id: "th-3",
		subject: "Price lock confirmed · Othaya AA",
		parties: [
			"acc-atlas",
			"acc-nyeri",
			"acc-karmic"
		],
		lotId: "lot-007",
		deal: "lock",
		updatedAt: "2026-09-10T18:44:00Z",
		preview: "Lock snapshot written. 6.40 / lb. Immutable on the ledger."
	},
	{
		id: "th-4",
		subject: "Mai garden — next harvest window",
		parties: [
			"acc-mai",
			"acc-duc",
			"acc-karmic"
		],
		lotId: "lot-110",
		deal: "intro",
		updatedAt: "2026-09-22T01:30:00Z",
		preview: "Đức: washed sister lot 110 is verified. Ready for the sheet."
	}
];
var messages = [
	{
		id: "m1",
		threadId: "th-1",
		fromId: "acc-atlas",
		body: "Requesting 300g of 091. We'll cup against the Lâm Đồng 2024 reference.",
		at: "2026-09-25T15:02:00Z"
	},
	{
		id: "m2",
		threadId: "th-1",
		fromId: "acc-karmic",
		body: "Sample allocated from bag 12. Tracking on the Samples context. Desk notes 85.17 unrounded.",
		at: "2026-09-26T02:18:00Z"
	},
	{
		id: "m3",
		threadId: "th-1",
		fromId: "acc-saigon",
		body: "Reference roast logged. Moisture 10.4. No defect class above 3.",
		at: "2026-09-27T16:10:00Z"
	},
	{
		id: "m4",
		threadId: "th-2",
		fromId: "acc-karmic",
		body: "Offer: 5.10 USD/lb FOB Buenaventura equivalent, 70 bags, October.",
		at: "2026-09-26T11:02:00Z"
	},
	{
		id: "m5",
		threadId: "th-3",
		fromId: "acc-karmic",
		body: "Price lock written. Snapshot id LOCK-007-ATLAS. The number will not move.",
		at: "2026-09-10T18:44:00Z"
	},
	{
		id: "m6",
		threadId: "th-4",
		fromId: "acc-duc",
		body: "Verified 110 this morning. Photo of cherry and parchment attached to the Space.",
		at: "2026-09-22T01:30:00Z"
	}
];
var agentTasks = [
	{
		id: "tk-1",
		agentId: AGENT_ID,
		kind: "verify",
		title: "Second GPS ping — two EUDR plots",
		accountId: "acc-coop",
		due: "2026-10-02",
		status: "open"
	},
	{
		id: "tk-2",
		agentId: AGENT_ID,
		kind: "follow-up",
		title: "Receipt photo for Mai outstanding",
		accountId: "acc-mai",
		due: "2026-10-01",
		status: "open"
	},
	{
		id: "tk-3",
		agentId: AGENT_ID,
		kind: "capture",
		title: "New member — Ea H'leo garden",
		due: "2026-10-04",
		status: "open"
	},
	{
		id: "tk-4",
		agentId: AGENT_ID,
		kind: "audit",
		title: "Spot-check mill fermentation log",
		accountId: "acc-coop",
		due: "2026-09-30",
		status: "done"
	}
];
var events = [
	{
		id: "ev-1",
		at: "2026-09-27T16:10:00Z",
		kind: "sample.shipped",
		actor: "Karmic Circle",
		summary: "Sample 091 allocated to Atlas Roastworks.",
		lotId: "lot-091",
		accountId: "acc-atlas"
	},
	{
		id: "ev-2",
		at: "2026-09-22T04:10:00Z",
		kind: "lot.verified",
		actor: "Nguyễn Văn Đức",
		summary: "Lot 110 verified on-farm. Moisture 10.9.",
		lotId: "lot-110",
		accountId: "acc-mai"
	},
	{
		id: "ev-3",
		at: "2026-09-18T08:00:00Z",
		kind: "space.published",
		actor: "Karmic Circle",
		summary: "Origin operator Space republished after Q3 audit.",
		accountId: "acc-karmic"
	},
	{
		id: "ev-4",
		at: "2026-09-12T04:22:00Z",
		kind: "qc.accepted",
		actor: "Saigon Cup Lab",
		summary: "Cupping sheet 084 accepted. Score 86.42.",
		lotId: "lot-084",
		accountId: "acc-saigon"
	},
	{
		id: "ev-5",
		at: "2026-09-10T18:44:00Z",
		kind: "price.locked",
		actor: "Auctum Ledger",
		summary: "Immutable lock 6.40 / lb on Othaya AA.",
		lotId: "lot-007",
		accountId: "acc-atlas"
	},
	{
		id: "ev-6",
		at: "2026-09-08T08:01:00Z",
		kind: "payment.received",
		actor: "VietQR",
		summary: "Farmgate settled to Trần Thị Mai. Idempotent on providerTxnId.",
		lotId: "lot-084",
		accountId: "acc-mai"
	}
];
var followingIds = [
	"acc-mai",
	"acc-karmic",
	"acc-nyeri",
	"acc-saigon"
];
var marketPulse = {
	cMarketCents: 348,
	vietnamDiffCents: 18,
	lotsOnOffer: 5,
	samplesOpen: 2,
	locksThisMonth: 1,
	farmersVerified: 214
};
function now() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function applyDocToTrust(account, status) {
	if (status !== "accepted" && status !== "rejected") return account;
	const delta = status === "accepted" ? 4 : -8;
	const components = bumpComponent(account.trust.components, "documentVerification", delta);
	return {
		...account,
		trust: computeTrust(components)
	};
}
var seed = {
	accounts,
	lots,
	stories,
	documents,
	threads,
	messages,
	tasks: agentTasks,
	events,
	following: followingIds
};
var useLedger = create()(persist((set) => ({
	...seed,
	hydrated: false,
	markHydrated: () => set({ hydrated: true }),
	follow: (accountId) => set((s) => ({ following: s.following.includes(accountId) ? s.following.filter((id) => id !== accountId) : [...s.following, accountId] })),
	requestSample: (lotId) => set((s) => {
		const lot = s.lots.find((l) => l.id === lotId);
		if (!lot) return s;
		const event = {
			id: `ev-${Date.now()}`,
			at: now(),
			kind: "sample.requested",
			actor: "Atlas Roastworks",
			summary: `Sample requested on ${lot.code}.`,
			lotId,
			accountId: "acc-atlas"
		};
		return {
			lots: s.lots.map((l) => l.id === lotId ? {
				...l,
				availability: "sample"
			} : l),
			events: [event, ...s.events]
		};
	}),
	expressInterest: (lotId) => set((s) => {
		const lot = s.lots.find((l) => l.id === lotId);
		if (!lot) return s;
		return {
			lots: s.lots.map((l) => l.id === lotId && l.availability === "available" ? {
				...l,
				availability: "offer"
			} : l),
			events: [{
				id: `ev-${Date.now()}`,
				at: now(),
				kind: "offer.opened",
				actor: "Atlas Roastworks",
				summary: `Interest recorded on ${lot.code}.`,
				lotId
			}, ...s.events]
		};
	}),
	lockPrice: (lotId) => set((s) => {
		const lot = s.lots.find((l) => l.id === lotId);
		if (!lot) return s;
		return {
			lots: s.lots.map((l) => l.id === lotId ? {
				...l,
				availability: "locked"
			} : l),
			events: [{
				id: `ev-${Date.now()}`,
				at: now(),
				kind: "price.locked",
				actor: "Auctum Ledger",
				summary: `Lock snapshot ${formatLock(lot)} written.`,
				lotId
			}, ...s.events]
		};
	}),
	setDocStatus: (id, status) => set((s) => {
		const doc = s.documents.find((d) => d.id === id);
		if (!doc) return s;
		return {
			documents: s.documents.map((d) => d.id === id ? {
				...d,
				status
			} : d),
			accounts: s.accounts.map((a) => a.id === doc.accountId ? applyDocToTrust(a, status) : a),
			events: [{
				id: `ev-${Date.now()}`,
				at: now(),
				kind: `document.${status}`,
				actor: "Trust desk",
				summary: `${doc.title} marked ${status}.`,
				lotId: doc.lotId,
				accountId: doc.accountId
			}, ...s.events]
		};
	}),
	ingestScan: (draft) => {
		const id = `doc-scan-${Date.now()}`;
		const record = {
			id,
			kind: draft.kind,
			title: draft.title,
			accountId: draft.accountId,
			lotId: draft.lotId,
			status: "review",
			confidence: draft.confidence,
			capturedAt: now(),
			fields: draft.fields
		};
		set((s) => ({
			documents: [record, ...s.documents],
			events: [{
				id: `ev-${Date.now()}`,
				at: now(),
				kind: "document.extracted",
				actor: "OCR desk",
				summary: `Extracted ${draft.title} at ${Math.round(draft.confidence * 100)}% confidence.`,
				accountId: draft.accountId,
				lotId: draft.lotId
			}, ...s.events]
		}));
		return id;
	},
	completeTask: (id) => set((s) => ({ tasks: s.tasks.map((t) => t.id === id ? {
		...t,
		status: "done"
	} : t) })),
	sendMessage: (threadId, body) => set((s) => {
		const msg = {
			id: `m-${Date.now()}`,
			threadId,
			fromId: "acc-karmic",
			body,
			at: now()
		};
		return {
			messages: [...s.messages, msg],
			threads: s.threads.map((t) => t.id === threadId ? {
				...t,
				preview: body,
				updatedAt: now()
			} : t)
		};
	}),
	reset: () => set({
		...seed,
		hydrated: true
	})
}), {
	name: "auctum-ledger-v1",
	skipHydration: true,
	partialize: (s) => ({
		accounts: s.accounts,
		lots: s.lots,
		stories: s.stories,
		documents: s.documents,
		threads: s.threads,
		messages: s.messages,
		tasks: s.tasks,
		events: s.events,
		following: s.following
	})
}));
function formatLock(lot) {
	return `${(lot.pricePerLbCents / 100).toFixed(2)} / lb on ${lot.code}`;
}
function accountById(accounts, id) {
	return accounts.find((a) => a.id === id);
}
function AuctumSeal({ size = 72, className, inverse }) {
	const ink = inverse ? "#F1F2EA" : "#17231D";
	const stamp = inverse ? "#E8C7C0" : "#8C2F22";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 100 100",
		role: "img",
		"aria-label": "Auctum Ledger seal",
		className: cn("shrink-0", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "50",
				cy: "50",
				r: "47",
				fill: "none",
				stroke: ink,
				strokeWidth: "1.2",
				opacity: "0.55"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				fill: ink,
				opacity: "0.8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M50 1 L54 16 L50 21 L46 16 Z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M50 99 L54 84 L50 79 L46 84 Z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1 50 L16 46 L21 50 L16 54 Z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M99 50 L84 46 L79 50 L84 54 Z" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: "50",
				cy: "50",
				rx: "21",
				ry: "30",
				fill: "none",
				stroke: stamp,
				strokeWidth: "2.4"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M50 21 C39 33 61 45 50 50 C39 55 61 67 50 79",
				fill: "none",
				stroke: stamp,
				strokeWidth: "2.4",
				strokeLinecap: "round"
			})
		]
	});
}
var primary = [
	{
		to: "/",
		label: "Compass"
	},
	{
		to: "/market",
		label: "Market"
	},
	{
		to: "/stories",
		label: "Stories"
	},
	{
		to: "/spaces",
		label: "Spaces"
	},
	{
		to: "/crm",
		label: "CRM"
	}
];
var more = [
	{
		to: "/following",
		label: "Following"
	},
	{
		to: "/messages",
		label: "Messages"
	},
	{
		to: "/scan",
		label: "Scan"
	},
	{
		to: "/trust",
		label: "Trust"
	},
	{
		to: "/agent",
		label: "Agent"
	},
	{
		to: "/craft",
		label: "The Craft"
	},
	{
		to: "/ecosystem",
		label: "Ecosystem"
	}
];
function FolioShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const markHydrated = useLedger((s) => s.markHydrated);
	(0, import_react.useEffect)(() => {
		const result = useLedger.persist.rehydrate();
		Promise.resolve(result).then(() => markHydrated());
	}, [markHydrated]);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [pathname]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-raw text-ink",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#content",
				className: "sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-paper focus:px-3 focus:py-2",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-hair bg-ink text-paper",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "flex items-center gap-3 pr-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuctumSeal, {
									size: 34,
									inverse: true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "leading-none",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-display text-lg tracking-tight",
										children: "Auctum Ledger"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 hidden font-mono text-[9px] tracking-[0.22em] text-stamp-soft uppercase sm:block",
										children: "Verified, from origin"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
								className: "ml-auto hidden items-center gap-1 lg:flex",
								"aria-label": "Primary",
								children: primary.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
									to: item.to,
									label: item.label,
									pathname
								}, item.to))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ml-auto inline-flex size-11 items-center justify-center text-paper lg:hidden",
								"aria-expanded": open,
								"aria-label": open ? "Close menu" : "Open menu",
								onClick: () => setOpen((v) => !v),
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden border-t border-white/10 lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto flex max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-6 py-2",
							children: [more.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-150", pathname === item.to || pathname.startsWith(`${item.to}/`) ? "text-paper" : "text-stamp-soft hover:text-paper"),
								children: item.label
							}, item.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto font-mono text-[10px] tracking-[0.16em] text-stamp-soft uppercase",
								children: "LotSpace · Karmic Circle desk"
							})]
						})
					}),
					open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-white/10 px-4 py-4 lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-1",
							children: [...primary, ...more].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: "flex min-h-11 items-center px-2 font-mono text-[11px] tracking-[0.14em] text-paper uppercase",
								children: item.label
							}, item.to))
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "content",
				className: "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-10",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto max-w-6xl px-4 pb-12 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "folio-double mb-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] tracking-[0.16em] text-slate uppercase",
						children: "Auctum Ledger · One ledger, four doors · Rev 2026.09"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-xs text-slate",
						children: "Social objects cannot contradict the verified record. Farmer sovereignty. Trust is a product feature."
					})]
				})]
			})
		]
	});
}
function NavLink({ to, label, pathname }) {
	const active = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("relative flex min-h-11 items-center px-3 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-150", active ? "text-paper" : "text-stamp-soft hover:text-paper"),
		children: [label, active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-x-3 bottom-1 h-px bg-stamp" }) : null]
	});
}
var styles_default = "/assets/styles-BtVfCpbb.css";
var APP_NAME = "Auctum Ledger";
var Route$15 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Auctum Ledger — the verified coffee network. Identity, trade, and provenance on one surface."
			},
			{
				name: "theme-color",
				content: "#17231D"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Zilla+Slab:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolioShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$14 = () => import("./routes-N3F2lFrF.mjs");
var Route$14 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./agent-BVJHLlDZ.mjs");
var Route$13 = createFileRoute("/agent")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./craft-DIgmZ7KG.mjs");
var Route$12 = createFileRoute("/craft")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./crm-Bp94Wgpl.mjs");
var Route$11 = createFileRoute("/crm")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./ecosystem-Db75LMrj.mjs");
var Route$10 = createFileRoute("/ecosystem")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./following-Cpyk0dQS.mjs");
var Route$9 = createFileRoute("/following")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./market-ClKPhfMk.mjs");
var Route$8 = createFileRoute("/market")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./messages-BIZRcLw5.mjs");
var Route$7 = createFileRoute("/messages")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./scan-2_xoLNdi.mjs");
var Route$6 = createFileRoute("/scan")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./spaces-Cl_qR7s1.mjs");
var Route$5 = createFileRoute("/spaces")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./stories-CQdLwX1F.mjs");
var Route$4 = createFileRoute("/stories")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./trust-BKHyyGwX.mjs");
var Route$3 = createFileRoute("/trust")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./crm._accountId-CXRTAeNQ.mjs");
var Route$2 = createFileRoute("/crm/$accountId")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./market._lotId-CIXjPWBY.mjs");
var Route$1 = createFileRoute("/market/$lotId")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./spaces._spaceId-DQhW1jpn.mjs");
var Route = createFileRoute("/spaces/$spaceId")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$15
});
var AgentRoute = Route$13.update({
	id: "/agent",
	path: "/agent",
	getParentRoute: () => Route$15
});
var CraftRoute = Route$12.update({
	id: "/craft",
	path: "/craft",
	getParentRoute: () => Route$15
});
var CrmRoute = Route$11.update({
	id: "/crm",
	path: "/crm",
	getParentRoute: () => Route$15
});
var EcosystemRoute = Route$10.update({
	id: "/ecosystem",
	path: "/ecosystem",
	getParentRoute: () => Route$15
});
var FollowingRoute = Route$9.update({
	id: "/following",
	path: "/following",
	getParentRoute: () => Route$15
});
var MarketRoute = Route$8.update({
	id: "/market",
	path: "/market",
	getParentRoute: () => Route$15
});
var MessagesRoute = Route$7.update({
	id: "/messages",
	path: "/messages",
	getParentRoute: () => Route$15
});
var ScanRoute = Route$6.update({
	id: "/scan",
	path: "/scan",
	getParentRoute: () => Route$15
});
var SpacesRoute = Route$5.update({
	id: "/spaces",
	path: "/spaces",
	getParentRoute: () => Route$15
});
var StoriesRoute = Route$4.update({
	id: "/stories",
	path: "/stories",
	getParentRoute: () => Route$15
});
var TrustRoute = Route$3.update({
	id: "/trust",
	path: "/trust",
	getParentRoute: () => Route$15
});
var CrmAccountIdRoute = Route$2.update({
	id: "/$accountId",
	path: "/$accountId",
	getParentRoute: () => CrmRoute
});
var MarketLotIdRoute = Route$1.update({
	id: "/$lotId",
	path: "/$lotId",
	getParentRoute: () => MarketRoute
});
var SpacesSpaceIdRoute = Route.update({
	id: "/$spaceId",
	path: "/$spaceId",
	getParentRoute: () => SpacesRoute
});
var CrmRouteChildren = { CrmAccountIdRoute };
var CrmRouteWithChildren = CrmRoute._addFileChildren(CrmRouteChildren);
var MarketRouteChildren = { MarketLotIdRoute };
var MarketRouteWithChildren = MarketRoute._addFileChildren(MarketRouteChildren);
var SpacesRouteChildren = { SpacesSpaceIdRoute };
var rootRouteChildren = {
	IndexRoute,
	AgentRoute,
	CraftRoute,
	CrmRoute: CrmRouteWithChildren,
	EcosystemRoute,
	FollowingRoute,
	MarketRoute: MarketRouteWithChildren,
	MessagesRoute,
	ScanRoute,
	SpacesRoute: SpacesRoute._addFileChildren(SpacesRouteChildren),
	StoriesRoute,
	TrustRoute
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { AuctumSeal as a, AGENT_ID as c, TRUST_LABELS as d, TRUST_WEIGHTS as f, Route$2 as i, marketPulse as l, Route as n, accountById as o, cn as p, Route$1 as r, useLedger as s, router_exports as t, spaces as u };
