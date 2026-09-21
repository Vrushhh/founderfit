'use client';

import React from 'react';
import { AssessmentResult } from '@/lib/types';
import {
  Lock,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target,
  DollarSign,
  Calendar,
  AlertTriangle,
  Eye,
  Check
} from 'lucide-react';

interface ResultPreviewGateProps {
  result: AssessmentResult;
  onUnlock: () => void;
}

export const ResultPreviewGate: React.FC<ResultPreviewGateProps> = ({
  result,
  onUnlock
}) => {
  const { primaryArchetype, primaryBlueprint, userSummary } = result;

  // First personalized reason shown for free as high-converting preview proof
  const freeReason = primaryBlueprint.whyThisFitsYou[0] ||
    `Tailored specifically to your current background in ${userSummary.currentRole}.`;

  return (
    <div className="w-full max-w-xl mx-auto py-6 px-4 pb-28 animate-fadeIn">
      {/* Top Banner */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-3">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Profile Analysis Complete</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          Your Business Blueprint is ready.
        </h1>
        <p className="text-xs sm:text-sm text-[#9BA1AD] mt-1.5 max-w-md mx-auto">
          Based on your skills in <span className="text-white font-semibold">{userSummary.currentRole}</span> and available time of <span className="text-white font-semibold">{userSummary.availableTime}</span>.
        </p>
      </div>

      {/* REVEALED TEASER: Archetype & Fit Score */}
      <div className="rounded-2xl border border-emerald-500/30 bg-[#121418] p-5 shadow-2xl mb-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start justify-between border-b border-[#252932] pb-4 mb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              YOUR PRIMARY BUSINESS ARCHETYPE
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              {primaryArchetype.name}
            </h2>
            <span className="text-xs text-emerald-300/90 font-medium block mt-0.5">
              {primaryArchetype.tagline}
            </span>
          </div>

          <div className="text-right bg-[#16181E] px-3.5 py-2 rounded-xl border border-[#252932] shrink-0 ml-2">
            <span className="text-[10px] text-[#9BA1AD] uppercase block font-semibold">
              Profile Fit
            </span>
            <div className="flex items-baseline gap-0.5 justify-end">
              <span className="text-xl sm:text-2xl font-black text-emerald-400">
                {primaryBlueprint.fitScore}
              </span>
              <span className="text-xs text-[#9BA1AD]">/100</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#CAD0DB] leading-relaxed mb-4">
          {primaryArchetype.description}
        </p>

        {/* 1 Free Unlocked Reason */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3 flex items-start gap-2.5 text-xs">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5">
            <Check className="h-3.5 w-3.5 stroke-[3]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
              PREVIEW INSIGHT #1 (UNLOCKED)
            </span>
            <p className="text-white leading-relaxed font-medium">
              {freeReason}
            </p>
          </div>
        </div>
      </div>

      {/* PARTIALLY VISIBLE / BLURRED BLUEPRINT PREVIEW */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#9BA1AD] flex items-center gap-1.5">
            <Eye className="h-3.5 w-3.5 text-emerald-400" />
            <span>Blueprint Document Preview</span>
          </span>
          <span className="text-[11px] font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20 flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>Locked Behind ₹299</span>
          </span>
        </div>

        {/* Blurred Card 1: Specific Business Recommendation */}
        <div className="relative rounded-2xl border border-[#252932] bg-[#121418] p-5 overflow-hidden">
          {/* Background Blurred Content */}
          <div className="filter blur-md select-none pointer-events-none opacity-50 space-y-2">
            <span className="text-xs font-bold uppercase text-[#9BA1AD]">RECOMMENDED BUSINESS MODEL</span>
            <h3 className="text-xl font-bold text-white">{primaryBlueprint.name}</h3>
            <p className="text-xs text-[#CAD0DB]">{primaryBlueprint.businessModelExplanation}</p>
            <div className="flex gap-2 pt-2">
              <span className="px-3 py-1 bg-neutral-800 rounded text-xs text-white">Capital: {primaryBlueprint.capitalRange}</span>
              <span className="px-3 py-1 bg-neutral-800 rounded text-xs text-white">Time: {primaryBlueprint.timeCommitment}</span>
            </div>
          </div>

          {/* Frosted Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#121418]/60 via-[#121418]/85 to-[#121418] flex flex-col items-center justify-center p-4 text-center">
            <div className="h-9 w-9 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-1.5 shadow-lg">
              <Lock className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-white">
              Specific Business Model & Name
            </span>
            <p className="text-xs text-[#9BA1AD] max-w-xs mt-0.5">
              Reveals the single high-probability Indian market business matched to your {userSummary.currentRole} background.
            </p>
          </div>
        </div>

        {/* Blurred Card 2: First Offer & First Customer Strategy */}
        <div className="relative rounded-2xl border border-[#252932] bg-[#121418] p-5 overflow-hidden">
          <div className="filter blur-md select-none pointer-events-none opacity-50 space-y-2">
            <span className="text-xs font-bold uppercase text-[#9BA1AD]">FIRST OFFER & PRICING</span>
            <p className="text-xs text-white font-medium">{primaryBlueprint.exampleOffer}</p>
            <p className="text-xs text-[#CAD0DB]">{primaryBlueprint.pricingModel}</p>
            <div className="p-2 bg-neutral-800 rounded text-xs text-white">First Customer: {primaryBlueprint.firstCustomerStrategy}</div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-[#121418]/60 via-[#121418]/85 to-[#121418] flex flex-col items-center justify-center p-4 text-center">
            <div className="h-9 w-9 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-1.5 shadow-lg">
              <Lock className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-white">
              First Offer, Pricing & First Customer Source
            </span>
            <p className="text-xs text-[#9BA1AD] max-w-xs mt-0.5">
              Exact pricing numbers, customer types to target, and how to get client #1 with zero ad spend.
            </p>
          </div>
        </div>

        {/* Blurred Card 3: 7-Day Sprint & 30-Day Plan */}
        <div className="relative rounded-2xl border border-[#252932] bg-[#121418] p-5 overflow-hidden">
          <div className="filter blur-md select-none pointer-events-none opacity-50 space-y-2">
            <span className="text-xs font-bold uppercase text-[#9BA1AD]">7-DAY SPRINT & 30-DAY VALIDATION</span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-neutral-800 p-2 rounded">Day 1: Setup</div>
              <div className="bg-neutral-800 p-2 rounded">Day 2: Scripting</div>
              <div className="bg-neutral-800 p-2 rounded">Day 3: Loom pitch</div>
              <div className="bg-neutral-800 p-2 rounded">Day 4: Outreach</div>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-[#121418]/60 via-[#121418]/85 to-[#121418] flex flex-col items-center justify-center p-4 text-center">
            <div className="h-9 w-9 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mb-1.5 shadow-lg">
              <Lock className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-white">
              7-Day Launch Sprint & 30-Day Validation Plan
            </span>
            <p className="text-xs text-[#9BA1AD] max-w-xs mt-0.5">
              Day-by-day actions for your evenings and 4 weekly milestones to first revenue.
            </p>
          </div>
        </div>

        {/* Blurred Card 4: What to Avoid */}
        <div className="relative rounded-2xl border border-red-500/20 bg-[#121418] p-4 overflow-hidden">
          <div className="filter blur-md select-none pointer-events-none opacity-40 space-y-1 text-xs">
            <span className="text-red-400 font-bold">FAILURE TRAPS FOR YOUR PROFILE</span>
            <p className="text-white">Generic dropshipping, heavy inventory capex, unvalidated code</p>
          </div>

          <div className="absolute inset-0 bg-[#121418]/85 flex items-center justify-center gap-2 px-4 text-center">
            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
            <span className="text-xs font-semibold text-white">
              🔒 2 Critical Failure Traps to Avoid (Locked)
            </span>
          </div>
        </div>
      </div>

      {/* UNLOCK CALL TO ACTION SECTION */}
      <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-[#16181E] to-[#0E1014] p-5 sm:p-6 shadow-2xl relative">
        <div className="flex items-baseline justify-between mb-4 border-b border-[#252932] pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Unlock Your Complete Blueprint
            </h3>
            <span className="text-xs text-[#9BA1AD]">
              Instant digital access • 100% personalized
            </span>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400">₹299</span>
              <span className="text-xs text-[#9BA1AD] line-through">₹999</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold block uppercase">
              70% OFF LAUNCH
            </span>
          </div>
        </div>

        {/* What is Unlocked Checkpoints */}
        <div className="space-y-2 mb-6 text-xs text-[#CAD0DB]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span><strong>Primary business recommendation</strong> for the Indian market</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span><strong>All 4 personalized reasons</strong> why this matches your profile</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span><strong>Business model explanation</strong> & target customer profiles</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span><strong>Starting capital range</strong> & weekly time commitment</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span><strong>First customer acquisition strategy</strong> (without spending on ads)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span><strong>Example service offer</strong> & recommended pricing model</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span><strong>7-day launch sprint</strong> (one actionable step per day)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span><strong>30-day validation roadmap</strong> to land your first client</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span><strong>What to avoid:</strong> 2 business models that would drain your money</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span><strong>Alternative backup business</strong> model</span>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onUnlock}
          className="w-full h-14 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-extrabold text-base text-black flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all active:scale-[0.98] press-scale"
        >
          <span>Unlock My Blueprint — ₹299</span>
          <ArrowRight className="h-5 w-5" />
        </button>

        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-[#9BA1AD]">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          <span>Secure Indian Checkout (Google Pay, PhonePe, Paytm, Cards)</span>
        </div>
      </div>

      {/* STICKY BOTTOM MOBILE UNLOCK BAR */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-3 bg-[#0A0B0D]/95 border-t border-[#252932] backdrop-blur-md sm:hidden">
        <div className="flex items-center justify-between gap-3 max-w-xl mx-auto">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-white">₹299</span>
              <span className="text-[10px] text-[#9BA1AD] line-through">₹999</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold block">Full Blueprint</span>
          </div>

          <button
            onClick={onUnlock}
            className="flex-1 h-11 rounded-xl bg-emerald-500 active:bg-emerald-400 font-bold text-xs text-black flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] press-scale"
          >
            <span>Unlock My Blueprint</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
