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

  // Direct QR Payment Modal state
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrData, setQrData] = useState<{ qr_id: string; image_url: string; amount: number } | null>(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [qrPaid, setQrPaid] = useState(false);
  const [verifyingManual, setVerifyingManual] = useState(false);

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

  // Polling for QR payment completion
  useEffect(() => {
    if (!qrModalOpen || !qrData?.qr_id || qrPaid) return;

    const interval = setInterval(async () => {
      try {
        const res = await paymentService.checkQrStatus(qrData.qr_id);
        if (res.paid) {
          setQrPaid(true);
          setPaid(true);
          analytics.track("payment_completed", { amount: PRICE_INR });
          setTimeout(() => {
            setQrModalOpen(false);
          }, 1500);
        }
      } catch {
        // silent retry on transient poll error
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [qrModalOpen, qrData?.qr_id, qrPaid]);

  const bp: Blueprint | null = useMemo(
    () => (Object.keys(answers).length >= totalQuestions ? generateBlueprint(answers) : null),
    [answers],
  );

  if (phase !== "ready" || !bp) return <Analysing />;

  async function unlock() {
    setQrModalOpen(true);
    setQrLoading(true);
    setQrPaid(false);
    analytics.track("payment_started", { amount: PRICE_INR });
    try {
      const data = await paymentService.generateQrCode();
      setQrData(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load payment QR";
      alert(`Payment error: ${msg}`);
      setQrModalOpen(false);
    } finally {
      setQrLoading(false);
    }
  }

  async function checkManual() {
    if (!qrData?.qr_id) return;
    setVerifyingManual(true);
    try {
      const res = await paymentService.checkQrStatus(qrData.qr_id);
      if (res.paid) {
        setQrPaid(true);
        setPaid(true);
        analytics.track("payment_completed", { amount: PRICE_INR });
        setTimeout(() => setQrModalOpen(false), 1200);
      } else {
        alert("Payment not detected yet. If you just sent it, please wait 5-10 seconds and click again!");
      }
    } catch {
      alert("Could not verify status. Please check your connection.");
    } finally {
      setVerifyingManual(false);
    }
  }

  async function unlockWithRazorpayStandard() {
    setPaying(true);
    try {
      const intent = await paymentService.checkout();
      if (intent.status === "paid") {
        setPaid(true);
        setQrModalOpen(false);
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

      {/* ── Direct UPI QR Payment Modal ── */}
      {qrModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-[#0f1712] p-6 shadow-2xl text-white text-center">
            {/* Close button */}
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute right-4 top-4 rounded-full p-2 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {qrLoading ? (
              <div className="py-14 space-y-4">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-medium text-white/80">Generating secure UPI QR code…</p>
                <p className="text-xs text-white/40">No contact details or mobile number required</p>
              </div>
            ) : qrPaid ? (
              <div className="py-12 space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-extrabold text-white">Payment Confirmed!</h3>
                <p className="text-sm text-emerald-400 font-medium">Unlocking your complete blueprint now…</p>
              </div>
            ) : qrData ? (
              <div className="space-y-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Scan &amp; Pay ₹{qrData.amount}
                  </div>
                  <h3 className="text-lg font-bold text-white">Scan with any UPI App</h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    Google Pay • PhonePe • Paytm • BHIM • Cred
                  </p>
                </div>

                {/* QR Code card */}
                <div className="relative mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white p-2 shadow-2xl max-w-[240px]">
                  <img
                    src={qrData.image_url}
                    alt="Scan UPI QR Code"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>

                {/* Polling indicator */}
                <div className="flex items-center justify-center gap-2 py-1.5 text-xs text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-500/20 rounded-xl px-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Waiting for payment… Unlocks automatically
                </div>

                <div className="pt-1 flex flex-col gap-2">
                  <button
                    onClick={checkManual}
                    disabled={verifyingManual}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-all disabled:opacity-50"
                  >
                    {verifyingManual ? "Checking status…" : "I've completed payment"}
                  </button>

                  <button
                    onClick={unlockWithRazorpayStandard}
                    disabled={paying}
                    className="text-[11px] text-white/40 hover:text-white/70 transition-colors underline"
                  >
                    Prefer Card or Netbanking?
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

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
