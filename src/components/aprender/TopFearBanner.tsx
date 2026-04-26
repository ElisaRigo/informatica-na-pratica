export const TopFearBanner = () => {
  const message = "🫣 Você tem medo do computador? • Fica tranquilo(a)… você vai aprender comigo";

  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="bg-success/15 border-y border-success/50 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-2 md:py-2.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-bold text-xs md:text-sm text-white uppercase tracking-wide mx-8"
            >
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
