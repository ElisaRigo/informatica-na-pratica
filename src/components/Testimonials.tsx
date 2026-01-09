import { memo } from "react";
import { Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    text: "Eu tinha medo de mexer no computador. Com a Elisa, aprendi de um jeito leve e hoje faço tudo no trabalho!",
    author: "Aline S.",
    image: "/testimonials/testimonial-new-1.jpg",
  },
  {
    text: "As aulas são diretas. Em poucos dias já estava criando planilhas e documentos.",
    author: "João M.",
    image: "/testimonials/testimonial-new-3.jpg",
  },
  {
    text: "O suporte da Elisa fez toda a diferença. Recomendo para quem quer aprender de verdade.",
    author: "Carla T.",
    image: "/testimonials/testimonial-new-2.jpg",
  },
  {
    text: "Finalmente consigo fazer meu currículo sozinha! Não sabia que era tão fácil.",
    author: "Maria L.",
    image: "/testimonials/testimonial-new-4.jpg",
  },
  {
    text: "Nunca imaginei que ia aprender a usar Excel. Agora uso no dia a dia e me sinto mais confiante.",
    author: "Roberto P.",
    image: "/testimonials/testimonial-new-6.jpg",
  },
  {
    text: "A prof. Elisa explica com paciência e clareza. Eu que achava impossível, hoje me viro super bem!",
    author: "Sandra F.",
    image: "/testimonials/testimonial-new-5.jpg",
  },
];

export const Testimonials = memo(() => {
  return (
    <section id="depoimentos" className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
          Histórias reais de quem saiu do zero e aprendeu de verdade
        </h2>
        <p className="text-center text-muted-foreground mb-6 text-lg max-w-2xl mx-auto">
          Veja o que os alunos têm a dizer sobre sua transformação
        </p>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
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
                  <AvatarImage 
                    src={testimonial.image} 
                    alt={`Foto de ${testimonial.author} - Aluna do Curso de Informática na Prática`}
                    loading="lazy"
                    decoding="async"
                  />
                  <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
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
            className="font-extrabold px-4 md:px-8 py-6 rounded-2xl text-xs md:text-base hover:scale-105 transition-transform w-full md:w-auto"
            onClick={() => (window as any).openCheckout?.()}
          >
            💪 Quero ser o próximo aluno!
          </Button>
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = "Testimonials";
