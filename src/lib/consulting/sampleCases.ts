import { ConsultingCaseInput } from "./types";

export interface SampleCase extends ConsultingCaseInput {
  badge: string;
  tagline: string;
}

export const SAMPLE_CASES: SampleCase[] = [
  {
    companyName: "Zepto / Blinkit Quick Commerce Model",
    industry: "Quick Commerce / Hyperlocal Retail",
    geography: "Tier 1 India (Mumbai, Delhi, Bengaluru)",
    badge: "Profitability Case",
    tagline: "EBITDA margin compressed from -8% to -24% despite 45% volume growth",
    problemStatement:
      "A leading 10-minute delivery quick commerce startup has seen monthly active orders surge by 45%, but EBITDA margins deteriorated from -8% to -24% over the last two quarters. Delivery rider incentives, micro-warehouse (dark store) leases, and aggressive customer basket discounting are escalating faster than gross revenue. Need to diagnose the revenue vs cost drivers and design a path to store-level positive contribution margin.",
    frameworkId: "profitability",
  },
  {
    companyName: "Minimalist / D2C Organic Skincare",
    industry: "Consumer Beauty & Personal Care",
    geography: "UAE & Saudi Arabia (GCC)",
    badge: "Market Entry Case",
    tagline: "Evaluating international expansion into the Gulf market",
    problemStatement:
      "A fast-growing direct-to-consumer science-backed skincare brand with ₹150 Cr domestic ARR in India is evaluating entering the UAE and Saudi Arabian market. The leadership team needs to determine whether they should enter, assess regulatory product registration hurdles (MOHAP/SFDA), choose between cross-border e-commerce vs local distributor partnerships (e.g. Sephora/Namshi), and model the 3-year financial break-even timeline.",
    frameworkId: "market_entry",
  },
  {
    companyName: "Blue Tokai Coffee Roasters",
    industry: "Specialty Food & Beverage / D2C",
    geography: "Pan-India & Global NRI Markets",
    badge: "Growth Strategy Case",
    tagline: "Scaling from ₹120 Cr to ₹500 Cr ARR across organic & inorganic levers",
    problemStatement:
      "A premier specialty coffee brand with 90 physical cafes and a strong direct-to-consumer bean subscription business wants to accelerate from ₹120 Cr to ₹500 Cr ARR over the next 36 months. They need an exhaustive organic (Ansoff matrix: market penetration, premium ready-to-drink cans, Tier 2 cafe rollout) and inorganic (regional cafe acquisitions, FMCG distribution JV) strategic roadmap with prioritized resource allocation.",
    frameworkId: "growth_strategy",
  },
  {
    companyName: "DevFlow AI (B2B SaaS Developer Tool)",
    industry: "Enterprise AI & Cloud Infrastructure",
    geography: "North America & Europe",
    badge: "Pricing Strategy Case",
    tagline: "Transitioning from free developer tier to seat + usage enterprise pricing",
    problemStatement:
      "A high-growth AI code review platform with 250,000 active developers on a free tier is introducing its first commercial enterprise monetization model. The team is caught between flat per-seat licensing ($29/dev/mo) vs consumption-based token pricing vs hybrid value-based pricing. They need a full pricing factor diagnostic (willingness to pay, cost of inference compute, competitor benchmarking against GitHub Copilot) and tiering structure.",
    frameworkId: "pricing_strategy",
  },
  {
    companyName: "VoltPulse Clean Energy Drink",
    industry: "FMCG / Functional Beverages",
    geography: "Urban Metro Colleges & Gyms",
    badge: "GTM / Product Launch",
    tagline: "Launching an all-natural zero-sugar energy drink against Red Bull & Monster",
    problemStatement:
      "A new beverage startup has formulated a zero-sugar, green-tea caffeine functional energy beverage aimed at fitness enthusiasts and Gen-Z knowledge workers. Facing entrenched incumbents with massive retail trade control, they must design a focused GTM strategy: select their initial beachhead customer segment, define distribution channel focus (gyms, D2C, quick commerce vs general retail), and craft a selective, viral communication launch campaign without blowing upfront capital.",
    frameworkId: "gtm_launch",
  },
  {
    companyName: "BharatPay Digital Lending Ecosystem",
    industry: "Fintech & Non-Banking Financial Companies (NBFC)",
    geography: "Semi-Urban India",
    badge: "M&A Case",
    tagline: "Evaluating a ₹450 Cr buyout of a legacy rural retail NBFC license",
    problemStatement:
      "A fast-scaling UPI payment aggregator is planning to acquire an 80% controlling stake in a 25-year-old regional NBFC for ₹450 Cr to secure an independent lending license and loan book. The board needs a comprehensive M&A evaluation: hard financial fit (NPV valuation, cost of capital, revenue synergies via cross-selling MSME loans), soft fit (tech startup culture vs legacy branch bankers), 5-domain due diligence risks, and regulatory RBI approval feasibility.",
    frameworkId: "mna",
  },
];
