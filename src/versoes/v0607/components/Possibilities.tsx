import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/versoes/v0607/components/ui/button";

const advantages = [
  "Conquistar novas oportunidades de emprego",
  "Ter autonomia para trabalhar com ferramentas digitais",
  "Resolver tarefas profissionais com confiança",
  "Ajudar sua família com tecnologia",
  "Organizar documentos e informações profissionalmente",
  "Destacar-se no mercado de trabalho"
];

const currentSituation = [
  "Falta de qualificação em ferramentas essenciais",
  "Dificuldade em acompanhar processos digitais",
  "Insegurança ao usar recursos tecnológicos",
  "Limitações em oportunidades profissionais",
  "Necessidade de ajuda para tarefas básicas",
  "Desatualização em relação ao mercado"
];

export const Possibilities = () => {
  return (
    <section className="py-6 md:py-10 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-lg md:text-xl text-primary font-bold mb-2">
              💼 O mercado de trabalho valoriza profissionais capacitados
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              Compare: <span className="text-primary">Antes</span> e <span className="text-success">Depois</span> do curso
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
            <span className="font-bold text-foreground">Invista no seu futuro:</span> Desenvolva competências valorizadas pelo mercado de trabalho
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Vantagens - TRANSFORMAÇÃO */}
            <div className="bg-success/5 border-2 border-success/20 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-success">
                  Sua vida transformada
                </h3>
              </div>
              
              <div className="space-y-4">
                {advantages.map((advantage, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-card rounded-xl"
                  >
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-base font-medium">{advantage}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Situação Atual */}
            <div className="bg-muted/30 border-2 border-muted rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-foreground">
                  Situação atual
                </h3>
              </div>
              
              <div className="space-y-4">
                {currentSituation.map((situation, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-card rounded-xl"
                  >
                    <XCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-base font-medium text-muted-foreground">{situation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-center bg-success/10 border-2 border-success/30 rounded-2xl p-4 md:p-6">
            <p className="text-xl md:text-2xl font-black mb-4">
              Invista no seu desenvolvimento <span className="text-success">profissional</span>
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Comece hoje sua jornada rumo à qualificação profissional
            </p>
            <Button 
              size="lg" 
              className="font-extrabold px-6 md:px-10 py-5 md:py-6 rounded-2xl text-sm md:text-lg w-full md:w-auto"
            onClick={() => (window as any).openCheckout?.()}
          >
            💼 Quero me qualificar profissionalmente
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
