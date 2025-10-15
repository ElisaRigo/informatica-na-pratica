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
    <div className="sticky top-0 z-50 bg-gradient-to-r from-primary/90 via-accent/90 to-primary/90 text-white py-2 md:py-3 shadow-lg border-b-2 border-accent/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-4">
          <p className="text-xs md:text-base font-black text-center">
            ⏰ Promoção especial termina em:
          </p>
          <div className="flex gap-1.5 md:gap-3" role="timer" aria-live="polite">
            <div className="bg-background/90 backdrop-blur-sm rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2.5 min-w-[45px] md:min-w-[60px] text-center border border-accent/30 shadow-md">
              <div className="text-lg md:text-2xl font-black text-accent">{pad(timeLeft.days)}</div>
              <div className="text-[8px] md:text-xs font-bold text-foreground">DIAS</div>
            </div>
            <div className="bg-background/90 backdrop-blur-sm rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2.5 min-w-[45px] md:min-w-[60px] text-center border border-accent/30 shadow-md">
              <div className="text-lg md:text-2xl font-black text-accent">{pad(timeLeft.hours)}</div>
              <div className="text-[8px] md:text-xs font-bold text-foreground">HORAS</div>
            </div>
            <div className="bg-background/90 backdrop-blur-sm rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2.5 min-w-[45px] md:min-w-[60px] text-center border border-accent/30 shadow-md">
              <div className="text-lg md:text-2xl font-black text-accent">{pad(timeLeft.minutes)}</div>
              <div className="text-[8px] md:text-xs font-bold text-foreground">MIN</div>
            </div>
            <div className="bg-background/90 backdrop-blur-sm rounded-lg md:rounded-xl px-2 md:px-4 py-1.5 md:py-2.5 min-w-[45px] md:min-w-[60px] text-center border border-accent/30 shadow-md">
              <div className="text-lg md:text-2xl font-black text-accent">{pad(timeLeft.seconds)}</div>
              <div className="text-[8px] md:text-xs font-bold text-foreground">SEG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
