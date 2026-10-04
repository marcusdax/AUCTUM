import type { BasemapId } from "./atlas-map";

export function fieldNotes(input: {
  vertices: number;
  areaHa: number;
  crossed: boolean;
  basemap: BasemapId;
  radarOn: boolean;
  elevationM?: number | null;
  sky: { temperatureC: number; rainMm: number; windKmh: number } | null;
}) {
  const lines: string[] = [];
  if (input.sky && input.sky.rainMm >= 0.2) {
    lines.push("Rain is on the reading. Do not spread cherry. Cover what is already down. This is the hour, not the afternoon.");
  } else if (input.sky && input.sky.windKmh >= 20 && input.sky.rainMm === 0) {
    lines.push("The air is moving and the rain reading is dry. Drying can proceed. Moisture is still a gauge, not a guess from the sky.");
  } else if (input.sky) {
    lines.push(
      `${input.sky.temperatureC.toFixed(0)}°C at this point. The number is a weather reading. It is not a yield, and it is not a soil test.`,
    );
  }
  if (input.vertices === 0) {
    lines.push("No corners yet. Walk the boundary, or drop the phone’s position as the first one.");
  } else if (input.vertices === 1) {
    lines.push("One point is filed. The area is unknown, so it cannot yet stand in for a plot of 4 hectares or less.");
  } else if (input.crossed) {
    lines.push("The line crosses itself. A crossed boundary is not a plot.");
  } else if (input.areaHa > 4) {
    lines.push(`${input.areaHa.toFixed(2)} hectares. Over 4, Europe wants this boundary. A point would not be enough.`);
  } else {
    lines.push(`${input.areaHa.toFixed(2)} hectares. At or under 4, a point would also be allowed. Keep the boundary.`);
  }
  lines.push(
    input.basemap === "satellite"
      ? "The satellite picture shows the canopy. It does not see rust, borer, or the chemistry of the soil."
      : input.basemap === "terrain"
        ? "The terrain picture is relief from OpenStreetMap and SRTM. It is not a soil test, and it is not a deforestation finding."
        : "Streets show the road. They do not show the trees.",
  );
  if (input.radarOn) lines.push("The radar is a rain picture from the last few hours. It is not a deforestation reading.");
  if (typeof input.elevationM === "number") {
    const meters = Math.round(input.elevationM);
    lines.push(
      meters >= 1000
        ? `${meters} m on the elevation model. At or above 1,000 m is the band where Arabica is commonly planted. This does not name the trees on the plot.`
        : `${meters} m on the elevation model. Below 1,000 m is the band where Robusta is commonly planted in the Central Highlands. This does not name the trees on the plot.`,
    );
  }
  return lines;
}
