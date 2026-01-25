import { Award, Star, Briefcase, FileCheck, ArrowRight, Sparkles, Trophy, GraduationCap } from "lucide-react";
import certificadoExemplo from "@/assets/certificado-exemplo.png";

export const CertificateSection = () => {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header com impacto */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-400/30 text-amber-300 px-5 py-2.5 rounded-full text-sm font-bold mb-5 animate-pulse">
            <Trophy className="w-5 h-5" />
            <span>Certificado Profissional Incluso</span>
            <Sparkles className="w-4 h-4" />
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Imagine <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400">seu nome</span> aqui!
          </h2>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            O momento em que você <strong className="text-white">conquista seu certificado</strong> e prova para o mundo que você é capaz!
          </p>
        </div>

        {/* Certificate Display com efeito WOW */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="relative group">
            {/* Animated glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-3xl blur-2xl opacity-30" />
            
            {/* Certificate frame */}
            <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 p-3 md:p-5 rounded-2xl shadow-2xl border border-amber-500/20">
              <div className="relative overflow-hidden rounded-xl">
                <img 
                  src={certificadoExemplo}
                  alt="Exemplo de Certificado do Curso de Informática - 120 horas"
                  className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            
            {/* Example badge */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 text-white text-xs md:text-sm font-semibold px-5 py-2 rounded-full shadow-xl border border-slate-600">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                Exemplo de Certificado
              </span>
            </div>
          </div>
        </div>

        {/* Emotional Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-10">
          {[
            { 
              icon: Briefcase, 
              title: "Destaque no Mercado", 
              description: "Saia na frente em entrevistas de emprego",
              gradient: "from-blue-500 to-cyan-500"
            },
            { 
              icon: FileCheck, 
              title: "120 Horas Reconhecidas", 
              description: "Válido em todo território nacional",
              gradient: "from-emerald-500 to-green-500"
            },
            { 
              icon: Star, 
              title: "Orgulho Pessoal", 
              description: "Prove para si mesmo que você consegue!",
              gradient: "from-amber-500 to-yellow-500"
            },
          ].map((item, i) => (
            <div 
              key={i} 
              className="group flex flex-col items-center text-center p-5 md:p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                <item.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-lg text-white mb-1">{item.title}</h3>
              <p className="text-sm text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Powerful CTA */}
        <div className="text-center">
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-success via-emerald-500 to-success hover:from-emerald-500 hover:via-success hover:to-emerald-500 text-white font-black text-base md:text-lg px-8 md:px-10 py-4 md:py-5 rounded-2xl shadow-2xl shadow-success/40 hover:shadow-success/60 hover:scale-105 transition-all duration-300"
          >
            <Trophy className="w-5 h-5 md:w-6 md:h-6" />
            Quero Conquistar Meu Certificado!
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <p className="text-sm text-slate-400 mt-4 flex items-center justify-center gap-2">
            <GraduationCap className="w-4 h-4 text-amber-400" />
            Certificado digital gerado automaticamente após conclusão
          </p>
        </div>
      </div>
    </section>
  );
};
