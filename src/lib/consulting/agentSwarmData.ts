import {
  SwarmAgent,
  SwarmArtifact,
  SwarmScenario,
  HandoffEvent,
} from "./agentSwarmTypes";

export const BASE_AGENTS: SwarmAgent[] = [
  {
    id: "lead-consultant",
    name: "Dr. Evelyn Vance",
    role: "Lead Consultant",
    avatar: "👔",
    assignedTask: "Clarifies problem boundaries, plans investigation, and delegates workstreams",
    deliverableTitle: "Investigation Plan",
    currentTool: null,
    status: "queued",
    modelRuntime: "Autonomous Orchestrator",
  },
  {
    id: "framework-analyst",
    name: "Julian Thorne",
    role: "Framework Analyst",
    avatar: "📐",
    assignedTask: "Selects and applies relevant consulting frameworks to break down root causes",
    deliverableTitle: "Problem Breakdown & Hypotheses",
    currentTool: null,
    status: "queued",
    modelRuntime: "MECE Framework Engine",
  },
  {
    id: "market-researcher",
    name: "Aria Sterling",
    role: "Market Researcher",
    avatar: "🌐",
    assignedTask: "Searches competitors, industry alternatives, and market benchmarks",
    deliverableTitle: "Research Notes with Sources",
    currentTool: null,
    status: "queued",
    modelRuntime: "Benchmark Research Crawler",
  },
  {
    id: "business-analyst",
    name: "Vikram Malhotra",
    role: "Business Analyst",
    avatar: "📊",
    assignedTask: "Examines founder telemetry, parses logs, and calculates quantitative scenarios",
    deliverableTitle: "Quantitative Findings",
    currentTool: null,
    status: "queued",
    modelRuntime: "Data & Cohort Calculator",
  },
  {
    id: "critical-reviewer",
    name: "Marcus Cole",
    role: "Critical Reviewer",
    avatar: "🛡️",
    assignedTask: "Challenges conclusions, pressure-tests evidence, and demands missing data",
    deliverableTitle: "Evidence Audit & Revision Memo",
    currentTool: null,
    status: "queued",
    modelRuntime: "Red-Team Validator",
    isRedTeam: true,
  },
  {
    id: "strategy-agent",
    name: "Maya Lin",
    role: "Strategy Agent",
    avatar: "🎯",
    assignedTask: "Combines verified findings into an actionable decision brief & sprint plan",
    deliverableTitle: "Decision Brief & Action Plan",
    currentTool: null,
    status: "queued",
    modelRuntime: "Executive Synthesis Core",
  },
];

// SCENARIO 1: The user's exact specification
export const SCENARIO_SIGNUPS_NO_CUSTOMERS: SwarmScenario = {
  id: "signups_no_customers",
  title: "High Signups, Low Paying Customers",
  category: "Conversion & Activation",
  founderPrompt: "We have lots of signups but very few paying customers.",
  description:
    "Deconstruct why 12,000+ monthly signups yield under 1.2% paid conversion. Pinpoint drop-off points, challenge aggregation errors via cohort segmentation, and produce a tested onboarding sprint.",
  initialAgents: BASE_AGENTS.map((a) => ({ ...a })),
  artifacts: {
    "art-plan-1": {
      id: "art-plan-1",
      title: "Executive Investigation Plan: Funnel & Conversion Diagnostic",
      agentId: "lead-consultant",
      agentName: "Dr. Evelyn Vance",
      agentRole: "Lead Consultant",
      version: 1,
      badge: "Investigation Plan",
      summary:
        "Triages the core conversion bottleneck across acquisition quality, product onboarding friction, and pricing paywall thresholds.",
      contentMarkdown: `### 1. Context & Problem Definition
- **Founder Signal**: High inbound user velocity (>12,000 signups/mo) accompanied by severe revenue conversion compression (<1.2% paid conversion vs 4.5% SaaS benchmark).
- **Core Hypothesis Space**:
  1. *Acquisition Distortion*: Low-intent traffic from broad paid channels masking genuine demand.
  2. *Activation Drop-off*: Critical friction during first-session onboarding preventing "Aha!" realization.
  3. *Paywall Prematurity*: Pricing paywall gating users before core value is perceived.

### 2. Workstream Delegation
- **Workstream A (Quantitative Funnel)**: Assigned to **Business Analyst (Vikram Malhotra)** to run full-funnel drop-off telemetry across Steps 1 through 5.
- **Workstream B (Competitive Benchmarks)**: Assigned to **Market Researcher (Aria Sterling)** to retrieve activation rates and onboarding UX patterns from top-tier PLG comps.
- **Workstream C (Framework Decomposition)**: Assigned to **Framework Analyst (Julian Thorne)** to model the funnel via Pirate Metrics (AARRR) and Job-To-Be-Done.
- **Governance Gate**: All findings must pass **Critical Reviewer (Marcus Cole)** before strategy synthesis.`,
      status: "approved",
    },
    "art-research-1": {
      id: "art-research-1",
      title: "Market Benchmarks & Competitor Onboarding Analysis",
      agentId: "market-researcher",
      agentName: "Aria Sterling",
      agentRole: "Market Researcher",
      version: 1,
      badge: "Research Notes with Sources",
      summary:
        "Synthesizes comparative data across 14 B2B PLG SaaS tools; benchmark median activation is 24.3% with time-to-first-value under 7 minutes.",
      keyMetrics: [
        { label: "Median SaaS Free-to-Paid", value: "3.8% – 5.2%", note: "B2B Self-serve" },
        { label: "Top-Quartile Activation Rate", value: "28.5%", note: "Reaching core milestone" },
        { label: "Median Time-to-Value (TTV)", value: "6.4 mins", note: "Interactive onboarding" },
        { label: "Current Founder Metrics", value: "1.1% Conv / 42m TTV", note: "Severely lagging" },
      ],
      sources: [
        "OpenView 2025 Product-Led Benchmarks Report",
        "Lenny's Newsletter: Benchmarks for Good Activation",
        "Userflow: 100 Onboarding Teardowns (Notion, Figma, Linear)",
      ],
      contentMarkdown: `### 1. Market Comps & Patterns
- **Linear / Figma Onboarding Benchmark**: Zero empty states. Both tools generate immediate interactive sample projects rather than forcing users into a blank canvas.
- **Paywall Gating Timing**: Top performers introduce paywalls on *usage thresholds* (e.g. 3 active projects, 5 exports) rather than on day 2 of sign-up.
- **Friction vs Value**: Tools requiring more than 4 initial form inputs suffer a **52% drop-off** at Step 2.

### 2. Industry Source Synthesis
1. *OpenView PLG Study*: Companies that reduce onboarding time-to-value by 50% see a 2.4x surge in 30-day expansion revenue.
2. *Activation Drop-off Benchmark*: Average loss between Signup and Core Event should not exceed 45%. Founder's current loss is estimated above 70%.`,
      status: "approved",
    },
    "art-quant-1": {
      id: "art-quant-1",
      title: "Initial Funnel Drop-off Analysis (Unsegmented Data)",
      agentId: "business-analyst",
      agentName: "Vikram Malhotra",
      agentRole: "Business Analyst",
      version: 1,
      badge: "Quantitative Findings (v1)",
      summary:
        "Analyzed 34,500 user events across 90 days. 72.4% of users drop off before Step 3 of onboarding, never completing project setup.",
      keyMetrics: [
        { label: "Total Signups (90D)", value: "34,520", note: "All channels aggregate" },
        { label: "Step 1 (Email Confirm)", value: "91.2%", change: "-8.8%" },
        { label: "Step 2 (Workspace Name)", value: "68.4%", change: "-22.8%" },
        { label: "Step 3 (Connect Integration)", value: "27.6%", change: "-40.8% [LEAK]" },
        { label: "Paid Conversion", value: "1.18%", note: "407 total paying" },
      ],
      contentMarkdown: `### 1. Topline Funnel Breakdown
- Aggregate user telemetry shows massive drop-off between **Step 2 (Workspace Creation)** and **Step 3 (Connect Data Source / Integration)**.
- Over **72.4%** of signups never reach Step 3.
- Preliminary Conclusion: The technical integration requirement in Step 3 is blocking users before they experience any platform value.`,
      status: "revision_requested",
    },
    "art-framework-1": {
      id: "art-framework-1",
      title: "MECE Problem Breakdown & Pirate Metrics (AARRR) Tree",
      agentId: "framework-analyst",
      agentName: "Julian Thorne",
      agentRole: "Framework Analyst",
      version: 1,
      badge: "Problem Breakdown & Hypotheses",
      summary:
        "Applies the AARRR funnel framework; diagnoses that the primary breakdown is strictly in 'Activation' rather than 'Acquisition' or 'Retention'.",
      contentMarkdown: `### 1. AARRR Issue Tree Deconstruction
\`\`\`
Revenue Equation:
Paid Revenue = [Signups] × [Activation Rate] × [Trial-to-Paid %] × [Avg ACV]

Root Cause Elimination:
├── [Acquisition: 12k/mo] ──> PASS (Traffic volume is robust)
├── [Activation: 27.6%] ───> CRITICAL FAILURE (72% drop-off at Step 3)
├── [Retention: D30] ──────> CONDITIONAL (Users who activate retain at 68%)
└── [Monetization: $49/mo] ─> INSUFFICIENT DATA (Blocked by low activation pool)
\`\`\`

### 2. Working Hypothesis
- **Hypothesis H1**: The onboarding sequence demands high-effort setup (API integration) before presenting immediate utility. Users churn due to cognitive overload.`,
      status: "under_review",
    },
    "art-review-1": {
      id: "art-review-1",
      title: "Critical Review Audit: Confounding Aggregate Data Challenge",
      agentId: "critical-reviewer",
      agentName: "Marcus Cole",
      agentRole: "Critical Reviewer",
      version: 1,
      badge: "Red-Team Audit & Revision Memo",
      summary:
        "CRITICAL CHALLENGE: The current dataset conflates legacy signups from old ad campaigns with new organic users. Demands channel-separated cohort analysis.",
      contentMarkdown: `> ⚠️ **RED TEAM CHALLENGE ISSUED BY MARCUS COLE**

### 1. Identified Flaw in Business Analyst's Findings (v1)
- The dataset presented in **art-quant-1** aggregates all users into a single monolithic pool of 34,520 signups.
- **Confounding Variable**: Last month, the team launched a broad, untargeted Google Ads campaign that drove 18,000 low-intent clicks.
- If low-intent ad traffic is skewing the aggregate, blaming the "API integration step" might be incorrect!

### 2. Mandatory Revision Request
1. **Segregate Cohort A (Organic / Product Hunt / Direct Referral)** vs **Cohort B (Paid Google Search / Display)**.
2. Calculate conversion rates for each cohort separately.
3. Quantify whether organic users also drop off at Step 3 or if this is isolated to paid ad traffic.
- **Status**: *Withholding sign-off until Business Analyst reruns calculation.*`,
      status: "approved",
    },
    "art-quant-2": {
      id: "art-quant-2",
      title: "Revised Quantitative Findings: Channel-Segmented Cohort Analysis",
      agentId: "business-analyst",
      agentName: "Vikram Malhotra",
      agentRole: "Business Analyst",
      version: 2,
      badge: "Quantitative Findings (v2 — Cohort Segmented)",
      summary:
        "RECALCULATION COMPLETE: Uncovered dramatic divergence. Organic cohorts convert at 4.2% once reaching setup, while Google Ads signups drop at 88.4% due to poor intent matching.",
      keyMetrics: [
        { label: "Organic / Referral Signups", value: "11,200", note: "High Intent" },
        { label: "Organic Activation Rate", value: "48.2%", note: "Completed Step 3" },
        { label: "Organic Paid Conversion", value: "4.21%", note: "Matches SaaS Benchmark" },
        { label: "Paid Google Ads Signups", value: "23,320", note: "Low Intent Traffic" },
        { label: "Paid Ads Drop-off at Step 2", value: "88.4%", note: "Immediate Bounce" },
        { label: "Paid Ads Paid Conversion", value: "0.24%", note: "Destroying Blended Metric" },
      ],
      contentMarkdown: `### 1. Cohort Recalculation Results (Post Marcus Cole Challenge)
- **The True Reality**: The product does NOT have a universal 1.1% conversion problem!
  - **Organic & Referral Traffic**: Converts at **4.21%** (within healthy benchmark 3.8%–5.2%).
  - **Paid Search Ad Traffic**: Converts at an abysmal **0.24%** and drops off 88.4% immediately because the ad copy promised a "free instant tool" without mentioning setup.
- **Secondary Discovery**: Even for organic users, **34% of organic drops** occur specifically when forced to configure OAuth before seeing an interactive dashboard demo.

### 2. Corrected Root Causes
1. **Ad Intent Mismatch**: 67% of inbound volume is low-intent traffic poisoned by misleading marketing copy.
2. **Mandatory OAuth Gate**: Organic users who drop do so because there is no "Explore with Sandbox Data" option.`,
      status: "approved",
    },
    "art-strategy-1": {
      id: "art-strategy-1",
      title: "Final Strategy Decision Brief & 30-Day Onboarding Experiment Plan",
      agentId: "strategy-agent",
      agentName: "Maya Lin",
      agentRole: "Strategy Agent",
      version: 1,
      badge: "Decision Brief & Action Plan",
      summary:
        "Proposes a two-pronged solution: 1) Launch 'Instant Demo Sandbox' pre-loaded with mock data to remove Step 3 friction; 2) Shut down broad display ad keywords and retarget high-intent ICP.",
      contentMarkdown: `### 1. Strategic Decision Summary
Based on the revised cohort findings validated by the Critical Reviewer:
- We will NOT redesign the entire product.
- We will execute a **30-Day "Sandbox First" Activation Sprint** combined with an **Ad Campaign Intent Gate**.

### 2. Expected Impact Modeling
- Projected Organic Conversion: Uplift from 4.2% to **5.8%** by allowing sandbox exploration.
- Projected Blended Conversion: Surge from 1.18% to **3.65%** by cutting $6,000/mo wasted low-intent ad spend and focusing budget on high-intent workflows.
- Projected ARR Impact: **+$48,000 ARR** in Q1 with zero engineering overhaul.`,
      status: "approved",
    },
  },
  events: [
    {
      id: "evt-1",
      stepNumber: 1,
      fromAgentId: "founder",
      toAgentId: "lead-consultant",
      eventType: "assignment",
      timestamp: "10:00:12",
      title: "Founder Case Intake & Problem Triage",
      description: "Founder submits: 'We have lots of signups but very few paying customers.'",
      dialogueText:
        "Founder: \"We have lots of signups but very few paying customers. Over 12k monthly signups, but barely 1% buy.\"",
      agentStatuses: {
        "lead-consultant": {
          status: "working",
          currentTool: "problem_scope_clarifier",
          task: "Clarifying boundaries & drafting investigation plan",
        },
        "framework-analyst": { status: "queued", currentTool: null, task: "Standby for issue tree formulation" },
        "market-researcher": { status: "queued", currentTool: null, task: "Standby for benchmark queries" },
        "business-analyst": { status: "queued", currentTool: null, task: "Standby for funnel data pull" },
        "critical-reviewer": { status: "queued", currentTool: null, task: "Standby for evidence review" },
        "strategy-agent": { status: "queued", currentTool: null, task: "Standby for synthesis" },
      },
    },
    {
      id: "evt-2",
      stepNumber: 2,
      fromAgentId: "lead-consultant",
      toAgentId: "business-analyst",
      eventType: "assignment",
      timestamp: "10:00:45",
      title: "Lead Consultant Assigns Workstreams",
      description:
        "Dr. Evelyn Vance generates the Investigation Plan and assigns Workstream A (Funnel Analysis) to Business Analyst and Workstream B (Benchmarks) to Market Researcher.",
      dialogueText:
        "Dr. Evelyn Vance: \"I've completed the Investigation Plan (art-plan-1). Vikram, pull the telemetry logs to pinpoint where drop-off happens. Aria, benchmark our metrics against top B2B SaaS onboarding funnels.\"",
      toolUsed: "problem_scope_clarifier",
      artifactId: "art-plan-1",
      agentStatuses: {
        "lead-consultant": {
          status: "complete",
          currentTool: null,
          task: "Supervising multi-agent execution",
          artifactId: "art-plan-1",
        },
        "framework-analyst": { status: "queued", currentTool: null, task: "Awaiting funnel telemetry data" },
        "market-researcher": {
          status: "working",
          currentTool: "web_search_benchmarks",
          task: "Crawling SaaS activation benchmarks",
        },
        "business-analyst": {
          status: "working",
          currentTool: "query_funnel_db",
          task: "Querying 90-day signup event database",
        },
        "critical-reviewer": { status: "queued", currentTool: null, task: "Monitoring workstream handoffs" },
        "strategy-agent": { status: "queued", currentTool: null, task: "Awaiting verified findings" },
      },
    },
    {
      id: "evt-3",
      stepNumber: 3,
      fromAgentId: "market-researcher",
      toAgentId: "framework-analyst",
      eventType: "finding",
      timestamp: "10:01:20",
      title: "Market Researcher Submits Industry Comps",
      description:
        "Aria Sterling delivers research showing median SaaS activation is 24.3% and best-in-class PLG tools deliver value in under 7 minutes.",
      dialogueText:
        "Aria Sterling: \"Research notes submitted (art-research-1). Top SaaS products activate at 24%–28%. Crucially, Figma and Linear provide instant sandbox workspaces before asking for integrations or credit cards.\"",
      toolUsed: "web_search_benchmarks",
      artifactId: "art-research-1",
      agentStatuses: {
        "lead-consultant": { status: "complete", currentTool: null, task: "Supervising multi-agent execution" },
        "framework-analyst": {
          status: "working",
          currentTool: "aarrr_framework_mapper",
          task: "Mapping benchmarks to AARRR funnel stages",
        },
        "market-researcher": {
          status: "complete",
          currentTool: null,
          task: "Benchmark deliverable approved",
          artifactId: "art-research-1",
        },
        "business-analyst": {
          status: "working",
          currentTool: "query_funnel_db",
          task: "Finalizing 90-day user funnel aggregation",
        },
        "critical-reviewer": { status: "queued", currentTool: null, task: "Pre-reviewing incoming telemetry" },
        "strategy-agent": { status: "queued", currentTool: null, task: "Standby for synthesis" },
      },
    },
    {
      id: "evt-4",
      stepNumber: 4,
      fromAgentId: "business-analyst",
      toAgentId: "framework-analyst",
      eventType: "finding",
      timestamp: "10:01:58",
      title: "Business Analyst Discovers 72% Onboarding Drop",
      description:
        "Vikram Malhotra finds that 72.4% of users drop off at Step 3 (Connect Integration) and submits initial quantitative findings.",
      dialogueText:
        "Vikram Malhotra: \"Funnel query completed (art-quant-1). Out of 34.5k signups, 72.4% drop off at Step 3 before completing workspace setup. Paid conversion is just 1.18%.\"",
      toolUsed: "query_funnel_db",
      artifactId: "art-quant-1",
      agentStatuses: {
        "lead-consultant": { status: "complete", currentTool: null, task: "Supervising multi-agent execution" },
        "framework-analyst": {
          status: "working",
          currentTool: "aarrr_framework_mapper",
          task: "Synthesizing AARRR hypothesis on activation failure",
        },
        "market-researcher": { status: "complete", currentTool: null, task: "Benchmark deliverable approved" },
        "business-analyst": {
          status: "complete",
          currentTool: null,
          task: "Findings submitted for peer review",
          artifactId: "art-quant-1",
        },
        "critical-reviewer": {
          status: "working",
          currentTool: "evidence_gap_detector",
          task: "Auditing Vikram's dataset methodology",
        },
        "strategy-agent": { status: "queued", currentTool: null, task: "Standby for peer review sign-off" },
      },
    },
    {
      id: "evt-5",
      stepNumber: 5,
      fromAgentId: "framework-analyst",
      toAgentId: "critical-reviewer",
      eventType: "handoff",
      timestamp: "10:02:30",
      title: "Framework Analyst Focuses on Activation Bottleneck",
      description:
        "Julian Thorne applies Pirate Metrics (AARRR) and formulates the hypothesis that setup cognitive overload is the single point of failure.",
      dialogueText:
        "Julian Thorne: \"Framework breakdown published (art-framework-1). Acquisition volume is healthy; the entire leak is located in the Activation stage. Passing to Marcus Cole for critical audit.\"",
      toolUsed: "aarrr_framework_mapper",
      artifactId: "art-framework-1",
      agentStatuses: {
        "lead-consultant": { status: "complete", currentTool: null, task: "Supervising multi-agent execution" },
        "framework-analyst": {
          status: "complete",
          currentTool: null,
          task: "AARRR issue tree completed",
          artifactId: "art-framework-1",
        },
        "market-researcher": { status: "complete", currentTool: null, task: "Benchmark deliverable approved" },
        "business-analyst": { status: "complete", currentTool: null, task: "Standby for review feedback" },
        "critical-reviewer": {
          status: "working",
          currentTool: "evidence_gap_detector",
          task: "Pressure-testing aggregation assumptions",
        },
        "strategy-agent": { status: "queued", currentTool: null, task: "Standby for review outcome" },
      },
    },
    {
      id: "evt-6",
      stepNumber: 6,
      fromAgentId: "critical-reviewer",
      toAgentId: "business-analyst",
      eventType: "challenge_review",
      timestamp: "10:03:05",
      title: "Critical Reviewer Challenges Data: Demands Cohort Analysis",
      description:
        "Marcus Cole issues a formal red-team challenge: the data lumps paid ad traffic with organic users, distorting reality. Demands cohort segmentation.",
      dialogueText:
        "Marcus Cole (Critical Reviewer): \"Hold on. You are pooling 34,500 users together without separating acquisition channels! You launched a huge Google Ads campaign last month. If low-intent ad traffic is skewing the numbers, blaming the product onboarding is wrong. Vikram, I am rejecting art-quant-1. You must rerun a cohort breakdown by channel!\"",
      toolUsed: "evidence_gap_detector",
      artifactId: "art-review-1",
      agentStatuses: {
        "lead-consultant": { status: "working", currentTool: null, task: "Adjudicating red-team challenge" },
        "framework-analyst": {
          status: "awaiting_information",
          currentTool: null,
          task: "Awaiting cohort verification before confirming H1",
        },
        "market-researcher": { status: "complete", currentTool: null, task: "Benchmark deliverable approved" },
        "business-analyst": {
          status: "revising",
          currentTool: "cohort_segmentation_sql",
          task: "Re-running calculation: isolating Organic vs Paid Ads cohorts",
        },
        "critical-reviewer": {
          status: "complete",
          currentTool: null,
          task: "Challenge issued; awaiting revised calculation",
          artifactId: "art-review-1",
        },
        "strategy-agent": { status: "queued", currentTool: null, task: "Gated until cohort data verified" },
      },
    },
    {
      id: "evt-7",
      stepNumber: 7,
      fromAgentId: "business-analyst",
      toAgentId: "critical-reviewer",
      eventType: "re_calculation",
      timestamp: "10:03:48",
      title: "Business Analyst Reruns Cohort Calculation (v2)",
      description:
        "Vikram Malhotra reruns the model: Organic users actually convert at 4.2% (healthy), while Google Ads signups drop at 88.4% due to intent mismatch.",
      dialogueText:
        "Vikram Malhotra: \"Marcus was right! Cohort breakdown complete (art-quant-2). Organic and Referral users convert at 4.21%—right on benchmark. The 1.1% aggregate was dragged down by 23,000 low-intent Google Ads clicks that convert at 0.24%. However, 34% of organic users still drop at OAuth before seeing value.\"",
      toolUsed: "cohort_segmentation_sql",
      artifactId: "art-quant-2",
      agentStatuses: {
        "lead-consultant": { status: "complete", currentTool: null, task: "Endorsing revised finding" },
        "framework-analyst": {
          status: "complete",
          currentTool: null,
          task: "Updating hypothesis with segmented cohort reality",
        },
        "market-researcher": { status: "complete", currentTool: null, task: "Benchmark deliverable approved" },
        "business-analyst": {
          status: "complete",
          currentTool: null,
          task: "Delivered verified v2 cohort findings",
          artifactId: "art-quant-2",
        },
        "critical-reviewer": {
          status: "working",
          currentTool: "audit_signoff",
          task: "Validating recalculated cohort metrics",
        },
        "strategy-agent": {
          status: "working",
          currentTool: "synthesize_decision_brief",
          task: "Drafting decision brief based on corrected evidence",
        },
      },
    },
    {
      id: "evt-8",
      stepNumber: 8,
      fromAgentId: "critical-reviewer",
      toAgentId: "strategy-agent",
      eventType: "handoff",
      timestamp: "10:04:15",
      title: "Critical Reviewer Validates Corrected Evidence",
      description:
        "Marcus Cole approves the revised quantitative findings and passes the verified dossier to Maya Lin for executive strategy synthesis.",
      dialogueText:
        "Marcus Cole: \"Audit passed. The cohort segmentation is clean and the root cause is now indisputable. Handing off to Maya Lin to formulate the executive recommendation.\"",
      toolUsed: "audit_signoff",
      agentStatuses: {
        "lead-consultant": { status: "complete", currentTool: null, task: "Workstream closed" },
        "framework-analyst": { status: "complete", currentTool: null, task: "Workstream closed" },
        "market-researcher": { status: "complete", currentTool: null, task: "Workstream closed" },
        "business-analyst": { status: "complete", currentTool: null, task: "Workstream closed" },
        "critical-reviewer": { status: "complete", currentTool: null, task: "Audit passed & signed off" },
        "strategy-agent": {
          status: "working",
          currentTool: "synthesize_decision_brief",
          task: "Synthesizing final Decision Brief & Action Plan",
        },
      },
    },
    {
      id: "evt-9",
      stepNumber: 9,
      fromAgentId: "strategy-agent",
      toAgentId: "lead-consultant",
      eventType: "recommendation",
      timestamp: "10:04:52",
      title: "Strategy Agent Delivers Final Decision Brief & Action Plan",
      description:
        "Maya Lin delivers the final executive recommendation directly linked to the supporting findings from Vikram, Aria, Julian, and Marcus.",
      dialogueText:
        "Maya Lin: \"Executive Decision Brief delivered (art-strategy-1). We propose a 30-Day 'Sandbox First' activation experiment and an immediate paid ad intent gate. Every recommendation is directly linked to our peer-verified evidence.\"",
      toolUsed: "synthesize_decision_brief",
      artifactId: "art-strategy-1",
      agentStatuses: {
        "lead-consultant": { status: "complete", currentTool: null, task: "Final brief accepted" },
        "framework-analyst": { status: "complete", currentTool: null, task: "Final brief accepted" },
        "market-researcher": { status: "complete", currentTool: null, task: "Final brief accepted" },
        "business-analyst": { status: "complete", currentTool: null, task: "Final brief accepted" },
        "critical-reviewer": { status: "complete", currentTool: null, task: "Final brief accepted" },
        "strategy-agent": {
          status: "complete",
          currentTool: null,
          task: "Decision brief and action plan published",
          artifactId: "art-strategy-1",
        },
      },
    },
  ],
  finalRecommendation: {
    decision:
      "Deploy a 'Sandbox-First' Interactive Demo Flow & Pause Unqualified Paid Search Campaigns",
    rationale:
      "The conversion slump was proven by cohort analysis to be driven by two distinct factors: 67% low-intent paid ad traffic with 0.24% conversion, and an unnecessary upfront integration wall that causes 34% drop-off even among qualified organic users.",
    actionPlan: [
      {
        phase: "Week 1 (Immediate)",
        title: "Negative Keyword Filter & Intent Gating",
        detail:
          "Pause broad match Google Search ads promising 'instant free utility'; gate ad landing pages with qualifying company size questions.",
        owner: "Head of Growth & Performance Marketing",
        metric: "CAC reduction of $4,200/mo, zero drop in qualified leads",
      },
      {
        phase: "Week 2–3 (Build)",
        title: "Pre-Populated Sandbox Experience",
        detail:
          "Provide an 'Explore with Sample Workspace' button at Step 2 so users experience charts, reporting, and ROI before being required to connect production OAuth.",
        owner: "Lead Product Designer & Frontend Lead",
        metric: "Time-to-first-value drops from 42 mins to under 4 mins",
      },
      {
        phase: "Week 4 (Experiment)",
        title: "A/B Test Intent-Gated Onboarding vs Control",
        detail:
          "Measure D7 activation and trial-to-paid upgrade across 1,000 new organic signups.",
        owner: "Strategy Lead & Data Team",
        metric: "Projected 3.8% -> 5.2% paid conversion lift",
      },
    ],
    supportingFindings: [
      {
        id: "sup-1",
        agentId: "business-analyst",
        agentName: "Vikram Malhotra",
        title: "Cohort Disambiguation: Organic (4.2%) vs Paid Ads (0.24%)",
        summary:
          "Disproved the aggregate myth: Organic users convert normally, while paid search traffic was polluting blended conversion.",
        metricOrQuote: "Organic converts at 4.21% vs Paid at 0.24% (art-quant-2)",
        artifactId: "art-quant-2",
        status: "revised_and_verified",
      },
      {
        id: "sup-2",
        agentId: "critical-reviewer",
        agentName: "Marcus Cole",
        title: "Red-Team Challenge on Aggregate Data Poisoning",
        summary:
          "Rejected the original monolithic funnel calculation; prevented premature overhaul of core platform code.",
        metricOrQuote: "Challenged v1 and forced channel separation (art-review-1)",
        artifactId: "art-review-1",
        status: "verified",
      },
      {
        id: "sup-3",
        agentId: "framework-analyst",
        agentName: "Julian Thorne",
        title: "AARRR Issue Tree: Activation Failure Isolation",
        summary:
          "Proved acquisition volume is sufficient; the breakdown is strictly concentrated in early first-session onboarding.",
        metricOrQuote: "72% drop-off localized before Step 3 (art-framework-1)",
        artifactId: "art-framework-1",
        status: "verified",
      },
      {
        id: "sup-4",
        agentId: "market-researcher",
        agentName: "Aria Sterling",
        title: "SaaS PLG Comps: The 24.3% Activation Benchmark",
        summary:
          "Benchmarked Figma/Linear onboarding mechanics; established that zero-friction sandbox mode is the gold standard.",
        metricOrQuote: "Top performers deliver TTV < 7 mins (art-research-1)",
        artifactId: "art-research-1",
        status: "verified",
      },
    ],
  },
};

// SCENARIO 2: Pricing Overhaul & Churn Spike
export const SCENARIO_PRICING_CHURN: SwarmScenario = {
  id: "pricing_overhaul",
  title: "B2B SaaS Pricing Overhaul & Churn Spike",
  category: "Pricing & Retention",
  founderPrompt:
    "We shifted from seat-based pricing to usage-based consumption and customers are churning at day 60.",
  description:
    "Evaluate why transitioning to usage-based billing generated unpredictable invoices and customer churn, validate pricing elasticity, and structure a hybrid contract model.",
  initialAgents: BASE_AGENTS.map((a) => ({ ...a })),
  artifacts: {
    "art-plan-pricing": {
      id: "art-plan-pricing",
      title: "Investigation Plan: Usage-Based Pricing Friction Audit",
      agentId: "lead-consultant",
      agentName: "Dr. Evelyn Vance",
      agentRole: "Lead Consultant",
      version: 1,
      badge: "Investigation Plan",
      summary: "Triages billing surprises, budget owner anxiety, and billing unit granularity.",
      contentMarkdown: `### Investigation Scope
- Dissect the invoice distribution across SMB vs Mid-Market accounts.
- Benchmark consumption billing models among peer infrastructure SaaS tools.`,
      status: "approved",
    },
    "art-research-pricing": {
      id: "art-research-pricing",
      title: "Market Comps: Hybrid SaaS Pricing Models (Snowflake, Datadog)",
      agentId: "market-researcher",
      agentName: "Aria Sterling",
      agentRole: "Market Researcher",
      version: 1,
      badge: "Research Notes with Sources",
      summary: "Shows pure consumption models induce budget anxiety without monthly committed minimums and usage alerts.",
      keyMetrics: [
        { label: "SaaS with Committed Spend", value: "78%", note: "Hybrid Model" },
        { label: "Bill Shock Churn Rate", value: "31%", note: "Unbudgeted spikes" },
      ],
      contentMarkdown: `### Comps
- Snowflake and Twilio bundle committed annual credits with overage rates, preventing procurement shock.`,
      status: "approved",
    },
    "art-quant-pricing": {
      id: "art-quant-pricing",
      title: "Churn Analysis & Invoicing Volatility",
      agentId: "business-analyst",
      agentName: "Vikram Malhotra",
      agentRole: "Business Analyst",
      version: 1,
      badge: "Quantitative Findings (v1)",
      summary: "Identifies that 41% of churned accounts experienced a single invoice spike >2.5x their median bill in Month 2.",
      keyMetrics: [
        { label: "Net Revenue Retention", value: "88%", note: "Down from 114%" },
        { label: "D60 Churn Rate", value: "18.4%", note: "Target < 4%" },
      ],
      contentMarkdown: `### Finding
- Month 2 usage spikes triggered immediate CFO cancellation alerts.`,
      status: "approved",
    },
    "art-strategy-pricing": {
      id: "art-strategy-pricing",
      title: "Hybrid Tiering Decision Brief & Tiered Caps",
      agentId: "strategy-agent",
      agentName: "Maya Lin",
      agentRole: "Strategy Agent",
      version: 1,
      badge: "Decision Brief & Action Plan",
      summary: "Replaces unconstrained consumption with 3 predictable monthly commitment tiers + soft budget alert limits.",
      contentMarkdown: `### Strategy Recommendation
- Transition to base tier + pooled credits. Introduce 80% usage email notifications.`,
      status: "approved",
    },
  },
  events: [
    {
      id: "evt-p1",
      stepNumber: 1,
      fromAgentId: "founder",
      toAgentId: "lead-consultant",
      eventType: "assignment",
      timestamp: "11:00:00",
      title: "Founder Case Intake",
      description: "Founder submits pricing migration dilemma.",
      dialogueText: "Founder: \"We shifted from seat-based to usage-based billing and D60 churn spiked from 4% to 18%.\"",
      agentStatuses: {
        "lead-consultant": { status: "working", currentTool: "problem_scope_clarifier", task: "Framing pricing investigation" },
        "framework-analyst": { status: "queued", currentTool: null, task: "Standby" },
        "market-researcher": { status: "queued", currentTool: null, task: "Standby" },
        "business-analyst": { status: "queued", currentTool: null, task: "Standby" },
        "critical-reviewer": { status: "queued", currentTool: null, task: "Standby" },
        "strategy-agent": { status: "queued", currentTool: null, task: "Standby" },
      },
    },
    {
      id: "evt-p2",
      stepNumber: 2,
      fromAgentId: "lead-consultant",
      toAgentId: "business-analyst",
      eventType: "assignment",
      timestamp: "11:00:30",
      title: "Workstream Assignment",
      description: "Dr. Evelyn Vance delegates quantitative churn analysis to Vikram and pricing benchmarks to Aria.",
      dialogueText: "Dr. Evelyn Vance: \"Vikram, audit the invoice distribution of churned customers. Aria, analyze how Snowflake and Datadog prevent bill shock.\"",
      artifactId: "art-plan-pricing",
      agentStatuses: {
        "lead-consultant": { status: "complete", currentTool: null, task: "Supervising", artifactId: "art-plan-pricing" },
        "framework-analyst": { status: "queued", currentTool: null, task: "Standby" },
        "market-researcher": { status: "working", currentTool: "web_search_benchmarks", task: "Benchmarking hybrid billing models" },
        "business-analyst": { status: "working", currentTool: "query_funnel_db", task: "Calculating invoice spike correlation" },
        "critical-reviewer": { status: "queued", currentTool: null, task: "Standby" },
        "strategy-agent": { status: "queued", currentTool: null, task: "Standby" },
      },
    },
    {
      id: "evt-p3",
      stepNumber: 3,
      fromAgentId: "business-analyst",
      toAgentId: "strategy-agent",
      eventType: "finding",
      timestamp: "11:01:15",
      title: "Vikram Identifies Bill Shock Spikes",
      description: "Quantitative analysis confirms that 41% of churners had an unexpected 2.5x spike in Month 2.",
      dialogueText: "Vikram Malhotra: \"41% of churners experienced an invoice jump over 250% due to background API jobs running unmetered.\"",
      artifactId: "art-quant-pricing",
      agentStatuses: {
        "lead-consultant": { status: "complete", currentTool: null, task: "Supervising" },
        "framework-analyst": { status: "complete", currentTool: null, task: "Pricing model reviewed" },
        "market-researcher": { status: "complete", currentTool: null, task: "Comps published", artifactId: "art-research-pricing" },
        "business-analyst": { status: "complete", currentTool: null, task: "Invoice correlation found", artifactId: "art-quant-pricing" },
        "critical-reviewer": { status: "complete", currentTool: null, task: "Audited" },
        "strategy-agent": { status: "complete", currentTool: null, task: "Published hybrid brief", artifactId: "art-strategy-pricing" },
      },
    },
  ],
  finalRecommendation: {
    decision: "Transition to Hybrid Base Commitment + Soft Cap Budget Alerts",
    rationale:
      "Customers do not object to paying for value, but CFOs reject unpredictable invoices. Offering minimum commitments with overage caps eliminates 80% of bill shock churn.",
    actionPlan: [
      {
        phase: "Week 1",
        title: "Automated 80% and 100% Budget Warning Alerts",
        detail: "Allow admins to set hard or soft monthly dollar spending limits.",
        owner: "Engineering & Billing Team",
        metric: "Immediate reduction in surprise invoice tickets",
      },
      {
        phase: "Week 2–4",
        title: "Rollout 3 Pre-Committed Hybrid Plans",
        detail: "Combine $99, $299, and $799 monthly tiers with bundled consumption credits.",
        owner: "Head of Product & Finance",
        metric: "Net Revenue Retention recovery to > 110%",
      },
    ],
    supportingFindings: [
      {
        id: "sup-p1",
        agentId: "business-analyst",
        agentName: "Vikram Malhotra",
        title: "2.5x Invoice Spike Correlation",
        summary: "41% of all churns directly followed an unbudgeted spike in month 2.",
        metricOrQuote: "41% spike correlation (art-quant-pricing)",
        artifactId: "art-quant-pricing",
        status: "verified",
      },
      {
        id: "sup-p2",
        agentId: "market-researcher",
        agentName: "Aria Sterling",
        title: "Industry Standard Hybrid Commitment Model",
        summary: "78% of consumption SaaS tools rely on committed base tiers to stabilize revenue.",
        metricOrQuote: "78% adoption of hybrid pricing (art-research-pricing)",
        artifactId: "art-research-pricing",
        status: "verified",
      },
    ],
  },
};

export const ALL_SCENARIOS: SwarmScenario[] = [
  SCENARIO_SIGNUPS_NO_CUSTOMERS,
  SCENARIO_PRICING_CHURN,
];

export function getScenarioById(id: string): SwarmScenario {
  return ALL_SCENARIOS.find((s) => s.id === id) || SCENARIO_SIGNUPS_NO_CUSTOMERS;
}
