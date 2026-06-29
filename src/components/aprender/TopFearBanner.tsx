export const TopFearBanner = () => {
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div
        className="border-y py-3 md:py-4 px-4 text-center"
        style={{
          backgroundColor: "#152b22",
          borderColor: "#1f4d3a",
        }}
      >
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <span className="text-xl md:text-2xl" aria-hidden="true">
            😰
          </span>
          <span className="font-black text-sm sm:text-base md:text-xl text-white uppercase tracking-wide">
            VOCÊ TEM MEDO DO COMPUTADOR?
          </span>
        </div>
        <p
          className="mt-1 font-bold text-sm sm:text-base md:text-lg"
          style={{ color: "#4ade80" }}
        >
          Não se preocupe... Eu te ensino do zero!
        </p>
      </div>
    </div>
  );
};
