import { Shield, Lock, Star, Monitor, BookOpen, Award, Infinity, Headphones, Users } from "lucide-react";
import avatar1 from "@/assets/avatar-1.jpg";

export const HeroPricing = () => {
  return (
    <div className="max-w-xl mx-auto mb-4 md:mb-6">
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
        {/* Conteúdo do card de preço */}

        <div className="p-4 md:p-6">

          {/* Preço */}
          <div className="text-center mb-3">
            <p className="text-base md:text-lg text-amber-400 font-bold mb-1 whitespace-nowrap">
              Garanta sua vaga hoje com <span className="bg-amber-400 text-slate-900 px-1.5 py-0.5 rounded-md font-black">40% OFF</span>
            </p>
            <p className="text-lg md:text-2xl text-slate-300 font-bold mb-1">
              de <span className="text-slate-400 line-through">R$ 497,00</span> por apenas
            </p>
            <p className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-success to-accent">
              Só 12x de R$ 30,72
            </p>
            <p className="text-sm md:text-base text-slate-300 mt-1">
              ou <strong className="text-white font-black">R$ 297,00</strong> à vista
            </p>
          </div>

          <p className="text-slate-400 text-[10px] md:text-xs flex items-center justify-center gap-1 mb-4">
            <Lock className="w-3 h-3" /> Pagamento 100% seguro • Acesso imediato
          </p>

          {/* CTA verde acima da caixa azul */}
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-success to-accent text-white font-black text-base md:text-lg px-6 py-3.5 md:py-4 rounded-xl shadow-2xl shadow-success/40 hover:shadow-success/60 hover:scale-[1.02] transition-all duration-300 overflow-hidden mb-3"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="relative">🎯 Quero Começar Agora</span>
          </button>

          {/* Mini selos de valor */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { icon: Monitor, label: "+90 Videoaulas" },
              { icon: BookOpen, label: "Curso Completo" },
              { icon: Award, label: "Certificado Incluso" },
              { icon: Infinity, label: "Acesso Vitalício" },
              { icon: Headphones, label: "Suporte Direto" },
              { icon: Users, label: "+15.000 Alunos" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2 py-2">
                <item.icon className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-white font-bold text-[10px] leading-tight">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Garantia verde */}
          <div className="bg-success/10 border border-success/40 rounded-xl px-4 py-3 mb-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-success font-bold text-sm">Garantia Incondicional de 7 Dias</span>
            </div>
            <p className="text-slate-300 text-xs md:text-sm">
              <strong className="text-white">Risco Zero!</strong> Se não gostar? Devolvo{" "}
              <strong className="text-white">100% do seu dinheiro</strong>.
            </p>
          </div>

          {/* Depoimento */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
            <img src={avatar1} alt="Foto de Mariana S." className="w-10 h-10 rounded-full object-cover shrink-1" />
            <div className="flex-1 min-w-0">
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-200 text-xs md:text-sm italic">
                "Eu não sabia nada… hoje faço tudo sozinha." <span className="text-slate-400 not-italic">— Mariana S.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
