import type { Trust, TrustBand, TrustComponents } from "./types";

export const TRUST_WEIGHTS = {
  documentVerification: 0.35,
  transactionIntegrity: 0.25,
  qcConsistency: 0.15,
  relationshipHistory: 0.15,
  agentAttestation: 0.1,
} as const;

export const TRUST_LABELS: Record<keyof TrustComponents, string> = {
  documentVerification: "Document verification",
  transactionIntegrity: "Transaction integrity",
  qcConsistency: "QC consistency",
  relationshipHistory: "Relationship history",
  agentAttestation: "Agent attestation",
};

export function bandFromScore(score: number): TrustBand {
  if (score >= 90) return "sealed";
  if (score >= 75) return "verified";
  if (score >= 60) return "provisional";
  if (score >= 40) return "watch";
  return "restricted";
}

export function computeTrust(components: TrustComponents, at = new Date().toISOString()): Trust {
  const score = Math.round(
    components.documentVerification * TRUST_WEIGHTS.documentVerification +
      components.transactionIntegrity * TRUST_WEIGHTS.transactionIntegrity +
      components.qcConsistency * TRUST_WEIGHTS.qcConsistency +
      components.relationshipHistory * TRUST_WEIGHTS.relationshipHistory +
      components.agentAttestation * TRUST_WEIGHTS.agentAttestation,
  );
  return { score, band: bandFromScore(score), components, updatedAt: at };
}

export function bumpComponent(
  components: TrustComponents,
  key: keyof TrustComponents,
  delta: number,
): TrustComponents {
  const next = Math.max(0, Math.min(100, components[key] + delta));
  return { ...components, [key]: next };
}
