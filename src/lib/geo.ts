export type LngLat = { lat: number; lng: number };

const R = 6378137;

export function round6(n: number) {
  return Math.round(n * 1e6) / 1e6;
}

export function project(lat: number, lng: number, zoom: number) {
  const n = 2 ** zoom;
  const x = ((lng + 180) / 360) * n * 256;
  const s = Math.sin((lat * Math.PI) / 180);
  const y = (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * n * 256;
  return { x, y };
}

export function unproject(x: number, y: number, zoom: number): LngLat {
  const n = 2 ** zoom;
  const lng = (x / (n * 256)) * 360 - 180;
  const merc = Math.PI * (1 - (2 * y) / (n * 256));
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(merc) - Math.exp(-merc)));
  return { lat: round6(lat), lng: round6(lng) };
}

export function areaHa(ring: LngLat[]) {
  if (ring.length < 3) return 0;
  const lat0 = (ring.reduce((sum, point) => sum + point.lat, 0) / ring.length) * (Math.PI / 180);
  const mx = (Math.PI / 180) * R * Math.cos(lat0);
  const my = (Math.PI / 180) * R;
  let sum = 0;
  for (let i = 0; i < ring.length; i += 1) {
    const a = ring[i];
    const b = ring[(i + 1) % ring.length];
    sum += a.lng * mx * (b.lat * my) - b.lng * mx * (a.lat * my);
  }
  return Math.abs(sum) / 2 / 10000;
}

function turn(a: LngLat, b: LngLat, c: LngLat) {
  return (b.lng - a.lng) * (c.lat - a.lat) - (b.lat - a.lat) * (c.lng - a.lng);
}

export function selfIntersects(ring: LngLat[]) {
  if (ring.length < 4) return false;
  const edges = ring.map((point, index) => [point, ring[(index + 1) % ring.length]] as const);
  for (let i = 0; i < edges.length; i += 1) {
    for (let j = i + 1; j < edges.length; j += 1) {
      if (Math.abs(i - j) <= 1 || (i === 0 && j === edges.length - 1)) continue;
      const [a, b] = edges[i];
      const [c, d] = edges[j];
      if (turn(a, b, c) * turn(a, b, d) < 0 && turn(c, d, a) * turn(c, d, b) < 0) return true;
    }
  }
  return false;
}

export function toGeoJson(name: string, ring: LngLat[], area: number) {
  const closed = [...ring, ring[0]].map((point) => [point.lng, point.lat]);
  return {
    type: "Feature",
    properties: {
      name,
      areaHa: Number(area.toFixed(4)),
      note: "Drawn on the Space by the person who grows it. Not a due diligence statement.",
    },
    geometry: ring.length === 1 ? { type: "Point", coordinates: [ring[0].lng, ring[0].lat] } : { type: "Polygon", coordinates: [closed] },
  };
}
