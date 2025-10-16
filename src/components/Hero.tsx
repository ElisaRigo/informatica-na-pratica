import { Button } from "@/components/ui/button";
import { Shield, Award, Zap, Lock, CheckCircle2 } from "lucide-react";
import heroVideo from "@/assets/hero-video-optimized.mp4";
import videoPoster from "@/assets/video-poster-hero.jpg";
import { useRef } from "react";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-panel via-background to-background py-4 md:py-12 lg:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,128,187,0.25),transparent)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Social Proof Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-4 bg-card/60 backdrop-blur-sm border border-success/20 px-3 md:px-6 py-1.5 md:py-3 rounded-full mb-3 md:mb-6">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span className="font-bold text-[10px] md:text-sm">+20 anos</span>
            </div>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-accent" />
              <span className="font-bold text-[10px] md:text-sm">+15.000 alunos</span>
            </div>
            <span className="hidden md:inline text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-success" />
              <span className="font-bold text-[10px] md:text-sm">Garantia 7 Dias</span>
            </div>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight mb-6 md:mb-8">
            <span className="text-destructive">Chega de perder oportunidades!</span>
          </h1>
          
          {/* Vídeo em destaque - Elemento principal da primeira dobra */}
          <div className="relative max-w-3xl mx-auto mb-6 md:mb-8">
            <div className="relative rounded-2xl overflow-hidden border-4 border-primary/30 shadow-2xl bg-transparent">
              <video
                ref={videoRef}
                controls
                preload="none"
                poster={videoPoster}
                className="w-full aspect-video bg-transparent"
                playsInline
                aria-label="Vídeo de apresentação do curso de Informática na Prática"
              >
                <source src={heroVideo} type="video/mp4" />
                Seu navegador não suporta vídeo HTML5.
              </video>
              
              {/* Overlay estratégico com preço - CLICÁVEL */}
              <a 
                href="https://pag.ae/8164tZJTR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute top-3 right-3 md:top-4 md:right-4 bg-gradient-to-br from-success/95 to-success/90 backdrop-blur-md border-2 border-white/40 rounded-xl md:rounded-2xl px-3 md:px-5 py-2 md:py-3 shadow-2xl animate-pulse hover:scale-105 transition-transform cursor-pointer"
              >
                <p className="text-[10px] md:text-xs font-bold text-white/90 mb-0.5">Apenas hoje:</p>
                <p className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-none mb-1">R$ 297</p>
                <div className="bg-destructive text-destructive-foreground rounded-md px-2 py-0.5 inline-block">
                  <p className="text-xs md:text-sm font-black">40% OFF</p>
                </div>
              </a>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight mb-6 md:mb-8">
            Aprenda <span className="text-primary">Word, Excel e mais...</span><br />
            Mesmo Começando do Zero 💻
          </h2>

          {/* CTA Principal com Preço - Logo após o vídeo para conversão imediata */}
          <div className="mb-4 md:mb-6 max-w-3xl mx-auto">
            <Button 
              size="lg" 
              className="text-base md:text-xl font-extrabold px-8 md:px-16 py-6 md:py-8 rounded-xl md:rounded-2xl hover:scale-105 transition-all bg-success hover:bg-success/90 shadow-2xl w-full sm:w-auto leading-tight"
              asChild
            >
              <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer">
                🚀 Começar por R$ 297 (40% OFF)
              </a>
            </Button>
            <p className="text-xs md:text-sm text-muted-foreground mt-2 font-semibold">
              ⏰ Vagas limitadas • Aproveite enquanto disponível
            </p>
          </div>

          <p className="text-sm md:text-base lg:text-lg text-muted-foreground mb-4 md:mb-6 max-w-3xl mx-auto px-2">
            Curso de informática online do básico ao mercado de trabalho, com aulas práticas, passo a passo e suporte direto comigo, professora Elisa 💻
          </p>

          {/* Bloco de Preço Elegante */}
          <div className="mb-4 md:mb-6 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-card via-panel to-card border-2 border-success/30 rounded-2xl p-4 md:p-6 shadow-2xl relative">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-destructive text-destructive-foreground px-3 md:px-4 py-0.5 md:py-1 text-xs font-black rounded-full shadow-lg">
                Economize R$ 200
              </div>
              <p className="text-xs md:text-base font-bold mb-2 md:mb-3 text-center pt-1">
                🔥 Oferta especial por tempo limitado
              </p>
              <div className="flex flex-row items-center justify-center gap-3 md:gap-6 mb-3 md:mb-4">
                <div className="text-center">
                  <p className="text-[10px] md:text-xs text-muted-foreground mb-0.5">De:</p>
                  <span className="text-lg md:text-2xl line-through text-muted-foreground/50 font-bold">R$ 497</span>
                </div>
                <div className="text-center">
                  <p className="text-[10px] md:text-xs text-success font-bold mb-0.5">Por apenas:</p>
                  <span className="text-3xl md:text-5xl font-black text-success">R$ 297</span>
                </div>
              </div>
              
              {/* Selo de Garantia Elegante */}
              <div className="bg-background/40 backdrop-blur-sm border border-success/30 rounded-xl p-2.5 md:p-4">
                <div className="flex items-center justify-center gap-1.5 md:gap-2 mb-1">
                  <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-success" />
                  <h3 className="text-xs md:text-sm font-black text-success">RISCO ZERO</h3>
                </div>
                <p className="text-[10px] md:text-xs font-semibold text-center leading-relaxed">
                  Garantia incondicional de 7 dias<br />
                  <span className="text-muted-foreground">Não gostou? Devolvemos 100% do seu dinheiro</span>
                </p>
              </div>
            </div>
          </div>

          {/* Destaque: Promessa de Resultado - Movida para posição estratégica */}
          <div className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 border-2 border-primary/40 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-5 mb-5 md:mb-7 max-w-3xl mx-auto">
            <p className="text-xl md:text-2xl lg:text-3xl font-black text-primary">
              Conquiste o Emprego que Você Merece
            </p>
          </div>
          
          {/* CTA Secundário */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-6 md:mb-8 px-4">
            <Button 
              size="lg" 
              className="text-base md:text-lg font-extrabold px-6 md:px-8 py-5 md:py-6 rounded-2xl hover:scale-105 transition-all bg-success hover:bg-success/90"
              asChild
            >
              <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer">
                ✓ Garantir minha vaga agora
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-base md:text-lg font-bold px-6 md:px-8 py-5 md:py-6 rounded-2xl border-2 border-foreground/20 hover:bg-card"
              asChild
            >
              <a href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica" target="_blank" rel="noopener noreferrer">
                💬 Tirar dúvida no WhatsApp
              </a>
            </Button>
          </div>

          {/* Benefícios Rápidos */}
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center items-center px-2">
            <div className="flex items-center gap-1.5 md:gap-2 bg-primary/10 backdrop-blur-sm border border-primary/30 px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="font-bold text-xs md:text-sm">Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-card/50 backdrop-blur-sm border border-line px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-success" />
              <span className="font-semibold text-xs md:text-sm">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2 bg-card/50 backdrop-blur-sm border border-line px-3 md:px-4 py-1.5 md:py-2 rounded-xl">
              <Award className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              <span className="font-semibold text-xs md:text-sm">Certificado incluso</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
