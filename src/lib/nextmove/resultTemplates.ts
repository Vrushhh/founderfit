import type { Business, QuestionOption } from "./types";

export function formatINR(n: number) {
  if (n >= 100000) return `₹${n / 100000} lakh`;
  return `₹${n.toLocaleString("en-IN")}`;
}

export function hoursLabel(h: number) {
  return h >= 40 ? "almost full time" : `${h} hours a week`;
}

interface Facts {
  capital: number;
  hours: number;
  salesComfort: number;
  incomeTarget: number;
  preference: string;
  profession: string;
}

const salesLine = [
  "you would rather not sell, so this model leads with proof and inbound instead of cold pitching",
  "you are willing to learn selling, and this business lets you start with warm conversations",
  "you are comfortable in sales conversations, which is exactly where this business earns",
  "you enjoy selling, and here every conversation can turn into revenue quickly",
];

const prefLine: Record<string, string> = {
  online: "you want an online business, and this runs from a laptop and a phone",
  local: "you want a business in your own city, and this has real local demand",
  service: "you prefer a service business, where the first rupee arrives before any product exists",
  product: "you are drawn to products, and this gives you something of your own to sell",
  agency: "you like the agency model, and this is built on retainers rather than one-off work",
  content: "you want a content-led business, and your output here compounds over time",
  tech: "you lean towards technology, and this uses your technical judgement directly",
  unsure: "you are still unsure which model suits you, so this starts small enough to test cheaply",
};

/** 4 personalised reasons, built from the actual answers. */
export function buildReasons(business: Business, f: Facts, selected: QuestionOption[]): string[] {
  const skill = selected[1]?.label?.toLowerCase();
  const energy = selected[2]?.label?.toLowerCase();
  const frustration = selected[3]?.label?.toLowerCase();
  const value = selected[9]?.label?.toLowerCase();

  const reasons = [
    `You work in ${f.profession}${skill ? ` and you are already good at ${skill}` : ""} — this business uses that instead of asking you to start from zero.`,
    `${capitalise(prefLine[f.preference] ?? prefLine["unsure"] ?? "")}.`,
    `With ${formatINR(f.capital)} to put in and ${hoursLabel(f.hours)}, you can start this without touching your salary or your savings buffer.`,
    `You said ${salesLine[Math.min(3, Math.max(0, f.salesComfort))]}.`,
  ];

  if (energy) reasons.push(`The daily work here is mostly ${energy}, which is what gives you energy.`);
  if (frustration) reasons.push(`It moves you away from ${frustration}, which is your biggest frustration at work today.`);
  if (value) reasons.push(`Your priority is ${value}, and this model can deliver that at ${formatINR(f.incomeTarget)} a month before you make any career decision.`);

  return reasons.slice(0, 4);
}

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const disclaimer =
  "These recommendations are directional, based only on the answers you gave. They are business profile signals, not a psychological assessment, and business outcomes are never guaranteed. Use the next 30 days to validate demand before making any career decision.";
