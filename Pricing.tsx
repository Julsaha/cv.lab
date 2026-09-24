import type { ReactNode } from "react";
import { Button } from "../components/Button";
import { ArrowRight, Briefcase, Check, FileText, Globe, GradCap, Linkedin, Lock, MessageCircle, Plus, Search, Shield, Target, Zap } from "../components/Icons";
import { ADDONS, PLANS, useOrder } from "../components/OrderContext";
import { Reveal, SectionHeading } from "../components/Reveal";
import { bdt, usd, waLink } from "../config";
import { cn } from "../utils/cn";

const ADDON_ICONS: Record<string, ReactNode> = {
  "cover-letter": <FileText className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  bdjobs: <Briefcase className="h-4 w-4" />,
  indeed: <Search className="h-4 w-4" />,
  tailoring: <Target className="h-4 w-4" />,
  europass: <Globe className="h-4 w-4" />,
  academic: <GradCap className="h-4 w-4" />,
};

export function Pricing() {
  const { open } = useOrder();

  return (
    <section id="pricing" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden className="absolute top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-200/40 via-violet-200/30 to-cyan-200/40 blur-3xl" />
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              One investment. <span className="font-serif font-normal italic text-gradient">A career of returns.</span>
            </>
          }
          subtitle="Transparent, one-off pricing. No subscriptions, no surprises — and every package is backed by our guarantee."
        />

        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2 lg:grid-cols-6">
          {PLANS.map((p, i) => {
            const price = { bdt: p.priceBDT, usd: p.priceUSD };
            return (
              <Reveal
                key={p.id}
                delay={i * 110}
                className={cn("lg:col-span-2", p.popular && "lg:-mt-4", i === 3 && "lg:col-start-2")}
              >
                <article
                  className={cn(
                    "group relative flex h-full flex-col rounded-[28px] p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8",
                    p.popular
                      ? "ring-gradient bg-ink-900 text-white shadow-[0_40px_80px_-30px_rgba(79,70,229,0.6)] hover:-translate-y-1.5"
                      : "border border-slate-200/80 bg-white/80 backdrop-blur hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_30px_60px_-35px_rgba(30,27,75,0.35)]",
                  )}
                >
                  {p.popular && (
                    <>
                      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
                        <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-indigo-500/40 blur-3xl" />
                        <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
                      </div>
                      <span className="absolute -top-3.5 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 px-3.5 py-1 text-xs font-semibold whitespace-nowrap text-white shadow-lg shadow-indigo-500/40">
                        <Zap className="h-3 w-3" /> Most popular · 68% choose this
                      </span>
                    </>
                  )}
                  <div className="relative">
                    <h3 className={cn("text-lg font-semibold tracking-tight", p.popular ? "text-white" : "text-ink-900")}>{p.name}</h3>
                    <p className={cn("mt-1 text-sm", p.popular ? "text-slate-400" : "text-slate-500")}>{p.tagline}</p>

                    <div className="mt-6 flex items-end gap-2.5">
                      <span className="relative overflow-hidden text-[2.6rem] leading-none font-semibold tracking-[-0.04em] tabular-nums">
                        <span key={price.bdt} className="inline-block [animation:price-in_0.5s_cubic-bezier(.16,1,.3,1)]">
                          {bdt(price.bdt)}
                        </span>
                      </span>
                      <div className="pb-0.5">
                        <p className={cn("text-sm", p.popular ? "text-slate-400" : "text-slate-500")}>
                          <span className="font-medium">{usd(price.usd)}</span> · one-off
                        </p>
                      </div>
                    </div>
                    <p className={cn("mt-2 inline-flex items-center gap-1.5 text-xs font-medium", p.popular ? "text-cyan-300" : "text-indigo-600")}>
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {p.delivery}
                    </p>

                    <Button
                      variant={p.popular ? "light" : "primary"}
                      size="lg"
                      className="mt-7 w-full"
                      onClick={() => open(p.id)}
                      aria-label={`Choose ${p.name} for ${bdt(price.bdt)} (${usd(price.usd)})`}
                    >
                      Choose {p.name}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>

                    <ul className="mt-8 space-y-3.5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[15px]">
                          <span
                            className={cn(
                              "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full",
                              p.popular ? "bg-gradient-to-br from-indigo-400 to-cyan-400 text-white" : "bg-indigo-50 text-indigo-600",
                            )}
                          >
                            <Check className="h-3 w-3" strokeWidth={2.5} />
                          </span>
                          <span className={p.popular ? "text-slate-200" : "text-slate-700"}>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <div className="mt-16">
            <div className="text-center">
              <h3 className="text-2xl font-semibold tracking-tight text-ink-900">
                Power up any package
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Optional add-ons — pick any of these with your order on WhatsApp.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {ADDONS.map((a) => (
                <a
                  key={a.id}
                  href={waLink(`Hi CV.Lab! 👋 I'd like to add *${a.name}* to my order.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/80 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_20px_40px_-25px_rgba(79,70,229,0.4)]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                    {ADDON_ICONS[a.id]}
                  </span>
                  <span className="flex-1 text-sm font-medium text-ink-900">{a.name}</span>
                  <Plus className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-300 group-hover:rotate-90 group-hover:text-indigo-600" />
                </a>
              ))}
              <a
                href={waLink("Hi CV.Lab! 👋 I need something a bit different — can you help?")}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-50/40"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500 transition-colors group-hover:bg-ink-900 group-hover:text-white">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <span className="flex-1 text-sm font-medium text-slate-600 group-hover:text-ink-900">Need something else? Just ask</span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-col items-center justify-center gap-4 text-sm text-slate-500 sm:flex-row sm:gap-8">
            <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4 text-emerald-500" /> 60-day Interview Guarantee</span>
            <span className="inline-flex items-center gap-2"><Lock className="h-4 w-4 text-emerald-500" /> Secure checkout · Flexible payment options</span>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Free ATS scan included</span>
          </div>
        </Reveal>
      </div>
      <style>{`@keyframes price-in { from { transform: translateY(60%); opacity: 0; filter: blur(4px);} to { transform: none; opacity: 1; filter: none; } }`}</style>
    </section>
  );
}
