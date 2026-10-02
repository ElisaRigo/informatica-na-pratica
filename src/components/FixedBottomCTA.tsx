import { useEffect, useState } from "react";
import { Check } from "lucide-react";

/**
 * Barra de CTA fixa no rodapé da home (vidro flutuante).
 * Aparece logo após a primeira sessão de valor, bem acima da seção de
 * depoimentos (id="primeira-sessao-valor"): dispara quando o topo da seção
 * ainda está entrando pela parte de baixo da tela.
 * Abre o modal de checkout da home via window.openCheckout (owned por Index).
 */
export const FixedBottomCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("primeira-sessao-valor");
    if (!target) return;

    const check = () => {
      setVisible(target.getBoundingClientRect().top <= window.innerHeight);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-0 inset-x-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      }`}
    >
      <div className="container mx-auto px-4 pr-[84px] sm:pr-4 pb-4">
        <div className="relative max-w-md mx-auto">
          {/* Brilho ao redor da barra */}
          <div className="absolute -inset-1 bg-gradient-to-r from-success/40 to-success/10 rounded-3xl blur-xl pointer-events-none" />

          {/* Barra flutuante em vidro */}
          <div className="relative bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl p-3.5 shadow-2xl">
            <div className="flex flex-col gap-3">
              {/* Selos de valor */}
              <div className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 rounded-full bg-success/15 border border-success/40 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-success" strokeWidth={3} />
                </span>
                <p className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider text-center whitespace-nowrap">
                  Acesso vitalício <span className="mx-1 text-slate-600">•</span> Garantia de 7 dias
                </p>
              </div>

              {/* Botão de ação */}
              <button
                onClick={() => (window as any).openCheckout?.()}
                className="group relative overflow-hidden w-full bg-success hover:bg-success/90 text-white font-extrabold text-lg py-4 px-6 rounded-xl transition-all duration-300 active:scale-[0.97] shadow-[0_0_25px_rgba(37,211,102,0.35)] hover:shadow-[0_0_35px_rgba(37,211,102,0.5)]"
              >
                Quero Começar Agora
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
