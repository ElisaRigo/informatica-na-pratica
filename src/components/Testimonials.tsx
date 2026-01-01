import { Quote, Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import alinePhoto from "@/assets/testimonial-new-1.jpg";
import joaoPhoto from "@/assets/testimonial-new-3.jpg";
import carlaPhoto from "@/assets/testimonial-new-2.jpg";
import mariaPhoto from "@/assets/testimonial-new-4.jpg";
import robertoPhoto from "@/assets/testimonial-new-6.jpg";
import sandraPhoto from "@/assets/testimonial-new-5.jpg";

const testimonials = [
  {
    text: "Eu tinha medo de mexer no computador. Com a Elisa, aprendi de um jeito leve e hoje faço tudo no trabalho!",
    author: "Aline S.",
    image: alinePhoto,
  },
  {
    text: "As aulas são diretas. Em poucos dias já estava criando planilhas e documentos.",
    author: "João M.",
    image: joaoPhoto,
  },
  {
    text: "O suporte da Elisa fez toda a diferença. Recomendo para quem quer aprender de verdade.",
    author: "Carla T.",
    image: carlaPhoto,
  },
  {
    text: "Finalmente consigo fazer meu currículo sozinha! Não sabia que era tão fácil.",
    author: "Maria L.",
    image: mariaPhoto,
  },
  {
    text: "Nunca imaginei que ia aprender a usar Excel. Agora uso no dia a dia e me sinto mais confiante.",
    author: "Roberto P.",
    image: robertoPhoto,
  },
  {
    text: "A prof. Elisa explica com paciência e clareza. Eu que achava impossível, hoje me viro super bem!",
    author: "Sandra F.",
    image: sandraPhoto,
  },
];

export const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-12 md:py-16 bg-gradient-to-b from-background via-panel/50 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 text-accent px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 fill-accent" />
            <span className="font-bold text-sm">Histórias de Sucesso</span>
            <Star className="w-4 h-4 fill-accent" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Histórias reais de quem saiu do <span className="text-accent">zero</span> e aprendeu de <span className="text-primary">verdade</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Veja o que os alunos têm a dizer sobre sua transformação
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border-2 border-primary/30 rounded-2xl p-8 hover:border-accent/50 transition-all hover:scale-105 relative group"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 bg-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
              
              <Quote className="w-10 h-10 text-accent mb-4" />
              <p className="text-lg italic mb-6 leading-relaxed text-foreground">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-primary/30">
                  <AvatarImage 
                    src={testimonial.image} 
                    alt={`Foto de ${testimonial.author} - Aluna do Curso de Informática na Prática`}
                    loading="lazy"
                    decoding="async"
                    width="48"
                    height="48"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">{testimonial.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm text-muted-foreground font-semibold">
                  — {testimonial.author}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="font-extrabold px-6 md:px-10 py-6 md:py-7 rounded-2xl text-sm md:text-lg hover:scale-105 transition-transform bg-gradient-to-r from-accent to-warning hover:from-warning hover:to-accent border-2 border-accent/50 glow-accent text-accent-foreground"
            onClick={() => (window as any).openCheckout?.()}
          >
            💪 Quero ser o próximo aluno!
          </Button>
        </div>
      </div>
    </section>
  );
};
