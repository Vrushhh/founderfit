export type ArchetypeId =
  | "builder"
  | "seller"
  | "operator"
  | "creator"
  | "consultant"
  | "product"
  | "community"
  | "local";

export type SignalId =
  | "risk"
  | "capital"
  | "sales"
  | "builder"
  | "people"
  | "independence"
  | "time"
  | "income";

export interface QuestionOption {
  id: string;
  label: string;
  /** points added to archetypes */
  a?: Partial<Record<ArchetypeId, number>>;
  /** points added to profile signals */
  s?: Partial<Record<SignalId, number>>;
  /** hard facts used by the recommendation layer */
  capital?: number;
  hours?: number;
  salesComfort?: number;
  incomeTarget?: number;
  preference?: string;
  profession?: string;
}

export interface Question {
  id: string;
  title: string;
  hint?: string;
  options: QuestionOption[];
}

export type Answers = Record<string, string>;

export interface Archetype {
  id: ArchetypeId;
  name: string;
  line: string;
  blurb: string;
}

export interface Business {
  id: string;
  archetype: ArchetypeId;
  name: string;
  type: string;
  reqCapital: number;
  reqHours: number;
  reqSales: number;
  prefs: string[];
  capitalRange: string;
  model: string;
  customers: string[];
  firstOffer: string;
  pricing: string;
  firstCustomer: string;
  firstGoal: string;
  sevenDays: string[];
  thirtyDays: { week: string; task: string }[];
  avoid: { name: string; why: string }[];
}

export interface Blueprint {
  primary: Business;
  alternative: Business;
  archetype: Archetype;
  altArchetype: Archetype;
  fit: number;
  signals: Record<SignalId, number>;
  reasons: string[];
  facts: {
    capital: number;
    hours: number;
    salesComfort: number;
    incomeTarget: number;
    preference: string;
    profession: string;
  };
}
