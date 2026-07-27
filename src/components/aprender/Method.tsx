import { Play, MousePointerClick, Rocket, Check, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Play,
    n: "1",
    title: "Assista às aulas curtas e claras",
    result: "O computador deixa de ser um bicho de 7 cabeças",
    desc: "Aulas de 5 a 15 minutos, sem termos difíceis. Você assiste no celular, computador ou tablet, quando puder.",
  },
  {
    icon: MousePointerClick,
    n: "2",
    title: "Pratique clicando junto comigo",
    result: "Você ganha confiança a cada passo",
    desc: "Eu mostro exatamente onde clicar. Você repete comigo e aprende na prática, sem pular nada.",
  },
  {
    icon: Rocket,
    n: "3",
    title: "Use sozinho no seu dia a dia",
    result: "Você deixa de depender dos outros",
    desc: "Em poucos dias você já envia e-mails, cria documentos, organiza arquivos e navega na internet sem medo.",
  },
];

export const Method = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30 text-xs font-bold px-4 py-1.5 rounded-full mb-3 shadow-lg shadow-green-500/10">
            <Sparkles className="w-3.5 h-3.5" /> SUA TRANSFORMAÇÃO
          </span>
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            Do medo à confiança em 3 passos simples
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Você não precisa ter experiência. Basta seguir o passo a passo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5 relative">
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-400 to-blue-500/0" />

          {steps.map((s) => (
            <div
              key={s.n}
              className="relative bg-gradient-to-b from-slate-800/80 to-slate-900/80 backdrop-blur border border-blue-500/20 rounded-2xl p-5 md:p-6 overflow-hidden shadow-xl shadow-blue-900/10 hover:border-blue-400/40 hover:shadow-blue-500/10 transition-all"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full" />
              <div className="flex items-center gap-3 mb-4 relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/15 text-white font-black text-sm flex items-center justify-center shrink-0 border border-white/10">
                  {s.n}
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold mb-2">{s.title}</h3>

              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 text-xs font-bold px-3 py-1.5 rounded-lg mb-3 inline-flex items-center gap-1.5 shadow-sm">
                <Check className="w-3.5 h-3.5" /> {s.result}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-8 text-center">
          <p className="inline-flex items-center gap-2 text-green-300 font-bold text-sm md:text-base bg-gradient-to-r from-green-500/15 to-emerald-500/15 border border-green-500/30 px-5 py-2.5 rounded-full shadow-lg shadow-green-500/10">
            Se milhares de alunos conseguiram aprender dessa forma, você também consegue.
          </p>
        </div>
      </div>
    </section>
  );
};
