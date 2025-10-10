import { useState, useEffect } from "react";

export const PromoTimer = () => {
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
    <div className="sticky top-0 z-50 bg-panel border-b border-line">
      <div className="container mx-auto px-3 py-2 md:py-3">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <span className="font-extrabold text-xs md:text-base tracking-wide text-center">
            🔥 Promoção especial encerrando em:
          </span>
          <div className="flex gap-1.5 md:gap-2" role="timer" aria-live="polite">
            <div className="bg-card border border-line rounded-lg md:rounded-xl px-2 md:px-3 py-1.5 md:py-2 min-w-[45px] md:min-w-[54px] text-center">
              <div className="font-extrabold text-base md:text-lg">{pad(timeLeft.days)}</div>
              <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase">dias</div>
            </div>
            <div className="bg-card border border-line rounded-lg md:rounded-xl px-2 md:px-3 py-1.5 md:py-2 min-w-[45px] md:min-w-[54px] text-center">
              <div className="font-extrabold text-base md:text-lg">{pad(timeLeft.hours)}</div>
              <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase">horas</div>
            </div>
            <div className="bg-card border border-line rounded-lg md:rounded-xl px-2 md:px-3 py-1.5 md:py-2 min-w-[45px] md:min-w-[54px] text-center">
              <div className="font-extrabold text-base md:text-lg">{pad(timeLeft.minutes)}</div>
              <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase">min</div>
            </div>
            <div className="bg-card border border-line rounded-lg md:rounded-xl px-2 md:px-3 py-1.5 md:py-2 min-w-[45px] md:min-w-[54px] text-center">
              <div className="font-extrabold text-base md:text-lg">{pad(timeLeft.seconds)}</div>
              <div className="text-[9px] md:text-[10px] text-muted-foreground uppercase">seg</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
