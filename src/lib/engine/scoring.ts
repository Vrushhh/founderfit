import { ArchetypeId, AssessmentAnswers, ProfileSignals, SignalKey } from '../types';
import { ASSESSMENT_QUESTIONS } from '../data/questions';

export interface RawScoringOutput {
  archetypeScores: Record<ArchetypeId, number>;
  normalizedArchetypeScores: Record<ArchetypeId, number>;
  signals: ProfileSignals;
}

export function calculateRawScores(answers: AssessmentAnswers): RawScoringOutput {
  const archetypeScores: Record<ArchetypeId, number> = {
    builder: 0,
    seller: 0,
    operator: 0,
    creator: 0,
    consultant: 0,
    product_entrepreneur: 0,
    community_builder: 0,
    local_entrepreneur: 0
  };

  const signalAccumulators: Record<SignalKey, { total: number; count: number }> = {
    riskAppetite: { total: 40, count: 1 },
    capitalReadiness: { total: 30, count: 1 },
    salesOrientation: { total: 30, count: 1 },
    builderOrientation: { total: 30, count: 1 },
    peopleOrientation: { total: 30, count: 1 },
    independencePreference: { total: 40, count: 1 },
    timeAvailability: { total: 30, count: 1 },
    incomeAmbition: { total: 40, count: 1 }
  };

  // Iterate over each question and answer
  for (const question of ASSESSMENT_QUESTIONS) {
    const selectedOptionId = answers[question.id];
    if (!selectedOptionId) continue;

    const option = question.options.find((opt) => opt.id === selectedOptionId);
    if (!option) continue;

    // Accumulate archetype weights
    for (const [archetype, weight] of Object.entries(option.archetypeWeights)) {
      archetypeScores[archetype as ArchetypeId] += weight || 0;
    }

    // Accumulate signal weights
    if (option.signalWeights) {
      for (const [sig, weight] of Object.entries(option.signalWeights)) {
        if (weight !== undefined) {
          const key = sig as SignalKey;
          signalAccumulators[key].total += weight;
          signalAccumulators[key].count += 1;
        }
      }
    }
  }

  // Find max archetype score for relative normalization (scale 0-100)
  const maxArchetypeScore = Math.max(...Object.values(archetypeScores), 1);
  const normalizedArchetypeScores: Record<ArchetypeId, number> = {} as Record<ArchetypeId, number>;

  for (const [arch, score] of Object.entries(archetypeScores)) {
    const archId = arch as ArchetypeId;
    // Base scale from 35 to 98
    const normalized = Math.min(98, Math.max(35, Math.round((score / maxArchetypeScore) * 88 + 10)));
    normalizedArchetypeScores[archId] = normalized;
  }

  // Normalize signals to 0-100
  const signals: ProfileSignals = {
    riskAppetite: clampSignal(signalAccumulators.riskAppetite.total),
    capitalReadiness: clampSignal(signalAccumulators.capitalReadiness.total),
    salesOrientation: clampSignal(signalAccumulators.salesOrientation.total),
    builderOrientation: clampSignal(signalAccumulators.builderOrientation.total),
    peopleOrientation: clampSignal(signalAccumulators.peopleOrientation.total),
    independencePreference: clampSignal(signalAccumulators.independencePreference.total),
    timeAvailability: clampSignal(signalAccumulators.timeAvailability.total),
    incomeAmbition: clampSignal(signalAccumulators.incomeAmbition.total)
  };

  return {
    archetypeScores,
    normalizedArchetypeScores,
    signals
  };
}

function clampSignal(val: number): number {
  return Math.min(98, Math.max(15, Math.round(val)));
}
