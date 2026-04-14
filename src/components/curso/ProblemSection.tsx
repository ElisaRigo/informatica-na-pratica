import { XCircle, AlertTriangle } from "lucide-react";

const problems = [
  "Fica nervoso(a) quando precisa usar o computador no trabalho?",
  "Tem medo de clicar em algo errado e estragar tudo?",
  "Precisa sempre pedir ajuda para fazer coisas simples?",
  "Já perdeu oportunidades de emprego por não saber informática?",
  "Sente vergonha de admitir que não domina o básico?",
  "Acha que é \"velho demais\" para aprender?",
];

export const ProblemSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-destructive/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-destructive/10 text-destructive px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <AlertTriangle className="w-4 h-4" />
            Você se identifica?
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            Chega de se sentir{" "}
            <span className="text-destructive">travado(a)</span>
            <br />
            por não saber usar o computador
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-lg border-l-4 border-destructive/50 hover:border-destructive hover:shadow-xl transition-all group"
              >
                <XCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <p className="text-foreground font-medium">{problem}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 rounded-2xl p-8">
              <p className="text-xl md:text-2xl font-bold text-foreground mb-2">
                😮‍💨 Se você marcou pelo menos 1 item acima...
              </p>
              <p className="text-lg text-muted-foreground">
                Este curso foi feito <strong className="text-primary">especialmente para você</strong>.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
