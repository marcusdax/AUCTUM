export type LandingPerson = {
  id: string;
  title: string;
  audience: "drinker" | "business";
  promise: string;
  connection: string;
  autopsy: string;
  floor: string;
  curriculum: string;
  protocol: string;
};

export const people: LandingPerson[] = [
  {
    id: "roaster",
    title: "Small roaster",
    audience: "business",
    promise: "You buy a named lot, not a blend with a caption.",
    connection: "The person who grew it is on the lot. You can write them, sample the coffee, and lock the price you were shown.",
    autopsy: "The mark on the bag opens the same receipt you locked against. Your customers can see the farmgate, the cup, and the documents. You do not write a second story.",
    floor: "The floor was paid before you bought. Your menu can name the price without asking the farmer to carry your risk.",
    curriculum: "Buyer literacy: how to read an unrounded score, what a retained sample still is, and which documents a European buyer will ask you for.",
    protocol: "A score you print has to survive the tolerance band. If the cup moves past it, the lot is downgraded on the file, and your bag copy has to move with it.",
  },
  {
    id: "importer",
    title: "Importer",
    audience: "business",
    promise: "The claim has a clock, a sample, and a person who was at fault.",
    connection: "You are not buying a story from an exporter and a different story from the farmer. Both point at one lot.",
    autopsy: "When a roaster asks what they are paying for, you send the autopsy. It is the file, not a PDF you assembled the night before.",
    floor: "The floor is the grower's. Your margin sits above it, in the open, on the receipt. A downgrade changes the share. It does not reach back and take the floor.",
    curriculum: "Read the verification record, then read the disposition. You do not need the adjudicator credential. You need the record it leaves: tier, tolerance, and where the chain broke.",
    protocol: "Retained sample, cupping panel, and the four endings — release, downgrade, reject, or partition. A claim without the sealed sample is an argument. A claim with it is a file.",
  },
  {
    id: "collector",
    title: "Exporter and collector",
    audience: "business",
    promise: "You are paid for the work of gathering. You do not keep the farmer's share.",
    connection: "Every bag names the farms in it. A collector who cannot say who grew the coffee does not get the mark.",
    autopsy: "The autopsy shows the pass-through. A farmer can open the same page you send a buyer, and the numbers have to match.",
    floor: "You remit the farmer's floor within three business days of receiving yours. At least eighty percent of the revenue share on their coffee goes to them. Your aggregation fee is paid beside that, not out of it.",
    curriculum: "You are paid twice. How to read the receipt. What a score does to the share. When a protocol change has to be said out loud before the coffee ships.",
    protocol: "Undisclosed fermentation is an exception, not a surprise on the cupping table. Documents enter as proposals. A person accepts them. The cabinet keeps the sample until the claim window closes.",
  },
  {
    id: "cafe",
    title: "Coffee shop",
    audience: "business",
    promise: "The guest can check the bag without asking the barista to perform.",
    connection: "The farm is a Space, not a paragraph on a chalkboard. Follow it. The next lot from that person shows up as a lot, not as a post.",
    autopsy: "One mark on the bag. The guest opens the autopsy: name, cup, price, documents. The story is on that page because the lot earned it.",
    floor: "You can say the grower was paid a floor that does not depend on your pour. You cannot say more than the receipt says.",
    curriculum: "Enough to stop a barista inventing a process. What the score means. What the sample is. What you may write on the card.",
    protocol: "If the lot is downgraded, the card changes. The shop does not keep last season's sentence after the file has moved.",
  },
  {
    id: "drinker",
    title: "Drinker",
    audience: "drinker",
    promise: "You can see who grew it, what it scored, and what they were paid. You are not asked to subscribe for that.",
    connection: "The Space is a room with a person in it. You can follow them. You cannot lock their coffee. That is someone else's job.",
    autopsy: "Scan the bag. The page is the autopsy. From there you can enter the Space. The story does not open unless the lot does.",
    floor: "The floor is how you know the name on the bag was not a costume. It was paid before the coffee was sold on.",
    curriculum: "A short lesson in reading the page: the score, the sample, and the difference between a document on the file and a sentence on the bag.",
    protocol: "You will not be in the cupping room. The rules are why the number on the bag is allowed to be there.",
  },
  {
    id: "hospitality",
    title: "Restaurant and hotel",
    audience: "business",
    promise: "Procurement and the dining room share one file.",
    connection: "The purchaser locks a lot. The floor serves it. The guest scans the same mark. Nobody is translating between a spreadsheet and a speech.",
    autopsy: "Purchasing keeps the autopsy. The menu prints the name and the price it already shows. A banquet for two hundred uses the same page a single guest can open.",
    floor: "A hotel can put the farmgate on a menu card because the floor is a line on the receipt, not a claim the marketing team added.",
    curriculum: "Buyer literacy for the person who signs the order, and the same short reading for the person who talks about the cup at the table.",
    protocol: "Weight, moisture, and cup are checked against a sample that is still in a cabinet. If identity fails, the lot does not stay on the list because the brochure already went to print.",
  },
];

export const protocols = [
  {
    id: "cup",
    title: "Cupping",
    line: "A score is a procedure. Three bowls. A panel when the score moves money. Tolerance narrows as custody gets worse. A moldy cup does not get talked into a lower tier.",
  },
  {
    id: "sample",
    title: "Retained sample",
    line: "One bag from the middle, sealed before it is stored, signed by two people. It is the ground truth for every later cup. If it is lost, the claim does not proceed on memory.",
  },
  {
    id: "exception",
    title: "Exception",
    line: "Four endings: release, downgrade, reject, or split the damaged bags into their own lot. Fault sits where the chain broke. The hold is physical. The status is on the file the buyer can see.",
  },
  {
    id: "floor",
    title: "Floor and share",
    line: "Paid twice. The floor at delivery, then a share of what is left when the lot sells. A better cup takes a larger share. The floor is not clawed back because the sale disappointed, except where fraud is confirmed.",
  },
];
