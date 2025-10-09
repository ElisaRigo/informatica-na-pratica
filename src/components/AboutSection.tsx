import { Button } from "@/components/ui/button";

export const AboutSection = () => {
  return (
    <section className="py-20 bg-panel">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-6">Conheça este curso!</h2>
        <p className="text-muted-foreground text-lg max-w-4xl mx-auto mb-8 leading-relaxed">
          Se você sente insegurança ao usar o computador ou tem medo de "não conseguir", o curso <strong className="text-foreground">Informática na Prática</strong> foi feito pra você 💙 Aqui, eu te ensino passo a passo, com exemplos simples e do dia a dia, até você se sentir confiante e independente. Você vai perceber que aprender informática não é um <strong className="text-foreground">"bicho de 7 cabeças"</strong>.
        </p>
        <Button 
          size="lg" 
          className="font-extrabold px-8 py-6 rounded-2xl"
          asChild
        >
          <a href="#conteudo">Ver o que vou aprender</a>
        </Button>
      </div>
    </section>
  );
};
