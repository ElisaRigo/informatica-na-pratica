import { Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import mariaPhoto from "@/assets/testimonial-maria.jpg";
import robertoPhoto from "@/assets/testimonial-roberto.jpg";
import sandraPhoto from "@/assets/testimonial-sandra.jpg";

const finalTestimonials = [
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

export const FinalTestimonials = () => {
  return (
    <section className="py-16 bg-panel">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-3">
          Não deixe para depois
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
          Veja o que outros alunos conseguiram quando decidiram começar:
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
          {finalTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border-2 border-success/30 rounded-2xl p-6 hover:border-success transition-all"
            >
              <Quote className="w-8 h-8 text-success/50 mb-3" />
              <p className="text-base italic mb-4 leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
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

        <div className="text-center">
          <Button 
            size="lg" 
            className="font-extrabold px-8 md:px-10 py-6 md:py-7 rounded-2xl text-base md:text-lg bg-success hover:bg-success/90 shadow-lg hover:shadow-xl transition-all"
            asChild
          >
            <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer">
              🎯 Sim, quero garantir minha vaga
            </a>
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            ⚡ Últimas vagas disponíveis nesta condição
          </p>
        </div>
      </div>
    </section>
  );
};
