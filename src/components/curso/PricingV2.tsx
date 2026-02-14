import { Check, Zap, Shield, Gift, Clock, Award, Users, Headphones } from "lucide-react";

const included = [
  { icon: Check, text: "Acesso completo a +90 videoaulas" },
  { icon: Check, text: "Windows, Word, Excel, PowerPoint, Internet" },
  { icon: Check, text: "Módulo de Digitação Profissional" },
  { icon: Check, text: "Certificado de conclusão" },
  { icon: Check, text: "Suporte direto com a professora" },
  { icon: Check, text: "Acesso Vitalício" },
  { icon: Check, text: "Atualizações gratuitas" },
  { icon: Check, text: "Material de apoio em PDF" },
];

const bonuses = [
  { icon: Gift, text: "BÔNUS: E-mail Profissional", value: "R$ 97" },
  { icon: Gift, text: "BÔNUS: Mercado de Trabalho", value: "R$ 127" },
  { icon: Gift, text: "BÔNUS: Atalhos Essenciais", value: "R$ 47" },
  { icon: Gift, text: "BÔNUS: Currículo Profissional", value: "R$ 97" },
];

export const PricingV2 = () => {
  return (
    <section id="preco" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-warning/20 text-warning px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
            🎯 OFERTA ESPECIAL POR TEMPO LIMITADO
          </span>
          
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            Invista em você por{" "}
            <span className="text-primary">menos de R$ 1 por dia</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main pricing card */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-primary/20">
            {/* Top banner */}
            <div className="bg-gradient-to-r from-primary to-accent py-4 px-6 text-center">
              <p className="text-white font-bold text-lg">
                🔥 ECONOMIA DE MAIS DE 60% — Apenas Hoje!
              </p>
            </div>

            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: What's included */}
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-primary" />
                    O que você recebe:
                  </h3>
                  
                  <ul className="space-y-3 mb-8">
                    {included.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-foreground">{item.text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="bg-gradient-to-r from-warning/10 to-warning/5 rounded-xl p-4 border border-warning/20">
                    <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                      <Gift className="w-5 h-5 text-warning" />
                      BÔNUS EXCLUSIVOS:
                    </h4>
                    <ul className="space-y-2">
                      {bonuses.map((bonus, i) => (
                        <li key={i} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{bonus.text}</span>
                          <span className="text-destructive line-through">{bonus.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: Price and CTA */}
                <div className="flex flex-col justify-center">
                  <div className="text-center mb-6">
                    <p className="text-muted-foreground mb-2">De <span className="line-through">R$ 697,00</span> por apenas:</p>
                    
                    <div className="mb-1">
                      <span className="text-4xl md:text-6xl font-black text-success">12x de R$ 30,22</span>
                    </div>
                    
                    <p className="text-lg text-muted-foreground font-semibold">
                      ou <span className="font-bold text-foreground">R$ 297,00</span> à vista
                    </p>
                    <p className="text-sm text-muted-foreground">
                      no cartão de crédito
                    </p>
                  </div>

                  <button
                    onClick={() => (window as any).openCheckout?.()}
                    className="w-full bg-gradient-to-r from-accent to-success text-white font-black text-xl py-5 rounded-2xl shadow-2xl shadow-accent/40 hover:shadow-accent/60 hover:scale-[1.02] transition-all mb-4"
                  >
                    QUERO GARANTIR MINHA VAGA
                  </button>

                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                    <Shield className="w-4 h-4 text-accent" />
                    <span>Compra 100% segura • Acesso imediato</span>
                  </div>

                  {/* Trust badges */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Clock, text: "Acesso Vitalício" },
                      { icon: Award, text: "Certificado incluso" },
                      { icon: Users, text: "+15.000 alunos" },
                      { icon: Headphones, text: "Suporte humanizado" },
                    ].map((badge, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground bg-slate-50 rounded-lg p-2">
                        <badge.icon className="w-4 h-4 text-primary" />
                        <span>{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-8 bg-gradient-to-r from-accent/10 to-success/10 rounded-2xl p-8 border-2 border-accent/30 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Shield className="w-16 h-16 text-accent" />
              <div className="text-left">
                <h3 className="text-2xl font-black text-foreground">
                  Garantia Incondicional de 7 Dias
                </h3>
                <p className="text-muted-foreground">
                  Risco ZERO para você experimentar
                </p>
              </div>
            </div>
            <p className="text-foreground max-w-2xl mx-auto">
              Se por qualquer motivo você não ficar satisfeito(a) com o curso nos primeiros 7 dias, 
              basta enviar um e-mail e devolvemos <strong>100% do seu dinheiro</strong>. 
              Sem perguntas, sem burocracia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
