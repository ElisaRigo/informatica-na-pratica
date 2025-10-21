import { Button } from "@/components/ui/button";
import { Shield, Award, Zap, CheckCircle2 } from "lucide-react";
import videoPoster from "@/assets/video-poster-hero.jpg";
import heroVideo from "@/assets/hero-video-main.mp4";

export const Hero = () => {
  return (
    <section className="relative overflow-x-hidden overflow-y-visible bg-gradient-to-b from-panel via-background to-background py-6 md:py-8 lg:py-12">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto animate-fade-in">
          {/* Social Proof Banner */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 md:gap-6 bg-card/80 backdrop-blur-sm border-2 border-success/30 px-4 md:px-8 py-2 md:py-3 rounded-full mb-6 md:mb-8 shadow-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-success" />
              <span className="font-bold text-xs md:text-base text-foreground">+20 anos</span>
            </div>
            <span className="hidden md:inline text-muted-foreground text-lg">•</span>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 md:w-5 md:h-5 text-accent" />
              <span className="font-bold text-xs md:text-base text-foreground">+15.000 alunos</span>
            </div>
            <span className="hidden md:inline text-muted-foreground text-lg">•</span>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-success" />
              <span className="font-bold text-xs md:text-base text-foreground">Garantia 7 Dias</span>
            </div>
          </div>
          
          {/* Texto acima do vídeo */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-6 md:mb-8 leading-tight">
            Aprenda <span className="text-primary">Informática de Verdade</span> e conquiste <span className="text-primary">Novas Oportunidades</span>.
          </p>
          
          {/* Vídeo em destaque - Elemento principal da primeira dobra */}
          <div className="relative max-w-4xl mx-auto mb-6">
            <div className="relative rounded-2xl overflow-hidden border-4 border-primary/40 bg-black">
              <video 
                controls
                poster={videoPoster}
                className="w-full aspect-video"
                preload="metadata"
              >
                <source src={heroVideo} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
            </div>
          </div>

          {/* Texto abaixo do vídeo */}
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-8 max-w-3xl mx-auto leading-tight">
            Do <span className="text-primary">Zero ao Profissional</span>, com aulas <span className="text-primary">Simples e Práticas</span> de Word, Excel e muito mais — pra você se destacar no <span className="text-primary">Mercado de Trabalho</span> e usar o computador com <span className="text-primary">Confiança</span>.
          </p>
        
          {/* Benefícios Principais */}
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center items-center mb-8 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-2 border-primary/30 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-sm">
              <Zap className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              <span className="font-bold text-sm md:text-base text-foreground">Acesso Imediato</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-2 border-success/30 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-sm">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-success" />
              <span className="font-bold text-sm md:text-base text-foreground">Garantia 7 dias</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-2 border-accent/30 px-4 md:px-6 py-2 md:py-3 rounded-xl shadow-sm">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-accent" />
              <span className="font-bold text-sm md:text-base text-foreground">Certificado incluso</span>
            </div>
          </div>

          {/* CTA Principal DESTAQUE */}
          <div className="mb-6 max-w-2xl mx-auto">
            <Button 
              size="lg" 
              className="w-full text-lg md:text-xl font-black px-8 md:px-16 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all shadow-[0_12px_40px_hsl(var(--accent)/0.4)] bg-gradient-to-r from-accent to-success hover:from-success hover:to-accent border-2 border-accent/30"
              onClick={() => (window as any).openCheckout?.()}
            >
              ✨ Sim, Quero Dominar Informática
            </Button>
            <div className="text-center mt-4 space-y-2">
              <p className="text-3xl md:text-4xl font-black text-foreground">
                R$ 297,00
              </p>
              <p className="text-sm md:text-base text-muted-foreground font-semibold">
                Acesso completo por 2 anos • Certificado incluso
              </p>
            </div>
          </div>

          {/* Descrição clara dos benefícios */}
          <div className="max-w-3xl mx-auto space-y-4 text-left bg-card/60 backdrop-blur-sm border-2 border-line rounded-2xl p-6 md:p-8 shadow-md">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-6">Veja Tudo o Que Você Vai Aprender</h2>
            <ul className="space-y-3 text-base md:text-lg">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <span className="text-foreground"><strong className="text-primary">Word Profissional:</strong> Crie documentos impecáveis, currículos que chamam atenção e relatórios organizados</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <span className="text-foreground"><strong className="text-primary">Excel na Prática:</strong> Organize dados, crie planilhas eficientes e domine fórmulas essenciais</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <span className="text-foreground"><strong className="text-primary">PowerPoint Impactante:</strong> Monte apresentações profissionais que impressionam</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <span className="text-foreground"><strong className="text-primary">Internet com Segurança:</strong> Navegue, pesquise, use e-mail e comunique-se com confiança</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <span className="text-foreground"><strong className="text-primary">Windows Completo:</strong> Domine seu computador do básico ao avançado</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <span className="text-foreground"><strong className="text-primary">Digitação Profissional:</strong> Ganhe velocidade e produtividade no teclado</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};
