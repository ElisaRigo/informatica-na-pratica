import logoImage from "@/assets/logo-blue.png";

export const Header = () => {
  return (
    <header className="bg-panel border-b border-primary/20 py-4 md:py-5">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block mb-3">
          <div className="relative">
            <img
              src={logoImage}
              alt="Informática na Prática"
              className="w-16 md:w-20 lg:w-24 mx-auto drop-shadow-lg"
              width="96"
              height="96"
              fetchPriority="high"
              decoding="async"
            />
            {/* Glow effect behind logo */}
            <div className="absolute inset-0 bg-primary/20 blur-xl -z-10 rounded-full scale-150" />
          </div>
        </div>
        <h1 className="text-lg md:text-xl lg:text-2xl text-foreground mt-2 tracking-tight leading-tight px-2 font-bold">
          Curso de <span className="text-gradient font-black">Informática Online</span> completo - Começando do <span className="text-accent font-black">Zero</span>
        </h1>
      </div>
    </header>
  );
};
