import { AssessmentAnswers } from '../types';

export interface TestPersona {
  id: string;
  name: string;
  roleDescription: string;
  expectedOutcome: string;
  answers: AssessmentAnswers;
}

export const TEST_PERSONAS: TestPersona[] = [
  {
    id: 'persona_1_swe',
    name: 'Aarav — Software Engineer',
    roleDescription: 'Senior Backend Engineer tired of sprint tickets and endless meetings. Low upfront capital, 10 hrs/week.',
    expectedOutcome: 'AI Automation Agency or Micro-SaaS',
    answers: {
      current_role: 'it_software',
      natural_strengths: 'building_things',
      energizing_work: 'building_things_energy',
      work_frustration: 'repetitive_work',
      starting_capital: 'cap_25k',
      weekly_time: 'time_10h',
      sales_comfort: 'can_learn',
      attractive_model: 'model_technology',
      target_income: 'inc_2lakh',
      core_motivation: 'building_own'
    }
  },
  {
    id: 'persona_2_sales',
    name: 'Rohan — B2B Sales Lead',
    roleDescription: 'Corporate Account Executive frustrated by commission caps and delayed payouts. Loves closing deals.',
    expectedOutcome: 'B2B Lead Generation Agency',
    answers: {
      current_role: 'sales',
      natural_strengths: 'selling',
      energizing_work: 'finding_customers',
      work_frustration: 'low_salary',
      starting_capital: 'cap_25k',
      weekly_time: 'time_10h',
      sales_comfort: 'enjoy_selling',
      attractive_model: 'model_agency',
      target_income: 'inc_5lakh_plus',
      core_motivation: 'money'
    }
  },
  {
    id: 'persona_3_hr',
    name: 'Priyanka — Talent & HRBP',
    roleDescription: 'HR professional who understands hiring pain points, wants low-risk side venture with high credibility.',
    expectedOutcome: 'Niche Talent Placement / Corporate Training',
    answers: {
      current_role: 'hr',
      natural_strengths: 'talking_to_people',
      energizing_work: 'teaching_others',
      work_frustration: 'no_growth',
      starting_capital: 'cap_10k',
      weekly_time: 'time_10h',
      sales_comfort: 'comfortable',
      attractive_model: 'model_service',
      target_income: 'inc_1lakh',
      core_motivation: 'freedom'
    }
  },
  {
    id: 'persona_4_marketing',
    name: 'Sneha — Growth Marketer',
    roleDescription: 'Brand & Performance marketer who excels at content hooks, visual storytelling, and campaign strategy.',
    expectedOutcome: 'B2B Content & UGC Agency',
    answers: {
      current_role: 'marketing',
      natural_strengths: 'creating_content',
      energizing_work: 'creating_something',
      work_frustration: 'no_autonomy',
      starting_capital: 'cap_50k',
      weekly_time: 'time_10h',
      sales_comfort: 'can_learn',
      attractive_model: 'model_content',
      target_income: 'inc_2lakh',
      core_motivation: 'freedom'
    }
  },
  {
    id: 'persona_5_busy_corp',
    name: 'Vikram — Time-Starved Corporate Mgr',
    roleDescription: 'Works long hours in ops/finance, only 5 hrs/week to spare, very risk averse, wants freedom without capex.',
    expectedOutcome: 'Fractional Advisory / High-Margin Side Consulting',
    answers: {
      current_role: 'finance',
      natural_strengths: 'analyzing_numbers',
      energizing_work: 'working_independently',
      work_frustration: 'long_hours',
      starting_capital: 'cap_10k',
      weekly_time: 'time_5h',
      sales_comfort: 'hate_selling',
      attractive_model: 'model_service',
      target_income: 'inc_50k',
      core_motivation: 'leaving_corporate'
    }
  }
];
