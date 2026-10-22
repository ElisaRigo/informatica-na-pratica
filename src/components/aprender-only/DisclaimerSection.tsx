import { ShieldCheck } from "lucide-react";

export const DisclaimerSection = () => {
  return (
    <section
      aria-labelledby="prazo-aprendizagem"
      className="border-t border-slate-200 bg-slate-50 py-5 md:py-6"
    >
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <div className="mb-1.5 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <h2 id="prazo-aprendizagem" className="text-base font-bold text-slate-800 md:text-lg">
            Cada pessoa aprende no seu tempo
          </h2>
        </div>
        <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
          Em pouco tempo você já usa o computador com mais segurança. É uma estimativa, não uma
          promessa — o ritmo depende da sua prática. E você tem 7 dias de garantia para testar sem
          risco.
        </p>
      </div>
    </section>
  );
};
