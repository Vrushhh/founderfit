export type AgentRole =
  | "ceo"
  | "strategy_consultant"
  | "cto_architect"
  | "cpo_product"
  | "cmo_growth"
  | "cfo_analyst"
  | "operations_lead"
  | "researcher";

export type AgentStatus =
  | "idle"
  | "awake"
  | "checking_out"
  | "running"
  | "review_gate"
  | "sleeping"
  | "error";

export type TicketPriority = "p0_critical" | "p1_high" | "p2_medium" | "p3_low";

export type TicketStatus =
  | "backlog"
  | "assigned"
  | "in_progress"
  | "review"
  | "done";

export interface Company {
  id: string;
  name: string;
  mission: string;
  industry: string;
  monthlyBudgetUsd: number;
  spentBudgetUsd: number;
  createdAt: string;
}

export interface CompanyGoal {
  id: string;
  companyId: string;
  title: string;
  description: string;
  targetMetric: string;
  status: "active" | "achieved" | "paused";
  progressPct: number;
}

export interface Agent {
  id: string;
  companyId: string;
  name: string;
  role: AgentRole;
  title: string;
  reportsTo: string | null; // Manager Agent ID
  avatar: string;
  systemPrompt: string;
  modelRuntime: string; // e.g. "Gemini 1.5 Flash (Auto)", "Claude 3.5 Sonnet", "Paperclip Deterministic"
  status: AgentStatus;
  lastHeartbeatAt: string | null;
  budgetLimitUsd: number;
  spentBudgetUsd: number;
  tokensUsed: number;
  capabilities: string[];
  currentTicketId: string | null;
  isHeartbeatActive: boolean;
}

export interface TicketArtifact {
  id: string;
  title: string;
  type:
    | "strategy_deck"
    | "architecture_spec"
    | "financial_model"
    | "gtm_playbook"
    | "code_patch"
    | "executive_memo";
  content: string; // Markdown formatted
  createdAt: string;
  agentId: string;
  agentName: string;
  agentRole: string;
}

export interface TicketLogEntry {
  id: string;
  timestamp: string;
  agentId?: string;
  agentName?: string;
  ticketId?: string;
  phase:
    | "heartbeat"
    | "checkout"
    | "reasoning"
    | "tool_call"
    | "artifact"
    | "budget_debit"
    | "sleep"
    | "human_gate"
    | "system";
  message: string;
  details?: Record<string, any>;
}

export interface Ticket {
  id: string;
  companyId: string;
  title: string;
  description: string;
  goalId: string | null;
  assigneeId: string | null;
  priority: TicketPriority;
  status: TicketStatus;
  requiresHumanReview: boolean;
  reviewedByHuman: boolean;
  checkedOutAt: string | null;
  completedAt: string | null;
  artifacts: TicketArtifact[];
  logs: TicketLogEntry[];
  tokensUsed: number;
  costUsd: number;
}

export interface HeartbeatEngineConfig {
  autoRun: boolean;
  intervalSeconds: number;
  apiKey?: string;
}
