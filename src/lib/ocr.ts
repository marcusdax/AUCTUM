import type { DocKind, FieldMeta } from "./types";

export type { FieldMeta };

export type ExtractionProposal = {
  kind: DocKind;
  title: string;
  accountId: string;
  lotId?: string;
  confidence: number;
  fields: Record<string, string>;
  fieldMeta: FieldMeta[];
};

const CRITICAL: Record<DocKind, string[]> = {
  qc: ["score", "moisture"],
  contract: ["lock", "volume"],
  receipt: ["amount"],
  eudr: ["polygons", "deforestation"],
  phytosanitary: ["lots"],
  identity: ["legal"],
};

const TEMPLATES: Record<DocKind, Omit<ExtractionProposal, "fieldMeta" | "confidence"> & { scores: Record<string, number> }> = {
  qc: {
    kind: "qc",
    title: "Cupping sheet · new intake",
    accountId: "acc-saigon",
    lotId: "lot-110",
    fields: { lot: "AL-VN-26-110", score: "84.90", moisture: "10.9%", method: "SCA / Q", defects: "2" },
    scores: { lot: 0.94, score: 0.91, moisture: 0.62, method: 0.88, defects: 0.71 },
  },
  contract: {
    kind: "contract",
    title: "Offer letter · Atlas",
    accountId: "acc-karmic",
    lotId: "lot-084",
    fields: { buyer: "Atlas Roastworks", lots: "AL-VN-26-084", lock: "4.12 USD/lb", volume: "2,520 kg", window: "Nov 2026" },
    scores: { buyer: 0.9, lots: 0.93, lock: 0.86, volume: 0.58, window: 0.74 },
  },
  receipt: {
    kind: "receipt",
    title: "VietQR receipt · Mai",
    accountId: "acc-mai",
    lotId: "lot-110",
    fields: { payee: "Trần Thị Mai", amount: "48200000", currency: "VND", rail: "PayOS", memo: "" },
    scores: { payee: 0.89, amount: 0.92, currency: 0.97, rail: 0.8, memo: 0.55 },
  },
  eudr: {
    kind: "eudr",
    title: "Geolocation packet",
    accountId: "acc-karmic",
    lotId: "lot-091",
    fields: { polygons: "member plots", deforestation: "clear", harvest: "2025/26" },
    scores: { polygons: 0.77, deforestation: 0.84, harvest: 0.9 },
  },
  phytosanitary: {
    kind: "phytosanitary",
    title: "Phyto certificate",
    accountId: "acc-saigon",
    lotId: "lot-091",
    fields: { authority: "PPD Vietnam", lots: "AL-VN-26-091", status: "issued" },
    scores: { authority: 0.86, lots: 0.91, status: 0.8 },
  },
  identity: {
    kind: "identity",
    title: "Farm registration",
    accountId: "acc-mai",
    fields: { legal: "New garden", district: "Ea H'leo", consent: "recorded" },
    scores: { legal: 0.83, district: 0.9, consent: 0.95 },
  },
};

export function proposeExtraction(kind: DocKind, memo?: string): ExtractionProposal {
  const template = TEMPLATES[kind];
  const fields = { ...template.fields };
  if (kind === "receipt" && memo) fields.memo = memo;
  const critical = new Set(CRITICAL[kind]);
  const fieldMeta = Object.keys(fields).map((key) => ({
    key,
    confidence: template.scores[key] ?? 0.7,
    critical: critical.has(key),
    touched: false,
  }));
  const confidence = fieldMeta.reduce((sum, field) => sum + field.confidence, 0) / fieldMeta.length;
  return { kind, title: template.title, accountId: template.accountId, lotId: template.lotId, confidence, fields, fieldMeta };
}

export function criticalsOpen(meta: FieldMeta[] | undefined) {
  return (meta ?? []).some((field) => field.critical && !field.touched);
}

export function confidenceTone(confidence: number): "ok" | "watch" | "warn" {
  if (confidence >= 0.85) return "ok";
  if (confidence >= 0.7) return "watch";
  return "warn";
}

export function prepareCapture(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const max = 1280;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = image.data;
      let min = 255;
      let maxValue = 0;
      for (let i = 0; i < data.length; i += 4) {
        const y = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = data[i + 1] = data[i + 2] = y;
        if (y < min) min = y;
        if (y > maxValue) maxValue = y;
      }
      const span = Math.max(1, maxValue - min);
      for (let i = 0; i < data.length; i += 4) {
        const stretched = Math.min(255, Math.max(0, ((data[i] - min) / span) * 255));
        data[i] = data[i + 1] = data[i + 2] = stretched;
      }
      ctx.putImageData(image, 0, 0);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    img.src = url;
  });
}
