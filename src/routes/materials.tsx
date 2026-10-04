import { createFileRoute } from "@tanstack/react-router";
import { PRINT_FORMATS, PrintPiece, type PrintFormat } from "@/components/one-pager";
import { buttonClass, Eyebrow, Sheet } from "@/components/ui";
import { readLogo, useMaterials } from "@/lib/materials-store";
import { useLedger } from "@/lib/store";

export const Route = createFileRoute("/materials")({ component: MaterialsPage });

function MaterialsPage() {
  const lots = useLedger((s) => s.lots);
  const accounts = useLedger((s) => s.accounts);
  const shopName = useMaterials((s) => s.shopName);
  const line = useMaterials((s) => s.line);
  const logo = useMaterials((s) => s.logo);
  const lotId = useMaterials((s) => s.lotId);
  const format = useMaterials((s) => s.format) ?? "sheet";
  const setShopName = useMaterials((s) => s.setShopName);
  const setLine = useMaterials((s) => s.setLine);
  const setLogo = useMaterials((s) => s.setLogo);
  const setLotId = useMaterials((s) => s.setLotId);
  const setFormat = useMaterials((s) => s.setFormat);
  const lot = lots.find((row) => row.id === lotId) ?? lots[0];
  const producer = accounts.find((row) => row.id === lot?.producerId);

  return (
    <div className="space-y-8">
      <Sheet className="no-print">
        <Eyebrow>Printable</Eyebrow>
        <h1 className="mt-3 max-w-[16ch] font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[0.95]">
          A person, a floor, a mark that scans.
        </h1>
        <ul className="mt-4 max-w-xl space-y-1 text-sm text-slate">
          <li>Quiet paper around the mark. No photograph behind it.</li>
          <li>Dark modules on a light ground. The logo sits beside the mark, never inside it.</li>
          <li>The address is the autopsy of this lot. A crease on a bag still has to scan, so the correction level is high.</li>
        </ul>
        <div className="mt-6 grid max-w-lg gap-4">
          <fieldset className="grid gap-2">
            <legend className="meta">Piece</legend>
            {PRINT_FORMATS.map((piece) => (
              <label key={piece.id} className="flex min-h-11 items-start gap-3 py-1 text-sm">
                <input
                  className="mt-1"
                  type="radio"
                  name="format"
                  checked={format === piece.id}
                  onChange={() => setFormat(piece.id as PrintFormat)}
                />
                <span>
                  {piece.title}
                  <span className="mt-0.5 block text-slate">{piece.use}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <label className="grid gap-1 text-sm">
            <span className="meta">Counter or roastery</span>
            <input value={shopName} onChange={(event) => setShopName(event.target.value)} className="min-h-11 border border-hair-strong bg-paper px-3" placeholder="The name that pours this" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="meta">Your line · optional, 180 characters</span>
            <textarea value={line} onChange={(event) => setLine(event.target.value)} rows={3} className="border border-hair-strong bg-paper px-3 py-2" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="meta">Lot</span>
            <select value={lot?.id} onChange={(event) => setLotId(event.target.value)} className="min-h-11 border border-hair-strong bg-paper px-3">
              {lots.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.code} · {row.title}
                </option>
              ))}
            </select>
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <label className={buttonClass("ghost")}>
              Upload a logo
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  readLogo(file).then(setLogo).catch(() => setLogo(null));
                }}
              />
            </label>
            {logo ? (
              <button type="button" className={buttonClass("quiet")} onClick={() => setLogo(null)}>
                Remove logo
              </button>
            ) : null}
            <button type="button" className={buttonClass("stamp")} onClick={() => window.print()}>
              Print this piece
            </button>
          </div>
        </div>
      </Sheet>
      {lot ? <PrintPiece format={format} lot={lot} producer={producer} shopName={shopName} line={line} logo={logo} /> : null}
    </div>
  );
}
