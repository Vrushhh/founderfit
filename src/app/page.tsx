'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { ProblemSection } from '@/components/landing/ProblemSection';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { BlueprintPreview } from '@/components/landing/BlueprintPreview';
import { ExampleResult } from '@/components/landing/ExampleResult';
import { WhoItIsFor } from '@/components/landing/WhoItIsFor';
import { FinalCTA } from '@/components/landing/FinalCTA';
import { Footer } from '@/components/landing/Footer';

import { ProgressBar } from '@/components/assessment/ProgressBar';
import { QuestionCard } from '@/components/assessment/QuestionCard';
import { TransitionScreen } from '@/components/assessment/TransitionScreen';
import { ResultPreviewGate } from '@/components/result/ResultPreviewGate';
import { PaymentModal } from '@/components/result/PaymentModal';
import { FullBlueprint } from '@/components/result/FullBlueprint';
import { PersonaTester } from '@/components/dev/PersonaTester';

import { ASSESSMENT_QUESTIONS } from '@/lib/data/questions';
import { AssessmentAnswers, AssessmentResult } from '@/lib/types';
import { generateBusinessRecommendation } from '@/lib/engine/recommendationEngine';
import { analyticsService } from '@/lib/services/analyticsService';
import { TestPersona } from '@/lib/data/testPersonas';

type AppView = 'landing' | 'assessment' | 'analyzing' | 'preview' | 'full';

export default function NextMoveApp() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const [isNavigating, setIsNavigating] = useState(false);

  // Track initial landing view
  useEffect(() => {
    analyticsService.track('landing_view');
  }, []);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
    setCurrentQuestionIndex(0);
    setIsNavigating(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    analyticsService.track('assessment_started');
  };

  const handleSelectOption = (optionId: string) => {
    if (isNavigating) return;

    const currentQuestion = ASSESSMENT_QUESTIONS[currentQuestionIndex];
    if (!currentQuestion) return;

    const newAnswers = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(newAnswers);

    analyticsService.track('question_answered', {
      questionNumber: currentQuestionIndex + 1,
      questionId: currentQuestion.id,
      optionId
    });

    setIsNavigating(true);

    // Advance to next question or complete assessment
    if (currentQuestionIndex < ASSESSMENT_QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, ASSESSMENT_QUESTIONS.length - 1));
        setIsNavigating(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 180);
    } else {
      // Assessment completed
      analyticsService.track('assessment_completed');
      const calculatedResult = generateBusinessRecommendation(newAnswers);
      setResult(calculatedResult);
      setTimeout(() => {
        setCurrentView('analyzing');
        setIsNavigating(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 180);
    }
  };

  const handlePreviousQuestion = () => {
    if (isNavigating) return;
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentView('landing');
    }
  };

  const handleAnalysisComplete = () => {
    setCurrentView(isPaid ? 'full' : 'preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    analyticsService.track('result_viewed', { isPaid });
  };

  const handleUnlockClick = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaid(true);
    setIsPaymentModalOpen(false);
    setCurrentView('full');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers({});
    setResult(null);
    setCurrentQuestionIndex(0);
    setIsPaid(false);
    setIsPaymentModalOpen(false);
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadPersona = (persona: TestPersona) => {
    setAnswers(persona.answers);
    const calculatedResult = generateBusinessRecommendation(persona.answers);
    setResult(calculatedResult);
    setCurrentView(isPaid ? 'full' : 'preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePaid = () => {
    const nextState = !isPaid;
    setIsPaid(nextState);
    if (result) {
      setCurrentView(nextState ? 'full' : 'preview');
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0A0B0D] text-[#F4F5F6]">
      <Navbar onStartAssessment={handleStartAssessment} />

      <main className="flex-1 w-full">
        {/* VIEW 1: LANDING PAGE */}
        {currentView === 'landing' && (
          <div className="animate-fadeIn">
            <Hero onStartAssessment={handleStartAssessment} />
            <ProblemSection />
            <HowItWorks onStartAssessment={handleStartAssessment} />
            <BlueprintPreview />
            <ExampleResult />
            <WhoItIsFor />
            <FinalCTA onStartAssessment={handleStartAssessment} />
          </div>
        )}

        {/* VIEW 2: 10-QUESTION TAP ASSESSMENT */}
        {currentView === 'assessment' && ASSESSMENT_QUESTIONS[currentQuestionIndex] && (
          <div className="mx-auto max-w-xl px-4 py-6">
            <ProgressBar
              currentStep={currentQuestionIndex + 1}
              totalSteps={ASSESSMENT_QUESTIONS.length}
              canGoBack={true}
              onBack={handlePreviousQuestion}
            />

            <div className="mt-4">
              <QuestionCard
                question={ASSESSMENT_QUESTIONS[currentQuestionIndex]}
                selectedOptionId={answers[ASSESSMENT_QUESTIONS[currentQuestionIndex].id]}
                onSelectOption={handleSelectOption}
              />
            </div>
          </div>
        )}

        {/* VIEW 3: TRANSITION / ANALYZING SCREEN */}
        {currentView === 'analyzing' && (
          <TransitionScreen onComplete={handleAnalysisComplete} />
        )}

        {/* VIEW 4: RESULT PREVIEW & PAYWALL GATE */}
        {currentView === 'preview' && result && (
          <ResultPreviewGate
            result={result}
            onUnlock={handleUnlockClick}
          />
        )}

        {/* VIEW 5: UNLOCKED FULL BUSINESS BLUEPRINT */}
        {currentView === 'full' && result && (
          <FullBlueprint
            result={result}
            onRetake={handleReset}
          />
        )}
      </main>

      <Footer />

      {/* Payment Modal */}
      {isPaymentModalOpen && result && (
        <PaymentModal
          blueprintId={result.primaryBlueprint.id}
          onClose={() => setIsPaymentModalOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Dev & Persona Tester Floating Bar */}
      <PersonaTester
        onLoadPersona={handleLoadPersona}
        onReset={handleReset}
        isPaid={isPaid}
        onTogglePaid={handleTogglePaid}
        currentStep={currentView}
      />
    </div>
  );
}
