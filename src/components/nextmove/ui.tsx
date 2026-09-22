import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-12 sm:py-16", className)}>
      <div className="mx-auto w-full max-w-lg lg:max-w-4xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{children}</p>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgba(15,17,16,0.04),0_12px_28px_-20px_rgba(15,17,16,0.25)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
  className,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-primary-foreground transition active:scale-[0.985] hover:bg-primary/90",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition active:scale-[0.985] hover:bg-muted",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Wordmark({ className, iconOnly = false }: { className?: string; iconOnly?: boolean }) {
  if (iconOnly) {
    return (
      <span className={cn("inline-flex items-center", className)}>
        <img
          src="/icon.png"
          alt="FounderFit"
          className="h-7 w-auto"
        />
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <img
        src="/icon.png"
        alt="FounderFit icon"
        className="h-7 w-auto"
      />
      <span className="text-sm font-extrabold tracking-[0.12em] text-foreground">FOUNDERFIT</span>
    </span>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8 text-center">
      <Wordmark className="justify-center" />
      <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-muted-foreground">
        FounderFit gives directional business recommendations based on your answers. These are business profile
        signals, not a psychological assessment, and outcomes are not guaranteed.
      </p>
      <p className="mt-3 text-xs text-muted-foreground">© {new Date().getFullYear()} FounderFit</p>
    </footer>
  );
}
