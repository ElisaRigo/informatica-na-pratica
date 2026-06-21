import { Monitor, BookOpen, Award, Infinity, Headphones, Users } from "lucide-react";

const valueItems = [
  { icon: Monitor, label: "+90 Videoaulas" },
  { icon: BookOpen, label: "Curso Completo" },
  { icon: Award, label: "Certificado Incluso" },
  { icon: Infinity, label: "Acesso Vitalício" },
  { icon: Headphones, label: "Suporte Direto" },
  { icon: Users, label: "+ 15.000 Alunos" },
];

export const HeroPricing = () => {
  return (
    <div className="max-w-xl mx-auto mb-4 md:mb-6">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl md:rounded-2xl overflow-hidden">
        {/* Top banner */}
        <div className="bg-success/20 border-b border-success/30 py-3 px-4">
          <p className="text-center text-base md:text-lg font-bold text-success">
            💰 Economize R$ 200,00 e transforme sua carreira hoje.
          </p>
        </div>

        <div className="p-4 md:p-6">
          {/* Value badges - 3x2 grid */}
          <div className="grid grid-cols-3 gap-1.5 md:gap-2 mb-4">
            {valueItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 md:px-3 md:py-2"
              >
                <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary flex-shrink-0" />
                <span className="text-white text-[10px] md:text-xs font-medium leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="text-center mb-4">
            <p className="text-base md:text-xl text-slate-400 mb-1">
              De{" "}
              <span className="line-through text-slate-300 font-bold text-lg md:text-2xl">
                R$ 497,00
              </span>{" "}
              por apenas
            </p>
            <p className="text-3xl md:text-5xl font-black text-success mb-1">
              12x de R$ 30,72
            </p>
            <p className="text-base md:text-xl text-slate-400">
              ou{" "}
              <strong className="text-white font-black text-xl md:text-3xl">
                R$ 297,00
              </strong>{" "}
              à vista
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-success to-accent text-white font-black text-base md:text-xl px-6 py-4 md:py-5 rounded-xl shadow-2xl shadow-success/40 hover:shadow-success/60 hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <span className="relative">🎯 QUERO COMEÇAR AGORA!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
