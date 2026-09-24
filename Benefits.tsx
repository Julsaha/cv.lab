import { Check, Clock, Globe, Lock, Shield, Users, X } from "../components/Icons";
import { Reveal, SectionHeading } from "../components/Reveal";

const benefits = [
  { icon: <Users />, t: "Industry-specialist writers", d: "Ex-recruiters and hiring managers across 40+ sectors — from tech and finance to healthcare and the creative industries." },
  { icon: <Shield />, t: "Interview Guarantee", d: "No interviews within 60 days? We'll rewrite your CV free — or refund you. No small print." },
  { icon: <Clock />, t: "Fast, without the rush", d: "48-hour standard delivery, 24-hour priority. Every draft still gets a second-pair-of-eyes QA." },
  { icon: <Globe />, t: "UK, EU & global formats", d: "CVs, résumés and Europass tailored to local conventions, so you look native wherever you apply." },
  { icon: <Lock />, t: "Private by design", d: "GDPR-compliant, encrypted storage. Your data is never sold, shared or used to train AI." },
  { icon: <Check />, t: "Yours forever", d: "Editable Word + PDF files, plus free minor updates for 12 months as your career grows." },
];

const rows = [
  ["Written by a human expert", false, "partial", true],
  ["Passes ATS filters", "partial", "partial", true],
  ["Tailored to your target roles", false, false, true],
  ["Quantified achievements", false, "partial", true],
  ["Interview Guarantee", false, false, true],
] as const;

function Cell({ v }: { v: boolean | "partial" }) {
  if (v === true)
    return (
      <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-500/30">
        <Check className="h-4 w-4" />
        <span className="sr-only">Yes</span>
      </span>
    );
  if (v === "partial")
    return (
      <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-white/10 text-amber-300">
        <span aria-hidden className="h-0.5 w-3 rounded bg-current" />
        <span className="sr-only">Partially</span>
      </span>
    );
  return (
    <span className="mx-auto grid h-7 w-7 place-items-center rounded-full bg-white/5 text-slate-500">
      <X className="h-3.5 w-3.5" />
      <span className="sr-only">No</span>
    </span>
  );
}

export function Benefits() {
  return (
    <section aria-labelledby="why-title" className="relative px-3 py-4 sm:px-4">
      <div className="noise relative mx-auto max-w-[1400px] overflow-hidden rounded-[36px] bg-ink-900 py-20 sm:rounded-[48px] sm:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="animate-blob absolute -top-32 left-[10%] h-[420px] w-[420px] rounded-full bg-indigo-600/30 blur-[120px]" />
          <div className="animate-blob absolute right-[5%] bottom-0 h-[380px] w-[380px] rounded-full bg-cyan-500/20 blur-[120px] [animation-delay:-8s]" />
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
          <div id="why-title">
            <SectionHeading
              dark
              eyebrow="Why CV.Lab"
              title={
                <>
                  The unfair advantage in a market where{" "}
                  <span className="font-serif font-normal italic text-gradient-light">250 people apply</span> for every role.
                </>
              }
              subtitle="Templates and AI generators make you sound like everyone else. We make you sound like the obvious hire."
            />
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.t} delay={(i % 3) * 90}>
                <div className="group glass-dark h-full rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.08] sm:p-7">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500/25 to-cyan-400/20 text-indigo-200 ring-1 ring-white/10 transition-all duration-500 group-hover:from-indigo-500 group-hover:to-cyan-400 group-hover:text-white">
                    {b.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{b.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slate-400">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={100}>
            <div className="glass-dark mt-10 overflow-x-auto rounded-3xl">
              <table className="w-full min-w-[560px] text-sm">
                <caption className="sr-only">Comparison of CV.Lab with DIY templates and AI generators</caption>
                <thead>
                  <tr className="border-b border-white/10 text-slate-400">
                    <th scope="col" className="p-5 text-left font-medium">What you get</th>
                    <th scope="col" className="p-5 font-medium">DIY template</th>
                    <th scope="col" className="p-5 font-medium">AI generator</th>
                    <th scope="col" className="relative p-5 font-semibold text-white">
                      <span className="absolute inset-x-2 top-2 bottom-0 -z-0 rounded-t-2xl bg-gradient-to-b from-indigo-500/20 to-transparent" />
                      <span className="relative">CV.Lab</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([label, a, b, c]) => (
                    <tr key={label} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]">
                      <th scope="row" className="p-5 text-left font-normal text-slate-300">{label}</th>
                      <td className="p-5 text-center"><Cell v={a} /></td>
                      <td className="p-5 text-center"><Cell v={b} /></td>
                      <td className="p-5 text-center"><Cell v={c} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
