import { useEffect } from "react";
import { X, Lock, Shield, ShieldCheck, Monitor, Star, Zap, CreditCard, Barcode, Headphones, Infinity as InfinityIcon } from "lucide-react";
import { openHotmartCheckout } from "@/lib/checkoutTracking";
import elisaModal from "@/assets/elisa-modal.jpg";

const CHECKOUT_ITEMS = [
  { icon: Zap, label: "Acesso imediato" },
  { icon: ShieldCheck, label: "Garantia 7 dias" },
  { icon: Headphones, label: "Suporte humanizado" },
  { icon: InfinityIcon, label: "Acesso vitalício" },
];

export const preloadCheckoutModalImage = () => {
  const img = new Image();
  img.src = elisaModal;
};

export const CheckoutModalLight = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-2xl p-4 md:p-5 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-green-50 border border-green-300 rounded-xl px-3 py-1.5 mb-3 text-center flex items-center justify-center gap-2">
          <Lock className="w-3.5 h-3.5 text-green-600 shrink-0" />
          <span className="text-green-800 font-bold text-xs md:text-sm">Ambiente 100% Seguro</span>
          <Shield className="w-3.5 h-3.5 text-green-600 shrink-0" />
        </div>

        <div className="text-center mb-3">
          <h3 className="text-base md:text-lg font-black text-slate-900 leading-tight flex items-center justify-center gap-2">
            <Monitor className="w-4 h-4 md:w-5 md:h-5 text-blue-600 shrink-0" />
            Falta pouco para você começar!
          </h3>
        </div>

        <div className="text-center mb-3">
          <div className="relative inline-block mx-auto mb-2">
            <img
              src={elisaModal}
              alt="Professora Elisa"
              loading="eager"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover object-top border-4 border-blue-100 shadow-xl shadow-blue-900/10"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white">
              PROFª ELISA
            </div>
          </div>
          <p className="text-slate-700 text-sm md:text-base leading-snug max-w-xs mx-auto">
            Eu vou estar com você passo a passo!
          </p>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
            ))}
            <span className="text-slate-700 text-[11px] md:text-xs font-bold ml-1">
              +15.000 alunos já aprenderam comigo
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5 mb-3">
          {CHECKOUT_ITEMS.map(({ icon: I, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center text-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2 py-2.5"
            >
              <I className="w-5 h-5 text-blue-600 shrink-0" />
              <p className="text-slate-800 text-[11px] md:text-xs font-bold leading-tight">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-2 text-center">
          <p className="text-slate-500 text-[11px] md:text-xs font-bold uppercase tracking-wide mb-1.5">
            Escolha como pagar
          </p>
          <div className="flex items-center justify-center gap-2">
            {[
              { icon: Zap, label: "PIX" },
              { icon: CreditCard, label: "Cartão" },
              { icon: Barcode, label: "Boleto" },
            ].map(({ icon: I, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5"
              >
                <I className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-slate-800 text-xs md:text-sm font-bold">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mb-2">
          <p className="text-slate-600 text-xs md:text-sm">
            De <span className="line-through font-bold text-base">R$ 497,00</span> por apenas
          </p>
          <p className="text-3xl md:text-4xl font-black text-green-600 leading-none tracking-tight my-1">R$ 297</p>
          <p className="text-slate-600 font-semibold text-[11px] md:text-xs">à vista ou em até 12 x 30,72 no cartão</p>
        </div>

        <div className="bg-green-50 border border-green-300 rounded-xl p-2.5 mb-2 text-center">
          <p className="text-green-900 font-bold text-xs md:text-sm leading-snug flex flex-col items-center justify-center gap-0.5">
            <span className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-green-600 shrink-0" />
              7 dias de garantia incondicional
            </span>
            <span className="text-green-700 font-semibold text-[11px] md:text-xs">Risco zero para você</span>
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 mb-3 text-center">
          <p className="text-slate-600 text-xs md:text-sm leading-snug flex flex-col items-center justify-center gap-0.5">
            <span className="flex items-center justify-center gap-1.5 whitespace-nowrap">
              <Lock className="w-4 h-4 text-blue-600 shrink-0" />
              Pagamento processado com segurança
            </span>
            <span className="whitespace-nowrap">pela plataforma <span className="text-slate-900 font-bold text-sm md:text-base">Hotmart</span></span>
          </p>
        </div>

        <button
          onClick={() => openHotmartCheckout()}
          className="w-full bg-green-600 hover:bg-green-700 active:scale-[.99] text-white font-extrabold rounded-2xl shadow-lg shadow-green-600/30 transition-all text-lg md:text-xl px-5 py-4"
        >
          QUERO ACESSAR O CURSO
        </button>
      </div>
    </div>
  );
};
