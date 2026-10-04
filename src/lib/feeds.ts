export type Station = {
  id: string;
  name: string;
  detail: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

export type Reading = {
  id: string;
  name: string;
  detail: string;
  temperatureC: number;
  humidity: number;
  rainMm: number;
  observedAt: string;
};

export const STATIONS: Station[] = [
  { id: "bmt", name: "Buôn Ma Thuột", detail: "Đắk Lắk", latitude: 12.67, longitude: 108.05, timezone: "Asia/Ho_Chi_Minh" },
  { id: "lac", name: "Lạc Dương", detail: "Lâm Đồng", latitude: 12.02, longitude: 108.42, timezone: "Asia/Ho_Chi_Minh" },
  { id: "pitalito", name: "Pitalito", detail: "Huila", latitude: 1.85, longitude: -76.05, timezone: "America/Bogota" },
  { id: "kochere", name: "Kochere", detail: "Gedeo", latitude: 6.05, longitude: 38.35, timezone: "Africa/Addis_Ababa" },
];

export async function readStation(station: Station): Promise<Reading> {
  const params = new URLSearchParams({
    latitude: String(station.latitude),
    longitude: String(station.longitude),
    current: "temperature_2m,relative_humidity_2m,precipitation",
    timezone: station.timezone,
  });
  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!response.ok) throw new Error(String(response.status));
  const body = (await response.json()) as {
    current?: { time?: string; temperature_2m?: number; relative_humidity_2m?: number; precipitation?: number };
  };
  const current = body.current;
  if (!current || typeof current.temperature_2m !== "number" || typeof current.relative_humidity_2m !== "number") {
    throw new Error("empty");
  }
  return {
    id: station.id,
    name: station.name,
    detail: station.detail,
    temperatureC: current.temperature_2m,
    humidity: current.relative_humidity_2m,
    rainMm: current.precipitation ?? 0,
    observedAt: current.time ?? "",
  };
}

export function ago(iso: string, now: number) {
  const seconds = Math.max(0, Math.round((now - new Date(iso).getTime()) / 1000));
  if (!Number.isFinite(seconds)) return "—";
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}
