import { AlertCircle } from "lucide-react";

const problems = [
  "Fica nervoso(a) quando precisa usar o computador no trabalho?",
  "Tem medo de clicar em algo errado e estragar tudo?",
  "Precisa sempre pedir ajuda para fazer coisas simples?",
  "Já perdeu oportunidades de emprego por não saber informática?",
  "Sente vergonha de admitir que não domina o básico?",
  "Acha que é \"velho demais\" para aprender?",
];

export const DarkProblemSection = () => {
  return (
    <section className="py-6 md:py-8 bg-slate-900 relative overflow-hidden border-t border-slate-800">
      <div className="absolute top-0 left-0 w-72 h-72 bg-destructive/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-destructive/15 text-destructive px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <AlertCircle className="w-4 h-4" />
            Você se identifica?
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Chega de se sentir <span className="text-destructive">travado(a)</span>
            <br />
            por não saber usar o computador
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-3">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-slate-800/70 rounded-xl shadow-md border-l-4 border-destructive/60 hover:border-destructive hover:shadow-lg transition-all"
              >
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-white font-medium text-sm">{problem}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <div className="inline-block bg-primary/10 border-2 border-primary/30 rounded-2xl p-6">
              <p className="text-lg md:text-xl font-bold text-white mb-1">
                Se você marcou pelo menos 1 item acima...
              </p>
              <p className="text-slate-300">
                Este curso foi feito <strong className="text-primary">especialmente para você</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
