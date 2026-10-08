import { useState } from "react";
import { Agent, Ticket } from "@/lib/paperclip/types";
import { Users, Bot, Zap, DollarSign, ChevronRight, Activity, ShieldCheck, Clock } from "lucide-react";

interface Props {
  agents: Agent[];
  tickets: Ticket[];
  onSelectAgent?: (agent: Agent) => void;
  onDispatchTicketToAgent?: (agentId: string) => void;
}

export function OrgChartTree({ agents, tickets, onSelectAgent, onDispatchTicketToAgent }: Props) {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(agents[0]?.id || "");

  const ceo = agents.find((a) => a.role === "ceo") || agents[0];
  const directReports = agents.filter((a) => a.id !== ceo?.id);

  const selectedAgent = agents.find((a) => a.id === selectedAgentId) || ceo;

  const getAgentTickets = (agentId: string) => {
    return tickets.filter((t) => t.assigneeId === agentId);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Visual Org Tree */}
      <div className="lg:col-span-2 bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <Users className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-semibold text-stone-100">
                Agent Organization & Reporting Hierarchy
              </h2>
            </div>
            <span className="text-xs font-mono text-stone-400 bg-stone-800/80 px-2.5 py-1 rounded-md border border-stone-700/60">
              {agents.length} Autonomous Agents
            </span>
          </div>

          {/* Org Chart Node: CEO */}
          <div className="flex flex-col items-center">
            {ceo && (
              <div
                onClick={() => setSelectedAgentId(ceo.id)}
                className={`w-full max-w-md p-4 rounded-xl border transition-all cursor-pointer relative shadow-lg ${
                  selectedAgentId === ceo.id
                    ? "bg-stone-850 border-blue-500 ring-1 ring-blue-500/50"
                    : "bg-stone-950/80 border-stone-800 hover:border-stone-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 rounded-xl bg-stone-800 border border-stone-700">
                      {ceo.avatar}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm text-stone-100">{ceo.name}</h3>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold bg-blue-950 text-blue-300 border border-blue-800">
                          {ceo.role.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400 mt-0.5">{ceo.title}</p>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize flex items-center gap-1 ${
                        ceo.status === "running" || ceo.status === "awake"
                          ? "bg-blue-950 text-blue-300 border border-blue-800 animate-pulse"
                          : ceo.status === "review_gate"
                          ? "bg-amber-950 text-amber-300 border border-amber-800"
                          : "bg-stone-800 text-stone-400"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {ceo.status.replace("_", " ")}
                    </span>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {getAgentTickets(ceo.id).length} Tickets
                    </span>
                  </div>
                </div>

                {/* Micro Budget Gauge */}
                <div className="mt-3 pt-3 border-t border-stone-800/80 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>Runtime: {ceo.modelRuntime}</span>
                  <span className="text-amber-400 font-medium">
                    ${ceo.spentBudgetUsd.toFixed(2)} / ${ceo.budgetLimitUsd}
                  </span>
                </div>
              </div>
            )}

            {/* Connecting Vertical Line */}
            <div className="w-0.5 h-8 bg-stone-700"></div>

            {/* Connecting Horizontal Line */}
            <div className="w-11/12 h-0.5 bg-stone-700 relative">
              <div className="absolute left-1/2 -top-1 w-2 h-2 rounded-full bg-stone-500 -translate-x-1"></div>
            </div>

            {/* Direct Reports Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {directReports.map((agent) => {
                const isSelected = selectedAgentId === agent.id;
                const agentTickets = getAgentTickets(agent.id);
                return (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgentId(agent.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? "bg-stone-850 border-blue-500 ring-1 ring-blue-500/50"
                        : "bg-stone-950/60 border-stone-800/80 hover:border-stone-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-1.5 rounded-lg bg-stone-800 border border-stone-700">
                          {agent.avatar}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-semibold text-xs text-stone-100">{agent.name}</h4>
                            <span className="text-[9px] font-mono px-1 py-0.2 rounded uppercase bg-stone-800 text-stone-300">
                              {agent.role.replace("_", " ")}
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-400 truncate max-w-[170px] mt-0.5">
                            {agent.title}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize flex items-center gap-1 ${
                            agent.status === "running" || agent.status === "awake"
                              ? "bg-blue-950 text-blue-300 border border-blue-800 animate-pulse"
                              : agent.status === "review_gate"
                              ? "bg-amber-950 text-amber-300 border border-amber-800"
                              : "bg-stone-850 text-stone-400"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {agent.status.replace("_", " ")}
                        </span>
                        <span className="text-[10px] text-stone-500 font-mono">
                          {agentTickets.length} tasks
                        </span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-stone-800/60 flex items-center justify-between text-[10px] text-stone-500 font-mono">
                      <span>Spent: ${agent.spentBudgetUsd.toFixed(2)}</span>
                      <span>Cap: ${agent.budgetLimitUsd}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Agent Inspector Panel */}
      {selectedAgent && (
        <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800">
              <div className="flex items-center gap-3">
                <span className="text-3xl p-2 rounded-xl bg-stone-800 border border-stone-700">
                  {selectedAgent.avatar}
                </span>
                <div>
                  <h3 className="font-semibold text-sm text-stone-100">{selectedAgent.name}</h3>
                  <p className="text-xs text-stone-400">{selectedAgent.title}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block mb-1">
                  Standing Persona & System Directive
                </label>
                <div className="p-3 rounded-xl bg-stone-950 border border-stone-800/90 text-stone-300 text-xs leading-relaxed max-h-36 overflow-y-auto">
                  {selectedAgent.systemPrompt}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block mb-1.5">
                  Core Capabilities
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAgent.capabilities.map((cap, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 text-[11px] border border-stone-700/60"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-500 block text-[10px]">TOTAL TOKENS</span>
                  <span className="text-stone-200 font-semibold mt-0.5 block">
                    {selectedAgent.tokensUsed.toLocaleString()}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-950 border border-stone-800">
                  <span className="text-stone-500 block text-[10px]">BUDGET SPENT</span>
                  <span className="text-amber-400 font-semibold mt-0.5 block">
                    ${selectedAgent.spentBudgetUsd.toFixed(3)}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-stone-500 uppercase tracking-wider block mb-1.5">
                  Assigned Tickets ({getAgentTickets(selectedAgent.id).length})
                </label>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {getAgentTickets(selectedAgent.id).map((t) => (
                    <div
                      key={t.id}
                      className="p-2 rounded-lg bg-stone-950 border border-stone-800 flex items-center justify-between text-[11px]"
                    >
                      <span className="font-mono text-stone-400 font-semibold">{t.id}</span>
                      <span className="text-stone-300 truncate max-w-[140px]">{t.title}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-semibold uppercase ${
                          t.status === "done"
                            ? "bg-blue-950 text-blue-400"
                            : t.status === "review"
                            ? "bg-amber-950 text-amber-400"
                            : "bg-stone-800 text-stone-400"
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-800">
            {onDispatchTicketToAgent && (
              <button
                onClick={() => onDispatchTicketToAgent(selectedAgent.id)}
                className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Zap className="w-3.5 h-3.5" />
                Assign New Ticket to {selectedAgent.name.split(" ")[0]}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
