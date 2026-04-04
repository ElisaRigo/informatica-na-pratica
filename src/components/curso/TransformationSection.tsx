import { ArrowRight, Sparkles } from "lucide-react";

const transformations = [
  { before: "Medo de errar", after: "Confiança total" },
  { before: "Depender dos outros", after: "Autonomia completa" },
  { before: "Perder oportunidades", after: "Conquistar vagas" },
  { before: "Vergonha de pedir ajuda", after: "Ajudar outras pessoas" },
  { before: "Frustração constante", after: "Satisfação pessoal" },
];

export const TransformationSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-white/5 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            Sua transformação
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Imagine você daqui a 30 dias...
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Usando o computador com total confiança, sem medo de errar, 
            e impressionando todo mundo com suas novas habilidades.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {transformations.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all group"
              >
                <div className="flex-1 text-right">
                  <span className="text-white/60 line-through text-lg">{item.before}</span>
                </div>
                
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <ArrowRight className="w-6 h-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <span className="text-white font-bold text-lg">{item.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="inline-flex items-center justify-center gap-3 bg-white text-primary font-black text-lg md:text-xl px-10 py-5 rounded-full shadow-2xl hover:shadow-white/30 hover:scale-105 transition-all"
          >
            QUERO ESSA TRANSFORMAÇÃO
          </button>
        </div>
      </div>
    </section>
  );
};
