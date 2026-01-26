import { Star, Quote } from "lucide-react";
import testimonial1 from "@/assets/testimonial-new-1.jpg";
import testimonial2 from "@/assets/testimonial-new-2.jpg";
import testimonial3 from "@/assets/testimonial-new-3.jpg";
import testimonial4 from "@/assets/testimonial-new-4.jpg";
import testimonial5 from "@/assets/testimonial-new-5.jpg";
import testimonial6 from "@/assets/testimonial-new-6.jpg";

const testimonials = [
  {
    name: "Maria Helena, 58 anos",
    role: "Aposentada",
    text: "Achei que era tarde demais para aprender. A Elisa provou que eu estava errada! Hoje faço tudo sozinha no computador.",
    image: testimonial1,
    rating: 5,
  },
  {
    name: "Carla Eduarda, 23 anos",
    role: "Comerciante",
    text: "Finalmente consigo fazer minhas planilhas de controle de estoque. Economizo 3 horas por semana!",
    image: testimonial2,
    rating: 5,
  },
  {
    name: "Pedro Junk",
    role: "Secretário",
    text: "Ganhei uma promoção porque agora domino Word e Excel. O investimento se pagou em menos de um mês.",
    image: testimonial3,
    rating: 5,
  },
  {
    name: "Toberta Silva, 28 anos",
    role: "Autônoma",
    text: "A didática da professora é incrível. Ela explica de um jeito que até quem nunca usou computador entende.",
    image: testimonial4,
    rating: 5,
  },
  {
    name: "Fernanda Costa, 28 anos",
    role: "Estudante",
    text: "Consegui meu primeiro emprego graças ao curso! Fiz meu currículo perfeito e impressionei na entrevista.",
    image: testimonial5,
    rating: 5,
  },
  {
    name: "José Antônio, 61 anos",
    role: "Aposentado",
    text: "Meus netos não acreditaram quando viram eu usando o computador sozinho. Valeu cada centavo!",
    image: testimonial6,
    rating: 5,
  },
];

export const TestimonialsV2 = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-accent/20 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-6">
            ⭐ Histórias Reais
          </span>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Mais de <span className="text-accent">15.000 vidas</span> transformadas
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Veja o que nossos alunos estão dizendo sobre o curso
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-all hover:-translate-y-2"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/50 mb-4" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-warning text-warning" />
                ))}
              </div>
              
              {/* Text */}
              <p className="text-white/90 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/50"
                  loading="lazy"
                />
                <div>
                  <p className="text-white font-bold">{testimonial.name}</p>
                  <p className="text-slate-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-12">
          {[
            { number: "15.000+", label: "Alunos" },
            { number: "98%", label: "Satisfação" },
            { number: "4.9", label: "Avaliação" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-black text-gradient">{stat.number}</p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
