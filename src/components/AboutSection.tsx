import { Button } from "@/components/ui/button";

export const AboutSection = () => {
  return (
    <section className="py-20 bg-panel">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-black mb-6">Conheça este curso!</h2>
        <p className="text-muted-foreground text-lg max-w-4xl mx-auto mb-8">
          Descubra como o curso <strong className="text-foreground">Informática na Prática</strong> pode transformar sua relação com o computador. Você vai aprender tudo passo a passo, com exemplos reais e suporte direto da professora Elisa. Ideal para quem quer usar a informática no trabalho, nos estudos ou no dia a dia com mais confiança.
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
