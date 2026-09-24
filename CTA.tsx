import { Sparkles, WhatsApp } from "../components/Icons";
import { useOrder } from "../components/OrderContext";
import { Reveal } from "../components/Reveal";
import { waLink } from "../config";
import { AVATARS } from "./Hero";

export function CTA() {
  const { open } = useOrder();

  return (
    <section aria-labelledby="cta-title" className="relative px-3 py-10 sm:px-4 sm:py-16">
      <Reveal>
        <div className="noise relative mx-auto max-w-6xl overflow-hidden rounded-[36px] bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-800 px-6 py-16 text-center text-white sm:rounded-[44px] sm:px-12 sm:py-24">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="animate-blob absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-400/40 blur-[100px]" />
            <div className="animate-blob absolute -right-24 -bottom-32 h-[420px] w-[420px] rounded-full bg-fuchsia-500/40 blur-[100px] [animation-delay:-9s]" />
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            <div className="animate-spin-slow absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium ring-1 ring-white/20 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-300" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
              </span>
              Only 14 priority slots left this week
            </span>
            <h2 id="cta-title" className="mt-6 text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl">
              Stop applying into the void.{" "}
              <span className="font-serif font-normal italic">Start getting callbacks.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-indigo-100/90">
              Get a free, no-obligation CV review from a real expert within 24 hours — and see exactly what's holding you back.
            </p>

            <Reveal delay={120}>
              <div className="mt-10 flex flex-col items-center justify-center gap-3">
                <a
                  href={waLink("Hi CV.Lab! 👋 I'd like a free CV review — I'll share my current CV here in the chat.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-14 w-full max-w-md items-center justify-center gap-2.5 rounded-full bg-white px-8 text-[15px] font-semibold text-ink-900 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_28px_60px_-15px_rgba(0,0,0,0.6)] active:scale-[0.97]"
                >
                  <WhatsApp className="h-5 w-5 text-[#25D366]" />
                  Get my free CV review on WhatsApp
                </a>
                <p className="text-sm text-indigo-100/70">No sign-up needed · Replies within a few hours · 100% free</p>
              </div>
            </Reveal>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="flex -space-x-2">
                {AVATARS.slice(3, 7).map((a) => (
                  <img key={a} src={a} alt="" loading="lazy" className="h-8 w-8 rounded-full object-cover ring-2 ring-indigo-600" />
                ))}
              </div>
              <p className="text-sm text-indigo-100/80">
                Or skip the queue —{" "}
                <button onClick={() => open("ats")} className="inline-flex items-center gap-1 font-medium text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white">
                  order your rewrite now <Sparkles className="h-3.5 w-3.5" />
                </button>
              </p>
            </div>
          </div>
        </div>
      </Reveal>
      <style>{`@keyframes pop { from { transform: scale(.9); opacity: 0; } to { transform: none; opacity: 1; } }`}</style>
    </section>
  );
}
