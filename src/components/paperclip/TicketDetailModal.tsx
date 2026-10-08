import { useState } from "react";
import { Ticket, Agent, CompanyGoal } from "@/lib/paperclip/types";
import { CheckCircle2, Clock, ShieldAlert, FileText, UserCheck, X, Copy, Check } from "lucide-react";

interface Props {
  ticket: Ticket;
  agent?: Agent;
  goal?: CompanyGoal;
  onClose: () => void;
  onApproveReview?: (ticketId: string) => void;
}

export function TicketDetailModal({ ticket, agent, goal, onClose, onApproveReview }: Props) {
  const [activeTab, setActiveTab] = useState<"deliverables" | "logs">("deliverables");
  const [copied, setCopied] = useState(false);

  const latestArtifact = ticket.artifacts?.[0];

  const handleCopy = () => {
    if (latestArtifact) {
      navigator.clipboard.writeText(latestArtifact.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
              {ticket.id}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-md font-medium uppercase tracking-wider ${
                ticket.priority === "p0_critical"
                  ? "bg-rose-950/80 text-rose-300 border border-rose-800"
                  : ticket.priority === "p1_high"
                  ? "bg-amber-950/80 text-amber-300 border border-amber-800"
                  : "bg-blue-950/80 text-blue-300 border border-blue-800"
              }`}
            >
              {ticket.priority.replace("_", " ")}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded-md font-medium capitalize ${
                ticket.status === "done"
                  ? "bg-blue-950/80 text-blue-300 border border-blue-800"
                  : ticket.status === "review"
                  ? "bg-amber-950/80 text-amber-300 border border-amber-800"
                  : ticket.status === "in_progress"
                  ? "bg-cyan-950/80 text-cyan-300 border border-cyan-800"
                  : "bg-stone-800 text-stone-400"
              }`}
            >
              {ticket.status.replace("_", " ")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {ticket.status === "review" && onApproveReview && (
              <button
                onClick={() => onApproveReview(ticket.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-sm transition-colors cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                Sign-off & Approve
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Subheader & Info */}
        <div className="px-6 py-4 bg-stone-900/90 border-b border-stone-800/80">
          <h2 className="text-xl font-semibold text-stone-100 leading-snug">{ticket.title}</h2>
          <p className="mt-1.5 text-xs text-stone-400 line-clamp-2">{ticket.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-stone-400">
            {agent && (
              <div className="flex items-center gap-2 bg-stone-800/60 px-2.5 py-1 rounded-md border border-stone-700/60">
                <span className="text-sm">{agent.avatar}</span>
                <span className="text-stone-300 font-medium">{agent.name}</span>
                <span className="text-stone-500 text-[11px]">({agent.title})</span>
              </div>
            )}
            {goal && (
              <div className="flex items-center gap-1.5 bg-stone-800/60 px-2.5 py-1 rounded-md border border-stone-700/60">
                <span className="text-stone-500">Goal:</span>
                <span className="text-stone-300 font-medium truncate max-w-[280px]">{goal.title}</span>
              </div>
            )}
            {ticket.costUsd > 0 && (
              <div className="flex items-center gap-1.5 bg-stone-800/60 px-2.5 py-1 rounded-md border border-stone-700/60 font-mono">
                <span className="text-stone-500">Spend:</span>
                <span className="text-amber-400 font-medium">${ticket.costUsd.toFixed(4)}</span>
                <span className="text-stone-500">({ticket.tokensUsed.toLocaleString()} tokens)</span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="px-6 border-b border-stone-800 flex items-center justify-between bg-stone-950/40">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("deliverables")}
              className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === "deliverables"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-stone-400 hover:text-stone-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Agent Deliverables ({ticket.artifacts?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`px-3 py-2 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === "logs"
                  ? "border-blue-500 text-blue-400"
                  : "border-transparent text-stone-400 hover:text-stone-200"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Heartbeat Audit Trail ({ticket.logs?.length || 0})
            </button>
          </div>

          {latestArtifact && activeTab === "deliverables" && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200 bg-stone-800 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied Deliverable" : "Copy Content"}
            </button>
          )}
        </div>

        {/* Modal Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-950/30">
          {activeTab === "deliverables" ? (
            <div>
              {ticket.artifacts && ticket.artifacts.length > 0 ? (
                <div className="space-y-6">
                  {ticket.artifacts.map((art) => (
                    <div key={art.id} className="bg-stone-900 border border-stone-800 rounded-xl p-5 shadow-sm">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
                        <div>
                          <h3 className="text-base font-semibold text-stone-100">{art.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-xs text-stone-400">
                            <span>Authored by {art.agentName}</span>
                            <span>•</span>
                            <span className="capitalize">{art.type.replace("_", " ")}</span>
                            <span>•</span>
                            <span>{new Date(art.createdAt).toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="prose prose-invert prose-stone max-w-none text-xs leading-relaxed font-sans text-stone-300 whitespace-pre-line">
                        {art.content}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 text-stone-500 text-xs">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  No deliverables produced yet. This ticket is queued for the next agent heartbeat execution cycle.
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2 font-mono text-xs">
              {ticket.logs && ticket.logs.length > 0 ? (
                ticket.logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-3 p-2.5 rounded-lg bg-stone-900/60 border border-stone-800/80"
                  >
                    <span className="text-stone-500 text-[11px] shrink-0">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold shrink-0 uppercase ${
                        log.phase === "heartbeat"
                          ? "bg-cyan-950 text-cyan-300"
                          : log.phase === "checkout"
                          ? "bg-purple-950 text-purple-300"
                          : log.phase === "artifact"
                          ? "bg-indigo-950 text-indigo-300"
                          : log.phase === "human_gate"
                          ? "bg-amber-950 text-amber-300"
                          : "bg-stone-800 text-stone-300"
                      }`}
                    >
                      {log.phase}
                    </span>
                    <span className="text-stone-300">{log.message}</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 text-stone-500 text-xs">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  No audit logs recorded for this ticket yet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
