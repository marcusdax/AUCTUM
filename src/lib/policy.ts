/**
 * Single policy module. Lesson copy and runtime gates read from here.
 * Never hardcode thresholds in lesson bodies.
 */
export const POLICY = {
  moisturePct: { min: 10.5, max: 12.5, source: "revenue-share Exhibit A" },
  cuppingVariance: {
    probation: 3.0,
    recovery: 1.5,
    reference: 1.0,
    source: "cupping-sop §1.3",
  },
  operatorAgreementPct: { min: 90, source: "scanner-sop Appendix A" },
  repricingCapPct: { max: 50, source: "supplier-agreement §C4" },
  shareByCup: [
    { minScore: 86, sharePct: 50 },
    { minScore: 80, sharePct: 35 },
    { minScore: 75, sharePct: 20 },
    { minScore: 70, sharePct: 10 },
    { minScore: 0, sharePct: 0 },
  ],
  renewalWindowDays: 30,
  credentialExpiryWarnDays: [30, 7, 1],
} as const;

export function sharePctForScore(score: number) {
  const row = POLICY.shareByCup.find((r) => score >= r.minScore);
  return row?.sharePct ?? 0;
}

export function moistureCopy() {
  return `${POLICY.moisturePct.min.toFixed(1)}–${POLICY.moisturePct.max.toFixed(1)}%`;
}
