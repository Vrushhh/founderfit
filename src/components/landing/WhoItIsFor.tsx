'use client';

import React from 'react';
import { Check } from 'lucide-react';

export const WhoItIsFor: React.FC = () => {
  const cards = [
    {
      title: '“I work a corporate job.”',
      desc: 'Whether in software, finance, sales, HR, or ops, you are tired of corporate bureaucracy and appraisal ceilings.'
    },
    {
      title: '“I want to build something on the side.”',
      desc: 'You cannot afford to quit recklessly without validation. You need something you can pilot in 5 to 15 hours a week.'
    },
    {
      title: '“I don’t know what business fits me.”',
      desc: 'You see 50 business models online, but have no objective filter to know which aligns with your real skills and budget.'
    },
    {
      title: '“I want to eventually leave my job.”',
      desc: 'Not tomorrow on impulse, but systematically—once your side business matches or exceeds your corporate take-home pay.'
    },
    {
      title: '“I don’t want to blindly copy another startup.”',
      desc: 'You don’t want to jump into food franchises, crypto schemes, or capital-heavy bets that bleed your family savings.'
    }
  ];

  return (
    <section className="py-12 px-4 border-t border-[#252932]/60 bg-[#0E1014]/60">
      <div className="mx-auto max-w-xl">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
            Target Audience
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Who NEXTMOVE Is Built For
          </h2>
          <p className="text-xs sm:text-sm text-[#9BA1AD] mt-1">
            If you nod along to these statements, this blueprint is built for you.
          </p>
        </div>

        <div className="space-y-3">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl border border-[#252932] bg-[#121418] p-4 transition-all hover:border-emerald-500/30"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5">
                <Check className="h-3.5 w-3.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{card.title}</h3>
                <p className="text-xs text-[#9BA1AD] mt-1 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
