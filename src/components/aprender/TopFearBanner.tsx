export const TopFearBanner = () => {
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div
        className="border-y-2 py-3 md:py-4 px-4 text-center bg-blue-50 border-blue-300"
      >
        <div className="flex items-center justify-center gap-1.5 md:gap-3">
          <span className="text-xl md:text-2xl leading-none" aria-hidden="true">
            😰
          </span>
          <span
            className="font-black text-lg sm:text-xl md:text-2xl text-blue-900 uppercase tracking-tight whitespace-nowrap"
            style={{ fontFamily: '"Montserrat", sans-serif', fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            VOCÊ TEM MEDO DO COMPUTADOR?
          </span>
        </div>
        <p
          className="mt-1 font-bold text-sm sm:text-base md:text-lg text-green-600"
        >
          Não se preocupe... Eu te ensino do zero!
        </p>
      </div>
    </div>
  );
};
