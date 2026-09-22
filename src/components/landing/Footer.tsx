'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#252932]/70 bg-[#08090B] py-8 px-4 text-center text-xs text-[#656C7A]">
      <div className="mx-auto max-w-xl space-y-3">
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-emerald-500 font-bold text-black text-[10px]">
            NM
          </div>
          <span className="font-bold tracking-tight text-white text-sm">FOUNDERFIT</span>
        </div>

        <p className="text-[#9BA1AD] max-w-md mx-auto leading-relaxed">
          The paid decision engine for Indian corporate employees looking to find the business they should test next.
        </p>

        <div className="pt-2 border-t border-[#252932]/40 text-[11px] space-y-1">
          <p>© {new Date().getFullYear()} FOUNDERFIT. All rights reserved.</p>
          <p className="text-[#656C7A]">
            Directional guidance only. FOUNDERFIT does not guarantee business profits or advise reckless resignation without validation.
          </p>
        </div>
      </div>
    </footer>
  );
};
