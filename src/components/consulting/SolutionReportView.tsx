import React, { useState } from "react";
import { ConsultingSolution } from "@/lib/consulting/types";
import { FrameworkTree } from "./FrameworkTree";

interface SolutionReportViewProps {
  solution: ConsultingSolution;
  onReset: () => void;
}

export function SolutionReportView({ solution, onReset }: SolutionReportViewProps) {
  const [activeTab, setActiveTab] = useState<"tree" | "context" | "findings" | "recommendations" | "roadmap" | "risks">(
    "tree"
  );
  const [copied, setCopied] = useState(false);

  const copySummary = () => {
    const text = `Strategy Diagnostic: ${solution.companyName} (${solution.framework.title})\n\n${solution.executiveSummary}\n\nTop Recommendation:\n${solution.recommendations[0]?.title} — ${solution.recommendations[0]?.description}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-16">
      {/* Executive Header Banner */}
      <div className="rounded-3xl border border-border bg-gradient-to-br from-card via-card/90 to-muted/40 p-6 md:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: solution.framework.color }}
              >
                {solution.framework.title}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                {solution.industry} • {solution.geography}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              {solution.companyName}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copySummary}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-border bg-background hover:bg-muted text-foreground transition-colors"
            >
              {copied ? "✓ Copied" : "📋 Copy Executive Summary"}
            </button>
            <button
              onClick={printReport}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-border bg-background hover:bg-muted text-foreground transition-colors"
            >
              🖨️ Export / Print
            </button>
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-sm"
            >
              + New Case Analysis
            </button>
          </div>
        </div>

        {/* Case Challenge Statement */}
        <div className="mt-5 rounded-2xl bg-muted/50 p-4 border border-border/50">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            Case Problem Statement
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed font-medium">
            "{solution.problemStatement}"
          </p>
        </div>

        {/* Executive Verdict Callout */}
        <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-primary">
              Executive Synthesis &amp; Strategic Hypothesis
            </h3>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-foreground font-semibold">
            {solution.executiveSummary}
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-border pb-2">
        <TabButton
          active={activeTab === "tree"}
          onClick={() => setActiveTab("tree")}
          label="🌳 MECE Decision Tree"
          count="Visual"
        />
        <TabButton
          active={activeTab === "context"}
          onClick={() => setActiveTab("context")}
          label="🔍 Context & Objectives"
          count={solution.contextAnalysis.length}
        />
        <TabButton
          active={activeTab === "findings"}
          onClick={() => setActiveTab("findings")}
          label="📊 Framework Deep-Dive"
          count={solution.bucketFindings.length}
        />
        <TabButton
          active={activeTab === "recommendations"}
          onClick={() => setActiveTab("recommendations")}
          label="💡 Prioritized Initiatives"
          count={solution.recommendations.length}
        />
        <TabButton
          active={activeTab === "roadmap"}
          onClick={() => setActiveTab("roadmap")}
          label="🗓️ 0-30-90 Day Roadmap"
          count={solution.roadmap.length}
        />
        <TabButton
          active={activeTab === "risks"}
          onClick={() => setActiveTab("risks")}
          label="⚠️ Risks & Mitigation"
          count={solution.risksAndMitigations.length}
        />
      </div>

      {/* Tab Panels */}
      {activeTab === "tree" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                MECE Decision Tree — {solution.framework.title}
              </h2>
              <p className="text-xs text-muted-foreground">
                Structured root-cause logic deconstruction derived from FMS Delhi / top-tier consulting methodologies.
              </p>
            </div>
          </div>
          <FrameworkTree root={solution.tree} color={solution.framework.color} />
        </div>
      )}

      {activeTab === "context" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Context Setting &amp; Objective Clarification
            </h2>
            <p className="text-xs text-muted-foreground">
              Essential framing questions addressed before deep-dive problem formulation.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {solution.contextAnalysis.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-2">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                  Question {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-foreground">{item.question}</h4>
                <p className="text-xs leading-relaxed text-muted-foreground">{item.assessment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "findings" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Framework Bucket Diagnostics
            </h2>
            <p className="text-xs text-muted-foreground">
              Exhaustive findings mapped across each component branch of the {solution.framework.title}.
            </p>
          </div>

          <div className="space-y-4">
            {solution.bucketFindings.map((b, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-xs font-extrabold">
                    {idx + 1}
                  </span>
                  <h3 className="text-base font-bold text-foreground">{b.bucketName}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-muted/40 p-4 border border-border/40">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                      <span>🔍</span> Key Diagnostic Insights
                    </h5>
                    <ul className="space-y-2 text-xs leading-relaxed text-foreground/90 list-disc list-inside">
                      {b.keyInsights.map((insight, i) => (
                        <li key={i}>{insight}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/20">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                      <span>⚡</span> Tactical Levers &amp; Action Items
                    </h5>
                    <ul className="space-y-2 text-xs leading-relaxed text-foreground/90 list-disc list-inside">
                      {b.actionItems.map((act, i) => (
                        <li key={i}>{act}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "recommendations" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Prioritized Strategic Recommendations
            </h2>
            <p className="text-xs text-muted-foreground">
              Ranked by impact, execution velocity, and target business KPIs.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {solution.recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-extrabold text-primary">{rec.priority}</span>
                    <span className="px-2 py-0.5 rounded-full bg-muted font-medium text-muted-foreground">
                      Impact: {rec.impact} • Effort: {rec.effort}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground leading-snug">{rec.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{rec.description}</p>
                </div>

                <div className="pt-3 border-t border-border/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                    Target Metric:
                  </span>
                  <p className="text-xs font-bold text-emerald-500 mt-0.5">{rec.metricTarget}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "roadmap" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              0–30–90 Day Execution Roadmap
            </h2>
            <p className="text-xs text-muted-foreground">
              Phased transformation milestones designed for rapid time-to-value.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {solution.roadmap.map((phase, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono">
                    {phase.timeframe}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold">Phase {idx + 1}</span>
                </div>
                <h3 className="text-sm font-bold text-foreground">{phase.phase}</h3>
                <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground list-disc list-inside pt-2 border-t border-border/50">
                  {phase.deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "risks" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Risks &amp; Strategic Mitigation Matrix
            </h2>
            <p className="text-xs text-muted-foreground">
              PESTEL, Porter's 5 Forces, and operational risk assessment with proactive hedges.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-muted/70 text-muted-foreground uppercase text-[10px] font-bold border-b border-border">
                  <tr>
                    <th className="p-4">Identified Risk Factor</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Severity</th>
                    <th className="p-4">Strategic Mitigation Hedge</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {solution.risksAndMitigations.map((item, idx) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-semibold text-foreground">{item.risk}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded font-bold ${
                            item.severity === "High"
                              ? "bg-red-500/10 text-red-500"
                              : "bg-amber-500/10 text-amber-500"
                          }`}
                        >
                          {item.severity}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground leading-relaxed">{item.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: string | number;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 text-xs font-bold rounded-xl transition-all ${
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      <span>{label}</span>
      <span
        className={`px-1.5 py-0.5 rounded text-[10px] ${
          active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
