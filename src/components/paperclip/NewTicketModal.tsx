import { useState } from "react";
import { Agent, CompanyGoal, Ticket, TicketPriority } from "@/lib/paperclip/types";
import { Plus, X, Sparkles } from "lucide-react";

interface Props {
  companyId: string;
  agents: Agent[];
  goals: CompanyGoal[];
  onClose: () => void;
  onCreateTicket: (ticket: Ticket) => void;
}

export function NewTicketModal({ companyId, agents, goals, onClose, onCreateTicket }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalId, setGoalId] = useState(goals[0]?.id || "");
  const [assigneeId, setAssigneeId] = useState(agents[0]?.id || "");
  const [priority, setPriority] = useState<TicketPriority>("p1_high");
  const [requiresHumanReview, setRequiresHumanReview] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTicket: Ticket = {
      id: "TICK-" + Math.floor(100 + Math.random() * 900),
      companyId,
      title: title.trim(),
      description: description.trim(),
      goalId: goalId || null,
      assigneeId: assigneeId || null,
      priority,
      status: assigneeId ? "assigned" : "backlog",
      requiresHumanReview,
      reviewedByHuman: false,
      checkedOutAt: null,
      completedAt: null,
      artifacts: [],
      logs: [],
      tokensUsed: 0,
      costUsd: 0,
    };

    onCreateTicket(newTicket);
    onClose();
  };

  const handleTemplateSelect = (template: { title: string; desc: string; role: string }) => {
    setTitle(template.title);
    setDescription(template.desc);
    const targetAgent = agents.find((a) => a.role === template.role) || agents[0];
    if (targetAgent) setAssigneeId(targetAgent.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-semibold text-stone-100">Dispatch New Task Ticket</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Quick Problem Templates */}
          <div>
            <label className="text-xs font-medium text-stone-400 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Quick Case Templates
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() =>
                  handleTemplateSelect({
                    title: "Zepto Quick-Commerce: Reverse 18% Dark Store Operating Loss",
                    desc: "Analyze value-chain cost drivers (labor, packing, rider dead-mileage) and model 3 contribution margin optimization levers to reach store profitability.",
                    role: "cfo_analyst",
                  })
                }
                className="text-left p-2.5 rounded-lg bg-stone-800/60 border border-stone-700/60 hover:border-blue-500/60 text-[11px] transition-colors cursor-pointer text-stone-300 hover:text-white"
              >
                <span className="font-semibold block text-amber-400">Profitability Leak</span>
                Turn around dark store unit economics.
              </button>
              <button
                type="button"
                onClick={() =>
                  handleTemplateSelect({
                    title: "Minimalist Skincare: UAE & GCC Cross-Border Market Entry",
                    desc: "Evaluate market attractiveness, regulatory MoH certification, retail distributor partnerships vs DTC, and customer willingness to pay.",
                    role: "strategy_consultant",
                  })
                }
                className="text-left p-2.5 rounded-lg bg-stone-800/60 border border-stone-700/60 hover:border-blue-500/60 text-[11px] transition-colors cursor-pointer text-stone-300 hover:text-white"
              >
                <span className="font-semibold block text-blue-400">Market Entry</span>
                Scale D2C brand into UAE & GCC.
              </button>
              <button
                type="button"
                onClick={() =>
                  handleTemplateSelect({
                    title: "B2B AI Platform: Value-Based Enterprise Pricing Model",
                    desc: "Formulate 3-tier pricing strategy (Starter, Growth, Enterprise) replacing unmetered seats with platform fee + usage units.",
                    role: "cfo_analyst",
                  })
                }
                className="text-left p-2.5 rounded-lg bg-stone-800/60 border border-stone-700/60 hover:border-blue-500/60 text-[11px] transition-colors cursor-pointer text-stone-300 hover:text-white"
              >
                <span className="font-semibold block text-purple-400">Pricing Overhaul</span>
                Value-based B2B SaaS pricing.
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-stone-300 block mb-1">
              Ticket Title / Problem Headline <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Conduct Competitor Benchmark & Value Chain Audit for Q3"
              className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-stone-300 block mb-1">
              Problem Statement / Task Context
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide background context, constraints, data points, or specific questions you want the agent to resolve..."
              className="w-full px-3.5 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-sm focus:outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-stone-300 block mb-1">Assign to Agent</label>
              <select
                value={assigneeId}
                onChange={(e) => setAssigneeId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-blue-500"
              >
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.avatar} {agent.name} — {agent.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-stone-300 block mb-1">Link to Company Goal</label>
              <select
                value={goalId}
                onChange={(e) => setGoalId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-blue-500"
              >
                {goals.map((goal) => (
                  <option key={goal.id} value={goal.id}>
                    {goal.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="text-xs font-medium text-stone-300 block mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="p0_critical">P0 — Critical (Urgent Attention)</option>
                <option value="p1_high">P1 — High (Core Objective)</option>
                <option value="p2_medium">P2 — Medium</option>
                <option value="p3_low">P3 — Low</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="humanReview"
                checked={requiresHumanReview}
                onChange={(e) => setRequiresHumanReview(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 bg-stone-950 border-stone-700 cursor-pointer"
              />
              <label htmlFor="humanReview" className="text-xs text-stone-300 cursor-pointer">
                Require Human Gate (Sign-off before ticket closes)
              </label>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors cursor-pointer shadow-md"
            >
              Dispatch Ticket to Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
