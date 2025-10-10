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
  "Sentir vergonha ou insegurança ao usar o computador",
  "Ficar para trás enquanto o mundo avança",
  "Gastar dinheiro pedindo ajuda para coisas básicas",
  "Não conseguir acompanhar mudanças digitais"
];

export const Possibilities = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-4">
            Abra um mundo de possibilidades com o curso online de{" "}
            <span className="text-primary">Informática na Prática</span>
          </h2>
          
          <p className="text-lg md:text-xl text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
            Aprenda de qualquer lugar — veja a diferença entre quem domina a informática e quem ainda não deu esse passo
          </p>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Vantagens */}
            <div className="bg-success/5 border-2 border-success/20 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-success">
                  Com Informática
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

            {/* Desvantagens */}
            <div className="bg-destructive/5 border-2 border-destructive/20 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-destructive">
                  Sem Informática
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

          <div className="mt-10 md:mt-12 text-center">
            <Button 
              size="lg" 
              className="font-extrabold px-10 py-6 rounded-2xl text-base md:text-lg"
              asChild
            >
              <a href="https://pag.ae/8164tZJTR">
                Garantir minha vaga agora
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
