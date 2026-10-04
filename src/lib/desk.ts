import type { Role } from "./types";
import { ARCHETYPES, PROCESSES, RECIPES } from "./foundry";

export const TAB_SUMMARIES: { test: (path: string) => boolean; line: string }[] = [
  { test: (p) => p === "/", line: "The compass. Where the book is, and what is waiting." },
  { test: (p) => p.startsWith("/exchange"), line: "Named lots from named sellers. A click is not a purchase until the handoff." },
  { test: (p) => p.startsWith("/market"), line: "The trade sheet. Sample, offer, lock. The price on the lot is the price." },
  { test: (p) => p.startsWith("/education"), line: "What you may do, until when, and the shortest way back to allowed." },
  { test: (p) => p.startsWith("/crm"), line: "Who to write, why the churn number moved, and which lot is one step from fulfilled." },
  { test: (p) => p.startsWith("/spaces"), line: "A Space is a person. The story on it has to open a lot." },
  { test: (p) => p.startsWith("/stories"), line: "The feed is chronological. A note without a lot is not proof. Keeping a post does not move Trust." },
  { test: (p) => p.startsWith("/scan"), line: "Paper becomes a proposal. A person with a credential accepts it." },
  { test: (p) => p.startsWith("/payments"), line: "VietQR is a push. The memo is the match. Unmatched money stays visible." },
  { test: (p) => p.startsWith("/trust"), line: "A score that travels with the file. Documents, payments, cups, history, the agent who signed." },
  { test: (p) => p.startsWith("/agent"), line: "The field desk. Tasks, territory, a commission with a name on it." },
  { test: (p) => p.startsWith("/partners"), line: "A seller joins by signing, not by being scraped in." },
  { test: (p) => p.startsWith("/craft"), line: "Flavor Foundry. Two doors, one catalog. The menu is the method class. The recipe stays in the packet." },
  { test: (p) => p.startsWith("/foundry"), line: "The order engine is not open. This is the blueprint of the door." },
  { test: (p) => p.startsWith("/strategy"), line: "The roof holds. The bag is the campaign. A discount is not a save." },
  { test: (p) => p.startsWith("/ecosystem"), line: "One ledger, four doors, and a different value for each kind of person." },
  { test: (p) => p.startsWith("/autopsy"), line: "The file the mark on the bag opens. Name, price, cup, documents." },
  { test: (p) => p.startsWith("/pricing"), line: "Seats, not a checkout. The farmer is not a tier." },
  { test: (p) => p.startsWith("/eudr"), line: "Information, risk, mitigation. A packet on the ledger is not a statement to the EU." },
  { test: (p) => p.startsWith("/subscribe"), line: "The file, in front of the person who pays you. A name is recorded. A card is not." },
  { test: (p) => p.startsWith("/farmers"), line: "Your name, your plot, and the floor. You are not charged to be on the file." },
  { test: (p) => p.startsWith("/consumers"), line: "Open the mark. Read the farm, the price, and the cup." },
  { test: (p) => p.startsWith("/materials"), line: "Your logo on their receipt. The farmgate figure stays. A story that cannot open the lot is not printed." },
  { test: (p) => p.startsWith("/cart") || p.startsWith("/checkout") || p.startsWith("/handoff"), line: "Intent, then a signed handoff. The seller is told. You are not charged here." },
];

export function tabSummary(pathname: string) {
  return TAB_SUMMARIES.find((row) => row.test(pathname))?.line ?? "Verified, from origin. If it is not on the ledger, it is not on the bag.";
}

export type Persona = {
  role: Role;
  title: string;
  value: string;
  not: string;
};

export const PERSONAS: Persona[] = [
  { role: "farmer", title: "Producer", value: "A Space in your name, a farmgate that is written down, and a harvest note from a person. The floor is a payment, not a slogan.", not: "You are not marketed at. No one here sells you a revolution." },
  { role: "collector", title: "Collector", value: "The commission is visible, and so is your name on the capture. That is how a collector becomes an agent.", not: "A relationship you cannot show is not a relationship on this desk." },
  { role: "coop", title: "Cooperative", value: "Member lots stay attached to members. The mill, the EUDR file, and the cup all point at a person.", not: "The mill does not anonymize the bag." },
  { role: "exporter", title: "Exporter", value: "A catalog a buyer can audit, documents that gate the seal, and settlement that does not pay twice.", not: "Volume without a file is not a tier." },
  { role: "roaster", title: "Roaster", value: "Samples, unrounded cups, a lock that does not move, and an autopsy you can hand to a café.", not: "You do not need a sourcing department to see the price." },
  { role: "lab", title: "Cup desk", value: "The hundredths stay. Accepting a sheet requires a credential. The score does not become a badge.", not: "A library of articles will not clear you to sign." },
  { role: "importer", title: "Importer", value: "Packets you can defend, aging you can see, and a memo that matches the money.", not: "A story is not a phytosanitary certificate." },
  { role: "agent", title: "Field agent", value: "A territory, a queue of touches, and a commission that is not a rumor.", not: "Registration is not participation. One verified event is." },
];

export function answerDesk(raw: string) {
  const q = raw.toLowerCase().trim();
  if (!q) return "Ask about a process code, a cup, a role, or what a tab is for. I only use this desk.";

  if (/bleach|chlorine|saniti/.test(q)) {
    return "Do not use household bleach on anything that touches cherry, mucilage, or parchment. Chlorine taint does not cup out. Citric acid at 5–10 g per liter, or water above 80°C, is the field kit.";
  }
  if (/inocul|exact dose|recipe packet|proprietary|°c curve|temperature curve/.test(q)) {
    return "The menu sells the method class. Exact pitch rates, strain ratios, and house curves stay in the protocol packet. That packet is not issued yet. The foundry tab shows the door, not the order.";
  }
  if (/ph\b|endpoint|moisture|brix/.test(q)) {
    return "pH ends a ferment, not the clock. Washed lands near 4.0–4.5. A deep anaerobic can go to 3.8. Dry parchment to about 10–12% moisture. Log the reading or the gauge was a decoration.";
  }

  const process = PROCESSES.find((card) => q.includes(card.code.toLowerCase()) || q.includes(card.name.toLowerCase().slice(0, 12)));
  if (process) {
    return `${process.code} ${process.name}. ${process.tier}. ${process.mechanism} It fails as: ${process.failsAs} Routes toward ${process.routes.join(", ")}.`;
  }
  const archetype = ARCHETYPES.find((card) => q.includes(card.code.toLowerCase()) || q.includes(card.name.toLowerCase()));
  if (archetype) {
    return `${archetype.code} ${archetype.name}. ${archetype.cup} Primary route ${archetype.primary}. Alternate ${archetype.alternate}. The band ${archetype.band} is an estimate for a well-run lot, not a guarantee.`;
  }
  const recipe = RECIPES.find((card) => q.includes(card.name.toLowerCase().split(" ")[0]) && /recipe|washed|natural|honey|anaerobic|carbonic|yeast|lactic|fruit|phase/.test(q));
  if (recipe) return `${recipe.name}, standing at the tank. ${recipe.endpoint} ${recipe.warn}`;

  if (/loophole|circumvent|transship|reclassif|tariff engineer|bonded warehouse|just within the letter/.test(q)) {
    return "This desk does not look for a way around a rule. Map the plot. File the statement if you are the operator. Pay the duty the tariff names. If a code is wrong, a person corrects the document. They do not change the moisture to change the code.";
  }
  if (/rust|borer|nematode|soil test|yield|shade tree|what variety|geisha|robusta clone/.test(q)) {
    return "The picture does not diagnose the tree. Leaf rust, berry borer, and the soil still need a person on the plot. This desk will not name a variety or a yield from a satellite tile. The sitting is “What the picture is not.”";
  }
  if (/dry|drying|rain on|spread cherry|cover the bed/.test(q)) {
    return "If the reading shows rain, do not spread cherry. Cover what is already down. Wind without rain means drying can move. The moisture that ends the batch is a meter, about 10–12% on parchment, not a feeling. The sitting is “Read the sky before you dry.”";
  }
  if (/map|boundary|polygon|plot|geolocation/.test(q) && /draw|space|farmer|walk/.test(q)) {
    return "On the Space, the person who grows the coffee can walk the boundary. Corners are kept to six decimal places, the area is in hectares, and a line that crosses itself will not save. The GeoJSON is theirs. It does not clear the lot and it does not file a statement.";
  }
  if (/eudr|polygon|deforestation|due diligence/.test(q)) {
    return "Information, then risk, then mitigation. A point is allowed only for a plot of 4 hectares or less, and only to six decimal places. Over that, the boundary is a polygon. The cutoff is 31 December 2020, and the coffee also has to have been produced legally. Large and medium operators meet this from 30 December 2026. This desk does not file the due diligence statement, and it does not call a lot cleared.";
  }
  if (/pric|subscription|cropster|algrano|how much|per month|seat cost/.test(q)) {
    return "Consumer and Farmer are $0, and they are not subscriptions. Bar is $29 so a guest can open the farm from the card. Roaster is $49 for the mark and the lock. Trade and Export are $299, flat, for the importer and the exporter. None of those figures are billed. Register on Farmers, Consumers, or Register. Cropster Core starts near €95. Algrano’s own example takes about $0.60 to $0.90 a kilo.";
  }
  if (/curriculum|why learn|why finish|credential|track [a-f]/.test(q)) {
    return "The curriculum is not a library. Each person has a track, a track to leave alone, and a stake. A farmer reads the floor and the share, and payment is never gated on finishing. A collector attests the pass-through. A cupper who drifts past three points loses the score. A buyer learns which sentence the bag is allowed to carry. Track F gates nothing.";
  }
  const persona = PERSONAS.find((row) => q.includes(row.role) || q.includes(row.title.toLowerCase()));
  if (persona) return `${persona.title}. ${persona.value} ${persona.not}`;

  if (/foundry|process spine|outcome|menu|archetype/.test(q)) {
    return "Two doors, one catalog. If you know the method, start at a process code. If you know the cup, start at an archetype. They meet in the routes. Ordering is not open. The craft tab is the menu. The foundry tab is the blueprint.";
  }
  if (/persona|who is this for|profile|roaster|farmer|importer/.test(q)) {
    return PERSONAS.map((row) => `${row.title}: ${row.value}`).join(" ");
  }
  if (/tab|what is|crm|scan|space|autop/.test(q)) {
    const hit = TAB_SUMMARIES.find((row) => q.split(/\s+/).some((word) => word.length > 3 && row.line.toLowerCase().includes(word)));
    return hit?.line ?? "Each tab carries one sentence at the top of the page. Ask for a place by name: scan, payments, spaces, craft, strategy.";
  }
  if (/roaster|importer|café|cafe|hotel|restaurant|floor|subsistence|who is this for/.test(q)) {
    return "The first page is written for six people: a small roaster, an importer, an exporter or collector, a coffee shop, a drinker, and a restaurant or hotel. Each one gets the same file. The mark opens the autopsy, and the autopsy opens the Space. The floor is paid before the sale. Quality changes the share, not the floor. This desk shows that receipt. It does not yet pay it.";
  }
  if (/open|freemium|subscri|desk tier|what can i/.test(q)) {
    return "Open is free to read: the lot, the Space, the lesson, the scan proposal, and the foundry menu. Desk is the preview of a subscription: sample, offer, lock, and accepting a document. Nothing is billed on this sheet. Say who you are — drinker, farmer, business, or operator — and the line at the top of each door changes.";
  }
  if (/trust|review|note/.test(q)) {
    return "Buyer notes describe a handoff. They do not move Trust. Trust is documents, payments, cup consistency, history, and the agent who signed.";
  }
  return "I can answer a process code (WSH-01, ANA-01), an archetype (Lychee vault), a role (roaster, farmer), or a field question (pH, bleach, moisture). I will not invent a dose or a market figure.";
}
