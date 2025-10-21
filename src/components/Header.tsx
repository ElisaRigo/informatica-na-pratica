import logoImage from "@/assets/logo-blue.png";

export const Header = () => {
  return (
    <header className="bg-panel border-b border-line py-3 md:py-4">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block">
          <img
            src={logoImage}
            alt="Informática na Prática"
            className="w-16 md:w-20 lg:w-24 mx-auto"
            width="96"
            height="96"
          />
        </div>
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-primary mt-3 tracking-tight">
          Curso Completo de <span className="font-bold">Informática</span> do Zero ao <span className="font-bold">Profissional</span>
        </h1>
      </div>
    </header>
  );
};
