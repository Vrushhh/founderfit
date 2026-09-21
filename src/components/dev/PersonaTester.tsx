'use client';

import React, { useState } from 'react';
import { TEST_PERSONAS, TestPersona } from '@/lib/data/testPersonas';
import { AssessmentAnswers } from '@/lib/types';
import { FlaskConical, ChevronUp, ChevronDown, Check, RefreshCw, Unlock, Lock } from 'lucide-react';

interface PersonaTesterProps {
  onLoadPersona: (persona: TestPersona) => void;
  onReset: () => void;
  isPaid: boolean;
  onTogglePaid: () => void;
  currentStep: 'landing' | 'assessment' | 'analyzing' | 'preview' | 'full';
}

export const PersonaTester: React.FC<PersonaTesterProps> = ({
  onLoadPersona,
  onReset,
  isPaid,
  onTogglePaid,
  currentStep
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Developer & testing toolbar" className="fixed bottom-3 right-3 z-50">
      {isOpen ? (
        <div className="w-80 rounded-2xl border border-emerald-500/40 bg-[#0E1014]/95 p-4 shadow-2xl backdrop-blur-md text-xs">
          <div className="flex items-center justify-between border-b border-[#252932] pb-2.5 mb-3">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <FlaskConical className="h-4 w-4" />
              <span>Persona & QA Suite</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#9BA1AD] hover:text-white p-1"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <p className="text-[11px] text-[#9BA1AD] mb-3 leading-relaxed">
            Quick-load the 5 persona test cases to verify differing recommendation logic:
          </p>

          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 mb-3">
            {TEST_PERSONAS.map((persona) => (
              <button
                key={persona.id}
                onClick={() => {
                  onLoadPersona(persona);
                  setIsOpen(false);
                }}
                className="w-full text-left p-2 rounded-lg border border-[#252932] bg-[#16181E] hover:border-emerald-500/40 hover:bg-[#1C1F26] transition-all"
              >
                <div className="font-semibold text-white">{persona.name}</div>
                <div className="text-[10px] text-emerald-400 mt-0.5">
                  Expected: {persona.expectedOutcome}
                </div>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="pt-2 border-t border-[#252932] flex gap-2">
            <button
              onClick={onTogglePaid}
              className="flex-1 py-1.5 px-2 rounded-lg border border-[#252932] bg-[#16181E] text-[11px] font-medium text-white flex items-center justify-center gap-1 hover:bg-[#252932]"
            >
              {isPaid ? <Lock className="h-3 w-3 text-amber-400" /> : <Unlock className="h-3 w-3 text-emerald-400" />}
              <span>{isPaid ? 'Relock Result' : 'Force Unlock'}</span>
            </button>
            <button
              onClick={onReset}
              className="py-1.5 px-2.5 rounded-lg border border-[#252932] bg-[#16181E] text-[11px] font-medium text-[#9BA1AD] flex items-center justify-center gap-1 hover:text-white"
            >
              <RefreshCw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-[#0E1014]/90 px-3 py-1.5 text-xs font-semibold text-emerald-400 shadow-xl backdrop-blur-md hover:bg-[#16181E] transition-all"
        >
          <FlaskConical className="h-3.5 w-3.5" />
          <span>Test Personas (5)</span>
        </button>
      )}
    </aside>
  );
};
