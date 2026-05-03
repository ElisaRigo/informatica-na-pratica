import { AlertCircle, Clock, BookOpen, Target } from "lucide-react";

export const DisclaimerSection = () => {
  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <AlertCircle className="w-4 h-4" />
              Informação Importante
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
              Sobre o Prazo de 30 Dias
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Transparência é fundamental. Entenda como funciona minha estimativa de aprendizado.
            </p>
          </div>

          {/* Main disclaimer card */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8 mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  O prazo de "30 dias" é uma estimativa
                </h3>
                <p className="text-slate-600 leading-relaxed mb-3">
                  <em className="text-amber-700 font-medium">*Resultados variam conforme dedicação. Estimativa baseada em 1h/dia de estudo.</em>
                </p>
                <p className="text-slate-600 leading-relaxed">
                  O período de 30 dias mencionado nos meus materiais de divulgação é uma <strong>estimativa baseada 
                  em estudos de aproximadamente 1 hora por dia</strong>. Este prazo foi calculado considerando o 
                  progresso médio dos meus alunos que seguem o cronograma sugerido.
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h4 className="font-semibold text-slate-800 mb-4">Fatores que influenciam seu resultado:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    icon: BookOpen,
                    title: "Dedicação aos estudos",
                    description: "Quanto mais você praticar, mais rápido será seu progresso"
                  },
                  {
                    icon: Target,
                    title: "Experiência prévia",
                    description: "Seu nível de familiaridade inicial com tecnologia"
                  },
                  {
                    icon: Clock,
                    title: "Tempo disponível",
                    description: "A quantidade de horas que você pode dedicar por dia"
                  },
                  {
                    icon: AlertCircle,
                    title: "Ritmo individual",
                    description: "Cada pessoa aprende em seu próprio tempo"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-slate-50 rounded-xl p-4">
                    <item.icon className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-800 text-sm">{item.title}</p>
                      <p className="text-slate-500 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legal notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-2">Aviso Legal:</p>
                <ul className="space-y-1 text-amber-700">
                  <li>• O prazo de 30 dias <strong>não é uma garantia</strong> de domínio completo do conteúdo.</li>
                  <li>• Resultados variam conforme a dedicação, disponibilidade e ritmo de aprendizado de cada aluno.</li>
                  <li>• O curso oferece todo o conteúdo necessário, mas o progresso depende do esforço individual.</li>
                  <li>• Ofereço <strong>garantia de 7 dias</strong> para reembolso integral caso não esteja satisfeito.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reassurance */}
          <p className="text-center text-slate-500 text-sm mt-6">
            📚 Meu compromisso é fornecer o melhor conteúdo e suporte para sua jornada de aprendizado.
          </p>
        </div>
      </div>
    </section>
  );
};
