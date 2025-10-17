import { Zap } from "lucide-react";

export const WhatsAppFloat = () => {
  return (
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); (window as any).openCheckout?.(); }}
      className="fixed right-4 bottom-6 z-50 bg-gradient-to-br from-success/95 to-success/90 backdrop-blur-md border-2 border-white/40 text-white font-black px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-2xl transition-all hover:scale-105 animate-pulse"
      aria-label="Garantir vaga agora"
    >
      <div className="flex flex-col items-center gap-1">
        <Zap className="w-5 h-5 md:w-6 md:h-6" />
        <span className="text-xs md:text-sm leading-tight">R$ 297</span>
        <span className="text-[10px] md:text-xs font-bold opacity-90">40% OFF</span>
      </div>
    </a>
  );
};
