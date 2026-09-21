export type QuestionId =
  | 'current_role'
  | 'natural_strengths'
  | 'energizing_work'
  | 'work_frustration'
  | 'starting_capital'
  | 'weekly_time'
  | 'sales_comfort'
  | 'attractive_model'
  | 'target_income'
  | 'core_motivation';

export interface Option {
  id: string;
  label: string;
  subtitle?: string;
  archetypeWeights: Partial<Record<ArchetypeId, number>>;
  signalWeights?: Partial<Record<SignalKey, number>>;
}

export interface Question {
  id: QuestionId;
  number: number;
  question: string;
  contextHint?: string;
  options: Option[];
}

export type ArchetypeId =
  | 'builder'
  | 'seller'
  | 'operator'
  | 'creator'
  | 'consultant'
  | 'product_entrepreneur'
  | 'community_builder'
  | 'local_entrepreneur';

export interface Archetype {
  id: ArchetypeId;
  name: string;
  tagline: string;
  description: string;
  traits: string[];
  recommendedBusinessTypes: string[];
}

export type SignalKey =
  | 'riskAppetite'
  | 'capitalReadiness'
  | 'salesOrientation'
  | 'builderOrientation'
  | 'peopleOrientation'
  | 'independencePreference'
  | 'timeAvailability'
  | 'incomeAmbition';

export interface ProfileSignals {
  riskAppetite: number; // 0-100
  capitalReadiness: number; // 0-100
  salesOrientation: number; // 0-100
  builderOrientation: number; // 0-100
  peopleOrientation: number; // 0-100
  independencePreference: number; // 0-100
  timeAvailability: number; // 0-100
  incomeAmbition: number; // 0-100
}

export interface BusinessBlueprint {
  id: string;
  name: string;
  tagline: string;
  archetypeId: ArchetypeId;
  fitScore: number;
  capitalRange: string;
  timeCommitment: string;
  businessType: 'Service' | 'Agency' | 'Digital Product' | 'Consulting' | 'Managed Operations' | 'Local Niche';
  firstTarget: string;
  exampleOffer: string;
  pricingModel: string;
  firstCustomerStrategy: string;
  whyThisFitsYou: string[];
  businessModelExplanation: string;
  targetCustomerTypes: { title: string; description: string }[];
  first7Days: { day: number; task: string; detail: string }[];
  first30Days: { week: number; focus: string; deliverables: string[] }[];
  whatToAvoid: { model: string; reason: string }[];
  mindsetShift: string;
}

export interface AssessmentAnswers {
  [key: string]: string; // questionId -> optionId
}

export interface AssessmentResult {
  primaryArchetype: Archetype;
  secondaryArchetype: Archetype;
  archetypeScores: Record<ArchetypeId, number>;
  signals: ProfileSignals;
  primaryBlueprint: BusinessBlueprint;
  alternativeBlueprint: BusinessBlueprint;
  userSummary: {
    currentRole: string;
    availableCapital: string;
    availableTime: string;
    salesComfort: string;
  };
}

export interface PaymentOrder {
  orderId: string;
  amount: number;
  currency: string;
  status: 'created' | 'paid' | 'failed';
  blueprintId?: string;
}
