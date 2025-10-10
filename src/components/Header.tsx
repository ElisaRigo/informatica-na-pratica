import logoImage from "@/assets/logo-new.png";

export const Header = () => {
  return (
    <header className="bg-panel border-b border-line py-4 md:py-6">
      <div className="container mx-auto px-4 text-center">
        <img
          src={logoImage}
          alt="Informática na Prática"
          className="w-28 md:w-32 lg:w-36 mx-auto"
        />
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gradient mt-3 tracking-tight">
          Curso de Informática Online
        </h1>
      </div>
    </header>
  );
};
