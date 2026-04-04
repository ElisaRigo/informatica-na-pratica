import { Award, Star, Briefcase, FileCheck, ArrowRight, Sparkles, Trophy, GraduationCap, BookOpen } from "lucide-react";
import certificadoExemplo from "@/assets/certificado-exemplo.png";

export const CertificateSectionLight = () => {
  return (
    <div className="py-8 md:py-12 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-700 px-5 py-2.5 rounded-full text-sm font-bold mb-5 animate-pulse">
            <Trophy className="w-5 h-5" />
            <span>Certificado Profissional Incluso</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 leading-tight">
            Imagine <span className="text-amber-500">seu nome</span> aqui!
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            O momento em que você <strong className="text-foreground">conquista seu certificado</strong> e prova para o mundo que você é capaz!
          </p>
        </div>

        {/* Certificate Display */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
            <div className="relative bg-white p-3 md:p-5 rounded-2xl shadow-2xl border border-amber-200">
              <div className="relative overflow-hidden rounded-xl select-none" onContextMenu={(e) => e.preventDefault()}>
                <img src={certificadoExemplo} alt="Exemplo de Certificado do Curso de Informática - 120 horas" className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-500 pointer-events-none" loading="lazy" draggable="false" onDragStart={(e) => e.preventDefault()} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-4xl md:text-6xl lg:text-7xl font-black text-red-500/30 rotate-[-25deg] select-none tracking-widest">EXEMPLO</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-2 right-4">
              <span className="text-xs md:text-sm text-muted-foreground font-medium">*Exemplo ilustrativo</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-10">
          {[
            { icon: Briefcase, title: "Destaque no Mercado", description: "Saia na frente em entrevistas de emprego", gradient: "from-blue-500 to-cyan-500" },
            { icon: FileCheck, title: "120 Horas Reconhecidas", description: "Válido em todo território nacional", gradient: "from-emerald-500 to-green-500" },
            { icon: Star, title: "Orgulho Pessoal", description: "Prove para si mesmo que você consegue!", gradient: "from-amber-500 to-yellow-500" },
          ].map((item, i) => (
            <div key={i} className="group flex flex-col items-center text-center p-5 md:p-6 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button onClick={() => (window as any).openCheckout?.()} className="group relative inline-flex items-center justify-center gap-3 bg-success hover:bg-success/90 text-white font-black text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Trophy className="w-5 h-5 md:w-6 md:h-6" />
            Quero Conquistar Meu Certificado!
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-500" />
            Certificado digital gerado automaticamente após conclusão
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a href="#professora" onClick={(e) => { e.preventDefault(); document.getElementById('professora')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95">
              <GraduationCap className="w-4 h-4" /> Conheça a Professora
            </a>
            <a href="#conteudo" onClick={(e) => { e.preventDefault(); document.getElementById('conteudo')?.scrollIntoView({ behavior: 'smooth' }); }} className="inline-flex items-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95">
              <BookOpen className="w-4 h-4" /> Ver Conteúdo do Curso
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
