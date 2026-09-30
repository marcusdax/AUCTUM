export type Role =
  | "farmer"
  | "collector"
  | "coop"
  | "exporter"
  | "roaster"
  | "lab"
  | "importer"
  | "agent";

export type TrustBand = "sealed" | "verified" | "provisional" | "watch" | "restricted";

export type LotState =
  | "draft"
  | "captured"
  | "pending"
  | "verified"
  | "available"
  | "sample"
  | "offer"
  | "locked"
  | "contracted"
  | "fulfilled";

export type DocKind =
  | "qc"
  | "contract"
  | "receipt"
  | "eudr"
  | "phytosanitary"
  | "identity";

export type DocStatus = "queued" | "extracted" | "review" | "accepted" | "rejected";

export type Lifecycle =
  | "prospect"
  | "qualified"
  | "sampling"
  | "contracted"
  | "retained"
  | "at-risk";

export type TrustComponents = {
  documentVerification: number;
  transactionIntegrity: number;
  qcConsistency: number;
  relationshipHistory: number;
  agentAttestation: number;
};

export type Trust = {
  score: number;
  band: TrustBand;
  components: TrustComponents;
  updatedAt: string;
};

export type Account = {
  id: string;
  name: string;
  role: Role;
  locale: string;
  district: string;
  country: string;
  since: string;
  tagline: string;
  image: string;
  trust: Trust;
  lifecycle: Lifecycle;
  churnRisk: number;
  outstandingCents: number;
  volumeKgYtd: number;
  relationships: string[];
  phone?: string;
  language: string;
};

export type Lot = {
  id: string;
  code: string;
  title: string;
  producerId: string;
  exporterId: string;
  origin: {
    country: string;
    region: string;
    farm: string;
    elevationM: number;
  };
  process: string;
  varietal: string;
  harvest: string;
  cupScore: number;
  moisturePct: number;
  screen: string;
  bags: number;
  weightKg: number;
  farmgateCents: number;
  fobCents: number;
  pricePerLbCents: number;
  logisticsCents: number;
  premiumCents: number;
  availability: LotState;
  image: string;
  notes: string;
  flavor: string[];
  followers: number;
  sampleReady: boolean;
};

export type Space = {
  id: string;
  accountId: string;
  modules: Array<"identity" | "proof" | "ledger" | "media" | "offers" | "reputation">;
  cover: string;
  published: boolean;
};

export type Story = {
  id: string;
  spaceId: string;
  accountId: string;
  title: string;
  lede: string;
  body: string;
  image: string;
  publishedAt: string;
  lotId?: string;
};

export type DocumentRecord = {
  id: string;
  kind: DocKind;
  title: string;
  accountId: string;
  lotId?: string;
  status: DocStatus;
  confidence: number;
  capturedAt: string;
  fields: Record<string, string>;
  notes?: string;
};

export type Thread = {
  id: string;
  subject: string;
  parties: string[];
  lotId?: string;
  deal: "follow" | "intro" | "sample" | "offer" | "lock" | "contract";
  updatedAt: string;
  preview: string;
};

export type Message = {
  id: string;
  threadId: string;
  fromId: string;
  body: string;
  at: string;
};

export type AgentTask = {
  id: string;
  agentId: string;
  kind: "verify" | "follow-up" | "capture" | "audit";
  title: string;
  accountId?: string;
  due: string;
  status: "open" | "done";
};

export type LedgerEvent = {
  id: string;
  at: string;
  kind: string;
  actor: string;
  summary: string;
  lotId?: string;
  accountId?: string;
};
