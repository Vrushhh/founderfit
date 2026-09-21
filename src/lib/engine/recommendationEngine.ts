import { ArchetypeId, AssessmentAnswers, AssessmentResult, BusinessBlueprint } from '../types';
import { ARCHETYPES } from '../data/archetypes';
import { BUSINESS_BLUEPRINTS } from '../data/businesses';
import { calculateRawScores } from './scoring';

export function generateBusinessRecommendation(answers: AssessmentAnswers): AssessmentResult {
  const { normalizedArchetypeScores, signals } = calculateRawScores(answers);

  // Sort archetypes by score descending
  const sortedArchetypes = (Object.keys(normalizedArchetypeScores) as ArchetypeId[]).sort(
    (a, b) => normalizedArchetypeScores[b] - normalizedArchetypeScores[a]
  );

  const primaryArchetypeId = sortedArchetypes[0];
  const secondaryArchetypeId = sortedArchetypes[1] || 'consultant';

  const primaryArchetype = ARCHETYPES[primaryArchetypeId];
  const secondaryArchetype = ARCHETYPES[secondaryArchetypeId];

  // Pick primary business blueprint accounting for constraints
  const primaryBusinessKey = selectBestBusinessKey(answers, primaryArchetypeId);
  let alternativeBusinessKey = selectBestBusinessKey(answers, secondaryArchetypeId, [primaryBusinessKey]);

  if (alternativeBusinessKey === primaryBusinessKey) {
    // fallback to a diverse complementary blueprint
    const fallbacks = Object.keys(BUSINESS_BLUEPRINTS).filter((k) => k !== primaryBusinessKey);
    alternativeBusinessKey = fallbacks[0] || 'fractional_advisory';
  }

  const basePrimary = BUSINESS_BLUEPRINTS[primaryBusinessKey] || BUSINESS_BLUEPRINTS.ai_automation_agency;
  const baseAlt = BUSINESS_BLUEPRINTS[alternativeBusinessKey] || BUSINESS_BLUEPRINTS.fractional_advisory;

  // Calculate tailored fit score (85 - 95 base range)
  const fitScore = Math.min(96, Math.max(83, normalizedArchetypeScores[primaryArchetypeId] - 3));
  const altFitScore = Math.min(fitScore - 4, Math.max(76, normalizedArchetypeScores[secondaryArchetypeId] - 6));

  // Generate personalized "Why this fits you"
  const personalizedReasons = generatePersonalizedReasons(answers, basePrimary.id);
  const altReasons = generatePersonalizedReasons(answers, baseAlt.id);

  const primaryBlueprint: BusinessBlueprint = {
    ...basePrimary,
    fitScore,
    whyThisFitsYou: personalizedReasons
  };

  const alternativeBlueprint: BusinessBlueprint = {
    ...baseAlt,
    fitScore: altFitScore,
    whyThisFitsYou: altReasons
  };

  const userSummary = {
    currentRole: formatOptionLabel(answers.current_role, 'Corporate Professional'),
    availableCapital: formatOptionLabel(answers.starting_capital, '₹25,000'),
    availableTime: formatOptionLabel(answers.weekly_time, '10 hours / week'),
    salesComfort: formatOptionLabel(answers.sales_comfort, 'Can learn sales')
  };

  return {
    primaryArchetype,
    secondaryArchetype,
    archetypeScores: normalizedArchetypeScores,
    signals,
    primaryBlueprint,
    alternativeBlueprint,
    userSummary
  };
}

function selectBestBusinessKey(
  answers: AssessmentAnswers,
  archetypeId: ArchetypeId,
  excludeKeys: string[] = []
): string {
  const role = answers.current_role || '';
  const capital = answers.starting_capital || '';
  const time = answers.weekly_time || '';
  const sales = answers.sales_comfort || '';
  const strengths = answers.natural_strengths || '';
  const preferredModel = answers.attractive_model || '';

  // Case: High Capital + Local Entrepreneur
  if (archetypeId === 'local_entrepreneur' || preferredModel === 'model_local') {
    if (!excludeKeys.includes('boutique_local_services')) return 'boutique_local_services';
  }

  // Case: Product Entrepreneur
  if (archetypeId === 'product_entrepreneur' || preferredModel === 'model_product') {
    if ((capital === 'cap_1lakh' || capital === 'cap_5lakh_plus') && !excludeKeys.includes('niche_d2c_brand')) {
      return 'niche_d2c_brand';
    }
  }

  // Case: Low Time (5h/week) or Low Capital (10k)
  if (time === 'time_5h' || capital === 'cap_10k') {
    if (role === 'design_creative' || role === 'marketing' || strengths === 'creating_content') {
      if (!excludeKeys.includes('executive_ghostwriting')) return 'executive_ghostwriting';
    }
    if (!excludeKeys.includes('fractional_advisory')) return 'fractional_advisory';
  }

  // Archetype: Builder
  if (archetypeId === 'builder') {
    if (sales === 'hate_selling' || preferredModel === 'model_technology') {
      if (!excludeKeys.includes('micro_saas_workflow')) return 'micro_saas_workflow';
    }
    if (!excludeKeys.includes('ai_automation_agency')) return 'ai_automation_agency';
    return 'micro_saas_workflow';
  }

  // Archetype: Seller
  if (archetypeId === 'seller') {
    if (role === 'hr' || strengths === 'talking_to_people' || strengths === 'managing_people') {
      if (!excludeKeys.includes('recruitment_talent_agency')) return 'recruitment_talent_agency';
    }
    if (!excludeKeys.includes('b2b_lead_gen_agency')) return 'b2b_lead_gen_agency';
    return 'recruitment_talent_agency';
  }

  // Archetype: Creator
  if (archetypeId === 'creator') {
    if (time === 'time_5h' || strengths === 'creating_content') {
      if (!excludeKeys.includes('executive_ghostwriting')) return 'executive_ghostwriting';
    }
    if (!excludeKeys.includes('content_ugc_agency')) return 'content_ugc_agency';
    return 'executive_ghostwriting';
  }

  // Archetype: Consultant
  if (archetypeId === 'consultant') {
    if (strengths === 'teaching' || role === 'education' || role === 'hr') {
      if (!excludeKeys.includes('corporate_training_program')) return 'corporate_training_program';
    }
    if (!excludeKeys.includes('fractional_advisory')) return 'fractional_advisory';
    return 'corporate_training_program';
  }

  // Archetype: Operator
  if (archetypeId === 'operator') {
    if (!excludeKeys.includes('managed_operations_agency')) return 'managed_operations_agency';
  }

  // Archetype: Community Builder
  if (archetypeId === 'community_builder') {
    if (!excludeKeys.includes('professional_community')) return 'professional_community';
  }

  // General fallback
  const available = Object.keys(BUSINESS_BLUEPRINTS).filter((k) => !excludeKeys.includes(k));
  return available[0] || 'fractional_advisory';
}

function generatePersonalizedReasons(answers: AssessmentAnswers, businessId: string): string[] {
  const reasons: string[] = [];
  const role = answers.current_role;
  const capital = answers.starting_capital;
  const time = answers.weekly_time;
  const sales = answers.sales_comfort;
  const frustration = answers.work_frustration;

  // 1. Role / Skills anchor
  if (role === 'it_software' || role === 'design_creative') {
    reasons.push('Leverages your hands-on technical / creative problem solving so you do not start from zero knowledge.');
  } else if (role === 'sales' || role === 'marketing') {
    reasons.push('Capitalizes on your customer psychology and conversion skills to shorten your time-to-first-rupee.');
  } else if (role === 'finance' || role === 'consulting') {
    reasons.push('Directly turns your corporate analytical acumen and business judgment into high-margin advisory fees.');
  } else if (role === 'hr') {
    reasons.push('Builds on your natural instinct for vetting talent, company politics, and stakeholder dynamics.');
  } else {
    reasons.push('Draws directly on the domain experience you have spent years developing in your corporate job.');
  }

  // 2. Capital compatibility
  if (capital === 'cap_10k' || capital === 'cap_25k') {
    reasons.push('Requires strictly minimal upfront capital (sweat equity & low-cost tools), protecting your personal savings.');
  } else if (capital === 'cap_50k' || capital === 'cap_1lakh') {
    reasons.push('Your planned capital allows you to test professional tooling and outreach without taking financial stress.');
  } else {
    reasons.push('Allows you to deploy initial capital strategically into high-leverage assets or verified pilots.');
  }

  // 3. Time & Autonomy
  if (time === 'time_5h' || time === 'time_10h') {
    reasons.push('Engineered for execution in 1-2 focused evening hours and weekends without jeopardizing your current day job.');
  } else {
    reasons.push('Matches your available weekly bandwidth so you can compound customer feedback and iterate rapidly.');
  }

  // 4. Sales style / Root frustration
  if (sales === 'hate_selling') {
    reasons.push('Relies on productized outcomes or inbound proof rather than exhausting high-pressure cold calling.');
  } else if (sales === 'comfortable' || sales === 'enjoy_selling') {
    reasons.push('Allows you to command high ticket retainers directly through relationship building and high-conviction pitches.');
  } else if (frustration === 'no_autonomy' || frustration === 'my_manager') {
    reasons.push('Restores complete autonomy over your calendar, deliverables, and choice of who you work with.');
  } else {
    reasons.push('Provides a clear path to replace corporate income before making any rash career departure decisions.');
  }

  return reasons;
}

function formatOptionLabel(optionId?: string, fallback: string = ''): string {
  if (!optionId) return fallback;
  const clean = optionId
    .replace(/^cap_/, '')
    .replace(/^time_/, '')
    .replace(/^model_/, '')
    .replace(/^inc_/, '')
    .replace(/_/g, ' ');
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}
