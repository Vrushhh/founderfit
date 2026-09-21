'use client';

import React from 'react';
import { CheckCircle2, ArrowRight, Cpu, Target, HelpCircle } from 'lucide-react';

interface HowItWorksProps {
  onStartAssessment: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartAssessment }) => {
  return (
    <section className="py-12 px-4 border-t border-[#252932]/60">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Simple 3-Step Process
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            How NEXTMOVE Works
          </h2>
          <p className="text-xs sm:text-sm text-[#9BA1AD] mt-1">
            No endless quizzes. No generic motivational fluff.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {/* Step 1 */}
          <div className="flex gap-4 items-start rounded-xl border border-[#252932] bg-[#121418] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 font-extrabold text-base border border-emerald-500/20">
              01
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Answer 10 Questions</h3>
              <p className="text-xs text-[#9BA1AD] mt-1 leading-relaxed">
                Tap-only assessment covering your current job, natural superpowers, available starting money, weekly time bandwidth, and appetite for sales.
              </p>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                <span>Takes under 3 minutes • 100% thumb-friendly</span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4 items-start rounded-xl border border-[#252932] bg-[#121418] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 font-extrabold text-base border border-emerald-500/20">
              02
            </div>
            <div>
              <h3 className="text-base font-bold text-white">We Analyze Your Profile</h3>
              <p className="text-xs text-[#9BA1AD] mt-1 leading-relaxed">
                Our deterministic scoring engine filters out unfeasible businesses (e.g. no high-capex stores if capital is ₹10k) and matches you to 8 core business archetypes.
              </p>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                <span>Calculates 8 business signals & profile fit score</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4 items-start rounded-xl border border-[#252932] bg-[#121418] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 font-extrabold text-base border border-emerald-500/20">
              03
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Get Your Personal Business Blueprint</h3>
              <p className="text-xs text-[#9BA1AD] mt-1 leading-relaxed">
                Receive your exact business recommendation, pricing model, first customer acquisition strategy, 7-day action sprint, and 30-day validation plan.
              </p>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                <span>Actionable execution plan • Directional & realistic</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onStartAssessment}
          className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-sm text-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all active:scale-[0.98] press-scale"
        >
          <span>Find My Business</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};
