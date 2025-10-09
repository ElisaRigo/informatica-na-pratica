import { Button } from "@/components/ui/button";
import elisaPhoto from "@/assets/elisa-photo.jpg";

export const AboutSection = () => {
  return (
    <section className="py-20 bg-panel">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black mb-12 text-center">Conheça este curso!</h2>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          {/* Foto da Elisa */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl"></div>
              <img 
                src={elisaPhoto} 
                alt="Professora Elisa - Instrutora de Informática na Prática" 
                className="relative rounded-3xl shadow-2xl w-full max-w-md object-cover border-4 border-primary/10"
              />
            </div>
          </div>

          {/* Texto */}
          <div className="order-2 md:order-1 text-center md:text-left">
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Se você sente insegurança ao usar o computador ou tem medo de <strong className="text-foreground">"não conseguir"</strong>, o curso <strong className="text-foreground">Informática na Prática</strong> foi feito pra você 💙
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Aqui, eu te ensino passo a passo, com exemplos simples e do dia a dia, até você se sentir confiante e independente. Você vai perceber que aprender informática não é um <strong className="text-foreground">"bicho de 7 cabeças"</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                size="lg" 
                className="font-extrabold px-8 py-6 rounded-2xl text-base"
                asChild
              >
                <a href="https://pag.ae/8164tZJTR">
                  🚀 Quero começar agora
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="font-extrabold px-8 py-6 rounded-2xl text-base border-2"
                asChild
              >
                <a href="#conteudo">Ver o conteúdo completo</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
