import { Gift, Clock, Mail, Briefcase, Keyboard, FileText, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const bonuses = [
  {
    title: "1) E-mail Profissional",
    description: "Crie e configure seu e-mail, boas práticas e assinatura.",
    value: "R$ 97",
    icon: Mail,
  },
  {
    title: "2) Mercado de Trabalho",
    description: "Currículo, postura e como apresentar suas habilidades.",
    value: "R$ 127",
    icon: Briefcase,
  },
  {
    title: "3) Atalhos Essenciais",
    description: "Guia rápido com atalhos para ganhar tempo.",
    value: "R$ 47",
    icon: Keyboard,
  },
  {
    title: "4) Currículo Profissional",
    description: "Template profissional e dicas para um currículo que chama atenção.",
    value: "R$ 97",
    icon: FileText,
  },
];

export const Bonus = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const getNextMonday = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
      
      const nextMonday = new Date(now);
      nextMonday.setDate(now.getDate() + daysUntilMonday);
      nextMonday.setHours(0, 0, 0, 0);
      
      return nextMonday;
    };

    const updateTimer = () => {
      const now = new Date().getTime();
      const deadline = getNextMonday().getTime();
      const distance = deadline - now;

      if (distance < 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (num: number) => num.toString().padStart(2, "0");

  return (
    <section id="bonus" className="py-20 bg-panel relative overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-success via-accent to-success" />
      
      {/* Decorative glows */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-success/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-success/20 border border-success/40 text-success px-4 py-2 rounded-full mb-4">
            <Gift className="w-5 h-5" />
            <span className="font-bold">Bônus Exclusivos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Leve <span className="text-success text-4xl md:text-5xl glow-success">R$ 368 em bônus</span> sem pagar nada a mais
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
            Quem garantir vaga <span className="font-bold text-accent">hoje</span> recebe materiais que vão <span className="font-bold text-foreground">acelerar sua entrada no mercado</span>:
          </p>
          
          <div className="inline-flex items-center gap-3 bg-destructive/20 border-2 border-destructive/50 px-6 py-3 rounded-2xl animate-pulse">
            <Flame className="w-5 h-5 text-destructive" />
            <span className="font-bold text-sm text-destructive">Bônus disponíveis por tempo limitado:</span>
            <div className="flex gap-2">
              <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded font-bold text-sm min-w-[32px]">
                {pad(timeLeft.hours)}
              </div>
              <span className="font-bold text-destructive">:</span>
              <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded font-bold text-sm min-w-[32px]">
                {pad(timeLeft.minutes)}
              </div>
              <span className="font-bold text-destructive">:</span>
              <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded font-bold text-sm min-w-[32px]">
                {pad(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {bonuses.map((bonus, index) => {
            const IconComponent = bonus.icon;
            return (
              <div
                key={index}
                className="bg-card border-2 border-success/40 rounded-2xl p-6 hover:border-success transition-all hover:scale-105 relative overflow-hidden group"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 bg-success/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-xl" />
                
                {/* Selo de valor no topo */}
                <div className="absolute top-3 right-3 bg-gradient-to-r from-accent to-warning text-accent-foreground px-3 py-1.5 rounded-lg text-sm md:text-base font-black shadow-lg z-10">
                  {bonus.value}
                </div>
                
                {/* Selo "GRÁTIS" chamativo */}
                <div className="absolute -left-8 top-8 bg-gradient-to-r from-success to-success/80 text-success-foreground px-12 py-1 -rotate-45 text-xs font-black shadow-xl z-[5]">
                  GRÁTIS
                </div>
                
                <div className="mb-4 pt-8">
                  <div className="w-14 h-14 bg-success/20 rounded-xl flex items-center justify-center mb-3 mx-auto border border-success/30 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7 text-success" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3 text-center text-foreground">{bonus.title}</h3>
                <p className="text-muted-foreground text-sm text-center">{bonus.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 text-center max-w-4xl mx-auto">
          <div className="bg-card border-2 border-accent/50 rounded-3xl p-8 md:p-10 shadow-2xl glow-accent">
            <div className="mb-6">
              <p className="text-sm md:text-base text-muted-foreground mb-2 uppercase tracking-wide">
                Valor Total dos Bônus
              </p>
              <p className="text-5xl md:text-6xl font-black text-success mb-2 drop-shadow-lg">
                R$ 368,00
              </p>
              <p className="text-muted-foreground text-base md:text-lg">
                Mas hoje você <span className="text-success font-bold">NÃO paga NADA</span> por eles!
              </p>
            </div>
            
            <div className="bg-secondary/50 backdrop-blur rounded-2xl p-6 mb-6 border border-primary/20">
              <p className="text-lg md:text-xl font-bold mb-3 text-foreground">
                🎁 Tudo isso sem custo adicional para quem agir agora:
              </p>
              <ul className="text-left space-y-2 text-muted-foreground max-w-2xl mx-auto">
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span>Curso completo de Informática na Prática</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span>Módulo bônus: E-mail Profissional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span>Módulo bônus: Mercado de Trabalho</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span>E-book bônus: Atalhos Essenciais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span>Bônus: Currículo Profissional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span>Suporte direto com a prof. Elisa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success font-bold">✓</span>
                  <span>Certificado de conclusão</span>
                </li>
              </ul>
            </div>

            <Button 
              size="lg" 
              className="font-extrabold px-4 md:px-10 py-6 md:py-8 rounded-2xl text-sm md:text-lg bg-gradient-to-r from-success via-accent to-success hover:from-accent hover:via-success hover:to-accent border-2 border-success/50 shadow-lg hover:shadow-xl transition-all w-full glow-success text-success-foreground"
              onClick={() => (window as any).openCheckout?.()}
            >
              💪 Quero curso + bônus agora
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              🔒 Ambiente seguro • Acesso imediato após confirmação do pagamento
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
