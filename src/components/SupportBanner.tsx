import { MessageCircle, HeartHandshake, Clock, Sparkles } from "lucide-react";

export const SupportBanner = () => {
  const handleWhatsAppClick = () => {
    const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                         window.location.hostname === 'www.informaticanapratica.com.br';
    
    if (isProduction && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17641842157/-qUVCOSN474bEO3LpNxB',
        'value': 20.0,
        'currency': 'BRL'
      });
    }
  };

  return (
    <section className="relative py-8 md:py-12 bg-gradient-to-r from-[#25D366]/10 via-[#25D366]/5 to-[#25D366]/10 border-y border-[#25D366]/20 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#25D366]/20 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* WhatsApp Icon with pulse effect */}
          <div className="inline-flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#25D366]/30 rounded-full blur-xl animate-pulse" />
              <div className="relative bg-[#25D366]/20 p-4 rounded-full border border-[#25D366]/30">
                <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-[#25D366]" />
              </div>
            </div>
          </div>

          {/* Main headline */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3">
            Você <span className="text-[#25D366]">não está sozinha</span> nessa jornada
          </h2>

          {/* Emotional subtitle */}
          <p className="text-base md:text-lg text-muted-foreground mb-5 max-w-2xl mx-auto leading-relaxed">
            Qualquer dúvida, é só me chamar no <span className="text-[#25D366] font-semibold">WhatsApp</span>. Sem pressa, sem julgamento. 
            <span className="text-foreground font-medium"> Aprender é mais fácil quando você tem alguém do seu lado.</span>
          </p>

          {/* WhatsApp CTA Button */}
          <a
            href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 mb-6"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Fale comigo no WhatsApp</span>
          </a>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
              <HeartHandshake className="w-5 h-5 text-[#25D366]" />
              <span>Suporte humanizado</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
              <Clock className="w-5 h-5 text-[#25D366]" />
              <span>Resposta rápida</span>
            </div>
            <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
              <Sparkles className="w-5 h-5 text-[#25D366]" />
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
