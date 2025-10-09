import { Users, TrendingUp, Award } from "lucide-react";

export const SocialProof = () => {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-accent/5 border-y border-line">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 bg-primary/10 px-4 py-2 rounded-full">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary">Você não está sozinho(a)!</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            🖥️ <span className="text-primary">Milhares de alunos</span> já aprenderam comigo
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Junte-se a milhares de alunos que saíram do zero e hoje dominam a informática com confiança. Você não está sozinho(a) nessa jornada 🚀
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-card/50 backdrop-blur-sm border border-line rounded-2xl p-6 hover:border-primary/50 transition-all">
              <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
              <div className="text-3xl font-black text-primary mb-2">+15.000</div>
              <div className="text-sm font-semibold text-muted-foreground">Alunos transformados</div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-line rounded-2xl p-6 hover:border-primary/50 transition-all">
              <Award className="w-10 h-10 text-accent mx-auto mb-3" />
              <div className="text-3xl font-black text-primary mb-2">95%</div>
              <div className="text-sm font-semibold text-muted-foreground">De satisfação</div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-line rounded-2xl p-6 hover:border-primary/50 transition-all">
              <Users className="w-10 h-10 text-success mx-auto mb-3" />
              <div className="text-3xl font-black text-primary mb-2">100%</div>
              <div className="text-sm font-semibold text-muted-foreground">Suporte dedicado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
