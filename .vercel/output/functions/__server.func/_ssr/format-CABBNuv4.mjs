//#region node_modules/.nitro/vite/services/ssr/assets/format-CABBNuv4.js
function formatCents(cents, currency = "USD") {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		maximumFractionDigits: 2
	}).format(cents / 100);
}
function formatKg(kg) {
	return `${new Intl.NumberFormat("en-US").format(kg)} kg`;
}
function formatDate(iso) {
	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	}).format(new Date(iso));
}
function bandLabel(band) {
	switch (band) {
		case "sealed": return "Sealed";
		case "verified": return "Verified";
		case "provisional": return "Provisional";
		case "watch": return "Watch";
		case "restricted": return "Restricted";
	}
}
function roleLabel(role) {
	switch (role) {
		case "farmer": return "Smallholder";
		case "collector": return "Collector";
		case "coop": return "Cooperative";
		case "exporter": return "Origin operator";
		case "roaster": return "Roaster";
		case "lab": return "Cupping lab";
		case "importer": return "Importer";
		case "agent": return "Field agent";
		default: return role;
	}
}
function stateLabel(state) {
	switch (state) {
		case "available": return "Available";
		case "sample": return "Sample requested";
		case "offer": return "In offer";
		case "locked": return "Price locked";
		case "contracted": return "Contracted";
		case "verified": return "Verified";
		case "pending": return "Pending verification";
		case "fulfilled": return "Fulfilled";
		default: return state;
	}
}
//#endregion
export { roleLabel as a, formatKg as i, formatCents as n, stateLabel as o, formatDate as r, bandLabel as t };
