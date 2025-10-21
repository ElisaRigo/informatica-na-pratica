import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import videoPoster from "@/assets/video-poster-secondary.jpg";
import video from "@/assets/video-secondary.mp4";

export const VideoSection = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-foreground">
              Veja como é simples aprender
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Assista e descubra como o método da professora Elisa vai transformar sua relação com a tecnologia
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto mb-8 bg-card rounded-2xl p-4 md:p-6 shadow-lg animate-fade-in">
            <video 
              controls
              poster={videoPoster}
              className="w-full aspect-video rounded-xl"
              preload="metadata"
              style={{ filter: 'none', opacity: 1 }}
            >
              <source src={video} type="video/mp4" />
              Seu navegador não suporta o elemento de vídeo.
            </video>
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="font-extrabold px-6 md:px-10 py-6 md:py-7 rounded-2xl text-sm md:text-lg hover:scale-105 transition-all w-full md:w-auto leading-tight"
              onClick={() => (window as any).openCheckout?.()}
            >
              <Play className="w-5 h-5 mr-2" />
              Quero Começar Agora
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
