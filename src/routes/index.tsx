import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef, useCallback } from "react";
import { Wordmark } from "@/components/nextmove/ui";
import { FRAMEWORKS } from "@/lib/consulting/frameworks";
import { SAMPLE_CASES, SampleCase } from "@/lib/consulting/sampleCases";
import { generateConsultingSolution } from "@/lib/consulting/consultingEngine";
import { ConsultingCaseInput, ConsultingSolution, FrameworkId } from "@/lib/consulting/types";
import { SolutionReportView } from "@/components/consulting/SolutionReportView";

// Paperclip OS Imports
import { Company, Agent, CompanyGoal, Ticket, TicketLogEntry } from "@/lib/paperclip/types";
import {
  DEFAULT_COMPANIES,
  DEFAULT_AGENTS,
  DEFAULT_GOALS,
  DEFAULT_TICKETS,
} from "@/lib/paperclip/defaultCompanies";
import { runHeartbeatCycle } from "@/lib/paperclip/heartbeatEngine";
import { PaperclipHeader } from "@/components/paperclip/PaperclipHeader";
import { OrgChartTree } from "@/components/paperclip/OrgChartTree";
import { KanbanBoard } from "@/components/paperclip/KanbanBoard";
import { LiveHeartbeatConsole } from "@/components/paperclip/LiveHeartbeatConsole";
import { CompanyGoalsView } from "@/components/paperclip/CompanyGoalsView";
import { TicketDetailModal } from "@/components/paperclip/TicketDetailModal";
import { NewTicketModal } from "@/components/paperclip/NewTicketModal";
import { Zap, Send, Sparkles, Key, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paperclip OS — Autonomous AI Agent Operating System" },
      {
        name: "description",
        content:
          "Manage and run autonomous teams of AI agents with heartbeat scheduling, org charts, budgets, and governance for any company problem.",
      },
      { property: "og:title", content: "Paperclip OS — Autonomous AI Agent Operating System" },
      {
        property: "og:description",
        content:
          "Turn business problems into autonomous agent workflows with heartbeat execution, atomic ticket checkout, and C-suite deliverables.",
      },
    ],
  }),
  component: PaperclipApp,
});

function PaperclipApp() {
  // Paperclip State
  const [companies, setCompanies] = useState<Company[]>(DEFAULT_COMPANIES);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("comp-founderfit");
  const [companyAgents, setCompanyAgents] = useState<Record<string, Agent[]>>(DEFAULT_AGENTS);
  const [companyGoals, setCompanyGoals] = useState<Record<string, CompanyGoal[]>>(DEFAULT_GOALS);
  const [companyTickets, setCompanyTickets] = useState<Record<string, Ticket[]>>(DEFAULT_TICKETS);

  const [activeTab, setActiveTab] = useState<"org" | "board" | "heartbeat" | "goals" | "consulting">(
    "board"
  );
  const [isAutoHeartbeat, setIsAutoHeartbeat] = useState(false);
  const [totalPulses, setTotalPulses] = useState(16);
  const [globalLogs, setGlobalLogs] = useState<TicketLogEntry[]>([]);
  const [inspectingTicket, setInspectingTicket] = useState<Ticket | null>(null);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");

  // Strategy Consulting Solver State
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [geography, setGeography] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [selectedFramework, setSelectedFramework] = useState<FrameworkId | "auto">("auto");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [solution, setSolution] = useState<ConsultingSolution | null>(null);

  // Active Company Context
  const activeCompany =
    companies.find((c) => c.id === selectedCompanyId) || companies[0];
  const activeAgents = companyAgents[selectedCompanyId] || [];
  const activeGoals = companyGoals[selectedCompanyId] || [];
  const activeTickets = companyTickets[selectedCompanyId] || [];

  // Load API key from localStorage
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

  // Trigger Heartbeat Cycle
  const triggerHeartbeat = useCallback(
    async (targetTicketId?: string) => {
      setTotalPulses((p) => p + 1);

      try {
        const result = await runHeartbeatCycle({
          company: activeCompany,
          agents: activeAgents,
          tickets: activeTickets,
          goals: activeGoals,
          apiKey,
          targetTicketId,
        });

        // Update company
        setCompanies((prev) =>
          prev.map((c) => (c.id === activeCompany.id ? result.updatedCompany : c))
        );

        // Update agents
        setCompanyAgents((prev) => ({
          ...prev,
          [selectedCompanyId]: result.updatedAgents,
        }));

        // Update tickets
        setCompanyTickets((prev) => ({
          ...prev,
          [selectedCompanyId]: result.updatedTickets,
        }));

        // Append logs
        if (result.newLogs.length > 0) {
          setGlobalLogs((prev) => [...result.newLogs, ...prev]);
        }

        // If currently inspecting affected ticket, refresh it
        if (result.affectedTicket && inspectingTicket?.id === result.affectedTicket.id) {
          setInspectingTicket(result.affectedTicket);
        }
      } catch (err) {
        console.error("Heartbeat execution error:", err);
      }
    },
    [activeCompany, activeAgents, activeTickets, activeGoals, apiKey, selectedCompanyId, inspectingTicket]
  );

  // Auto-Heartbeat Timer
  useEffect(() => {
    if (!isAutoHeartbeat) return;
    const interval = setInterval(() => {
      triggerHeartbeat();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoHeartbeat, triggerHeartbeat]);

  // Handle New Ticket Creation
  const handleCreateTicket = (ticket: Ticket) => {
    setCompanyTickets((prev) => ({
      ...prev,
      [selectedCompanyId]: [ticket, ...(prev[selectedCompanyId] || [])],
    }));

    const creationLog: TicketLogEntry = {
      id: "log-" + Math.random().toString(36).slice(2, 8),
      timestamp: new Date().toISOString(),
      ticketId: ticket.id,
      phase: "heartbeat",
      message: `New ticket ${ticket.id} "${ticket.title}" created & queued.`,
    };
    setGlobalLogs((prev) => [creationLog, ...prev]);
  };

  // Handle Approving Review Gate
  const handleApproveTicket = (ticketId: string) => {
    setCompanyTickets((prev) => {
      const list = prev[selectedCompanyId] || [];
      return {
        ...prev,
        [selectedCompanyId]: list.map((t) => {
          if (t.id === ticketId) {
            return {
              ...t,
              status: "done",
              reviewedByHuman: true,
              completedAt: new Date().toISOString(),
            };
          }
          return t;
        }),
      };
    });

    // Return assignee to sleeping
    const targetTicket = activeTickets.find((t) => t.id === ticketId);
    if (targetTicket && targetTicket.assigneeId) {
      setCompanyAgents((prev) => {
        const ags = prev[selectedCompanyId] || [];
        return {
          ...prev,
          [selectedCompanyId]: ags.map((a) =>
            a.id === targetTicket.assigneeId ? { ...a, status: "sleeping", currentTicketId: null } : a
          ),
        };
      });
    }

    const approveLog: TicketLogEntry = {
      id: "log-" + Math.random().toString(36).slice(2, 8),
      timestamp: new Date().toISOString(),
      ticketId,
      phase: "human_gate",
      message: `[Human Gate 🛡️] Founder / C-suite signed off on ticket ${ticketId}. Marked COMPLETED.`,
    };
    setGlobalLogs((prev) => [approveLog, ...prev]);

    if (inspectingTicket?.id === ticketId) {
      setInspectingTicket((prev) => (prev ? { ...prev, status: "done", reviewedByHuman: true } : null));
    }
  };

  // Dispatch Consulting Case as a Ticket to Paperclip Agents
  const dispatchConsultingCaseToAgent = (sampleCase?: SampleCase) => {
    const cName = sampleCase ? sampleCase.companyName : companyName || "Enterprise Client";
    const pStmt = sampleCase ? sampleCase.problemStatement : problemStatement || "Strategic consulting diagnosis";
    const fw = sampleCase ? sampleCase.frameworkId : selectedFramework;

    // Pick best suited agent
    let targetAgent = activeAgents.find((a) => a.role === "strategy_consultant");
    if (fw === "profitability" || fw === "pricing_strategy") {
      targetAgent = activeAgents.find((a) => a.role === "cfo_analyst") || targetAgent;
    } else if (fw === "gtm_strategy") {
      targetAgent = activeAgents.find((a) => a.role === "cmo_growth") || targetAgent;
    }
    const assigneeId = targetAgent?.id || activeAgents[0]?.id;

    const newTicket: Ticket = {
      id: "TICK-" + Math.floor(200 + Math.random() * 800),
      companyId: selectedCompanyId,
      title: `${cName}: ${pStmt.slice(0, 70)}...`,
      description: `Client Problem: ${pStmt}\nFramework: ${fw}\nIndustry: ${industry || "General Business"}\nGeography: ${geography || "Global"}`,
      goalId: activeGoals[0]?.id || null,
      assigneeId,
      priority: "p0_critical",
      status: "assigned",
      requiresHumanReview: true,
      reviewedByHuman: false,
      checkedOutAt: null,
      completedAt: null,
      artifacts: [],
      logs: [],
      tokensUsed: 0,
      costUsd: 0,
    };

    handleCreateTicket(newTicket);
    setActiveTab("board");

    // Automatically trigger heartbeat on this ticket
    setTimeout(() => {
      triggerHeartbeat(newTicket.id);
    }, 400);
  };

  // Run Strategic Consulting Solver
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

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Paperclip Navigation Header */}
      <PaperclipHeader
        companies={companies}
        selectedCompany={activeCompany}
        activeTab={activeTab}
        isAutoHeartbeat={isAutoHeartbeat}
        onSelectCompany={(c) => setSelectedCompanyId(c.id)}
        onSelectTab={(t) => setActiveTab(t)}
        onTriggerHeartbeat={() => triggerHeartbeat()}
        onNewTicket={() => setShowNewTicketModal(true)}
        onOpenSettings={() => setShowApiSettings(true)}
        hasApiKey={Boolean(apiKey)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* VIEW 1: KANBAN TICKET BOARD */}
        {activeTab === "board" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Live Heartbeat Quick Bar */}
            <LiveHeartbeatConsole
              logs={globalLogs}
              isAutoHeartbeat={isAutoHeartbeat}
              totalPulses={totalPulses}
              spentBudgetUsd={activeCompany.spentBudgetUsd}
              monthlyBudgetUsd={activeCompany.monthlyBudgetUsd}
              onToggleAutoHeartbeat={() => setIsAutoHeartbeat(!isAutoHeartbeat)}
              onTriggerHeartbeat={() => triggerHeartbeat()}
              onClearLogs={() => setGlobalLogs([])}
            />

            {/* Kanban Board */}
            <KanbanBoard
              tickets={activeTickets}
              agents={activeAgents}
              goals={activeGoals}
              onOpenTicket={(t) => setInspectingTicket(t)}
              onNewTicket={() => setShowNewTicketModal(true)}
              onTriggerTicketHeartbeat={(tid) => triggerHeartbeat(tid)}
              onApproveTicket={(tid) => handleApproveTicket(tid)}
            />
          </div>
        )}

        {/* VIEW 2: ORG CHART & AGENTS */}
        {activeTab === "org" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <OrgChartTree
              agents={activeAgents}
              tickets={activeTickets}
              onDispatchTicketToAgent={(agId) => {
                setShowNewTicketModal(true);
              }}
            />
          </div>
        )}

        {/* VIEW 3: LIVE HEARTBEAT CONSOLE FULL VIEW */}
        {activeTab === "heartbeat" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <LiveHeartbeatConsole
              logs={globalLogs}
              isAutoHeartbeat={isAutoHeartbeat}
              totalPulses={totalPulses}
              spentBudgetUsd={activeCompany.spentBudgetUsd}
              monthlyBudgetUsd={activeCompany.monthlyBudgetUsd}
              onToggleAutoHeartbeat={() => setIsAutoHeartbeat(!isAutoHeartbeat)}
              onTriggerHeartbeat={() => triggerHeartbeat()}
              onClearLogs={() => setGlobalLogs([])}
            />

            {/* Recent Ticket Heartbeat Executions */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-sm font-semibold text-stone-100 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" />
                Active Agent Workflows &amp; Ticket Executions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeTickets.map((t) => {
                  const ag = activeAgents.find((a) => a.id === t.assigneeId);
                  return (
                    <div
                      key={t.id}
                      onClick={() => setInspectingTicket(t)}
                      className="p-4 rounded-xl bg-stone-950 border border-stone-800 hover:border-stone-700 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-stone-400 font-semibold">{t.id}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded uppercase font-semibold ${
                            t.status === "done"
                              ? "bg-emerald-950 text-emerald-400"
                              : t.status === "review"
                              ? "bg-amber-950 text-amber-400"
                              : t.status === "in_progress"
                              ? "bg-purple-950 text-purple-400"
                              : "bg-stone-800 text-stone-400"
                          }`}
                        >
                          {t.status}
                        </span>
                      </div>
                      <h4 className="text-xs font-medium text-stone-200 line-clamp-2">{t.title}</h4>
                      <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400">
                        <span>{ag ? `${ag.avatar} ${ag.name.split(" ")[0]}` : "Unassigned"}</span>
                        <span>{t.artifacts?.length || 0} Deliverables</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: STRATEGIC COMPANY GOALS */}
        {activeTab === "goals" && (
          <div className="animate-in fade-in duration-200">
            <CompanyGoalsView
              goals={activeGoals}
              tickets={activeTickets}
              onOpenTicket={(t) => setInspectingTicket(t)}
              onAddGoal={(g) => {
                setCompanyGoals((prev) => ({
                  ...prev,
                  [selectedCompanyId]: [...(prev[selectedCompanyId] || []), g],
                }));
              }}
            />
          </div>
        )}

        {/* VIEW 5: FMS DELHI 6-FRAMEWORKS STRATEGY SOLVER */}
        {activeTab === "consulting" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {solution ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-stone-900 border border-stone-800 p-4 rounded-xl">
                  <span className="text-xs text-stone-400">
                    Viewing Strategic Solution for <strong className="text-stone-100">{solution.companyName}</strong>
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => dispatchConsultingCaseToAgent()}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Dispatch to Agent Team as Live Ticket
                    </button>
                    <button
                      onClick={() => setSolution(null)}
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors cursor-pointer"
                    >
                      New Case
                    </button>
                  </div>
                </div>
                <SolutionReportView solution={solution} onReset={() => setSolution(null)} />
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Banner */}
                <div className="text-center space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-stone-800 bg-stone-900 px-3.5 py-1 text-xs font-semibold text-stone-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    6 Core FMS Delhi &amp; McKinsey Consulting Frameworks
                  </div>
                  <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-stone-100">
                    Strategic Case Solver &amp; Issue Tree Diagnostic
                  </h1>
                  <p className="text-xs md:text-sm text-stone-400 max-w-2xl mx-auto leading-relaxed">
                    Input any business problem. Solve it directly into an interactive MECE tree, or dispatch it directly to your Paperclip AI Agent workforce.
                  </p>
                </div>

                {/* Framework Selector Pills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.values(FRAMEWORKS).map((fw) => (
                    <button
                      key={fw.id}
                      onClick={() => setSelectedFramework(fw.id)}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                        selectedFramework === fw.id
                          ? "border-emerald-500 bg-emerald-950/60 text-emerald-300 shadow-sm"
                          : "border-stone-800 bg-stone-900 hover:border-stone-700 text-stone-300"
                      }`}
                    >
                      {fw.title.replace(" Framework", "")}
                    </button>
                  ))}
                </div>

                {/* Input Form */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="text-xs font-medium text-stone-300 block mb-1">
                        Company Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="e.g. Zepto, Starbucks, Minimalist"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-300 block mb-1">Industry</label>
                      <input
                        type="text"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        placeholder="e.g. Quick Commerce, D2C Skincare"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-300 block mb-1">Geography</label>
                      <input
                        type="text"
                        value={geography}
                        onChange={(e) => setGeography(e.target.value)}
                        placeholder="e.g. India Metro Tier-1, UAE / GCC"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-stone-300 block mb-1">
                      Business Problem Statement <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={problemStatement}
                      onChange={(e) => setProblemStatement(e.target.value)}
                      placeholder="Describe the crisis, symptom, or strategic decision (e.g. EBITDA dropped by 18% over the past 2 quarters despite 30% order volume growth; high dark store surge labor and courier dead-mileage)..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-emerald-500 leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => dispatchConsultingCaseToAgent()}
                      disabled={!companyName || !problemStatement}
                      className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 disabled:opacity-50 text-stone-200 text-xs font-medium transition-colors cursor-pointer border border-stone-700 flex items-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5 text-emerald-400" />
                      Dispatch Directly to Agent Ticket Board
                    </button>

                    <button
                      type="button"
                      onClick={() => runAnalysis()}
                      disabled={loading || !companyName || !problemStatement}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-2 shadow-lg"
                    >
                      <Sparkles className="w-4 h-4" />
                      {loading ? "Synthesizing Framework Solution..." : "Run MECE Diagnosis & Solver"}
                    </button>
                  </div>
                </div>

                {/* Benchmark Case Studies */}
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-stone-400">
                    Pre-Loaded Benchmark Cases (1-Click Run)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {SAMPLE_CASES.map((sample, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-left transition-all text-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-semibold text-stone-100">{sample.companyName}</span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-800 text-emerald-400">
                              {sample.frameworkId}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 line-clamp-3 leading-relaxed">
                            {sample.problemStatement}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2">
                          <button
                            onClick={() => loadSampleCase(sample, true)}
                            className="text-[10px] text-emerald-400 hover:underline font-medium cursor-pointer"
                          >
                            Run Solver ⚡
                          </button>
                          <button
                            onClick={() => dispatchConsultingCaseToAgent(sample)}
                            className="text-[10px] text-stone-400 hover:text-stone-200 cursor-pointer"
                          >
                            Dispatch Ticket 📎
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Ticket Detail Modal */}
      {inspectingTicket && (
        <TicketDetailModal
          ticket={inspectingTicket}
          agent={activeAgents.find((a) => a.id === inspectingTicket.assigneeId)}
          goal={activeGoals.find((g) => g.id === inspectingTicket.goalId)}
          onClose={() => setInspectingTicket(null)}
          onApproveReview={(tid) => handleApproveTicket(tid)}
        />
      )}

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <NewTicketModal
          companyId={selectedCompanyId}
          agents={activeAgents}
          goals={activeGoals}
          onClose={() => setShowNewTicketModal(false)}
          onCreateTicket={(t) => handleCreateTicket(t)}
        />
      )}

      {/* Settings / API Key Modal */}
      {showApiSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl text-stone-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-sm font-semibold text-stone-100 flex items-center gap-2">
                <Key className="w-4 h-4 text-emerald-400" />
                Paperclip OS Runtime &amp; Free AI Engine
              </h3>
              <button
                onClick={() => setShowApiSettings(false)}
                className="text-xs text-stone-400 hover:text-stone-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Paperclip OS includes a <strong>100% Free High-Fidelity Agent Engine</strong> that operates offline with zero configuration and zero cost.
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              Optionally, you can paste your free <strong>Google Gemini Flash API Key</strong> from{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 underline font-medium"
              >
                Google AI Studio (free, no credit card required)
              </a>{" "}
              for live real-time LLM reasoning during heartbeat cycles.
            </p>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-stone-400 block">GOOGLE GEMINI API KEY</label>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-stone-800">
              {apiKey ? (
                <button
                  onClick={() => handleApiKeyChange("")}
                  className="text-xs text-rose-400 hover:underline cursor-pointer"
                >
                  Clear Key
                </button>
              ) : (
                <span className="text-[11px] text-stone-500">Currently using built-in free runtime</span>
              )}
              <button
                onClick={() => setShowApiSettings(false)}
                className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium cursor-pointer"
              >
                Save &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
