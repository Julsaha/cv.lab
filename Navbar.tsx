import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ArrowRight, Logo, Menu, X } from "../components/Icons";
import { useOrder } from "../components/OrderContext";
import { cn } from "../utils/cn";

const links = [
  { href: "#services", label: "Services" },
  { href: "#showcase", label: "Before & After" },
  { href: "#how", label: "How it works" },
  { href: "#reviews", label: "Reviews" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const { open } = useOrder();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? y / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={cn(
          "relative mx-auto flex h-14 max-w-6xl items-center justify-between rounded-full pr-2 pl-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          scrolled || menuOpen ? "glass" : "bg-transparent",
        )}
      >
        <a href="#top" aria-label="CV.Lab home" className="shrink-0">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                  active === l.href ? "text-ink-900" : "text-slate-500 hover:text-ink-900",
                )}
              >
                {active === l.href && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-slate-900/[0.05]" />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#pricing"
            className="hidden px-3 text-sm text-slate-600 transition-colors hover:text-ink-900 sm:block lg:hidden xl:block"
          >
            Free CV review
          </a>
          <Button onClick={() => open()} className="hidden sm:inline-flex">
            Get started
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full text-ink-900 transition hover:bg-slate-900/5 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* scroll progress */}
        <span
          aria-hidden
          className={cn(
            "absolute bottom-0 left-6 right-6 h-px origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-opacity",
            scrolled ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: `scaleX(${progress})` }}
        />
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "mx-auto mt-2 max-w-6xl origin-top overflow-hidden rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden",
          menuOpen ? "glass max-h-[80vh] opacity-100" : "pointer-events-none max-h-0 opacity-0",
        )}
      >
        <ul className="flex flex-col p-3">
          {links.map((l, i) => (
            <li
              key={l.href}
              className="transition-all duration-500"
              style={{
                transitionDelay: menuOpen ? `${60 + i * 40}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "none" : "translateY(-8px)",
              }}
            >
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-medium text-ink-900 hover:bg-slate-900/5"
                tabIndex={menuOpen ? 0 : -1}
              >
                {l.label}
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </a>
            </li>
          ))}
          <li className="p-2 pt-3">
            <Button
              size="lg"
              className="w-full"
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
            >
              Get my CV rewritten <ArrowRight className="h-4 w-4" />
            </Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
