import { Button } from "@/components/ui/button";
import elisaPhoto from "@/assets/elisa-photo.jpg";

export const AboutSection = () => {
  return (
    <section id="about" className="py-12 md:py-16 bg-panel">
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
                  alt="Professora Elisangela Neri Rigo" 
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-6 text-center md:text-left">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sou a professora Elisa, e ao longo de mais de 20 anos ensinando informática, percebi algo importante: muita gente desiste não por falta de capacidade, mas porque as aulas são rápidas demais ou usam termos complicados.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Por isso criei o <strong className="text-foreground">Informática na Prática</strong> — um curso onde você aprende no seu ritmo, com exemplos do dia a dia e linguagem simples. Sem pressão, sem termos técnicos difíceis.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Já ajudei mais de <strong className="text-foreground">15.000 pessoas</strong> que achavam que "não levavam jeito" para tecnologia. E posso te ajudar também, com paciência e sem pressa.
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
