import { Gift, Clock, Mail, Briefcase, Keyboard, FileText } from "lucide-react";
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
    <section id="bonus" className="py-20 bg-gradient-to-br from-success/5 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full mb-4">
            <Gift className="w-5 h-5" />
            <span className="font-bold">Bônus Exclusivos Inclusos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Ganhe <span className="text-success">R$ 368 em bônus</span> de presente!
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-6">
            Ao garantir sua vaga hoje, você recebe <span className="font-bold text-foreground">GRATUITAMENTE</span> estes materiais extras para acelerar seus resultados:
          </p>
          
          <div className="inline-flex items-center gap-3 bg-primary/10 border-2 border-primary/30 px-6 py-3 rounded-2xl">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-bold text-sm">Promoção com bônus até:</span>
            <div className="flex gap-2">
              <div className="bg-destructive text-white px-2 py-1 rounded font-bold text-sm min-w-[32px]">
                {pad(timeLeft.hours)}
              </div>
              <span className="font-bold">:</span>
              <div className="bg-destructive text-white px-2 py-1 rounded font-bold text-sm min-w-[32px]">
                {pad(timeLeft.minutes)}
              </div>
              <span className="font-bold">:</span>
              <div className="bg-destructive text-white px-2 py-1 rounded font-bold text-sm min-w-[32px]">
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
                className="bg-card border-2 border-success/30 rounded-2xl p-6 hover:border-success transition-all hover:scale-105 relative"
              >
                <div className="absolute -top-3 right-4 bg-success text-white px-4 py-1 rounded-full text-sm font-bold">
                  {bonus.value}
                </div>
                <div className="mb-4 pt-2">
                  <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mb-3">
                    <IconComponent className="w-6 h-6 text-success" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-3">{bonus.title}</h3>
                <p className="text-muted-foreground text-sm">{bonus.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 text-center max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-success/20 via-primary/10 to-success/5 border-2 border-success/40 rounded-3xl p-8 md:p-10 shadow-2xl">
            <div className="mb-6">
              <p className="text-sm md:text-base text-muted-foreground mb-2 uppercase tracking-wide">
                Valor Total dos Bônus
              </p>
              <p className="text-4xl md:text-5xl font-black text-success mb-2">
                R$ 368,00
              </p>
              <p className="text-muted-foreground text-base md:text-lg">
                Mas hoje você <span className="text-success font-bold">NÃO paga NADA</span> por eles!
              </p>
            </div>
            
            <div className="bg-card/50 backdrop-blur rounded-2xl p-6 mb-6">
              <p className="text-lg md:text-xl font-bold mb-3">
                🎁 Receba TUDO isso de presente ao garantir sua vaga hoje:
              </p>
              <ul className="text-left space-y-2 text-muted-foreground max-w-2xl mx-auto">
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Curso completo de Informática na Prática</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Módulo bônus: E-mail Profissional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Módulo bônus: Mercado de Trabalho</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>E-book bônus: Atalhos Essenciais</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Bônus: Currículo Profissional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Suporte direto com a prof. Elisa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success">✓</span>
                  <span>Certificado de conclusão</span>
                </li>
              </ul>
            </div>

            <Button 
              size="lg" 
              className="font-extrabold px-6 md:px-10 py-5 md:py-7 rounded-2xl text-sm md:text-lg bg-success hover:bg-success/90 shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
              asChild
            >
              <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer">
                🎁 Quero curso + bônus
              </a>
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
