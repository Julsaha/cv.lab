import type { MouseEvent, ReactNode } from "react";
import { FileText, GradCap, Linkedin, Mail, Mic, Target, Check } from "../components/Icons";
import { Reveal, SectionHeading } from "../components/Reveal";
import { cn } from "../utils/cn";

function track(e: MouseEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function Card({
  icon,
  title,
  desc,
  className,
  children,
  accent,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  className?: string;
  children?: ReactNode;
  accent: string;
}) {
  return (
    <article
      onMouseMove={track}
      className={cn(
        "spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_30px_60px_-30px_rgba(79,70,229,0.35)] sm:p-7",
        className,
      )}
    >
      <span
        className={cn(
          "grid h-11 w-11 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-6deg]",
          accent,
        )}
      >
        {icon}
      </span>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink-900">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{desc}</p>
      {children && <div className="mt-6 flex-1">{children}</div>}
    </article>
  );
}

export function Features() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              Everything you need to go from <span className="font-serif font-normal italic text-gradient">applying</span> to{" "}
              <span className="font-serif font-normal italic text-gradient">hired.</span>
            </>
          }
          subtitle="One team, one brief, zero guesswork. Every document is written by a human specialist in your industry — then stress-tested against real applicant tracking systems."
        />

        <div className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-6 md:gap-5">
          <Reveal className="md:col-span-4" delay={0}>
            <Card
              icon={<FileText />}
              accent="bg-gradient-to-br from-indigo-500 to-violet-500 shadow-indigo-500/30"
              title="Professional CV Writing"
              desc="A complete rewrite that turns duties into measurable achievements, structured the way hiring managers skim — in six seconds or less."
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-rose-50/70 p-4 ring-1 ring-rose-100">
                  <p className="text-[11px] font-semibold tracking-wider text-rose-500 uppercase">Before</p>
                  <p className="mt-2 text-sm text-slate-600 line-through decoration-rose-300">
                    Responsible for social media accounts.
                  </p>
                </div>
                <div className="rounded-2xl bg-emerald-50/70 p-4 ring-1 ring-emerald-100 transition-transform duration-500 group-hover:-translate-y-0.5">
                  <p className="text-[11px] font-semibold tracking-wider text-emerald-600 uppercase">After</p>
                  <p className="mt-2 text-sm text-slate-800">
                    Grew Instagram audience <b>+148%</b> in 6 months, driving <b>$42k</b> in attributed sales.
                  </p>
                </div>
              </div>
            </Card>
          </Reveal>

          <Reveal className="md:col-span-2" delay={80}>
            <Card
              icon={<Target />}
              accent="bg-gradient-to-br from-cyan-500 to-sky-500 shadow-cyan-500/30"
              title="ATS Optimisation"
              desc="75% of CVs are filtered out by software before a human sees them. Yours won't be."
            >
              <div className="space-y-2.5">
                {[
                  ["Keyword match", 96],
                  ["Formatting", 100],
                  ["Readability", 92],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{k}</span>
                      <span className="font-medium text-ink-900 tabular-nums">{v}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full origin-left scale-x-[0.3] rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                        style={{ width: `${v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Reveal>

          <Reveal className="md:col-span-2" delay={0}>
            <Card
              icon={<Mail />}
              accent="bg-gradient-to-br from-fuchsia-500 to-pink-500 shadow-fuchsia-500/30"
              title="Cover Letters"
              desc="Persuasive, personal letters with a reusable template so every application feels bespoke — in minutes."
            />
          </Reveal>
          <Reveal className="md:col-span-2" delay={80}>
            <Card
              icon={<Linkedin />}
              accent="bg-gradient-to-br from-sky-500 to-blue-600 shadow-sky-500/30"
              title="LinkedIn Makeover"
              desc="Headline, About and Experience rewritten for search, so recruiters find you — not the other way round."
            />
          </Reveal>
          <Reveal className="md:col-span-2" delay={160}>
            <Card
              icon={<Mic />}
              accent="bg-gradient-to-br from-amber-500 to-orange-500 shadow-amber-500/30"
              title="Interview Coaching"
              desc="Live mock interviews with ex-recruiters, STAR-method answers and honest feedback you can act on."
            />
          </Reveal>

          <Reveal className="md:col-span-6" delay={0}>
            <article
              onMouseMove={track}
              className="spotlight group relative overflow-hidden rounded-3xl bg-ink-900 p-7 text-white sm:p-10"
            >
              <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl transition-transform duration-700 group-hover:scale-125" />
              <div aria-hidden className="absolute -bottom-24 left-1/3 h-60 w-60 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="relative grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
                <div>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                    <GradCap />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Students & graduates: <span className="text-gradient-light">no experience? No problem.</span>
                  </h3>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-300">
                    We translate modules, part-time jobs, societies and projects into the skills grad schemes
                    and internships screen for. Plus a dedicated Student Resumes package from ৳399.
                  </p>
                </div>
                <ul className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-1">
                  {[
                    "Internship & placement CVs",
                    "Graduate scheme applications",
                    "Personal statements",
                    "Part-time & first-job CVs",
                  ].map((t, i) => (
                    <li
                      key={t}
                      className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-sm ring-1 ring-white/10 transition-all duration-500 group-hover:bg-white/[0.08]"
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
