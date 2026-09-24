import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "../hooks/useInView";
import { cn } from "../utils/cn";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
};

export function Reveal({ children, delay = 0, className, as: Tag = "div" }: Props) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={cn("reveal", inView && "is-visible", className)}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      <Reveal>
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
            dark
              ? "bg-white/5 text-indigo-200 ring-1 ring-white/10"
              : "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={cn(
            "mt-5 text-3xl font-semibold tracking-[-0.03em] text-balance sm:text-4xl md:text-5xl md:leading-[1.05]",
            dark ? "text-white" : "text-ink-900",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={160}>
          <p
            className={cn(
              "mt-5 text-base leading-relaxed text-pretty sm:text-lg",
              dark ? "text-slate-400" : "text-slate-600",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
