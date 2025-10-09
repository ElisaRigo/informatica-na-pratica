import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "Eu tinha medo de mexer no computador. Com a Elisa, aprendi de um jeito leve e hoje faço tudo no trabalho!",
    author: "Aline S.",
  },
  {
    text: "As aulas são diretas. Em poucos dias já estava criando planilhas e documentos.",
    author: "João M.",
  },
  {
    text: "O suporte da Elisa fez toda a diferença. Recomendo pra quem quer aprender de verdade.",
    author: "Carla T.",
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
              <div className="text-sm text-muted-foreground font-semibold">
                — {testimonial.author}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
