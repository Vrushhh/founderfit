import { Agent, Company, CompanyGoal, Ticket, TicketArtifact, TicketLogEntry } from "./types";

interface HeartbeatStepResult {
  updatedAgents: Agent[];
  updatedTickets: Ticket[];
  updatedCompany: Company;
  newLogs: TicketLogEntry[];
  affectedTicket?: Ticket;
}

/**
 * Execute a single Heartbeat cycle for an organization.
 * Finds the highest priority assigned ticket, wakes up the assignee agent,
 * checks out the task, runs multi-step reasoning, produces artifacts,
 * audits budget, and handles review gates or completion.
 */
export async function runHeartbeatCycle({
  company,
  agents,
  tickets,
  goals,
  apiKey,
  targetTicketId,
}: {
  company: Company;
  agents: Agent[];
  tickets: Ticket[];
  goals: CompanyGoal[];
  apiKey?: string;
  targetTicketId?: string;
}): Promise<HeartbeatStepResult> {
  const newLogs: TicketLogEntry[] = [];
  const now = new Date().toISOString();

  // Find a ticket to execute
  let candidateTicket: Ticket | undefined;
  if (targetTicketId) {
    candidateTicket = tickets.find((t) => t.id === targetTicketId);
  } else {
    // Pick first assigned ticket or in_progress ticket
    candidateTicket = tickets.find(
      (t) => (t.status === "assigned" || t.status === "in_progress") && t.assigneeId
    );
  }

  // If no ticket is assigned, let's see if there is a backlog ticket we can auto-triage or just log idle heartbeat
  if (!candidateTicket) {
    const backlogTicket = tickets.find((t) => t.status === "backlog");
    if (backlogTicket) {
      // Auto-assign to best matching agent or CEO
      const ceo = agents.find((a) => a.role === "ceo") || agents[0];
      const assignedTicket: Ticket = {
        ...backlogTicket,
        assigneeId: ceo.id,
        status: "assigned",
      };

      const log: TicketLogEntry = {
        id: "log-" + Math.random().toString(36).slice(2, 9),
        timestamp: now,
        agentId: ceo.id,
        agentName: ceo.name,
        ticketId: backlogTicket.id,
        phase: "heartbeat",
        message: `Heartbeat Pulse: Auto-triaged backlog ticket "${backlogTicket.title}" to ${ceo.name} (${ceo.title}).`,
      };
      newLogs.push(log);

      const updatedTickets = tickets.map((t) => (t.id === backlogTicket.id ? assignedTicket : t));
      return {
        updatedAgents: agents,
        updatedTickets,
        updatedCompany: company,
        newLogs,
        affectedTicket: assignedTicket,
      };
    }

    // Pure idle heartbeat
    const idleLog: TicketLogEntry = {
      id: "log-" + Math.random().toString(36).slice(2, 9),
      timestamp: now,
      phase: "heartbeat",
      message: `Heartbeat Pulse #${Math.floor(Date.now() / 1000) % 10000}: All ${agents.length} agents standing by in sleep state. Task queues clean.`,
    };
    newLogs.push(idleLog);

    return {
      updatedAgents: agents,
      updatedTickets: tickets,
      updatedCompany: company,
      newLogs,
    };
  }

  const assignee = agents.find((a) => a.id === candidateTicket.assigneeId);
  if (!assignee) {
    return {
      updatedAgents: agents,
      updatedTickets: tickets,
      updatedCompany: company,
      newLogs,
    };
  }

  const goal = goals.find((g) => g.id === candidateTicket.goalId);

  // 1. WAKE & CHECKOUT
  const checkoutLog: TicketLogEntry = {
    id: "log-" + Math.random().toString(36).slice(2, 9),
    timestamp: now,
    agentId: assignee.id,
    agentName: assignee.name,
    ticketId: candidateTicket.id,
    phase: "checkout",
    message: `[Heartbeat ⚡] ${assignee.name} woke up & checked out ticket "${candidateTicket.title}" [Priority: ${candidateTicket.priority.toUpperCase()}].`,
  };
  newLogs.push(checkoutLog);

  // 2. REASONING & EXECUTION
  const reasoningLog: TicketLogEntry = {
    id: "log-" + Math.random().toString(36).slice(2, 9),
    timestamp: new Date(Date.now() + 100).toISOString(),
    agentId: assignee.id,
    agentName: assignee.name,
    ticketId: candidateTicket.id,
    phase: "reasoning",
    message: `Formulating MECE strategy for ticket: "${candidateTicket.title}". Goal Alignment: ${goal ? goal.title : "Corporate Strategy"}.`,
  };
  newLogs.push(reasoningLog);

  // Generate Artifact
  let artifactContent = "";
  let tokensUsed = 3800;
  let artifactTitle = `Strategic Deliverable: ${candidateTicket.title}`;

  if (apiKey && apiKey.trim().length > 10) {
    try {
      const prompt = `You are ${assignee.name}, ${assignee.title}.
System Prompt: ${assignee.systemPrompt}
Company: ${company.name}
Company Mission: ${company.mission}
Company Goal: ${goal ? `${goal.title} - ${goal.description}` : "Company Objectives"}
Task Ticket: ${candidateTicket.title}
Task Details: ${candidateTicket.description}

Provide an exhaustive, high-level executive deliverable in Markdown format.
Include:
1. Executive Summary & Root Cause / Strategic Context
2. Structured MECE Framework Breakdown
3. Core Quantitative & Qualitative Findings
4. 3 Actionable High-Priority Interventions
5. 0-30-90 Day Phased Execution Roadmap with KPIs
6. Key Operational & Financial Risks and Mitigations`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 2500,
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const geminiText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (geminiText) {
          artifactContent = geminiText;
          tokensUsed = (data?.usageMetadata?.totalTokenCount as number) || 4200;
        }
      }
    } catch (err) {
      console.warn("Live Gemini API call failed in heartbeat, falling back to deterministic agent runtime:", err);
    }
  }

  // Fallback to deterministic high-fidelity deliverable if not generated by API
  if (!artifactContent) {
    artifactContent = generateDeterministicDeliverable({
      ticket: candidateTicket,
      agent: assignee,
      company,
      goal,
    });
    tokensUsed = Math.floor(2800 + Math.random() * 1400);
  }

  const costUsd = Number(((tokensUsed * 0.000008)).toFixed(4));

  const newArtifact: TicketArtifact = {
    id: "art-" + Math.random().toString(36).slice(2, 9),
    title: artifactTitle,
    type: determineArtifactType(candidateTicket),
    content: artifactContent,
    createdAt: new Date().toISOString(),
    agentId: assignee.id,
    agentName: assignee.name,
    agentRole: assignee.title,
  };

  const artifactLog: TicketLogEntry = {
    id: "log-" + Math.random().toString(36).slice(2, 9),
    timestamp: new Date(Date.now() + 200).toISOString(),
    agentId: assignee.id,
    agentName: assignee.name,
    ticketId: candidateTicket.id,
    phase: "artifact",
    message: `Generated deliverable artifact "${artifactTitle}" (${Math.round(artifactContent.length / 5)} words). Attached to ticket.`,
  };
  newLogs.push(artifactLog);

  // Budget Audit Log
  const budgetLog: TicketLogEntry = {
    id: "log-" + Math.random().toString(36).slice(2, 9),
    timestamp: new Date(Date.now() + 300).toISOString(),
    agentId: assignee.id,
    agentName: assignee.name,
    ticketId: candidateTicket.id,
    phase: "budget_debit",
    message: `Audited token usage: ${tokensUsed.toLocaleString()} tokens ($${costUsd.toFixed(4)} USD) debited to ${assignee.name}'s balance.`,
  };
  newLogs.push(budgetLog);

  // Review Gate or Completion
  const finalStatus = candidateTicket.requiresHumanReview && !candidateTicket.reviewedByHuman ? "review" : "done";

  if (finalStatus === "review") {
    const reviewLog: TicketLogEntry = {
      id: "log-" + Math.random().toString(36).slice(2, 9),
      timestamp: new Date(Date.now() + 400).toISOString(),
      agentId: assignee.id,
      agentName: assignee.name,
      ticketId: candidateTicket.id,
      phase: "human_gate",
      message: `[Human Gate 🛡️] Ticket flagged for review. Awaiting C-suite / Founder sign-off before closure.`,
    };
    newLogs.push(reviewLog);
  } else {
    const doneLog: TicketLogEntry = {
      id: "log-" + Math.random().toString(36).slice(2, 9),
      timestamp: new Date(Date.now() + 400).toISOString(),
      agentId: assignee.id,
      agentName: assignee.name,
      ticketId: candidateTicket.id,
      phase: "sleep",
      message: `Task completed successfully. Returning ${assignee.name} to standby sleep state.`,
    };
    newLogs.push(doneLog);
  }

  // Update Ticket
  const updatedTicket: Ticket = {
    ...candidateTicket,
    status: finalStatus,
    checkedOutAt: candidateTicket.checkedOutAt || now,
    completedAt: finalStatus === "done" ? now : null,
    tokensUsed: (candidateTicket.tokensUsed || 0) + tokensUsed,
    costUsd: Number(((candidateTicket.costUsd || 0) + costUsd).toFixed(4)),
    artifacts: [newArtifact, ...(candidateTicket.artifacts || [])],
    logs: [...(candidateTicket.logs || []), ...newLogs.filter((l) => l.ticketId === candidateTicket.id)],
  };

  // Update Agent
  const updatedAgents = agents.map((a) => {
    if (a.id === assignee.id) {
      return {
        ...a,
        status: finalStatus === "review" ? ("review_gate" as const) : ("sleeping" as const),
        lastHeartbeatAt: now,
        spentBudgetUsd: Number((a.spentBudgetUsd + costUsd).toFixed(3)),
        tokensUsed: a.tokensUsed + tokensUsed,
        currentTicketId: finalStatus === "review" ? candidateTicket.id : null,
      };
    }
    return a;
  });

  // Update Company
  const updatedCompany: Company = {
    ...company,
    spentBudgetUsd: Number((company.spentBudgetUsd + costUsd).toFixed(3)),
  };

  const updatedTickets = tickets.map((t) => (t.id === candidateTicket.id ? updatedTicket : t));

  return {
    updatedAgents,
    updatedTickets,
    updatedCompany,
    newLogs,
    affectedTicket: updatedTicket,
  };
}

function determineArtifactType(ticket: Ticket): TicketArtifact["type"] {
  const t = ticket.title.toLowerCase();
  if (t.includes("price") || t.includes("cost") || t.includes("unit economics") || t.includes("ebitda")) {
    return "financial_model";
  }
  if (t.includes("market") || t.includes("entry") || t.includes("strategy") || t.includes("ansoff")) {
    return "strategy_deck";
  }
  if (t.includes("gtm") || t.includes("launch") || t.includes("growth") || t.includes("channel")) {
    return "gtm_playbook";
  }
  if (t.includes("code") || t.includes("architecture") || t.includes("spec") || t.includes("checkout")) {
    return "architecture_spec";
  }
  return "executive_memo";
}

function generateDeterministicDeliverable({
  ticket,
  agent,
  company,
  goal,
}: {
  ticket: Ticket;
  agent: Agent;
  company: Company;
  goal?: CompanyGoal;
}): string {
  return `### ${ticket.title}

**Author**: ${agent.name} (${agent.title})  
**Organization**: ${company.name}  
**Parent Goal**: ${goal ? goal.title : "Strategic Imperative"}  
**Date**: ${new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}  
**Classification**: Executive Working Deliverable

---

#### 1. Strategic Context & Root Cause Diagnosis
The mandate specified in ticket **${ticket.id}** requires rigorous tactical execution against our stated benchmark:
> *"${ticket.description}"*

Through our MECE analysis across both internal operating levers and external competitive dynamics, we identified that the core friction stems from misaligned unit incentives, fragmented channel distribution, and unoptimized resource batching.

---

#### 2. MECE Deconstruction Matrix

| Analytical Bucket | Baseline Metric | Root Diagnostic | Projected Recovery |
| :--- | :--- | :--- | :--- |
| **Direct Variable Costs** | 68% of Net Revenue | High peak-hour surge and unbundled courier/vendor fees | **-14% Reduction** via dynamic renegotiation |
| **Conversion & Funnel** | 2.1% blended conversion | Premature broad-funnel acquisition without segment-specific USP | **+35% Uplift** via focused ICP filtering |
| **Operational Throughput** | 42 min turnaround | Batching inefficiencies and sequential processing bottlenecks | **< 18 min** via parallel dispatch orchestration |
| **Capital & Margin Capture** | 12% gross contribution | Discount subsidies eroding product perceived value | **+8.5 pts** via tiered pricing gate |

---

#### 3. Core Strategic Interventions

1. **Immediate Value-Chain Rebalancing (Days 0–15)**:
   - Institute strict gating on sub-scale transaction sizes by introducing minimum order thresholds.
   - Renegotiate critical vendor master service agreements with volume rebates tied to quarterly tiers.

2. **Targeted ICP Segmentation & Channel Consolidation (Days 16–45)**:
   - Adhere strictly to the *"Be Selective"* rule: eliminate bottom-performing marketing channels and double down on the single highest ROAS acquisition route.
   - Align sales incentives directly with 12-month net retained revenue rather than top-line transaction volume.

3. **Automated Governance & Telemetry (Days 46–90)**:
   - Deploy automated audit alarms alerting leadership whenever variable contribution margin dips below target threshold.
   - Establish weekly executive review cadence for fast-track resolution of operational impediments.

---

#### 4. Phased 0–30–90 Day Execution Roadmap

\`\`\`
[Phase 1: 0-30 Days]
  ├── Deploy variable cost caps and freeze non-essential spend
  ├── Re-baseline unit contribution economics per product line
  └── Align key stakeholder reporting mechanisms

[Phase 2: 30-60 Days]
  ├── Launch revised customer segmentation & focused distribution test
  ├── Conduct midpoint review on SLA compliance and customer retention
  └── Refine pricing matrix based on price-elasticity feedback

[Phase 3: 60-90 Days]
  ├── Institutionalize optimized playbooks company-wide
  ├── Scale distribution across proven profitable segments
  └── Achieve full steady-state target profitability
\`\`\`

---

#### 5. Risk Assessment & Mitigations

- **Risk 1: Short-term Churn Resistance**: Introducing tighter margin controls may generate brief pushback from price-sensitive accounts.  
  *Mitigation*: Provide grandfathered transitional periods for key accounts while bundling high-perceived-value services.
- **Risk 2: Operational Execution Slip**: Frontline teams may revert to legacy habits during high-volume spikes.  
  *Mitigation*: Implement real-time dashboard telemetry with daily executive visibility.`;
}
