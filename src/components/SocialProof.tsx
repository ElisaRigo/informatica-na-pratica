import { Users, TrendingUp, Award, Zap } from "lucide-react";

export const SocialProof = () => {
  return (
    <section className="py-10 md:py-14 bg-panel relative overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />
      
      {/* Decorative glows */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6 bg-primary/20 border border-primary/30 px-4 py-2 rounded-full">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-bold text-primary">Você não está sozinho(a)!</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
            🖥️ <span className="text-gradient">Milhares de alunos</span> já aprenderam comigo
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Junte-se a milhares de alunos que saíram do zero e hoje dominam a informática com confiança. Você não está sozinho(a) nessa jornada 🚀
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <div className="bg-card border-2 border-primary/40 rounded-2xl p-6 hover:border-primary transition-all hover:scale-105 group">
              <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-black text-accent mb-2">+15.000</div>
              <div className="text-sm font-semibold text-muted-foreground">Alunos transformados</div>
            </div>

            <div className="bg-card border-2 border-accent/40 rounded-2xl p-6 hover:border-accent transition-all hover:scale-105 group">
              <Award className="w-10 h-10 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-black text-primary mb-2">+90 aulas</div>
              <div className="text-sm font-semibold text-muted-foreground">Rápidas e sem enrolação</div>
            </div>

            <div className="bg-card border-2 border-warning/40 rounded-2xl p-6 hover:border-warning transition-all hover:scale-105 group">
              <Zap className="w-10 h-10 text-warning mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-black text-accent mb-2">Prático</div>
              <div className="text-sm font-semibold text-muted-foreground">Aprendizado acelerado</div>
            </div>

            <div className="bg-card border-2 border-success/40 rounded-2xl p-6 hover:border-success transition-all hover:scale-105 group">
              <Users className="w-10 h-10 text-success mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-3xl font-black text-primary mb-2">7 dias</div>
              <div className="text-sm font-semibold text-muted-foreground">Garantia incondicional</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
