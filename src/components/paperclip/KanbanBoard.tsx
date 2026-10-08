import { useState } from "react";
import { Ticket, Agent, CompanyGoal, TicketStatus } from "@/lib/paperclip/types";
import { Plus, Zap, FileText, CheckCircle2, Clock, Filter, AlertCircle } from "lucide-react";

interface Props {
  tickets: Ticket[];
  agents: Agent[];
  goals: CompanyGoal[];
  onOpenTicket: (ticket: Ticket) => void;
  onNewTicket: () => void;
  onTriggerTicketHeartbeat: (ticketId: string) => void;
  onApproveTicket: (ticketId: string) => void;
}

const COLUMNS: { id: TicketStatus; label: string; color: string }[] = [
  { id: "backlog", label: "Backlog", color: "border-stone-700 bg-stone-900/60" },
  { id: "assigned", label: "Assigned (Queued)", color: "border-cyan-800/80 bg-cyan-950/20" },
  { id: "in_progress", label: "In Progress (Checked Out)", color: "border-purple-800/80 bg-purple-950/20" },
  { id: "review", label: "Human Review Gate", color: "border-amber-800/80 bg-amber-950/20" },
  { id: "done", label: "Completed", color: "border-blue-800/80 bg-blue-950/20" },
];

export function KanbanBoard({
  tickets,
  agents,
  goals,
  onOpenTicket,
  onNewTicket,
  onTriggerTicketHeartbeat,
  onApproveTicket,
}: Props) {
  const [agentFilter, setAgentFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const filteredTickets = tickets.filter((t) => {
    if (agentFilter !== "all" && t.assigneeId !== agentFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    return true;
  });

  const getTicketsForColumn = (status: TicketStatus) => {
    return filteredTickets.filter((t) => t.status === status);
  };

  return (
    <div className="space-y-4">
      {/* Board Controls & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-stone-900 border border-stone-800 rounded-xl px-4 py-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-stone-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Agent:</span>
          </div>
          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none"
          >
            <option value="all">All Agents ({agents.length})</option>
            {agents.map((a) => (
              <option key={a.id} value={a.id}>
                {a.avatar} {a.name}
              </option>
            ))}
          </select>

          <span className="text-stone-700">|</span>

          <div className="flex items-center gap-1.5 text-stone-400">
            <span>Priority:</span>
          </div>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-stone-950 border border-stone-800 text-stone-200 text-xs focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="p0_critical">P0 Critical</option>
            <option value="p1_high">P1 High</option>
            <option value="p2_medium">P2 Medium</option>
            <option value="p3_low">P3 Low</option>
          </select>
        </div>

        <button
          onClick={onNewTicket}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Create Task Ticket
        </button>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {COLUMNS.map((col) => {
          const colTickets = getTicketsForColumn(col.id);
          return (
            <div
              key={col.id}
              className={`rounded-2xl border p-3 flex flex-col min-h-[500px] ${col.color}`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-stone-800/80">
                <span className="text-xs font-semibold text-stone-200">{col.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-stone-800 text-stone-400 font-semibold">
                  {colTickets.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {colTickets.length > 0 ? (
                  colTickets.map((ticket) => {
                    const assignee = agents.find((a) => a.id === ticket.assigneeId);
                    const goal = goals.find((g) => g.id === ticket.goalId);
                    const hasArtifacts = ticket.artifacts && ticket.artifacts.length > 0;

                    return (
                      <div
                        key={ticket.id}
                        onClick={() => onOpenTicket(ticket)}
                        className="p-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 transition-all cursor-pointer shadow-sm group hover:-translate-y-0.5"
                      >
                        {/* Card Meta Top */}
                        <div className="flex items-center justify-between text-[10px] mb-1.5">
                          <span className="font-mono font-semibold text-stone-400">{ticket.id}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded font-semibold uppercase ${
                              ticket.priority === "p0_critical"
                                ? "bg-rose-950 text-rose-300 border border-rose-800"
                                : ticket.priority === "p1_high"
                                ? "bg-amber-950 text-amber-300 border border-amber-800"
                                : "bg-stone-800 text-stone-400"
                            }`}
                          >
                            {ticket.priority.split("_")[0].toUpperCase()}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs font-medium text-stone-100 group-hover:text-blue-300 transition-colors line-clamp-2">
                          {ticket.title}
                        </h4>

                        {/* Goal Tag */}
                        {goal && (
                          <div className="mt-1.5 text-[10px] text-stone-500 truncate">
                            🎯 {goal.title}
                          </div>
                        )}

                        {/* Card Bottom: Assignee & Action Buttons */}
                        <div className="mt-3 pt-2.5 border-t border-stone-800/80 flex items-center justify-between">
                          {assignee ? (
                            <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                              <span>{assignee.avatar}</span>
                              <span className="truncate max-w-[80px]">{assignee.name.split(" ")[0]}</span>
                            </div>
                          ) : (
                            <span className="text-[10px] text-stone-600 italic">Unassigned</span>
                          )}

                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            {hasArtifacts && (
                              <button
                                onClick={() => onOpenTicket(ticket)}
                                title="View Deliverable"
                                className="p-1 rounded bg-stone-800 hover:bg-stone-700 text-blue-400 transition-colors"
                              >
                                <FileText className="w-3.5 h-3.5" />
                              </button>
                            )}

                            {ticket.status === "review" && (
                              <button
                                onClick={() => onApproveTicket(ticket.id)}
                                title="Approve Ticket"
                                className="p-1 rounded bg-blue-950 text-blue-300 hover:bg-blue-900 border border-blue-800 transition-colors text-[10px] flex items-center gap-1 px-1.5 font-medium"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                Approve
                              </button>
                            )}

                            {(ticket.status === "assigned" || ticket.status === "backlog") && (
                              <button
                                onClick={() => onTriggerTicketHeartbeat(ticket.id)}
                                title="Run Ticket on Heartbeat Now"
                                className="p-1 rounded bg-blue-900/60 text-blue-300 hover:bg-blue-800 border border-blue-700 transition-colors"
                              >
                                <Zap className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="h-32 flex items-center justify-center text-stone-600 text-[11px] italic">
                    No tickets in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
