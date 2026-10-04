import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("kicker", className)}>{children}</p>;
}

export function Meta({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("meta", className)}>{children}</p>;
}

export function Rule({ className }: { className?: string }) {
  return <div className={cn("folio-rule", className)} />;
}

export function DoubleRule({ className }: { className?: string }) {
  return <div className={cn("folio-double", className)} />;
}

type Tone = "solid" | "ghost" | "stamp" | "quiet";

export function buttonClass(tone: Tone = "solid", className?: string) {
  return cn(
    "inline-flex min-h-11 items-center justify-center gap-2 px-4 text-[13px] font-medium tracking-wide transition-[transform,background-color,color,box-shadow] duration-150 ease-out active:not-disabled:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-40",
    tone === "solid" && "bg-ink text-paper hover:bg-sage",
    tone === "stamp" && "bg-stamp text-paper hover:bg-ink",
    tone === "ghost" && "border border-hair-strong bg-transparent text-ink hover:bg-ink hover:text-paper",
    tone === "quiet" && "text-slate hover:text-ink",
    className,
  );
}

export function Button({
  tone = "solid",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { tone?: Tone }) {
  return (
    <button className={buttonClass(tone, className)} {...props}>
      {children}
    </button>
  );
}

export function Stamp({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block border-2 border-stamp px-3 py-1.5 font-mono text-[11px] font-medium tracking-[0.28em] text-stamp uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Sheet({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={cn(
        "border-t border-brass bg-paper text-ink shadow-[var(--shadow-sheet)]",
        padded && "px-5 py-6 sm:px-8 sm:py-8",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
}) {
  return (
    <div className="min-w-0">
      <p className="meta">{label}</p>
      <p className="mt-1 font-display text-2xl leading-none tracking-tight tabular text-ink">{value}</p>
      {hint ? <p className="mt-2 text-xs text-slate">{hint}</p> : null}
    </div>
  );
}

export function FieldRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,140px)_1fr] gap-3 border-b border-hair py-2.5 last:border-0">
      <dt className="meta self-baseline">{label}</dt>
      <dd className="text-sm leading-snug text-ink">{value}</dd>
    </div>
  );
}
