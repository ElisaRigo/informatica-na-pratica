import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Smartphone, Clock } from "lucide-react";

const features = [
  'Parcele em até 12x',
  'Acesso online imediato',
  'Suporte direto com a professora',
  'Garantia total de 7 dias',
];

export const Pricing = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
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
    <section id="preco" className="py-6 md:py-10 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-card border-2 border-primary/20 rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-2xl">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-2xl">
              <div className="flex items-center gap-2 text-accent mb-3 justify-center">
                <Clock className="w-5 h-5" />
                <span className="font-bold text-sm md:text-base">Promoção disponível até:</span>
              </div>
              
              <div className="flex gap-2 mb-6 justify-center" role="timer" aria-live="polite">
                <div className="bg-panel border border-line rounded-lg px-3 py-2 min-w-[60px] text-center">
                  <div className="font-extrabold text-2xl text-primary">{pad(timeLeft.days)}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">dias</div>
                </div>
                <div className="bg-panel border border-line rounded-lg px-3 py-2 min-w-[60px] text-center">
                  <div className="font-extrabold text-2xl text-primary">{pad(timeLeft.hours)}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">horas</div>
                </div>
                <div className="bg-panel border border-line rounded-lg px-3 py-2 min-w-[60px] text-center">
                  <div className="font-extrabold text-2xl text-primary">{pad(timeLeft.minutes)}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">min</div>
                </div>
                <div className="bg-panel border border-line rounded-lg px-3 py-2 min-w-[60px] text-center">
                  <div className="font-extrabold text-2xl text-primary">{pad(timeLeft.seconds)}</div>
                  <div className="text-[10px] text-muted-foreground uppercase">seg</div>
                </div>
              </div>

              <div className="mb-4 p-4 md:p-5 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl border-2 border-accent/30">
                <p className="text-xs md:text-sm font-bold text-foreground mb-3 text-center">
                  📊 Comparação de valor:
                </p>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs md:text-sm text-muted-foreground">Curso de Informática:</span>
                    <span className="text-sm md:text-lg font-bold line-through text-muted-foreground">R$ 497</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs md:text-sm text-success font-semibold">+ Bônus inclusos:</span>
                    <span className="text-sm md:text-lg font-bold text-success">R$ 271</span>
                  </div>
                  <div className="border-t border-accent/20 pt-2 mt-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm md:text-base font-bold text-foreground">Valor total:</span>
                      <span className="text-xl md:text-3xl font-black line-through text-muted-foreground">R$ 768</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6 p-6 bg-gradient-to-br from-success/20 to-primary/20 rounded-2xl border-3 border-success/50 shadow-lg">
                <p className="text-base md:text-lg font-bold text-muted-foreground mb-2 text-center">
                  💰 Investimento que transforma:
                </p>
                <p className="text-4xl md:text-6xl font-black text-success mb-2 text-center">
                  12x de R$ 30,22
                </p>
                <p className="text-base md:text-xl font-semibold text-muted-foreground mb-2 text-center">
                  ou <span className="font-bold text-foreground text-lg md:text-2xl">R$ 297,00</span> à vista
                </p>
                <div className="bg-card/50 backdrop-blur rounded-lg p-3 mt-3">
                  <p className="text-sm md:text-base text-muted-foreground text-center">
                    De <span className="line-through text-destructive">R$ 768</span> por apenas <span className="font-black text-foreground">R$ 297</span> — <span className="font-bold text-foreground">menos de R$ 1 por dia</span> para mudar sua vida profissional.
                  </p>
                </div>
                <p className="text-base md:text-lg font-bold text-success mt-3 text-center">
                  ✅ Economize R$ 471 hoje!
                </p>
              </div>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 md:gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-lg leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="w-full text-sm md:text-xl font-black px-4 md:px-8 py-6 md:py-8 rounded-2xl hover:scale-105 transition-all shadow-[0_12px_40px_hsl(var(--accent)/0.4)] bg-gradient-to-r from-accent to-success hover:from-success hover:to-accent border-2 border-accent/30 mb-6"
                onClick={() => (window as any).openCheckout?.()}
              >
                Quero começar agora com desconto
              </Button>

              <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                <div className="flex items-center gap-1.5 md:gap-2 bg-panel border border-line px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl">
                  <CreditCard className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-semibold">Cartão</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 bg-panel border border-line px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl">
                  <Smartphone className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-semibold">Pix</span>
                </div>
                <div className="flex items-center gap-1.5 md:gap-2 bg-panel border border-line px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl">
                  <span className="text-xs md:text-sm font-semibold">🧾 Boleto</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
