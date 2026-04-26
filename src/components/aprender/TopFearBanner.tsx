export const TopFearBanner = () => {
  const message = "🫣 VOCÊ TEM MEDO DO COMPUTADOR? — EU TE AJUDO DO ZERO, SEM PRESSÃO E NO SEU RITMO";

  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="bg-success border-y-2 border-success/60 overflow-hidden shadow-lg">
        <div className="flex animate-marquee whitespace-nowrap py-2 md:py-2.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-white font-bold text-sm md:text-base uppercase tracking-wide mx-8"
            >
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
