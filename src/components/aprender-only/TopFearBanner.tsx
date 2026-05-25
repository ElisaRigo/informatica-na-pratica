export const TopFearBanner = () => {
  const item = (
    <span className="inline-flex items-center gap-2 text-white text-sm md:text-base font-black mx-6 uppercase tracking-wide whitespace-nowrap">
      😰 Você sente dificuldade com o computador?
    </span>
  );
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="bg-gradient-to-r from-destructive via-destructive/90 to-destructive border-y border-destructive/60 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-2.5 md:py-3" style={{ animationDuration: '30s' }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
