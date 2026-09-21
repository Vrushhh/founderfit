'use client';

import React from 'react';
import { AlertCircle, Flame, Compass, ArrowDown } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-10 px-4 border-t border-[#252932]/60 bg-[#0E1014]/60">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            The Reality Check
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 mb-2">
            You don’t need another motivational video.
          </h2>
          <p className="text-base sm:text-lg font-medium text-emerald-400">
            You need clarity.
          </p>
        </div>

        {/* 3 Emotional Cards */}
        <div className="space-y-3 mb-6">
          <div className="rounded-xl border border-red-500/20 bg-gradient-to-r from-red-950/20 to-transparent p-4 flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-400 font-bold text-sm">
              01
            </div>
            <div>
              <h3 className="font-bold text-white text-base">“I hate my job.”</h3>
              <p className="text-xs text-[#9BA1AD] mt-1 leading-relaxed">
                Teams pings at 9 PM, appraisal ratings that barely beat inflation, and that sinking feeling on Sunday evening.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-950/20 to-transparent p-4 flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 font-bold text-sm">
              02
            </div>
            <div>
              <h3 className="font-bold text-white text-base">“I want to build something.”</h3>
              <p className="text-xs text-[#9BA1AD] mt-1 leading-relaxed">
                Seeing acquaintances start agencies and products. Wanting real autonomy, equity, and financial freedom.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-950/20 to-transparent p-4 flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 font-bold text-sm">
              03
            </div>
            <div>
              <h3 className="font-bold text-white text-base">“I have no idea what to build.”</h3>
              <p className="text-xs text-[#9BA1AD] mt-1 leading-relaxed">
                Paralyzed by 100 random YouTube ideas. Terrified of burning your hard-earned family savings on the wrong bet.
              </p>
            </div>
          </div>
        </div>

        {/* The Connection */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-center">
          <p className="text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-1">
            The Solution
          </p>
          <p className="text-sm sm:text-base font-bold text-white">
            NEXTMOVE connects the dots.
          </p>
          <p className="text-xs text-[#9BA1AD] mt-1 max-w-sm mx-auto">
            We match your specific skills, capital constraints, available hours, and risk tolerance to the single business model worth testing first.
          </p>
        </div>
      </div>
    </section>
  );
};
