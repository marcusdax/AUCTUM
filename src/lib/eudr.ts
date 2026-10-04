import { stationFile } from "./exchange";
import type { DocumentRecord, Lot } from "./types";

export const EUDR_CUTOFF = "2020-12-31";

export type EudrState = "absent" | "pin" | "incomplete" | "packet";

export type EudrLine = { label: string; ok: boolean; detail: string };

export type EudrAssessment = {
  state: EudrState;
  mark: string;
  headline: string;
  lines: EudrLine[];
};

export function assessEudr(lot: Lot, docs: DocumentRecord[]): EudrAssessment {
  const pin = stationFile[lot.id];
  const packet = docs.find((doc) => doc.lotId === lot.id && doc.kind === "eudr" && doc.status !== "rejected");
  const accepted = packet?.status === "accepted";
  const polygons = packet?.fields.polygons ?? "";
  const unfinished = /second gps|pin only|not a polygon/i.test(`${packet?.notes ?? ""} ${polygons}`);
  const namesPolygon = /polygon/i.test(polygons) && !unfinished;
  const warranty = /clear|none after|not deforest/i.test(packet?.fields.deforestation ?? "");

  const lines: EudrLine[] = [
    { label: "Farm", ok: Boolean(lot.origin.farm), detail: `${lot.origin.farm}, ${lot.origin.region}` },
    {
      label: "Geolocation",
      ok: false,
      detail: pin
        ? `Station pin ${pin.lat}, ${pin.lng} · ${pin.label}. A point is allowed only at or under 4 hectares, and only to six decimal places. This pin is neither.`
        : "No coordinates on this lot. A product without a plot cannot be placed on the Union market.",
    },
    {
      label: "Plot area",
      ok: false,
      detail: "Not on the file. Over 4 hectares the boundary has to be a polygon. Without the area, a pin cannot be treated as enough.",
    },
    {
      label: "Polygon",
      ok: Boolean(accepted && namesPolygon),
      detail: packet
        ? `${polygons}${packet.notes ? `. ${packet.notes}` : ""}`
        : "No geolocation packet.",
    },
    {
      label: "After 31 Dec 2020",
      ok: Boolean(accepted && warranty && namesPolygon),
      detail: packet?.fields.deforestation
        ? `The packet says “${packet.fields.deforestation}.” The cutoff is ${EUDR_CUTOFF}.`
        : "No warranty that the plot was not deforested after the cutoff.",
    },
    {
      label: "Accepted by a person",
      ok: Boolean(accepted),
      detail: packet ? `Packet status: ${packet.status}.` : "Nothing has been captured.",
    },
    {
      label: "Due diligence statement",
      ok: false,
      detail: "This desk does not file one. A packet on the ledger is not a submission to the EU information system.",
    },
  ];

  if (accepted && namesPolygon) {
    return {
      state: "packet",
      mark: "EU · packet, no statement",
      headline: "The packet is on the ledger. The statement to the EU is not.",
      lines,
    };
  }
  if (packet) {
    return {
      state: "incomplete",
      mark: "EU · in review",
      headline: unfinished
        ? "The packet is open. Plots still waiting on a second reading cannot ship."
        : "A packet exists. It is not accepted, so an EU shipment stops.",
      lines,
    };
  }
  if (pin) {
    return {
      state: "pin",
      mark: "EU · pin only",
      headline: "A station pin is filed. It is not yet a plot the regulation will take.",
      lines,
    };
  }
  return {
    state: "absent",
    mark: "EU · no plot",
    headline: "No plot. An EU shipment stops here.",
    lines,
  };
}

export const EUDR_APPLIES = "2026-12-30";

export const procedure = [
  {
    article: "Article 9",
    title: "Information",
    body: "Before the coffee is placed on the market: what it is, how much, the country, the supplier, the harvest window, and the geolocation of every plot. The evidence has to show two things, not one. The land was not deforested after 31 December 2020, and the coffee was produced legally.",
  },
  {
    article: "Article 10",
    title: "Risk",
    body: "Someone has to decide whether that information is conclusive. Country, the length of the chain, and any sign the lots were mixed. This desk does not run a satellite check, and it will not call the risk negligible for you.",
  },
  {
    article: "Article 11",
    title: "Mitigation, then the statement",
    body: "If the risk is not negligible, the lot waits: more documents, an independent reading of the plot, or it does not go. Only then does an operator submit a due diligence statement in the EU information system. This desk does not submit one.",
  },
] as const;

