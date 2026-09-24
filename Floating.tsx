import { useEffect, useState } from "react";
import { Button } from "./Button";
import { ArrowRight, Check, X } from "./Icons";
import { PLANS, useOrder } from "./OrderContext";
import { bdt } from "../config";
import { cn } from "../utils/cn";

export function MobileCTA() {
  const { open } = useOrder();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.documentElement.scrollHeight - 700;
      setShow(window.scrollY > 700 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-24 opacity-0",
      )}
    >
      <div className="glass flex items-center justify-between gap-3 rounded-full py-2 pr-2 pl-5">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">From {bdt(PLANS[0].priceBDT)} for students</p>
          <p className="truncate text-xs text-slate-500">48h delivery · Guaranteed</p>
        </div>
        <Button onClick={() => open("ats")} tabIndex={show ? 0 : -1}>
          Order <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

const orders = [
  { n: "Chloe", c: "Manchester", p: "Job-Ready Pro", t: "2 min ago" },
  { n: "Aarav", c: "Birmingham", p: "CV Refresh", t: "6 min ago" },
  { n: "Ella", c: "Edinburgh", p: "Career Accelerator", t: "11 min ago" },
  { n: "Kwame", c: "London", p: "Job-Ready Pro", t: "14 min ago" },
  { n: "Isla", c: "Bristol", p: "CV Refresh", t: "19 min ago" },
];

export function RecentOrderToast() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let hideT: ReturnType<typeof setTimeout>;
    const first = setTimeout(() => setVisible(true), 9000);
    const cycle = setInterval(() => {
      setVisible(false);
      hideT = setTimeout(() => {
        setIdx((i) => (i + 1) % orders.length);
        setVisible(true);
      }, 800);
    }, 16000);
    return () => {
      clearTimeout(first);
      clearTimeout(hideT);
      clearInterval(cycle);
    };
  }, [dismissed]);

  const o = orders[idx];
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-5 left-5 z-40 hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:block",
        visible && !dismissed ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <div className="glass flex items-center gap-3 rounded-2xl p-3 pr-10">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white">
          <Check className="h-5 w-5" />
        </span>
        <div className="text-sm">
          <p>
            <b>{o.n}</b> from {o.c} ordered
          </p>
          <p className="text-xs text-slate-500">
            {o.p} · {o.t}
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss notification"
          className="absolute top-2 right-2 grid h-6 w-6 place-items-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
