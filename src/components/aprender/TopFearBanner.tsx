export const TopFearBanner = () => {
  const message = "🫣 VOCÊ TEM MEDO DO COMPUTADOR? — EU TE AJUDO DO ZERO, SEM PRESSÃO E NO SEU RITMO";

  return (
    <div className="relative my-4 md:my-6 max-w-4xl mx-auto">
      {/* Glow externo animado */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-accent rounded-2xl blur-lg opacity-70 animate-pulse" />

      <div className="relative rounded-2xl border-2 border-white/30 shadow-2xl shadow-primary/40 overflow-hidden bg-gradient-to-r from-accent via-primary to-accent">
        {/* Linha 1 - rolando para a esquerda */}
        <div className="overflow-hidden py-2.5 md:py-3 border-b border-white/20">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={`a-${i}`}
                className="text-white font-black text-base md:text-2xl uppercase tracking-tight mx-8 drop-shadow-md"
              >
                {message}
              </span>
            ))}
          </div>
        </div>

        {/* Linha 2 - rolando para a esquerda (ritmo diferente) */}
        <div className="overflow-hidden py-2.5 md:py-3">
          <div className="flex animate-marquee whitespace-nowrap" style={{ animationDuration: "35s" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <span
                key={`b-${i}`}
                className="text-white font-black text-base md:text-2xl uppercase tracking-tight mx-8 drop-shadow-md"
              >
                {message}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
