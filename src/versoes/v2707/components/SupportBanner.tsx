import { MessageCircleHeart, HeartHandshake, Users } from "lucide-react";

export const SupportBanner = () => {
  return (
    <>
      <section className="relative py-3 md:py-5 bg-gradient-to-r from-primary/20 via-primary/15 to-primary/20 border-y border-primary/30 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent opacity-60" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon with pulse effect */}
            <div className="inline-flex items-center justify-center mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-primary/20 p-3 rounded-full border border-primary/30">
                  <HeartHandshake className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
              </div>
            </div>

            {/* Main headline */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground mb-2">
              Você <span className="text-primary">não está sozinho</span> nessa jornada
            </h2>

            {/* Emotional subtitle */}
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-2">
              Durante o curso você terá suporte via WhatsApp para tirar todas as suas dúvidas.
            </p>
            <p className="text-base md:text-lg lg:text-xl font-bold text-primary bg-primary/10 inline-block px-3 py-1.5 rounded-lg border border-primary/20">
              Aprender é mais fácil quando você tem alguém do seu lado.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-24 h-24 bg-primary/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </section>

      {/* Trust badges below */}
      <div className="bg-background py-2 md:py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-2 border-primary/30 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-sm">
              <MessageCircleHeart className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Suporte Humano</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-2 border-primary/30 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-sm">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Resposta Rápida</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
