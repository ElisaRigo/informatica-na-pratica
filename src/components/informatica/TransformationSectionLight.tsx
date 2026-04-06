import { Sparkles } from "lucide-react";

export const TransformationSectionLight = () => {
  return (
    <section className="py-8 md:py-10 bg-primary/10 border-y border-primary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            Sua transformação
          </div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
            Imagine Você Usando o Computador com{" "}
            <span className="text-primary">Total Confiança</span> e Sem Depender de Ninguém!
          </h2>
        </div>
      </div>
    </section>
  );
};
