import { Heart } from "lucide-react";

export const WhatsAppFloat = () => {
  return (
    <button
      onClick={() => (window as any).openCheckout?.()}
      className="fixed right-4 bottom-6 z-50 bg-gradient-to-br from-success/95 to-success/90 backdrop-blur-md border-2 border-white/40 text-white font-black px-5 py-3.5 rounded-2xl shadow-2xl transition-all hover:scale-105 animate-pulse md:hidden"
      aria-label="Quero Começar Agora"
    >
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 fill-white" />
        <span className="text-sm leading-tight">Quero Começar Agora</span>
      </div>
    </button>
  );
};
