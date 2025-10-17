import logoImage from "@/assets/logo-blue.png";

export const Header = () => {
  return (
    <header className="bg-panel border-b border-line py-3 md:py-4">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-2xl p-3 md:p-4 shadow-lg">
          <img
            src={logoImage}
            alt="Informática na Prática"
            className="w-16 md:w-20 lg:w-24 mx-auto"
            width="96"
            height="96"
          />
        </div>
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gradient mt-2 tracking-tight">
          Curso de Informática Online
        </h1>
      </div>
    </header>
  );
};
