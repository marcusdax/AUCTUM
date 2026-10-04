import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { bagCopy, publicAutopsyUrl } from "@/lib/bag";
import { formatCents } from "@/lib/format";
import type { Account, Lot } from "@/lib/types";
import { LotSeal } from "./lot-seal";
import { Eyebrow, buttonClass } from "./ui";

export function QrMark({ lotId, size = 112 }: { lotId: string; size?: number }) {
  const url = publicAutopsyUrl(lotId);
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    void import("qrcode").then((QR) =>
      QR.toString(url, {
        type: "svg",
        margin: 4,
        errorCorrectionLevel: "H",
        width: size * 2,
        color: { dark: "#221E1B", light: "#F1F2EA" },
      }),
    ).then((markup) => {
      if (live && markup.startsWith("<svg")) setSvg(markup);
    });
    return () => {
      live = false;
    };
  }, [url, size]);

  return (
    <Link to="/autopsy/$lotId" params={{ lotId }} className="inline-flex flex-col items-center gap-2" aria-label={`Open the autopsy for ${lotId}`}>
      {svg ? (
        <span
          className="block bg-paper [&_svg]:h-full [&_svg]:w-full"
          style={{ width: size, height: size }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <LotSeal seed={lotId} label="Autopsy" />
      )}
      <span className="max-w-[22ch] text-center font-mono text-[9px] tracking-[0.12em] text-slate uppercase">{url.replace("https://", "")}</span>
    </Link>
  );
}

export function BagPanel({ lot, producer }: { lot: Lot; producer?: Account }) {
  const copy = bagCopy(lot, producer?.name ?? lot.origin.farm);
  const spaceId = (producer?.id ?? lot.producerId).replace("acc-", "");
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <Eyebrow>On the bag · {lot.code}</Eyebrow>
        <h2 className="mt-2 font-display text-3xl sm:text-4xl">{copy.headline}</h2>
        <p className="mt-3 max-w-xl font-display text-xl leading-snug text-ink">{copy.lede}</p>
        <p className="mt-3 max-w-xl text-sm text-slate">{copy.body}</p>
        <p className="mt-4 font-mono text-sm tabular">
          Farmgate {formatCents(lot.farmgateCents)}/lb · cup {lot.cupScore.toFixed(2)} · {lot.process}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to="/autopsy/$lotId" params={{ lotId: lot.id }} className={buttonClass("stamp")}>
            Open the autopsy
          </Link>
          <Link to="/spaces/$spaceId" params={{ spaceId }} className={buttonClass("ghost")}>
            {producer?.name ?? "Producer"} Space
          </Link>
        </div>
      </div>
      <QrMark lotId={lot.id} />
    </div>
  );
}
