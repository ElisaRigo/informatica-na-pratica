import logoImage from "@/assets/logo-blue.png";

export const Header = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 py-3 md:py-4">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block bg-white/95 backdrop-blur rounded-xl p-2 mb-3">
          <img
            src={logoImage}
            alt="Informática na Prática"
            className="w-14 md:w-16 lg:w-20 mx-auto"
            width="80"
            height="80"
          />
        </div>
        <h1 className="text-base md:text-xl lg:text-2xl text-white mt-2 tracking-tight leading-tight px-2">
          Curso Completo de <span className="font-black">Informática</span> do Zero ao <span className="font-black">Profissional</span>
        </h1>
      </div>
    </header>
  );
};
