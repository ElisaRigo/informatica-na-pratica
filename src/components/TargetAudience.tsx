import { CheckCircle2 } from "lucide-react";

const targetProfiles = [
  {
    title: "Iniciantes absolutos",
    description: "Você nunca mexeu com computador ou tem muito medo de errar e \"quebrar\" algo",
  },
  {
    title: "Mercado de Trabalho",
    description: "Precisa de informática básica para conquistar uma vaga de emprego",
  },
  {
    title: "Aposentados e 50+",
    description: "Quer se manter atualizado e não depender de filhos ou netos",
  },
  {
    title: "Empreendedores",
    description: "Precisa organizar seu negócio, fazer planilhas e documentos",
  },
  {
    title: "Estudantes",
    description: "Precisa fazer trabalhos, apresentações e usar o computador para estudar",
  },
  {
    title: "Profissionais",
    description: "Quer melhorar suas habilidades e ser mais produtivo no trabalho",
  },
];

export const TargetAudience = () => {
  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              Para quem é <span className="text-primary">este curso?</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Se você se identifica com algum desses perfis, este curso foi feito sob medida para você
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {targetProfiles.map((profile, index) => (
              <div
                key={index}
                className="bg-card border border-line rounded-2xl p-6 hover:border-primary/50 transition-all hover:scale-105"
              >
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg md:text-xl font-bold">{profile.title}</h3>
                </div>
                <p className="text-sm md:text-base text-muted-foreground pl-9">
                  {profile.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 md:mt-12 text-center bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
            <p className="text-base md:text-lg font-semibold mb-2">
              💡 <span className="text-primary">Não importa sua idade ou experiência</span>
            </p>
            <p className="text-sm md:text-base text-muted-foreground">
              O curso é projetado para quem está começando do absoluto zero. Se você consegue ligar um computador, você consegue aprender!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
