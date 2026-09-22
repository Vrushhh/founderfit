import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GhostButton, Wordmark } from "@/components/nextmove/ui";
import { analytics } from "@/lib/nextmove/analytics";
import { questions, totalQuestions } from "@/lib/nextmove/questions";
import { session } from "@/lib/nextmove/session";
import type { Answers } from "@/lib/nextmove/types";

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "10 questions — FounderFit" },
      {
        name: "description",
        content: "Answer 10 quick questions about your job, skills, money, time and risk appetite.",
      },
      { property: "og:title", content: "10 questions — FounderFit" },
      { property: "og:description", content: "Tap through 10 questions and get your Business Blueprint." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Assessment,
});

function Assessment() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  useEffect(() => {
    setAnswers(session.load());
    analytics.track("assessment_started");
  }, []);

  const q = questions[index]!;
  const progress = ((index + (answers[q.id] ? 1 : 0)) / totalQuestions) * 100;

  function choose(optionId: string) {
    const next = { ...answers, [q.id]: optionId };
    setAnswers(next);
    session.save(next);
    analytics.track("question_answered", { question: q.id, option: optionId });

    if (index + 1 < totalQuestions) {
      setTimeout(() => setIndex(index + 1), 140);
    } else {
      analytics.track("assessment_completed");
      setTimeout(() => navigate({ to: "/result" }), 140);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto w-full max-w-lg">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <Wordmark />
            <span className="shrink-0 text-xs font-semibold text-muted-foreground">
              Question {index + 1} of {totalQuestions}
            </span>
          </div>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-300"
              style={{ width: `${Math.max(6, progress)}%` }}
            />
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-lg flex-1 px-5 py-6">
        <h1 className="text-[26px] font-extrabold leading-tight sm:text-3xl">{q.title}</h1>
        {q.hint ? <p className="mt-2 text-sm text-muted-foreground">{q.hint}</p> : null}

        <div className="mt-5 space-y-2.5 pb-4">
          {q.options.map((o) => {
            const active = answers[q.id] === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => choose(o.id)}
                className={
                  "flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-base font-semibold transition active:scale-[0.99] " +
                  (active
                    ? "border-accent bg-accent/10 text-foreground"
                    : "border-border bg-card hover:border-foreground/25")
                }
              >
                <span className="min-w-0">{o.label}</span>
                <span
                  className={
                    "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs " +
                    (active ? "border-accent bg-accent text-primary" : "border-border text-transparent")
                  }
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-border bg-background/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex w-full max-w-lg items-center justify-between gap-3">
          <GhostButton
            onClick={() => (index === 0 ? navigate({ to: "/" }) : setIndex(index - 1))}
          >
            Back
          </GhostButton>
          <p className="text-xs text-muted-foreground">Tap an answer to continue</p>
        </div>
      </div>
    </main>
  );
}
