import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Card, Eyebrow, Footer, GhostButton, PrimaryButton, Wordmark } from "@/components/nextmove/ui";
import { analytics } from "@/lib/nextmove/analytics";
import { PRICE_INR, paymentService } from "@/lib/nextmove/paymentService";
import { generateBlueprint } from "@/lib/nextmove/recommendationEngine";
import { disclaimer, formatINR, hoursLabel } from "@/lib/nextmove/resultTemplates";
import { signalIds, signalLabels } from "@/lib/nextmove/scoring";
import { session } from "@/lib/nextmove/session";
import { totalQuestions } from "@/lib/nextmove/questions";
import type { Answers, Blueprint } from "@/lib/nextmove/types";

export const Route = createFileRoute("/result")({
  head: () => ({
    meta: [
      { title: "Your Business Blueprint — FounderFit" },
      { name: "description", content: "Your personalised business recommendation and 30 day validation plan." },
      { property: "og:title", content: "Your Business Blueprint — FounderFit" },
      { property: "og:description", content: "The business worth testing next, based on your answers." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResultPage,
});

function Analysing() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-center text-foreground">
      <div>
        <Wordmark className="justify-center" />
        <p className="mt-6 text-xl font-extrabold">Analysing your profile…</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Matching your skills, money, time and risk appetite against 24 business models.
        </p>
        <div className="mx-auto mt-6 h-1.5 w-40 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-accent" />
        </div>
      </div>
    </main>
  );
}

function ResultPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"loading" | "analysing" | "ready">("loading");
  const [answers, setAnswers] = useState<Answers>({});
  const [paid, setPaid] = useState(false);
  const [paying, setPaying] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const a = session.load();
    setAnswers(a);
    setPaid(paymentService.getPaymentStatus() === "paid");
    if (Object.keys(a).length < totalQuestions) {
      navigate({ to: "/assessment" });
      return;
    }
    setPhase("analysing");
    const t = setTimeout(() => {
      setPhase("ready");
      analytics.track("result_viewed");
    }, 1800);
    return () => clearTimeout(t);
  }, [navigate]);

  const bp: Blueprint | null = useMemo(
    () => (Object.keys(answers).length >= totalQuestions ? generateBlueprint(answers) : null),
    [answers],
  );

  if (phase !== "ready" || !bp) return <Analysing />;

  async function unlock() {
    setPaying(true);
    analytics.track("payment_started", { amount: PRICE_INR });
    try {
      const intent = await paymentService.checkout();
      if (intent.status === "paid") {
        setPaid(true);
        analytics.track("payment_completed", { amount: PRICE_INR });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment failed";
      if (msg !== "Payment cancelled by user") {
        alert(`Payment error: ${msg}`);
      }
    } finally {
      setPaying(false);
    }
  }

  async function share() {
    analytics.track("share_clicked");
    const text = `My FounderFit result: ${bp!.primary.name} — profile fit ${bp!.fit}/100. Find the business you should test next.`;
    const url = typeof window !== "undefined" ? window.location.origin : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "FounderFit", text, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const b = bp.primary;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <Wordmark />
        <Link to="/assessment" className="text-xs font-semibold text-muted-foreground">
          Retake
        </Link>
      </header>

      <div className="mx-auto w-full max-w-lg px-5 py-8 lg:max-w-3xl">
        <p className="text-base font-semibold text-accent">Your Business Blueprint is ready.</p>

        {/* SHARE CARD */}
        <div className="mt-4 overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-foreground/60">
            Your business to investigate next
          </p>
          <h1 className="mt-2 text-[30px] font-extrabold uppercase leading-[1.1] tracking-tight">{b.name}</h1>
          <p className="mt-3 text-sm text-primary-foreground/70">
            {bp.archetype.name} · {bp.archetype.line}
          </p>

          <div className="mt-5 flex items-end gap-2 border-t border-primary-foreground/15 pt-5">
            <span className="text-5xl font-black text-accent">{bp.fit}</span>
            <span className="pb-2 text-sm text-primary-foreground/60">/ 100 profile fit</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            {[
              ["Capital", b.capitalRange],
              ["Time", hoursLabel(bp.facts.hours)],
              ["Business type", b.type],
              ["First goal", b.firstGoal],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl bg-primary-foreground/[0.07] p-3">
                <p className="text-[10px] uppercase tracking-wider text-primary-foreground/50">{k}</p>
                <p className="mt-1 font-bold leading-snug">{v}</p>
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm font-semibold">Your next move: validate it before you quit.</p>

          <div className="mt-5 flex gap-2">
            <GhostButton
              onClick={share}
              className="flex-1 border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
            >
              {copied ? "Link copied" : "Share your result"}
            </GhostButton>
          </div>
        </div>

        {/* LOCKED / UNLOCKED */}
        {!paid ? (
          <div className="mt-8 space-y-5">

            {/* SECTION 1: Why this fits you */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-base">🔒</span>
                <p className="text-base font-extrabold text-foreground">Why this fits you</p>
              </div>
              <div className="pointer-events-none select-none blur-sm" aria-hidden>
                <div className="space-y-2.5">
                  {bp.reasons.slice(0, 2).map((r) => (
                    <Card key={r} className="text-sm leading-relaxed">{r}</Card>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 2: Signals */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-base">🔒</span>
                <p className="text-base font-extrabold text-foreground">Your business profile signals</p>
              </div>
              <div className="pointer-events-none select-none blur-sm" aria-hidden>
                <Card>
                  <div className="space-y-3">
                    {signalIds.slice(0, 3).map((s) => (
                      <div key={s}>
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                          <span className="truncate text-sm font-medium">{signalLabels[s]}</span>
                          <span className="shrink-0 text-xs font-bold text-muted-foreground">{bp.signals[s]}</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-accent" style={{ width: `${bp.signals[s]}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* ── UNLOCK CTA IN THE MIDDLE ── */}
            <Card className="border-2 border-accent/40 bg-accent/5">
              <p className="text-lg font-extrabold">Unlock your complete blueprint.</p>
              <p className="mt-0.5 text-3xl font-black">₹{PRICE_INR}</p>
              <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                {[
                  "Why it fits you",
                  "Profile signals",
                  "Business model",
                  "Starting capital",
                  "First offer",
                  "Pricing guide",
                  "7-day plan",
                  "30-day plan",
                  "What to avoid",
                  "Alternative biz",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-1.5">
                    <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent text-[9px] font-black text-primary">✓</span>
                    <span className="min-w-0 leading-snug">{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <PrimaryButton onClick={unlock}>
                  {paying ? "Processing payment…" : `Unlock My Blueprint — ₹${PRICE_INR}`}
                </PrimaryButton>
                {paymentService.mode === "mock" ? (
                  <p className="mt-2 text-center text-[11px] text-muted-foreground">
                    Test mode — no money is charged.
                  </p>
                ) : null}
              </div>
            </Card>

            {/* SECTION 3: Business model — teaser below CTA */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-base">🔒</span>
                <p className="text-base font-extrabold text-foreground">Your business model</p>
              </div>
              <div className="pointer-events-none select-none blur-sm" aria-hidden>
                <Card>
                  <p className="text-sm leading-relaxed">{b.model.slice(0, 180)}…</p>
                </Card>
              </div>
            </div>

            {/* SECTION 4: 7-day plan teaser */}
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="text-base">🔒</span>
                <p className="text-base font-extrabold text-foreground">First 7 days action plan</p>
              </div>
              <div className="pointer-events-none select-none blur-sm" aria-hidden>
                <Card>
                  <ol className="space-y-2 text-sm">
                    {b.sevenDays.slice(0, 3).map((d, i) => (
                      <li key={d} className="flex gap-3">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-muted text-xs font-bold">{i + 1}</span>
                        <span className="min-w-0 leading-relaxed">{d}</span>
                      </li>
                    ))}
                  </ol>
                </Card>
              </div>
            </div>

          </div>
        ) : (
          <div className="mt-8 space-y-8">
            <div>
              <Eyebrow>Why this fits you</Eyebrow>
              <div className="space-y-2.5">
                {bp.reasons.map((r) => (
                  <Card key={r} className="text-sm leading-relaxed">
                    {r}
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Eyebrow>Your business profile signals</Eyebrow>
              <Card>
                <div className="space-y-3">
                  {signalIds.map((s) => (
                    <div key={s}>
                      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                        <span className="truncate text-sm font-medium">{signalLabels[s]}</span>
                        <span className="shrink-0 text-xs font-bold text-muted-foreground">{bp.signals[s]}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-accent" style={{ width: `${bp.signals[s]}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  These are directional signals from your answers, not a psychological assessment.
                </p>
              </Card>
            </div>

            <Block title="Your business model">
              <p className="text-sm leading-relaxed">{b.model}</p>
            </Block>

            <Block title="Who to sell to">
              <ul className="space-y-2 text-sm">
                {b.customers.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span className="min-w-0">{c}</span>
                  </li>
                ))}
              </ul>
            </Block>

            <div className="grid gap-3 sm:grid-cols-2">
              <Block title="Your starting capital">
                <p className="text-lg font-bold">{b.capitalRange}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  You said you can put in {formatINR(bp.facts.capital)}.
                </p>
              </Block>
              <Block title="Your first goal">
                <p className="text-lg font-bold">{b.firstGoal}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Target income: {formatINR(bp.facts.incomeTarget)} a month.
                </p>
              </Block>
            </div>

            <Block title="Your first offer">
              <p className="text-sm leading-relaxed">{b.firstOffer}</p>
            </Block>

            <Block title="Pricing">
              <p className="text-sm leading-relaxed">{b.pricing}</p>
            </Block>

            <Block title="Your first customer">
              <p className="text-sm leading-relaxed">{b.firstCustomer}</p>
            </Block>

            <Block title="First 7 days">
              <ol className="space-y-2.5 text-sm">
                {b.sevenDays.map((d, i) => (
                  <li key={d} className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-muted text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="min-w-0 leading-relaxed">{d}</span>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="First 30 days">
              <div className="space-y-3 text-sm">
                {b.thirtyDays.map((w) => (
                  <div key={w.week} className="flex gap-3">
                    <span className="w-16 shrink-0 font-bold">{w.week}</span>
                    <span className="min-w-0 text-muted-foreground">{w.task}</span>
                  </div>
                ))}
              </div>
            </Block>

            <Block title="What to avoid">
              <div className="space-y-3">
                {b.avoid.map((a) => (
                  <div key={a.name}>
                    <p className="text-sm font-bold">{a.name}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{a.why}</p>
                  </div>
                ))}
              </div>
            </Block>

            <Block title="Alternative business">
              <p className="text-lg font-extrabold">{bp.alternative.name}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                {bp.altArchetype.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{bp.alternative.model}</p>
              <p className="mt-3 text-sm">
                <span className="font-semibold">Capital:</span> {bp.alternative.capitalRange} ·{" "}
                <span className="font-semibold">First goal:</span> {bp.alternative.firstGoal}
              </p>
            </Block>

            <Card className="bg-muted/60">
              <p className="text-base font-bold">Don't quit yet. Validate first.</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Your profile suggests this is worth testing. Use the next 30 days to validate demand while keeping
                your income, and only then make a career decision.
              </p>
            </Card>
          </div>
        )}

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">{disclaimer}</p>
      </div>

      <Footer />
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Eyebrow>{title}</Eyebrow>
      <Card>{children}</Card>
    </div>
  );
}
