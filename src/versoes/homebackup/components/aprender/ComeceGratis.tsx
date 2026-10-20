import {
  Gift, PlayCircle, Clock, ShieldCheck, Lock, Infinity as InfinityIcon,
} from "lucide-react";
import { openHotmartCheckout } from "@/versoes/homebackup/lib/checkoutTracking";

const TRUST = [
  { icon: PlayCircle, title: "Comece hoje", text: "Acesso imediato às aulas" },
  { icon: Clock, title: "7 dias para testar", text: "Assista tudo antes de decidir" },
  { icon: ShieldCheck, title: "Risco zero", text: "Não gostou? Devolvo cada centavo" },
];

export const ComeceGratis = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary to-blue-700">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center">
          <span className="flex items-center justify-center gap-3 bg-white text-primary text-xl md:text-3xl font-black px-6 md:px-8 py-3 md:py-4 rounded-full mb-4 shadow-lg w-full">
            <Gift className="w-7 h-7 md:w-9 md:h-9 shrink-0" /> Comece grátis por 7 dias
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-3 leading-tight">
            Comece grátis e só decida depois
          </h2>
          <p className="text-white/90 max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-6">
            Você entra agora, assiste às aulas com calma e vê se é pra você. Não gostou? É só me avisar — devolvo cada centavo.
          </p>

          <div className="grid gap-3 sm:grid-cols-3 text-left">
            {TRUST.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3"
              >
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-white font-bold text-sm leading-tight">{title}</div>
                  <div className="text-white/80 text-xs leading-snug mt-0.5">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border-2 border-green-200 rounded-2xl shadow-lg p-5 md:p-8 mt-6">
          <p className="text-center text-slate-600 font-bold text-sm md:text-base mb-4">
            Acesso imediato a todas as aulas, do jeito que você puder.
          </p>
          <button
            onClick={() => openHotmartCheckout()}
            className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-black text-lg md:text-xl py-4 md:py-5 rounded-xl shadow-lg transition-all hover:shadow-xl active:scale-[0.99]"
          >
            Quero começar grátis
          </button>
          <p className="text-center text-slate-500 text-xs md:text-sm mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Garantia de 7 dias
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <InfinityIcon className="w-3.5 h-3.5" /> Acesso vitalício
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Compra segura
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};
