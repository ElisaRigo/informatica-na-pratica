import logoImage from "@/assets/logo-new.png";

export const Header = () => {
  return (
    <header className="bg-panel border-b border-line py-4 md:py-6">
      <div className="container mx-auto px-4 text-center">
        <img
          src={logoImage}
          alt="Informática na Prática"
          className="w-32 md:w-40 lg:w-44 mx-auto"
        />
        <h1 className="text-lg md:text-xl font-semibold text-foreground mt-2">
          Curso de Informática Online
        </h1>
      </div>
    </header>
  );
};
