import { useState } from "react";
import { TicketLogEntry } from "@/lib/paperclip/types";
import { Play, Pause, Zap, Terminal, Trash2, Shield, DollarSign, Activity } from "lucide-react";

interface Props {
  logs: TicketLogEntry[];
  isAutoHeartbeat: boolean;
  totalPulses: number;
  spentBudgetUsd: number;
  monthlyBudgetUsd: number;
  onToggleAutoHeartbeat: () => void;
  onTriggerHeartbeat: () => void;
  onClearLogs: () => void;
}

export function LiveHeartbeatConsole({
  logs,
  isAutoHeartbeat,
  totalPulses,
  spentBudgetUsd,
  monthlyBudgetUsd,
  onToggleAutoHeartbeat,
  onTriggerHeartbeat,
  onClearLogs,
}: Props) {
  const [filter, setFilter] = useState<"all" | "checkout" | "artifact" | "budget">("all");

  const filteredLogs = logs.filter((log) => {
    if (filter === "all") return true;
    if (filter === "checkout") return log.phase === "checkout" || log.phase === "reasoning";
    if (filter === "artifact") return log.phase === "artifact";
    if (filter === "budget") return log.phase === "budget_debit";
    return true;
  });

  return (
    <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden shadow-xl flex flex-col">
      {/* Console Top Bar */}
      <div className="px-5 py-3.5 bg-stone-950 border-b border-stone-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              {isAutoHeartbeat && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              )}
              <span
                className={`relative inline-flex rounded-full h-3 w-3 ${
                  isAutoHeartbeat ? "bg-cyan-500" : "bg-stone-600"
                }`}
              ></span>
            </span>
            <span className="text-xs font-mono font-semibold tracking-wide text-stone-200">
              PAPERCLIP HEARTBEAT ENGINE
            </span>
          </div>

          <span className="text-xs font-mono text-stone-500">|</span>

          <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pulses:</span>
            <span className="text-stone-200 font-semibold">{totalPulses}</span>
          </div>

          <span className="text-xs font-mono text-stone-500">|</span>

          <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Budget:</span>
            <span className="text-amber-400 font-semibold">${spentBudgetUsd.toFixed(3)}</span>
            <span className="text-stone-600">/ ${monthlyBudgetUsd}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleAutoHeartbeat}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
              isAutoHeartbeat
                ? "bg-amber-950/80 text-amber-300 border border-amber-800 hover:bg-amber-900"
                : "bg-blue-950/80 text-blue-300 border border-blue-800 hover:bg-blue-900"
            }`}
          >
            {isAutoHeartbeat ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                Pause Heartbeat Loop
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Start Auto Heartbeat (6s)
              </>
            )}
          </button>

          <button
            onClick={onTriggerHeartbeat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors cursor-pointer shadow-sm"
          >
            <Zap className="w-3.5 h-3.5" />
            Heartbeat Pulse Now
          </button>

          <button
            onClick={onClearLogs}
            title="Clear logs"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="px-5 py-2 bg-stone-900/90 border-b border-stone-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-stone-400 font-mono text-[11px]">Telemetry Stream:</span>
          {(["all", "checkout", "artifact", "budget"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={`px-2 py-0.5 rounded text-[11px] font-mono capitalize transition-colors cursor-pointer ${
                filter === mode
                  ? "bg-stone-700 text-stone-100 font-medium"
                  : "text-stone-500 hover:text-stone-300"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-stone-500 font-mono">
          Showing {filteredLogs.length} events
        </span>
      </div>

      {/* Terminal Logs Stream */}
      <div className="p-4 bg-stone-950 h-72 overflow-y-auto font-mono text-xs space-y-1.5 select-text">
        {filteredLogs.length > 0 ? (
          filteredLogs.map((log) => {
            const time = new Date(log.timestamp).toLocaleTimeString();
            return (
              <div key={log.id} className="flex items-start gap-2.5 leading-relaxed hover:bg-stone-900/50 p-1 rounded">
                <span className="text-stone-600 shrink-0 select-none">[{time}]</span>
                <span
                  className={`text-[10px] px-1 py-0.5 rounded uppercase font-semibold shrink-0 select-none ${
                    log.phase === "heartbeat"
                      ? "bg-cyan-950/80 text-cyan-400 border border-cyan-800/60"
                      : log.phase === "checkout"
                      ? "bg-purple-950/80 text-purple-400 border border-purple-800/60"
                      : log.phase === "reasoning"
                      ? "bg-blue-950/80 text-blue-400 border border-blue-800/60"
                      : log.phase === "artifact"
                      ? "bg-indigo-950/80 text-indigo-400 border border-indigo-800/60"
                      : log.phase === "budget_debit"
                      ? "bg-amber-950/80 text-amber-400 border border-amber-800/60"
                      : log.phase === "human_gate"
                      ? "bg-amber-950/80 text-amber-400 border border-amber-800/60"
                      : "bg-stone-800 text-stone-400"
                  }`}
                >
                  {log.phase}
                </span>

                {log.agentName && (
                  <span className="text-stone-400 shrink-0 font-medium select-none">
                    [{log.agentName}]:
                  </span>
                )}

                <span
                  className={
                    log.phase === "artifact"
                      ? "text-indigo-300 font-medium"
                      : log.phase === "human_gate"
                      ? "text-amber-300 font-medium"
                      : log.phase === "checkout"
                      ? "text-purple-300 font-medium"
                      : "text-stone-300"
                  }
                >
                  {log.message}
                </span>
              </div>
            );
          })
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-stone-600">
            <Terminal className="w-8 h-8 mb-2 opacity-30" />
            <span>Awaiting heartbeat signals. Click "Heartbeat Pulse Now" to wake agents.</span>
          </div>
        )}
      </div>
    </div>
  );
}
