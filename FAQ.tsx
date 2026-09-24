import { useId, useState } from "react";
import { Plus, WhatsApp } from "../components/Icons";
import { waLink } from "../config";
import { Reveal, SectionHeading } from "../components/Reveal";
import { cn } from "../utils/cn";

const faqs = [
  {
    q: "Who will write my CV?",
    a: "A vetted, human career writer who specialises in your industry — many are former recruiters or hiring managers. We never hand your CV to a generic AI tool. Every document then passes a second QA review before delivery.",
  },
  {
    q: "How does the Interview Guarantee work?",
    a: "If you apply to at least 20 relevant roles within 60 days of receiving your final CV and don't get a single interview, we'll rewrite it from scratch for free. Still no luck? We'll refund you in full. Included with Job-Ready Pro and Career Accelerator.",
  },
  {
    q: "I'm a student with little experience. Can you still help?",
    a: "Absolutely — students and graduates are about a third of our clients. We draw out transferable skills from your degree, projects, societies, volunteering and part-time work. Our dedicated Student Resumes package is just ৳399 — built for exactly this.",
  },
  {
    q: "How long does it take?",
    a: "CV Refresh is delivered in 3 working days, Job-Ready Pro in 48 hours and Career Accelerator in 24 hours. Need it faster? Message us — we often accommodate urgent deadlines.",
  },
  {
    q: "Will my CV get past Applicant Tracking Systems (ATS)?",
    a: "Yes. We use ATS-safe layouts and fonts, and match keywords to the job descriptions you're targeting. You'll receive a before-and-after ATS score report with your order.",
  },
  {
    q: "What if I don't like the first draft?",
    a: "That's what revisions are for. Your writer will refine it until you're genuinely happy — Pro and Accelerator packages include unlimited revisions for 30 and 60 days respectively.",
  },
  {
    q: "Is my personal data safe?",
    a: "We're fully GDPR-compliant. Files are encrypted at rest and in transit, only your assigned writer can access them, and you can request permanent deletion at any time.",
  },
];

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div
      className={cn(
        "rounded-2xl border transition-all duration-500",
        open ? "border-indigo-200 bg-white shadow-[0_20px_40px_-30px_rgba(79,70,229,0.5)]" : "border-slate-200/80 bg-white/60 hover:border-slate-300",
      )}
    >
      <h3>
        <button
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left sm:px-6"
        >
          <span className="text-[16px] font-medium tracking-tight text-ink-900">{q}</span>
          <span
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              open ? "rotate-45 bg-ink-900 text-white" : "bg-slate-100 text-slate-600",
            )}
          >
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-6 text-[15px] leading-relaxed text-slate-600 sm:px-6">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="FAQ"
            title={
              <>
                Questions? <span className="font-serif font-normal italic text-gradient">Answered.</span>
              </>
            }
            subtitle="Everything you need to know before you order. Can't find what you're looking for?"
          />
          <Reveal delay={240}>
            <a
              href={waLink("Hi CV.Lab! 👋 I have a quick question —")}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex items-center gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_25px_50px_-30px_rgba(16,185,129,0.45)]"
            >
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-[#25D366] text-white">
                <WhatsApp />
                <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
              </span>
              <span>
                <span className="block font-semibold text-ink-900">Chat with us on WhatsApp</span>
                <span className="block text-sm text-slate-500">Typically replies in under 10 minutes</span>
              </span>
            </a>
          </Reveal>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 60}>
              <Item q={f.q} a={f.a} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? null : i)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
