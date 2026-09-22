'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface NavbarProps {
  onStartAssessment: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onStartAssessment }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#252932]/70 bg-[#0A0B0D]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 font-bold text-black text-sm tracking-tighter">
            NM
          </div>
          <span className="font-bold tracking-tight text-white text-base">FOUNDERFIT</span>
          <span className="hidden sm:inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400 border border-emerald-500/20">
            For Indian Corporate Employees
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden xs:block">
            <span className="text-xs text-[#9BA1AD]">Blueprint</span>
            <span className="ml-1 text-xs font-semibold text-white">₹299</span>
          </div>
          <button
            onClick={onStartAssessment}
            className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-black transition-all hover:bg-emerald-400 active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <span>Start Test</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
