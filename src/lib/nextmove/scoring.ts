import { archetypeOrder } from "./archetypes";
import { questions } from "./questions";
import type { Answers, ArchetypeId, QuestionOption, SignalId } from "./types";

export const signalIds: SignalId[] = [
  "risk",
  "capital",
  "sales",
  "builder",
  "people",
  "independence",
  "time",
  "income",
];

export const signalLabels: Record<SignalId, string> = {
  risk: "Risk appetite",
  capital: "Capital readiness",
  sales: "Sales orientation",
  builder: "Builder orientation",
  people: "People orientation",
  independence: "Independence preference",
  time: "Time availability",
  income: "Income ambition",
};

function optionOf(questionId: string, optionId: string | undefined): QuestionOption | undefined {
  if (!optionId) return undefined;
  return questions.find((q) => q.id === questionId)?.options.find((o) => o.id === optionId);
}

/** Maximum achievable raw total per archetype / signal — used for normalisation. */
const maxima = (() => {
  const arch: Record<string, number> = {};
  const sig: Record<string, number> = {};
  for (const q of questions) {
    for (const id of archetypeOrder) {
      arch[id] = (arch[id] ?? 0) + Math.max(0, ...q.options.map((o) => o.a?.[id] ?? 0));
    }
    for (const id of signalIds) {
      sig[id] = (sig[id] ?? 0) + Math.max(0, ...q.options.map((o) => o.s?.[id] ?? 0));
    }
  }
  return { arch, sig };
})();

export interface ScoreResult {
  archetypeScores: Record<ArchetypeId, number>;
  ranked: ArchetypeId[];
  signals: Record<SignalId, number>;
  facts: {
    capital: number;
    hours: number;
    salesComfort: number;
    incomeTarget: number;
    preference: string;
    profession: string;
  };
  selectedOptions: QuestionOption[];
}

export function scoreAnswers(answers: Answers): ScoreResult {
  const rawArch: Record<string, number> = {};
  const rawSig: Record<string, number> = {};
  const selectedOptions: QuestionOption[] = [];

  const facts = {
    capital: 10000,
    hours: 5,
    salesComfort: 0,
    incomeTarget: 30000,
    preference: "unsure",
    profession: "a corporate role",
  };

  for (const q of questions) {
    const opt = optionOf(q.id, answers[q.id]);
    if (!opt) continue;
    selectedOptions.push(opt);
    for (const [k, v] of Object.entries(opt.a ?? {})) rawArch[k] = (rawArch[k] ?? 0) + (v ?? 0);
    for (const [k, v] of Object.entries(opt.s ?? {})) rawSig[k] = (rawSig[k] ?? 0) + (v ?? 0);
    if (opt.capital !== undefined) facts.capital = opt.capital;
    if (opt.hours !== undefined) facts.hours = opt.hours;
    if (opt.salesComfort !== undefined) facts.salesComfort = opt.salesComfort;
    if (opt.incomeTarget !== undefined) facts.incomeTarget = opt.incomeTarget;
    if (opt.preference) facts.preference = opt.preference;
    if (opt.profession) facts.profession = opt.profession;
  }

  const archetypeScores = Object.fromEntries(
    archetypeOrder.map((id) => {
      const max = maxima.arch[id] || 1;
      const pct = Math.round(((rawArch[id] ?? 0) / max) * 100);
      return [id, Math.max(0, Math.min(100, pct))];
    }),
  ) as Record<ArchetypeId, number>;

  const signals = Object.fromEntries(
    signalIds.map((id) => {
      const max = maxima.sig[id] || 1;
      const pct = Math.round(((rawSig[id] ?? 0) / max) * 100);
      return [id, Math.max(4, Math.min(100, pct))];
    }),
  ) as Record<SignalId, number>;

  const ranked = [...archetypeOrder].sort((a, b) => {
    const diff = archetypeScores[b] - archetypeScores[a];
    if (diff !== 0) return diff;
    return archetypeOrder.indexOf(a) - archetypeOrder.indexOf(b);
  });

  return { archetypeScores, ranked, signals, facts, selectedOptions };
}
