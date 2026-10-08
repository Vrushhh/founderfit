import React, { useState, useEffect, useRef } from "react";
import {
  SwarmAgent,
  SwarmArtifact,
  SwarmScenario,
  HandoffEvent,
  SupportingFinding,
  SwarmAgentId,
} from "@/lib/consulting/agentSwarmTypes";
import {
  ALL_SCENARIOS,
  SCENARIO_SIGNUPS_NO_CUSTOMERS,
} from "@/lib/consulting/agentSwarmData";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  Search,
  Database,
  Calculator,
  Compass,
  Cpu,
  Terminal,
  ExternalLink,
  ChevronRight,
  Maximize2,
  X,
  Layers,
  Copy,
  Check,
  Zap,
} from "lucide-react";

interface LiveAgentWorkspaceProps {
  onInspectKanban?: () => void;
  founderCustomProblem?: string;
  className?: string;
}

export const LiveAgentWorkspace: React.FC<LiveAgentWorkspaceProps> = ({
  onInspectKanban,
  founderCustomProblem,
  className = "",
}) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(
    SCENARIO_SIGNUPS_NO_CUSTOMERS.id
  );
  const scenario: SwarmScenario =
    ALL_SCENARIOS.find((s) => s.id === selectedScenarioId) ||
    SCENARIO_SIGNUPS_NO_CUSTOMERS;

  // Swarm execution state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playSpeedMs, setPlaySpeedMs] = useState<number>(2400); // 2.4s per step

  // Active artifact modal
  const [viewingArtifact, setViewingArtifact] = useState<SwarmArtifact | null>(
    null
  );
  const [copiedArtifact, setCopiedArtifact] = useState<boolean>(false);

  // Selected agent filter for feed
  const [filterAgentId, setFilterAgentId] = useState<SwarmAgentId | "all">("all");

  const timelineEndRef = useRef<HTMLDivElement>(null);

  // Derive agent states at current step
  const currentEvent: HandoffEvent | undefined =
    scenario.events[currentStepIndex];

  // Current agents snapshot
  const activeAgents: SwarmAgent[] = scenario.initialAgents.map((agent) => {
    if (!currentEvent) {
      return { ...agent };
    }
    const override = currentEvent.agentStatuses[agent.id];
    if (override) {
      return {
        ...agent,
        status: override.status,
        currentTool: override.currentTool,
        assignedTask: override.task,
        producedArtifactId: override.artifactId || agent.producedArtifactId,
      };
    }
    return { ...agent };
  });

  // Events completed so far
  const completedEvents = scenario.events.slice(0, currentStepIndex + 1);
  const isFinished = currentStepIndex >= scenario.events.length - 1;

  // Auto-advance timer
  useEffect(() => {
    let timer: any;
    if (isPlaying && !isFinished) {
      timer = setTimeout(() => {
        setCurrentStepIndex((prev) => {
          if (prev < scenario.events.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, playSpeedMs);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, isFinished, playSpeedMs, scenario.events.length]);

  // Scroll to bottom of handoff feed when new event fires
  useEffect(() => {
    if (timelineEndRef.current) {
      timelineEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentStepIndex]);

  const handlePlayToggle = () => {
    if (isFinished) {
      setCurrentStepIndex(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleStepForward = () => {
    if (currentStepIndex < scenario.events.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleJumpToEnd = () => {
    setIsPlaying(false);
    setCurrentStepIndex(scenario.events.length - 1);
  };

  const openArtifactById = (artId: string) => {
    const art = scenario.artifacts[artId];
    if (art) {
      setViewingArtifact(art);
      setCopiedArtifact(false);
    }
  };

  const copyArtifactContent = () => {
    if (viewingArtifact) {
      navigator.clipboard.writeText(
        `# ${viewingArtifact.title}\n\n${viewingArtifact.contentMarkdown}`
      );
      setCopiedArtifact(true);
      setTimeout(() => setCopiedArtifact(false), 2000);
    }
  };

  // Helper for agent status badge styling
  const getStatusBadge = (status: SwarmAgent["status"]) => {
    switch (status) {
      case "working":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            WORKING
          </span>
        );
      case "awaiting_information":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            AWAITING INFO
          </span>
        );
      case "revising":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse">
            <RotateCcw className="w-3 h-3 text-indigo-400 animate-spin" />
            REVISING
          </span>
        );
      case "complete":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-600/30 text-blue-200 border border-blue-500/40">
            <CheckCircle2 className="w-3 h-3 text-cyan-400" />
            COMPLETE
          </span>
        );
      case "queued":
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
            <Clock className="w-3 h-3 text-slate-500" />
            QUEUED
          </span>
        );
    }
  };

  // Map agent tools to icons
  const getToolIcon = (toolName: string | null) => {
    if (!toolName) return null;
    if (toolName.includes("query") || toolName.includes("sql") || toolName.includes("funnel")) {
      return <Database className="w-3 h-3 text-cyan-400" />;
    }
    if (toolName.includes("search") || toolName.includes("benchmarks")) {
      return <Search className="w-3 h-3 text-amber-400" />;
    }
    if (toolName.includes("gap") || toolName.includes("detector") || toolName.includes("audit")) {
      return <ShieldAlert className="w-3 h-3 text-rose-400" />;
    }
    if (toolName.includes("cohort") || toolName.includes("calculator")) {
      return <Calculator className="w-3 h-3 text-blue-400" />;
    }
    if (toolName.includes("framework") || toolName.includes("aarrr")) {
      return <Compass className="w-3 h-3 text-purple-400" />;
    }
    return <Terminal className="w-3 h-3 text-cyan-400" />;
  };

  return (
    <div
      className={`rounded-2xl border border-slate-700/80 bg-slate-950 text-slate-100 overflow-hidden shadow-2xl ${className}`}
      style={{
        boxShadow: "0 20px 50px rgba(15, 23, 42, 0.9), 0 0 35px rgba(37, 99, 235, 0.12)",
      }}
    >
      {/* ── 1. HEADER BAR & CONTROLS ── */}
      <div className="border-b border-slate-800 bg-slate-900/90 px-5 py-4 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                AUTONOMOUS CONSULTING AGENT WORKSPACE
              </h2>
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-950 text-cyan-300 border border-cyan-800/80">
                LIVE ACTION • $0.00 FREE RUNTIME
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              6 specialized AI agents executing problem diagnosis, cross-agent handoffs,
              critical review challenges, and quantitative revisions.
            </p>
          </div>

          {/* Action & Playback Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Scenario Selector */}
            <select
              value={selectedScenarioId}
              onChange={(e) => {
                setSelectedScenarioId(e.target.value);
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
            >
              {ALL_SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title}
                </option>
              ))}
            </select>

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayToggle}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
                isPlaying
                  ? "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30"
                  : isFinished
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> Pause Swarm
                </>
              ) : isFinished ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5" /> Replay Swarm
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" /> Run Live Swarm
                </>
              )}
            </button>

            {/* Step Forward */}
            <button
              onClick={handleStepForward}
              disabled={isFinished}
              title="Advance single handoff step"
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 flex items-center gap-1"
            >
              <SkipForward className="w-3.5 h-3.5" /> Step
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              title="Reset to beginning"
              className="p-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {/* Jump to End */}
            <button
              onClick={handleJumpToEnd}
              title="Jump to complete recommendation"
              className="px-2 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-400 border border-slate-700"
            >
              Skip
            </button>

            {/* Speed Toggle */}
            <div className="flex items-center bg-slate-850 rounded-lg p-0.5 border border-slate-800 text-[10px] font-mono">
              <button
                onClick={() => setPlaySpeedMs(3000)}
                className={`px-2 py-1 rounded ${
                  playSpeedMs === 3000
                    ? "bg-blue-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                1x
              </button>
              <button
                onClick={() => setPlaySpeedMs(1500)}
                className={`px-2 py-1 rounded ${
                  playSpeedMs === 1500
                    ? "bg-blue-600 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                2x
              </button>
            </div>
          </div>
        </div>

        {/* Founder Prompt Intake Banner */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
              Founder Problem:
            </span>
            <span className="italic text-slate-200 font-medium">
              "{scenario.founderPrompt}"
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono">
            <span>
              Handoff {currentStepIndex + 1} of {scenario.events.length}
            </span>
            <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{
                  width: `${((currentStepIndex + 1) / scenario.events.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. THE 6 LIVE AGENTS ROSTER GRID ── */}
      <div className="p-5 border-b border-slate-800/90 bg-slate-900/40">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            ACTIVE AGENT ROSTER & LIVE WORKSTREAM STATUS
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            Click agent to filter collaboration feed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {activeAgents.map((agent) => {
            const isFilterActive = filterAgentId === agent.id;
            const isRedTeam = agent.isRedTeam;
            const hasArtifact = !!agent.producedArtifactId;

            return (
              <div
                key={agent.id}
                onClick={() =>
                  setFilterAgentId(filterAgentId === agent.id ? "all" : agent.id)
                }
                className={`relative flex flex-col justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isFilterActive
                    ? "ring-2 ring-cyan-400 border-cyan-400 bg-slate-850"
                    : agent.status === "working"
                    ? "bg-blue-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/40 -translate-y-0.5"
                    : agent.status === "awaiting_information"
                    ? "bg-amber-950/30 border-amber-500/50"
                    : agent.status === "revising"
                    ? "bg-indigo-950/30 border-indigo-500/50"
                    : agent.status === "complete"
                    ? "bg-slate-900/90 border-slate-700/80"
                    : "bg-slate-900/40 border-slate-800 opacity-70"
                }`}
              >
                <div>
                  {/* Top: Avatar & Status Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl select-none">{agent.avatar}</span>
                    {getStatusBadge(agent.status)}
                  </div>

                  {/* Name & Role */}
                  <div className="font-semibold text-xs text-white flex items-center gap-1">
                    {agent.name}
                    {isRedTeam && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800">
                        Red Team
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono font-medium mb-2">
                    {agent.role}
                  </div>

                  {/* Assigned Task */}
                  <div className="text-[11px] text-slate-300 leading-tight mb-2.5 line-clamp-3">
                    {agent.assignedTask}
                  </div>
                </div>

                <div>
                  {/* Current Tool Badge */}
                  {agent.currentTool ? (
                    <div className="mb-2 px-2 py-1 rounded bg-slate-950 border border-slate-800 flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 truncate">
                      {getToolIcon(agent.currentTool)}
                      <span className="truncate">{agent.currentTool}</span>
                    </div>
                  ) : (
                    <div className="mb-2 px-2 py-1 rounded bg-slate-950/40 border border-slate-850 text-[10px] font-mono text-slate-500">
                      No tool active
                    </div>
                  )}

                  {/* Produced Artifact Pill */}
                  {hasArtifact && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openArtifactById(agent.producedArtifactId!);
                      }}
                      className="w-full px-2 py-1 rounded bg-blue-900/40 hover:bg-blue-800/60 border border-blue-500/40 text-[10px] font-mono font-semibold text-cyan-200 flex items-center justify-center gap-1 transition-all"
                    >
                      <FileText className="w-3 h-3 text-cyan-400" />
                      View Deliverable
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 3. VISUAL COLLABORATION HANDOFF PIPELINE (FLOW DIAGRAM) ── */}
      <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Compass className="w-3 h-3 text-cyan-400" />
            COLLABORATIVE HANDOFF & REVISION TOPOLOGY
          </span>
          <span className="text-[10px] font-mono text-slate-500">
            Interactive Agent Execution Path
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono py-1 overflow-x-auto">
          {/* Step 1: Lead */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              currentEvent?.toAgentId === "lead-consultant" ||
              currentEvent?.fromAgentId === "lead-consultant"
                ? "bg-blue-950 text-cyan-300 border-cyan-400 shadow-sm shadow-cyan-950"
                : "bg-slate-900 text-slate-400 border-slate-850"
            }`}
          >
            <span>👔 Lead Consultant</span>
          </div>

          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />

          {/* Parallel: BA & Market Researcher */}
          <div className="flex flex-col gap-1">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                currentEvent?.toAgentId === "business-analyst" ||
                currentEvent?.fromAgentId === "business-analyst"
                  ? "bg-blue-950 text-cyan-300 border-cyan-400"
                  : "bg-slate-900 text-slate-400 border-slate-850"
              }`}
            >
              <span>📊 Business Analyst</span>
            </div>
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                currentEvent?.toAgentId === "market-researcher" ||
                currentEvent?.fromAgentId === "market-researcher"
                  ? "bg-blue-950 text-cyan-300 border-cyan-400"
                  : "bg-slate-900 text-slate-400 border-slate-850"
              }`}
            >
              <span>🌐 Market Researcher</span>
            </div>
          </div>

          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />

          {/* Framework Analyst */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              currentEvent?.toAgentId === "framework-analyst" ||
              currentEvent?.fromAgentId === "framework-analyst"
                ? "bg-blue-950 text-cyan-300 border-cyan-400"
                : "bg-slate-900 text-slate-400 border-slate-850"
            }`}
          >
            <span>📐 Framework Analyst</span>
          </div>

          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />

          {/* Critical Reviewer (Red Team) */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              currentEvent?.toAgentId === "critical-reviewer" ||
              currentEvent?.fromAgentId === "critical-reviewer"
                ? "bg-rose-950/70 text-rose-300 border-rose-500 shadow-sm shadow-rose-950"
                : "bg-slate-900 text-slate-400 border-slate-850"
            }`}
          >
            <span>🛡️ Critical Reviewer (Red Team)</span>
          </div>

          {/* Dynamic Revision Loop Arrow */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-950/50 border border-amber-800/80 text-[10px] text-amber-300">
            <RotateCcw className="w-3 h-3 text-amber-400" />
            <span>Revision Loop</span>
          </div>

          <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />

          {/* Strategy Agent */}
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
              currentEvent?.toAgentId === "strategy-agent" ||
              currentEvent?.fromAgentId === "strategy-agent"
                ? "bg-blue-950 text-cyan-300 border-cyan-400 shadow-sm shadow-cyan-950"
                : "bg-slate-900 text-slate-400 border-slate-850"
            }`}
          >
            <span>🎯 Strategy Agent</span>
          </div>
        </div>
      </div>

      {/* ── 4. LIVE HANDOFF & REVISION STREAM (COLLABORATIVE FEED) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-8 p-5 border-b lg:border-b-0 lg:border-r border-slate-800/90">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              LIVE AGENT COLLABORATION & HANDOFF FEED
            </h3>
            {filterAgentId !== "all" && (
              <button
                onClick={() => setFilterAgentId("all")}
                className="text-[10px] font-mono text-cyan-400 hover:underline"
              >
                Clear filter ({filterAgentId})
              </button>
            )}
          </div>

          <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-2 custom-scrollbar">
            {completedEvents
              .filter(
                (evt) =>
                  filterAgentId === "all" ||
                  evt.fromAgentId === filterAgentId ||
                  evt.toAgentId === filterAgentId
              )
              .map((evt, idx) => {
                const isChallenge = evt.eventType === "challenge_review";
                const isRecalc = evt.eventType === "re_calculation";
                const isFinal = evt.eventType === "recommendation";
                const isCurrent = idx === completedEvents.length - 1;

                return (
                  <div
                    key={evt.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isCurrent
                        ? "ring-1 ring-cyan-500/80 shadow-md"
                        : "opacity-95"
                    } ${
                      isChallenge
                        ? "bg-rose-950/20 border-rose-500/40"
                        : isRecalc
                        ? "bg-indigo-950/20 border-indigo-500/40"
                        : isFinal
                        ? "bg-blue-950/30 border-cyan-500/40"
                        : "bg-slate-900/60 border-slate-850"
                    }`}
                  >
                    {/* Top Row: From -> To, Type Badge, Timestamp */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs">
                      <div className="flex items-center gap-2 font-mono text-[11px]">
                        <span className="text-slate-400 font-semibold">
                          {evt.fromAgentId === "founder"
                            ? "👤 Founder"
                            : scenario.initialAgents.find(
                                (a) => a.id === evt.fromAgentId
                              )?.name || evt.fromAgentId}
                        </span>
                        <ArrowRight className="w-3 h-3 text-cyan-400" />
                        <span className="text-cyan-300 font-semibold">
                          {scenario.initialAgents.find(
                            (a) => a.id === evt.toAgentId
                          )?.name || evt.toAgentId}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isChallenge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-900/60 text-rose-200 border border-rose-700 flex items-center gap-1">
                            <ShieldAlert className="w-3 h-3 text-rose-300" />
                            CRITICAL CHALLENGE
                          </span>
                        )}
                        {isRecalc && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-900/60 text-indigo-200 border border-indigo-700 flex items-center gap-1">
                            <RotateCcw className="w-3 h-3 text-indigo-300" />
                            RE-CALCULATION
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-slate-500">
                          {evt.timestamp}
                        </span>
                      </div>
                    </div>

                    {/* Event Title */}
                    <div className="text-xs font-semibold text-white mb-1">
                      {evt.title}
                    </div>

                    {/* Dialogue Speech Bubble */}
                    <div className="text-xs text-slate-200 bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 mb-2 font-sans italic leading-relaxed">
                      {evt.dialogueText}
                    </div>

                    {/* Bottom Metadata: Tool used & Attached Artifact */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] font-mono">
                      {evt.toolUsed ? (
                        <div className="flex items-center gap-1 text-cyan-400">
                          <Terminal className="w-3 h-3" />
                          <span>tool: {evt.toolUsed}</span>
                        </div>
                      ) : (
                        <div />
                      )}

                      {evt.artifactId && (
                        <button
                          onClick={() => openArtifactById(evt.artifactId!)}
                          className="px-2 py-0.5 rounded bg-blue-900/50 hover:bg-blue-800 text-cyan-200 border border-blue-500/40 text-[10px] font-semibold flex items-center gap-1 transition-all"
                        >
                          <FileText className="w-3 h-3 text-cyan-400" />
                          Inspect Artifact ({evt.artifactId})
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            <div ref={timelineEndRef} />
          </div>
        </div>

        {/* ── 5. PRODUCED ARTIFACTS DOSSIER ── */}
        <div className="lg:col-span-4 p-5 bg-slate-950/50 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase mb-3 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              PRODUCED ARTIFACTS DOSSIER
            </h3>
            <p className="text-[11px] text-slate-400 mb-3">
              Click any deliverable to examine the real data tables, frameworks, and
              revision history.
            </p>

            <div className="space-y-2 max-h-[310px] overflow-y-auto pr-1">
              {Object.values(scenario.artifacts).map((art) => {
                const isUnderReview = art.status === "revision_requested";
                const isApproved = art.status === "approved";

                return (
                  <div
                    key={art.id}
                    onClick={() => openArtifactById(art.id)}
                    className="p-2.5 rounded-lg border border-slate-800 hover:border-blue-500/60 bg-slate-900/80 hover:bg-slate-850 cursor-pointer transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                        {art.badge}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                          isUnderReview
                            ? "bg-rose-950 text-rose-300 border border-rose-800"
                            : isApproved
                            ? "bg-blue-950 text-cyan-300 border border-cyan-800"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {art.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                      {art.title}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between font-mono">
                      <span>By {art.agentName}</span>
                      <span>v{art.version}.0</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {onInspectKanban && (
            <div className="mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={onInspectKanban}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1.5 transition-all"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Inspect in Paperclip Kanban Board
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── 6. FINAL RECOMMENDATION LINKED TO SUPPORTING FINDINGS ── */}
      {isFinished && (
        <div className="border-t border-slate-800 bg-gradient-to-b from-slate-900/90 to-blue-950/20 p-5 lg:p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-900/60 text-cyan-300 border border-cyan-700">
              SWARM CONSENSUS REACHED
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Signed off by Dr. Evelyn Vance & Marcus Cole (Red Team)
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white mb-2">
            Strategic Decision: {scenario.finalRecommendation.decision}
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 mb-4 max-w-4xl leading-relaxed">
            {scenario.finalRecommendation.rationale}
          </p>

          {/* Action Plan Sprint */}
          <div className="mb-5">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              RECOMMENDED 30-DAY EXPERIMENT SPRINT
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {scenario.finalRecommendation.actionPlan.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700"
                >
                  <div className="text-[10px] font-mono font-bold text-amber-400 mb-1">
                    {step.phase}
                  </div>
                  <div className="text-xs font-bold text-white mb-1.5">
                    {step.title}
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed mb-2">
                    {step.detail}
                  </div>
                  <div className="text-[10px] font-mono text-cyan-300 pt-2 border-t border-slate-800/80">
                    KPI: {step.metric}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supporting Evidence Links (CLICKABLE CITATIONS) */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              DIRECT LINKS TO SUPPORTING FINDINGS & EVIDENCE
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {scenario.finalRecommendation.supportingFindings.map((sup) => (
                <div
                  key={sup.id}
                  onClick={() => openArtifactById(sup.artifactId)}
                  className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-400 cursor-pointer transition-all hover:-translate-y-0.5 group"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                    <span>{sup.agentName}</span>
                    <ExternalLink className="w-3 h-3 group-hover:text-white" />
                  </div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 mb-1 line-clamp-1">
                    {sup.title}
                  </div>
                  <div className="text-[11px] text-slate-400 line-clamp-2 leading-tight mb-2">
                    {sup.summary}
                  </div>
                  <div className="text-[10px] font-mono text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-900/50 truncate">
                    {sup.metricOrQuote}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── 7. ARTIFACT DETAIL INSPECTOR MODAL ── */}
      {viewingArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden text-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-900/50 text-cyan-300 border border-blue-700">
                    {viewingArtifact.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    v{viewingArtifact.version}.0 • By {viewingArtifact.agentName} ({viewingArtifact.agentRole})
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {viewingArtifact.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyArtifactContent}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5"
                  title="Copy deliverable content"
                >
                  {copiedArtifact ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </button>
                <button
                  onClick={() => setViewingArtifact(null)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 text-xs sm:text-sm">
              {/* Executive Summary Callout */}
              <div className="p-3.5 rounded-xl bg-blue-950/30 border border-cyan-500/30 text-cyan-200">
                <div className="font-mono text-[10px] uppercase font-bold text-cyan-400 mb-1">
                  EXECUTIVE SUMMARY
                </div>
                <p className="leading-relaxed">{viewingArtifact.summary}</p>
              </div>

              {/* Key Metrics Grid if provided */}
              {viewingArtifact.keyMetrics && viewingArtifact.keyMetrics.length > 0 && (
                <div>
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-400 mb-2">
                    KEY QUANTITATIVE METRICS
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {viewingArtifact.keyMetrics.map((km, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-slate-950 border border-slate-800"
                      >
                        <div className="text-[10px] text-slate-400 font-mono mb-1 truncate">
                          {km.label}
                        </div>
                        <div className="text-base font-bold text-white">
                          {km.value}
                        </div>
                        {km.note && (
                          <div className="text-[10px] text-cyan-400 font-mono mt-0.5 truncate">
                            {km.note}
                          </div>
                        )}
                        {km.change && (
                          <div className="text-[10px] text-rose-400 font-mono mt-0.5">
                            {km.change}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Content Markdown */}
              <div className="prose prose-invert prose-xs sm:prose-sm max-w-none bg-slate-950/60 p-4 rounded-xl border border-slate-850 font-sans leading-relaxed whitespace-pre-wrap">
                {viewingArtifact.contentMarkdown}
              </div>

              {/* Sources if provided */}
              {viewingArtifact.sources && (
                <div className="pt-2 border-t border-slate-800">
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-400 mb-1">
                    CITED SOURCES & BENCHMARKS
                  </div>
                  <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-0.5 font-mono">
                    {viewingArtifact.sources.map((src, idx) => (
                      <li key={idx}>{src}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Status: {viewingArtifact.status.toUpperCase()}</span>
              <button
                onClick={() => setViewingArtifact(null)}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs"
              >
                Close Deliverable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
