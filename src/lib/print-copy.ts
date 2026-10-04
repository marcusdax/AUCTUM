import { formatCents } from "./format";
import type { Account, Lot } from "./types";

export function humanNarrative(lot: Lot, producer?: Account) {
  const name = producer?.name ?? lot.origin.farm;
  const place = `${lot.origin.farm}, ${lot.origin.region}`;
  const verb = producer?.role === "coop" ? "mills this from" : producer && producer.role !== "farmer" ? "is named on" : "grows this at";
  const where = verb === "is named on" ? `${place}` : place;
  return `${name} ${verb} ${where}. ${lot.process} ${lot.varietal}, harvest ${lot.harvest}, cup ${lot.cupScore.toFixed(2)}. The floor is ${formatCents(lot.farmgateCents)} a pound, written before the coffee is sold on.`;
}

export function floorLine(lot: Lot, producer?: Account) {
  const name = producer?.name ?? lot.origin.farm;
  return `${name} · floor ${formatCents(lot.farmgateCents)}/lb · ${lot.process}`;
}
