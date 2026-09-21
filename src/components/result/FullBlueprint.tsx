'use client';

import React, { useState } from 'react';
import { AssessmentResult } from '@/lib/types';
import { ScoreSignalsCard } from './ScoreSignalsCard';
import {
  CheckCircle2,
  AlertTriangle,
  Share2,
  Copy,
  Check,
  Calendar,
  Clock,
  DollarSign,
  Briefcase,
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';
import { analyticsService } from '@/lib/services/analyticsService';

interface FullBlueprintProps {
  result: AssessmentResult;
  onRetake: () => void;
}

export const FullBlueprint: React.FC<FullBlueprintProps> = ({ result, onRetake }) => {
  const { primaryBlueprint, alternativeBlueprint, primaryArchetype, signals } = result;
  const [copied, setCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = async () => {
    analyticsService.track('share_clicked', { business: primaryBlueprint.name });

    const shareData = {
      title: 'My NEXTMOVE Business Blueprint',
      text: `My recommended business to test: ${primaryBlueprint.name} (Profile Fit: ${primaryBlueprint.fitScore}/100). Validating before quitting corporate life!`,
      url: typeof window !== 'undefined' ? window.location.href : 'https://founderfit.store'
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch {
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto py-6 px-4 animate-fadeIn">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Unlocked Personalized Blueprint</span>
        </div>

        <button
          onClick={onRetake}
          className="text-xs text-[#9BA1AD] hover:text-white underline transition-colors"
        >
          Retake Assessment
        </button>
      </div>

      {/* RESULT HEADER */}
      <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-b from-[#121418] to-[#0D0F12] p-6 shadow-2xl mb-6">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
          Your Business To Investigate Next
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-3">
          {primaryBlueprint.name}
        </h1>
        <p className="text-xs sm:text-sm text-[#9BA1AD] leading-relaxed mb-4">
          {primaryBlueprint.tagline}
        </p>

        <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#252932]">
          <div className="rounded-xl bg-[#16181E] p-3 border border-[#252932]">
            <span className="text-[10px] text-[#9BA1AD] uppercase block font-medium">
              Profile Fit
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl font-black text-emerald-400">
                {primaryBlueprint.fitScore}
              </span>
              <span className="text-xs text-[#9BA1AD]">/ 100</span>
            </div>
            <span className="text-[10px] text-[#656C7A]">Algorithmic profile alignment</span>
          </div>

          <div className="rounded-xl bg-[#16181E] p-3 border border-[#252932]">
            <span className="text-[10px] text-[#9BA1AD] uppercase block font-medium">
              Business Archetype
            </span>
            <span className="text-sm font-bold text-white mt-1 block truncate">
              {primaryArchetype.name}
            </span>
            <span className="text-[10px] text-emerald-400">{primaryArchetype.tagline}</span>
          </div>
        </div>
      </div>

      {/* SHAREABLE RESULT CARD (Optimized for screenshotting on mobile) */}
      <div className="mb-6 rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-br from-[#16181E] via-[#0E1014] to-[#0A0B0D] p-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between border-b border-[#252932] pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-emerald-500 font-bold text-black text-xs flex items-center justify-center">
              NM
            </div>
            <span className="font-extrabold tracking-tight text-white text-sm">NEXTMOVE</span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
            Verified Blueprint
          </span>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <span className="text-[10px] text-[#9BA1AD] uppercase block font-medium">YOUR BUSINESS</span>
            <h3 className="text-lg font-black text-white">{primaryBlueprint.name}</h3>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#121418] p-2.5 rounded-lg border border-[#252932]">
              <span className="text-[10px] text-[#9BA1AD] block">Profile Fit</span>
              <span className="font-bold text-emerald-400">{primaryBlueprint.fitScore} / 100</span>
            </div>
            <div className="bg-[#121418] p-2.5 rounded-lg border border-[#252932]">
              <span className="text-[10px] text-[#9BA1AD] block">Capital</span>
              <span className="font-bold text-white">{primaryBlueprint.capitalRange}</span>
            </div>
            <div className="bg-[#121418] p-2.5 rounded-lg border border-[#252932]">
              <span className="text-[10px] text-[#9BA1AD] block">Time Commitment</span>
              <span className="font-bold text-white">{primaryBlueprint.timeCommitment}</span>
            </div>
            <div className="bg-[#121418] p-2.5 rounded-lg border border-[#252932]">
              <span className="text-[10px] text-[#9BA1AD] block">Business Type</span>
              <span className="font-bold text-white">{primaryBlueprint.businessType}</span>
            </div>
          </div>

          <div className="bg-[#121418] p-2.5 rounded-lg border border-[#252932] text-xs">
            <span className="text-[10px] text-[#9BA1AD] block">First Goal</span>
            <span className="font-bold text-emerald-300">{primaryBlueprint.firstTarget}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-[#252932] flex items-center justify-between">
          <span className="text-[11px] font-semibold text-emerald-400">
            “Your next move: validate it before you quit.”
          </span>
        </div>

        {/* Share / Copy Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleShare}
            className="flex-1 h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-1.5 transition-all press-scale"
          >
            <Share2 className="h-4 w-4" />
            <span>{shareSuccess ? 'Shared!' : 'Share Your Result'}</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="h-11 px-4 rounded-xl border border-[#252932] bg-[#121418] hover:bg-[#16181E] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all press-scale"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied Link' : 'Copy Link'}</span>
          </button>
        </div>
      </div>

      {/* WHY THIS FITS YOU */}
      <div className="rounded-2xl border border-[#252932] bg-[#121418] p-5 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          <span>Why This Fits You</span>
        </h3>
        <div className="space-y-2.5">
          {primaryBlueprint.whyThisFitsYou.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CAD0DB]">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-[10px] mt-0.5">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* YOUR BUSINESS MODEL */}
      <div className="rounded-2xl border border-[#252932] bg-[#121418] p-5 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
          <Briefcase className="h-4 w-4 text-emerald-400" />
          <span>Your Business Model</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#9BA1AD] leading-relaxed">
          {primaryBlueprint.businessModelExplanation}
        </p>
      </div>

      {/* WHO TO SELL TO */}
      <div className="rounded-2xl border border-[#252932] bg-[#121418] p-5 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
          <Target className="h-4 w-4 text-emerald-400" />
          <span>Who To Sell To</span>
        </h3>
        <div className="space-y-2.5">
          {primaryBlueprint.targetCustomerTypes.map((cust, idx) => (
            <div key={idx} className="rounded-xl border border-[#252932] bg-[#16181E] p-3 text-xs">
              <span className="font-bold text-white block mb-0.5">{cust.title}</span>
              <span className="text-[#9BA1AD] leading-relaxed block">{cust.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* STARTING CAPITAL & PRICING */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <div className="rounded-2xl border border-[#252932] bg-[#121418] p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9BA1AD] block mb-1">
            STARTING CAPITAL
          </span>
          <span className="text-base font-extrabold text-white block">
            {primaryBlueprint.capitalRange}
          </span>
          <span className="text-[11px] text-[#656C7A] mt-1 block">
            Covers domain, basic no-code tools & initial outreach.
          </span>
        </div>

        <div className="rounded-2xl border border-[#252932] bg-[#121418] p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#9BA1AD] block mb-1">
            TIME COMMITMENT
          </span>
          <span className="text-base font-extrabold text-white block">
            {primaryBlueprint.timeCommitment}
          </span>
          <span className="text-[11px] text-[#656C7A] mt-1 block">
            Structured for evenings & weekend mornings.
          </span>
        </div>
      </div>

      {/* YOUR FIRST OFFER & PRICING MODEL */}
      <div className="rounded-2xl border border-[#252932] bg-[#121418] p-5 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-emerald-400" />
          <span>Your First Offer & Pricing</span>
        </h3>
        <div className="space-y-3 text-xs">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3">
            <span className="text-[10px] font-bold text-emerald-400 uppercase block mb-1">
              SPECIFIC EXAMPLE OFFER
            </span>
            <p className="text-white leading-relaxed">{primaryBlueprint.exampleOffer}</p>
          </div>

          <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3">
            <span className="text-[10px] font-bold text-[#9BA1AD] uppercase block mb-1">
              RECOMMENDED PRICING
            </span>
            <p className="text-white leading-relaxed">{primaryBlueprint.pricingModel}</p>
          </div>
        </div>
      </div>

      {/* FIRST CUSTOMER STRATEGY */}
      <div className="rounded-2xl border border-[#252932] bg-[#121418] p-5 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-2 flex items-center gap-2">
          <Target className="h-4 w-4 text-emerald-400" />
          <span>Where Your First Customer Comes From</span>
        </h3>
        <p className="text-xs sm:text-sm text-[#CAD0DB] leading-relaxed bg-[#16181E] p-3.5 rounded-xl border border-[#252932]">
          {primaryBlueprint.firstCustomerStrategy}
        </p>
      </div>

      {/* FIRST 7 DAYS: QUICK LAUNCH SPRINT */}
      <div className="rounded-2xl border border-[#252932] bg-[#121418] p-5 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-emerald-400" />
          <span>First 7 Days: Launch Sprint</span>
        </h3>
        <p className="text-xs text-[#9BA1AD] mb-4">
          One single concrete execution action each day while keeping your day job.
        </p>

        <div className="space-y-2.5">
          {primaryBlueprint.first7Days.map((step) => (
            <div
              key={step.day}
              className="flex items-start gap-3 rounded-xl border border-[#252932] bg-[#16181E] p-3 text-xs"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 font-bold text-emerald-400 text-xs">
                D{step.day}
              </div>
              <div>
                <span className="font-bold text-white block">{step.task}</span>
                <span className="text-[#9BA1AD] mt-0.5 block leading-relaxed">{step.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FIRST 30 DAYS: VALIDATION ROADMAP */}
      <div className="rounded-2xl border border-[#252932] bg-[#121418] p-5 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-1 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-emerald-400" />
          <span>First 30 Days: Validation Plan</span>
        </h3>
        <p className="text-xs text-[#9BA1AD] mb-4">
          Four 1-week milestones designed to take you from zero to your first paying client.
        </p>

        <div className="space-y-3">
          {primaryBlueprint.first30Days.map((phase) => (
            <div key={phase.week} className="rounded-xl border border-[#252932] bg-[#16181E] p-3.5 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-emerald-400 uppercase text-[11px]">
                  Week {phase.week}: {phase.focus}
                </span>
              </div>
              <div className="space-y-1">
                {phase.deliverables.map((del, dIdx) => (
                  <div key={dIdx} className="flex items-center gap-2 text-[#CAD0DB]">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT TO AVOID */}
      <div className="rounded-2xl border border-red-500/30 bg-[#121418] p-5 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-red-400" />
          <span>What To Avoid (Failure Traps)</span>
        </h3>
        <p className="text-xs text-[#9BA1AD] mb-3">
          These models look enticing on social media, but are toxic for your current profile.
        </p>

        <div className="space-y-2.5">
          {primaryBlueprint.whatToAvoid.map((avoid, idx) => (
            <div key={idx} className="rounded-xl border border-red-500/20 bg-red-950/10 p-3 text-xs">
              <span className="font-bold text-red-300 block mb-0.5">{avoid.model}</span>
              <span className="text-[#CAD0DB] leading-relaxed block">{avoid.reason}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ALTERNATIVE BUSINESS */}
      <div className="rounded-2xl border border-[#252932] bg-[#121418] p-5 mb-6">
        <div className="flex items-center justify-between border-b border-[#252932] pb-3 mb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#9BA1AD]">
              SECONDARY BACKUP OPTION
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              {alternativeBlueprint.name}
            </h3>
          </div>
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Fit: {alternativeBlueprint.fitScore} / 100
          </span>
        </div>
        <p className="text-xs text-[#9BA1AD] leading-relaxed mb-3">
          {alternativeBlueprint.businessModelExplanation}
        </p>
        <div className="text-xs bg-[#16181E] p-3 rounded-xl border border-[#252932]">
          <strong className="text-white">Sample Offer:</strong>{' '}
          <span className="text-[#CAD0DB]">{alternativeBlueprint.exampleOffer}</span>
        </div>
      </div>

      {/* PROFILE SIGNALS BREAKDOWN */}
      <ScoreSignalsCard signals={signals} />

      {/* VALIDATE BEFORE YOU QUIT BANNER */}
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-center mb-8">
        <div className="flex justify-center mb-2">
          <ShieldCheck className="h-6 w-6 text-emerald-400" />
        </div>
        <h4 className="text-base font-bold text-white mb-1">
          Validate Before You Quit
        </h4>
        <p className="text-xs text-[#9BA1AD] leading-relaxed max-w-sm mx-auto">
          Your profile suggests this business is worth testing. Use the next 30 days to close your first paying client while keeping your regular paycheck intact.
        </p>
      </div>

      {/* Retake or Share */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleShare}
          className="flex-1 h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-sm text-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all press-scale"
        >
          <Share2 className="h-4 w-4" />
          <span>Share Blueprint</span>
        </button>

        <button
          onClick={onRetake}
          className="h-12 px-6 rounded-xl border border-[#252932] bg-[#121418] hover:bg-[#16181E] text-white font-semibold text-xs transition-all press-scale"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};
