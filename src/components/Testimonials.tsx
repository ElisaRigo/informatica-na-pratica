import { Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import alinePhoto from "@/assets/testimonial-aline.jpg";
import joaoPhoto from "@/assets/testimonial-joao.jpg";
import carlaPhoto from "@/assets/testimonial-carla.jpg";
import mariaPhoto from "@/assets/testimonial-maria.jpg";
import robertoPhoto from "@/assets/testimonial-roberto.jpg";
import sandraPhoto from "@/assets/testimonial-sandra.jpg";

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
    text: "O suporte da Elisa fez toda a diferença. Recomendo pra quem quer aprender de verdade.",
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
    <section id="depoimentos" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
          O que dizem os alunos
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-line rounded-2xl p-8 hover:border-accent/50 transition-all"
            >
              <Quote className="w-10 h-10 text-accent/50 mb-4" />
              <p className="text-lg italic mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={testimonial.image} alt={testimonial.author} />
                  <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm text-muted-foreground font-semibold">
                  — {testimonial.author}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-bold mb-3">
            Junte-se a +15.000 alunos que já transformaram suas vidas
          </p>
          <p className="text-muted-foreground mb-6 text-base md:text-lg">
            <span className="line-through">De R$ 497</span> por apenas <span className="text-accent font-bold text-xl">R$ 297</span> • Oferta termina em breve
          </p>
          <Button 
            size="lg" 
            className="font-extrabold px-10 py-7 rounded-2xl text-lg hover:scale-105 transition-transform"
            asChild
          >
            <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer">
              🚀 Garantir minha vaga com 40% OFF
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
