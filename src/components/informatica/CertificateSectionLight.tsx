import { Trophy, Sparkles } from "lucide-react";
import certificadoExemplo from "@/assets/certificado-exemplo.png";

export const CertificateSectionLight = () => {
  return (
    <div className="py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-muted/50 border border-border text-muted-foreground px-5 py-2.5 rounded-full text-sm font-bold mb-4">
            <Trophy className="w-5 h-5 text-muted-foreground" />
            <span>Certificado Profissional Incluso</span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-foreground leading-tight">
            Imagine <span className="text-primary">seu nome</span> aqui!
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-muted via-border to-muted rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
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
      </div>
    </div>
  );
};
