import { Reveal } from "../components/Reveal";
import { useCountUp, useInView } from "../hooks/useInView";

const companies = [
  { name: "Google", cls: "font-semibold tracking-tight" },
  { name: "Deloitte.", cls: "font-bold tracking-tight" },
  { name: "Spotify", cls: "font-bold tracking-tight" },
  { name: "Unilever", cls: "font-serif italic text-[1.35em]" },
  { name: "Accenture", cls: "font-medium tracking-wide" },
  { name: "NHS", cls: "font-extrabold italic tracking-tighter" },
  { name: "Amazon", cls: "font-bold tracking-tight" },
  { name: "PwC", cls: "font-serif text-[1.35em]" },
  { name: "Revolut", cls: "font-semibold tracking-[0.02em]" },
  { name: "HSBC", cls: "font-bold tracking-[0.12em]" },
  { name: "Microsoft", cls: "font-medium tracking-tight" },
  { name: "KPMG", cls: "font-extrabold tracking-wider" },
];

function Stat({ value, suffix, label, decimals = 0, delay }: { value: number; suffix: string; label: string; decimals?: number; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const n = useCountUp(value, inView, 2000, decimals);
  return (
    <Reveal delay={delay} className="text-center">
      <div ref={ref}>
        <p className="text-4xl font-semibold tracking-[-0.04em] text-ink-900 tabular-nums sm:text-5xl">
          {decimals ? n.toFixed(decimals) : n.toLocaleString()}
          <span className="text-gradient">{suffix}</span>
        </p>
        <p className="mt-2 text-sm text-slate-500">{label}</p>
      </div>
    </Reveal>
  );
}

export function SocialProof() {
  return (
    <section aria-label="Social proof" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Reveal>
          <p className="text-center text-sm font-medium text-slate-500">
            Our clients have landed roles at the world's most competitive employers
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div className="mask-fade-x group relative mt-8 overflow-hidden">
            <div className="animate-marquee flex w-max items-center gap-14 group-hover:[animation-play-state:paused] sm:gap-20">
              {[...companies, ...companies].map((c, i) => (
                <span
                  key={i}
                  aria-hidden={i >= companies.length}
                  className={`text-xl whitespace-nowrap text-slate-400 transition-colors duration-300 hover:text-ink-900 sm:text-2xl ${c.cls}`}
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-y-10 rounded-3xl border border-slate-200/70 bg-white/60 px-4 py-10 backdrop-blur sm:py-12 md:grid-cols-4">
          <Stat value={12000} suffix="+" label="CVs crafted since 2019" delay={0} />
          <Stat value={3.2} decimals={1} suffix="×" label="more interview callbacks" delay={80} />
          <Stat value={94} suffix="%" label="land interviews in 30 days" delay={160} />
          <Stat value={4.9} decimals={1} suffix="/5" label="average from 2,400+ reviews" delay={240} />
        </div>
      </div>
    </section>
  );
}
