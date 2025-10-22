import { Button } from "@/components/ui/button";
import elisaPhoto from "@/assets/elisa-photo.jpg";

export const AboutSection = () => {
  return (
    <section id="sobre" className="py-8 md:py-12 bg-panel">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-center">
            Quem vai te ensinar
          </h2>
          
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Professora com mais de 20 anos ajudando pessoas a perder o medo do computador
          </p>

          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={elisaPhoto} 
                  alt="Professora Elisangela Neri Rigo - Fundadora do Curso Informática na Prática com mais de 20 anos de experiência" 
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sou a professora Elisa e há mais de 20 anos ajudo pessoas a dominar o computador e conquistar novas oportunidades.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Desenvolvi o curso <strong className="text-foreground">Informática na Prática</strong> com um método simples e direto.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Já são mais de <strong className="text-foreground">15 mil alunos transformados</strong> — e o próximo pode ser você!
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-6 md:p-8 border-2 border-primary/20">
            <div className="flex flex-col gap-3 md:gap-4 justify-center">
              <Button 
                size="lg" 
                className="font-extrabold px-4 md:px-8 py-4 md:py-6 rounded-2xl text-sm md:text-base w-full"
              onClick={() => (window as any).openCheckout?.()}
            >
              💼 Investir na minha formação
            </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="font-extrabold px-4 md:px-8 py-4 md:py-6 rounded-2xl text-sm md:text-base border-2 w-full"
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
