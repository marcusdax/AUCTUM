export type Tier = "HOUSE" | "SEMI" | "DE NOVO";

export type ProcessCard = {
  code: string;
  name: string;
  family: string;
  tier: Tier;
  mechanism: string;
  signature: string;
  failsAs: string;
  routes: string[];
};

export type ArchetypeCard = {
  code: string;
  name: string;
  family: string;
  band: string;
  cup: string;
  primary: string;
  alternate: string;
};

export type RecipeCard = {
  id: string;
  name: string;
  maps: string;
  endpoint: string;
  warn: string;
  steps: string[];
};

export const DIALS = [
  ["Oxygen", "Open tank to sealed blanketing. Ester character is an oxygen-limited path."],
  ["Temperature", "A curve, not a number. Every 5°C of hold roughly halves the usable window."],
  ["Duration", "Land in late plateau. Clock time without a stage is not a protocol."],
  ["pH", "The kill switch. Fast drop is bright. Slow drop is creamy. Overshoot below 3.3 does not come back."],
  ["Inoculum", "Wild keeps terroir. A named strain keeps the next season. Past a point you do not get both."],
  ["Substrate", "Mucilage, intact cherry, added fruit. More fuel, longer runway, wider mouth toward defect."],
  ["Vessel", "Steel, polymer, oak, clay, concrete. The tank is a flavor input."],
  ["Agitation", "Static lots stratify. Movement spends some ester and buys a cup that matches itself."],
  ["Drying", "A flawless ferment dried carelessly is a failed ferment. Land moisture and water activity on purpose."],
] as const;

export const PROCESSES: ProcessCard[] = [
  { code: "WSH-01", name: "Classic submerged washed", family: "Washed", tier: "HOUSE", mechanism: "Depulped parchment in water. Native flora clear pectin. Ferment is a cleaning, not a costume.", signature: "Jasmine, lemon zest, green apple. Citric to malic. Tea-like body.", failsAs: "Stall: vegetal, papery. Over-run: sour, onion in the finish.", routes: ["A-0101", "A-0202", "A-1401"] },
  { code: "WSH-03", name: "Double washed", family: "Washed", tier: "HOUSE", mechanism: "Two ferments and a clean-water rest. The Kenyan shape. Water quality in the second soak is the hinge.", signature: "Blackcurrant, tomato leaf, phosphoric acidity, a longer finish than the body suggests.", failsAs: "A bad second soak goes flat and papery. The currant does not survive it.", routes: ["A-0401", "A-1104"] },
  { code: "WSH-05", name: "Mechanical demucilage", family: "Washed", tier: "HOUSE", mechanism: "Mucilage stripped at the depulper. No microbial phase. The zero point beside any trial from the same day-lot.", signature: "Cereal, nut, whatever acidity the site already had. A photograph of the bean.", failsAs: "Rarely fails. Often underwhelms. Mechanical damage to parchment is the real risk.", routes: ["A-0801", "A-1404"] },
  { code: "NAT-01", name: "Sun-dried natural", family: "Natural", tier: "HOUSE", mechanism: "Whole cherry dries intact. Sugar migrates inward for days. Addition, not subtraction.", signature: "Fruit load, body, sweetness. The highest ceiling in the catalog and the widest defect door.", failsAs: "Vinegar, nail-polish, or a stewed note when the bed is thick or the sun is sudden.", routes: ["A-0501", "A-0802"] },
  { code: "HON-02", name: "Yellow honey", family: "Honey", tier: "HOUSE", mechanism: "Part of the mucilage stays. Ferment happens on the bed, not in a tank. Shade scales with sugar left on the seed.", signature: "Stone fruit and a rounder sweetness than a full wash, without the weight of a natural.", failsAs: "Clumps. Parchment sticks, dries unevenly, and molds in the middle of the mass.", routes: ["A-0302", "A-0901"] },
  { code: "ANA-01", name: "Anaerobic washed", family: "Anaerobic", tier: "HOUSE", mechanism: "Sealed after depulping. Self-generated carbon dioxide. Ester load rises while the wash keeps the cup readable.", signature: "Condensed fruit, a lactic edge, intensity without leaving the washed family.", failsAs: "Past plateau: solvent, or peach that sat out.", routes: ["A-0602", "A-0901"] },
  { code: "CBM-01", name: "Carbonic maceration", family: "Carbonic", tier: "HOUSE", mechanism: "Intact cherry under carbon dioxide. Metabolism starts inside the fruit. Skins must stay whole.", signature: "Confectionary lift, bright red fruit, florals. Cut-test at 72 hours.", failsAs: "Crushed fruit becomes an ordinary ferment with a carbon dioxide story on top.", routes: ["A-0701", "A-0402"] },
  { code: "YST-06", name: "Pichia kluyveri", family: "Yeast", tier: "HOUSE", mechanism: "A named pitch outcompetes the resident flora and steers esters. Dose and rehydration live in the packet, not on this menu.", signature: "Tropical lift with more batch agreement than a wild tank. A typical cup-score move of half a point to a point and a half is a direction, not a promise.", failsAs: "Under-pitching makes a muddle worse than wild or commercial alone.", routes: ["A-0601", "A-0602"] },
  { code: "BAC-01", name: "Lactic culture", family: "Bacterial", tier: "HOUSE", mechanism: "Lactic acid bacteria under a seal, warmer than a yeast tank. The drop is fast. The body goes creamy.", signature: "Round acidity, cultured dairy, fruit that stays clean if you stop at the endpoint.", failsAs: "Hold it and the acetic organisms arrive. Vinegar is not a style.", routes: ["A-0901", "A-0903"] },
  { code: "COF-01", name: "Stone-fruit co-ferment", family: "Co-ferment", tier: "SEMI", mechanism: "Declared fruit, food-safe, mold-free, mixed through the mass. Every added material is named on the order.", signature: "The fruit you added, if you landed in plateau. Stewed notes mean you missed it.", failsAs: "Spoilage. Extra sugar is an invitation. Residue on a shared drying bed contaminates the next lot.", routes: ["A-0301", "A-0304"] },
  { code: "DRY-02", name: "Raised-bed drying", family: "Drying", tier: "HOUSE", mechanism: "Air under the bed, thin layers, turning while the outside is still wet. This is where two lots of the same ferment become different coffees.", signature: "Volatiles kept, moisture even, a cup that still tastes like the protocol at month four.", failsAs: "Case-hardening, then a stale core. Or a slow bed in humid air: must and cardboard.", routes: ["A-1401", "A-0801"] },
  { code: "SEQ-03", name: "Split-lot recombination", family: "Sequential", tier: "SEMI", mechanism: "One farm, one day-lot, three processes, blended back by role. A story you can defend because the cherry was the same morning.", signature: "One loud part, three quiet ones. Two loud ferments usually cancel.", failsAs: "Mud. And a roast that cannot hold components of different density.", routes: ["A-0604", "A-1004"] },
];

export const ARCHETYPES: ArchetypeCard[] = [
  { code: "A-0101", name: "Alabaster", family: "Crystalline", band: "88.0–91.0", cup: "White flower, wet stone, a finish that stays thin on purpose.", primary: "WSH-01", alternate: "WSH-05" },
  { code: "A-0202", name: "Bergamot line", family: "Citrus", band: "87.0–90.0", cup: "Bergamot, white grape, acidity that is articulate rather than loud.", primary: "WSH-01", alternate: "ANA-01" },
  { code: "A-0301", name: "Nectarine hour", family: "Stone fruit", band: "86.5–89.0", cup: "Nectarine and a clean sweetness. Not jam.", primary: "HON-02", alternate: "COF-01" },
  { code: "A-0401", name: "Live wire", family: "Red berry", band: "87.5–90.5", cup: "Currant, tart cherry, a savory thread under the fruit.", primary: "WSH-03", alternate: "CBM-01" },
  { code: "A-0602", name: "Lychee vault", family: "Tropical", band: "88.5–92.0", cup: "Lychee and high esters. Reproducible only with a named inoculum.", primary: "YST-06", alternate: "ANA-01" },
  { code: "A-0801", name: "Praline", family: "Chocolate", band: "84.0–86.5", cup: "Nut, cocoa, a quiet sugar. The control cup beside a loud trial.", primary: "WSH-05", alternate: "DRY-02" },
  { code: "A-0901", name: "Silk register", family: "Lactic", band: "86.5–89.0", cup: "Cream, low perceived acidity, fruit that does not shout.", primary: "BAC-01", alternate: "HON-02" },
  { code: "A-1104", name: "Tomato leaf", family: "Savory", band: "87.0–90.0", cup: "Tomato leaf, herb, umami. A washed intensity, not a co-ferment costume.", primary: "WSH-03", alternate: "SEQ-03" },
  { code: "A-1401", name: "Weightless", family: "Tea", band: "88.0–91.5", cup: "Tea, florals, almost no process signature. The bean has to deserve it.", primary: "WSH-01", alternate: "DRY-02" },
];

export const RECIPES: RecipeCard[] = [
  { id: "r1", name: "Classic washed", maps: "WSH-01", endpoint: "pH 4.0–4.5 and a gritty parchment. 12–36 h. Dry to 10–12%.", warn: "If pH is still above 5.0 after 36 h, check the tank temperature before you wait longer.", steps: ["Depulp same-day cherry. Discard floaters.", "Record start pH and temperature. Fresh mucilage is about 5.5–6.0.", "Read pH every 6 hours. Wash the moment the mucilage slips.", "Dry to 10–12%, turning through the first 48 hours."] },
  { id: "r2", name: "Sun-dried natural", maps: "NAT-01", endpoint: "11–12% moisture, stable across two readings. 15–25 days. Rest 10–15 days.", warn: "Vinegar or nail-polish before day 10 means the bed is too thick or too hot.", steps: ["Ripe cherry only. A single layer, 2–3 cm.", "Shade the first 3–5 days.", "Turn often while the skin is wet.", "Full sun once the skin is leathery. Rest before hulling."] },
  { id: "r3", name: "Honey spectrum", maps: "HON-02", endpoint: "10–12% moisture. White dries fastest. Black needs the most shade.", warn: "Clumps are the failure. Turn hard for the first three days.", steps: ["Depulp same day. No tank soak.", "Leave 10–20% mucilage for white, up to nearly all for black.", "Match shade to the sugar you left on.", "Dry to 10–12%."] },
  { id: "r4", name: "Anaerobic", maps: "ANA-01", endpoint: "48–120 h. Fruity lands at pH 4.2–4.5. Deep lands at 3.8–4.2.", warn: "Do not break the seal more than once a day.", steps: ["Leave 10–15% headspace. Seal with an airlock.", "Hold 18–25°C if you can, even with shade and burial.", "Read pH on a schedule. A slowing airlock is the second sign.", "Wash or move to beds. Dry to 10–12%."] },
  { id: "r5", name: "Carbonic maceration", maps: "CBM-01", endpoint: "72–120 h at 18–22°C. Cut-test at 72 h: soft, aromatic, not sour.", warn: "Skins stay intact. Dry ice must not touch the fruit.", steps: ["Load whole cherry. Displace oxygen.", "Seal.", "Cut-test at 72 h, then in 12 h steps.", "Finish as a natural or a short wash. Dry to 10–12%."] },
  { id: "r6", name: "Yeast pitch", maps: "YST-06", endpoint: "24–72 h. End pH 4.0–4.5. Ale 18–22°C, wine 15–20°C.", warn: "Never rehydrate above 40°C or in chlorinated water.", steps: ["Rehydrate in clean water at 35–40°C for 15–20 minutes.", "Pitch evenly. The packet sets the dose.", "Seal or leave open on purpose. They are different coffees.", "Stop at the endpoint. Dry to 10–12%."] },
  { id: "r7", name: "Lactic", maps: "BAC-01", endpoint: "12–24 h at 28–35°C. End pH 3.8–4.2.", warn: "It moves fast. Read pH every 4–6 hours.", steps: ["Depulp. Add the culture and mix.", "Seal.", "Hold warmer than a yeast tank.", "Wash as soon as the endpoint arrives."] },
  { id: "r8", name: "Two phases", maps: "SEQ-03", endpoint: "Each phase keeps its own endpoint. One log shows the join.", warn: "Do not stretch phase one because the cup is interesting. Start phase two.", steps: ["Run the first recipe to its own endpoint.", "Open or drain. Start the second recipe immediately.", "Keep both pH curves on one line.", "Wash and dry when phase two ends."] },
  { id: "r9", name: "Fruit co-ferment", maps: "COF-01", endpoint: "Fruit at 10–20% of weight. 18–24°C. End pH 4.0–4.4. Clean fruit, not stewed.", warn: "Moldy fruit is not a use for fruit. Dry this lot away from the others.", steps: ["Sanitize harder than any other recipe. Citric acid, not bleach.", "Mix the fruit through. Do not layer it.", "Read pH every 8–12 hours.", "Wash all residue off. Dry apart."] },
];

export const FAMILIES = [...new Set(PROCESSES.map((p) => p.family))];
