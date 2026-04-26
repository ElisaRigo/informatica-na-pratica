export const TopFearBanner = () => {
  return (
    <div className="relative my-4 md:my-6 max-w-3xl mx-auto px-2">
      {/* Glow externo */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-accent rounded-2xl blur-lg opacity-70 animate-pulse" />

      <div className="relative bg-gradient-to-r from-accent via-primary to-accent rounded-2xl border-2 border-white/30 shadow-2xl shadow-primary/40 px-4 py-4 md:px-8 md:py-5 text-center">
        <p className="text-white font-black text-xl md:text-3xl leading-tight uppercase tracking-tight drop-shadow-md">
          🫣 Você tem medo do computador?
        </p>
        <p className="text-white font-bold text-base md:text-xl leading-snug mt-1.5 md:mt-2 drop-shadow">
          ❤️ Eu te ajudo do zero, sem pressão e no seu ritmo.
        </p>
      </div>
    </div>
  );
};
