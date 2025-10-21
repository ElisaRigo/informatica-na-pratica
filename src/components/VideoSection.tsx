import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import videoPoster from "@/assets/video-poster-secondary.jpg";
import video from "@/assets/video-secondary.mp4";

export const VideoSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm font-bold px-6 py-2 rounded-full">
                Veja o método em ação
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
              Descubra como é <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">simples e prático</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Assista e veja como a professora Elisa torna tudo fácil de entender — mesmo para quem nunca mexeu no computador
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto mb-10 group">
            {/* Video container with glow effect */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-700 bg-black transition-all duration-300 group-hover:border-blue-500">
              <video 
                controls
                poster={videoPoster}
                className="w-full aspect-video"
                preload="metadata"
              >
                <source src={video} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity -z-10"></div>
          </div>

          <div className="text-center">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-black px-8 md:px-12 py-7 md:py-8 rounded-2xl text-base md:text-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 border-2 border-white/20"
              onClick={() => (window as any).openCheckout?.()}
            >
              <Play className="w-6 h-6 mr-3" />
              Quero Começar Minha Transformação
            </Button>
            <p className="text-slate-400 mt-4 text-sm">
              ✓ Acesso imediato • ✓ Certificado incluso • ✓ Garantia de 7 dias
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

