import { FrameworkDefinition, FrameworkId } from "./types";

export const FRAMEWORKS: Record<FrameworkId, FrameworkDefinition> = {
  profitability: {
    id: "profitability",
    title: "Profitability Framework",
    subtitle: "Root Cause Diagnosis: Profits = Revenue – Costs",
    icon: "TrendingDown",
    badge: "Cost & Margin Optimization",
    color: "#f59e0b",
    description:
      "Explores rationale and drivers behind decline in profits. Deconstructs the business into Revenue (Volume vs Price/Mix) and Costs (Fixed/Variable & Value Chain) to identify root cause.",
    contextQuestions: [
      "Company overview and core business model?",
      "Product / Customer revenue mix?",
      "Revenue streams and margin profile?",
      "Quantum of profit decline (e.g., -15% EBITDA)?",
      "Timeline of decline (sudden drop vs steady margin compression)?",
      "Industry-wide phenomenon vs company-specific issue?",
    ],
    buckets: [
      {
        name: "Revenue — Number of Customers",
        description: "Deconstructs volume drivers across industry vs company-specific factors.",
        subBuckets: [
          "Industry-wide: Regulatory shifts, Competitor pricing wars, New market entrants, Substitutes/Complements",
          "Company-specific (Demand - Internal): Customer journey friction, churn, product degradation, brand trust",
          "Company-specific (Demand - External): Porter's 5 Forces, PESTEL macro factors, consumer sentiment shifts",
          "Company-specific (Supply - Internal): Value chain bottlenecks, stockouts, capacity constraints, delivery delays",
          "Company-specific (Supply - External): Supplier dependencies, labor shortages, geopolitical supply disruptions",
        ],
      },
      {
        name: "Revenue — Revenue per Customer",
        description: "Evaluates pricing power, transaction frequency, and basket size.",
        subBuckets: [
          "Transaction Frequency: # of visits/orders per customer per period",
          "Average Ticket Size: Basket composition, unit economics, discounting leakages",
          "Price Elasticity: Cross-elasticity vs competitors, impact of recent price revisions",
        ],
      },
      {
        name: "Cost — Fixed vs Variable Costs",
        description: "Analyzes cost behavior against operational volume changes.",
        subBuckets: [
          "Fixed Overheads: Rent, administrative payroll, plant & equipment depreciation, software licensing",
          "Variable Costs: Raw materials, packaging, direct labor, shipping/freight per unit, payment processing",
        ],
      },
      {
        name: "Cost — Value Chain Breakdown",
        description: "Examines operational efficiency across the end-to-end value chain.",
        subBuckets: [
          "R&D & Product Engineering",
          "Procurement of Raw Materials (vendor terms, unit commodity costs)",
          "Manufacturing & Packaging (line utilization, scrap rate, energy)",
          "Warehousing & Inventory Carrying Costs",
          "Distribution & Freight Logistics (last-mile costs, routing)",
          "Sales & Marketing (CAC efficiency, ad spend ROAS, sales commissions)",
          "After-Sales Service & Warranty Costs (return rates, customer support)",
        ],
      },
    ],
  },

  market_entry: {
    id: "market_entry",
    title: "Market Entry Framework",
    subtitle: "Feasibility Analysis & Mode of Entry (Should They Enter? + How?)",
    icon: "Compass",
    badge: "Expansion Strategy",
    color: "#3b82f6",
    description:
      "Evaluates the strategic rationale for entering a new geography or product market, assesses financial and operational feasibility, and formulates the optimal entry strategy.",
    contextQuestions: [
      "Company core capabilities and existing competitive moats?",
      "What is the target market / geography being evaluated?",
      "Which specific product/service offering is being introduced?",
      "Why enter? (Revenue growth, defensive move, following clients, margin expansion)?",
      "What is the target hurdle rate, break-even timeline, or market share objective?",
    ],
    buckets: [
      {
        name: "Product Feasibility & Fit",
        description: "Assesses value proposition and adaptation needed for the new market.",
        subBuckets: [
          "Core Features & Unique Selling Proposition (USP)",
          "Local pricing parity vs domestic benchmarks",
          "Competitive benchmarking against incumbent local players",
          "Product Life Cycle stage in target territory",
        ],
      },
      {
        name: "Market Attractiveness",
        description: "Quantifies the addressable market prize and customer dynamics.",
        subBuckets: [
          "Target Group by STP (Segmentation, Targeting, Positioning)",
          "Total Addressable Market (TAM), Serviceable Market (SAM), SOM",
          "Market growth rate (CAGR) and incumbent market share distribution",
          "Customer adoption barriers and switching costs",
        ],
      },
      {
        name: "Financial Feasibility",
        description: "Validates capital requirements and economic viability.",
        subBuckets: [
          "Financing options (Internal cash reserves, Debt, Local partner equity)",
          "Revenue & Cost model (projected P&L)",
          "Opportunity costs vs investing in existing core business",
          "Break-even point timeline and expected Return on Capital Employed (ROCE)",
        ],
      },
      {
        name: "Operational Capabilities & Value Chain",
        description: "Determines physical execution and supply chain setup.",
        subBuckets: [
          "Self-manufacturing vs Contract / Off-shore manufacturing",
          "Value chain gap analysis (warehousing, cold chain, fulfillment)",
          "Import / Export customs tariffs, compliance, and trade pacts",
        ],
      },
      {
        name: "Risks & External Macro Factors",
        description: "Evaluates systemic downside risks before greenlighting entry.",
        subBuckets: [
          "Government regulations, FDI rules, local licensing mandates",
          "Patents, trademarks, and IP protection",
          "PESTEL macro analysis (Political, Economic, Social, Tech, Environmental, Legal)",
          "Porter's 5 Forces (Supplier power, Buyer power, Substitutes, Rivalry)",
        ],
      },
      {
        name: "Entry Mode Strategy (If Yes, How?)",
        description: "Selects execution vehicle and tactical rollout plan.",
        subBuckets: [
          "Entry Options: Greenfield (organic build), Acquisition (M&A), Joint Venture / Strategic Partnership",
          "Operational Decisions: Local sourcing, local workforce hiring, supply chain contracts",
          "Sales & Marketing: Distribution channel architecture, launch marketing, localized pricing",
          "Scale-up Roadmap: Phase 1 pilot city $\\rightarrow$ Phase 2 regional expansion $\\rightarrow$ Phase 3 national scale",
        ],
      },
    ],
  },

  growth_strategy: {
    id: "growth_strategy",
    title: "Growth Strategy Framework",
    subtitle: "Organic vs Inorganic Pathways & Ansoff Matrix Optimization",
    icon: "Zap",
    badge: "Scale & Revenue Acceleration",
    color: "#10b981",
    description:
      "Identifies practically feasible growth avenues for a business across existing vs new markets, new products, strategic partnerships, and mergers & acquisitions.",
    contextQuestions: [
      "What is the core business and current scale / ARR?",
      "Geographic footprint and primary customer demographics?",
      "Current growth performance vs historical trajectory?",
      "What is the aggressive growth target (e.g., 3x ARR in 24 months)?",
      "Existing core capabilities and internal bottlenecks?",
    ],
    buckets: [
      {
        name: "Organic — Existing Market (Old Product/Service)",
        description: "Maximizing market penetration with the current offering.",
        subBuckets: [
          "Extensive marketing initiatives & creative campaign redesign",
          "New distribution channel unlock (e.g., retail distribution, online marketplaces, B2B enterprise)",
          "Pricing strategy optimization (tiering, bundling, promotional pricing)",
          "Customer retention & satisfaction initiatives (LTV expansion, churn reduction)",
        ],
      },
      {
        name: "Organic — Existing Market (New Product/Service)",
        description: "Product development and upsell into current customer base.",
        subBuckets: [
          "Strategic repositioning and premium SKU introduction",
          "Targeted cross-selling to existing high-intent accounts",
          "Customer satisfaction through enhanced product features & workflow integration",
        ],
      },
      {
        name: "Organic — New Market (Old Product/Service)",
        description: "Market development into new customer demographics or geographies.",
        subBuckets: [
          "Geographic expansion (Tier 2/3 cities or international territories)",
          "Demographic expansion (appealing to adjacent age/income brackets)",
          "Localized marketing and tailored distribution channels",
        ],
      },
      {
        name: "Organic — New Market (New Product/Service - Diversification)",
        description: "True innovation and adjacent category creation.",
        subBuckets: [
          "Related Diversification: Launching complementary product lines leveraging existing supply chain or brand equity",
          "Unrelated Diversification: Entering entirely new business categories with higher margins or counter-cyclical cash flows",
        ],
      },
      {
        name: "Inorganic Growth Strategies",
        description: "Accelerating growth through external capital and partnerships.",
        subBuckets: [
          "Joint Ventures & Strategic Alliances: Shared capital, technology licensing, co-branded offerings",
          "Mergers & Acquisitions (M&A): Backward integration (securing raw material), Forward integration (controlling retail channels), Horizontal integration (buying competitors for market share)",
        ],
      },
    ],
  },

  pricing_strategy: {
    id: "pricing_strategy",
    title: "Pricing Strategy Framework",
    subtitle: "Maximizing Revenue Potential & Product Competitiveness",
    icon: "Tag",
    badge: "Monetization & Willingness to Pay",
    color: "#8b5cf6",
    description:
      "Determines optimal price points based on product differentiation, cost structures, competitor benchmarking, substitute products, and customer willingness to pay.",
    contextQuestions: [
      "Product/service characteristics and unique value proposition?",
      "Primary customer use cases and frequency of consumption?",
      "Initial capital investments and ongoing unit economics?",
      "Direct competitors and available substitute offerings?",
      "Target customer segments and their budget price sensitivity?",
    ],
    buckets: [
      {
        name: "Core Pricing Factors Analysis",
        description: "Evaluates the 5 foundational pillars shaping pricing power.",
        subBuckets: [
          "Product: Radical innovation vs Incremental improvement, unique differentiators, advantages vs drawbacks",
          "Costing: R&D amortization, unit manufacturing cost, customer acquisition costs, ongoing support costs",
          "Competitors: Competitor price points, feature differentiation, price benchmarking across tiers",
          "Substitutes: Direct and indirect substitutes, substitute switching triggers, future substitute threats",
          "Customer: Buyer profile, characteristics, perceived economic value (ROI / savings / status), budget ceiling",
        ],
      },
      {
        name: "Value-Based Pricing (Recommended for Differentiated Products)",
        description: "Aligns price with the perceived monetary and qualitative value delivered.",
        subBuckets: [
          "Customer willingness to pay (WTP) analysis",
          "Quantifying economic value delivered (time saved, revenue unlocked, pain avoided)",
          "Proxy benchmarking to anchor price against high-cost legacy alternatives",
        ],
      },
      {
        name: "Cost-Based Pricing",
        description: "Ensures margin safety through floor-level accounting analysis.",
        subBuckets: [
          "Fully loaded cost of production + target profit margin %",
          "Break-even volume analysis under varying fixed overhead absorption levels",
        ],
      },
      {
        name: "Competitive / Market-Based Pricing",
        description: "Positions pricing relative to incumbent market leaders.",
        subBuckets: [
          "Benchmarking directly against competitor average price",
          "Determining Premium (+) vs Discount (-) strategy based on feature superiority or penetration intent",
        ],
      },
    ],
  },

  gtm_launch: {
    id: "gtm_launch",
    title: "Go-To-Market (GTM) / Product Launch",
    subtitle: "The 4-Pillar Blueprint: Segmentation, Product, Distribution, & Communication",
    icon: "Rocket",
    badge: "Launch & Commercialization",
    color: "#ec4899",
    description:
      "Provides an integrated blueprint for launching a new product into a target market, achieving sustainable competitive advantage while adhering to the core principle: Be Selective.",
    contextQuestions: [
      "Launch objectives and commercial targets (Year 1 revenue, user adoption)?",
      "Organizational capabilities, marketing budget, and runway?",
      "Competitive landscape (number of rivals, market shares, growth rates)?",
      "Customer segments and adoption readiness?",
      "Existing product portfolio and risk of internal cannibalization?",
    ],
    buckets: [
      {
        name: "Segmentation (Whom to Sell?)",
        description: "Identifies and ranks the highest-intent customer beachhead.",
        subBuckets: [
          "Geographic: Urban clusters, Tier 1 vs Tier 2, regional micro-markets",
          "Demographic: Age, income bracket, profession, company size / ACV",
          "Psychographic: Lifestyle aspirations, status drivers, tech-savviness",
          "Behavioural: Usage rate, brand loyalty, early adopter propensity",
        ],
      },
      {
        name: "Product Development & Positioning (What to Sell?)",
        description: "Sharpens the initial product packaging and value messaging.",
        subBuckets: [
          "Core MVP features tailored to solve the primary customer pain point",
          "Packaging and unboxing experience",
          "Key use-cases and daily workflows",
          "SKU sizing and product naming strategy",
          "Differentiation narrative vs legacy market alternatives",
          "Introductory pricing and promotional launch incentives",
        ],
      },
      {
        name: "Distribution Strategy (Where to Sell?)",
        description: "Constructs the distribution channel architecture.",
        subBuckets: [
          "Distribution Channels: Direct-to-Consumer (Website), Marketplaces (Amazon/Flipkart), Modern Trade, General Trade",
          "Distribution Model: Exclusive distribution vs Intensive multi-tiered wholesale",
          "Working capital turnover & payment credit terms",
          "Channel distributor & retailer margin structure",
          "Sales force training, compensation, and incentive design",
        ],
      },
      {
        name: "Communication Strategy (What to Say?)",
        description: "Creates the multi-touchpoint brand awareness and conversion funnel.",
        subBuckets: [
          "Brand Positioning statement and core hook",
          "Advertising: Performance marketing (Meta/Google), CTV, Print/Outdoor",
          "Personal Selling & B2B Sales Outreach playbook",
          "Sales Promotions: Launch discounts, trial bundles, referral rewards",
          "Direct Marketing: WhatsApp CRM, email marketing, push notifications",
          "Public Relations (PR) & Influencer partnership endorsements",
        ],
      },
      {
        name: "The GTM Principle: Be Selective",
        description: "Enforces focus to prevent spreading resources too thin.",
        subBuckets: [
          "Avoid trying to launch across every channel simultaneously",
          "Focus on one dominant beachhead customer segment and one primary acquisition channel",
          "Prevent channel conflict and avoid runaway communication expense",
        ],
      },
    ],
  },

  mna: {
    id: "mna",
    title: "Mergers & Acquisitions (M&A)",
    subtitle: "Hard Fit, Soft Fit, Synergies, Due Diligence & Integration",
    icon: "Layers",
    badge: "Inorganic Strategy & Deal Evaluation",
    color: "#06b6d4",
    description:
      "Evaluates M&A opportunities through financial valuation, operational & revenue synergies, cultural fit, comprehensive due diligence, and execution implementation.",
    contextQuestions: [
      "Acquiring company's strategic objective and financial health?",
      "Acquirer current portfolio, value chain position, and core geographies?",
      "Target company profile: business model, market share, revenue trajectory?",
      "Past M&A track record and integration capabilities?",
      "Broader industry consolidation trends and timing urgency?",
    ],
    buckets: [
      {
        name: "1. Hard Fit (Financial Fit & Synergies)",
        description: "Rigorous valuation, affordability, and synergistic upside.",
        subBuckets: [
          "Deal Price: Is the valuation fair? NPV / DCF / Comparable multiples analysis",
          "Financial Feasibility: Can the balance sheet afford it (Cash reserves vs Debt vs Equity dilution)?",
          "Transaction Structure: Stock swap vs All-cash vs Earnout structure",
          "Post M&A Costs: Restructuring expenses, debt servicing, severance",
          "Revenue Synergies: Cross-selling across customer bases, pricing power, geographic expansion",
          "Cost Synergies: Supply chain consolidation, SG&A overhead elimination, bulk purchasing power",
          "Defensive Value: Blocking competitor acquisition and ensuring market survival",
        ],
      },
      {
        name: "2. Soft Fit (Non-Financial Fit)",
        description: "Qualitative organizational and external environmental alignment.",
        subBuckets: [
          "Internal Fit: Cultural compatibility, leadership retention, vision/mission alignment",
          "External Fit: Macroeconomic risks, PESTEL analysis, Porter's 5 Forces",
          "Antitrust & Regulatory Scrutiny: Monopoly laws, CCI / FTC approval hurdles",
        ],
      },
      {
        name: "3. Due Diligence (Checks & Confirmations)",
        description: "Forensic evaluation across 5 critical domains.",
        subBuckets: [
          "Strategic Due Diligence: Fit with long-term 5-year corporate thesis",
          "Commercial Due Diligence: Market growth, customer churn, customer concentration risk",
          "Operational Due Diligence: Technology stack, supply chain capacity, asset condition",
          "Financial Due Diligence: Quality of earnings, off-balance sheet liabilities, tax exposure",
          "Legal & Compliance: Pending litigation, labor contracts, IP ownership validity",
        ],
      },
      {
        name: "4. Implementation & Integration",
        description: "Execution playbook to capture projected value.",
        subBuckets: [
          "First 100-Day Integration Roadmap",
          "Operational system unification (ERP, CRM, logistics)",
          "Cultural onboarding and retention of key technical & executive talent",
          "Synergy tracking governance & milestone scorecard",
        ],
      },
      {
        name: "5. Exit Strategies",
        description: "Planning long-term value realization and liquidation paths.",
        subBuckets: [
          "Hold duration: 3-5 year investment horizon vs permanent corporate asset",
          "Exit vehicles: Strategic sale to multinational, IPO public listing, Private Equity secondary buyout",
        ],
      },
    ],
  },
};
