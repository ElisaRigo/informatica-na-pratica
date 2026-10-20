import {
  ShieldCheck, PlayCircle, Clock, BadgeCheck, Lock, Infinity as InfinityIcon,
} from "lucide-react";
import { openHotmartCheckout } from "@/versoes/homebackup/lib/checkoutTracking";

const TRUST = [
  { icon: PlayCircle, title: "Acesso imediato", text: "Comece hoje" },
  { icon: Clock, title: "7 dias", text: "Para experimentar" },
  { icon: BadgeCheck, title: "Garantia", text: "Conforme as regras" },
];

export const ComeceGratis = () => {
  return (
    <section id="valor" className="py-4 md:py-6">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-3 md:p-5 shadow-xl">
          {/* Faixa branca de proteção */}
          <div className="bg-white rounded-full px-4 py-2 md:py-2.5 text-center shadow-md">
            <span className="flex items-center justify-center gap-2 text-primary font-bold text-sm md:text-xl whitespace-nowrap md:whitespace-normal">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              Sua compra protegida por 7 dias
            </span>
          </div>

          <div className="text-center mt-3 md:mt-4 px-2">
            <h2 className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2 leading-tight">
              Comece hoje mesmo.<br />Experimente por 7 dias.
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto text-sm md:text-lg leading-relaxed">
              Comece do zero, assista às aulas com calma e descubra como é fácil aprender informática no seu ritmo.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 md:gap-3 mt-3 md:mt-4">
            {TRUST.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="bg-white/10 border border-white/20 rounded-xl px-2 py-2 md:px-3 md:py-3 text-center"
              >
                <Icon className="w-5 h-5 md:w-7 md:h-7 text-white mx-auto mb-1.5" />
                <div className="text-white font-bold text-xs md:text-base leading-tight">{title}</div>
                <div className="text-white/80 text-[11px] md:text-sm leading-snug mt-0.5">{text}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-3 md:p-5 mt-3 md:mt-4">
            <p className="text-center text-slate-700 font-bold text-sm md:text-lg">
              Você não precisa ter experiência para começar.
            </p>
            <div id="primeiro-valor" className="text-center mt-2 mb-3">
              <p className="text-slate-500 text-sm md:text-base">
                de <span className="line-through font-semibold">R$ 497,00</span> por apenas
              </p>
              <p className="text-green-600 font-black text-4xl md:text-5xl leading-tight">R$ 297,00</p>
              <p className="text-slate-600 text-sm md:text-base mt-1">
                ou <strong className="text-slate-800">12x de R$ 30,72</strong> no cartão
              </p>
            </div>
            <button
              onClick={() => openHotmartCheckout()}
              className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-black text-lg md:text-xl py-3.5 md:py-4 rounded-xl shadow-lg transition-all hover:shadow-xl active:scale-[0.99]"
            >
              Quero Acessar as Aulas
            </button>
            <p className="text-center text-slate-500 text-xs md:text-sm mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" /> Compra segura
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <InfinityIcon className="w-3.5 h-3.5" /> Acesso imediato
              </span>
              <span aria-hidden="true">•</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Garantia de 7 dias
              </span>
            </p>
          </div>

          {/* Banner de garantia — dentro do cartão azul */}
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl px-4 py-3 md:px-5 md:py-3.5 mt-3 md:mt-4 text-center">
            <p className="flex items-center justify-center gap-2 text-green-700 font-black text-sm md:text-lg uppercase tracking-wide">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              Garantia incondicional de 7 dias
            </p>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed mt-1">
              <strong className="text-green-700">RISCO ZERO!</strong> Se não gostar, devolvemos{" "}
              <strong>100% do seu dinheiro.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
