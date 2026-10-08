import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { FrameworkTree } from "@/components/consulting/FrameworkTree";
import { generateConsultingSolution, buildFrameworkTree } from "@/lib/consulting/consultingEngine";
import { ConsultingSolution, FrameworkId } from "@/lib/consulting/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FOUNDER LAB — A Structured Approach to Your Next Big Decision" },
      {
        name: "description",
        content:
          "A structured investigation for the decisions that keep founders up at night. Deconstruct startup problems into rigorous MECE frameworks and action plans.",
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
    questions: [
      "What changed in revenue and costs, and over which comparable periods?",
      "Which products, channels or customer segments changed most?",
      "Which costs are included in your profit calculation?",
    ],
    hypotheses: [
      "A change in product or customer mix is reducing margin.",
      "Discounts, returns or fulfillment costs are growing faster than revenue.",
      "Operating costs have increased before the expected revenue benefit.",
    ],
    checks: [
      "Build a comparable-period revenue and cost bridge.",
      "Break contribution profit down by product, customer segment and channel.",
      "Separate fixed costs, variable costs and one-time changes.",
    ],
    actions: [
      "Reconcile the margin decline before changing spending.",
      "Pilot one change against the largest verified source of margin loss.",
      "Track contribution profit and customer retention together.",
    ],
    metrics: ["Contribution profit", "Return or refund rate", "Repeat purchase rate"],
    avoid: "Cutting costs broadly before locating the source of the decline.",
  },
  growth: {
    key: "growth",
    name: "Growth strategy",
    why: "Compare growth from existing customers and products with new products or markets, accounting for bottlenecks and feasibility.",
    questions: [
      "Where does your funnel lose the most customers: acquisition, activation, payment or retention?",
      "Which customer segment currently gets the most value?",
      "What growth experiments have you tried, and what happened?",
    ],
    hypotheses: [
      "The largest constraint is activation or retention rather than acquisition.",
      "The current acquisition mix includes customers with low intent.",
      "One customer segment has better repeat usage and conversion than the average.",
    ],
    checks: [
      "Compare the funnel by cohort and segment using consistent time windows.",
      "Identify the first valuable outcome and how many users reach it.",
      "Review prior experiments and interview both retained and lost customers.",
    ],
    actions: [
      "Locate the largest measurable bottleneck in the existing customer journey.",
      "Test one intervention for the best-supported customer segment.",
      "Expand acquisition only after checking downstream conversion and retention.",
    ],
    metrics: ["Activation rate", "Paid conversion by cohort", "Retention by cohort"],
    avoid: "Adding acquisition spend before understanding downstream conversion.",
  },
  pricing: {
    key: "pricing",
    name: "Pricing strategy",
    why: "Compare serving costs, competing offers, substitutes, and perceived value before testing price or packaging.",
    questions: [
      "What are your current prices, packages, discounts and serving costs?",
      "What evidence do you have about willingness to pay or pricing objections?",
      "Which alternatives do customers compare you with?",
    ],
    hypotheses: [
      "The package or billing structure does not match how customers receive value.",
      "Heavy users have materially different costs or needs.",
      "Payment friction may be confused with insufficient product value.",
    ],
    checks: [
      "Calculate serving costs and margins for different usage levels.",
      "Review pricing objections from actual lost and won customers.",
      "Compare verified competing packages and substitutes on equivalent terms.",
    ],
    actions: [
      "Separate product-value issues from price objections.",
      "Draft two packaging options with explicit cost and retention assumptions.",
      "Run a limited pricing test with conversion and margin guardrails.",
    ],
    metrics: ["Paid conversion", "Contribution margin per customer", "Churn or renewal rate"],
    avoid: "Assuming historical purchases reveal price elasticity or willingness to pay.",
  },
  market: {
    key: "market",
    name: "Market entry",
    why: "Assess the target segment’s attractiveness, product fit, economics, operating capability and risks before committing.",
    questions: [
      "Which market or segment are you considering, and why now?",
      "What evidence of demand exists in that market?",
      "What investment, capability changes and break-even assumptions would entry require?",
    ],
    hypotheses: [
      "The new market has different buying requirements from the current market.",
      "Existing capabilities may not support the proposed entry economically.",
      "A smaller pilot may resolve the largest uncertainty before a full commitment.",
    ],
    checks: [
      "Compare demand evidence, alternatives and buying processes across markets.",
      "Model entry costs, revenue assumptions and break-even scenarios.",
      "Map operational gaps, dependencies and jurisdiction-specific questions.",
    ],
    actions: [
      "Compare the new opportunity against improving the existing business.",
      "Validate the largest demand or capability uncertainty with a small pilot.",
      "Set explicit entry, pause and exit criteria before committing resources.",
    ],
    metrics: ["Qualified demand", "Pilot contribution economics", "Sales cycle length"],
    avoid: "Treating a large market estimate as proof of attainable demand.",
  },
  gtm: {
    key: "gtm",
    name: "Go-to-market",
    why: "Connect whom to sell to, what to sell, where to sell, and what to communicate in one coherent offer.",
    questions: [
      "Who has the most urgent need, and what event triggers it?",
      "What outcome does your product deliver, and how quickly does a customer experience it?",
      "Which channels and messages have produced qualified demand?",
    ],
    hypotheses: [
      "The audience is broader than the group with an urgent buying need.",
      "The first useful outcome is unclear or too difficult to reach.",
      "The offer, channel and message are not aligned with the buyer.",
    ],
    checks: [
      "Interview recent buyers, active non-buyers and lost prospects.",
      "Map the path from first contact to the first useful outcome and payment.",
      "Compare channel quality using downstream outcomes, not signups alone.",
    ],
    actions: [
      "Choose one segment with a specific buying trigger.",
      "Align the offer, first-use experience and message around its desired outcome.",
      "Test one channel and message with a measurable conversion path.",
    ],
    metrics: ["Qualified lead rate", "Time to first value", "Segment conversion"],
    avoid: "Launching many channels before validating the segment and offer.",
  },
  ma: {
    key: "ma",
    name: "Mergers & acquisitions",
    why: "Examine financial fit, non-financial fit, due diligence, implementation and exit assumptions.",
    questions: [
      "What strategic outcome would the acquisition achieve?",
      "What financial and commercial evidence has the target provided?",
      "What integration costs, dependencies and risks are known?",
    ],
    hypotheses: [
      "Proposed synergies depend on unverified revenue or cost assumptions.",
      "Integration effort may offset the expected benefits.",
      "Customer concentration or operating dependencies may alter the deal economics.",
    ],
    checks: [
      "Reconcile target financial information and document missing evidence.",
      "Separate standalone economics from incremental synergy assumptions.",
      "Review commercial, operational, cultural and professional diligence requirements.",
    ],
    actions: [
      "Prepare an evidence-linked diligence request list.",
      "Compare acquisition against partnership or organic growth.",
      "Model downside and integration scenarios before a deal decision.",
    ],
    metrics: ["Verified cash generation", "Customer concentration", "Integration cost and milestones"],
    avoid: "Counting unverified synergies as guaranteed value.",
  },
};

const SAMPLE_CASES: (CaseData & { highlight: string; category: string })[] = [
  {
    name: "Mockmate",
    stage: "Early revenue",
    product: "An AI interview-preparation app offering personalized mock interviews and feedback.",
    customer: "College students preparing for their first job",
    issue: "8,000 people registered, but only 70 have paid. We tried Instagram ads. How do we improve conversion?",
    goal: "Increase paid conversion over the next 60 days",
    constraint: "Small team and limited marketing budget",
    highlight: "8,000 signups. Just 70 paid users.",
    category: "Growth / Go-to-market",
  },
  {
    name: "Daily Ritual",
    stage: "Scaling",
    product: "A direct-to-consumer skincare brand selling online.",
    customer: "Customers buying everyday skincare",
    issue: "Revenue grew this quarter, but profit fell. Discounts, returns and shipping expenses have increased.",
    goal: "Improve contribution profit without sacrificing retention",
    constraint: "Cannot substantially increase advertising spend",
    highlight: "Sales are growing. Profits aren’t.",
    category: "Profitability / Pricing",
  },
  {
    name: "Teamflow",
    stage: "Early revenue",
    product: "Project management software for creative agencies.",
    customer: "Small creative agencies",
    issue: "Should we enter the enterprise market or focus on growing with small agencies?",
    goal: "Choose the next customer segment to prioritize",
    constraint: "Four-person team and a six-month runway",
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

function FounderLabApp() {
  const [step, setStep] = useState(0); // 0: Context, 1: Investigate, 2: Review, 3: Decision Brief
  const [tab, setTab] = useState<"diagnosis" | "evidence" | "research" | "actions" | "tree">("diagnosis");

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
  const [apiKey, setApiKey] = useState("");
  const [showApiModal, setShowApiModal] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [solutionReport, setSolutionReport] = useState<ConsultingSolution | null>(null);

  // Load API key from localStorage if present
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedKey = localStorage.getItem("founderfit_gemini_key");
      if (savedKey) setApiKey(savedKey);
    }
  }, []);

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
    if (typeof window !== "undefined") {
      if (key) localStorage.setItem("founderfit_gemini_key", key);
      else localStorage.removeItem("founderfit_gemini_key");
    }
  };

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
      gtm: "gtm_strategy",
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

  const handleDownloadMarkdown = () => {
    const primaryFw = FRAMEWORK_DEFS[selectedFrameworks[0]] || FRAMEWORK_DEFS.growth;
    let out = `# ${data.name} — Decision Brief\n\n`;
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

    out += `\n## Competing Explanations to Investigate\n`;
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

    out += `\n## Proposed Action Sequence\n`;
    primaryFw.actions.forEach((a, i) => {
      out += `${i + 1}. ${a}\n`;
    });

    out += `\n## Watch Out\n${primaryFw.avoid}\n`;

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
    <div className="shell">
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

        <button
          onClick={() => setShowApiModal(true)}
          className="badge"
          style={{ cursor: "pointer", background: "none", font: "inherit" }}
        >
          {apiKey ? "API KEY CONFIGURED" : "DEMO / NO API COSTS"}
        </button>
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

      {/* ─── MAIN CASEBAR & CONTENT ─── */}
      <main>
        <div className="casebar">
          WORKSPACE <span className="slash">/</span> <strong>{data.name || "New case"}</strong>
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
                    Build investigation
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

                <div className="framework-map">
                  <div className="eyebrow">Six lenses. The right questions.</div>
                  <div className="lens-grid">
                    {Object.values(FRAMEWORK_DEFS).map((f, i) => (
                      <div key={f.key}>
                        <span>0{i + 1}</span>
                        {f.name}
                      </div>
                    ))}
                  </div>
                  <p className="framework-source">
                    Adapted from the FMS Consulting Club’s basic frameworks, 2025–26.
                  </p>
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
                      Review investigation
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
                    Generate decision brief
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

            <div className="note warning">
              <strong>Structured Decision Brief.</strong> Predefined hypotheses and actions selected by
              FMS consulting frameworks. Founder inputs are maintained without unverified assumptions.
            </div>

            <div style={{ marginBottom: 12 }}>
              {selectedFrameworks.map((k) => (
                <span key={k} className="tag">
                  {FRAMEWORK_DEFS[k]?.name}
                </span>
              ))}
            </div>

            {/* Navigation Tabs */}
            <nav className="tabs" aria-label="Report sections">
              {[
                ["diagnosis", "Diagnosis"],
                ["evidence", "Evidence"],
                ["research", "Research plan"],
                ["actions", "Action plan"],
                ["tree", "MECE Tree"],
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
                        <p style={{ color: "var(--ink)", marginTop: 7 }}>{x}</p>
                      </div>
                    ))}

                    {selectedFrameworks.slice(1).map((k) => (
                      <div key={k} className="item">
                        <span className="tag">Additional lens · {FRAMEWORK_DEFS[k]?.name}</span>
                        <p>{FRAMEWORK_DEFS[k]?.hypotheses[0]}</p>
                      </div>
                    ))}

                    <div className="note">
                      What could change the recommendation? Evidence that a different segment, funnel stage,
                      cost driver or external condition explains the problem better.
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
                      Answers are displayed as supplied. This demo does not assess their accuracy, infer
                      conclusions from them, or verify uploaded data.
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

                    <div className="note">
                      No sources are cited as findings because this demo has not searched or read them.
                    </div>
                  </section>
                )}

                {/* 4. ACTION PLAN TAB */}
                {tab === "actions" && (
                  <section className="panel" data-title="Action plan">
                    <h2>A proposed sequence to validate</h2>
                    <p className="muted">
                      Adapt effort and timing to your constraint:{" "}
                      {data.constraint || "confirm the available team, budget and time"}.
                    </p>

                    {primaryFramework.actions.map((x, i) => (
                      <div key={i} className="item">
                        <span className="tag">
                          {["First · establish baseline", "Next · bounded pilot", "Then · evaluate"][i]}
                        </span>
                        <h3>{x}</h3>
                        <p>
                          {
                            [
                              "Owner: founder or analyst. Done when the baseline and most consequential unknown are documented.",
                              "Owner: founder and relevant functional lead. Define the audience, intervention, metric and stopping rule before starting.",
                              "Owner: founder. Compare outcomes with the baseline or an appropriate control. Scale, revise or stop based on evidence.",
                            ][i]
                          }
                        </p>
                      </div>
                    ))}

                    <div className="note warning">
                      <strong>Watch out:</strong> {primaryFramework.avoid}
                    </div>

                    <h3>Decision rule</h3>
                    <p className="muted">
                      Agree on a meaningful improvement threshold and acceptable downside before the pilot.
                      If results are inconclusive, gather more evidence rather than declare success.
                    </p>
                  </section>
                )}

                {/* 5. MECE TREE TAB */}
                {tab === "tree" && (
                  <section className="panel" data-title="MECE Tree">
                    <h2>Visual MECE Decision Tree</h2>
                    <p className="muted">
                      Interactive breakdown derived from the Consulting Club FMS Delhi basic frameworks.
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
                        return <FrameworkTree root={activeTree} color="#153c2e" />;
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
                    <p>Evidence completeness only</p>
                  </div>
                  <div className="metric">
                    <strong>Provisional recommendation</strong>
                    <p>No independently verified diagnosis</p>
                  </div>
                  <div className="metric">
                    <strong>Metrics to consider</strong>
                    {primaryFramework.metrics.map((m, i) => (
                      <p key={i}>{m}</p>
                    ))}
                    <p style={{ marginTop: 8 }}>Set definitions and baselines before measuring.</p>
                  </div>
                </div>

                <div className="actions" style={{ display: "grid", marginTop: 16, gap: 10 }}>
                  <button type="button" className="secondary" onClick={() => setStep(1)}>
                    Revise case
                  </button>
                  <button type="button" className="secondary" onClick={handleDownloadMarkdown}>
                    Download brief
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
                        setStep(0);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                    }}
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

        {/* ─── FOOTER ─── */}
        <footer className="footer">
          <p>
            DEMO MODE — Predefined framework logic, not AI or live research. Entries stay in this page and
            clear on refresh.
            <br />
            Visual reference:{" "}
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
      </main>

      {/* ─── API SETTINGS MODAL ─── */}
      {showApiModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(12, 56, 39, 0.6)",
            backdropFilter: "blur(4px)",
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
                  style={{ color: "#a63b31" }}
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
