import { MessageCircleHeart, HeartHandshake, Users } from "lucide-react";

export const SupportBanner = () => {
  return (
    <section className="relative py-8 md:py-12 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y border-primary/20 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon with pulse effect */}
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-primary/20 p-4 rounded-full border border-primary/30">
                <HeartHandshake className="w-8 h-8 md:w-10 md:h-10 text-primary" />
              </div>
            </div>
          </div>

          {/* Main headline */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3">
            Você <span className="text-primary">não está sozinha</span> nessa jornada
          </h2>

          {/* Emotional subtitle */}
          <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            Qualquer dúvida, estou aqui para ajudar. Sem pressa, sem julgamento. 
            <span className="text-foreground font-medium"> Aprender é mais fácil quando você tem alguém do seu lado.</span>
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
              <MessageCircleHeart className="w-5 h-5 text-primary" />
              <span>Suporte humanizado</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              <span>Resposta rápida</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
              <HeartHandshake className="w-5 h-5 text-primary" />
              <span>Acompanhamento pessoal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  );
};
