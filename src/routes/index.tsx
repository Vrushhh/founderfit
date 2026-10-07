import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/nextmove/ui";
import { FRAMEWORKS } from "@/lib/consulting/frameworks";
import { SAMPLE_CASES, SampleCase } from "@/lib/consulting/sampleCases";
import { generateConsultingSolution } from "@/lib/consulting/consultingEngine";
import { ConsultingCaseInput, ConsultingSolution, FrameworkId } from "@/lib/consulting/types";
import { SolutionReportView } from "@/components/consulting/SolutionReportView";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FounderFit Strategy AI — Management Consulting Problem Solver" },
      {
        name: "description",
        content:
          "Input any company problem and solve it using elite McKinsey & FMS consulting frameworks: Profitability, Market Entry, Growth Strategy, Pricing, GTM, and M&A.",
      },
      { property: "og:title", content: "FounderFit Strategy AI — Management Consulting Problem Solver" },
      {
        property: "og:description",
        content: "Turn complex business challenges into structured MECE decision trees and actionable executive plans.",
      },
    ],
  }),
  component: StrategyConsultingApp,
});

function StrategyConsultingApp() {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [geography, setGeography] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [selectedFramework, setSelectedFramework] = useState<FrameworkId | "auto">("auto");
  const [apiKey, setApiKey] = useState("");
  const [showApiSettings, setShowApiSettings] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [solution, setSolution] = useState<ConsultingSolution | null>(null);

  // Load saved API key from localStorage if present
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

  const loadSampleCase = (sample: SampleCase, autoRun = false) => {
    setCompanyName(sample.companyName);
    setIndustry(sample.industry || "");
    setGeography(sample.geography || "");
    setProblemStatement(sample.problemStatement);
    setSelectedFramework(sample.frameworkId || "auto");

    if (autoRun) {
      runAnalysis({
        companyName: sample.companyName,
        industry: sample.industry,
        geography: sample.geography,
        problemStatement: sample.problemStatement,
        frameworkId: sample.frameworkId,
        apiKey,
      });
    }
  };

  const runAnalysis = async (customInput?: ConsultingCaseInput) => {
    const input: ConsultingCaseInput = customInput || {
      companyName: companyName.trim(),
      industry: industry.trim(),
      geography: geography.trim(),
      problemStatement: problemStatement.trim(),
      frameworkId: selectedFramework,
      apiKey: apiKey.trim(),
    };

    if (!input.companyName) {
      alert("Please provide a company or business name.");
      return;
    }
    if (!input.problemStatement) {
      alert("Please describe the business problem statement to analyze.");
      return;
    }

    setLoading(true);
    setLoadingStep(1);

    // Simulated progress steps for premium consulting feel
    const t1 = setTimeout(() => setLoadingStep(2), 700);
    const t2 = setTimeout(() => setLoadingStep(3), 1500);

    try {
      const res = await generateConsultingSolution(input);
      setSolution(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Analysis failed";
      alert(`Strategy generation error: ${msg}`);
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setLoading(false);
      setLoadingStep(0);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/80 backdrop-blur-md px-5 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Wordmark />
            <span className="hidden sm:inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-extrabold uppercase tracking-wider text-primary">
              Strategy Consulting AI
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowApiSettings(!showApiSettings)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <span>🔑</span>
              <span>{apiKey ? "API Key Configured" : "Free AI Settings"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* API Key Modal / Drawer if clicked */}
      {showApiSettings && (
        <div className="border-b border-border bg-muted/40 p-5 animate-in slide-in-from-top-2 duration-200">
          <div className="mx-auto max-w-3xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                <span>⚡</span> AI Reasoning Model Configuration
              </h4>
              <button
                onClick={() => setShowApiSettings(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ✕ Close
              </button>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              FounderFit includes a **100% Free Built-in Management Consulting Engine** out of the box. You can optionally connect your free **Google Gemini Flash API Key** from{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-primary underline font-medium"
              >
                Google AI Studio (free, no credit card needed)
              </a>{" "}
              for real-time generative strategic synthesis.
            </p>
            <div className="flex items-center gap-3">
              <input
                type="password"
                placeholder="Paste Google Gemini API Key (e.g. AIzaSy...)"
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                className="flex-1 rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {apiKey && (
                <button
                  onClick={() => handleApiKeyChange("")}
                  className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-medium text-red-500 hover:bg-muted"
                >
                  Clear Key
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* If solution exists, display executive report */}
      {solution ? (
        <div className="mx-auto max-w-6xl px-5 pt-8">
          <SolutionReportView solution={solution} onReset={() => setSolution(null)} />
        </div>
      ) : (
        /* Case Formulation Workspace */
        <div className="mx-auto max-w-5xl px-5 py-10 space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-3.5 py-1 text-xs font-bold text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              6 Core FMS Delhi &amp; McKinsey Frameworks Supported
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground leading-[1.12]">
              The AI Management Consultant For Any Business Problem
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Input any company challenge — from profit declines to market entries and pricing.
              Our agent deconstructs it into a rigorous MECE decision tree and executive action plan.
            </p>

            {/* Framework Badges */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {Object.values(FRAMEWORKS).map((fw) => (
                <button
                  key={fw.id}
                  onClick={() => setSelectedFramework(fw.id)}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                    selectedFramework === fw.id
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card hover:border-primary/50 text-foreground"
                  }`}
                >
                  {fw.title.replace(" Framework", "")}
                </button>
              ))}
            </div>
          </section>

          {/* Problem Input Console */}
          <section className="rounded-3xl border border-border bg-card/80 backdrop-blur-md p-6 md:p-8 shadow-lg space-y-6">
            <div className="border-b border-border/70 pb-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span>💼</span> Case Formulation &amp; Problem Intake
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Define the enterprise context or pick one of the pre-loaded benchmark cases below.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Company / Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Zepto, Starbucks, Nike, D2C Apparel"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Industry / Sector
                </label>
                <input
                  type="text"
                  placeholder="e.g. Quick Commerce, Fintech, B2B SaaS"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Geography / Market
                </label>
                <input
                  type="text"
                  placeholder="e.g. India (Tier 1), US, UAE & GCC"
                  value={geography}
                  onChange={(e) => setGeography(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>
            </div>

            {/* Problem Statement Area */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Business Problem Statement / Challenge <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="Describe the exact challenge (e.g. EBITDA dropped from -8% to -24% over 6 months despite 40% order growth, or evaluating whether to expand our D2C skincare product line into the UAE market...)"
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                className="w-full rounded-2xl border border-border bg-background p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            {/* Framework Option & Action CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Target Framework:
                </label>
                <select
                  value={selectedFramework}
                  onChange={(e) => setSelectedFramework(e.target.value as FrameworkId | "auto")}
                  className="rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-bold text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="auto">🤖 Auto-Diagnose Framework</option>
                  <option value="profitability">📊 Profitability Framework (Profits = Rev - Cost)</option>
                  <option value="market_entry">🌍 Market Entry Framework (Should Enter? + How?)</option>
                  <option value="growth_strategy">📈 Growth Strategy (Organic vs Inorganic)</option>
                  <option value="pricing_strategy">🏷️ Pricing Strategy (Value, Cost, Competitor)</option>
                  <option value="gtm_launch">🚀 GTM / Launch (Segmentation, 4Ps, Be Selective)</option>
                  <option value="mna">🤝 Mergers &amp; Acquisitions (Hard &amp; Soft Fit, Synergies)</option>
                </select>
              </div>

              <button
                onClick={() => runAnalysis()}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary px-8 py-3.5 text-sm font-extrabold text-primary-foreground shadow-md hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    <span>
                      {loadingStep === 1
                        ? "Diagnosing Case Context…"
                        : loadingStep === 2
                        ? "Constructing MECE Tree…"
                        : "Synthesizing Strategy…"}
                    </span>
                  </>
                ) : (
                  <>
                    <span>⚡ Run Strategic Breakdown</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* 1-Click Benchmark Test Cases */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-foreground flex items-center gap-2">
                  <span>🎯</span> Pre-Loaded Case Studies (1-Click Test)
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Click any benchmark case to test the framework engine immediately.
                </p>
              </div>
            </div>

            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {SAMPLE_CASES.map((sample, idx) => (
                <div
                  key={idx}
                  onClick={() => loadSampleCase(sample, true)}
                  className="group cursor-pointer rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:border-primary/60 hover:shadow-md hover:bg-muted/30 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {sample.badge}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">Click to Run ➜</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {sample.companyName}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {sample.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/50 text-[11px] text-muted-foreground/80 flex items-center justify-between">
                    <span>{sample.industry}</span>
                    <span className="font-semibold text-foreground">{sample.geography}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Framework Methodology Reference from FMS Delhi */}
          <section className="rounded-3xl border border-border/70 bg-muted/20 p-6 md:p-8 space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-1.5">
              <h3 className="text-base font-extrabold uppercase tracking-wider text-foreground">
                Built On Global Top-Tier Consulting Methodologies
              </h3>
              <p className="text-xs text-muted-foreground">
                Directly structured on Part D Consulting Frameworks from FMS Delhi (The Consulting Club).
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3 text-xs">
              <div className="rounded-2xl border border-border bg-background/80 p-4 space-y-1.5">
                <span className="font-extrabold text-amber-500">1. Profitability &amp; Value Chain</span>
                <p className="text-muted-foreground leading-relaxed">
                  Isolate volume vs price elasticity on the revenue side, and fixed vs variable costs across the full R&amp;D $\rightarrow$ Procurement $\rightarrow$ Logistics value chain.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/80 p-4 space-y-1.5">
                <span className="font-extrabold text-blue-500">2. Market Entry &amp; Mode</span>
                <p className="text-muted-foreground leading-relaxed">
                  2-Phase evaluation: "Should They Enter?" (Product, STP TAM, Feasibility, Risks) followed by "If Yes, How?" (Greenfield, M&amp;A, Joint Venture).
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-background/80 p-4 space-y-1.5">
                <span className="font-extrabold text-emerald-500">3. Growth Strategy &amp; GTM</span>
                <p className="text-muted-foreground leading-relaxed">
                  Ansoff matrix optimization for organic scale, M&amp;A integration for inorganic reach, and selective 4P execution for new product launches.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        <p>FounderFit Strategy AI — Management Consulting Problem Solver</p>
        <p className="mt-1 text-[11px] text-muted-foreground/60">
          Powered by elite consulting frameworks (Profitability, Market Entry, Growth, Pricing, GTM, M&amp;A).
        </p>
      </footer>
    </main>
  );
}
