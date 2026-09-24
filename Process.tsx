import { MessageCircle, Sparkles, Upload, Zap } from "../components/Icons";
import { Reveal, SectionHeading } from "../components/Reveal";
import { useInView } from "../hooks/useInView";

const steps = [
  {
    icon: <Upload />,
    title: "Upload & brief",
    desc: "Share your current CV (or none at all) and the roles you're targeting. Takes 3 minutes.",
    meta: "Day 0",
  },
  {
    icon: <MessageCircle />,
    title: "Meet your writer",
    desc: "A specialist in your field digs into your wins on a quick call or via our smart questionnaire.",
    meta: "Day 1",
  },
  {
    icon: <Sparkles />,
    title: "Receive your draft",
    desc: "A polished, ATS-tested CV lands in your inbox with notes explaining every decision.",
    meta: "Day 2",
  },
  {
    icon: <Zap />,
    title: "Refine & apply",
    desc: "Request unlimited tweaks, then apply with confidence. We're on hand until you're hired.",
    meta: "Day 3+",
  },
];

export function Process() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  return (
    <section id="how" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From upload to interview-ready in <span className="font-serif font-normal italic text-gradient">48 hours.</span>
            </>
          }
          subtitle="A simple, human process — designed around your schedule, not ours."
        />

        <div ref={ref} className="relative mt-16">
          {/* connector line */}
          <div aria-hidden className="absolute top-7 right-[12.5%] left-[12.5%] hidden h-px bg-slate-200 lg:block">
            <div
              className="h-full origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-transform duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ transform: `scaleX(${inView ? 1 : 0})` }}
            />
          </div>

          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 140} as="li">
                <div className="group relative flex h-full flex-col items-start text-left lg:items-center lg:text-center">
                  <div className="relative">
                    <span
                      className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-white text-indigo-600 shadow-[0_10px_30px_-10px_rgba(79,70,229,0.4)] ring-1 ring-slate-200 transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-ink-900 group-hover:text-white group-hover:ring-ink-900"
                    >
                      {s.icon}
                    </span>
                    <span className="absolute -top-2 -right-2 z-20 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-[11px] font-semibold text-white ring-4 ring-[#fbfbfd]">
                      {i + 1}
                    </span>
                  </div>
                  <div className="mt-6 w-full rounded-3xl border border-slate-200/70 bg-white/70 p-6 backdrop-blur transition-all duration-500 group-hover:border-indigo-200 group-hover:bg-white group-hover:shadow-[0_25px_50px_-30px_rgba(79,70,229,0.4)]">
                    <p className="text-xs font-medium tracking-wider text-indigo-600 uppercase">{s.meta}</p>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink-900">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
