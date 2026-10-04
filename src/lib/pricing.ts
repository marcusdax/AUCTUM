import type { Audience, Tier } from "./seat";

export const jobs = [
  {
    job: "Log the roast",
    them: "Artisan is free and stays on one computer. RoastPATH is $9 to $129. RoastLog starts at $129 and does not charge by the pound. Cropster starts free and then from €95, and adds a volume charge after 250 kg.",
    us: "We do not do this. A roaster keeping Cropster or Artisan should not be asked to pay again for a curve.",
  },
  {
    job: "Run the roastery",
    them: "RoasterTools is the wholesale desk: Organize is $199 a month, or $166 billed annually, with 5,000 lb included and then $0.05 a pound. Automate is $499 or $416, Scale $999 or $833, RT Plus $2,300 or $1,917. Cropster Commerce and Scale sit in the same neighborhood, from €275 up.",
    us: "Orders, Shopify, and production planning are their product. A lock on a named lot is ours. We should not grow a per-pound overage to imitate them.",
  },
  {
    job: "Buy the green",
    them: "Algrano and TYPICA are not subscriptions. The producer sets the price. Algrano’s published example takes $0.60 to $0.90 a kilo as a service fee, before freight. TYPICA will sell one 60 kg bag and shows a cost breakdown on the offer. The rate of their own fee is not on a public rate card. Farmer Connect and Bext360 sell traceability to the brand. Bext360’s producer plan is free. Farmer Connect does not publish a seat price.",
    us: "Open is free for the person who grew it. Trade is a flat $299 proposal for the importer, with no cut that rises when the farm price rises. The logistics of a single-bag import are not built.",
  },
  {
    job: "Prove the bag",
    them: "Thank My Farmer is a QR on a brand’s bag. The story is the brand’s. Cropster will cup, as a module, and sample management is €199 on top. Nobody in this list gates a signature on a credential that expires, or keeps the retained sample as the claim.",
    us: "The mark opens the autopsy, and the autopsy opens the Space. The score that moves money needs a named cupper. The sample outlives the argument. That is the seat, and it is the only one of these four jobs we are pricing.",
  },
];

export type PlanId = "consumer" | "farmer" | "bar" | "roaster" | "trade" | "export";

export type Plan = {
  id: PlanId;
  title: string;
  price: string;
  cadence: string;
  who: string;
  brief: string;
  point: string;
  includes: string[];
  excludes: string[];
  audience: Audience;
  tier: Tier;
};

export const plans: Plan[] = [
  {
    id: "consumer",
    title: "Consumer",
    price: "$0",
    cadence: "Not a subscription.",
    who: "Anyone who drinks the coffee.",
    brief: "Open the mark. Read the farm, the price, and the cup.",
    point: "The bag is the door. There is nothing to buy on this seat, and nothing is held back until you pay.",
    includes: ["The lot, the autopsy, and the Space", "The story that can open a lot"],
    excludes: ["A lock", "A shop card", "A fee to read"],
    audience: "drinker",
    tier: "open",
  },
  {
    id: "farmer",
    title: "Farmer",
    price: "$0",
    cadence: "Not a subscription. Payment is never gated on this seat.",
    who: "The person who grew the coffee.",
    brief: "Your name, your plot, and the floor. You are not charged to be on the file.",
    point: "The map, the rain, and the three sittings are yours. A buyer’s seat does not send you a bill.",
    includes: ["The Space in your name", "The boundary, the satellite, and the rain reading", "The floor line, when a lot has one", "Three field sittings. None of them gate the floor"],
    excludes: ["A charge to draw the plot", "A charge to be listed", "A lock, which is the buyer’s seat"],
    audience: "farmer",
    tier: "open",
  },
  {
    id: "bar",
    title: "Bar",
    price: "$29",
    cadence: "Proposed, per location, per month. Not billed.",
    who: "A coffee shop, a restaurant, or a hotel that pours and does not buy green.",
    brief: "The card on the counter opens the farm.",
    point: "The guest opens the farm from the card. You hear when that lot is held. Reading the file was already free.",
    includes: ["Everything a consumer can already read", "A location tied to the lots it pours", "The mark a guest can open", "The hold, the downgrade, and the reject, on the card"],
    excludes: ["A lock on green", "Roast curves", "Shot-level waste"],
    audience: "business",
    tier: "open",
  },
  {
    id: "roaster",
    title: "Roaster",
    price: "$49",
    cadence: "Proposed, per roastery, per month. Not billed.",
    who: "A small roaster buying named lots.",
    brief: "The mark on your bag, and the lock behind it.",
    point: "The mark on the bag opens your file. The subscription is that mark, and the lock behind it. It is not a roast logger.",
    includes: ["Everything a consumer can already read", "Sample, offer, and lock", "The mark on the bag, opening this file"],
    excludes: ["Roast profiles and machine curves", "A per-pound or per-kilo cut", "Closing an exception"],
    audience: "business",
    tier: "desk",
  },
  {
    id: "trade",
    title: "Trade",
    price: "$299",
    cadence: "Proposed, per importer desk, per month. Not billed.",
    who: "An importer handing a file to a roaster.",
    brief: "The file you hand a roaster. The fee does not rise with the farm.",
    point: "A flat desk. The fee does not rise because the farmer’s price rose. The EU book and the documents travel with the lot.",
    includes: ["The roaster seat", "The claim record: tier, clock, sample, fault", "The EU book and document intake on the lots this desk owns"],
    excludes: ["A percentage of FOB", "A matchmaking toll on a new farmer", "Cropster-style production planning"],
    audience: "business",
    tier: "desk",
  },
  {
    id: "export",
    title: "Export",
    price: "$299",
    cadence: "Proposed, per exporter desk, per month. Not billed.",
    who: "An exporter publishing lots. Being listed stays free. This is the book a buyer audits.",
    brief: "The book a buyer audits. Appearing on the sheet stays free.",
    point: "The plot, the packet, and the mark, in your name. The farmer is not charged for the map, and the fee is not a cut of the bag.",
    includes: ["A catalog a buyer can open", "The EU book across the lots you publish", "Document intake, accepted by a person"],
    excludes: ["A toll just to appear on the sheet", "A percentage of farmgate", "Charging the farmer to draw the boundary"],
    audience: "business",
    tier: "desk",
  },
];

export const subscribeBenefits = [
  {
    who: "Coffee shop",
    seat: "Bar" as PlanId,
    line: "A guest opens the farm from the card on the counter. You are told when that lot is held.",
  },
  {
    who: "Roaster",
    seat: "Roaster" as PlanId,
    line: "The mark on the bag opens the autopsy, and the autopsy opens the Space. The lock is the same seat.",
  },
  {
    who: "Importer",
    seat: "Trade" as PlanId,
    line: "You hand a roaster a file: the plot, the cup, the claim, and the EU book. The fee does not rise with the farm price.",
  },
  {
    who: "Exporter",
    seat: "Export" as PlanId,
    line: "A buyer audits the lots in your name. Listing was already free. This seat is the packet and the mark.",
  },
];

export const neighbors = [
  {
    name: "Cropster",
    model: "Roast log, inventory, and café machines. Not a trade file.",
    prices: [
      "Starter is published as free.",
      "Core from €95 a month, Scale from €275, Advanced from €999. The final bill adds volume after 250 kg roasted.",
      "Café from €39 a month per espresso machine. Origin, for a mill, from €199.",
      "Sample management is a €199 add-on. The API is €100. Annual plans take 10 percent off.",
      "A growth kit for a new customer under 250 kg, with up to three machines, is $79 or €69 a month for a year.",
    ],
    note: "Their own pages disagree on the free cap: one describes Starter at up to 200 roasts and a 6 kg machine, another describes a free plan at 10 roasts a month. Treat the starting prices as the solid figures.",
  },
  {
    name: "RoastPATH",
    model: "Roast profiles in the cloud. No green trade.",
    prices: [
      "Hobby is free: one machine, one roaster, three days of profile history.",
      "Small is $9 a month. Medium is $79. Large is $129, up to four machines.",
      "They publish zero per-pound fees.",
    ],
    note: "Useful as the floor of roasting software. It is not a comparable product. It is the price of a curve.",
  },
  {
    name: "RoastLog",
    model: "Roast profiles, cupping notes, and green inventory. A flat subscription. No volume meter.",
    prices: [
      "Starter is $129 a month. Three users, one roastery, profiles, and cupping notes tied to the roast.",
      "Growth is $249. Five users, two locations, inventory, and sample grading.",
      "Scale is $499. Unlimited users and locations, and contracted coffee.",
    ],
    note: "Closer to Cropster than to us, and honest about not charging more because you roasted more. Still a roasting system.",
  },
  {
    name: "RoasterTools",
    model: "Wholesale orders, production planning, and a portal. The bill includes a pound allowance and then an overage.",
    prices: [
      "Organize is $199 a month, or $166 if you pay annually. Five thousand pounds included, then $0.05 a pound.",
      "Automate is $499 or $416, fifteen thousand pounds, then $0.04.",
      "Scale is $999 or $833, thirty-five thousand pounds, then $0.02. RT Plus is $2,300 or $1,917, one hundred twenty thousand pounds, then $0.01.",
    ],
    note: "This is the system a roaster uses to ship bags to cafés. It is not a file on the farmer. The overage is the clause we are refusing.",
  },
  {
    name: "Artisan",
    model: "Open-source roast curves.",
    prices: ["Free. It lives on a machine in the roastery. Support is the community, not a desk."],
    note: "The reason a micro-roaster does not need a subscription to record a curve. Also the reason our $49 cannot be sold as roasting software.",
  },
  {
    name: "Algrano",
    model: "A marketplace and a logistics desk. The producer sets FOB. The roaster pays a service fee per kilo, not a subscription.",
    prices: [
      "A producer’s sales tools are free. Listing on the marketplace is a waitlisted Verified Seller program. The matchmaking fee, when Algrano introduces a buyer, is unpublished, and they describe it as running for three years.",
      "On their own example of a $9 a kilo producer price, a level-2 service fee is $0.90 a kilo and freight is about $1.28, landed $11.18. Level 4 is a $0.60 service fee and about $0.47 freight, landed $10.07.",
      "That is $36 to $54 of service fee on a single 60 kg bag, before freight, and it falls as volume rises. The percent of the matchmaking fee is not published.",
    ],
    note: "A flat trade desk only makes sense next to this if we refuse the cut. A fee that tracks the farmer’s price is the thing this ledger is built not to do.",
  },
  {
    name: "TYPICA",
    model: "Direct trade from one 60 kg bag. The producer sets the price. Their staff cup and move the contract.",
    prices: [
      "No public subscription.",
      "The offer shows freight, import, and their fee inside the breakdown. The fee’s rate is not published as a card.",
      "A roaster can buy one bag. A container is not the minimum.",
    ],
    note: "The feature we do not have yet is the import itself. The feature they do not sell is a credential, a retained sample you control, or a floor that is separate from their margin.",
  },
  {
    name: "Bext360",
    model: "Traceability and EUDR polygons.",
    prices: [
      "The producer plan is published as free: the app, the parcel, the polygon, the practice log.",
      "The brand side is a demo. No public seat price.",
    ],
    note: "The pattern worth keeping: the person at origin does not rent the right to be on the map.",
  },
  {
    name: "Farmer Connect",
    model: "A brand’s QR. Thank My Farmer tells the story the brand filed.",
    prices: ["No public seat price. Built for large buyers, not for a roaster’s monthly bill."],
    note: "They have the mark on the bag. The page belongs to the brand. Ours has to belong to the lot, or it is the same product with worse distribution.",
  },
];
