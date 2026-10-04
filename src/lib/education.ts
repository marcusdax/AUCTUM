import { POLICY } from "./policy";

export type CredentialType =
  | "DOC_OPERATOR"
  | "CUPPER_TIER_2"
  | "CUPPER_TIER_1"
  | "SAMPLE_CUSTODY"
  | "EXCEPTION_ADJUDICATOR"
  | "COLLECTOR_PASSTHROUGH_ATTESTED"
  | "PRODUCER_ONBOARDED"
  | "CUPPER_PANEL";

export type CredentialState = "active" | "expiring" | "stale" | "lapsed" | "probationary";

export type TrackId = "A" | "B" | "C" | "D" | "E" | "F";

export type AssessmentKind = "knowledge_check" | "scenario" | "practical" | "calibration";

export type Operator = {
  id: string;
  name: string;
  desk: string;
  title: string;
};

export type Credential = {
  id: string;
  type: CredentialType;
  state: CredentialState;
  issuedAt: string;
  expiresAt: string;
  issuedBy: string;
  contentVersion: string;
  sourceRef: string;
  authorityScope: string[];
  gates: string;
  staleness?: { supersededBy: string; deltaMinutes: number };
};

export type CalibrationPoint = {
  id: string;
  at: string;
  expected: number;
  observed: number;
  delta: number;
  sessionId: string;
};

export type LessonQuestion = {
  id: string;
  prompt: string;
  promptVi?: string;
  choices: { id: string; text: string; textVi?: string; correct: boolean }[];
};

export type Lesson = {
  id: string;
  track: TrackId;
  module: string;
  title: string;
  titleVi?: string;
  minutes: number;
  sourceRef: string;
  contentVersion: string;
  body: string;
  bodyVi?: string;
  questions: LessonQuestion[];
  gatesPayment: false;
  audioFirst?: boolean;
};

export type RemedyStep = {
  id: string;
  type: "lesson" | "assessment" | "calibration";
  title: string;
  minutes: number;
  lessonId?: string;
  assessmentId?: string;
};

export type BlockedAction = {
  action: string;
  actionContext: string;
  reason: "missing" | "lapsed" | "stale" | "drift";
  credentialType: CredentialType;
  estimatedMinutes: number;
  isRenewal: boolean;
  steps: RemedyStep[];
};

export const OPERATOR: Operator = {
  id: "user-chau",
  name: "Lê Minh Châu",
  desk: "Karmic Circle",
  title: "Document operator · QC desk",
};

export const CREDENTIAL_META: Record<
  CredentialType,
  { label: string; gates: string; audience: string }
> = {
  DOC_OPERATOR: {
    label: "DOC_OPERATOR",
    gates: "documents.acceptOcr",
    audience: "Ops / intake",
  },
  CUPPER_TIER_2: {
    label: "CUPPER_TIER_2",
    gates: "Independent standard checks · Tier 1 exception cupping",
    audience: "QC / cupper",
  },
  CUPPER_TIER_1: {
    label: "CUPPER_TIER_1",
    gates: "Panel cupping · Tier 2/3 exception cupping",
    audience: "QC / Q-Grader",
  },
  SAMPLE_CUSTODY: {
    label: "SAMPLE_CUSTODY",
    gates: "Sample pull · cabinet log · destruction witness",
    audience: "Warehouse",
  },
  EXCEPTION_ADJUDICATOR: {
    label: "EXCEPTION_ADJUDICATOR",
    gates: "Sign a Tier 2 disposition",
    audience: "Ops / commercial",
  },
  COLLECTOR_PASSTHROUGH_ATTESTED: {
    label: "COLLECTOR_PASSTHROUGH_ATTESTED",
    gates: "Collector partner status",
    audience: "Collector",
  },
  PRODUCER_ONBOARDED: {
    label: "PRODUCER_ONBOARDED",
    gates: "Nothing. Advisory. Never gates payment.",
    audience: "Producer",
  },
  CUPPER_PANEL: {
    label: "CUPPER_PANEL",
    gates: "Panel participation under Tier 1 supervision",
    audience: "QC / cupper",
  },
};

export const seedCredentials: Credential[] = [
  {
    id: "cred-doc",
    type: "DOC_OPERATOR",
    state: "lapsed",
    issuedAt: "2026-08-01T00:00:00Z",
    expiresAt: "2026-09-01T00:00:00Z",
    issuedBy: "Saigon Cup Lab · calibration desk",
    contentVersion: "scanner-sop v1.4",
    sourceRef: "scanner-sop Appendix A",
    authorityScope: ["Accept OCR onto ledger", "Monthly calibration set"],
    gates: CREDENTIAL_META.DOC_OPERATOR.gates,
  },
  {
    id: "cred-cup2",
    type: "CUPPER_TIER_2",
    state: "expiring",
    issuedAt: "2025-10-22T00:00:00Z",
    expiresAt: "2026-10-22T00:00:00Z",
    issuedBy: "Saigon Cup Lab",
    contentVersion: "cupping-sop v4.2",
    sourceRef: "cupping-sop §1.2, §5.1–5.2",
    authorityScope: ["Independent standard checks", "Tier 1 exception cupping"],
    gates: CREDENTIAL_META.CUPPER_TIER_2.gates,
  },
  {
    id: "cred-sample",
    type: "SAMPLE_CUSTODY",
    state: "active",
    issuedAt: "2026-01-12T00:00:00Z",
    expiresAt: "2027-01-12T00:00:00Z",
    issuedBy: "Warehouse supervisor",
    contentVersion: "retained-sample v2.1",
    sourceRef: "retained-sample §1–8",
    authorityScope: ["Sample pull signature", "Cabinet access", "Destruction witness"],
    gates: CREDENTIAL_META.SAMPLE_CUSTODY.gates,
  },
  {
    id: "cred-adj",
    type: "EXCEPTION_ADJUDICATOR",
    state: "stale",
    issuedAt: "2026-03-01T00:00:00Z",
    expiresAt: "2027-03-01T00:00:00Z",
    issuedBy: "Commercial desk",
    contentVersion: "exception-sop v4.2",
    sourceRef: "supplier-agreement §A–K",
    authorityScope: ["Sign Tier 2 disposition", "Re-price within cap"],
    gates: CREDENTIAL_META.EXCEPTION_ADJUDICATOR.gates,
    staleness: { supersededBy: "exception-sop v4.3", deltaMinutes: 18 },
  },
];

export const calibrationPoints: CalibrationPoint[] = [
  ["2026-07-08", 84.5, 84.7],
  ["2026-07-16", 85.0, 85.4],
  ["2026-07-24", 83.5, 84.1],
  ["2026-08-02", 86.0, 86.5],
  ["2026-08-11", 84.0, 84.2],
  ["2026-08-19", 85.5, 85.3],
  ["2026-08-28", 84.5, 85.0],
  ["2026-09-05", 83.0, 84.1],
  ["2026-09-14", 85.0, 86.0],
  ["2026-09-21", 84.5, 85.6],
  ["2026-09-26", 86.0, 87.1],
  ["2026-09-30", 85.0, 86.2],
].map(([at, expected, observed], i) => ({
  id: `cal-${i + 1}`,
  at: `${at}T04:00:00Z`,
  expected: Number(expected),
  observed: Number(observed),
  delta: Number((Number(observed) - Number(expected)).toFixed(2)),
  sessionId: `sess-${i + 1}`,
}));

export const lessons: Lesson[] = [
  {
    id: "e1",
    track: "E",
    module: "E1",
    title: "Queue discipline",
    minutes: 8,
    sourceRef: "scanner-sop §E1",
    contentVersion: "scanner-sop v1.4",
    gatesPayment: false,
    body: "The queue is sorted by confidence, highest first. You work top-down. Cherry-picking low-confidence documents makes the correction-rate metric lie. A confident wrong number is the failure this process exists to catch — but you reach it in order, not by hunting.",
    questions: [
      {
        id: "e1q1",
        prompt: "How do you work the OCR queue?",
        choices: [
          { id: "a", text: "Work top-down in confidence order, highest first.", correct: true },
          { id: "b", text: "Cherry-pick documents I already recognise.", correct: false },
          { id: "c", text: "Skip anything that looks hard and return later.", correct: false },
        ],
      },
    ],
  },
  {
    id: "e3",
    track: "E",
    module: "E3",
    title: "Read critical fields off the image",
    minutes: 6,
    sourceRef: "scanner-sop §E3",
    contentVersion: "scanner-sop v1.4",
    gatesPayment: false,
    body: "Extraction is a proposal. Critical fields — totals, dates, lot codes, issuer — are read off the image every time. A confident wrong number is the failure this process exists to catch.",
    questions: [
      {
        id: "e3q1",
        prompt: "When the extracted total is green and high-confidence, you should:",
        choices: [
          { id: "a", text: "Accept it. Green means it was read correctly.", correct: false },
          { id: "b", text: "Read the total off the image, then confirm or override.", correct: true },
          { id: "c", text: "Flag the whole document and move on.", correct: false },
        ],
      },
    ],
  },
  {
    id: "e5",
    track: "E",
    module: "E5",
    title: "Rejection without penalty",
    minutes: 5,
    sourceRef: "scanner-sop §E5",
    contentVersion: "scanner-sop v1.4",
    gatesPayment: false,
    body: "Rejection carries no Trust penalty for the uploader, deliberately. A wrongly linked document is worse than an unlinked one. Flag rather than force.",
    questions: [
      {
        id: "e5q1",
        prompt: "If a receipt cannot be matched to a lot, you should:",
        choices: [
          { id: "a", text: "Force the closest lot so the queue clears.", correct: false },
          { id: "b", text: "Reject or flag unmatched. No Trust penalty for the uploader.", correct: true },
          { id: "c", text: "Accept and note it in chat.", correct: false },
        ],
      },
    ],
  },
  {
    id: "e6",
    track: "E",
    module: "E6",
    title: "Issuer class",
    minutes: 7,
    sourceRef: "scanner-sop §E6",
    contentVersion: "scanner-sop v1.4",
    gatesPayment: false,
    body: "Self-issued, counterparty, independent third party, and government do not weigh the same. A notarised sheet is not a self-issued claim. Issuer class is a Trust input about the paper, not about the operator.",
    questions: [
      {
        id: "e6q1",
        prompt: "A notarised phytosanitary certificate is which issuer class?",
        choices: [
          { id: "a", text: "Self-issued", correct: false },
          { id: "b", text: "Counterparty", correct: false },
          { id: "c", text: "Independent third party / government", correct: true },
        ],
      },
    ],
  },
  {
    id: "c7",
    track: "C",
    module: "C7",
    title: "Producer-side asymmetry",
    minutes: 12,
    sourceRef: "revenue-share §5.2",
    contentVersion: "exception-sop v4.3",
    gatesPayment: false,
    body: "Floor payment is not clawed back absent confirmed fraud. Tier 3 excludes a lot from revenue share but does not reverse subsistence. The asymmetry is deliberate: education must never gate a floor payment, and a disposition must not starve a verified farmer.",
    questions: [
      {
        id: "c7q1",
        prompt: "A lot is dispositioned Tier 3. What happens to the floor already paid?",
        choices: [
          { id: "a", text: "Clawed back from the next harvest.", correct: false },
          { id: "b", text: "Held. The farmer is unpaid until appeal.", correct: false },
          { id: "c", text: "It stands. Revenue share is excluded. Subsistence is not reversed.", correct: true },
        ],
      },
    ],
  },
  {
    id: "d2",
    track: "D",
    module: "D2",
    title: "Reading your True Price Receipt",
    titleVi: "Đọc biên nhận giá thực",
    minutes: 8,
    sourceRef: "revenue-share §5.2",
    contentVersion: "revenue-share v3.1",
    gatesPayment: false,
    audioFirst: true,
    body: "Every line of the receipt is money: net weight, cup score, tier, floor, final sale, deductions, share, amount received. The amount received is at the bottom. This lesson does not affect your payment.",
    bodyVi:
      "Mỗi dòng trên biên nhận là tiền: trọng lượng thực, điểm cupping, hạng, giá sàn, giá bán cuối, khấu trừ, tỷ lệ chia sẻ, số tiền nhận. Số tiền nhận nằm ở cuối biên nhận. Bài học này không ảnh hưởng đến thanh toán của bạn.",
    questions: [
      {
        id: "d2q1",
        prompt: "Where is the amount received shown on the receipt?",
        promptVi: "Số tiền nhận được ghi ở đâu trên biên nhận?",
        choices: [
          { id: "a", text: "At the top", textVi: "Ở đầu biên nhận", correct: false },
          { id: "b", text: "At the bottom", textVi: "Ở cuối biên nhận", correct: true },
          { id: "c", text: "In the middle", textVi: "Ở giữa biên nhận", correct: false },
        ],
      },
      {
        id: "d2q2",
        prompt: "Does skipping this lesson change your floor payment?",
        promptVi: "Bỏ qua bài học này có làm thay đổi tiền sàn không?",
        choices: [
          { id: "a", text: "Yes — you must finish to be paid.", textVi: "Có — phải học xong mới được trả.", correct: false },
          { id: "b", text: "No. Floor is paid on verification. Always.", textVi: "Không. Tiền sàn được trả khi xác minh. Luôn luôn.", correct: true },
        ],
      },
    ],
  },
  {
    id: "d-map",
    track: "D",
    module: "D-field",
    title: "Walk the boundary",
    titleVi: "Đi vòng ranh thửa",
    minutes: 6,
    sourceRef: "EUDR geolocation · farmer sitting",
    contentVersion: "field-v1",
    gatesPayment: false,
    audioFirst: true,
    body: "Stand on the plot. Drop a corner at each turn, or start with the phone’s position. Six decimal places. If the area is over 4 hectares, the boundary is what a European buyer will ask for. A town, and a pin with no area, are not a plot. Saving the line does not file a statement, and it does not change what you are paid.",
    bodyVi:
      "Đứng trên thửa. Đặt một góc ở mỗi chỗ ngoặt, hoặc bắt đầu bằng vị trí của điện thoại. Sáu chữ số thập phân. Nếu diện tích trên 4 héc-ta, đường ranh là thứ người mua châu Âu sẽ hỏi. Một thị trấn, và một ghim không có diện tích, không phải là một thửa. Lưu đường ranh không nộp tờ khai, và không đổi số tiền bạn được trả.",
    questions: [
      {
        id: "dmap1",
        prompt: "The map says 5.2 hectares and you saved only a pin. Is that enough for a European shipment?",
        promptVi: "Bản đồ ghi 5,2 héc-ta và bạn chỉ lưu một ghim. Như vậy có đủ cho một lô sang châu Âu không?",
        choices: [
          { id: "a", text: "Yes. A pin is a plot.", textVi: "Có. Một ghim là một thửa.", correct: false },
          { id: "b", text: "No. Over 4 hectares the boundary has to be drawn.", textVi: "Không. Trên 4 héc-ta phải vẽ đường ranh.", correct: true },
          { id: "c", text: "Yes, if the country is called low risk.", textVi: "Có, nếu quốc gia được gọi là rủi ro thấp.", correct: false },
        ],
      },
    ],
  },
  {
    id: "d-sky",
    track: "D",
    module: "D-field",
    title: "Read the sky before you dry",
    titleVi: "Đọc trời trước khi phơi",
    minutes: 6,
    sourceRef: "drying practice · farmer sitting",
    contentVersion: "field-v1",
    gatesPayment: false,
    audioFirst: true,
    body: "If the reading shows rain, do not spread cherry. Cover what is already on the bed. Wind without rain means drying can move. The moisture that ends the batch is a meter on the parchment, about 10–12%, not a feeling about the afternoon. The radar is a picture of rain. It does not tell you the cup.",
    bodyVi:
      "Nếu số liệu có mưa, đừng trải quả. Che những gì đã nằm trên sân. Gió mà không mưa thì có thể phơi. Độ ẩm kết thúc mẻ là đồng hồ trên nhân, khoảng 10–12%, không phải cảm giác về buổi chiều. Radar là hình mưa. Nó không nói điểm cup.",
    questions: [
      {
        id: "dsky1",
        prompt: "Rain is on the reading and the cherry is still in the basket. What do you do?",
        promptVi: "Số liệu đang mưa và quả vẫn trong rổ. Bạn làm gì?",
        choices: [
          { id: "a", text: "Spread it. The radar might be wrong.", textVi: "Trải ra. Radar có thể sai.", correct: false },
          { id: "b", text: "Leave it covered. Do not spread into rain.", textVi: "Để che. Đừng trải ra khi trời mưa.", correct: true },
          { id: "c", text: "Spread it and write 11% moisture.", textVi: "Trải ra và ghi độ ẩm 11%.", correct: false },
        ],
      },
    ],
  },
  {
    id: "d-picture",
    track: "D",
    module: "D-field",
    title: "What the picture is not",
    titleVi: "Bức ảnh không phải là gì",
    minutes: 5,
    sourceRef: "Atlas imagery · farmer sitting",
    contentVersion: "field-v1",
    gatesPayment: false,
    audioFirst: true,
    body: "Satellite shows the canopy. Streets show the road. Neither one diagnoses leaf rust, berry borer, or the soil. A person still has to look at the tree and, if a buyer needs it, take a sample. The picture does not recommend a variety, and it does not predict a yield. A country being called low risk is not a reason to skip the boundary.",
    bodyVi:
      "Ảnh vệ tinh cho thấy tán. Bản đồ đường cho thấy đường. Cả hai không chẩn đoán bệnh gỉ sắt, mọt đục quả, hay đất. Vẫn phải có người nhìn cây, và nếu người mua cần, lấy mẫu. Bức ảnh không chọn giống, và không dự báo năng suất. Việc một quốc gia được gọi là rủi ro thấp không phải là lý do để bỏ đường ranh.",
    questions: [
      {
        id: "dpic1",
        prompt: "The satellite view looks thin on one side of the plot. What has the desk proved?",
        promptVi: "Ảnh vệ tinh trông thưa ở một phía thửa. Bàn này đã chứng minh được gì?",
        choices: [
          { id: "a", text: "Leaf rust. Spray tomorrow.", textVi: "Bệnh gỉ sắt. Phun ngày mai.", correct: false },
          { id: "b", text: "Nothing botanical. Someone has to look at the tree.", textVi: "Không có gì về cây. Phải có người nhìn cây.", correct: true },
          { id: "c", text: "The yield for next year.", textVi: "Năng suất năm sau.", correct: false },
        ],
      },
    ],
  },
];

export const farmerPackage = [
  { id: "d-map", title: "Walk the boundary", titleVi: "Đi vòng ranh thửa" },
  { id: "d-sky", title: "Read the sky before you dry", titleVi: "Đọc trời trước khi phơi" },
  { id: "d-picture", title: "What the picture is not", titleVi: "Bức ảnh không phải là gì" },
] as const;

export const tracks: {
  id: TrackId;
  title: string;
  audience: string;
  issues: string;
  why: string;
  modules: { id: string; title: string }[];
}[] = [
  {
    id: "A",
    title: "Cupper certification",
    audience: "QC / cupper",
    issues: "CUPPER_TIER_2",
    why: "Without it you may set the room. You may not score. Past three points of variance, you lose the right.",
    modules: [
      { id: "A1", title: "Why cupping is not an art" },
      { id: "A2", title: "Sensory acuity" },
      { id: "A3", title: "The lexicon" },
      { id: "A4", title: "Consistency" },
      { id: "A5", title: "The scorecard" },
      { id: "A6", title: "Tolerance bands" },
      { id: "A7", title: "Cupping inside an exception" },
      { id: "A8", title: "Room, water, roast" },
    ],
  },
  {
    id: "B",
    title: "Retained sample custody",
    audience: "Warehouse",
    issues: "SAMPLE_CUSTODY",
    why: "Without it the reference is a bag in a closet. A closet cannot support a claim.",
    modules: [
      { id: "B1", title: "Why the sample is evidence" },
      { id: "B2", title: "The pull" },
      { id: "B3", title: "Seal and label" },
      { id: "B4", title: "Dual verification" },
      { id: "B5", title: "Cabinet discipline" },
      { id: "B6", title: "Access and custody log" },
      { id: "B7", title: "Retention and destruction" },
      { id: "B8", title: "When it goes wrong" },
    ],
  },
  {
    id: "C",
    title: "Exception handling",
    audience: "Ops / commercial",
    issues: "EXCEPTION_ADJUDICATOR",
    why: "Without it a downgrade is a negotiation. With it, there are four endings, and the floor is not one of them.",
    modules: [
      { id: "C1", title: "Five-phase lifecycle" },
      { id: "C2", title: "Tier classification" },
      { id: "C3", title: "Four dispositions" },
      { id: "C4", title: "Re-pricing model" },
      { id: "C5", title: "Fault attribution" },
      { id: "C6", title: "Claims and escalation" },
      { id: "C7", title: "Producer-side asymmetry" },
      { id: "C8", title: "Counter-evidence and appeal" },
    ],
  },
  {
    id: "D",
    title: "Producer & collector",
    audience: "Vietnamese-first, never gates payment",
    issues: "PRODUCER_ONBOARDED / COLLECTOR_PASSTHROUGH_ATTESTED",
    why: "Without it the receipt is a number. With it you can see the floor, the share, and what you are allowed to dispute.",
    modules: [
      { id: "D1", title: "You are paid twice" },
      { id: "D2", title: "Reading your True Price Receipt" },
      { id: "D3", title: "What a cup score is" },
      { id: "D4", title: "The five tiers" },
      { id: "D5", title: "Moisture and drying" },
      { id: "D6", title: "Disclosing a protocol deviation" },
      { id: "D7", title: "Your rights" },
      { id: "D8", title: "Collector obligations" },
    ],
  },
  {
    id: "E",
    title: "Document intake",
    audience: "Ops / intake",
    issues: "DOC_OPERATOR",
    why: "Without it a scan is a picture. Accepting the picture writes the ledger in your name.",
    modules: [
      { id: "E1", title: "Queue discipline" },
      { id: "E2", title: "Accept-all-green" },
      { id: "E3", title: "Read fields off the image" },
      { id: "E4", title: "Matching" },
      { id: "E5", title: "Rejection without penalty" },
      { id: "E6", title: "Issuer class" },
      { id: "E7", title: "Exceptions" },
    ],
  },
  {
    id: "F",
    title: "Buyer literacy",
    audience: "Catalog · optional, never gating",
    issues: "None",
    why: "Without it the bag can say anything. With it you can tell a sentence from a document. It gates nothing.",
    modules: [
      { id: "F1", title: "Reading a verification record" },
      { id: "F2", title: "Unrounded cup scores" },
      { id: "F3", title: "What a retained sample is" },
      { id: "F4", title: "EUDR documentation" },
    ],
  },
];

export const calibrationDocs = [
  {
    id: "cd-1",
    title: "Farmgate receipt · Trần Thị Mai",
    field: "Total",
    imageHint: "Amount received at the foot of the sheet",
    options: ["45,000,000 VND", "54,000,000 VND", "4,500,000 VND"],
    answer: "45,000,000 VND",
  },
  {
    id: "cd-2",
    title: "ICA phytosanitary · 018",
    field: "Issuer class",
    imageHint: "Notarised government stamp, not a farm letter",
    options: ["Self-issued", "Counterparty", "Independent third party / government"],
    answer: "Independent third party / government",
  },
  {
    id: "cd-3",
    title: "Cupping sheet · 084",
    field: "Score",
    imageHint: "Unrounded, two decimal places",
    options: ["86", "86.4", "86.42"],
    answer: "86.42",
  },
];

export const scenarioC = {
  id: "c-adj-2",
  title: "Exception adjudication · Scenario 2 of 3",
  lot: "AL-VN-26-084",
  origin: "Đắk Lắk · Cư M'gar",
  producer: "Trần Thị Mai",
  initialCup: 86.42,
  recup: 79.0,
  evidence: "Retained sample re-cup, blind, Tier 2. Phenolic note on one bowl. Seal intact.",
  correctTier: "2",
  correctDisposition: "Downgrade",
  correctPrice: 3.71,
  floorStands: true,
};

export function daysUntil(iso: string, from = new Date()) {
  const ms = new Date(iso).getTime() - from.getTime();
  return Math.round(ms / 86_400_000);
}

export function daysSince(iso: string, from = new Date()) {
  return -daysUntil(iso, from);
}

export function hasAuthority(credentials: Credential[], type: CredentialType) {
  const c = credentials.find((x) => x.type === type);
  if (!c) return false;
  return c.state === "active" || c.state === "expiring" || c.state === "stale";
}

export function moneyAdjacentBlock(type: CredentialType) {
  return type === "DOC_OPERATOR" || type === "EXCEPTION_ADJUDICATOR" || type === "CUPPER_TIER_2";
}

export function blockedActions(credentials: Credential[]): BlockedAction[] {
  const blocks: BlockedAction[] = [];
  const doc = credentials.find((c) => c.type === "DOC_OPERATOR");
  if (!doc || doc.state === "lapsed" || doc.state === "probationary") {
    blocks.push({
      action: "Accept OCR onto the ledger",
      actionContext: "Scan desk · documents.acceptOcr",
      reason: "lapsed",
      credentialType: "DOC_OPERATOR",
      estimatedMinutes: 20,
      isRenewal: true,
      steps: [
        { id: "s1", type: "lesson", title: "E1 · Queue discipline", minutes: 8, lessonId: "e1" },
        { id: "s2", type: "calibration", title: "Monthly calibration set", minutes: 12, assessmentId: "e-cal" },
      ],
    });
  }
  const adj = credentials.find((c) => c.type === "EXCEPTION_ADJUDICATOR");
  if (adj?.state === "stale") {
    blocks.push({
      action: "Sign a Tier 2 disposition (content stale)",
      actionContext: "Exception desk · warn, still valid",
      reason: "stale",
      credentialType: "EXCEPTION_ADJUDICATOR",
      estimatedMinutes: 18,
      isRenewal: true,
      steps: [
        { id: "s3", type: "lesson", title: "C7 · Producer-side asymmetry", minutes: 12, lessonId: "c7" },
        { id: "s4", type: "assessment", title: "One adjudication scenario", minutes: 6, assessmentId: "c-adj-2" },
      ],
    });
  }
  return blocks;
}

export function currentVariance(points: CalibrationPoint[]) {
  if (!points.length) return 0;
  const last = points[points.length - 1];
  return last.delta;
}

export function meanVariance(points: CalibrationPoint[]) {
  if (!points.length) return 0;
  const sum = points.reduce((n, p) => n + p.delta, 0);
  return Number((sum / points.length).toFixed(2));
}

export function withinTolerance(delta: number) {
  return Math.abs(delta) <= POLICY.cuppingVariance.probation;
}

export function lessonById(id: string) {
  return lessons.find((l) => l.id === id);
}
