import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "./Button";
import { ArrowRight, Check, Lock, Shield, WhatsApp, X } from "./Icons";
import { ADDONS, PLANS, type PlanId } from "./OrderContext";
import { bdt, usd, waLink } from "../config";
import { cn } from "../utils/cn";

type Props = { isOpen: boolean; plan: PlanId; onClose: () => void };

export function OrderModal({ isOpen, plan: initialPlan, onClose }: Props) {
  const [plan, setPlan] = useState<PlanId>(initialPlan);
  const [form, setForm] = useState({ name: "", role: "" });
  const [addons, setAddons] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInput = useRef<HTMLInputElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPlan(initialPlan);
      setStatus("idle");
      setErrors({});
      setAddons([]);
      lastFocus.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => firstInput.current?.focus(), 80);
    } else {
      document.body.style.overflow = "";
      lastFocus.current?.focus?.();
    }
  }, [isOpen, initialPlan]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  const selected = PLANS.find((p) => p.id === plan)!;
  const price = { bdt: selected.priceBDT, usd: selected.priceUSD };

  const toggleAddon = (id: string) =>
    setAddons((a) => (a.includes(id) ? a.filter((x) => x !== id) : [...a, id]));

  const message = () => {
    const lines = [
      `Hi CV.Lab! 👋 I'd like to order the *${selected.name}* package — ${bdt(price.bdt)} (${usd(price.usd)}).`,
      `Name: ${form.name.trim()}`,
    ];
    if (form.role.trim()) lines.push(`Target role: ${form.role.trim()}`);
    if (addons.length) {
      const names = addons.map((id) => ADDONS.find((a) => a.id === id)?.name).filter(Boolean);
      if (names.length) lines.push(`Add-ons: ${names.join(", ")}`);
    }
    lines.push("I'll share my current CV here in the chat. Thanks!");
    return lines.join("\n");
  };

  const openWhatsApp = () => window.open(waLink(message()), "_blank", "noopener,noreferrer");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please enter your name";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("loading");
    openWhatsApp();
    setTimeout(() => setStatus("done"), 900);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!isOpen}
    >
      <div
        onClick={onClose}
        className={cn(
          "absolute inset-0 bg-ink-950/50 backdrop-blur-sm transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
        className={cn(
          "relative max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-t-[32px] bg-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:rounded-[32px]",
          isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-[0.97] opacity-0",
        )}
      >
        {isOpen && (
          <>
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/85 px-6 py-4 backdrop-blur sm:px-8">
              <div>
                <h2 id="order-title" className="text-lg font-semibold tracking-tight">
                  {status === "done" ? "Order started" : "Start your order"}
                </h2>
                {status !== "done" && <p className="text-xs text-slate-500">Takes under a minute · No payment until you approve your brief</p>}
              </div>
              <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:rotate-90 hover:bg-slate-200">
                <X className="h-4 w-4" />
              </button>
            </div>

            {status === "done" ? (
              <div className="px-6 py-12 text-center sm:px-10">
                <div className="relative mx-auto grid h-20 w-20 place-items-center">
                  <span className="animate-pulse-ring absolute inset-0 rounded-full bg-emerald-300" />
                  <span className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-xl shadow-emerald-500/30">
                    <WhatsApp className="h-10 w-10" />
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight">Almost there, {form.name.split(" ")[0]}! 🎉</h3>
                <p className="mx-auto mt-3 max-w-sm text-slate-600">
                  We've opened <b className="text-ink-900">WhatsApp</b> with your order pre-filled — just press{" "}
                  <b className="text-ink-900">send</b>, then share your current CV in the chat. Your {selected.name} writer will reply within 2 hours.
                </p>
                <div className="mx-auto mt-6 max-w-sm rounded-2xl bg-slate-50 p-4 text-left text-sm ring-1 ring-slate-100">
                  <div className="flex justify-between"><span className="text-slate-500">Package</span><span className="font-medium">{selected.name}</span></div>
                  <div className="mt-2 flex justify-between"><span className="text-slate-500">Delivery</span><span className="font-medium">{selected.delivery}</span></div>
                  <div className="mt-2 flex justify-between"><span className="text-slate-500">Total</span><span className="font-medium">{bdt(price.bdt)} · {usd(price.usd)}</span></div>
                </div>
                <a
                  href={waLink(message())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 text-[15px] font-semibold text-white shadow-[0_15px_40px_-12px_rgba(37,211,102,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1fbe5b] active:scale-[0.97]"
                >
                  <WhatsApp className="h-5 w-5" /> Open WhatsApp
                </a>
                <p className="mt-3 text-xs text-slate-400">Didn't open? Tap the button above — your details are pre-filled.</p>
                <Button variant="ghost" className="mt-2 w-full" onClick={onClose}>Back to site</Button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-6 px-6 py-6 sm:px-8">
                <fieldset>
                  <legend className="text-sm font-medium text-ink-900">Choose your package</legend>
                  <div className="mt-3 grid gap-2.5">
                    {PLANS.map((p) => {
                      const active = plan === p.id;
                      return (
                        <label
                          key={p.id}
                          className={cn(
                            "relative flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-all duration-300",
                            active ? "border-indigo-500 bg-indigo-50/50 shadow-[0_0_0_3px_rgba(99,102,241,0.15)]" : "border-slate-200 hover:border-slate-300",
                          )}
                        >
                          <input type="radio" name="plan" value={p.id} checked={active} onChange={() => setPlan(p.id)} className="sr-only" />
                          <span className={cn("grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 transition", active ? "border-indigo-600" : "border-slate-300")}>
                            <span className={cn("h-2.5 w-2.5 rounded-full bg-indigo-600 transition-transform", active ? "scale-100" : "scale-0")} />
                          </span>
                          <span className="flex-1">
                            <span className="flex items-center gap-2 text-sm font-semibold">
                              {p.name}
                              {p.popular && <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-semibold text-white">Popular</span>}
                            </span>
                            <span className="block text-xs text-slate-500">{p.delivery}</span>
                          </span>
                          <span className="text-right">
                            <span className="block font-semibold tabular-nums">{bdt(p.priceBDT)}</span>
                            <span className="block text-xs text-slate-400">{usd(p.priceUSD)}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="text-sm font-medium text-ink-900">
                    Add-ons <span className="font-normal text-slate-400">(optional)</span>
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ADDONS.map((a) => {
                      const on = addons.includes(a.id);
                      return (
                        <button
                          type="button"
                          key={a.id}
                          onClick={() => toggleAddon(a.id)}
                          aria-pressed={on}
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all duration-200",
                            on
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700 shadow-[0_0_0_3px_rgba(99,102,241,0.12)]"
                              : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50",
                          )}
                        >
                          <span className={cn("grid h-4 w-4 place-items-center rounded-full transition-all", on ? "bg-indigo-600 text-white" : "bg-slate-100 text-transparent")}>
                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          </span>
                          {a.name}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="o-name" className="text-sm font-medium text-ink-900">Full name</label>
                  <input
                    ref={firstInput}
                    id="o-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "o-name-err" : undefined}
                    className={cn(
                      "mt-1.5 h-12 w-full rounded-xl border bg-white px-4 text-[15px] transition placeholder:text-slate-400 focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)] focus:outline-none",
                      errors.name ? "border-rose-400" : "border-slate-200",
                    )}
                  />
                  {errors.name && <p id="o-name-err" className="mt-1 text-xs text-rose-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="o-role" className="text-sm font-medium text-ink-900">Target role <span className="font-normal text-slate-400">(optional)</span></label>
                  <input
                    id="o-role"
                    type="text"
                    placeholder="e.g. Graduate Software Engineer"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="mt-1.5 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-[15px] transition placeholder:text-slate-400 focus:border-indigo-500 focus:shadow-[0_0_0_4px_rgba(99,102,241,0.12)] focus:outline-none"
                  />
                </div>

                <div className="rounded-2xl bg-indigo-50/60 p-4 text-sm text-slate-600 ring-1 ring-indigo-100">
                  📎 You'll attach your current CV in the WhatsApp chat after ordering — PDF or Word both work.
                </div>

                <div className="sticky bottom-0 -mx-6 border-t border-slate-100 bg-white/90 px-6 pt-4 pb-6 backdrop-blur sm:-mx-8 sm:px-8">
                  <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                    {status === "loading" ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Opening WhatsApp…
                      </>
                    ) : (
                      <>
                        <WhatsApp className="h-5 w-5 text-[#25D366]" /> Order on WhatsApp — {bdt(price.bdt)} · {usd(price.usd)} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </Button>
                  <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Private & secure</span>
                    <span className="inline-flex items-center gap-1"><Shield className="h-3.5 w-3.5" /> Interview Guarantee</span>
                  </div>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
