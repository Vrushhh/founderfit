export type FrameworkId =
  | "profitability"
  | "market_entry"
  | "growth_strategy"
  | "pricing_strategy"
  | "gtm_launch"
  | "mna";

export interface FrameworkDefinition {
  id: FrameworkId;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  color: string;
  description: string;
  contextQuestions: string[];
  buckets: {
    name: string;
    description: string;
    subBuckets: string[];
  }[];
}

export interface TreeNode {
  id: string;
  label: string;
  type?: "root" | "category" | "branch" | "leaf";
  description?: string;
  status?: "critical" | "neutral" | "positive";
  children?: TreeNode[];
}

export interface ConsultingCaseInput {
  companyName: string;
  industry?: string;
  problemStatement: string;
  geography?: string;
  frameworkId?: FrameworkId | "auto";
  customNotes?: string;
  apiKey?: string;
}

export interface ConsultingSolution {
  id: string;
  createdAt: string;
  companyName: string;
  industry: string;
  geography: string;
  problemStatement: string;
  framework: FrameworkDefinition;
  executiveSummary: string;
  contextAnalysis: {
    question: string;
    assessment: string;
  }[];
  tree: TreeNode;
  bucketFindings: {
    bucketName: string;
    keyInsights: string[];
    actionItems: string[];
  }[];
  recommendations: {
    priority: "Immediate (Week 1-4)" | "Medium-Term (Month 2-3)" | "Strategic (Month 3-6)";
    title: string;
    impact: "High" | "Medium";
    effort: "Low" | "Medium" | "High";
    description: string;
    metricTarget: string;
  }[];
  roadmap: {
    phase: string;
    timeframe: string;
    deliverables: string[];
  }[];
  risksAndMitigations: {
    risk: string;
    category: "Operational" | "Regulatory" | "Competitor" | "Financial";
    severity: "High" | "Medium" | "Low";
    mitigation: string;
  }[];
}
