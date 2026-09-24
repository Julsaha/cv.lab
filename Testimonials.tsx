import { Star } from "../components/Icons";
import { Reveal, SectionHeading } from "../components/Reveal";
import { AVATARS } from "./Hero";

type T = { name: string; role: string; quote: string; avatar: string; result?: string };

const testimonials: T[] = [
  { name: "Amara O.", role: "Graduate Data Analyst", avatar: AVATARS[0], result: "Hired in 3 weeks", quote: "I'd sent 60+ applications with zero replies. Two weeks after my CV.Lab rewrite I had four interviews and two offers. Genuinely life-changing." },
  { name: "James T.", role: "Software Engineer", avatar: AVATARS[1], result: "+$14k salary", quote: "My writer understood tech hiring better than most recruiters I've met. The new CV got me past Big Tech screening for the first time." },
  { name: "Sofia R.", role: "Marketing Executive", avatar: AVATARS[2], quote: "The before-and-after was wild. Same experience, but suddenly I sounded like someone you'd want to hire. Worth every penny." },
  { name: "Marcus L.", role: "Career changer → UX", avatar: AVATARS[3], result: "Switched careers", quote: "Changing careers at 34 felt impossible. CV.Lab reframed my teaching background into UX strengths. I start at a product studio next month." },
  { name: "Priya K.", role: "Law student, Year 3", avatar: AVATARS[4], result: "Vacation scheme offer", quote: "As a student I thought I had nothing to put on a CV. They found the gold in my society roles and part-time job. Landed a Magic Circle vac scheme." },
  { name: "Tomi A.", role: "Operations Manager", avatar: AVATARS[5], quote: "Fast, friendly and properly thorough. The LinkedIn makeover alone brought three recruiters into my inbox in the first week." },
  { name: "Hannah W.", role: "Registered Nurse", avatar: AVATARS[6], result: "Band 6 promotion", quote: "I finally have a CV that reflects what I actually do. Interview coaching gave me the confidence to go for the promotion — and get it." },
  { name: "Leo M.", role: "Finance Graduate", avatar: AVATARS[7], quote: "The mock interview was tougher than the real thing, which is exactly what I needed. Accepted a grad scheme offer at a Big Four firm." },
];

function TCard({ t }: { t: T }) {
  return (
    <figure className="group rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-500 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-[0_25px_50px_-30px_rgba(79,70,229,0.4)]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4" />
          ))}
        </div>
        {t.result && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
            {t.result}
          </span>
        )}
      </div>
      <blockquote className="mt-4 text-[15px] leading-relaxed text-slate-700">"{t.quote}"</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <img src={t.avatar} alt="" width={40} height={40} loading="lazy" className="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
        <div>
          <p className="text-sm font-semibold text-ink-900">{t.name}</p>
          <p className="text-xs text-slate-500">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function Column({ items, duration, className = "" }: { items: T[]; duration: string; className?: string }) {
  return (
    <div className={`group relative h-[640px] overflow-hidden ${className}`}>
      <div
        className="animate-marquee-y flex flex-col gap-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ animationDuration: duration }}
      >
        {[...items, ...items].map((t, i) => (
          <div key={i} aria-hidden={i >= items.length}>
            <TCard t={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const c1 = [testimonials[0], testimonials[3], testimonials[6]];
  const c2 = [testimonials[1], testimonials[4], testimonials[7]];
  const c3 = [testimonials[2], testimonials[5], testimonials[0]];
  return (
    <section id="reviews" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Success stories"
          title={
            <>
              12,000 careers moved forward. <span className="font-serif font-normal italic text-gradient">Here's a few.</span>
            </>
          }
          subtitle="Real people, real offers. Rated 4.9/5 across Trustpilot and Google."
        />

        <Reveal delay={100}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              ["Trustpilot", "4.9"],
              ["Google", "4.9"],
              ["Students' choice", "2025"],
            ].map(([k, v]) => (
              <span key={k} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm ring-1 ring-slate-200">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="font-semibold text-ink-900">{v}</span>
                <span className="text-slate-500">{k}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mask-fade-y mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Column items={c1} duration="38s" />
            <Column items={c2} duration="46s" className="hidden md:block" />
            <Column items={c3} duration="42s" className="hidden lg:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
