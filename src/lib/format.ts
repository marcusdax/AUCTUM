import type { TrustBand } from "./types";

export function formatCents(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function formatKg(kg: number) {
  return `${new Intl.NumberFormat("en-US").format(kg)} kg`;
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function bandLabel(band: TrustBand) {
  switch (band) {
    case "sealed":
      return "Sealed";
    case "verified":
      return "Verified";
    case "provisional":
      return "Provisional";
    case "watch":
      return "Watch";
    case "restricted":
      return "Restricted";
  }
}

export function roleLabel(role: string) {
  switch (role) {
    case "farmer":
      return "Smallholder";
    case "collector":
      return "Collector";
    case "coop":
      return "Cooperative";
    case "exporter":
      return "Origin operator";
    case "roaster":
      return "Roaster";
    case "lab":
      return "Cupping lab";
    case "importer":
      return "Importer";
    case "agent":
      return "Field agent";
    default:
      return role;
  }
}

export function stateLabel(state: string) {
  switch (state) {
    case "available":
      return "Available";
    case "sample":
      return "Sample requested";
    case "offer":
      return "In offer";
    case "locked":
      return "Price locked";
    case "contracted":
      return "Contracted";
    case "verified":
      return "Verified";
    case "pending":
      return "Pending verification";
    case "fulfilled":
      return "Fulfilled";
    default:
      return state;
  }
}
