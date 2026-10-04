import type { LngLat } from "./geo";

export type BasemapId = "streets" | "satellite" | "terrain";

export const ATLAS_MAP = {
  name: "Atlas",
  takenFrom: "Public pictures only. OpenStreetMap, Esri imagery, OpenTopoMap relief, RainViewer rain. The decoders stay out of the browser.",
  basemaps: [
    { id: "streets" as const, label: "Streets", credit: "© OpenStreetMap" },
    { id: "satellite" as const, label: "Satellite", credit: "Esri, Maxar, Earthstar Geographics" },
    { id: "terrain" as const, label: "Terrain", credit: "OpenTopoMap (CC-BY-SA) · OSM · SRTM" },
  ],
  radar: {
    label: "Radar",
    feed: "RainViewer composite",
    note: "A rain picture over the farm. Not a US radar sweep, and not a deforestation reading.",
  },
  refused: [
    "OpenRadar’s Level II decoder",
    "Py-ART",
    "OpenStorm’s volume renderer",
    "Penpot",
    "Hail cells and scored roofs",
    "A drawing counted as a due diligence statement",
  ],
};

export function basemapUrl(id: BasemapId, zoom: number, x: number, y: number) {
  if (id === "satellite") {
    return `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${zoom}/${y}/${x}`;
  }
  if (id === "terrain") {
    return `https://tile.opentopomap.org/${zoom}/${x}/${y}.png`;
  }
  return `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
}

export async function radarFrames() {
  const response = await fetch("https://api.rainviewer.com/public/weather-maps.json");
  if (!response.ok) return null;
  const body = (await response.json()) as { host?: string; radar?: { past?: { path: string; time?: number }[] } };
  const past = body.radar?.past ?? [];
  if (!body.host || past.length === 0) return null;
  return { host: body.host, frames: past.map((frame) => ({ path: frame.path, time: frame.time ?? 0 })) };
}

export function radarUrl(host: string, path: string, zoom: number, x: number, y: number) {
  return `${host}${path}/256/${zoom}/${x}/${y}/2/1_1.png`;
}

export function scaleBar(lat: number, zoom: number) {
  const metersPerPixel = (156543.03392 * Math.cos((lat * Math.PI) / 180)) / 2 ** zoom;
  const choices = [20, 50, 100, 200, 500, 1000, 2000, 5000];
  const target = 112 * metersPerPixel;
  const meters = choices.reduce((best, next) => (Math.abs(next - target) < Math.abs(best - target) ? next : best));
  return {
    px: Math.round(meters / metersPerPixel),
    label: meters >= 1000 ? `${meters / 1000} km` : `${meters} m`,
  };
}

export async function flyTo(query: string): Promise<LngLat | null> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(query)}`,
    { headers: { Accept: "application/json" } },
  );
  if (!response.ok) return null;
  const rows = (await response.json()) as { lat: string; lon: string }[];
  if (!rows[0]) return null;
  return { lat: Number(rows[0].lat), lng: Number(rows[0].lon) };
}

export async function weatherAt(point: LngLat) {
  const params = new URLSearchParams({
    latitude: String(point.lat),
    longitude: String(point.lng),
    current: "temperature_2m,precipitation,wind_speed_10m",
    timezone: "auto",
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!response.ok) return null;
  const body = (await response.json()) as {
    current?: { temperature_2m?: number; precipitation?: number; wind_speed_10m?: number };
  };
  const current = body.current;
  if (!current || typeof current.temperature_2m !== "number") return null;
  return {
    temperatureC: current.temperature_2m,
    rainMm: current.precipitation ?? 0,
    windKmh: current.wind_speed_10m ?? 0,
  };
}

export async function elevationAt(point: LngLat): Promise<number | null> {
  const params = new URLSearchParams({ latitude: String(point.lat), longitude: String(point.lng) });
  const response = await fetch(`https://api.open-meteo.com/v1/elevation?${params.toString()}`);
  if (!response.ok) return null;
  const body = (await response.json()) as { elevation?: number[] };
  const meters = body.elevation?.[0];
  return typeof meters === "number" ? meters : null;
}

export async function placeAt(point: LngLat): Promise<string | null> {
  const params = new URLSearchParams({
    format: "jsonv2",
    zoom: "12",
    lat: String(point.lat),
    lon: String(point.lng),
  });
  const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params.toString()}`, {
    headers: { Accept: "application/json" },
  });
  if (!response.ok) return null;
  const body = (await response.json()) as {
    name?: string;
    address?: { city?: string; town?: string; village?: string; county?: string; state?: string };
  };
  const address = body.address;
  const local = address?.city || address?.town || address?.village || address?.county || body.name;
  if (!local) return null;
  return address?.state ? `${local}, ${address.state}` : local;
}
