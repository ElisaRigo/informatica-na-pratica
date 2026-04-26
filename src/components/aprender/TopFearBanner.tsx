export const TopFearBanner = () => {
  return (
    <div className="flex justify-center my-4 md:my-6 px-4">
      <div className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-3 bg-success/15 border border-success/50 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-center">
        <span className="font-bold text-xs md:text-sm text-white uppercase tracking-wide">
          🫣 Você tem medo do computador?
        </span>
        <span className="hidden sm:inline text-success/60">•</span>
        <span className="font-bold text-xs md:text-sm text-success">
          Fica tranquilo(a)… você vai aprender comigo
        </span>
      </div>
    </div>
  );
};
