import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const advantages = [
  "Conquistar vagas de emprego com mais facilidade",
  "Trabalhar de casa ou de qualquer lugar",
  "Resolver problemas do dia a dia sozinho(a)",
  "Ajudar filhos e netos com tecnologia",
  "Organizar sua vida digital com segurança",
  "Ter autonomia e independência tecnológica"
];

const disadvantages = [
  "Perder oportunidades de emprego por falta de conhecimento",
  "Depender sempre de outras pessoas para tarefas simples",
  "Sentir insegurança ao usar o computador no dia a dia",
  "Ter dificuldade em acompanhar as ferramentas digitais atuais",
  "Gastar dinheiro pedindo ajuda para tarefas básicas",
  "Não conseguir aproveitar recursos tecnológicos disponíveis"
];

export const Possibilities = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-destructive/5 to-destructive/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-lg md:text-xl text-destructive font-bold mb-2">
              ⚠️ A cada dia que passa sem informática...
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              Você perde <span className="text-destructive">oportunidades</span> que poderiam mudar sua vida
            </h2>
          </div>
          
          <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            <span className="font-bold text-foreground">A escolha é sua:</span> Continuar dependendo de outros ou conquistar sua independência digital
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

            {/* Desvantagens - REFORÇO DA DOR */}
            <div className="bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-destructive">
                  Sua realidade hoje
                </h3>
              </div>
              
              <div className="space-y-4">
                {disadvantages.map((disadvantage, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-card rounded-xl"
                  >
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <p className="text-base font-medium text-muted-foreground">{disadvantage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 md:mt-12 text-center bg-primary/10 border-2 border-primary/30 rounded-2xl p-6 md:p-8">
            <p className="text-xl md:text-2xl font-black mb-4">
              Não deixe mais um dia passar <span className="text-destructive">sem tomar essa decisão</span>
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Cada momento conta quando se trata do seu futuro profissional
            </p>
            <Button 
              size="lg" 
              className="font-extrabold px-6 md:px-10 py-5 md:py-6 rounded-2xl text-sm md:text-lg w-full md:w-auto"
            asChild
          >
            <a href="#checkout" onClick={(e) => { e.preventDefault(); document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' }); }}>
              💪 Sim, quero mudar agora
            </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
