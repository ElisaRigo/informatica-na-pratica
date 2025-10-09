import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

export const SocialProofBadge = () => {
  const [viewCount, setViewCount] = useState(87);

  useEffect(() => {
    // Simula variação realista de visualizações
    const interval = setInterval(() => {
      setViewCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(75, Math.min(95, newCount)); // Entre 75-95
      });
    }, 8000); // Atualiza a cada 8 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40 animate-fade-in hidden md:block">
      <div className="bg-card border-2 border-primary/30 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Eye className="w-5 h-5 text-primary" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
          <div className="text-sm">
            <span className="font-bold text-foreground">{viewCount} pessoas</span>
            <span className="text-muted-foreground"> viram nas últimas 24h</span>
          </div>
        </div>
      </div>
    </div>
  );
};
