'use client';

import React from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface FinalCTAProps {
  onStartAssessment: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartAssessment }) => {
  return (
    <section className="py-14 px-4 border-t border-[#252932]/60 relative overflow-hidden">
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.15)_0%,transparent_65%)]" />

      <div className="relative mx-auto max-w-xl text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
          Your FounderFit shouldn’t be a guess.
        </h2>
        <p className="text-sm sm:text-base text-[#9BA1AD] leading-relaxed mb-6 max-w-md mx-auto">
          Validate before you quit. Spend 3 minutes and ₹299 to get an objective business blueprint tailored to your skills and budget.
        </p>

        <div className="rounded-2xl border border-emerald-500/30 bg-[#121418] p-5 shadow-2xl backdrop-blur-md">
          <button
            onClick={onStartAssessment}
            className="w-full h-14 rounded-xl bg-emerald-500 hover:bg-emerald-400 font-bold text-base text-black flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all active:scale-[0.98] press-scale"
          >
            <span>Find My Business — ₹299</span>
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-[#9BA1AD]">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>100% deterministic • Instant digital access</span>
          </div>
        </div>
      </div>
    </section>
  );
};
