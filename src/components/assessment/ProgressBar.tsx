'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  canGoBack: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  onBack,
  canGoBack
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full pb-4 pt-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {canGoBack && onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1 text-xs text-[#9BA1AD] hover:text-white transition-colors p-1 -ml-1 rounded-lg"
              aria-label="Previous question"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          ) : (
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Assessment
            </span>
          )}
        </div>

        <span className="text-xs font-semibold text-[#9BA1AD]">
          Question <strong className="text-white">{currentStep}</strong> of {totalSteps}
        </span>
      </div>

      {/* Progress Track */}
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#252932]">
        <div
          className="h-full bg-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
