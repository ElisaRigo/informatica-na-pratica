import { Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import testimonialPhoto1 from "@/assets/testimonial-final-1.jpg";
import testimonialPhoto2 from "@/assets/testimonial-final-2.jpg";
import testimonialPhoto3 from "@/assets/testimonial-final-3.jpg";

const finalTestimonials = [
  {
    text: "Consegui meu primeiro emprego de escritório graças ao curso. Hoje trabalho com computador todo dia e me sinto muito mais independente!",
    author: "Claudia R.",
    image: testimonialPhoto1,
  },
  {
    text: "Antes dependia dos outros pra tudo. Hoje faço minhas contas online, mando e-mails e até ajudo meus filhos com o computador.",
    author: "Paulo S.",
    image: testimonialPhoto2,
  },
  {
    text: "Achava que nunca ia conseguir. Com apenas 2 semanas de curso, já estava organizando meus documentos no Word. Valeu cada centavo!",
    author: "Fernanda C.",
    image: testimonialPhoto3,
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
                  <AvatarImage src={testimonial.image} alt={testimonial.author} loading="lazy" />
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
            className="font-extrabold px-6 md:px-10 py-5 md:py-7 rounded-2xl text-sm md:text-lg bg-success hover:bg-success/90 shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
            onClick={() => (window as any).openCheckout?.()}
          >
            💪 Quero fazer parte dessa transformação
          </Button>
          <p className="text-xs text-muted-foreground mt-4">
            ⚡ Aproveite a promoção especial
          </p>
        </div>
      </div>
    </section>
  );
};
