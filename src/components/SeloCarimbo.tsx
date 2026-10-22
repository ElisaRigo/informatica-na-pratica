import type { LucideIcon } from "lucide-react";

type SeloTone = "emerald" | "blue" | "amber";

const TONE_FILL: Record<SeloTone, string> = {
  emerald: "fill-emerald-600",
  blue: "fill-blue-600",
  amber: "fill-amber-500",
};

const TEETH = 22;

function teethPositions(count: number, radius: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    return {
      cx: 50 + Math.cos(angle) * radius,
      cy: 50 + Math.sin(angle) * radius,
    };
  });
}

export default function SeloCarimbo({
  icon: Icon,
  lines,
  tone,
  tilt = "-2deg",
}: {
  icon: LucideIcon;
  lines: string[];
  tone: SeloTone;
  tilt?: string;
}) {
  const teeth = teethPositions(TEETH, 43);

  return (
    <div
      className="relative aspect-square w-[84px] md:w-[128px] shrink-0 drop-shadow-lg"
      style={{ transform: `rotate(${tilt})` }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {teeth.map((t, i) => (
          <circle key={i} cx={t.cx} cy={t.cy} r="6.2" className={TONE_FILL[tone]} />
        ))}
        <circle cx="50" cy="50" r="44" className={TONE_FILL[tone]} />
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          strokeWidth="1.5"
          strokeDasharray="2.6 2.6"
          className="stroke-white opacity-70"
        />
        <circle
          cx="50"
          cy="50"
          r="34.5"
          fill="none"
          strokeWidth="0.8"
          className="stroke-white opacity-40"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 px-2.5 text-center md:px-4">
        <Icon className="h-4 w-4 text-white md:h-6 md:w-6" strokeWidth={2.2} />
        {lines.map((line) => (
          <span
            key={line}
            className="text-[8px] font-extrabold uppercase leading-[1.15] tracking-wide text-white md:text-[11px]"
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
