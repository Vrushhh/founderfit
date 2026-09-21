'use client';

import React from 'react';
import { FileText, CheckCircle2, ShieldAlert, Sparkles, TrendingUp, DollarSign, Calendar, Target } from 'lucide-react';

export const BlueprintPreview: React.FC = () => {
  return (
    <section className="py-12 px-4 border-t border-[#252932]/60 bg-[#0E1014]/60">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Actionable Deliverable
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            What You Actually Get
          </h2>
          <p className="text-xs sm:text-sm text-[#9BA1AD] mt-1">
            Not a vague 1-paragraph quiz summary. A complete execution blueprint.
          </p>
        </div>

        {/* Blueprint Visual Document Card */}
        <div className="rounded-2xl border border-emerald-500/30 bg-[#121418] p-5 shadow-2xl relative overflow-hidden">
          {/* Top Document Header */}
          <div className="flex items-center justify-between border-b border-[#252932] pb-4 mb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Official Deliverable
              </span>
              <h3 className="text-base font-extrabold text-white">YOUR BUSINESS BLUEPRINT</h3>
            </div>
            <div className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
              ₹299 One-Time
            </div>
          </div>

          {/* Key Blueprint Sections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3 flex items-start gap-2.5">
              <Target className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">1. Primary Business</span>
                <span className="text-[#9BA1AD]">The exact model matching your skills & constraints.</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3 flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">2. Why It Fits You</span>
                <span className="text-[#9BA1AD]">4 personalized reasons based on your answers.</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3 flex items-start gap-2.5">
              <TrendingUp className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">3. Business Model</span>
                <span className="text-[#9BA1AD]">How the mechanics work day-to-day.</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3 flex items-start gap-2.5">
              <DollarSign className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">4. Starting Capital</span>
                <span className="text-[#9BA1AD]">Realistic approximate INR budget needed.</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3 flex items-start gap-2.5">
              <Target className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">5. First Customer Strategy</span>
                <span className="text-[#9BA1AD]">Where to find client #1 without ad spend.</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3 flex items-start gap-2.5">
              <DollarSign className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">6. How to Charge</span>
                <span className="text-[#9BA1AD]">Exact retainer, project, or unit pricing.</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3 flex items-start gap-2.5">
              <Calendar className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">7. First 7 Days</span>
                <span className="text-[#9BA1AD]">7 concrete daily actions to launch your pilot.</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3 flex items-start gap-2.5">
              <Calendar className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">8. First 30 Days</span>
                <span className="text-[#9BA1AD]">4-week validation roadmap to first rupee.</span>
              </div>
            </div>
          </div>

          {/* What to Avoid Highlight */}
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-950/10 p-3 flex items-start gap-2.5">
            <ShieldAlert className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-red-300 block">9. What To Avoid</span>
              <span className="text-[#9BA1AD]">
                2-3 common business models that look attractive but are catastrophic traps for your current time & capital profile.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
