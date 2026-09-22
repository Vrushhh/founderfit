import { archetypes } from "./archetypes";
import { businesses } from "./businesses";
import { scoreAnswers } from "./scoring";
import { buildReasons } from "./resultTemplates";
import type { Answers, ArchetypeId, Blueprint, Business } from "./types";

interface Facts {
  capital: number;
  hours: number;
  salesComfort: number;
  incomeTarget: number;
  preference: string;
  profession: string;
}

function feasible(b: Business, f: Facts) {
  return f.capital >= b.reqCapital && f.hours >= b.reqHours && f.salesComfort >= b.reqSales;
}

function businessScore(b: Business, f: Facts, archScore: number) {
  let s = archScore * 2;
  if (b.prefs.includes(f.preference)) s += 26;
  // reward the business that uses the capital/time the person actually has,
  // without demanding more than they have
  s += Math.max(0, 14 - Math.log10(Math.max(1, f.capital / Math.max(b.reqCapital, 1))) * 8);
  s += b.reqHours <= f.hours ? 10 : -40;
  s += b.reqSales <= f.salesComfort ? 8 : -30;
  if (f.incomeTarget >= 200000 && b.type === "Product") s += 8;
  if (f.incomeTarget <= 50000 && b.type === "Service") s += 8;
  if (f.capital <= 25000 && b.reqCapital <= 25000) s += 12;
  if (f.hours <= 5 && b.reqHours <= 5) s += 14;
  return s;
}

function pick(archId: ArchetypeId, f: Facts, archScore: number, exclude: string[]): Business | undefined {
  const pool = businesses.filter((b) => b.archetype === archId && !exclude.includes(b.id));
  const ok = pool.filter((b) => feasible(b, f));
  const list = ok.length ? ok : pool;
  return [...list].sort((a, b) => businessScore(b, f, archScore) - businessScore(a, f, archScore))[0];
}

function globalBest(f: Facts, scores: Record<ArchetypeId, number>, exclude: string[]) {
  const pool = businesses.filter((b) => !exclude.includes(b.id) && feasible(b, f));
  const list = pool.length ? pool : businesses.filter((b) => !exclude.includes(b.id));
  return [...list].sort(
    (a, b) => businessScore(b, f, scores[b.archetype]) - businessScore(a, f, scores[a.archetype]),
  )[0];
}

export function generateBlueprint(answers: Answers): Blueprint {
  const { archetypeScores, ranked, signals, facts, selectedOptions } = scoreAnswers(answers);
  const first = ranked[0] as ArchetypeId;
  const second = (ranked[1] ?? ranked[0]) as ArchetypeId;

  let primary = pick(first, facts, archetypeScores[first], []);
  if (!primary || !feasible(primary, facts)) {
    primary = globalBest(facts, archetypeScores, []) ?? primary!;
  }

  let alternative =
    pick(second, facts, archetypeScores[second], [primary.id]) ??
    globalBest(facts, archetypeScores, [primary.id]);
  if (!alternative || alternative.id === primary.id) {
    alternative = globalBest(facts, archetypeScores, [primary.id])!;
  }

  const top = archetypeScores[primary.archetype];
  const constraintBonus = feasible(primary, facts) ? 8 : 0;
  const prefBonus = primary.prefs.includes(facts.preference) ? 6 : 0;
  const fit = Math.max(64, Math.min(96, Math.round(56 + top * 0.26 + constraintBonus + prefBonus + signals.independence * 0.06)));

  return {
    primary,
    alternative,
    archetype: archetypes[primary.archetype],
    altArchetype: archetypes[alternative.archetype],
    fit,
    signals,
    reasons: buildReasons(primary, facts, selectedOptions),
    facts,
  };
}
