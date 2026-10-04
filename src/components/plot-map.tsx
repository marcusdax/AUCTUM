import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ATLAS_MAP, basemapUrl, elevationAt, flyTo, placeAt, radarFrames, radarUrl, scaleBar, weatherAt, type BasemapId } from "@/lib/atlas-map";
import { areaHa, project, round6, selfIntersects, toGeoJson, unproject, type LngLat } from "@/lib/geo";
import { fieldNotes } from "@/lib/field-notes";
import { plotFor, usePlots } from "@/lib/plot-store";
import { useSeat } from "@/lib/seat";
import type { Account } from "@/lib/types";
import { buttonClass, Eyebrow } from "./ui";

const HEIGHT = 380;

export function PlotMap({ account, center }: { account: Account; center: LngLat }) {
  const audience = useSeat((s) => s.audience);
  const plots = usePlots((s) => s.plots);
  const save = usePlots((s) => s.save);
  const saved = plotFor(plots, account.id);
  const canDraw = audience === "farmer" && (account.role === "farmer" || account.role === "coop");
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [zoom, setZoom] = useState(16);
  const [origin, setOrigin] = useState(center);
  const [mode, setMode] = useState<"draw" | "move">("draw");
  const [draft, setDraft] = useState<LngLat[]>(saved?.vertices ?? []);
  const [note, setNote] = useState<string | null>(null);
  const [basemap, setBasemap] = useState<BasemapId>("satellite");
  const [radarOn, setRadarOn] = useState(false);
  const [frames, setFrames] = useState<{ host: string; frames: { path: string; time: number }[] } | null>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [sky, setSky] = useState<{ temperatureC: number; rainMm: number; windKmh: number } | null>(null);
  const [ground, setGround] = useState<{ place: string | null; elevationM: number | null } | null>(null);
  const drag = useRef<{ x: number; y: number; lat: number; lng: number } | null>(null);
  const synced = useRef(false);

  useEffect(() => {
    if (!synced.current && saved) {
      setDraft(saved.vertices);
      synced.current = true;
    }
  }, [saved]);

  useEffect(() => {
    const node = box.current;
    if (!node) return;
    const measure = () => setWidth(node.clientWidth);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!radarOn) return;
    let alive = true;
    radarFrames()
      .then((next) => {
        if (!alive) return;
        setFrames(next);
        if (!next) setNote("The radar feed did not answer.");
        else setFrameIndex(next.frames.length - 1);
      })
      .catch(() => {
        if (alive) setNote("The radar feed did not answer.");
      });
    return () => {
      alive = false;
    };
  }, [radarOn]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      weatherAt(origin)
        .then((reading) => setSky(reading))
        .catch(() => setSky(null));
      Promise.all([placeAt(origin), elevationAt(origin)])
        .then(([place, elevationM]) => setGround({ place, elevationM }))
        .catch(() => setGround(null));
    }, 900);
    return () => window.clearTimeout(timer);
  }, [origin]);

  const sharp = typeof window !== "undefined" && window.devicePixelRatio >= 1.5;
  const maxZoom = basemap === "terrain" ? 17 : 18;
  const oversample = sharp && zoom < maxZoom;
  const scale = oversample ? 2 : 1;
  const tileZoom = zoom + (oversample ? 1 : 0);
  const world = project(origin.lat, origin.lng, zoom);
  const worldX = world.x * scale;
  const worldY = world.y * scale;
  const tileX0 = Math.floor((worldX - (width * scale) / 2) / 256) - 1;
  const tileY0 = Math.floor((worldY - (HEIGHT * scale) / 2) / 256) - 1;
  const tileX1 = Math.floor((worldX + (width * scale) / 2) / 256) + 1;
  const tileY1 = Math.floor((worldY + (HEIGHT * scale) / 2) / 256) + 1;
  const cssTile = 256 / scale;
  const tiles: { x: number; y: number; left: number; top: number }[] = [];
  for (let x = tileX0; x <= tileX1; x += 1) {
    for (let y = tileY0; y <= tileY1; y += 1) {
      tiles.push({
        x,
        y,
        left: (x * 256 - (worldX - (width * scale) / 2)) / scale,
        top: (y * 256 - (worldY - (HEIGHT * scale) / 2)) / scale,
      });
    }
  }
  const bar = scaleBar(origin.lat, zoom);
  const rain = frames?.frames[frameIndex];

  function toScreen(point: LngLat) {
    const placed = project(point.lat, point.lng, zoom);
    return { x: placed.x - (world.x - width / 2), y: placed.y - (world.y - HEIGHT / 2) };
  }

  const screen = draft.map(toScreen);
  const area = areaHa(draft);
  const crossed = selfIntersects(draft);
  const points = screen.map((point) => `${point.x},${point.y}`).join(" ");

  function addAt(clientX: number, clientY: number) {
    const rect = box.current?.getBoundingClientRect();
    if (!rect) return;
    const worldX = world.x - width / 2 + (clientX - rect.left);
    const worldY = world.y - HEIGHT / 2 + (clientY - rect.top);
    setDraft((ring) => [...ring, unproject(worldX, worldY, zoom)]);
    setNote(null);
  }

  function keep() {
    if (draft.length === 1) {
      save(account.id, draft);
      setNote("A point is saved, to six decimal places. The area is still unknown, so this does not clear the lot.");
      return;
    }
    if (draft.length < 3) {
      setNote("A boundary needs at least three corners.");
      return;
    }
    if (crossed) {
      setNote("The boundary crosses itself. Move a corner before it can be saved.");
      return;
    }
    save(account.id, draft);
    setNote(
      area > 4
        ? `${area.toFixed(2)} hectares. Over 4, the regulation wants this boundary, not a point. It is still not a statement.`
        : `${area.toFixed(2)} hectares. At or under 4, a point would also be allowed. The boundary is the better file. It is still not a statement.`,
    );
  }

  function download() {
    const ring = saved?.vertices ?? draft;
    if (!ring.length) return;
    const blob = new Blob([JSON.stringify(toGeoJson(account.name, ring, areaHa(ring)), null, 2)], { type: "application/geo+json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${account.id}.geojson`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function here() {
    if (!navigator.geolocation) {
      setNote("This phone has no position to share.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const point = { lat: round6(pos.coords.latitude), lng: round6(pos.coords.longitude) };
        setOrigin(point);
        setDraft((ring) => [...ring, point]);
        setNote("The phone’s position is a corner, not a proof.");
      },
      () => setNote("This phone did not share a position."),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }

  return (
    <div>
      <Eyebrow>The plot · drawn here</Eyebrow>
      <h2 className="mt-2 font-display text-3xl">Walk the boundary.</h2>
      <p className="mt-3 max-w-xl text-sm text-slate">
        The person who grows the coffee maps the Space. Streets and terrain are open maps. Satellite is Esri imagery, sharpened for a phone screen. Radar is the last few hours of rain, one picture at a time. A drawing is not a filing.
      </p>
      {!canDraw ? (
        <p className="mt-3 text-sm">Switch to “I grow it” to draw. Anyone else may look, and may not move the line.</p>
      ) : null}
      <div
        ref={box}
        className="relative mt-5 overflow-hidden border-t border-brass bg-raw"
        style={{ height: HEIGHT, touchAction: mode === "move" ? "none" : "manipulation" }}
        onPointerDown={(event) => {
          if (mode !== "move") return;
          drag.current = { x: event.clientX, y: event.clientY, lat: origin.lat, lng: origin.lng };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (!drag.current || mode !== "move") return;
          const start = project(drag.current.lat, drag.current.lng, zoom);
          const next = unproject(start.x - (event.clientX - drag.current.x), start.y - (event.clientY - drag.current.y), zoom);
          setOrigin(next);
        }}
        onPointerUp={(event) => {
          if (mode === "move") {
            drag.current = null;
            return;
          }
          if (!canDraw) return;
          addAt(event.clientX, event.clientY);
        }}
      >
        {tiles.map((tile) => (
          <img
            key={`${basemap}-${tileZoom}-${tile.x}-${tile.y}`}
            alt=""
            src={basemapUrl(basemap, tileZoom, tile.x, tile.y)}
            className="pointer-events-none absolute outline-none"
            style={{ left: tile.left, top: tile.top, width: cssTile, height: cssTile }}
            draggable={false}
          />
        ))}
        {radarOn && rain
          ? tiles.map((tile) => (
              <img
                key={`radar-${frameIndex}-${tile.x}-${tile.y}`}
                alt=""
                src={radarUrl(frames!.host, rain.path, tileZoom, tile.x, tile.y)}
                className="pointer-events-none absolute outline-none opacity-70"
                style={{ left: tile.left, top: tile.top, width: cssTile, height: cssTile }}
                draggable={false}
              />
            ))
          : null}
        <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
          {screen.length > 2 ? <polygon points={points} fill="rgba(140,47,34,0.28)" stroke="#17231d" strokeWidth="2" /> : null}
          {screen.length > 1 ? <polyline points={points} fill="none" stroke="#17231d" strokeWidth="2" /> : null}
          {screen.map((point, index) => (
            <circle key={`${point.x}-${index}`} cx={point.x} cy={point.y} r={index === 0 ? 6 : 4} fill="#8c2f22" />
          ))}
        </svg>
        <div className="pointer-events-none absolute bottom-3 left-3 bg-paper/90 px-2 py-1">
          <span className="block border-b-2 border-ink" style={{ width: bar.px }} />
          <span className="font-mono text-[10px] tracking-[0.12em] text-ink uppercase">{bar.label}</span>
        </div>
      </div>
      <p className="mt-2 font-mono text-[10px] tracking-[0.12em] text-slate uppercase">
        {ATLAS_MAP.basemaps.find((row) => row.id === basemap)?.credit}
        {radarOn ? " · RainViewer" : ""}
        {sky ? ` · ${sky.temperatureC.toFixed(0)}°C · rain ${sky.rainMm.toFixed(1)} mm · wind ${sky.windKmh.toFixed(0)} km/h` : ""}
      </p>
      {ground && (ground.place || ground.elevationM != null) ? (
        <p className="mt-1 text-sm">
          {ground.place ? `${ground.place}. ` : ""}
          {ground.elevationM != null ? `${Math.round(ground.elevationM)} m on the elevation model. ` : ""}
          The locality is what OpenStreetMap returns for this point. It is not the farm’s legal name.
        </p>
      ) : null}
      <form
        className="mt-4 flex flex-wrap gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          const place = query.trim();
          if (!place) return;
          flyTo(place)
            .then((point) => {
              if (!point) {
                setNote("That place did not resolve.");
                return;
              }
              setOrigin(point);
              setZoom(15);
              setNote(`The map moved to ${place}. The boundary did not.`);
            })
            .catch(() => setNote("The place search did not answer."));
        }}
      >
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Fly to a place"
          aria-label="Fly to a place"
          className="min-h-11 min-w-0 flex-1 border border-hair-strong bg-paper px-3 text-sm"
        />
        <button type="submit" className={buttonClass("ghost")}>
          Fly
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {ATLAS_MAP.basemaps.map((row) => (
          <button
            key={row.id}
            type="button"
            className={buttonClass(basemap === row.id ? "stamp" : "ghost")}
            onClick={() => setBasemap(row.id)}
          >
            {row.label}
          </button>
        ))}
        <button type="button" className={buttonClass(radarOn ? "stamp" : "ghost")} onClick={() => setRadarOn((on) => !on)}>
          Radar
        </button>
        {radarOn && frames ? (
          <>
            <button
              type="button"
              className={buttonClass("ghost")}
              onClick={() => setFrameIndex((index) => Math.max(0, index - 1))}
              disabled={frameIndex === 0}
            >
              Earlier
            </button>
            <button
              type="button"
              className={buttonClass("ghost")}
              onClick={() => setFrameIndex((index) => Math.min(frames.frames.length - 1, index + 1))}
              disabled={frameIndex >= frames.frames.length - 1}
            >
              Later
            </button>
          </>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className={buttonClass(mode === "draw" ? "stamp" : "ghost")} onClick={() => setMode("draw")} disabled={!canDraw}>
          Draw
        </button>
        <button type="button" className={buttonClass(mode === "move" ? "stamp" : "ghost")} onClick={() => setMode("move")}>
          Move
        </button>
        <button type="button" className={buttonClass("ghost")} onClick={here} disabled={!canDraw}>
          This phone
        </button>
        <button type="button" className={buttonClass("ghost")} onClick={() => setZoom((z) => Math.min(maxZoom, z + 1))}>
          Closer
        </button>
        <button type="button" className={buttonClass("ghost")} onClick={() => setZoom((z) => Math.max(13, z - 1))}>
          Farther
        </button>
        <button type="button" className={buttonClass("quiet")} onClick={() => setDraft((ring) => ring.slice(0, -1))} disabled={!canDraw}>
          Undo
        </button>
        <button type="button" className={buttonClass("quiet")} onClick={() => setDraft([])} disabled={!canDraw}>
          Clear
        </button>
        <button type="button" className={buttonClass("solid")} onClick={keep} disabled={!canDraw}>
          Save on this Space
        </button>
        <button type="button" className={buttonClass("ghost")} onClick={download} disabled={!draft.length && !saved}>
          GeoJSON
        </button>
      </div>
      <p className="mt-4 text-sm">
        {draft.length === 1
          ? `Point ${draft[0].lat.toFixed(6)}, ${draft[0].lng.toFixed(6)}. Area unknown.`
          : draft.length
            ? `${draft.length} corners · ${area.toFixed(2)} ha${crossed ? " · the line crosses itself" : ""}`
            : "No corners yet."}
        {saved ? ` Saved ${saved.vertices.length === 1 ? "point" : "boundary"} on this Space.` : ""}
      </p>
      {note ? <p className="mt-2 text-sm text-stamp">{note}</p> : null}
      <ul className="mt-5 space-y-2 border-t border-hair pt-4">
        {fieldNotes({
          vertices: draft.length,
          areaHa: area,
          crossed,
          basemap,
          radarOn,
          elevationM: ground?.elevationM,
          sky,
        }).map((line) => (
          <li key={line} className="text-sm">
            {line}
          </li>
        ))}
      </ul>
      <Link to="/education/lesson/$lessonId" params={{ lessonId: "d-map" }} className={buttonClass("ghost", "mt-4")}>
        The sitting for this map
      </Link>
    </div>
  );
}
