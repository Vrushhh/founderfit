import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Card, Eyebrow, Footer, GhostButton, PrimaryButton, Section, Wordmark } from "@/components/nextmove/ui";
import { analytics } from "@/lib/nextmove/analytics";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FounderFit — Find the business you should test next" },
      {
        name: "description",
        content:
          "Having difficult days at your desk job? Answer 10 questions and get a personalised Business Blueprint built for your skills, money, time and risk appetite. ₹299.",
      },
      { property: "og:title", content: "FounderFit — Find the business you should test next" },
      {
        property: "og:description",
        content: "10 questions. One personalised Business Blueprint. ₹299.",
      },
    ],
  }),
  component: Landing,
});

function CTA({ label = "Find My Business" }: { label?: string }) {
  return (
    <Link to="/assessment" className="block">
      <PrimaryButton>{label}</PrimaryButton>
    </Link>
  );
}

function Landing() {
  useEffect(() => {
    analytics.track("landing_view");
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between px-5 py-4">
        <Wordmark />
        <span className="rounded-full border border-border px-3 py-1 text-xs font-semibold">₹299</span>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-10 pt-2">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-[-30%] h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative mx-auto w-full max-w-lg lg:max-w-3xl">
          <Eyebrow>For Indian corporate employees</Eyebrow>
          <h1 className="text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            Having difficult days at your desk job?
          </h1>
          <p className="mt-3 text-xl font-semibold text-muted-foreground sm:text-2xl">
            Confused about what to do next?
          </p>

          <div className="mt-6">
            <CTA />
            <p className="mt-3 text-center text-sm text-muted-foreground">
              10 questions • Personalised blueprint • ₹299
            </p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 text-center">
            {[
              ["9:40 pm", "still on calls"],
              ["EOD", "can you take this up?"],
              ["1 year", "9% appraisal"],
            ].map(([a, b]) => (
              <div key={a} className="rounded-xl border border-border bg-card px-2 py-3">
                <p className="text-sm font-bold">{a}</p>
                <p className="mt-1 text-[11px] leading-tight text-muted-foreground">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <Section className="bg-muted/60">
        <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
          You don't need another motivational video.
        </h2>
        <p className="mt-2 text-xl font-semibold text-accent">You need clarity.</p>
        <div className="mt-6 space-y-3">
          {["I hate my job.", "I want to build something.", "I have no idea what to build."].map((t) => (
            <Card key={t} className="text-lg font-semibold">
              “{t}”
            </Card>
          ))}
        </div>
        <p className="mt-6 text-base font-semibold">FounderFit connects the dots.</p>
      </Section>

      {/* HOW IT WORKS */}
      <Section>
        <Eyebrow>How it works</Eyebrow>
        <div className="space-y-3">
          {[
            ["01", "Answer 10 questions", "Only taps. No typing, no login, under 3 minutes."],
            ["02", "We analyse your profile", "Skills, experience, money, time, risk appetite and goals."],
            ["03", "Get your personal Business Blueprint", "One business worth testing first, with a 30 day plan."],
          ].map(([n, t, d]) => (
            <Card key={n} className="flex gap-4">
              <span className="shrink-0 text-lg font-black text-accent">{n}</span>
              <div className="min-w-0">
                <p className="font-bold">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <CTA />
        </div>
      </Section>

      {/* WHAT YOU GET */}
      <Section className="bg-primary text-primary-foreground">
        <Eyebrow>What you get</Eyebrow>
        <h2 className="text-2xl font-extrabold sm:text-3xl">Your Business Blueprint</h2>
        <div className="mt-5 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/[0.06] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground/60">
            Your business blueprint
          </p>
          <ul className="mt-4 space-y-3">
            {[
              "Primary business",
              "Why it fits you",
              "Business model",
              "Starting capital",
              "First customer",
              "How to charge",
              "First 7 days",
              "First 30 days",
              "What to avoid",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3 border-b border-primary-foreground/10 pb-3 text-sm font-medium last:border-0 last:pb-0">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-black text-primary">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-sm text-primary-foreground/70">
          An actionable result you can start on this weekend — not a quiz score.
        </p>
      </Section>

      {/* EXAMPLE RESULT */}
      <Section className="bg-muted/60">
        <Eyebrow>Example result</Eyebrow>
        <Card>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Your business</p>
          <h3 className="mt-1 text-2xl font-extrabold leading-tight">B2B Lead Generation Agency</h3>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Why it fits you</p>
          <p className="mt-1 text-sm leading-relaxed">
            You are comfortable with people, tolerate sales, have low initial capital requirements and prefer
            autonomy over building a complex product.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-muted p-3">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">Starting capital</p>
              <p className="mt-1 text-sm font-bold">₹15,000 – ₹40,000</p>
            </div>
            <div className="rounded-xl bg-muted p-3">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">First target</p>
              <p className="mt-1 text-sm font-bold">3 clients</p>
            </div>
          </div>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Example offer</p>
          <p className="mt-1 text-sm leading-relaxed">
            Lead generation for Indian clinics, coaching businesses or local service businesses.
          </p>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">First 30 days</p>
          <div className="mt-2 space-y-2">
            {[
              ["Week 1", "Choose a niche and define the offer."],
              ["Week 2", "Create a landing page and outreach system."],
              ["Week 3", "Contact potential customers."],
              ["Week 4", "Close and deliver your first pilot."],
            ].map(([w, t]) => (
              <div key={w} className="flex gap-3 text-sm">
                <span className="w-16 shrink-0 font-bold">{w}</span>
                <span className="min-w-0 text-muted-foreground">{t}</span>
              </div>
            ))}
          </div>
        </Card>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Recommendations are directional. Business outcomes are not guaranteed.
        </p>
      </Section>

      {/* WHO IT IS FOR */}
      <Section>
        <Eyebrow>Who it is for</Eyebrow>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "I work a corporate job.",
            "I want to build something on the side.",
            "I don't know what business fits me.",
            "I want to eventually leave my job.",
            "I don't want to blindly copy another startup.",
          ].map((t) => (
            <Card key={t} className="text-base font-semibold">
              “{t}”
            </Card>
          ))}
        </div>
      </Section>

      {/* FINAL CTA */}
      <Section className="bg-primary text-primary-foreground">
        <h2 className="text-3xl font-extrabold leading-tight">Your next move shouldn't be a guess.</h2>
        <p className="mt-3 text-primary-foreground/70">
          Don't quit yet. Find the business worth testing first, then validate it.
        </p>
        <div className="mt-6">
          <Link to="/assessment" className="block">
            <PrimaryButton className="bg-accent text-primary hover:bg-accent/90">
              Find My Business — ₹299
            </PrimaryButton>
          </Link>
          <div className="mt-3 flex justify-center">
            <Link to="/assessment">
              <GhostButton className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                See the 10 questions
              </GhostButton>
            </Link>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
