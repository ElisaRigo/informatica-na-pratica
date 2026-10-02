import { useEffect, useState } from "react";

/**
 * Barra de CTA fixa no rodapé da home.
 * Aparece somente depois que o usuário passa da primeira sessão de valor
 * (seção marcada com id="primeira-sessao-valor" — Depoimentos em Áudio).
 * Abre o modal de checkout da home via window.openCheckout (owned por Index).
 */
export const FixedBottomCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("primeira-sessao-valor");
    if (!target) return;

    const check = () => {
      setVisible(target.getBoundingClientRect().bottom <= 0);
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
      <div className="bg-slate-900/95 backdrop-blur-md border-t border-primary/20 shadow-[0_-8px_30px_rgba(0,0,0,0.45)]">
        <div className="container mx-auto px-4 pr-[84px] sm:pr-4 py-2.5 flex flex-col items-center gap-1.5">
          <p className="text-[11px] sm:text-xs text-slate-300 text-center leading-tight">
            Acesso vitalício • Garantia de 7 dias
          </p>
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="w-full max-w-md bg-success hover:bg-success/90 text-white font-bold text-sm sm:text-base px-6 py-3 rounded-xl shadow-lg shadow-success/30 hover:shadow-success/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Quero Começar Agora
          </button>
        </div>
      </div>
    </div>
  );
};
