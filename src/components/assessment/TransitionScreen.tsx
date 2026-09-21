'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface TransitionScreenProps {
  onComplete: () => void;
}

export const TransitionScreen: React.FC<TransitionScreenProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Analyzing your current role & transferable assets...',
    'Applying your capital and weekly time constraints...',
    'Scoring against 8 Indian business archetypes...',
    'Filtering out capital-heavy failure traps...',
    'Compiling your 30-day personalized validation blueprint...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(onComplete, 700);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onComplete, steps.length]);

  return (
    <div className="w-full max-w-md mx-auto text-center py-12 px-4 animate-fadeIn">
      {/* Animated icon ring */}
      <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
        <Loader2 className="h-10 w-10 text-emerald-400 animate-spin" />
      </div>

      <h2 className="text-2xl font-extrabold text-white tracking-tight mb-2">
        Analyzing your profile…
      </h2>
      <p className="text-xs sm:text-sm text-[#9BA1AD] mb-8">
        Connecting your skills, money, and time to the single model worth testing.
      </p>

      {/* Checklist items */}
      <div className="rounded-xl border border-[#252932] bg-[#121418] p-4 text-left space-y-3">
        {steps.map((text, idx) => {
          const isDone = idx < stepIndex;
          const isCurrent = idx === stepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-xs transition-opacity duration-300 ${
                isDone
                  ? 'text-emerald-300 font-medium'
                  : isCurrent
                  ? 'text-white font-semibold'
                  : 'text-[#656C7A] opacity-40'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="h-4 w-4 text-emerald-400 animate-spin shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-[#374151] shrink-0" />
              )}
              <span>{text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
