import { Award, Star, Briefcase, FileCheck, ArrowRight } from "lucide-react";
import certificadoExemplo from "@/assets/certificado-exemplo.png";

export const CertificateSection = () => {
  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-4">
            <Award className="w-4 h-4" />
            Certificado Incluso
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-3">
            Imagine seu nome <span className="text-primary">aqui!</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Ao concluir o curso, você recebe um certificado profissional que comprova suas habilidades para o mercado de trabalho.
          </p>
        </div>

        {/* Certificate Display */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-2xl opacity-60" />
            
            {/* Certificate image */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
              <img 
                src={certificadoExemplo}
                alt="Exemplo de Certificado do Curso de Informática"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            
            {/* Example label */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
              <span className="bg-slate-700 text-white text-xs md:text-sm font-medium px-4 py-1.5 rounded-full shadow-lg">
                📜 Exemplo de Certificado
              </span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
          {[
            { 
              icon: Briefcase, 
              title: "Valorize seu Currículo", 
              description: "Destaque-se nas entrevistas de emprego" 
            },
            { 
              icon: FileCheck, 
              title: "120 Horas de Carga Horária", 
              description: "Reconhecido nacionalmente" 
            },
            { 
              icon: Star, 
              title: "Profissional Qualificado", 
              description: "Comprove suas habilidades com orgulho" 
            },
          ].map((item, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center text-center p-4 md:p-6 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-sm text-slate-500">{item.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => (window as any).openCheckout?.()}
            className="group inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-bold text-sm md:text-base px-6 md:px-8 py-3 rounded-xl shadow-lg shadow-success/30 hover:shadow-success/50 hover:scale-[1.02] transition-all duration-300"
          >
            Quero Meu Certificado!
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-xs md:text-sm text-slate-400 mt-3">
            🎓 Certificado digital gerado automaticamente após conclusão
          </p>
        </div>
      </div>
    </section>
  );
};
