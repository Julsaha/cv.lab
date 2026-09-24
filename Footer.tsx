import { Instagram, Linkedin, Logo, WhatsApp, XLogo } from "../components/Icons";
import { waLink } from "../config";

const cols = [
  { h: "Services", l: [["CV Writing", "#services"], ["Cover Letters", "#services"], ["LinkedIn Makeover", "#services"], ["Interview Coaching", "#services"], ["Student CVs", "#services"]] },
  { h: "Company", l: [["How it works", "#how"], ["Reviews", "#reviews"], ["Pricing", "#pricing"], ["Careers", "#"], ["Become a writer", "#"]] },
  { h: "Resources", l: [["CV Templates", "#"], ["Career Blog", "#"], ["Interview Questions", "#"], ["Salary Guide", "#"], ["FAQ", "#faq"]] },
];

export function Footer() {
  return (
    <footer className="relative mt-10 border-t border-slate-200/70 bg-white/50">
      <div className="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-slate-600">
              Expert CVs, cover letters and interview coaching for ambitious job seekers and students. Human-written. ATS-proven. Guaranteed.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { i: <WhatsApp className="h-4 w-4" />, l: "WhatsApp", href: waLink("Hi CV.Lab! 👋") },
                { i: <Linkedin className="h-4 w-4" />, l: "LinkedIn", href: "#" },
                { i: <Instagram className="h-4 w-4" />, l: "Instagram", href: "#" },
                { i: <XLogo className="h-4 w-4" />, l: "X", href: "#" },
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={`CV.Lab on ${s.l}`}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-slate-600 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink-900 hover:text-white hover:ring-ink-900"
                >
                  {s.i}
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map((c) => (
              <nav key={c.h} aria-label={c.h}>
                <h3 className="text-sm font-semibold text-ink-900">{c.h}</h3>
                <ul className="mt-4 space-y-3">
                  {c.l.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} className="group inline-flex items-center text-sm text-slate-500 transition-colors hover:text-ink-900">
                        <span className="relative">
                          {label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div aria-hidden className="mt-16 overflow-hidden select-none">
          <p className="bg-gradient-to-b from-slate-200 to-transparent bg-clip-text text-center text-[22vw] leading-[0.8] font-semibold tracking-[-0.06em] text-transparent lg:text-[240px]">
            CV.Lab
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-200/70 pt-8 text-sm text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} CV.Lab Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink-900">Privacy</a>
            <a href="#" className="hover:text-ink-900">Terms</a>
            <a href="#" className="hover:text-ink-900">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
