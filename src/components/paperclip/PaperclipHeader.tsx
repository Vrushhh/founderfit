import { useState } from "react";
import { Company } from "@/lib/paperclip/types";
import {
  Users,
  Kanban,
  Activity,
  Target,
  Sparkles,
  Plus,
  Zap,
  Key,
  Shield,
  Layers,
  ChevronDown,
} from "lucide-react";

interface Props {
  companies: Company[];
  selectedCompany: Company;
  activeTab: "org" | "board" | "heartbeat" | "goals" | "consulting";
  isAutoHeartbeat: boolean;
  onSelectCompany: (company: Company) => void;
  onSelectTab: (tab: "org" | "board" | "heartbeat" | "goals" | "consulting") => void;
  onTriggerHeartbeat: () => void;
  onNewTicket: () => void;
  onOpenSettings: () => void;
  hasApiKey: boolean;
}

export function PaperclipHeader({
  companies,
  selectedCompany,
  activeTab,
  isAutoHeartbeat,
  onSelectCompany,
  onSelectTab,
  onTriggerHeartbeat,
  onNewTicket,
  onOpenSettings,
  hasApiKey,
}: Props) {
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Company Dropdown */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-base shadow-sm">
                📎
              </div>
              <div className="hidden sm:block">
                <span className="font-semibold text-sm tracking-tight text-stone-100 flex items-center gap-1.5">
                  PAPERCLIP <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-800 text-stone-400">OS</span>
                </span>
                <span className="text-[10px] text-stone-500 block">Agent Organization Control Plane</span>
              </div>
            </div>

            <span className="text-stone-800 hidden sm:inline">/</span>

            {/* Company Picker */}
            <div className="relative">
              <button
                onClick={() => setShowCompanyMenu(!showCompanyMenu)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-xs text-stone-200 transition-colors cursor-pointer"
              >
                <span className="font-medium truncate max-w-[170px] sm:max-w-[220px]">
                  {selectedCompany.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
              </button>

              {showCompanyMenu && (
                <div className="absolute left-0 mt-1.5 w-72 bg-stone-900 border border-stone-800 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in">
                  <div className="px-3 py-1 text-[10px] font-mono text-stone-500 uppercase">
                    Select Active Company
                  </div>
                  {companies.map((comp) => (
                    <button
                      key={comp.id}
                      onClick={() => {
                        onSelectCompany(comp);
                        setShowCompanyMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex flex-col transition-colors cursor-pointer ${
                        comp.id === selectedCompany.id
                          ? "bg-emerald-950/40 text-emerald-300"
                          : "text-stone-300 hover:bg-stone-800"
                      }`}
                    >
                      <span className="font-medium">{comp.name}</span>
                      <span className="text-[10px] text-stone-500">{comp.industry}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-900/80 p-1 rounded-xl border border-stone-800/80">
            <button
              onClick={() => onSelectTab("org")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "org"
                  ? "bg-stone-800 text-stone-100 shadow-xs"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Org Chart
            </button>

            <button
              onClick={() => onSelectTab("board")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "board"
                  ? "bg-stone-800 text-stone-100 shadow-xs"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              Ticket Board
            </button>

            <button
              onClick={() => onSelectTab("heartbeat")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "heartbeat"
                  ? "bg-stone-800 text-stone-100 shadow-xs"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              Heartbeat
              {isAutoHeartbeat && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              )}
            </button>

            <button
              onClick={() => onSelectTab("goals")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "goals"
                  ? "bg-stone-800 text-stone-100 shadow-xs"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              Goals
            </button>

            <button
              onClick={() => onSelectTab("consulting")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                activeTab === "consulting"
                  ? "bg-emerald-950 text-emerald-300 border border-emerald-800 shadow-xs"
                  : "text-emerald-400/80 hover:text-emerald-300"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              FMS Framework Solver
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onTriggerHeartbeat}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 text-emerald-400 font-medium text-xs transition-colors cursor-pointer shadow-sm"
              title="Execute a single Heartbeat tick"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pulse Heartbeat</span>
            </button>

            <button
              onClick={onNewTicket}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">New Ticket</span>
            </button>

            <button
              onClick={onOpenSettings}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                hasApiKey
                  ? "bg-emerald-950/60 border-emerald-800 text-emerald-400"
                  : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200"
              }`}
              title="Configure Gemini Flash API Key / Free tier"
            >
              <Key className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-stone-800/60 overflow-x-auto text-xs">
          <button
            onClick={() => onSelectTab("org")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "org" ? "bg-stone-800 text-white" : "text-stone-400"}`}
          >
            Org Chart
          </button>
          <button
            onClick={() => onSelectTab("board")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "board" ? "bg-stone-800 text-white" : "text-stone-400"}`}
          >
            Board
          </button>
          <button
            onClick={() => onSelectTab("heartbeat")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "heartbeat" ? "bg-stone-800 text-white" : "text-stone-400"}`}
          >
            Heartbeat
          </button>
          <button
            onClick={() => onSelectTab("goals")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "goals" ? "bg-stone-800 text-white" : "text-stone-400"}`}
          >
            Goals
          </button>
          <button
            onClick={() => onSelectTab("consulting")}
            className={`px-2.5 py-1 rounded-lg ${activeTab === "consulting" ? "bg-emerald-950 text-emerald-300" : "text-emerald-400"}`}
          >
            Solver
          </button>
        </div>
      </div>
    </header>
  );
}
