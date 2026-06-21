import { Monitor, Infinity, Sparkles, Headphones, Shield, Award, Users } from "lucide-react";

export const TopFearBanner = () => {
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      {/* Banner principal */}
      <div className="bg-primary/15 border-y border-primary/50 py-2.5 md:py-3 px-4">
        <div className="flex items-center justify-center text-center gap-2">
          <Monitor className="shrink-0 text-primary" size={20} />
          <span className="font-medium text-base md:text-lg text-white">
            Você não precisa saber nada<br className="md:hidden" /> <span className="text-primary font-bold">só precisa começar!</span>
          </span>
        </div>
      </div>

      {/* Selos de confiança */}
      <div className="px-4 md:px-8 lg:px-16 mt-4 md:mt-5">
        {/* Pills */}
        <div className="flex justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          <div className="inline-flex items-center gap-1.5 md:gap-2 border border-primary/50 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-slate-900/50">
            <Infinity className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="text-[10px] md:text-xs font-bold text-white tracking-wide">ACESSO VITALÍCIO</span>
          </div>
          <div className="inline-flex items-center gap-1.5 md:gap-2 border border-success/50 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-slate-900/50">
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-success" />
            <span className="text-[10px] md:text-xs font-bold text-white tracking-wide">CURSO ONLINE</span>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-4xl mx-auto">
          {[
            { icon: Headphones, title: "Suporte nas Aulas", sub: "Tire dúvida com orientação" },
            { icon: Shield, title: "Garantia 7 Dias", sub: "Risco zero para você" },
            { icon: Award, title: "Certificado", sub: "Reconhecido no mercado" },
            { icon: Users, title: "+15.000 Alunos", sub: "+20 anos ensinando" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl"
            >
              <item.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mb-1.5 md:mb-2" />
              <span className="text-white font-bold text-xs md:text-sm">{item.title}</span>
              <span className="text-slate-400 text-[10px] md:text-xs leading-tight mt-0.5">{item.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
