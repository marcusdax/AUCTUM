import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AGREEMENT_VERSION,
  type CartLine,
  type CatalogLine,
  type ClickRecord,
  type IntegrationModel,
  type Listing,
  type Review,
  type Seller,
  isReviewMark,
  listingById,
  orderIdFrom,
  referralLink,
  seedClicks,
  seedListings,
  seedReviews,
  seedSellers,
  sellerById,
  signPayload,
} from "./exchange";
import { useLedger } from "./store";

type PartnerDraft = {
  name: string;
  email: string;
  webhookUrl: string;
  storeUrl: string;
  integrationModel: IntegrationModel;
  signedName: string;
  catalog: CatalogLine[];
};

type ReviewDraft = {
  listingId: string;
  buyerName: string;
  buyerEmail: string;
  stars: number;
  asDescribed: number;
  fulfillment: number;
  body: string;
};

type ExchangeState = {
  sellers: Seller[];
  listings: Listing[];
  cart: CartLine[];
  clicks: ClickRecord[];
  reviews: Review[];
  buyerEmail: string;
  hydrated: boolean;
  markHydrated: () => void;
  setBuyerEmail: (email: string) => void;
  addToCart: (listingId: string) => void;
  setQty: (listingId: string, qty: number) => void;
  removeLine: (listingId: string) => void;
  clearCart: () => void;
  registerPartner: (draft: PartnerDraft) => string;
  verifySeller: (sellerId: string) => void;
  testWebhook: (sellerId: string) => string;
  retryClick: (clickId: string) => void;
  acknowledgeConversion: (clickId: string) => void;
  submitReview: (draft: ReviewDraft) => string | null;
  checkoutSeller: (sellerId: string) => string | null;
  reset: () => void;
};

function nowIso() {
  return new Date().toISOString();
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

function deliver(seller: Seller, body: string, forceFail = false): Pick<
  ClickRecord,
  "channel" | "status" | "attempts" | "statusCode" | "deliveredAt" | "signature" | "error"
> {
  const signature = signPayload(body, seller.apiKey);
  if (forceFail) {
    return {
      channel: seller.webhookUrl ? "webhook" : "email",
      status: "failed",
      attempts: 1,
      statusCode: 504,
      signature,
      error: "Webhook timed out. Email fallback queued.",
    };
  }
  if (seller.webhookUrl) {
    return {
      channel: "webhook",
      status: "delivered",
      attempts: 1,
      statusCode: 200,
      deliveredAt: nowIso(),
      signature,
    };
  }
  return {
    channel: "email",
    status: "delivered",
    attempts: 1,
    deliveredAt: nowIso(),
    signature,
  };
}

const seed = {
  sellers: seedSellers,
  listings: seedListings,
  cart: [] as CartLine[],
  clicks: seedClicks,
  reviews: seedReviews,
  buyerEmail: "",
};

export const useExchange = create<ExchangeState>()(
  persist(
    (set, get) => ({
      ...seed,
      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      setBuyerEmail: (email) => set({ buyerEmail: email.trim() }),
      addToCart: (listingId) =>
        set((s) => {
          const listing = listingById(s.listings, listingId);
          if (!listing?.live) return s;
          const existing = s.cart.find((c) => c.listingId === listingId);
          return {
            cart: existing
              ? s.cart.map((c) => (c.listingId === listingId ? { ...c, qty: c.qty + 1 } : c))
              : [...s.cart, { listingId, qty: 1 }],
          };
        }),
      setQty: (listingId, qty) =>
        set((s) => ({
          cart: qty < 1 ? s.cart.filter((c) => c.listingId !== listingId) : s.cart.map((c) => (c.listingId === listingId ? { ...c, qty } : c)),
        })),
      removeLine: (listingId) => set((s) => ({ cart: s.cart.filter((c) => c.listingId !== listingId) })),
      clearCart: () => set({ cart: [] }),
      registerPartner: (draft) => {
        const id = `sel-${Date.now()}`;
        const createdAt = nowIso();
        const seller: Seller = {
          id,
          name: draft.name.trim(),
          slug: slugify(draft.name) || id,
          email: draft.email.trim(),
          webhookUrl: draft.webhookUrl.trim() || null,
          storeUrl: draft.storeUrl.trim() || "https://store.example",
          apiKey: `ak_live_${id.slice(-6)}`,
          integrationModel: draft.integrationModel,
          verifiedAt: null,
          signedName: draft.signedName.trim(),
          signedAt: createdAt,
          agreementVersion: AGREEMENT_VERSION,
          createdAt,
          pitch: "Pending origin verification.",
          locale: "Onboarding",
        };
        const listings: Listing[] = draft.catalog.map((line, i) => ({
          id: `lis-${line.lotId}-${id}-${i}`,
          lotId: line.lotId,
          sellerId: id,
          sku: line.sku,
          format: line.format,
          bagGrams: line.bagGrams,
          priceCents: line.priceCents,
          live: false,
        }));
        set((s) => ({
          sellers: [seller, ...s.sellers],
          listings: [...listings, ...s.listings],
        }));
        return id;
      },
      verifySeller: (sellerId) =>
        set((s) => ({
          sellers: s.sellers.map((sel) =>
            sel.id === sellerId ? { ...sel, verifiedAt: nowIso(), pitch: sel.pitch === "Pending origin verification." ? "Verified origin. Listings live." : sel.pitch } : sel,
          ),
          listings: s.listings.map((l) => (l.sellerId === sellerId ? { ...l, live: true } : l)),
        })),
      testWebhook: (sellerId) => {
        const seller = sellerById(get().sellers, sellerId);
        if (!seller) return "";
        const at = new Date();
        const orderId = `test-${orderIdFrom(at)}`;
        const listing = get().listings.find((l) => l.sellerId === sellerId);
        const body = JSON.stringify({ event: "webhook.test", orderId, sellerId });
        const delivery = deliver(seller, body);
        const click: ClickRecord = {
          id: `clk-${at.getTime()}`,
          orderId,
          listingId: listing?.id ?? "lis-test",
          sellerId,
          lotId: listing?.lotId ?? "lot-084",
          buyerEmail: "desk@auctum.coffee",
          qty: 0,
          priceCents: 0,
          referralUrl: referralLink(seller.storeUrl, orderId),
          clickedAt: nowIso(),
          ...delivery,
        };
        set((s) => ({ clicks: [click, ...s.clicks] }));
        return click.id;
      },
      retryClick: (clickId) =>
        set((s) => {
          const click = s.clicks.find((c) => c.id === clickId);
          if (!click) return s;
          const seller = sellerById(s.sellers, click.sellerId);
          if (!seller) return s;
          const delivery = deliver(seller, JSON.stringify({ retry: click.orderId }));
          return {
            clicks: s.clicks.map((c) =>
              c.id === clickId ? { ...c, ...delivery, attempts: c.attempts + 1, error: delivery.error } : c,
            ),
          };
        }),
      acknowledgeConversion: (clickId) => {
        const click = get().clicks.find((c) => c.id === clickId);
        if (!click || click.convertedAt || click.status !== "delivered" || click.qty < 1) return;
        const seller = sellerById(get().sellers, click.sellerId);
        const at = nowIso();
        set((s) => ({
          clicks: s.clicks.map((c) => (c.id === clickId ? { ...c, convertedAt: at } : c)),
        }));
        useLedger.setState((ledger) => ({
          events: [
            {
              id: `ev-cv-${Date.now()}`,
              at,
              kind: "seller.conversion_ack",
              actor: seller?.name ?? click.sellerId,
              summary: `${seller?.name ?? "Seller"} acknowledged ${click.orderId}. Intent became a reported sale.`,
              lotId: click.lotId,
              accountId: seller?.accountId,
            },
            ...ledger.events,
          ],
        }));
      },
      submitReview: (draft) => {
        const email = draft.buyerEmail.trim().toLowerCase();
        const name = draft.buyerName.trim();
        const body = draft.body.trim();
        if (name.length < 2) return "A name has to sit on the note.";
        if (!email.includes("@")) return "Use the email from the handoff.";
        if (!isReviewMark(draft.stars) || !isReviewMark(draft.asDescribed) || !isReviewMark(draft.fulfillment)) {
          return "Each mark is a whole number from 1 to 5.";
        }
        if (body.length < 24) return "Say what happened. A sentence is the minimum.";
        if (body.length > 600) return "Keep the note under 600 characters.";
        const s = get();
        const listing = listingById(s.listings, draft.listingId);
        if (!listing?.live) return "That listing is not live.";
        const click = s.clicks.find(
          (c) => c.listingId === listing.id && c.buyerEmail.toLowerCase() === email && c.status === "delivered" && c.qty > 0,
        );
        if (!click) return "A note opens only after a delivered handoff for this listing, from this email.";
        if (s.reviews.some((r) => r.listingId === listing.id && r.buyerEmail.toLowerCase() === email)) {
          return "This email already filed a note on this listing.";
        }
        const at = nowIso();
        const review: Review = {
          id: `rev-${Date.now()}`,
          listingId: listing.id,
          sellerId: listing.sellerId,
          lotId: listing.lotId,
          orderId: click.orderId,
          buyerName: name,
          buyerEmail: email,
          stars: draft.stars,
          asDescribed: draft.asDescribed,
          fulfillment: draft.fulfillment,
          body,
          createdAt: at,
        };
        const seller = sellerById(s.sellers, listing.sellerId);
        set((state) => ({ reviews: [review, ...state.reviews] }));
        useLedger.setState((ledger) => ({
          events: [
            {
              id: `ev-rev-${Date.now()}`,
              at,
              kind: "review.filed",
              actor: name,
              summary: `${name} filed a buyer note on ${seller?.name ?? "a seller"}. Trust was not moved.`,
              lotId: listing.lotId,
              accountId: seller?.accountId,
            },
            ...ledger.events,
          ],
        }));
        return null;
      },
      checkoutSeller: (sellerId) => {
        const s = get();
        const seller = sellerById(s.sellers, sellerId);
        if (!seller) return null;
        const email = s.buyerEmail.trim();
        if (!email.includes("@")) return null;
        const lines = s.cart.filter((c) => {
          const listing = listingById(s.listings, c.listingId);
          return listing?.sellerId === sellerId;
        });
        if (!lines.length) return null;
        const at = new Date();
        const orderId = orderIdFrom(at);
        const clicks: ClickRecord[] = lines.map((line, i) => {
          const listing = listingById(s.listings, line.listingId)!;
          const body = JSON.stringify({
            event: "buyer.clicked_product",
            orderId,
            sellerId,
            productId: listing.lotId,
            listingId: listing.id,
            buyerEmail: email,
            qty: line.qty,
            price: listing.priceCents * line.qty,
          });
          const fail = seller.webhookUrl?.includes("fail") ?? false;
          const delivery = deliver(seller, body, fail);
          return {
            id: `clk-${at.getTime()}-${i}`,
            orderId,
            listingId: listing.id,
            sellerId,
            lotId: listing.lotId,
            buyerEmail: email,
            qty: line.qty,
            priceCents: listing.priceCents * line.qty,
            referralUrl: referralLink(seller.storeUrl, orderId),
            clickedAt: nowIso(),
            ...delivery,
          };
        });
        const remaining = s.cart.filter((c) => !lines.some((l) => l.listingId === c.listingId));
        set({ clicks: [...clicks, ...s.clicks], cart: remaining });
        const first = clicks[0];
        useLedger.setState((ledger) => ({
          events: [
            {
              id: `ev-${at.getTime()}`,
              at: nowIso(),
              kind: "buyer.clicked_product",
              actor: email,
              summary: `${email} handed off to ${seller.name} · ${orderId}`,
              lotId: first?.lotId,
              accountId: seller.accountId,
            },
            {
              id: `ev-${at.getTime()}-n`,
              at: nowIso(),
              kind: "seller.notified",
              actor: "Exchange",
              summary: `${seller.name} notified via ${first?.channel} (${first?.status}).`,
              lotId: first?.lotId,
              accountId: seller.accountId,
            },
            ...ledger.events,
          ],
        }));
        return first?.id ?? null;
      },
      reset: () => set({ ...seed, hydrated: true }),
    }),
    {
      name: "auctum-exchange-v2",
      skipHydration: true,
      partialize: (s) => ({
        sellers: s.sellers,
        listings: s.listings,
        cart: s.cart,
        clicks: s.clicks,
        reviews: s.reviews,
        buyerEmail: s.buyerEmail,
      }),
    },
  ),
);

export function cartCount(cart: CartLine[]) {
  return cart.reduce((n, l) => n + l.qty, 0);
}
