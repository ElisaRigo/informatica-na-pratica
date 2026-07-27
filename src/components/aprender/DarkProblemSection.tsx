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
    <section className="py-8 md:py-12 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden border-t border-blue-900/30">
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30 px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg shadow-orange-500/10">
            <AlertCircle className="w-4 h-4" />
            Você se identifica?
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
            Chega de se sentir <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">travado(a)</span>
            <br />
            por não saber usar o computador
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-3">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-slate-900/70 backdrop-blur rounded-xl shadow-lg shadow-black/20 border-l-4 border-orange-500 hover:border-red-500 hover:bg-slate-800/80 hover:shadow-orange-500/10 transition-all"
              >
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <p className="text-white font-medium text-sm">{problem}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <div className="inline-block bg-gradient-to-br from-blue-600 to-blue-700 border-2 border-blue-400/40 rounded-2xl p-6 shadow-xl shadow-blue-900/30">
              <p className="text-lg md:text-xl font-bold text-white mb-1">
                Se você marcou pelo menos 1 item acima...
              </p>
              <p className="text-blue-100">
                Este curso foi feito <strong className="text-white underline decoration-orange-400 underline-offset-4">especialmente para você</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
