import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  type Credential,
  type CredentialType,
  OPERATOR,
  blockedActions,
  calibrationDocs,
  hasAuthority,
  scenarioC,
  seedCredentials,
} from "./education";

export type LessonProgress = {
  lessonId: string;
  completedAt: string;
  passed: boolean;
};

export type EducationEvent = {
  id: string;
  at: string;
  kind: string;
  summary: string;
};

type EducationState = {
  credentials: Credential[];
  completedLessons: LessonProgress[];
  calAnswers: Record<string, string>;
  calSubmitted: boolean;
  scenario: { tier: string; disposition: string; price: string; submitted: boolean; passed: boolean };
  events: EducationEvent[];
  inlineLessonId: string | null;
  hydrated: boolean;
  markHydrated: () => void;
  hasAuthority: (type: CredentialType) => boolean;
  completeLesson: (lessonId: string, passed: boolean) => void;
  answerCal: (docId: string, value: string) => void;
  submitCalibration: () => { agreementPct: number; passed: boolean };
  submitScenario: (tier: string, disposition: string, price: number) => boolean;
  beginRemedy: (lessonId: string) => void;
  closeInline: () => void;
  issueCredential: (type: CredentialType) => void;
  reset: () => void;
};

function now() {
  return new Date().toISOString();
}

function activate(c: Credential): Credential {
  const expires = new Date();
  if (c.type === "DOC_OPERATOR") expires.setMonth(expires.getMonth() + 1);
  else expires.setFullYear(expires.getFullYear() + 1);
  return {
    ...c,
    state: "active",
    issuedAt: now(),
    expiresAt: expires.toISOString(),
    staleness: undefined,
  };
}

const seed = {
  credentials: seedCredentials,
  completedLessons: [] as LessonProgress[],
  calAnswers: {} as Record<string, string>,
  calSubmitted: false,
  scenario: { tier: "", disposition: "", price: "", submitted: false, passed: false },
  events: [
    {
      id: "ed-0",
      at: "2026-09-01T00:00:00Z",
      kind: "education.credential.lapsed",
      summary: "DOC_OPERATOR lapsed. Monthly calibration not completed.",
    },
    {
      id: "ed-1",
      at: "2026-09-18T00:00:00Z",
      kind: "education.credential.stale",
      summary: "EXCEPTION_ADJUDICATOR earned against exception-sop v4.2. Current is v4.3.",
    },
  ] as EducationEvent[],
  inlineLessonId: null as string | null,
};

export const useEducation = create<EducationState>()(
  persist(
    (set, get) => ({
      ...seed,
      hydrated: false,
      markHydrated: () => set({ hydrated: true }),
      hasAuthority: (type) => hasAuthority(get().credentials, type),
      completeLesson: (lessonId, passed) => {
        if (!passed) return;
        set((s) => {
          if (s.completedLessons.some((p) => p.lessonId === lessonId)) return s;
          return {
            completedLessons: [...s.completedLessons, { lessonId, completedAt: now(), passed }],
            events: [
              {
                id: `ed-${Date.now()}`,
                at: now(),
                kind: "education.lesson.completed",
                summary: `Lesson ${lessonId} completed.`,
              },
              ...s.events,
            ],
          };
        });
      },
      answerCal: (docId, value) => set((s) => ({ calAnswers: { ...s.calAnswers, [docId]: value } })),
      submitCalibration: () => {
        const answers = get().calAnswers;
        const total = calibrationDocs.length;
        const correct = calibrationDocs.filter((d) => answers[d.id] === d.answer).length;
        const agreementPct = Number(((correct / total) * 100).toFixed(2));
        const passed = agreementPct >= 90;
        set((s) => ({
          calSubmitted: true,
          events: [
            {
              id: `ed-${Date.now()}`,
              at: now(),
              kind: "education.assessment.graded",
              summary: `Calibration agreement ${agreementPct.toFixed(2)}%. ${passed ? "Pass." : "Below target."}`,
            },
            ...s.events,
          ],
        }));
        if (passed) get().issueCredential("DOC_OPERATOR");
        return { agreementPct, passed };
      },
      submitScenario: (tier, disposition, price) => {
        const passed =
          tier === scenarioC.correctTier &&
          disposition === scenarioC.correctDisposition &&
          Math.abs(price - scenarioC.correctPrice) <= 0.01;
        set((s) => ({
          scenario: { tier, disposition, price: price.toFixed(2), submitted: true, passed },
        }));
        if (passed) get().issueCredential("EXCEPTION_ADJUDICATOR");
        return passed;
      },
      beginRemedy: (lessonId) => set({ inlineLessonId: lessonId }),
      closeInline: () => set({ inlineLessonId: null }),
      issueCredential: (type) =>
        set((s) => {
          const next = s.credentials.map((c) => (c.type === type ? activate(c) : c));
          return {
            credentials: next,
            inlineLessonId: null,
            events: [
              {
                id: `ed-${Date.now()}`,
                at: now(),
                kind: "education.credential.issued",
                summary: `${type} renewed. Authority restored.`,
              },
              ...s.events,
            ],
          };
        }),
      reset: () => set({ ...seed, hydrated: true }),
    }),
    {
      name: "auctum-education-v1",
      skipHydration: true,
      partialize: (s) => ({
        credentials: s.credentials,
        completedLessons: s.completedLessons,
        calAnswers: s.calAnswers,
        calSubmitted: s.calSubmitted,
        scenario: s.scenario,
        events: s.events,
      }),
    },
  ),
);

export function readiness(state: Pick<EducationState, "credentials" | "completedLessons">) {
  return {
    operator: OPERATOR,
    credentials: state.credentials,
    blocked: blockedActions(state.credentials),
    completed: state.completedLessons,
  };
}
