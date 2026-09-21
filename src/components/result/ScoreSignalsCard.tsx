'use client';

import React from 'react';
import { ProfileSignals } from '@/lib/types';
import { BarChart3, Info } from 'lucide-react';

interface ScoreSignalsCardProps {
  signals: ProfileSignals;
}

export const ScoreSignalsCard: React.FC<ScoreSignalsCardProps> = ({ signals }) => {
  const signalList = [
    { label: 'Risk Appetite', value: signals.riskAppetite, desc: 'Tolerance for uncertainty vs predictable pay' },
    { label: 'Capital Readiness', value: signals.capitalReadiness, desc: 'Initial financial buffer deployment' },
    { label: 'Sales Orientation', value: signals.salesOrientation, desc: 'Comfort with pitching & closing deals' },
    { label: 'Builder Orientation', value: signals.builderOrientation, desc: 'Preference for systems, tech & tools' },
    { label: 'People Orientation', value: signals.peopleOrientation, desc: 'Energy derived from human interaction' },
    { label: 'Independence Preference', value: signals.independencePreference, desc: 'Need for autonomy over calendar' },
    { label: 'Time Availability', value: signals.timeAvailability, desc: 'Weekly bandwidth outside corporate job' },
    { label: 'Income Ambition', value: signals.incomeAmbition, desc: 'Target revenue threshold to leave job' }
  ];

  return (
    <div className="rounded-2xl border border-[#252932] bg-[#121418] p-5 mb-6">
      <div className="flex items-center justify-between border-b border-[#252932] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white">Your Business Profile Signals</h3>
        </div>
        <span className="text-[10px] text-[#9BA1AD] uppercase font-semibold">
          0 - 100 Index
        </span>
      </div>

      <p className="text-xs text-[#9BA1AD] mb-4">
        These signals represent your operational constraints and working preferences—not a psychological diagnosis.
      </p>

      <div className="space-y-3">
        {signalList.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex justify-between items-baseline text-xs">
              <span className="font-semibold text-white">{item.label}</span>
              <span className="font-mono font-bold text-emerald-400">{item.value}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#1C1F26] rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${item.value}%` }}
              />
            </div>
            <span className="text-[10px] text-[#656C7A] block">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
