export type SwarmAgentId =
  | "lead-consultant"
  | "framework-analyst"
  | "market-researcher"
  | "business-analyst"
  | "critical-reviewer"
  | "strategy-agent";

export type AgentStatus =
  | "queued"
  | "working"
  | "awaiting_information"
  | "revising"
  | "complete";

export interface SwarmAgent {
  id: SwarmAgentId;
  name: string;
  role: string;
  avatar: string;
  assignedTask: string;
  deliverableTitle: string;
  currentTool: string | null;
  status: AgentStatus;
  modelRuntime: string;
  producedArtifactId?: string;
  isRedTeam?: boolean;
}

export interface SwarmArtifact {
  id: string;
  title: string;
  agentId: SwarmAgentId;
  agentName: string;
  agentRole: string;
  version: number;
  badge: string;
  summary: string;
  contentMarkdown: string;
  keyMetrics?: { label: string; value: string; change?: string; note?: string }[];
  sources?: string[];
  status: "draft" | "under_review" | "revision_requested" | "approved";
}

export type HandoffEventType =
  | "assignment"
  | "tool_execution"
  | "finding"
  | "challenge_review"
  | "revision_request"
  | "re_calculation"
  | "handoff"
  | "recommendation";

export interface HandoffEvent {
  id: string;
  stepNumber: number;
  fromAgentId: SwarmAgentId | "founder";
  toAgentId: SwarmAgentId;
  eventType: HandoffEventType;
  timestamp: string;
  title: string;
  description: string;
  dialogueText: string;
  toolUsed?: string;
  artifactId?: string;
  agentStatuses: Record<
    SwarmAgentId,
    {
      status: AgentStatus;
      currentTool: string | null;
      task: string;
      artifactId?: string;
    }
  >;
}

export interface SupportingFinding {
  id: string;
  agentId: SwarmAgentId;
  agentName: string;
  title: string;
  summary: string;
  metricOrQuote: string;
  artifactId: string;
  status: "verified" | "revised_and_verified";
}

export interface FinalRecommendation {
  decision: string;
  rationale: string;
  actionPlan: {
    phase: string;
    title: string;
    detail: string;
    owner: string;
    metric: string;
  }[];
  supportingFindings: SupportingFinding[];
}

export interface SwarmScenario {
  id: string;
  title: string;
  founderPrompt: string;
  description: string;
  category: string;
  initialAgents: SwarmAgent[];
  events: HandoffEvent[];
  artifacts: Record<string, SwarmArtifact>;
  finalRecommendation: FinalRecommendation;
}
