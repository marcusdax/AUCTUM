import type { Lot } from "./types";

export type BagCopy = {
  headline: string;
  lede: string;
  body: string;
};

const AUTHORED: Record<string, BagCopy> = {
  "lot-084": {
    headline: "The honey week has a name",
    lede: "Trần Thị Mai turned the parchment at four and at sixteen. Forty-two hours. The lot is 084.",
    body: "Farmgate is on the receipt. The cup is unrounded. Scan the mark and the autopsy opens the same numbers the ledger holds — not a story standing in for them.",
  },
  "lot-091": {
    headline: "A mill that keeps the member",
    lede: "Washed Caturra from Lạc Dương, fermented eighteen hours, cupped at 85.17.",
    body: "The cooperative does not mill the name off the bag. The Space is the mill’s. The autopsy is the lot’s. A sample can leave. The score does not become a slogan.",
  },
  "lot-102": {
    headline: "Robusta, written as a number",
    lede: "Gia Lai, natural, member block 11. Cup 83.08. Farmgate named per pound.",
    body: "No apology and no costume. The bag carries the process, the elevation, and what was paid. Respect is the receipt.",
  },
  "lot-110": {
    headline: "The sister lot, already verified",
    lede: "Washed Typica from the same garden as 084. Moisture 10.9. Waiting on an offer, not on a myth.",
    body: "Đức’s verification is on the file. The Space still belongs to Mai. The mark opens this lot, not the garden in general.",
  },
  "lot-044": {
    headline: "Shade, and a file still open",
    lede: "Kochere garden lot. Cup 88.21. The station file is provisional, so the seal is not on the bag.",
    body: "Flavor is not permission. Until the documents are accepted, this page says so. The Space tells you who grows it. The autopsy tells you what is still missing.",
  },
  "lot-018": {
    headline: "Patio three, photographed",
    lede: "Pink Bourbon dried on tile in Pitalito. Cup 87.64. The offer is open.",
    body: "The geometry of the patio is a process control, not a mood. The bag mark opens the price, the cup, and Casa Huila’s Space.",
  },
  "lot-022": {
    headline: "Patio one, the natural",
    lede: "Huila Caturra, dried fig and cocoa, cup 86.11.",
    body: "Same farm, different patio, different process. The mark does not collapse them into one origin story.",
  },
  "lot-007": {
    headline: "The lock is the sentence",
    lede: "Othaya AA, cupped at 89.05, price-locked. The hundredths stayed.",
    body: "Nyeri Highlands FCS is named. The lock snapshot does not move. Scan the bag and you get the number that was written, not a later one.",
  },
};

export function autopsyPath(lotId: string) {
  return `/autopsy/${lotId}`;
}

export function publicAutopsyUrl(lotId: string) {
  return `https://auctum.coffee/autopsy/${lotId}`;
}

export function bagCopy(lot: Lot, producerName: string): BagCopy {
  const authored = AUTHORED[lot.id];
  if (authored) return authored;
  return {
    headline: `${producerName}, on the bag`,
    lede: `${lot.process} ${lot.varietal} from ${lot.origin.farm}. Cup ${lot.cupScore.toFixed(2)}.`,
    body: "The mark opens the autopsy for this lot: the name, the price, the documents. A story that cannot point at a file is not put on the bag.",
  };
}
