import { AlertTriangle } from "lucide-react";

export const ProblemBanner = () => {
  return (
    <section className="py-8 md:py-10 bg-destructive/10 border-y border-destructive/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-2 bg-destructive/15 text-destructive px-4 py-2 rounded-full text-sm font-semibold">
            <AlertTriangle className="w-4 h-4" />
            Pare e reflita
          </div>
          <h2 className="text-xl md:text-3xl lg:text-4xl font-black text-white leading-tight">
            Chega de <span className="text-destructive">Perder Oportunidades</span> por não Saber Usar o Computador!
          </h2>
        </div>
      </div>
    </section>
  );
};
