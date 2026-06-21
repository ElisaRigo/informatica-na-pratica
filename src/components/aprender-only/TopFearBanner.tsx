import { Monitor, Headphones, Shield } from 'lucide-react';

export const TopFearBanner = () => {
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="px-4 md:px-8 lg:px-16 mb-4">
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          <div className="bg-slate-800/80 border border-white/10 rounded-xl px-4 py-4 text-center">
            <Headphones className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-white font-bold text-sm">Suporte nas Aulas</p>
            <p className="text-gray-400 text-xs mt-1">Aprenda com orientação</p>
          </div>
          <div className="bg-slate-800/80 border border-white/10 rounded-xl px-4 py-4 text-center">
            <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-white font-bold text-sm">Garantia 7 Dias</p>
            <p className="text-gray-400 text-xs mt-1">Risco zero para você</p>
          </div>
        </div>
      </div>
      <div className="bg-primary/15 border-y border-primary/50 py-2.5 md:py-3 px-4">
        <div className="flex items-center justify-center text-center gap-2">
          <Monitor className="shrink-0 text-primary" size={20} />
          <span className="font-medium text-base md:text-lg text-white">
            Você não precisa saber nada<br className="md:hidden" /> <span className="text-primary font-bold">só precisa começar!</span>
          </span>
        </div>
        <div className="flex items-center justify-center gap-3 mt-3">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-primary/40 px-4 py-2 rounded-full shadow-lg">
            <Infinity className="w-4 h-4 md:w-5 md:h-5 text-primary" />
            <span className="font-bold text-[10px] md:text-xs text-white tracking-wide whitespace-nowrap">ACESSO VITALÍCIO</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-[#25D366]/40 px-4 py-2 rounded-full shadow-lg">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#25D366]" />
            <span className="font-bold text-[10px] md:text-xs text-white tracking-wide whitespace-nowrap">CURSO ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
