import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { FrameworkTree } from "@/components/consulting/FrameworkTree";
import { generateConsultingSolution, buildFrameworkTree } from "@/lib/consulting/consultingEngine";
import { ConsultingSolution, FrameworkId } from "@/lib/consulting/types";
import {
  Sparkles,
  Sliders,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Download,
  RotateCcw,
  Layers,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Compass,
  Palette,
  Moon,
  Sun,
  Flame,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FOUNDER LAB — A Structured Approach to Your Next Big Decision" },
      {
        name: "description",
        content:
          "A structured, fluid investigation for decisions that keep founders up at night. Deconstruct startup problems into rigorous MECE frameworks and action plans.",
      },
      { property: "og:title", content: "FOUNDER LAB — A Structured Approach to Your Next Big Decision" },
      {
        property: "og:description",
        content:
          "Bring the problem. Find your next move. Framework-driven startup decision briefs adapted from FMS Delhi Consulting Club.",
      },
    ],
  }),
  component: FounderLabApp,
});

interface CaseData {
  name: string;
  product: string;
  customer: string;
  stage: string;
  issue: string;
  goal: string;
  constraint: string;
}

interface FrameworkDef {
  key: string;
  name: string;
  why: string;
  equation: string;
  questions: string[];
  hypotheses: string[];
  checks: string[];
  actions: string[];
  metrics: string[];
  avoid: string;
}

const FRAMEWORK_DEFS: Record<string, FrameworkDef> = {
  profit: {
    key: "profit",
    name: "Profitability",
    why: "Separate revenue and cost drivers, then examine customers, transaction value, product mix, and the value chain.",
    equation: "Profits = (No. of Customers × Avg Ticket Size) – (Fixed Costs + Variable Value-Chain Costs)",
    questions: [
      "What changed in revenue and costs, and over which comparable periods?",
      "Which products, channels or customer segments changed most?",
      "Which costs are included in your profit calculation?",
    ],
    hypotheses: [
      "A change in product or customer mix is reducing blended gross margin.",
      "Discounts, returns or fulfillment logistics costs are growing faster than net revenue.",
      "Operating costs have scaled ahead of realized customer cohort monetization.",
    ],
    checks: [
      "Build a comparable-period revenue and cost bridge.",
      "Break contribution profit down by product line, customer cohort, and acquisition channel.",
      "Separate fixed overhead from direct variable and one-off expenditures.",
    ],
    actions: [
      "Reconcile the margin decline before changing growth spend.",
      "Pilot one focused intervention against the largest verified source of margin leak.",
      "Track contribution profit and customer retention together in daily cohorts.",
    ],
    metrics: ["Contribution margin %", "Return / refund rate", "Repeat purchase rate"],
    avoid: "Cutting costs broadly across the board before pinpointing the root cause.",
  },
  growth: {
    key: "growth",
    name: "Growth strategy",
    why: "Compare growth from existing customers and products with new products or markets, accounting for bottlenecks and feasibility.",
    equation: "Organic (Existing/New Markets × Existing/New Products) + Inorganic (JVs, M&A)",
    questions: [
      "Where does your funnel lose the most customers: acquisition, activation, payment or retention?",
      "Which customer segment currently gets the most demonstrable value?",
      "What growth experiments have you tried, and what happened?",
    ],
    hypotheses: [
      "The primary bottleneck is post-signup activation and Day-7 retention rather than top-of-funnel reach.",
      "The current acquisition mix includes low-intent traffic diluting overall cohort velocity.",
      "One specific power-user segment has 3x higher retention and LTV than the blended average.",
    ],
    checks: [
      "Audit the customer journey by cohort using consistent time windows.",
      "Measure time-to-first-value (Aha moment) and the % of users who reach it.",
      "Conduct 10 exit interviews with churned users and 10 with high-retention advocates.",
    ],
    actions: [
      "Eliminate the single largest measurable friction point in the user journey.",
      "Launch a concentrated pilot tailored strictly to the highest-converting ICP.",
      "Scale acquisition spend only after downstream retention and payback are stabilized.",
    ],
    metrics: ["Activation velocity", "Cohort Day-30 retention", "Blended CAC payback period"],
    avoid: "Accelerating ad budget before downstream conversion bottlenecks are resolved.",
  },
  pricing: {
    key: "pricing",
    name: "Pricing strategy",
    why: "Compare serving costs, competing offers, substitutes, and perceived value before testing price or packaging.",
    equation: "Pricing Power = Perceived Value + Switching Cost – Opportunity Cost of Alternatives",
    questions: [
      "What are your current prices, packages, discounts and serving costs?",
      "What evidence do you have about willingness to pay or pricing objections?",
      "Which alternatives do customers compare you with?",
    ],
    hypotheses: [
      "The pricing metric or packaging does not align with how customers extract value.",
      "High-usage accounts incur disproportionate infrastructure costs without tiered compensation.",
      "Checkout friction or contract rigidity is being misdiagnosed as price sensitivity.",
    ],
    checks: [
      "Model marginal serving costs and gross margins across different customer consumption tiers.",
      "Review verbatim sales objections from won vs lost enterprise prospects.",
      "Benchmark competitor pricing architecture on an apple-to-apples feature basis.",
    ],
    actions: [
      "Decouple product-value objections from contract terms and payment friction.",
      "Draft two packaging options with explicit margin and retention guardrails.",
      "Run a bounded pricing test with grandfathered existing user protections.",
    ],
    metrics: ["Average Revenue Per Account (ARPU)", "Gross margin per tier", "Gross revenue churn"],
    avoid: "Assuming past transaction prices reflect true willingness-to-pay elasticity.",
  },
  market: {
    key: "market",
    name: "Market entry",
    why: "Assess the target segment’s attractiveness, product fit, economics, operating capability and risks before committing.",
    equation: "Market Attractiveness = TAM/SAM × Regulatory Ease × Capable Margin Capture",
    questions: [
      "Which market or geography are you considering, and why now?",
      "What evidence of organic pull exists in that territory?",
      "What capital, regulatory changes, and break-even assumptions would entry require?",
    ],
    hypotheses: [
      "The new geography has distinct regulatory, payment, or localization demands.",
      "Existing domestic capabilities and vendor networks cannot scale without localized headcount.",
      "A lightweight beachhead pilot can de-risk 80% of entry assumptions before major capex.",
    ],
    checks: [
      "Compare local regulatory licensing, duties, and operational requirements.",
      "Model entry costs, local CAC benchmarks, and conservative break-even scenarios.",
      "Identify 3 trusted local distribution partners or omnichannel aggregators.",
    ],
    actions: [
      "Weigh market entry upside against doubling down on existing core territory.",
      "Validate product-market fit via a 60-day localized pilot before signing long leases.",
      "Set explicit go / no-go evaluation milestones and exit criteria.",
    ],
    metrics: ["Qualified pilot demand", "Unit contribution economics", "Sales cycle length"],
    avoid: "Equating top-down market size estimates with actual attainable demand.",
  },
  gtm: {
    key: "gtm",
    name: "Go-to-market",
    why: "Connect whom to sell to, what to sell, where to sell, and what to communicate in one coherent offer.",
    equation: "GTM Alignment = (Target ICP × Clear Value Proposition × Dominant Channel) / Friction",
    questions: [
      "Who has the most urgent, bleeding-neck pain, and what trigger event causes it?",
      "What tangible outcome does your product deliver, and how quickly is it felt?",
      "Which channels and messaging narratives have produced qualified demand?",
    ],
    hypotheses: [
      "The current target persona is too wide; messaging lacks resonance for high-urgency buyers.",
      "The initial onboarding path is too cumbersome to deliver rapid time-to-value.",
      "Sales channels are scattered rather than concentrated on the single highest-yield route.",
    ],
    checks: [
      "Interview recent buyers to document the exact moment they decided to seek a solution.",
      "Map every click from initial awareness to first completed core action.",
      "Measure channel quality by qualified customer pipeline rather than vanity clicks.",
    ],
    actions: [
      "Concentrate on one narrow segment with a specific urgency trigger.",
      "Streamline first-use onboarding to deliver the core 'Aha' moment in under 5 minutes.",
      "Master one single acquisition channel before experimenting with secondary channels.",
    ],
    metrics: ["Lead-to-opportunity rate", "Time to first value", "Channel CAC efficiency"],
    avoid: "Diffusing marketing resources across five channels before one is proven.",
  },
  ma: {
    key: "ma",
    name: "Mergers & acquisitions",
    why: "Examine financial fit, non-financial fit, due diligence, implementation and exit assumptions.",
    equation: "Net Deal Value = DCF Standalone + Net Synergies – Premium – Integration Cost",
    questions: [
      "What strategic capability or market share would the transaction acquire?",
      "What financial, customer, and code audit data has the target disclosed?",
      "What post-merger integration costs, technical debt, and culture risks exist?",
    ],
    hypotheses: [
      "Projected cost and revenue synergies rely on unverified operational overlap.",
      "Complex technical re-architecture will absorb key engineering cycles post-closing.",
      "Top-account revenue concentration creates sudden post-acquisition churn exposure.",
    ],
    checks: [
      "Perform independent reconciliation of historical GAAP financials and bank reconciliations.",
      "Audit commercial contracts, customer churn history, and key IP ownership clauses.",
      "Model worst-case standalone performance excluding all synergy benefits.",
    ],
    actions: [
      "Establish an evidence-backed diligence checklist with non-negotiable gates.",
      "Compare buyout capital expenditure against organic development or strategic partnership.",
      "Construct a detailed 100-day operational integration roadmap prior to LOI execution.",
    ],
    metrics: ["Cash conversion ratio", "Top 5 customer concentration %", "Integration milestone pace"],
    avoid: "Treating unverified projected synergies as guaranteed future cash flow.",
  },
};

const SAMPLE_CASES: (CaseData & { highlight: string; category: string })[] = [
  {
    name: "Mockmate",
    stage: "Early revenue",
    product: "An AI interview-preparation app offering personalized mock interviews and feedback.",
    customer: "College students and junior engineers preparing for competitive job interviews",
    issue: "8,000 people registered, but only 70 have paid. We tried Instagram ads. How do we improve conversion?",
    goal: "Increase paid conversion to 3.5% over the next 60 days",
    constraint: "Small engineering team and strict $3,000 monthly marketing budget",
    highlight: "8,000 signups. Just 70 paid users.",
    category: "Growth / Go-to-market",
  },
  {
    name: "Daily Ritual",
    stage: "Scaling",
    product: "A direct-to-consumer skincare brand selling specialized active formulations online.",
    customer: "Urban professionals buying daily skincare and dermatological serums",
    issue: "Revenue grew 40% this quarter, but profit fell. Discounts, returns, and fulfillment expenses have spiked.",
    goal: "Improve unit contribution margin by +6% without sacrificing 60-day customer retention",
    constraint: "Cannot substantially increase customer acquisition spend",
    highlight: "Sales are growing. Profits aren’t.",
    category: "Profitability / Pricing",
  },
  {
    name: "Teamflow",
    stage: "Early revenue",
    product: "Collaborative project management software built specifically for fast-paced creative agencies.",
    customer: "Boutique creative agencies and independent design studios (10-50 staff)",
    issue: "Enterprise inbound requests are increasing, but our self-serve agency product is growing steadily. Where should we focus?",
    goal: "Determine whether to launch an enterprise sales motion or consolidate the SMB agency niche",
    constraint: "Four-person core team with 9 months of runway remaining",
    highlight: "Enterprise or small agencies?",
    category: "Market entry / Growth",
  },
];

function routeFrameworks(issueText: string): string[] {
  const s = issueText.toLowerCase();
  const scores: Record<string, number> = { profit: 0, growth: 0, pricing: 0, market: 0, gtm: 0, ma: 0 };
  const patterns: Record<string, RegExp> = {
    profit: /profit|margin|cost|loss|losing money|expenses|shipping|returns|ebitda|burn/g,
    growth: /grow|growth|retention|churn|stalled|convert|conversion|paid|register|signup|sign.up/g,
    pricing: /pric|charg|package|subscription|discount|willingness|paying/g,
    market: /enter|expan|new market|enterprise|geograph|city|cities|segment|country|uae|gcc/g,
    gtm: /launch|customer|audience|channel|marketing|ads|advertis|position|sign.up|register|convert|conversion/g,
    ma: /acquir|acquisition of|merg|buy a|buying a|target company|deal/g,
  };
  Object.keys(scores).forEach((k) => {
    scores[k] = (s.match(patterns[k]) || []).length;
  });
  const sorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  if (!scores[sorted[0]]) return ["gtm", "growth"];
  const matched = sorted.filter((k) => scores[k] > 0).slice(0, 3);
  return matched.length ? matched : ["growth", "gtm"];
}

type ThemeMode = "sapphire" | "dark" | "violet" | "bordeaux";

function FounderLabApp() {
  const [step, setStep] = useState(0); // 0: Context, 1: Investigate, 2: Review, 3: Decision Brief
  const [tab, setTab] = useState<"diagnosis" | "evidence" | "research" | "actions" | "tree">("diagnosis");

  // Dynamic Theme state
  const [theme, setTheme] = useState<ThemeMode>("sapphire");

  const [data, setData] = useState<CaseData>({
    name: "",
    product: "",
    customer: "",
    stage: "Early revenue",
    issue: "",
    goal: "",
    constraint: "",
  });

  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [downloadStatus, setDownloadStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiModal, setShowApiModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [solutionReport, setSolutionReport] = useState<ConsultingSolution | null>(null);

  // Dynamic interactive simulator state (Sprint timeline)
  const [simulatedDays, setSimulatedDays] = useState<30 | 60 | 90>(60);
  const [completedMilestones, setCompletedMilestones] = useState<Record<number, boolean>>({});

  // Hovered framework preview
  const [hoveredFw, setHoveredFw] = useState<FrameworkDef | null>(null);

  // Apply theme to document
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("founderlab_theme") as ThemeMode;
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.dataset.theme = savedTheme;
      } else {
        document.documentElement.dataset.theme = "sapphire";
      }

      const savedKey = localStorage.getItem("founderfit_gemini_key");
      if (savedKey) setApiKey(savedKey);
    }
  }, []);

  const changeTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("founderlab_theme", newTheme);
      document.documentElement.dataset.theme = newTheme;
    }
  };

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    if (typeof window !== "undefined") {
      if (key) localStorage.setItem("founderfit_gemini_key", key);
      else localStorage.removeItem("founderfit_gemini_key");
    }
  };

  // Real-time Case Readiness Calculation (0 to 100%)
  const readiness = useMemo(() => {
    let score = 0;
    if (data.name.trim().length >= 2) score += 15;
    if (data.product.trim().length >= 10) score += 20;
    if (data.customer.trim().length >= 5) score += 20;
    if (data.issue.trim().length >= 15) score += 25;
    if (data.goal.trim().length >= 8) score += 15;
    if (data.constraint.trim().length >= 3) score += 5;
    return Math.min(100, score);
  }, [data]);

  const handleLoadSample = (sample: CaseData) => {
    setData({ ...sample });
    setAnswers({});
    const autoFw = routeFrameworks(sample.issue);
    setSelectedFrameworks(autoFw);
    setStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.name || !data.product || !data.customer || !data.issue || !data.goal) {
      alert("Please fill in the required fields to build the investigation.");
      return;
    }

    if (selectedFrameworks.length === 0) {
      const autoFw = routeFrameworks(data.issue);
      setSelectedFrameworks(autoFw);
    }
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleFramework = (k: string) => {
    if (selectedFrameworks.includes(k)) {
      if (selectedFrameworks.length === 1) return; // Keep at least one
      setSelectedFrameworks(selectedFrameworks.filter((f) => f !== k));
    } else {
      if (selectedFrameworks.length >= 3) {
        alert("Select at most 3 analytical frameworks.");
        return;
      }
      setSelectedFrameworks([...selectedFrameworks, k]);
    }
  };

  const handleInvestigateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // Go straight to the decision brief
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Background AI analysis if available
    const primaryKey = selectedFrameworks[0] || "growth";
    const fwMapping: Record<string, any> = {
      profit: "profitability",
      growth: "growth_strategy",
      pricing: "pricing_strategy",
      market: "market_entry",
      gtm: "gtm_launch",
      ma: "mna",
    };

    setIsAiLoading(true);
    try {
      const sol = await generateConsultingSolution({
        companyName: data.name,
        industry: data.stage,
        geography: "Primary Market",
        problemStatement: `${data.issue}. Goal: ${data.goal}. Constraints: ${data.constraint}`,
        frameworkId: fwMapping[primaryKey] || "growth_strategy",
        apiKey,
      });
      setSolutionReport(sol);
    } catch (err) {
      console.warn("AI strategy synthesis note:", err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCopyBrief = () => {
    const primaryFw = FRAMEWORK_DEFS[selectedFrameworks[0]] || FRAMEWORK_DEFS.growth;
    let text = `${data.name.toUpperCase()} — EXECUTIVE DECISION BRIEF\n`;
    text += `Primary Framework: ${primaryFw.name}\n`;
    text += `Target Customer: ${data.customer}\n`;
    text += `Decision Goal: ${data.goal}\n\n`;
    text += `RECOMMENDED INTERVENTIONS:\n`;
    primaryFw.actions.forEach((a, i) => {
      text += `${i + 1}. ${a}\n`;
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const primaryFw = FRAMEWORK_DEFS[selectedFrameworks[0]] || FRAMEWORK_DEFS.growth;
    let out = `# ${data.name} — Executive Decision Brief\n\n`;
    out += `**Framework**: ${primaryFw.name} (FMS Consulting Club, 2025–26)\n`;
    out += `**Stage**: ${data.stage}\n`;
    out += `**Customer**: ${data.customer}\n`;
    out += `**Issue**: ${data.issue}\n`;
    out += `**Decision Goal**: ${data.goal}\n`;
    out += `**Constraint**: ${data.constraint || "None specified"}\n\n`;

    out += `## Analytical Lenses\n`;
    selectedFrameworks.forEach((k) => {
      out += `- **${FRAMEWORK_DEFS[k]?.name}**: ${FRAMEWORK_DEFS[k]?.why}\n`;
    });

    out += `\n## Core Analytical Equation\n`;
    out += `\`${primaryFw.equation}\`\n\n`;

    out += `## Competing Explanations to Investigate\n`;
    primaryFw.hypotheses.forEach((h, i) => {
      out += `${i + 1}. ${h}\n`;
    });

    out += `\n## Evidence & Questions\n`;
    selectedFrameworks.forEach((k) => {
      const f = FRAMEWORK_DEFS[k];
      out += `\n### ${f?.name}\n`;
      f?.questions.forEach((q, i) => {
        out += `- **${q}**\n  ${answers[k + i]?.trim() || "Unknown · evidence needed"}\n`;
      });
    });

    out += `\n## Proposed Action Sequence (${simulatedDays}-Day Runway)\n`;
    primaryFw.actions.forEach((a, i) => {
      out += `${i + 1}. ${a}\n`;
    });

    out += `\n## Decision Rule & Caution\n${primaryFw.avoid}\n`;

    const blob = new Blob([out], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.toLowerCase().replace(/\s+/g, "-")}-decision-brief.md`;
    a.click();
    setDownloadStatus("Brief downloaded as Markdown.");
    setTimeout(() => setDownloadStatus(""), 4000);
  };

  const primaryFramework = FRAMEWORK_DEFS[selectedFrameworks[0]] || FRAMEWORK_DEFS.growth;

  const totalQuestions = selectedFrameworks.length * 3;
  const answeredQuestions = selectedFrameworks.reduce((count, k) => {
    return (
      count +
      (FRAMEWORK_DEFS[k]?.questions.filter((_, i) => (answers[k + i] || "").trim().length > 0).length || 0)
    );
  }, 0);

  return (
    <div className="shell min-h-screen flex flex-col justify-between">
      <div>
        {/* ─── MASTHEAD HEADER ─── */}
        <header className="masthead">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="wordmark">
              FOUNDER<span>LAB</span>
            </div>
          </div>

          <div className="mast-caption">
            A STRUCTURED APPROACH TO
            <br />
            <strong>YOUR NEXT BIG DECISION</strong>
          </div>

          {/* Right Header Controls: Theme Picker & API Badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Theme Selector Button */}
            <button
              onClick={() => setShowThemeModal(true)}
              className="badge"
              style={{
                cursor: "pointer",
                background: "var(--paper)",
                color: "var(--ink)",
                borderColor: "var(--line)",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              title="Change UI Theme"
            >
              <Palette style={{ width: 14, height: 14, color: "var(--blue)" }} />
              <span style={{ textTransform: "capitalize" }}>{theme} Theme</span>
            </button>

            {/* AI Settings Button */}
            <button
              onClick={() => setShowApiModal(true)}
              className="badge"
              style={{ cursor: "pointer", background: "none", font: "inherit" }}
            >
              {apiKey ? "API KEY CONFIGURED" : "DEMO / NO API COSTS"}
            </button>
          </div>
        </header>

        {/* ─── STEP PROGRESS BAR ─── */}
        <nav className="steps" aria-label="Case progress">
          {[
            { num: "01", label: "CONTEXT", s: 0 },
            { num: "02", label: "INVESTIGATE", s: 1 },
            { num: "03", label: "REVIEW", s: 2 },
            { num: "04", label: "DECISION BRIEF", s: 3 },
          ].map((item) => (
            <div
              key={item.num}
              onClick={() => {
                if (item.s <= step || data.name) setStep(item.s);
              }}
              className={`step ${item.s === step ? "active" : item.s < step ? "done" : ""}`}
              style={{ cursor: "pointer" }}
            >
              <span>{item.s < step ? "✓" : item.num}</span>
              {item.label}
            </div>
          ))}
        </nav>

        {/* ─── CASEBAR WITH REAL-TIME READINESS METER ─── */}
        <main>
          <div className="casebar" style={{ justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              WORKSPACE <span className="slash">/</span> <strong>{data.name || "New case"}</strong>
            </div>

            {/* Live Case Readiness Ring / Pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "var(--paper)",
                border: "1px solid var(--line)",
                padding: "4px 10px",
                borderRadius: 20,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: readiness >= 80 ? "var(--blue)" : readiness >= 40 ? "var(--acid)" : "#94a3b8",
                  boxShadow: readiness >= 80 ? "0 0 8px var(--blue)" : "none",
                }}
              />
              <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--muted)" }}>
                Readiness: <strong style={{ color: "var(--ink)" }}>{readiness}%</strong>
              </span>
            </div>
          </div>

          {/* ─── STEP 0: CONTEXT ─── */}
          {step === 0 && (
            <div className="step-page">
              <div className="intro">
                <div>
                  <div className="eyebrow">01 / THE CONTEXT</div>
                  <h1>
                    Bring the problem.
                    <br />
                    <em>Find your next move.</em>
                  </h1>
                </div>
                <p>
                  A structured investigation for the decisions that keep founders up at night. Tell us what
                  you’re building and where you’re stuck.
                </p>
              </div>

              <div className="grid">
                {/* Context Form */}
                <form onSubmit={handleContextSubmit} className="card">
                  <div className="form-heading">
                    <h2>YOUR STARTUP, IN CONTEXT</h2>
                    <span>CASE / 001</span>
                  </div>

                  <div className="row">
                    <div className="field">
                      <label htmlFor="name">Startup name</label>
                      <input
                        id="name"
                        name="name"
                        maxLength={100}
                        value={data.name}
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        placeholder="What’s your startup called?"
                        required
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="stage">Company stage</label>
                      <select
                        id="stage"
                        name="stage"
                        value={data.stage}
                        onChange={(e) => setData({ ...data, stage: e.target.value })}
                      >
                        {["Idea / discovery", "Pre-revenue", "Early revenue", "Scaling"].map((x) => (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label htmlFor="product">What are you building?</label>
                    <textarea
                      id="product"
                      name="product"
                      maxLength={4000}
                      value={data.product}
                      onChange={(e) => setData({ ...data, product: e.target.value })}
                      placeholder="The product, the problem it solves, and what makes it useful."
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="customer">Who is your customer?</label>
                    <input
                      id="customer"
                      name="customer"
                      maxLength={500}
                      value={data.customer}
                      onChange={(e) => setData({ ...data, customer: e.target.value })}
                      placeholder="Be specific. Who needs this most?"
                      required
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="issue">Where are you stuck?</label>
                    <textarea
                      id="issue"
                      name="issue"
                      maxLength={4000}
                      value={data.issue}
                      onChange={(e) => setData({ ...data, issue: e.target.value })}
                      placeholder="What’s happening? What have you tried? Include any numbers that help tell the story."
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="field">
                      <label htmlFor="goal">What would progress look like?</label>
                      <input
                        id="goal"
                        name="goal"
                        maxLength={500}
                        value={data.goal}
                        onChange={(e) => setData({ ...data, goal: e.target.value })}
                        placeholder="The decision or result you need"
                        required
                      />
                    </div>

                    <div className="field">
                      <label htmlFor="constraint">
                        Your biggest constraint <span className="optional">/ optional</span>
                      </label>
                      <input
                        id="constraint"
                        name="constraint"
                        maxLength={500}
                        value={data.constraint}
                        onChange={(e) => setData({ ...data, constraint: e.target.value })}
                        placeholder="Time, budget, team, runway…"
                      />
                    </div>
                  </div>

                  <div className="actions form-actions">
                    <span className="status">
                      <span className="status-symbol">◇</span> PRIVATE TO THIS SESSION
                    </span>
                    <button type="submit" className="primary">
                      Build investigation <ArrowRight style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </form>

                {/* Starting Point & Sample Cases */}
                <div className="support">
                  <div className="case-library">
                    <div className="eyebrow">The starting point</div>
                    <h2>
                      Every hard problem
                      <br />
                      starts somewhere.
                    </h2>
                    <p>Explore a sample case. Make it your own.</p>

                    <div className="examples">
                      {SAMPLE_CASES.map((e, i) => (
                        <button
                          key={e.name}
                          className="example"
                          type="button"
                          onClick={() => handleLoadSample(e)}
                        >
                          <span className="example-num">0{i + 1}</span>
                          <span>
                            <strong>{e.name}</strong>
                            <small>{e.highlight}</small>
                            <span className="example-cat">{e.category}</span>
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="library-foot">
                      <span>ILLUSTRATIVE STARTUP CASES</span>
                      <span>03</span>
                    </div>
                  </div>

                  {/* Six Lenses Interactive Map */}
                  <div className="framework-map">
                    <div className="eyebrow">Six lenses. The right questions.</div>
                    <div className="lens-grid">
                      {Object.values(FRAMEWORK_DEFS).map((f, i) => (
                        <div
                          key={f.key}
                          onMouseEnter={() => setHoveredFw(f)}
                          onMouseLeave={() => setHoveredFw(null)}
                          style={{ cursor: "pointer", position: "relative" }}
                        >
                          <span>0{i + 1}</span>
                          {f.name}
                        </div>
                      ))}
                    </div>

                    {/* Dynamic Framework Hover Inspector */}
                    {hoveredFw ? (
                      <div
                        className="note"
                        style={{
                          marginTop: 12,
                          animation: "arrive 0.2s ease",
                          borderColor: "var(--blue)",
                          background: "var(--paper)",
                        }}
                      >
                        <strong style={{ color: "var(--blue)", fontSize: 13, display: "block" }}>
                          {hoveredFw.name} Lens
                        </strong>
                        <p style={{ fontSize: 12, margin: "4px 0", color: "var(--muted)" }}>
                          {hoveredFw.why}
                        </p>
                        <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--ink)" }}>
                          Formula: {hoveredFw.equation}
                        </span>
                      </div>
                    ) : (
                      <p className="framework-source">
                        Adapted from the FMS Consulting Club’s basic frameworks, 2025–26. Hover over any lens
                        to preview its core diagnostic formula.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 1: INVESTIGATE ─── */}
          {step === 1 && (
            <div className="step-page">
              <div className="intro">
                <div>
                  <div className="eyebrow">02 / THE INVESTIGATION</div>
                  <h1>
                    Better questions.
                    <br />
                    <em>A clearer picture.</em>
                  </h1>
                </div>
                <p>
                  The platform suggests a starting approach for <strong>{data.name}</strong>. Adjust the
                  frameworks and add what you know.
                </p>
              </div>

              <div className="grid">
                <div>
                  {/* Choose Frameworks Card */}
                  <div className="card">
                    <h2>Investigation approach</h2>
                    <p className="help">
                      Select one to three frameworks. The first selected framework drives the initial action
                      sequence.
                    </p>

                    <div style={{ marginTop: 16 }}>
                      {Object.entries(FRAMEWORK_DEFS).map(([k, f]) => (
                        <label key={k} className="framework-choice">
                          <input
                            type="checkbox"
                            name="framework"
                            value={k}
                            checked={selectedFrameworks.includes(k)}
                            onChange={() => handleToggleFramework(k)}
                          />
                          <span>
                            <strong>{f.name}</strong>
                            <span className="help" style={{ display: "block" }}>
                              {f.why}
                            </span>
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Dynamic Multi-Framework Synergy Indicator */}
                    {selectedFrameworks.length >= 2 && (
                      <div
                        className="note"
                        style={{
                          marginTop: 16,
                          borderColor: "var(--acid)",
                          background: "rgba(245, 158, 11, 0.08)",
                          color: "var(--ink)",
                        }}
                      >
                        <strong style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                          <Sparkles style={{ width: 14, height: 14, color: "var(--acid)" }} />
                          Multi-Lens Synergy Activated
                        </strong>
                        <p style={{ fontSize: 12, margin: "4px 0 0" }}>
                          Cross-referencing {selectedFrameworks.map((k) => FRAMEWORK_DEFS[k]?.name).join(" + ")}{" "}
                          to identify root vulnerabilities across both internal value chain and market
                          positioning.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Evidence Questions Form */}
                  <form onSubmit={handleInvestigateSubmit} className="card" style={{ marginTop: 20 }}>
                    <h2>Fill the evidence gaps</h2>
                    <p className="help">
                      Unknown is a useful answer. Leave a field blank if you do not have the evidence yet.
                    </p>

                    <div id="question-fields">
                      {selectedFrameworks.map((k) => {
                        const f = FRAMEWORK_DEFS[k];
                        return (
                          <div key={k}>
                            <div className="divider" />
                            <span className="tag">{f?.name}</span>
                            {f?.questions.map((q, i) => (
                              <div key={i} className="field">
                                <label htmlFor={k + i}>{q}</label>
                                <textarea
                                  id={k + i}
                                  name={k + i}
                                  maxLength={3000}
                                  style={{ minHeight: 85 }}
                                  value={answers[k + i] || ""}
                                  onChange={(e) => setAnswers({ ...answers, [k + i]: e.target.value })}
                                  placeholder="Share evidence, or leave blank if unknown."
                                />
                              </div>
                            ))}
                          </div>
                        );
                      })}
                    </div>

                    <div className="actions">
                      <button type="button" className="secondary" onClick={() => setStep(0)}>
                        Edit context
                      </button>
                      <button type="submit" className="primary">
                        Review investigation <ArrowRight style={{ width: 14, height: 14 }} />
                      </button>
                    </div>
                  </form>
                </div>

                {/* Right Side Objective Card */}
                <div className="support card small-card" style={{ alignSelf: "start" }}>
                  <div className="eyebrow">Case objective</div>
                  <h3 style={{ marginTop: 12 }}>{data.goal}</h3>
                  <p className="help">{data.issue}</p>
                  <div className="divider" />
                  <h3>What happens next</h3>
                  <p className="help">
                    Your answers are preserved as founder-provided evidence. Missing answers become research
                    tasks rather than invented facts.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 2: REVIEW ─── */}
          {step === 2 && (
            <div className="step-page">
              <div className="intro">
                <div>
                  <div className="eyebrow">03 / THE EVIDENCE REVIEW</div>
                  <h1>
                    What we know—
                    <br />
                    <em>and what we don’t.</em>
                  </h1>
                </div>
                <p>
                  Review your founder-provided inputs and evidence completeness before generating the decision
                  brief.
                </p>
              </div>

              <div className="grid">
                <div className="card">
                  <h2>Evidence completeness</h2>
                  <div className="note">
                    <strong>{answeredQuestions}</strong> of <strong>{totalQuestions}</strong> diagnostic
                    questions answered. Missing inputs are treated as deliberate unknowns.
                  </div>

                  <div className="item">
                    <h3>Startup and customer</h3>
                    <p>
                      {data.product}
                      <br />
                      Customer: {data.customer}
                    </p>
                    <h3>Reported issue</h3>
                    <p>{data.issue}</p>
                    <h3>Constraints</h3>
                    <p>{data.constraint || "Not specified"}</p>
                  </div>

                  {selectedFrameworks.map((k) => (
                    <div key={k} className="item">
                      <h3>{FRAMEWORK_DEFS[k]?.name}</h3>
                      {FRAMEWORK_DEFS[k]?.questions.map((q, i) => (
                        <p key={i}>
                          <strong style={{ color: "var(--ink)" }}>{q}</strong>
                          <br />
                          {answers[k + i]?.trim() ? (
                            answers[k + i]
                          ) : (
                            <span className="tag">Unknown · evidence needed</span>
                          )}
                        </p>
                      ))}
                    </div>
                  ))}

                  <div className="actions">
                    <button type="button" className="secondary" onClick={() => setStep(1)}>
                      Edit answers
                    </button>
                    <button type="button" className="primary" onClick={handleInvestigateSubmit}>
                      Generate decision brief <ArrowRight style={{ width: 14, height: 14 }} />
                    </button>
                  </div>
                </div>

                <div className="support card small-card" style={{ alignSelf: "start" }}>
                  <div className="eyebrow">Decision Rule</div>
                  <h3 style={{ marginTop: 12 }}>Strictly MECE</h3>
                  <p className="help">
                    The brief generates mutually exclusive hypotheses and a phased sequence: Baseline → Bounded
                    Pilot → Evaluate.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── STEP 3: DECISION BRIEF ─── */}
          {step === 3 && (
            <div className="step-page">
              <div className="intro">
                <div>
                  <div className="eyebrow">04 / The next move</div>
                  <h1>{data.name}: a path to the next decision.</h1>
                </div>
                <p>{data.goal}</p>
              </div>

              <div className="note warning" style={{ borderColor: "var(--acid)" }}>
                <strong>Structured Decision Brief.</strong> Predefined hypotheses and actions selected by
                FMS consulting frameworks. Founder inputs are maintained without unverified assumptions.
              </div>

              <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {selectedFrameworks.map((k) => (
                  <span key={k} className="tag">
                    {FRAMEWORK_DEFS[k]?.name}
                  </span>
                ))}
                {isAiLoading && (
                  <span className="tag" style={{ background: "rgba(59, 130, 246, 0.15)", color: "var(--blue)" }}>
                    ✨ Synthesizing deep C-suite insights...
                  </span>
                )}
              </div>

              {/* Navigation Tabs */}
              <nav className="tabs" aria-label="Report sections">
                {[
                  ["diagnosis", "Diagnosis"],
                  ["evidence", "Evidence"],
                  ["research", "Research plan"],
                  ["actions", "Action plan"],
                  ["tree", "MECE Decision Tree"],
                ].map(([k, n]) => (
                  <button
                    key={k}
                    className={`tab ${tab === k ? "active" : ""}`}
                    onClick={() => setTab(k as any)}
                  >
                    {n}
                  </button>
                ))}
              </nav>

              <div className="report-grid">
                <div className="card">
                  {/* 1. DIAGNOSIS TAB */}
                  {tab === "diagnosis" && (
                    <section className="panel" data-title="Diagnosis">
                      <h2>Competing explanations to investigate</h2>
                      <p className="muted">
                        Start with {primaryFramework.name.toLowerCase()} to examine the reported issue.
                        Validate these possibilities before choosing an intervention.
                      </p>

                      {primaryFramework.hypotheses.map((x, i) => (
                        <div key={i} className="item">
                          <div className="num">{String(i + 1).padStart(2, "0")}</div>
                          <p style={{ color: "var(--ink)", marginTop: 7, fontWeight: 500 }}>{x}</p>
                        </div>
                      ))}

                      {selectedFrameworks.slice(1).map((k) => (
                        <div key={k} className="item">
                          <span className="tag">Additional lens · {FRAMEWORK_DEFS[k]?.name}</span>
                          <p>{FRAMEWORK_DEFS[k]?.hypotheses[0]}</p>
                        </div>
                      ))}

                      <div className="note" style={{ borderColor: "var(--blue)" }}>
                        <strong>Diagnostic Equation:</strong>
                        <p style={{ margin: "4px 0 0", fontFamily: "var(--mono)", fontSize: 13 }}>
                          {primaryFramework.equation}
                        </p>
                      </div>
                    </section>
                  )}

                  {/* 2. EVIDENCE TAB */}
                  {tab === "evidence" && (
                    <section className="panel" data-title="Evidence">
                      <h2>What we know—and what we don’t</h2>
                      <span className="tag">Founder-provided · unverified</span>

                      <div className="item">
                        <h3>Startup and customer</h3>
                        <p>
                          {data.product}
                          <br />
                          Customer: {data.customer}
                        </p>
                        <h3>Reported issue</h3>
                        <p>{data.issue}</p>
                        <h3>Constraints</h3>
                        <p>{data.constraint || "Not specified"}</p>
                      </div>

                      {selectedFrameworks.map((k) => (
                        <div key={k} className="item">
                          <h3>{FRAMEWORK_DEFS[k]?.name}</h3>
                          {FRAMEWORK_DEFS[k]?.questions.map((q, i) => (
                            <p key={i}>
                              <strong style={{ color: "var(--ink)" }}>{q}</strong>
                              <br />
                              {answers[k + i]?.trim() ? (
                                answers[k + i]
                              ) : (
                                <span className="tag">Unknown · evidence needed</span>
                              )}
                            </p>
                          ))}
                        </div>
                      ))}

                      <div className="note">
                        Answers are displayed as supplied. This analysis preserves knowns and deliberately
                        highlights unknowns to prevent false certainty.
                      </div>
                    </section>
                  )}

                  {/* 3. RESEARCH PLAN TAB */}
                  {tab === "research" && (
                    <section className="panel" data-title="Research plan">
                      <h2>Study required before a firm conclusion</h2>
                      <p className="muted">
                        Suggested work, not completed research. Collect evidence specifically relevant to{" "}
                        {data.customer}.
                      </p>

                      {selectedFrameworks.map((k) => (
                        <div key={k} className="item">
                          <h3>{FRAMEWORK_DEFS[k]?.name}</h3>
                          <ul>
                            {FRAMEWORK_DEFS[k]?.checks.map((x, i) => (
                              <li key={i}>{x}</li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      <div className="item">
                        <h3>External sources to collect</h3>
                        <p>
                          Official competitor product and pricing pages, relevant primary market data, and
                          direct customer interviews. Record URLs, dates, segments and limitations.
                        </p>
                      </div>
                    </section>
                  )}

                  {/* 4. ACTION PLAN TAB WITH DYNAMIC SPRINT SLIDER */}
                  {tab === "actions" && (
                    <section className="panel" data-title="Action plan">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexWrap: "wrap",
                          gap: 12,
                          marginBottom: 16,
                        }}
                      >
                        <div>
                          <h2>A proposed sequence to validate</h2>
                          <p className="muted" style={{ margin: 0 }}>
                            Interactive roadmap tailored to: {data.constraint || "standard runway constraints"}
                            .
                          </p>
                        </div>

                        {/* Interactive Sprint Timeline Slider */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                            background: "var(--bg)",
                            padding: 4,
                            borderRadius: 6,
                            border: "1px solid var(--line)",
                          }}
                        >
                          <span style={{ fontSize: 11, fontFamily: "var(--mono)", color: "var(--muted)", marginRight: 4 }}>
                            Sprint:
                          </span>
                          {([30, 60, 90] as const).map((days) => (
                            <button
                              key={days}
                              type="button"
                              onClick={() => setSimulatedDays(days)}
                              style={{
                                border: 0,
                                background: simulatedDays === days ? "var(--blue)" : "transparent",
                                color: simulatedDays === days ? "#ffffff" : "var(--muted)",
                                padding: "4px 8px",
                                borderRadius: 4,
                                fontSize: 11,
                                fontFamily: "var(--mono)",
                                cursor: "pointer",
                                transition: "all 0.15s ease",
                              }}
                            >
                              {days}D
                            </button>
                          ))}
                        </div>
                      </div>

                      {primaryFramework.actions.map((x, i) => {
                        const isDone = completedMilestones[i] || false;
                        const phaseLabels = [
                          `Phase 1 (Days 1–${Math.round(simulatedDays * 0.3)}) · Establish Baseline`,
                          `Phase 2 (Days ${Math.round(simulatedDays * 0.3) + 1}–${Math.round(
                            simulatedDays * 0.7
                          )}) · Bounded Pilot`,
                          `Phase 3 (Days ${Math.round(simulatedDays * 0.7) + 1}–${simulatedDays}) · Evaluate & Scale`,
                        ];

                        return (
                          <div
                            key={i}
                            className="item"
                            style={{
                              transition: "background 0.2s ease",
                              background: isDone ? "rgba(37, 99, 235, 0.04)" : "transparent",
                              padding: "16px 12px",
                              borderRadius: 6,
                              marginBottom: 8,
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                              <span className="tag">{phaseLabels[i]}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  setCompletedMilestones({
                                    ...completedMilestones,
                                    [i]: !isDone,
                                  })
                                }
                                style={{
                                  background: "none",
                                  border: 0,
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  color: isDone ? "var(--blue)" : "var(--muted)",
                                  fontSize: 12,
                                  fontFamily: "var(--mono)",
                                }}
                              >
                                {isDone ? (
                                  <>
                                    <CheckCircle2 style={{ width: 16, height: 16, color: "var(--blue)" }} />
                                    <span>Milestone Complete</span>
                                  </>
                                ) : (
                                  <>
                                    <Circle style={{ width: 16, height: 16 }} />
                                    <span>Mark Done</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <h3 style={{ textDecoration: isDone ? "line-through" : "none", color: "var(--ink)", marginTop: 6 }}>
                              {x}
                            </h3>
                            <p style={{ margin: "4px 0 0" }}>
                              {
                                [
                                  "Owner: Founder or Lead Analyst. Done when baseline metrics and most consequential unknown are documented.",
                                  "Owner: Functional Lead. Define the target cohort, test boundaries, and stopping rules before rollout.",
                                  "Owner: Executive Team. Measure outcomes against control baselines to determine whether to scale or pivot.",
                                ][i]
                              }
                            </p>
                          </div>
                        );
                      })}

                      <div className="note warning" style={{ borderColor: "var(--acid)" }}>
                        <strong>Watch out:</strong> {primaryFramework.avoid}
                      </div>

                      <h3>Decision Rule</h3>
                      <p className="muted">
                        Agree on a quantified improvement threshold before launching Phase 2. If results are
                        inconclusive at Day {simulatedDays}, collect more structured evidence rather than declaring
                        premature success.
                      </p>
                    </section>
                  )}

                  {/* 5. MECE TREE TAB */}
                  {tab === "tree" && (
                    <section className="panel" data-title="MECE Tree">
                      <h2>Visual MECE Decision Tree</h2>
                      <p className="muted">
                        Interactive breakdown derived from the Consulting Club FMS Delhi basic frameworks.
                        Click any node to inspect its hypotheses and critical diagnostic focus.
                      </p>
                      <div style={{ marginTop: 16 }}>
                        {(() => {
                          const fwIdMap: Record<string, FrameworkId> = {
                            profit: "profitability",
                            growth: "growth_strategy",
                            pricing: "pricing_strategy",
                            market: "market_entry",
                            gtm: "gtm_launch",
                            ma: "mna",
                          };
                          const primaryKey = selectedFrameworks[0] || "growth";
                          const activeTree =
                            solutionReport?.decisionTree ||
                            buildFrameworkTree(fwIdMap[primaryKey] || "growth_strategy", data.name || "Startup");
                          return <FrameworkTree root={activeTree} color="var(--blue)" />;
                        })()}
                      </div>
                    </section>
                  )}
                </div>

                {/* Side Snapshot Card */}
                <div>
                  <div className="card small-card">
                    <div className="eyebrow">Case snapshot</div>
                    <div className="metric">
                      <strong>{data.stage}</strong>
                      <p>{data.customer}</p>
                    </div>
                    <div className="metric">
                      <strong>
                        {answeredQuestions} of {totalQuestions} questions answered
                      </strong>
                      <p>Evidence completeness score</p>
                    </div>
                    <div className="metric">
                      <strong>Provisional recommendation</strong>
                      <p>Framework-governed sequence</p>
                    </div>
                    <div className="metric">
                      <strong>Metrics to consider</strong>
                      {primaryFramework.metrics.map((m, i) => (
                        <p key={i} style={{ color: "var(--ink)", fontWeight: 500 }}>
                          • {m}
                        </p>
                      ))}
                      <p style={{ marginTop: 8, fontSize: 12 }}>
                        Set definitions and baselines before measuring.
                      </p>
                    </div>
                  </div>

                  <div className="actions" style={{ display: "grid", marginTop: 16, gap: 10 }}>
                    <button
                      type="button"
                      className="primary"
                      onClick={handleCopyBrief}
                      style={{ width: "100%" }}
                    >
                      {copied ? (
                        <>
                          <Check style={{ width: 14, height: 14 }} /> Copied Brief
                        </>
                      ) : (
                        <>
                          <Copy style={{ width: 14, height: 14 }} /> Copy Executive Memo
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      className="secondary"
                      onClick={handleDownloadMarkdown}
                      style={{ width: "100%" }}
                    >
                      <Download style={{ width: 14, height: 14 }} /> Download Brief (.md)
                    </button>
                    <button
                      type="button"
                      className="secondary"
                      onClick={() => setStep(1)}
                      style={{ width: "100%" }}
                    >
                      Revise Case Lenses
                    </button>
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => {
                        if (confirm("Start a new case? Your current entries will be cleared.")) {
                          setData({
                            name: "",
                            product: "",
                            customer: "",
                            stage: "Early revenue",
                            issue: "",
                            goal: "",
                            constraint: "",
                          });
                          setAnswers({});
                          setSelectedFrameworks([]);
                          setCompletedMilestones({});
                          setStep(0);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      style={{ textAlign: "center", marginTop: 6 }}
                    >
                      Start a new case
                    </button>
                    {downloadStatus && (
                      <span className="status" role="status" style={{ textAlign: "center", marginTop: 4 }}>
                        {downloadStatus}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="footer">
        <p>
          FOUNDER LAB — A structured framework approach for executive decisions. Entries stay in this page and
          clear on refresh.
          <br />
          Adapted from FMS Consulting Club Basic Frameworks (2025–26). Visual inspiration:{" "}
          <a href="https://usefr.com/" target="_blank" rel="noopener noreferrer">
            Frontrunner
          </a>{" "}
          · YC F26
        </p>
        <div className="footer-wordmark">
          GOOD QUESTIONS.
          <br />
          BETTER DECISIONS.
        </div>
      </footer>

      {/* ─── THEME PICKER MODAL ─── */}
      {showThemeModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(6px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div className="card" style={{ maxWidth: 480, width: "100%", padding: 32 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid var(--line)",
                paddingBottom: 16,
                marginBottom: 20,
              }}
            >
              <h2 style={{ margin: 0, fontSize: 22, display: "flex", alignItems: "center", gap: 8 }}>
                <Palette style={{ width: 18, height: 18, color: "var(--blue)" }} />
                Select Platform Theme
              </h2>
              <button
                onClick={() => setShowThemeModal(false)}
                style={{ background: "none", border: 0, fontSize: 18, color: "var(--muted)", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 18 }}>
              Choose a distinct visual identity tailored to your taste. All palettes feature zero green
              elements.
            </p>

            <div style={{ display: "grid", gap: 12 }}>
              {[
                {
                  id: "sapphire",
                  name: "Midnight Sapphire",
                  desc: "Electric Cobalt & Midnight Obsidian with Warm Amber highlights (Default)",
                  accent: "#2563eb",
                  previewBg: "#f8fafc",
                },
                {
                  id: "dark",
                  name: "Obsidian Stealth",
                  desc: "High-contrast dark mode with ice blue highlights & deep shadow cards",
                  accent: "#38bdf8",
                  previewBg: "#090d16",
                },
                {
                  id: "violet",
                  name: "Electric Violet",
                  desc: "Cyber Indigo & Royal Amethyst with luminous crimson accents",
                  accent: "#7c3aed",
                  previewBg: "#faf7fd",
                },
                {
                  id: "bordeaux",
                  name: "Royal Bordeaux",
                  desc: "Luxury Mahogany Wine & Warm Champagne Gold venture palette",
                  accent: "#9f1239",
                  previewBg: "#faf6f6",
                },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    changeTheme(t.id as ThemeMode);
                    setShowThemeModal(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    border: theme === t.id ? "2px solid var(--blue)" : "1px solid var(--line)",
                    borderRadius: 6,
                    background: "var(--paper)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.18s ease",
                  }}
                >
                  <div>
                    <strong style={{ fontSize: 14, color: "var(--ink)", display: "block" }}>
                      {t.name}
                    </strong>
                    <span style={{ fontSize: 12, color: "var(--muted)" }}>{t.desc}</span>
                  </div>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: t.accent,
                      border: "2px solid #ffffff",
                      boxShadow: "0 0 0 1px #cbd5e1",
                    }}
                  />
                </button>
              ))}
            </div>

            <div className="actions" style={{ marginTop: 24, justifyContent: "flex-end" }}>
              <button type="button" className="secondary" onClick={() => setShowThemeModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── API SETTINGS MODAL ─── */}
      {showApiModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.7)",
            backdropFilter: "blur(6px)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div className="card" style={{ maxWidth: 540, width: "100%", padding: 32 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid var(--line)",
                paddingBottom: 16,
                marginBottom: 20,
              }}
            >
              <h2 style={{ margin: 0, fontSize: 24 }}>AI Reasoning Settings</h2>
              <button
                onClick={() => setShowApiModal(false)}
                style={{ background: "none", border: 0, fontSize: 18, color: "var(--muted)", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
              FOUNDER LAB works completely offline without API keys or costs using built-in FMS decision
              frameworks.
            </p>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
              Optionally, connect your free <strong>Google Gemini Flash API Key</strong> from{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                style={{ color: "var(--blue)", textDecoration: "underline" }}
              >
                Google AI Studio (free, no credit card required)
              </a>{" "}
              for real-time generative analysis.
            </p>

            <div className="field" style={{ marginTop: 18 }}>
              <label htmlFor="apiKey">Google Gemini API Key</label>
              <input
                id="apiKey"
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
              />
            </div>

            <div className="actions" style={{ marginTop: 24, justifyContent: "space-between" }}>
              {apiKey ? (
                <button
                  type="button"
                  className="text-btn"
                  onClick={() => handleApiKeyChange("")}
                  style={{ color: "#e11d48" }}
                >
                  Clear Key
                </button>
              ) : (
                <span className="status">Using local framework engine</span>
              )}

              <button type="button" className="primary" onClick={() => setShowApiModal(false)}>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
