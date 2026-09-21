import { Archetype, ArchetypeId } from '../types';

export const ARCHETYPES: Record<ArchetypeId, Archetype> = {
  builder: {
    id: 'builder',
    name: 'The Builder',
    tagline: 'System-First Architect',
    description:
      'You solve problems by assembling tools, automated workflows, and software solutions. You prefer building leverage through systems rather than endless high-touch client meetings.',
    traits: [
      'High technical curiosity & problem deconstruction',
      'Prefers deep work and asynchronous delivery',
      'Builds assets that function without 24/7 personal presence',
      'Thrives on efficiency, automation, and software leverage'
    ],
    recommendedBusinessTypes: ['AI Automation Agency', 'Micro-SaaS', 'Workflow Automation Services', 'Developer Tools']
  },
  seller: {
    id: 'seller',
    name: 'The Seller',
    tagline: 'High-Impact Revenue Driver',
    description:
      'You possess the rarest skill in Indian business: the courage and capability to initiate conversations, pitch with conviction, and close high-ticket paying customers.',
    traits: [
      'High relationship resilience and objection handling',
      'Fastest path to cashflow with zero initial software needed',
      'Comfortable on Zoom calls and in corporate boardrooms',
      'Driven by direct performance incentives and rapid growth'
    ],
    recommendedBusinessTypes: ['B2B Lead Generation Agency', 'Sales Outsourcing', 'Recruitment Firm', 'Corporate Distribution']
  },
  operator: {
    id: 'operator',
    name: 'The Operator',
    tagline: 'Execution & Coordination Engine',
    description:
      'You thrive in organizing chaos into repeatable standard operating procedures (SOPs). You excel at managing vendors, tracking deliverables, and delivering smooth service execution.',
    traits: [
      'Meticulous attention to detail and timelines',
      'Strong talent coordination and accountability tracking',
      'Prefers predictable, recurring revenue over speculative bets',
      'High trust builder with reliable client satisfaction'
    ],
    recommendedBusinessTypes: ['Managed Operations Agency', 'Virtual Project Management', 'Specialized Logistics Coordination', 'Niche Facility Services']
  },
  creator: {
    id: 'creator',
    name: 'The Creator',
    tagline: 'Audience & Attention Monetizer',
    description:
      'You understand narrative, hook creation, and visual storytelling. In an attention-starved economy, your ability to produce compelling content is a magnetic asset.',
    traits: [
      'Sharp eye for editorial tone and digital aesthetics',
      'Naturally produces engaging written or visual assets',
      'Prefers creative freedom and brand-driven leverage',
      'Turns specialized knowledge into high-margin digital media'
    ],
    recommendedBusinessTypes: ['UGC & Video Creative Agency', 'Niche Media Newsletter', 'Personal Brand Ghostwriting', 'Digital Content Studio']
  },
  consultant: {
    id: 'consultant',
    name: 'The Consultant',
    tagline: 'High-Ticket Subject Specialist',
    description:
      'You monetize your existing hard-won corporate domain expertise. Companies will pay premium fees for your specialized judgment to avoid costly trial-and-error.',
    traits: [
      'Instant credibility based on career track record',
      'Zero upfront software or inventory capital required',
      'Very high margin per billable hour or monthly retainer',
      'Can be run part-time with 2 to 3 selective B2B clients'
    ],
    recommendedBusinessTypes: ['Fractional Advisory / B2B Consulting', 'Corporate Training', 'Niche Strategy Consulting', 'Career Acceleration Services']
  },
  product_entrepreneur: {
    id: 'product_entrepreneur',
    name: 'The Product Entrepreneur',
    tagline: 'Tangible Brand Innovator',
    description:
      'You are drawn to consumer habits, physical touchpoints, and differentiated offerings. You want to see your brand packaged and delivered into real customer hands.',
    traits: [
      'Consumer empathy and brand positioning instinct',
      'Willing to handle inventory, supply chains, and fulfillment',
      'High upside potential with compounding customer retention',
      'Best suited for individuals with moderate-to-high capital reserve'
    ],
    recommendedBusinessTypes: ['Niche D2C Brand', 'Specialized Consumer Products', 'Desk & Office Ergonomics Line', 'Curated Subscription Box']
  },
  community_builder: {
    id: 'community_builder',
    name: 'The Community Builder',
    tagline: 'Tribal Network Catalyst',
    description:
      'You connect ambitious people with common goals. You create environments where peer interactions, mutual accountability, and insider access generate recurring membership value.',
    traits: [
      'Natural conversationalist and network super-connector',
      'High emotional intelligence and group moderation skills',
      'Generates sticky recurring subscription revenue',
      'Monetizes events, mastermind dinners, and premium memberships'
    ],
    recommendedBusinessTypes: ['Professional Mastermind Network', 'Paid Cohort Learning Community', 'Niche Industry Event Series', 'Corporate Alumni Club']
  },
  local_entrepreneur: {
    id: 'local_entrepreneur',
    name: 'The Local Entrepreneur',
    tagline: 'Territory Service Leader',
    description:
      'You believe in physical presence and local community dominance. You see the immense untapped opportunity in professionalizing fragmented city-level services.',
    traits: [
      'Grounded in local market dynamics and foot-traffic density',
      'Hands-on leadership with blue-collar or ground staff',
      'Defensible against purely online global competition',
      'Cashflow positive from day one with clear local demand'
    ],
    recommendedBusinessTypes: ['Boutique Fitness / Wellness Studio', 'Specialized Pet Care Center', 'Premium Education / Tutoring Hub', 'Managed Local Home Services']
  }
};
