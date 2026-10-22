import type { LucideIcon } from "lucide-react";

type SeloTone = "green" | "blue" | "amber";

const SHIELD_FILL: Record<SeloTone, string> = {
  green: "fill-green-500",
  blue: "fill-blue-600",
  amber: "fill-amber-500",
};

// Escudo clássico: topo angulado, laterais retas, ponta inferior.
const SHIELD =
  "M50 5 L92 18 L92 60 C92 88 74 106 50 116 C26 106 8 88 8 60 L8 18 Z";

export default function SeloOficial({
  icon: Icon,
  lines,
  tone,
}: {
  icon: LucideIcon;
  lines: string[];
  tone: SeloTone;
}) {
  return (
    <div className="relative inline-flex items-center">
      {/* Barra escura com o texto */}
      <div className="flex h-10 items-center rounded-full bg-slate-900 pl-12 pr-2.5 ring-2 ring-white/80 md:h-14 md:pl-16 md:pr-4">
        <div className="flex flex-col items-center leading-[1.12]">
          {lines.map((line) => (
            <span
              key={line}
              className="whitespace-nowrap text-[8px] font-extrabold uppercase tracking-wide text-white md:text-[11px]"
            >
              {line}
            </span>
          ))}
        </div>
      </div>

      {/* Escudo por cima da barra */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2">
        <svg
          viewBox="-2 -2 104 126"
          className="h-12 w-auto drop-shadow-md md:h-16"
          aria-hidden="true"
        >
          <path
            d={SHIELD}
            strokeWidth={12}
            strokeLinejoin="round"
            className={`${SHIELD_FILL[tone]} stroke-slate-950`}
          />
          <path
            d={SHIELD}
            fill="none"
            strokeWidth={3}
            strokeLinejoin="round"
            className="stroke-white"
          />
        </svg>
        <Icon
          className="absolute left-1/2 top-[38%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-white md:h-6 md:w-6"
          strokeWidth={2.4}
        />
      </div>
    </div>
  );
}
