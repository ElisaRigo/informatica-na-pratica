import { Button } from "@/components/ui/button";
import videoBonusSection from "@/assets/video-bonus-section.mp4";
import videoPosterBonus from "@/assets/video-poster-bonus.jpg";

export const VideoTestimonial = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-black mb-3 md:mb-4">
              Veja o depoimento de quem já transformou sua vida
            </h2>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Histórias reais de alunos que conquistaram novas oportunidades
            </p>
          </div>

          <div className="bg-card border-2 border-primary/20 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl">
            <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8">
              <video
                controls
                poster={videoPosterBonus}
                className="w-full h-full object-cover"
                preload="metadata"
              >
                <source src={videoBonusSection} type="video/mp4" />
                Seu navegador não suporta vídeos.
              </video>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                className="w-full md:w-auto font-black px-6 md:px-12 py-5 md:py-7 rounded-2xl text-sm md:text-lg bg-gradient-to-r from-accent to-primary hover:from-primary hover:to-accent shadow-lg hover:shadow-xl transition-all"
                onClick={() => (window as any).openCheckout?.()}
              >
                🎯 Quero ter essa transformação
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                🔒 Acesso imediato após confirmação do pagamento
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
