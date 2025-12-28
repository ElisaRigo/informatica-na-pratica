import logoImage from "@/assets/logo-blue.png";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border py-3 md:py-4">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block mb-3">
          <img
            src={logoImage}
            alt="Informática na Prática"
            className="w-14 md:w-16 lg:w-20 mx-auto"
            width="80"
            height="80"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <h1 className="text-base md:text-xl lg:text-2xl text-foreground mt-2 tracking-tight leading-tight px-2">
          Curso de <span className="text-primary font-bold">Informática Online</span> completo do zero ao <span className="text-primary font-bold">Profissional</span>
        </h1>
      </div>
    </header>
  );
};
