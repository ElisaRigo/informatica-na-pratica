import { AlertTriangle } from "lucide-react";

export const TopFearBanner = () => {
  const item = (
    <span className="inline-flex items-center gap-2.5 text-white text-sm md:text-lg font-black mx-8 uppercase tracking-wider whitespace-nowrap">
      <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-warning shrink-0" />
      Tem medo de usar o Computador?
      <span className="bg-emerald-500 px-4 py-1.5 rounded-full text-white text-base md:text-xl font-black shadow-lg shadow-emerald-500/30 border border-emerald-400/50">Eu te Ajudo!</span>
    </span>
  );
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="bg-gradient-to-r from-slate-800 via-[#2a1810] to-slate-800 border-y border-orange-900/20 overflow-hidden shadow-sm shadow-black/10">
        <div className="animate-marquee whitespace-nowrap py-3 md:py-4" style={{ animationDuration: '30s' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
