import { sharePctForScore } from "./policy";
import type { Lot } from "./types";

export type IntegrationModel = "affiliate" | "dropship";

export type ListingFormat = "roasted-bag" | "green-kilo" | "green-sample";

export type Seller = {
  id: string;
  name: string;
  slug: string;
  email: string;
  webhookUrl: string | null;
  storeUrl: string;
  apiKey: string;
  integrationModel: IntegrationModel;
  verifiedAt: string | null;
  signedName: string | null;
  signedAt: string | null;
  agreementVersion: string | null;
  accountId?: string;
  createdAt: string;
  pitch: string;
  locale: string;
};

export type Listing = {
  id: string;
  lotId: string;
  sellerId: string;
  sku: string;
  format: ListingFormat;
  bagGrams: number;
  priceCents: number;
  live: boolean;
};

export type CartLine = {
  listingId: string;
  qty: number;
};

export type NotifyChannel = "webhook" | "email";
export type NotifyStatus = "queued" | "delivered" | "failed";

export type ClickRecord = {
  id: string;
  orderId: string;
  listingId: string;
  sellerId: string;
  lotId: string;
  buyerEmail: string;
  qty: number;
  priceCents: number;
  referralUrl: string;
  clickedAt: string;
  channel: NotifyChannel;
  status: NotifyStatus;
  attempts: number;
  statusCode?: number;
  deliveredAt?: string;
  convertedAt?: string;
  signature: string;
  error?: string;
};

export type ReviewMark = 1 | 2 | 3 | 4 | 5;

export type Review = {
  id: string;
  listingId: string;
  sellerId: string;
  lotId: string;
  orderId: string;
  buyerName: string;
  buyerEmail: string;
  stars: ReviewMark;
  asDescribed: ReviewMark;
  fulfillment: ReviewMark;
  body: string;
  createdAt: string;
};

export const seedSellers: Seller[] = [
  {
    id: "sel-karmic",
    name: "Karmic Circle",
    slug: "karmic-circle",
    email: "partners@karmiccircle.coffee",
    webhookUrl: "https://hooks.karmiccircle.coffee/auctum",
    storeUrl: "https://karmiccircle.coffee/lots",
    apiKey: "ak_live_karmic_7f3c",
    integrationModel: "affiliate",
    verifiedAt: "2026-08-12T08:00:00Z",
    signedName: "Karmic Circle",
    signedAt: "2026-08-12T08:00:00Z",
    agreementVersion: "AX-2026.09",
    accountId: "acc-karmic",
    createdAt: "2026-08-12T08:00:00Z",
    pitch: "Vietnam origin operator. Named farms, named prices, VietQR on the floor.",
    locale: "Buôn Ma Thuột",
  },
  {
    id: "sel-atlas",
    name: "Atlas Roastworks",
    slug: "atlas-roastworks",
    email: "desk@atlasroast.works",
    webhookUrl: "https://atlasroast.works/api/auctum",
    storeUrl: "https://atlasroast.works/shop",
    apiKey: "ak_live_atlas_9b21",
    integrationModel: "affiliate",
    verifiedAt: "2026-08-20T17:00:00Z",
    signedName: "Atlas Roastworks",
    signedAt: "2026-08-20T17:00:00Z",
    agreementVersion: "AX-2026.09",
    accountId: "acc-atlas",
    createdAt: "2026-08-20T17:00:00Z",
    pitch: "Portland roast desk. Menu provenance. Samples first, then the bag.",
    locale: "Portland, Oregon",
  },
  {
    id: "sel-huila",
    name: "Casa Huila",
    slug: "casa-huila",
    email: "hola@casahuila.co",
    webhookUrl: null,
    storeUrl: "https://casahuila.co/export",
    apiKey: "ak_live_huila_4e18",
    integrationModel: "affiliate",
    verifiedAt: "2026-09-01T12:00:00Z",
    signedName: "Casa Huila",
    signedAt: "2026-09-01T12:00:00Z",
    agreementVersion: "AX-2026.09",
    accountId: "acc-huila",
    createdAt: "2026-09-01T12:00:00Z",
    pitch: "Pink Bourbon and Caturra from Pitalito. Tile patio, family mill.",
    locale: "Pitalito, Huila",
  },
  {
    id: "sel-yirga",
    name: "Yirga Forest Collective",
    slug: "yirga-forest",
    email: "station@yirgaforest.et",
    webhookUrl: null,
    storeUrl: "https://yirgaforest.et/lots",
    apiKey: "ak_live_yirga_2a90",
    integrationModel: "affiliate",
    verifiedAt: "2026-09-04T06:00:00Z",
    signedName: "Yirga Forest Collective",
    signedAt: "2026-09-04T06:00:00Z",
    agreementVersion: "AX-2026.09",
    accountId: "acc-yirga",
    createdAt: "2026-09-04T06:00:00Z",
    pitch: "Garden lots under indigenous shade. Washed Kochere, station file open.",
    locale: "Kochere, Gedeo",
  },
  {
    id: "sel-mekong",
    name: "Mekong Trade Desk",
    slug: "mekong-trade",
    email: "intake@mekongtrade.eu",
    webhookUrl: "https://intake.mekongtrade.eu/hooks/auctum",
    storeUrl: "https://mekongtrade.eu/origin",
    apiKey: "ak_live_mekong_5c44",
    integrationModel: "dropship",
    verifiedAt: "2026-08-28T15:00:00Z",
    signedName: "Mekong Trade Desk",
    signedAt: "2026-08-28T15:00:00Z",
    agreementVersion: "AX-2026.09",
    accountId: "acc-mekong",
    createdAt: "2026-08-28T15:00:00Z",
    pitch: "EUDR packet intake. Rotterdam desk, named lots, no extraction fee.",
    locale: "Rotterdam",
  },
];

export const seedListings: Listing[] = [
  { id: "lis-084-atlas", lotId: "lot-084", sellerId: "sel-atlas", sku: "AT-084-12", format: "roasted-bag", bagGrams: 340, priceCents: 1899, live: true },
  { id: "lis-084-karmic", lotId: "lot-084", sellerId: "sel-karmic", sku: "KC-084-KG", format: "green-kilo", bagGrams: 1000, priceCents: 908, live: true },
  { id: "lis-091-atlas", lotId: "lot-091", sellerId: "sel-atlas", sku: "AT-091-12", format: "roasted-bag", bagGrams: 340, priceCents: 1749, live: true },
  { id: "lis-091-karmic", lotId: "lot-091", sellerId: "sel-karmic", sku: "KC-091-KG", format: "green-kilo", bagGrams: 1000, priceCents: 785, live: true },
  { id: "lis-102-karmic", lotId: "lot-102", sellerId: "sel-karmic", sku: "KC-102-KG", format: "green-kilo", bagGrams: 1000, priceCents: 472, live: true },
  { id: "lis-102-mekong", lotId: "lot-102", sellerId: "sel-mekong", sku: "MK-102-KG", format: "green-kilo", bagGrams: 1000, priceCents: 510, live: true },
  { id: "lis-018-atlas", lotId: "lot-018", sellerId: "sel-atlas", sku: "AT-018-12", format: "roasted-bag", bagGrams: 340, priceCents: 2299, live: true },
  { id: "lis-018-huila", lotId: "lot-018", sellerId: "sel-huila", sku: "CH-018-KG", format: "green-kilo", bagGrams: 1000, priceCents: 1124, live: true },
  { id: "lis-022-huila", lotId: "lot-022", sellerId: "sel-huila", sku: "CH-022-KG", format: "green-kilo", bagGrams: 1000, priceCents: 1005, live: true },
  { id: "lis-022-atlas", lotId: "lot-022", sellerId: "sel-atlas", sku: "AT-022-12", format: "roasted-bag", bagGrams: 340, priceCents: 1999, live: true },
  { id: "lis-044-yirga", lotId: "lot-044", sellerId: "sel-yirga", sku: "YF-044-KG", format: "green-kilo", bagGrams: 1000, priceCents: 1208, live: true },
  { id: "lis-044-atlas", lotId: "lot-044", sellerId: "sel-atlas", sku: "AT-044-12", format: "roasted-bag", bagGrams: 340, priceCents: 2499, live: true },
  { id: "lis-007-atlas", lotId: "lot-007", sellerId: "sel-atlas", sku: "AT-007-12", format: "roasted-bag", bagGrams: 250, priceCents: 2699, live: true },
  { id: "lis-110-karmic", lotId: "lot-110", sellerId: "sel-karmic", sku: "KC-110-SM", format: "green-sample", bagGrams: 250, priceCents: 240, live: true },
  { id: "lis-091-mekong", lotId: "lot-091", sellerId: "sel-mekong", sku: "MK-091-KG", format: "green-kilo", bagGrams: 1000, priceCents: 840, live: true },
];

export const seedClicks: ClickRecord[] = [
  {
    id: "clk-seed-1",
    orderId: "ord-240918-01",
    listingId: "lis-084-atlas",
    sellerId: "sel-atlas",
    lotId: "lot-084",
    buyerEmail: "buyer@northstar.cafe",
    qty: 2,
    priceCents: 3798,
    referralUrl: "https://atlasroast.works/shop?auctum-ref=ord-240918-01&utm_source=auctum&utm_medium=exchange&utm_campaign=verified-origin",
    clickedAt: "2026-09-28T16:42:00Z",
    channel: "webhook",
    status: "delivered",
    attempts: 1,
    statusCode: 200,
    deliveredAt: "2026-09-28T16:42:00Z",
    signature: "7c2a91e3",
  },
  {
    id: "clk-seed-2",
    orderId: "ord-240929-02",
    listingId: "lis-018-huila",
    sellerId: "sel-huila",
    lotId: "lot-018",
    buyerEmail: "green@bravefew.com",
    qty: 1,
    priceCents: 1124,
    referralUrl: "https://casahuila.co/export?auctum-ref=ord-240929-02&utm_source=auctum&utm_medium=exchange&utm_campaign=verified-origin",
    clickedAt: "2026-09-29T09:11:00Z",
    channel: "email",
    status: "delivered",
    attempts: 1,
    deliveredAt: "2026-09-29T09:11:01Z",
    convertedAt: "2026-09-30T14:02:00Z",
    signature: "b4e018aa",
  },
  {
    id: "clk-seed-3",
    orderId: "ord-241001-03",
    listingId: "lis-091-atlas",
    sellerId: "sel-atlas",
    lotId: "lot-091",
    buyerEmail: "cupper@folio.test",
    qty: 1,
    priceCents: 1749,
    referralUrl: "https://atlasroast.works/shop?auctum-ref=ord-241001-03&utm_source=auctum&utm_medium=exchange&utm_campaign=verified-origin",
    clickedAt: "2026-10-01T15:04:00Z",
    channel: "webhook",
    status: "delivered",
    attempts: 1,
    statusCode: 200,
    deliveredAt: "2026-10-01T15:04:00Z",
    signature: "c91d44e0",
  },
];

export const seedReviews: Review[] = [
  {
    id: "rev-atlas-084",
    listingId: "lis-084-atlas",
    sellerId: "sel-atlas",
    lotId: "lot-084",
    orderId: "ord-240918-01",
    buyerName: "Northstar Cafe",
    buyerEmail: "buyer@northstar.cafe",
    stars: 5,
    asDescribed: 5,
    fulfillment: 5,
    body: "Honey 084 cupped within half a point of the sheet. Roast date was on the bag. The autopsy QR opened the same lot.",
    createdAt: "2026-09-30T18:12:00Z",
  },
  {
    id: "rev-atlas-018",
    listingId: "lis-018-atlas",
    sellerId: "sel-atlas",
    lotId: "lot-018",
    orderId: "ord-240901-11",
    buyerName: "Hearth & Kiln",
    buyerEmail: "green@hearthkiln.com",
    stars: 4,
    asDescribed: 4,
    fulfillment: 5,
    body: "Pink Bourbon was a point under the filed cup. They wrote that before I asked. Bag was intact.",
    createdAt: "2026-09-18T14:40:00Z",
  },
  {
    id: "rev-atlas-044",
    listingId: "lis-044-atlas",
    sellerId: "sel-atlas",
    lotId: "lot-044",
    orderId: "ord-240822-04",
    buyerName: "Lane Street",
    buyerEmail: "bar@lanestreet.coffee",
    stars: 5,
    asDescribed: 5,
    fulfillment: 4,
    body: "Washed Kochere tasted like the note: jasmine, stone fruit, no baked edge. Ship was two days late and they said so.",
    createdAt: "2026-09-02T11:05:00Z",
  },
  {
    id: "rev-karmic-084",
    listingId: "lis-084-karmic",
    sellerId: "sel-karmic",
    lotId: "lot-084",
    orderId: "ord-240910-07",
    buyerName: "Mai Desk",
    buyerEmail: "intake@maidesk.vn",
    stars: 5,
    asDescribed: 5,
    fulfillment: 5,
    body: "Green kilo matched moisture and screen. Lot code was on the jute, not a sticker over another code.",
    createdAt: "2026-09-21T03:18:00Z",
  },
  {
    id: "rev-karmic-102",
    listingId: "lis-102-karmic",
    sellerId: "sel-karmic",
    lotId: "lot-102",
    orderId: "ord-240815-03",
    buyerName: "Saigon Sample Bar",
    buyerEmail: "cup@saigonsample.vn",
    stars: 4,
    asDescribed: 4,
    fulfillment: 3,
    body: "Natural 102 was the fruit the sheet promised. The second bag waited a week. They did not pretend it had shipped.",
    createdAt: "2026-08-28T09:44:00Z",
  },
  {
    id: "rev-huila-018",
    listingId: "lis-018-huila",
    sellerId: "sel-huila",
    lotId: "lot-018",
    orderId: "ord-240929-02",
    buyerName: "Brave Few",
    buyerEmail: "green@bravefew.com",
    stars: 5,
    asDescribed: 5,
    fulfillment: 4,
    body: "Email-only notice still reached them the same morning. Patio 3 was the coffee we cupped, not a substitute lot.",
    createdAt: "2026-10-01T16:22:00Z",
  },
  {
    id: "rev-huila-022",
    listingId: "lis-022-huila",
    sellerId: "sel-huila",
    lotId: "lot-022",
    orderId: "ord-240820-09",
    buyerName: "Casa Norte",
    buyerEmail: "buy@casanorte.co",
    stars: 4,
    asDescribed: 5,
    fulfillment: 4,
    body: "Natural from patio 1. Cup held. Invoice used the same price as the Exchange, which is rarer than it should be.",
    createdAt: "2026-09-06T13:10:00Z",
  },
  {
    id: "rev-yirga-044",
    listingId: "lis-044-yirga",
    sellerId: "sel-yirga",
    lotId: "lot-044",
    orderId: "ord-240901-02",
    buyerName: "Station North",
    buyerEmail: "lots@stationnorth.et",
    stars: 5,
    asDescribed: 5,
    fulfillment: 4,
    body: "Garden lot, washed, as filed. Freight took nine days. They wrote on day two with the airway bill.",
    createdAt: "2026-09-12T07:30:00Z",
  },
  {
    id: "rev-mekong-102",
    listingId: "lis-102-mekong",
    sellerId: "sel-mekong",
    lotId: "lot-102",
    orderId: "ord-240909-06",
    buyerName: "Rotterdam Lab",
    buyerEmail: "eu@rotterdamlab.nl",
    stars: 5,
    asDescribed: 5,
    fulfillment: 5,
    body: "EUDR packet was the same file as the autopsy. No quiet rewrite of origin between click and invoice.",
    createdAt: "2026-09-19T15:55:00Z",
  },
  {
    id: "rev-mekong-091",
    listingId: "lis-091-mekong",
    sellerId: "sel-mekong",
    lotId: "lot-091",
    orderId: "ord-240828-08",
    buyerName: "Harbour Roast",
    buyerEmail: "desk@harbourroast.nl",
    stars: 3,
    asDescribed: 4,
    fulfillment: 2,
    body: "The washed Lâm Đồng was right. The kilo was forty grams light. They credited it, but only after two notes.",
    createdAt: "2026-09-08T10:16:00Z",
  },
];

export function signPayload(body: string, secret: string) {
  let h = 2166136261;
  const s = `${secret}:${body}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function formatLabel(format: ListingFormat) {
  switch (format) {
    case "roasted-bag":
      return "Roasted bag";
    case "green-kilo":
      return "Green · kilo";
    case "green-sample":
      return "Green sample";
  }
}

export function sellerById(sellers: Seller[], id: string) {
  return sellers.find((s) => s.id === id);
}

export function listingById(listings: Listing[], id: string) {
  return listings.find((l) => l.id === id);
}

export function isReviewMark(n: number): n is ReviewMark {
  return Number.isInteger(n) && n >= 1 && n <= 5;
}

export function reviewStats(reviews: Review[]) {
  if (!reviews.length) return null;
  const sum = (pick: (r: Review) => number) => reviews.reduce((n, r) => n + pick(r), 0) / reviews.length;
  const dist = [0, 0, 0, 0, 0];
  for (const review of reviews) dist[review.stars - 1] += 1;
  return {
    count: reviews.length,
    avg: sum((r) => r.stars),
    asDescribed: sum((r) => r.asDescribed),
    fulfillment: sum((r) => r.fulfillment),
    dist,
  };
}

export type PriceRow = {
  label: string;
  cents: number;
  hint: string;
  tone: "ink" | "stamp" | "brass";
};

export function truePrice(lot: Lot, listing: Listing): PriceRow[] {
  const lb = listing.bagGrams / 453.592;
  const farm = Math.round(lot.farmgateCents * lb);
  const collection = Math.round(lot.logisticsCents * 0.4 * lb);
  const exportMove = Math.round(lot.logisticsCents * 0.6 * lb);
  const premium = Math.round(lot.premiumCents * lb);
  const origin = farm + collection + exportMove + premium;
  const sellerCost = Math.max(0, listing.priceCents - origin);
  const share = sharePctForScore(lot.cupScore);
  return [
    { label: "Farmer floor", cents: farm, hint: "Paid at farmgate for this unit", tone: "ink" },
    { label: "Collection", cents: collection, hint: "Mill, bagging, inland", tone: "ink" },
    { label: "Export / transport", cents: exportMove, hint: "FOB movement", tone: "ink" },
    { label: "Quality premium", cents: premium, hint: `Revenue share ${share}% at cup ${lot.cupScore.toFixed(2)}`, tone: "brass" },
    { label: "Seller cost & roast", cents: sellerCost, hint: "Roast, pack, store, margin — never collapsed", tone: "ink" },
    { label: "Final sale", cents: listing.priceCents, hint: "What the buyer pays on the seller's store", tone: "stamp" },
  ];
}

export function orderIdFrom(at: Date) {
  const y = at.getUTCFullYear().toString().slice(2);
  const m = String(at.getUTCMonth() + 1).padStart(2, "0");
  const d = String(at.getUTCDate()).padStart(2, "0");
  const n = String(at.getUTCMilliseconds()).padStart(3, "0");
  return `ord-${y}${m}${d}-${n}`;
}

export const AGREEMENT_VERSION = "AX-2026.09";

export const agreementClauses = [
  {
    id: "A",
    title: "No scrape",
    body: "Auctum never pulls a catalog. Listings enter only through this partnership — CSV, typed codes, or a later sync the seller turns on.",
  },
  {
    id: "B",
    title: "Named lots",
    body: "Every SKU must resolve to a lot already on the ledger. Cup score, origin, and the true-price math are not rewritten to sell the bag.",
  },
  {
    id: "C",
    title: "Affiliate first",
    body: "Auctum records the click, not the payment. Fulfillment and the customer relationship stay on the seller's store.",
  },
  {
    id: "D",
    title: "Notice",
    body: "Webhook if a URL is on file, email if it is not or if the hook is silent. The payload is signed. The seller may retry from the desk.",
  },
  {
    id: "E",
    title: "No extraction",
    body: "This launch takes no commission. A conversion acknowledgment is voluntary, so intent is never dressed up as a sale.",
  },
  {
    id: "F",
    title: "Badge is earned",
    body: "AUCTUM VERIFIED ORIGIN appears only after origin verification. It is not a placement the seller can buy.",
  },
] as const;

export type CatalogLine = {
  lotId: string;
  sku: string;
  format: ListingFormat;
  bagGrams: number;
  priceCents: number;
};

const FORMAT_ALIASES: Record<string, ListingFormat> = {
  "roasted-bag": "roasted-bag",
  roasted: "roasted-bag",
  bag: "roasted-bag",
  "green-kilo": "green-kilo",
  green: "green-kilo",
  kilo: "green-kilo",
  "green-sample": "green-sample",
  sample: "green-sample",
};

export function referralLink(storeUrl: string, orderId: string) {
  const joiner = storeUrl.includes("?") ? "&" : "?";
  const params = new URLSearchParams({
    "auctum-ref": orderId,
    utm_source: "auctum",
    utm_medium: "exchange",
    utm_campaign: "verified-origin",
  });
  return `${storeUrl}${joiner}${params.toString()}`;
}

export function parseCatalog(
  raw: string,
  lots: { id: string; code: string }[],
): { lines: CatalogLine[]; errors: string[] } {
  const errors: string[] = [];
  const lines: CatalogLine[] = [];
  const rows = raw
    .split(/\r?\n/)
    .map((r) => r.trim())
    .filter((r) => r && !r.startsWith("#"));
  if (!rows.length) return { lines, errors };
  const header = rows[0].toLowerCase();
  const start = header.includes(",") && (header.includes("lot") || header.includes("sku")) ? 1 : 0;
  const seen = new Set<string>();
  for (let i = start; i < rows.length; i++) {
    const row = rows[i]!;
    const n = i + 1;
    if (!row.includes(",")) {
      const lot = lots.find((l) => l.code === row || l.id === row);
      if (!lot) {
        errors.push(`Line ${n}: ${row} is not a lot on the ledger.`);
        continue;
      }
      lines.push({ lotId: lot.id, sku: lot.code, format: "green-kilo", bagGrams: 1000, priceCents: 900 });
      continue;
    }
    const cells = row.split(",").map((c) => c.trim());
    const [sku, lotCode, formatRaw, gramsRaw, priceRaw] = cells;
    const lot = lots.find((l) => l.code === lotCode || l.id === lotCode);
    const format = FORMAT_ALIASES[(formatRaw ?? "").toLowerCase()];
    const bagGrams = Number(gramsRaw);
    const priceCents = Number(priceRaw);
    let ok = true;
    if (!sku) {
      errors.push(`Line ${n}: SKU is required.`);
      ok = false;
    } else if (seen.has(sku)) {
      errors.push(`Line ${n}: duplicate SKU ${sku}.`);
      ok = false;
    }
    if (!lot) {
      errors.push(`Line ${n}: lot ${lotCode || "—"} is not on the ledger.`);
      ok = false;
    }
    if (!format) {
      errors.push(`Line ${n}: format must be roasted-bag, green-kilo, or green-sample.`);
      ok = false;
    }
    if (!Number.isInteger(bagGrams) || bagGrams < 50 || bagGrams > 25000) {
      errors.push(`Line ${n}: grams must be a whole number from 50 to 25000.`);
      ok = false;
    }
    if (!Number.isInteger(priceCents) || priceCents < 1) {
      errors.push(`Line ${n}: price must be integer cents.`);
      ok = false;
    }
    if (ok && sku && lot && format) {
      seen.add(sku);
      lines.push({ lotId: lot.id, sku, format, bagGrams, priceCents });
    }
  }
  return { lines, errors };
}

export const stationFile: Record<string, { lat: string; lng: string; label: string }> = {
  "lot-084": { lat: "12.780", lng: "108.080", label: "Cư M'gar station file" },
  "lot-110": { lat: "12.780", lng: "108.080", label: "Cư M'gar station file" },
  "lot-091": { lat: "12.003", lng: "108.418", label: "Lạc Dương station file" },
  "lot-102": { lat: "13.980", lng: "107.750", label: "Ia Grai station file" },
  "lot-044": { lat: "6.162", lng: "38.205", label: "Kochere station file" },
  "lot-018": { lat: "1.853", lng: "-76.051", label: "Pitalito station file" },
  "lot-022": { lat: "1.853", lng: "-76.051", label: "Pitalito station file" },
  "lot-007": { lat: "-0.546", lng: "36.956", label: "Othaya station file" },
};
