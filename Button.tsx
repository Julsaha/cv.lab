import { useRef, type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { cn } from "../utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "light";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "md" | "lg";
  magnetic?: boolean;
  children: ReactNode;
};

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-ink-900 shadow-[0_10px_30px_-10px_rgba(79,70,229,0.6),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_18px_40px_-12px_rgba(79,70,229,0.75),inset_0_1px_0_rgba(255,255,255,0.2)]",
  secondary:
    "text-ink-900 bg-white/80 ring-1 ring-slate-200 backdrop-blur hover:bg-white hover:ring-slate-300 shadow-sm",
  ghost: "text-slate-700 hover:text-ink-900 hover:bg-slate-100/70",
  light:
    "text-ink-900 bg-white shadow-[0_10px_30px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_18px_40px_-10px_rgba(255,255,255,0.6)]",
};

export function Button({
  variant = "primary",
  size = "md",
  magnetic = false,
  className,
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    onMouseMove?.(e);
    if (!magnetic || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.25}px)`;
  };
  const handleLeave = (e: MouseEvent<HTMLButtonElement>) => {
    onMouseLeave?.(e);
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60",
        size === "lg" ? "h-13 px-7 text-[15px]" : "h-10 px-5 text-sm",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {variant === "primary" && (
        <>
          <span className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]" />
        </>
      )}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}
