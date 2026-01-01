import { MessageCircleHeart, HeartHandshake, Sparkles } from "lucide-react";

export const SupportBanner = () => {
  return (
    <section className="relative py-4 md:py-5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 overflow-hidden">
      {/* Animated background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(255,255,255,0.3)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
          {/* Icon with pulse */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-white/40 rounded-full blur-lg animate-pulse" />
            <div className="relative bg-white/20 p-2.5 rounded-full border-2 border-white/50 backdrop-blur-sm">
              <HeartHandshake className="w-6 h-6 md:w-7 md:h-7 text-white" />
            </div>
          </div>

          {/* Main content */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span className="text-xs md:text-sm font-bold text-yellow-200 uppercase tracking-wider">
                Diferencial Exclusivo
              </span>
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            </div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white drop-shadow-lg">
              Você <span className="text-yellow-300">não está sozinho</span> nessa jornada!
            </h2>
            <p className="text-sm md:text-base text-white/90 mt-1 max-w-xl">
              <MessageCircleHeart className="w-4 h-4 inline-block mr-1 text-yellow-300" />
              Suporte via WhatsApp com a Prof. Elisa para tirar todas as suas dúvidas
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex gap-3 md:gap-4 flex-shrink-0">
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
              <span className="text-xs md:text-sm font-semibold text-white whitespace-nowrap">✓ Resposta Rápida</span>
            </div>
            <div className="hidden sm:block bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
              <span className="text-xs md:text-sm font-semibold text-white whitespace-nowrap">✓ Suporte Humanizado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
