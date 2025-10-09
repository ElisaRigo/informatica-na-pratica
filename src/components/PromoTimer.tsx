import { useState, useEffect } from "react";

export const PromoTimer = () => {
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
    <div className="sticky top-0 z-50 bg-panel border-b border-line">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          <span className="font-extrabold text-sm md:text-base tracking-wide">
            Oferta especial termina em:
          </span>
          <div className="flex gap-2" role="timer" aria-live="polite">
            <div className="bg-card border border-line rounded-xl px-3 py-2 min-w-[54px] text-center">
              <div className="font-extrabold text-lg">{pad(timeLeft.days)}</div>
              <div className="text-[10px] text-muted-foreground uppercase">dias</div>
            </div>
            <div className="bg-card border border-line rounded-xl px-3 py-2 min-w-[54px] text-center">
              <div className="font-extrabold text-lg">{pad(timeLeft.hours)}</div>
              <div className="text-[10px] text-muted-foreground uppercase">horas</div>
            </div>
            <div className="bg-card border border-line rounded-xl px-3 py-2 min-w-[54px] text-center">
              <div className="font-extrabold text-lg">{pad(timeLeft.minutes)}</div>
              <div className="text-[10px] text-muted-foreground uppercase">min</div>
            </div>
            <div className="bg-card border border-line rounded-xl px-3 py-2 min-w-[54px] text-center">
              <div className="font-extrabold text-lg">{pad(timeLeft.seconds)}</div>
              <div className="text-[10px] text-muted-foreground uppercase">seg</div>
            </div>
          </div>
          <a
            href="#preco"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold px-4 py-2 rounded-xl text-sm transition-all hover:scale-105"
          >
            Garantir por R$297
          </a>
        </div>
      </div>
    </div>
  );
};
