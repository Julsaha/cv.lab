import { useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "../components/Button";
import { ArrowRight, Calendar, Check, Shield, Sparkles, Star, TrendingUp } from "../components/Icons";
import { useOrder } from "../components/OrderContext";
import { useCountUp } from "../hooks/useInView";

export const AVATARS = [
  "https://images.pexels.com/photos/6497112/pexels-photo-6497112.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160",
  "https://images.pexels.com/photos/6942776/pexels-photo-6942776.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160",
  "https://images.pexels.com/photos/11701102/pexels-photo-11701102.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160",
  "https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160",
  "https://images.pexels.com/photos/7717254/pexels-photo-7717254.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160",
  "https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160",
  "https://images.pexels.com/photos/34930167/pexels-photo-34930167.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160",
  "https://images.pexels.com/photos/6102841/pexels-photo-6102841.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=160&w=160",
];

function useMounted(delay = 0) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setM(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return m;
}

function Enter({ delay, children, className = "" }: { delay: number; children: ReactNode; className?: string }) {
  const m = useMounted(40);
  return (
    <div
      className={`transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: m ? 1 : 0,
        transform: m ? "none" : "translateY(24px)",
        filter: m ? "none" : "blur(8px)",
      }}
    >
      {children}
    </div>
  );
}

export function Hero() {
  const { open } = useOrder();
  const wrap = useRef<HTMLDivElement>(null);
  const started = useMounted(900);
  const score = useCountUp(94, started, 2200);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--px", x.toFixed(3));
        el.style.setProperty("--py", y.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const circumference = 2 * Math.PI * 34;
  const scoreColor = score > 80 ? "#10b981" : score > 60 ? "#f59e0b" : "#ef4444";

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
      {/* Ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="animate-blob absolute -top-40 left-[8%] h-[520px] w-[520px] rounded-full bg-indigo-300/40 blur-[110px]" />
        <div className="animate-blob absolute top-10 right-[2%] h-[460px] w-[460px] rounded-full bg-cyan-200/50 blur-[110px] [animation-delay:-6s]" />
        <div className="animate-blob absolute top-[45%] left-[40%] h-[380px] w-[380px] rounded-full bg-fuchsia-200/40 blur-[110px] [animation-delay:-12s]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-16 px-5 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <Enter delay={0}>
            <button
              onClick={() => open()}
              className="group inline-flex items-center gap-2 rounded-full bg-white/70 py-1 pr-3 pl-1 text-xs font-medium text-slate-700 ring-1 ring-slate-200/80 backdrop-blur transition hover:ring-indigo-200"
            >
              <span className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-2 py-0.5 text-[11px] font-semibold text-white">
                New
              </span>
              Free ATS scan with every order
              <ArrowRight className="h-3.5 w-3.5 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-500" />
            </button>
          </Enter>

          <Enter delay={100}>
            <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance text-ink-900 sm:text-6xl lg:text-[4.4rem]">
              Your next job starts with a CV that{" "}
              <span className="relative inline-block font-serif font-normal tracking-[-0.02em] italic">
                <span className="text-gradient pr-1">gets read.</span>
                <svg
                  aria-hidden
                  viewBox="0 0 300 20"
                  className="absolute -bottom-2 left-0 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 14 C 80 4, 200 2, 298 10"
                    stroke="url(#ul)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    className="[stroke-dasharray:320] [stroke-dashoffset:320] [animation:draw_1.4s_1s_cubic-bezier(.16,1,.3,1)_forwards]"
                  />
                  <defs>
                    <linearGradient id="ul" x1="0" x2="1">
                      <stop offset="0" stopColor="#6366f1" />
                      <stop offset="1" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
          </Enter>

          <Enter delay={200}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-slate-600 lg:mx-0">
              CV.Lab pairs certified career writers with smart ATS tech to craft CVs, cover letters and
              LinkedIn profiles that recruiters actually shortlist.{" "}
              <span className="text-ink-900">Built for job seekers and students who are done with silence.</span>
            </p>
          </Enter>

          <Enter delay={300}>
            <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button size="lg" magnetic onClick={() => open("ats")} className="w-full sm:w-auto">
                Get my CV rewritten
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => document.querySelector("#showcase")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full sm:w-auto"
              >
                See before & after
              </Button>
            </div>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-500 lg:justify-start">
              {["48h delivery", "Interview Guarantee", "Student plans from ৳399"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" />
                  {t}
                </li>
              ))}
            </ul>
          </Enter>

          <Enter delay={420}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <div className="flex -space-x-3">
                {AVATARS.slice(0, 5).map((src, i) => (
                  <img
                    key={src}
                    src={src}
                    alt=""
                    width={40}
                    height={40}
                    loading="eager"
                    className="h-10 w-10 rounded-full object-cover ring-[3px] ring-[#fbfbfd] transition-transform duration-300 hover:z-10 hover:-translate-y-1"
                    style={{ zIndex: 5 - i }}
                  />
                ))}
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center gap-0.5 text-amber-400 sm:justify-start" aria-label="Rated 4.9 out of 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4" />
                  ))}
                  <span className="ml-1.5 text-sm font-semibold text-ink-900">4.9/5</span>
                </div>
                <p className="text-sm text-slate-500">
                  Loved by <span className="font-medium text-ink-900">12,000+</span> job seekers
                </p>
              </div>
            </div>
          </Enter>
        </div>

        {/* Visual */}
        <Enter delay={250} className="relative">
          <div
            ref={wrap}
            className="relative mx-auto aspect-[4/4.6] w-full max-w-[480px] [--px:0] [--py:0]"
          >
            {/* glow */}
            <div aria-hidden className="absolute inset-8 rounded-[40px] bg-gradient-to-br from-indigo-400/40 via-violet-400/30 to-cyan-300/40 blur-3xl" />

            {/* CV document */}
            <div
              className="absolute inset-x-6 top-6 bottom-10 rounded-[28px] bg-white p-6 shadow-[0_40px_80px_-30px_rgba(30,27,75,0.35)] ring-1 ring-slate-900/5 transition-transform duration-500 ease-out sm:inset-x-10 sm:p-8"
              style={{
                transform:
                  "perspective(1200px) rotateY(calc(var(--px) * 8deg)) rotateX(calc(var(--py) * -8deg))",
              }}
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-br from-indigo-100 to-cyan-100 p-0.5">
                  <img src={AVATARS[2]} alt="" className="h-full w-full rounded-[14px] object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold tracking-tight">Amara Okafor</p>
                  <p className="truncate text-xs text-slate-500">Graduate Data Analyst · London</p>
                </div>
              </div>
              <div className="mt-6 space-y-5">
                {[
                  { h: "Profile", w: ["100%", "92%", "70%"] },
                  { h: "Experience", w: ["96%", "84%", "90%", "60%"] },
                  { h: "Skills", chips: ["SQL", "Python", "Tableau", "Stakeholder mgmt"] },
                ].map((s) => (
                  <div key={s.h}>
                    <p className="text-[10px] font-semibold tracking-[0.14em] text-indigo-600 uppercase">{s.h}</p>
                    {s.w && (
                      <div className="mt-2 space-y-1.5">
                        {s.w.map((w, i) => (
                          <div key={i} className="h-1.5 rounded-full bg-slate-100" style={{ width: w }} />
                        ))}
                      </div>
                    )}
                    {s.chips && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {s.chips.map((c) => (
                          <span key={c} className="rounded-md bg-slate-50 px-2 py-1 text-[10px] font-medium text-slate-600 ring-1 ring-slate-200">
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {/* scanning line */}
              <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden rounded-[28px]">
                <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-indigo-400/10 to-transparent [animation:scan_4s_ease-in-out_infinite]" />
              </div>
            </div>

            {/* ATS score card */}
            <div
              className="absolute top-0 -right-1 sm:-right-6"
              style={{ transform: "translate(calc(var(--px) * -24px), calc(var(--py) * -24px))" }}
            >
              <div className="glass animate-float flex items-center gap-3 rounded-2xl p-3 pr-4 [--r:3deg]">
                <div className="relative h-[68px] w-[68px]">
                  <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
                    <circle cx="40" cy="40" r="34" stroke="#eef2ff" strokeWidth="7" fill="none" />
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      stroke={scoreColor}
                      strokeWidth="7"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={circumference * (1 - score / 100)}
                      style={{ transition: "stroke 0.4s" }}
                    />
                  </svg>
                  <span className="absolute inset-0 grid place-items-center text-lg font-semibold tabular-nums">{score}</span>
                </div>
                <div>
                  <p className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">ATS score</p>
                  <p className="text-sm font-semibold">Excellent match</p>
                  <p className="text-[11px] text-emerald-600">↑ from 41</p>
                </div>
              </div>
            </div>

            {/* Interview notification */}
            <div
              className="absolute bottom-0 -left-2 sm:-left-8"
              style={{ transform: "translate(calc(var(--px) * 30px), calc(var(--py) * 30px))" }}
            >
              <div className="glass animate-float-slow flex w-[250px] items-start gap-3 rounded-2xl p-3.5 [--r:-2deg]">
                <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-emerald-500 text-white">
                  <span className="animate-pulse-ring absolute inset-0 rounded-xl bg-emerald-400" />
                  <Calendar className="relative h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold">Interview invitation 🎉</p>
                  <p className="text-xs leading-snug text-slate-500">Thursday 10:00 · Graduate Analyst Programme</p>
                </div>
              </div>
            </div>

            {/* Callbacks chip */}
            <div
              className="absolute top-[42%] -right-2 sm:-right-10"
              style={{ transform: "translate(calc(var(--px) * -40px), calc(var(--py) * -16px))" }}
            >
              <div className="glass animate-float flex items-center gap-2 rounded-full py-2 pr-4 pl-2 [animation-delay:-3s]">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-indigo-500 text-white">
                  <TrendingUp className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold">3.2× callbacks</span>
              </div>
            </div>

            {/* Keywords chip */}
            <div
              className="absolute top-[22%] -left-3 hidden sm:block"
              style={{ transform: "translate(calc(var(--px) * 20px), calc(var(--py) * -20px))" }}
            >
              <div className="glass animate-float-slow flex items-center gap-2 rounded-full py-2 pr-4 pl-2 [animation-delay:-5s]">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-violet-500 text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-semibold">+18 keywords matched</span>
              </div>
            </div>

            <div className="absolute right-6 bottom-3 hidden items-center gap-1.5 text-xs text-slate-500 sm:flex">
              <Shield className="h-3.5 w-3.5" /> GDPR-safe · Human-written
            </div>
          </div>
        </Enter>
      </div>

      <style>{`
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes scan { 0% { top: -20%; } 50% { top: 100%; } 100% { top: -20%; } }
      `}</style>
    </section>
  );
}
