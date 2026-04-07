import { X, Check, ArrowRight, AlertTriangle, Quote } from "lucide-react";
import testimonialPhoto from "@/assets/testimonial-new-2.jpg";

export const ValueComparison = () => {
  return (
    <section className="py-8 md:py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-black text-foreground text-center mb-2">
            Por que este curso é a <span className="text-success">melhor escolha</span>?
          </h2>
          <p className="text-center text-muted-foreground text-xs md:text-sm mb-6">
            Compare e veja a diferença:
          </p>

          <div className="grid grid-cols-2 gap-3">
            {/* Presencial - DOR */}
            <div className="bg-destructive/5 border-2 border-destructive/30 rounded-xl p-4 relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-destructive text-white text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                PREJUÍZO
              </div>
              <p className="text-xs font-bold text-destructive mb-2 uppercase tracking-wide mt-1">Curso Presencial</p>
              <p className="text-2xl md:text-3xl font-black text-destructive mb-3">R$ 1.500<span className="text-sm font-medium text-destructive/60">+</span></p>
              <ul className="space-y-2.5">
                {[
                  "Horário fixo que não encaixa",
                  "Gastar com transporte todo dia",
                  "Turma lotada, sem atenção",
                  "Perdeu a aula? Perdeu o conteúdo",
                  "Material cobrado à parte",
                  "Acesso só enquanto pagar"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <X className="w-3.5 h-3.5 text-destructive flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Este curso */}
            <div className="bg-success/10 border-2 border-success/40 rounded-xl p-4 relative">
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-success text-white text-[10px] font-bold px-3 py-0.5 rounded-full">
                ✅ MELHOR OPÇÃO
              </div>
              <p className="text-xs font-bold text-success mb-2 uppercase tracking-wide mt-1">Este Curso</p>
              <p className="text-2xl md:text-3xl font-black text-foreground mb-3">R$ 297<span className="text-sm font-medium text-muted-foreground">,00</span></p>
              <ul className="space-y-2.5">
                {[
                  "Estude a hora que quiser",
                  "Sem sair de casa",
                  "Suporte individual no WhatsApp",
                  "Assista quantas vezes precisar",
                  "Certificado incluso",
                  "Acesso vitalício garantido"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-foreground">
                    <Check className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Depoimento estratégico */}
          <div className="bg-success/10 border border-success/20 rounded-xl p-4 mt-5 flex items-start gap-3">
            <img 
              src={testimonialPhoto} 
              alt="Aluna Carla" 
              className="w-10 h-10 rounded-full object-cover border-2 border-success/40 flex-shrink-0 mt-0.5"
              loading="lazy"
            />
            <div>
              <p className="text-xs text-foreground italic leading-relaxed">
                "Eu tinha medo de gastar e não aprender. <strong className="text-success">Em 2 semanas já estava fazendo tudo sozinha.</strong> Melhor investimento que fiz!"
              </p>
              <p className="text-[10px] text-muted-foreground font-semibold mt-1">— Carla E., Comerciante</p>
            </div>
          </div>

          <div className="text-center mt-5">
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="group inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-bold text-sm px-6 py-3 rounded-full shadow-lg hover:scale-[1.02] transition-all"
            >
              Quero Começar Hoje
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] mt-2 text-muted-foreground">
              🔒 Pagamento seguro • Garantia de 7 dias
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
