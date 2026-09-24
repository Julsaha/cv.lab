import { useCallback, useRef, useState, type PointerEvent } from "react";
import { Button } from "../components/Button";
import { ArrowRight, Check, Sparkles } from "../components/Icons";
import { useOrder } from "../components/OrderContext";
import { Reveal, SectionHeading } from "../components/Reveal";
import { cn } from "../utils/cn";

function BeforeCV() {
  return (
    <div className="h-full w-full bg-[#f7f5f0] p-6 font-[Georgia,serif] text-[11px] leading-[1.45] text-slate-700 sm:p-9 sm:text-[12.5px]">
      <p className="text-center text-lg font-bold text-slate-800 sm:text-xl">CURRICULUM VITAE</p>
      <p className="mt-1 text-center">Daniel Reyes — daniel.r1998@hotmail.com — 07700 900123</p>
      <p className="mt-5 font-bold underline">Personal Statement</p>
      <p className="mt-1">
        I am a hard working and motivated individual who works well in a team and also on my own. I am looking
        for a challenging role where I can use my skills and develop further in a good company.
      </p>
      <p className="mt-4 font-bold underline">Work Experience</p>
      <p className="mt-1 font-bold">Sales Assistant, Retail Store (2021 – present)</p>
      <p>- Responsible for helping customers</p>
      <p>- Responsible for stock and till</p>
      <p>- Did training for new staff members when needed</p>
      <p className="mt-2 font-bold">Intern, Marketing Agency (2020)</p>
      <p>- Helped with social media</p>
      <p>- Attended meetings and took notes</p>
      <p className="mt-4 font-bold underline">Education</p>
      <p>BA Business Management, 2:1 — University of Leeds</p>
      <p className="mt-4 font-bold underline">Hobbies</p>
      <p>Football, reading, going out with friends, travelling.</p>
      <p className="mt-4 font-bold underline">References</p>
      <p>Available on request.</p>
    </div>
  );
}

function AfterCV() {
  return (
    <div className="flex h-full w-full bg-white text-[10.5px] leading-[1.5] text-slate-600 sm:text-[12px]">
      <aside className="w-[34%] shrink-0 bg-gradient-to-b from-ink-900 to-indigo-950 p-4 text-slate-300 sm:p-6">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-cyan-300 sm:h-14 sm:w-14" />
        <p className="mt-4 text-sm font-semibold text-white sm:text-base">Daniel Reyes</p>
        <p className="text-indigo-200">Marketing Executive</p>
        <p className="mt-5 text-[9px] font-semibold tracking-[0.16em] text-indigo-300 uppercase">Core skills</p>
        <ul className="mt-2 space-y-1">
          {["Paid social (Meta, TikTok)", "GA4 & Looker Studio", "Content strategy", "CRM · HubSpot", "Team leadership"].map((s) => (
            <li key={s} className="flex items-start gap-1.5">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300" />
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-[9px] font-semibold tracking-[0.16em] text-indigo-300 uppercase">Education</p>
        <p className="mt-2 text-white">BA Business Mgmt, 2:1</p>
        <p>University of Leeds</p>
      </aside>
      <div className="flex-1 p-4 sm:p-6">
        <p className="text-[9px] font-semibold tracking-[0.16em] text-indigo-600 uppercase">Profile</p>
        <p className="mt-1.5 text-slate-700">
          Data-driven marketer with a record of turning small budgets into measurable growth. Grew a retail
          brand's social revenue <b className="text-ink-900">+148%</b> and led onboarding for a 12-person team.
        </p>
        <p className="mt-4 text-[9px] font-semibold tracking-[0.16em] text-indigo-600 uppercase">Experience</p>
        <p className="mt-1.5 font-semibold text-ink-900">Senior Sales Associate · 2021–Present</p>
        <ul className="mt-1 space-y-1">
          <li>▸ Ranked <b className="text-ink-900">#1 of 34</b> staff for conversion, exceeding targets by 27%</li>
          <li>▸ Designed training that cut onboarding time <b className="text-ink-900">40%</b></li>
        </ul>
        <p className="mt-3 font-semibold text-ink-900">Marketing Intern · 2020</p>
        <ul className="mt-1 space-y-1">
          <li>▸ Launched 3 paid campaigns delivering <b className="text-ink-900">$42k</b> in sales</li>
          <li>▸ Built weekly GA4 dashboard adopted by leadership</li>
        </ul>
        <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 ring-1 ring-emerald-100">
          <Check className="h-3 w-3" /> ATS score 94 / 100
        </div>
      </div>
    </div>
  );
}

const improvements = [
  { t: "Achievements, not duties", d: "Every bullet leads with impact and a number recruiters remember." },
  { t: "Keyword-matched for ATS", d: "Aligned to the exact language in your target job descriptions." },
  { t: "Designed to be skimmed", d: "Clear hierarchy that guides the eye to your strongest proof." },
  { t: "Filler removed", d: "No clichés, hobbies padding or 'references on request'." },
];

export function Showcase() {
  const { open } = useOrder();
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const update = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };

  return (
    <section id="showcase" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="absolute inset-x-0 top-1/3 -z-10 h-[500px] bg-gradient-to-r from-indigo-100/50 via-fuchsia-100/40 to-cyan-100/50 blur-3xl" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Before & After"
          title={
            <>
              Same person. Same experience.{" "}
              <span className="font-serif font-normal italic text-gradient">Completely different results.</span>
            </>
          }
          subtitle="Drag the slider to see how a CV.Lab rewrite turns an overlooked application into an interview magnet."
        />

        <div className="mt-14 grid items-center gap-10 lg:mt-16 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <Reveal>
            <div className="relative">
              <div className="ring-gradient relative rounded-[28px] bg-white/70 p-2 shadow-[0_40px_100px_-40px_rgba(49,46,129,0.45)] backdrop-blur sm:p-3">
                <div
                  ref={box}
                  onPointerDown={onDown}
                  onPointerMove={(e) => dragging && update(e.clientX)}
                  onPointerUp={() => setDragging(false)}
                  onPointerCancel={() => setDragging(false)}
                  className={cn(
                    "relative aspect-[4/3.6] touch-pan-y overflow-hidden rounded-[20px] select-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 sm:aspect-[4/3.2]",
                    dragging ? "cursor-grabbing" : "cursor-ew-resize",
                  )}
                >
                  <div className="absolute inset-0">
                    <AfterCV />
                  </div>
                  <div
                    className="absolute inset-0"
                    style={{ clipPath: `inset(0 ${100 - pos}% 0 0)`, transition: dragging ? "none" : "clip-path 0.5s cubic-bezier(.16,1,.3,1)" }}
                  >
                    <BeforeCV />
                  </div>

                  <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-slate-900/70 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                    Before
                  </span>
                  <span className="pointer-events-none absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1 text-[11px] font-medium text-white shadow-lg">
                    <Sparkles className="h-3 w-3" /> CV.Lab
                  </span>

                  {/* handle */}
                  <div
                    className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(99,102,241,0.3),0_0_20px_rgba(99,102,241,0.5)]"
                    style={{ left: `${pos}%`, transition: dragging ? "none" : "left 0.5s cubic-bezier(.16,1,.3,1)" }}
                  >
                    <div
                      className={cn(
                        "absolute top-1/2 left-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-indigo-600 shadow-xl ring-1 ring-indigo-100 transition-transform duration-300",
                        dragging && "scale-110",
                      )}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                        <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                      </svg>
                    </div>
                  </div>

                  <label className="sr-only" htmlFor="compare">Compare before and after CV</label>
                  <input
                    id="compare"
                    type="range"
                    min={2}
                    max={98}
                    value={Math.round(pos)}
                    onChange={(e) => setPos(Number(e.target.value))}
                    className="peer absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
                    style={{ pointerEvents: "none" }}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                {[
                  ["Before", 96],
                  ["Split", 50],
                  ["After", 4],
                ].map(([l, v]) => (
                  <button
                    key={l}
                    onClick={() => setPos(v as number)}
                    className={cn(
                      "rounded-full px-4 py-1.5 text-xs font-medium ring-1 transition-all",
                      Math.abs(pos - (v as number)) < 3
                        ? "bg-ink-900 text-white ring-ink-900"
                        : "bg-white text-slate-600 ring-slate-200 hover:ring-slate-300",
                    )}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div>
            <ul className="space-y-3">
              {improvements.map((it, i) => (
                <Reveal key={it.t} delay={i * 90} as="li">
                  <div className="group flex gap-4 rounded-2xl border border-transparent p-4 transition-all duration-500 hover:border-slate-200 hover:bg-white hover:shadow-[0_20px_40px_-25px_rgba(30,27,75,0.3)]">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-sm font-semibold text-indigo-600 ring-1 ring-indigo-100 transition-colors duration-500 group-hover:bg-indigo-600 group-hover:text-white">
                      0{i + 1}
                    </span>
                    <div>
                      <p className="font-semibold tracking-tight text-ink-900">{it.t}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-slate-600">{it.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={400}>
              <div className="mt-6 flex flex-col gap-3 pl-4 sm:flex-row sm:items-center">
                <Button size="lg" onClick={() => open("ats")}>
                  Transform my CV <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-sm text-slate-500">Avg. turnaround: 41 hours</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
