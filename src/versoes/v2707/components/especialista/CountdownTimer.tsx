import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const DURATION_MIN = 20;
const STORAGE_KEY = "especialista_countdown_end";

export const CountdownTimer = () => {
  const [remaining, setRemaining] = useState<number>(DURATION_MIN * 60);

  useEffect(() => {
    let end = Number(localStorage.getItem(STORAGE_KEY));
    const now = Date.now();
    if (!end || end < now) {
      end = now + DURATION_MIN * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, String(end));
    }
    const tick = () => {
      const diff = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setRemaining(diff);
      if (diff === 0) {
        const newEnd = Date.now() + DURATION_MIN * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, String(newEnd));
        end = newEnd;
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");

  return (
    <div className="inline-flex items-center gap-2 md:gap-3 bg-red-600 text-white rounded-xl px-4 py-2 md:px-6 md:py-3 shadow-lg shadow-red-600/30 animate-pulse">
      <Clock className="w-5 h-5 md:w-6 md:h-6" />
      <span className="text-xs md:text-sm font-bold uppercase tracking-wide">Oferta expira em</span>
      <span className="font-mono text-lg md:text-2xl font-black tabular-nums">{mm}:{ss}</span>
    </div>
  );
};
