import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, CreditCard, Smartphone, Clock } from "lucide-react";

const features = [
  'De R$ 497 por R$ 297',
  'Parcele em até 12x',
  'Acesso imediato + suporte direto com a professora',
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
    const deadline = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = deadline.getTime() - now;

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
    <section id="preco" className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-card border-2 border-primary/20 rounded-2xl md:rounded-3xl p-5 md:p-12 shadow-2xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-10 items-center">
            <div>
              <div className="flex items-center gap-2 text-accent mb-3">
                <Clock className="w-5 h-5" />
                <span className="font-bold text-sm md:text-base">Oferta termina em:</span>
              </div>
              
              <div className="flex gap-2 mb-6" role="timer" aria-live="polite">
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

              <div className="text-muted-foreground mb-2 font-semibold text-sm md:text-base">
                Valor total: <span className="line-through">R$ 768</span>
              </div>
              <div className="mb-2">
                <span className="text-sm md:text-base font-semibold text-muted-foreground">Curso (</span>
                <span className="line-through text-muted-foreground text-base md:text-lg">R$ 497</span>
                <span className="text-sm md:text-base font-semibold text-muted-foreground">) + Bônus (</span>
                <span className="text-muted-foreground text-base md:text-lg">R$ 271</span>
                <span className="text-sm md:text-base font-semibold text-muted-foreground">)</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black mb-6 md:mb-8">
                Hoje por apenas <span className="text-accent">R$ 297</span>
              </h3>
              
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 md:gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-lg leading-tight">
                      {index === 0 ? (
                        <>
                          De <span className="line-through text-muted-foreground">R$ 497</span> por{' '}
                          <strong className="text-accent">R$ 297</strong>
                        </>
                      ) : (
                        feature
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3">
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

            <div className="text-center lg:text-left">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-2 text-gradient">
                R$ 297
              </div>
              <div className="text-muted-foreground text-base md:text-lg mb-6 md:mb-8">
                à vista • ou em até 12x no cartão
              </div>
              
              <Button 
                size="lg" 
                className="w-full font-extrabold text-base md:text-lg px-6 md:px-8 py-5 md:py-7 rounded-xl md:rounded-2xl mb-3 md:mb-4 hover:scale-105 transition-transform"
                asChild
              >
                <a href="https://pag.ae/8164tZJTR" target="_blank" rel="noopener noreferrer">
                  Garantir meu acesso agora
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="w-full font-bold text-base md:text-lg px-6 md:px-8 py-4 md:py-6 rounded-xl md:rounded-2xl border-2"
                asChild
              >
                <a href="https://wa.me/5545988287082" target="_blank" rel="noopener noreferrer">
                  Tirar uma dúvida no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
