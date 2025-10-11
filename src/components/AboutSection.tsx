import { Button } from "@/components/ui/button";
import elisaPhoto from "@/assets/elisa-photo.jpg";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-panel">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-center">
            Conheça o Informática na Prática
          </h2>
          
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            O curso que já transformou a vida de mais de 15.000 pessoas que tinham medo do computador
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={elisaPhoto} 
                  alt="Professora Elisangela Neri Rigo" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Se você sente insegurança ao usar o computador ou tem medo de <strong className="text-foreground">"não conseguir"</strong>, o curso <strong className="text-foreground">Informática na Prática</strong> foi feito pra você 💙
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Aqui, você aprende <strong className="text-foreground">passo a passo</strong>, com exemplos simples e do dia a dia, até se sentir confiante e independente. Você vai perceber que aprender informática não é um <strong className="text-foreground">"bicho de 7 cabeças"</strong>.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Com mais de <strong className="text-foreground">20 anos de experiência</strong> ensinando, desenvolvi um método exclusivo que respeita seu ritmo e elimina de vez aquela sensação de "estar perdido" no computador.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 border-2 border-primary/20">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                <a href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica" target="_blank" rel="noopener noreferrer">
                  Tirar dúvidas no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
