'use client';

import React from 'react';
import { Question, Option } from '@/lib/types';
import { Check } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedOptionId,
  onSelectOption
}) => {
  return (
    <div className="w-full animate-fadeIn">
      {/* Question Header */}
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
          {question.question}
        </h2>
        {question.contextHint && (
          <p className="mt-1.5 text-xs sm:text-sm text-[#9BA1AD] leading-relaxed">
            {question.contextHint}
          </p>
        )}
      </div>

      {/* Answer Options as Large Tap Cards */}
      <div className="space-y-2.5">
        {question.options.map((option: Option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className={`w-full text-left rounded-xl p-3.5 sm:p-4 border transition-all duration-150 flex items-center justify-between gap-3 press-scale tap-target ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-950/20 shadow-[0_0_15px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500'
                  : 'border-[#252932] bg-[#121418] hover:border-[#374151] hover:bg-[#16181E]'
              }`}
            >
              <div className="flex-1 min-w-0 pr-2">
                <span className={`text-sm sm:text-base font-semibold block leading-snug ${
                  isSelected ? 'text-emerald-300' : 'text-white'
                }`}>
                  {option.label}
                </span>
                {option.subtitle && (
                  <span className="text-xs text-[#9BA1AD] block mt-0.5 leading-normal">
                    {option.subtitle}
                  </span>
                )}
              </div>

              {/* Selection Check Circle */}
              <div
                className={`h-6 w-6 shrink-0 rounded-full flex items-center justify-center border transition-all ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500 text-black shadow-sm'
                    : 'border-[#374151] bg-[#1C1F26] text-transparent'
                }`}
              >
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
