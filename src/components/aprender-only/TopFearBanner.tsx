import { Sparkles } from "lucide-react";

export const TopFearBanner = () => {
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="bg-gradient-to-r from-slate-800 via-[#2a1810] to-slate-800 border-y border-orange-900/30 shadow-sm shadow-black/10">
        <div className="py-3 md:py-4 px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="inline-flex items-center gap-2 text-white text-sm md:text-lg font-black uppercase tracking-wide">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-warning shrink-0" />
            Trava no computador?
          </span>
          <span className="bg-emerald-500 px-4 py-1.5 rounded-full text-white text-base md:text-xl font-black shadow-lg shadow-emerald-500/30 border border-emerald-400/50 whitespace-nowrap">
            Aprenda do Zero — Você Consegue!
          </span>
        </div>
      </div>
    </div>
  );
};
