'use client';

import React from 'react';
import { Target, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

export const ExampleResult: React.FC = () => {
  return (
    <section className="py-12 px-4 border-t border-[#252932]/60">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Real-World Sample
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Example Blueprint Output
          </h2>
          <p className="text-xs sm:text-sm text-[#9BA1AD] mt-1">
            Here is what a completed blueprint looks like for a sales-oriented corporate profile.
          </p>
        </div>

        {/* Fictional Blueprint Result Mockup */}
        <div className="rounded-2xl border border-[#252932] bg-[#121418] p-5 shadow-xl space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#252932] pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9BA1AD]">
                RECOMMENDED BUSINESS
              </span>
              <h3 className="text-lg font-extrabold text-emerald-400">
                B2B Lead Generation Agency
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#9BA1AD] block">PROFILE FIT</span>
              <span className="text-sm font-extrabold text-white">88 / 100</span>
            </div>
          </div>

          {/* Why It Fits You */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9BA1AD] block mb-1.5">
              WHY THIS FITS YOU
            </span>
            <p className="text-xs text-slate-200 leading-relaxed bg-[#16181E] p-3 rounded-xl border border-[#252932]">
              You are comfortable communicating with decision makers, have low initial capital requirements (under ₹40,000), and prefer client autonomy over coding a multi-year software product.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3">
              <span className="text-[10px] font-semibold text-[#9BA1AD] block uppercase">
                STARTING CAPITAL
              </span>
              <span className="text-sm font-bold text-white mt-0.5 block">
                ₹15,000 to ₹40,000
              </span>
            </div>

            <div className="rounded-xl border border-[#252932] bg-[#16181E] p-3">
              <span className="text-[10px] font-semibold text-[#9BA1AD] block uppercase">
                FIRST TARGET
              </span>
              <span className="text-sm font-bold text-white mt-0.5 block">
                3 Paying Clients
              </span>
            </div>
          </div>

          {/* Example Offer */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9BA1AD] block mb-1.5">
              EXAMPLE OFFER
            </span>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3 text-xs text-emerald-200">
              Outbound B2B lead generation & booked discovery appointments for Indian dental chains, corporate wellness providers, or commercial interior firms.
            </div>
          </div>

          {/* First 30 Days */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#9BA1AD] block mb-2">
              FIRST 30 DAYS ROADMAP
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex gap-2 items-start bg-[#16181E] p-2.5 rounded-lg border border-[#252932]">
                <span className="font-bold text-emerald-400 shrink-0">W1</span>
                <span className="text-[#9BA1AD]">
                  <strong className="text-white">Choose a niche</strong> and define your specific meeting guarantee offer.
                </span>
              </div>
              <div className="flex gap-2 items-start bg-[#16181E] p-2.5 rounded-lg border border-[#252932]">
                <span className="font-bold text-emerald-400 shrink-0">W2</span>
                <span className="text-[#9BA1AD]">
                  <strong className="text-white">Set up secondary domains</strong> and automated cold outreach systems.
                </span>
              </div>
              <div className="flex gap-2 items-start bg-[#16181E] p-2.5 rounded-lg border border-[#252932]">
                <span className="font-bold text-emerald-400 shrink-0">W3</span>
                <span className="text-[#9BA1AD]">
                  <strong className="text-white">Contact 50 potential customers</strong> with customized Loom audits.
                </span>
              </div>
              <div className="flex gap-2 items-start bg-[#16181E] p-2.5 rounded-lg border border-[#252932]">
                <span className="font-bold text-emerald-400 shrink-0">W4</span>
                <span className="text-[#9BA1AD]">
                  <strong className="text-white">Close and deliver</strong> your first paid ₹35,000 monthly pilot.
                </span>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-lg bg-[#0A0B0D] p-3 border border-[#252932] flex items-start gap-2 text-[11px] text-[#656C7A]">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-[#9BA1AD]" />
            <span>
              Disclaimer: Recommendations are directional blueprints designed for validation. Business outcomes depend entirely on individual market execution and consistency.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
