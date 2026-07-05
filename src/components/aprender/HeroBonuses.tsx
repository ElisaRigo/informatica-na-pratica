import { Briefcase, Keyboard, FileText, Mail, Gift, Check, Sparkles } from "lucide-react";

const bonuses = [
  {
    icon: Briefcase,
    title: "Mercado de Trabalho",
    description: "Descubra as vagas que mais precisam de informática e como se preparar.",
    value: "R$ 127",
  },
  {
    icon: Keyboard,
    title: "Atalhos Essenciais",
    description: "Ganhe tempo com os atalhos mais usados por quem domina o computador.",
    value: "R$ 47",
  },
  {
    icon: FileText,
    title: "Currículo Profissional",
    description: "Monte um currículo que chama a atenção dos recrutadores na hora.",
    value: "R$ 97",
  },
  {
    icon: Mail,
    title: "E-mail Profissional",
    description: "Aprenda a criar e usar um e-mail que passa credibilidade.",
    value: "R$ 97",
  },
];

interface HeroBonusesProps {
  variant?: "dark" | "light";
}

export const HeroBonuses = ({ variant = "dark" }: HeroBonusesProps) => {
  const isLight = variant === "light";

  const totalValue = bonuses.reduce((acc, b) => {
    const num = parseInt(b.value.replace(/\D/g, ""), 10);
    return acc + num;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto mb-4 md:mb-6">
      {/* Header */}
      <div className="text-center mb-4 md:mb-6">
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-3 ${isLight ? "bg-amber-100 border border-amber-200 text-amber-700" : "bg-amber-500/15 border border-amber-400/30 text-amber-300"}`}>
          <Gift className="w-4 h-4" />
          <span>Módulos Extras Inclusos</span>
        </div>
        <h3 className={`text-2xl md:text-3xl lg:text-4xl font-black leading-tight ${isLight ? "text-slate-900" : "text-white"}`}>
          Você leva <span className="text-primary">tudo isso</span> de brinde
        </h3>
        <p className={`text-sm md:text-base mt-2 max-w-2xl mx-auto ${isLight ? "text-slate-600" : "text-slate-300"}`}>
          Não são apenas aulas. São ferramentas prontas para usar no seu dia a dia e no trabalho.
        </p>
      </div>

      {/* Bonus cards */}
      <div className="grid sm:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
        {bonuses.map((bonus, i) => (
          <div
            key={i}
            className={`relative rounded-xl p-4 md:p-5 transition-all ${isLight ? "bg-white border border-slate-200 hover:border-primary/40 hover:shadow-lg" : "bg-slate-800/70 border border-slate-700 hover:border-primary/40 hover:shadow-lg"}`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isLight ? "bg-blue-100" : "bg-primary/15"}`}>
                <bonus.icon className={`w-5 h-5 md:w-6 md:h-6 ${isLight ? "text-blue-600" : "text-primary"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className={`font-bold text-sm md:text-base leading-tight ${isLight ? "text-slate-900" : "text-white"}`}>
                    {bonus.title}
                  </h4>
                  <span className="text-accent font-black text-sm md:text-base whitespace-nowrap">
                    {bonus.value}
                  </span>
                </div>
                <p className={`text-xs md:text-sm leading-relaxed ${isLight ? "text-slate-500" : "text-slate-400"}`}>
                  {bonus.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Value anchor */}
      <div className={`border-2 border-primary/30 rounded-2xl p-4 md:p-6 text-center ${isLight ? "bg-white" : "bg-slate-800/90"}`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className={`w-5 h-5 ${isLight ? "text-amber-500" : "text-amber-400"}`} />
          <p className={`font-bold text-base md:text-lg ${isLight ? "text-slate-900" : "text-white"}`}>
            Só os bônus já valem mais de <span className="text-accent font-black">R$ {totalValue},00</span>
          </p>
          <Sparkles className={`w-5 h-5 ${isLight ? "text-amber-500" : "text-amber-400"}`} />
        </div>
        <p className={`text-sm md:text-base mb-3 ${isLight ? "text-slate-600" : "text-slate-300"}`}>
          E você leva o <strong className={isLight ? "text-slate-900" : "text-white"}>curso completo</strong> com todos esses módulos
        </p>
        <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${isLight ? "bg-green-50 border border-green-200" : "bg-success/15 border border-success/40"}`}>
          <Check className={`w-4 h-4 ${isLight ? "text-green-600" : "text-success"}`} />
          <span className={`font-black text-sm md:text-base ${isLight ? "text-green-700" : "text-success"}`}>
            Tudo incluso por um único investimento
          </span>
        </div>
      </div>
    </div>
  );
};
