import { Play, MousePointerClick, Rocket, Check } from "lucide-react";

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
    desc: "Em poucos dias você já envia e-mails, cria documentos, organiza planilhas e navega na internet sem medo.",
  },
];

export const Method = () => {
  return (
    <section className="py-6 md:py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-6 md:mb-8">
          <span className="inline-block bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full mb-3">
            SUA TRANSFORMAÇÃO
          </span>
          <h2 className="text-2xl md:text-4xl font-black mb-3">
            Do medo à confiança em 3 passos simples
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Você não precisa decorar. Só precisa seguir, praticar e sentir o resultado.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-5 relative">
          <div className="hidden md:block absolute top-12 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0" />

          {steps.map((s) => (
            <div
              key={s.n}
              className="relative bg-white/10 backdrop-blur border border-white/10 rounded-2xl p-5 md:p-6 overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {s.n}
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold mb-2">{s.title}</h3>

              <div className="bg-green-500/20 border border-green-500/30 text-green-300 text-xs font-bold px-3 py-1.5 rounded-lg mb-3 inline-block">
                Resultado: {s.result}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
