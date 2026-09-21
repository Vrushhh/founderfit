'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Zap, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onStartAssessment: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartAssessment }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-16 px-4">
      {/* Subtle radial emerald background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12)_0%,transparent_70%)]" />

      <div className="relative mx-auto max-w-xl text-center">
        {/* Urgent Context Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>For Indian IT & Corporate Professionals</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight mb-2">
          Having difficult days at your desk job?
        </h1>

        {/* Secondary Headline */}
        <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-emerald-400 leading-snug mb-4">
          Confused about what to do next?
        </h2>

        {/* Supporting Copy */}
        <p className="text-sm sm:text-base text-[#9BA1AD] leading-relaxed mb-6 max-w-md mx-auto">
          You know you want something of your own. You just don’t know what business actually fits your skills, experience, and risk appetite.
        </p>

        {/* High Conversion Mobile First CTA Card */}
        <div className="rounded-2xl border border-[#252932] bg-[#121418]/90 p-4 sm:p-5 shadow-2xl backdrop-blur-md mb-6">
          <button
            onClick={onStartAssessment}
            className="w-full h-14 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-base text-black flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all active:scale-[0.98] press-scale"
          >
            <span>Find My Business</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Under CTA details */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-[#9BA1AD]">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5 text-emerald-400" />
              10 questions
            </span>
            <span>•</span>
            <span>Personalized blueprint</span>
            <span>•</span>
            <span className="text-white font-semibold">₹299</span>
          </div>
        </div>

        {/* Realistic Indian Office Reality Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-left text-xs text-[#9BA1AD] max-w-lg mx-auto">
          <div className="flex items-center gap-2 rounded-lg border border-[#252932]/60 bg-[#16181E]/60 p-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>No generic career quiz</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-[#252932]/60 bg-[#16181E]/60 p-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Test before you quit</span>
          </div>
          <div className="col-span-2 sm:col-span-1 flex items-center gap-2 rounded-lg border border-[#252932]/60 bg-[#16181E]/60 p-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>Indian market models</span>
          </div>
        </div>
      </div>
    </section>
  );
};
