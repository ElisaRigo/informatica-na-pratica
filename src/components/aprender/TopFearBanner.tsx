export const TopFearBanner = () => {
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="bg-success/15 border-y border-success/50 py-2.5 md:py-3 px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-center">
          <span className="font-black text-base md:text-lg text-white uppercase tracking-wide">
            😰 Você tem medo do computador?
          </span>
          <span className="hidden sm:inline text-success/60 text-lg">•</span>
          <span className="font-bold text-base md:text-lg text-success">
            Não se preocupe… Você vai aprender comigo!
          </span>
        </div>
      </div>
    </div>
  );
};
