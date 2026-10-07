import { useState } from "react";
import { CompanyGoal, Ticket } from "@/lib/paperclip/types";
import { Target, CheckCircle2, Clock, Plus, BarChart3, ChevronRight } from "lucide-react";

interface Props {
  goals: CompanyGoal[];
  tickets: Ticket[];
  onOpenTicket: (ticket: Ticket) => void;
  onAddGoal: (goal: CompanyGoal) => void;
}

export function CompanyGoalsView({ goals, tickets, onOpenTicket, onAddGoal }: Props) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetMetric, setTargetMetric] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newGoal: CompanyGoal = {
      id: "goal-" + Math.random().toString(36).slice(2, 8),
      companyId: goals[0]?.companyId || "comp-founderfit",
      title: title.trim(),
      description: description.trim(),
      targetMetric: targetMetric.trim() || "KPI Target",
      status: "active",
      progressPct: 10,
    };

    onAddGoal(newGoal);
    setTitle("");
    setDescription("");
    setTargetMetric("");
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-stone-800">
        <div>
          <h2 className="text-base font-semibold text-stone-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-400" />
            Strategic Company Goals & Objectives (OKRs)
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Every task ticket in Paperclip maintains goal ancestry, connecting tactical work to high-level corporate imperatives.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-medium text-xs transition-colors cursor-pointer border border-stone-700"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Strategic Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {goals.map((goal) => {
          const linkedTickets = tickets.filter((t) => t.goalId === goal.id);
          const completedTickets = linkedTickets.filter((t) => t.status === "done");

          return (
            <div
              key={goal.id}
              className="bg-stone-900 border border-stone-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 uppercase font-semibold">
                    {goal.status}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    {goal.progressPct}% Complete
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-stone-100 leading-snug">{goal.title}</h3>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">{goal.description}</p>

                {/* Progress bar */}
                <div className="mt-4 w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${goal.progressPct}%` }}
                  ></div>
                </div>

                {/* Metric pill */}
                <div className="mt-4 p-2.5 rounded-xl bg-stone-950 border border-stone-800/80 text-xs">
                  <span className="text-stone-500 text-[10px] block uppercase font-mono">
                    TARGET KEY RESULT
                  </span>
                  <span className="text-stone-200 font-medium mt-0.5 block">{goal.targetMetric}</span>
                </div>
              </div>

              {/* Linked Tickets */}
              <div className="mt-5 pt-4 border-t border-stone-800">
                <span className="text-[11px] font-mono text-stone-400 block mb-2">
                  Linked Tickets ({completedTickets.length}/{linkedTickets.length} Done)
                </span>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {linkedTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => onOpenTicket(ticket)}
                      className="p-1.5 px-2 rounded-lg bg-stone-950 hover:bg-stone-800 border border-stone-800/60 flex items-center justify-between text-[11px] cursor-pointer transition-colors"
                    >
                      <span className="text-stone-300 truncate max-w-[190px]">{ticket.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                    </div>
                  ))}
                  {linkedTickets.length === 0 && (
                    <span className="text-[10px] text-stone-600 italic block">No tickets linked yet.</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-2xl text-stone-100">
            <h3 className="text-base font-semibold text-stone-100 mb-4">Add Strategic Corporate Goal</h3>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="text-stone-300 block mb-1">Goal Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Expand Enterprise Footprint in Southeast Asia"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-stone-300 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Strategic context, key hypotheses, and target milestones..."
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="text-stone-300 block mb-1">Target Key Result / KPI</label>
                <input
                  type="text"
                  value={targetMetric}
                  onChange={(e) => setTargetMetric(e.target.value)}
                  placeholder="e.g. $2.5M Net ARR or +15% Contribution Margin"
                  className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors cursor-pointer"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
