import { useEffect, useState } from "react";
import { X, Gift, ShieldCheck, Monitor, Lock, CheckCircle2 } from "lucide-react";
import { openHotmartCheckout } from "@/lib/checkoutTracking";

const STORAGE_KEY = "exit_intent_shown_v1";

export const ExitIntentModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      sessionStorage.setItem(STORAGE_KEY, "1");
      setOpen(true);
    };

    // Desktop: mouse leaves top
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) show();
    };
    // Mobile: back button / history intent
    const onPopState = () => show();
    // Fallback: after 45s of inactivity on the page
    const timer = window.setTimeout(show, 45000);

    document.addEventListener("mouseout", onMouseOut);
    window.history.pushState({ exitIntent: true }, "");
    window.addEventListener("popstate", onPopState);

    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("popstate", onPopState);
      window.clearTimeout(timer);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center p-3 md:p-6"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Fechar"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-br from-amber-400 to-orange-500 px-5 pt-6 pb-5 text-center">
          <div className="inline-flex items-center gap-2 bg-white/25 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Gift className="w-4 h-4" /> Espere! Antes de sair…
          </div>
          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
            Leve os 4 bônus <span className="underline decoration-white/70">GRÁTIS</span> hoje
          </h3>
          <p className="text-white/95 text-sm md:text-base mt-1">
            R$ 368 em módulos extras inclusos sem custo — só nesta condição.
          </p>
        </div>

        <div className="px-5 py-5 md:px-6 md:py-6">
          <ul className="space-y-2 mb-4">
            {[
              "Bônus 1: Mercado de Trabalho",
              "Bônus 2: Atalhos Essenciais",
              "Bônus 3: Currículo Profissional",
              "Bônus 4: E-mail Profissional",
            ].map((t) => (
              <li key={t} className="flex items-center gap-2 text-slate-800 text-sm md:text-base">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                <span className="font-medium">{t}</span>
              </li>
            ))}
          </ul>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4 text-center">
            <p className="text-slate-500 text-xs uppercase font-bold tracking-wide">Investimento único</p>
            <p className="text-slate-400 line-through text-sm">De R$ 497</p>
            <p className="text-green-600 font-black text-3xl leading-none">R$ 297</p>
            <p className="text-slate-500 text-xs mt-1">ou 12x de R$ 30,72</p>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              openHotmartCheckout();
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-base md:text-lg py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-600/30"
          >
            <Monitor className="w-5 h-5" /> Quero meus bônus grátis
          </button>

          <div className="flex items-center justify-center gap-4 mt-3 text-[11px] md:text-xs text-slate-500">
            <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Pagamento seguro</span>
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> 7 dias de garantia</span>
          </div>
        </div>
      </div>
    </div>
  );
};
