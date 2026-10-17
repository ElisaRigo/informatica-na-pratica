import { Star, Quote } from "lucide-react";

export const TestimonialsV2 = () => {
  return (
    <section className="py-12 md:py-16 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
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
