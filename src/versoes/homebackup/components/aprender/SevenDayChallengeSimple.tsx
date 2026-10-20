import { Play, MessageCircle, ShieldCheck, Lock } from "lucide-react";
import { openHotmartCheckout } from "@/versoes/homebackup/lib/checkoutTracking";

const steps = [
  { icon: Play, title: "Comece hoje", text: "Assista às primeiras aulas." },
  { icon: MessageCircle, title: "Fale comigo", text: "Dúvidas? Me chame no WhatsApp." },
  { icon: ShieldCheck, title: "Decida depois", text: "Não gostou? Devolvo cada centavo." },
];

export const SevenDayChallengeSimple = () => {
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-bold px-4 py-1.5 rounded-full">
            <ShieldCheck className="w-4 h-4" /> Risco zero para você
          </span>

          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-4">
            E aí, topa um desafio?
          </h2>
          <p className="text-slate-600 mt-2 text-base md:text-lg">
            Te desafio a testar o curso por{" "}
            <strong className="text-slate-900">7 dias</strong>. O risco fica
            todo comigo.
          </p>
        </div>

        {/* Passos */}
        <div className="mt-6 space-y-3 max-w-xl mx-auto">
          {steps.map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5"
            >
              <div className="w-11 h-11 rounded-full bg-green-600 text-white flex items-center justify-center shrink-0">
                <step.icon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-green-700 text-xs font-bold uppercase tracking-wide">
                  Passo {i + 1}
                </span>
                <h3 className="text-slate-900 font-bold text-base md:text-lg leading-tight">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-7">
          <button
            onClick={() => openHotmartCheckout()}
            className="w-full max-w-md bg-green-600 hover:bg-green-700 active:scale-[.99] text-white font-extrabold text-base md:text-lg py-4 rounded-xl shadow-lg transition-all"
          >
            Quero aceitar o desafio
          </button>
          <p className="text-slate-500 text-sm mt-3 flex items-center justify-center gap-1.5">
            <Lock className="w-3.5 h-3.5" /> Garantia de 7 dias · Acesso
            vitalício
          </p>
        </div>
      </div>
    </section>
  );
};
