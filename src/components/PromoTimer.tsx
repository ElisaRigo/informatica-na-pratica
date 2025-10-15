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
    <div className="sticky top-0 z-50 bg-gradient-to-r from-destructive via-warning to-destructive text-white py-3 md:py-4 shadow-[0_4px_20px_rgba(255,0,0,0.4)] border-b-4 border-warning">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
          <p className="text-sm md:text-lg font-black text-center">
            🔥 ÚLTIMA CHANCE! Promoção expira em:
          </p>
          <div className="flex gap-2 md:gap-3" role="timer" aria-live="polite">
            <div className="bg-background/90 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-2.5 min-w-[50px] md:min-w-[65px] text-center border-2 border-warning shadow-lg">
              <div className="text-xl md:text-3xl font-black text-warning">{pad(timeLeft.days)}</div>
              <div className="text-[9px] md:text-xs font-black text-foreground">DIAS</div>
            </div>
            <div className="bg-background/90 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-2.5 min-w-[50px] md:min-w-[65px] text-center border-2 border-warning shadow-lg">
              <div className="text-xl md:text-3xl font-black text-warning">{pad(timeLeft.hours)}</div>
              <div className="text-[9px] md:text-xs font-black text-foreground">HORAS</div>
            </div>
            <div className="bg-background/90 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-2.5 min-w-[50px] md:min-w-[65px] text-center border-2 border-warning shadow-lg">
              <div className="text-xl md:text-3xl font-black text-warning">{pad(timeLeft.minutes)}</div>
              <div className="text-[9px] md:text-xs font-black text-foreground">MIN</div>
            </div>
            <div className="bg-background/90 backdrop-blur-sm rounded-xl px-3 md:px-4 py-2 md:py-2.5 min-w-[50px] md:min-w-[65px] text-center border-2 border-warning shadow-lg">
              <div className="text-xl md:text-3xl font-black text-warning">{pad(timeLeft.seconds)}</div>
              <div className="text-[9px] md:text-xs font-black text-foreground">SEG</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
