import logoImage from "@/assets/logo-new.png";

export const Header = () => {
  return (
    <header className="bg-panel border-b border-line py-4 md:py-6">
      <div className="container mx-auto px-4 text-center">
        <img
          src={logoImage}
          alt="Informática na Prática"
          className="w-24 md:w-32 mx-auto"
        />
      </div>
    </header>
  );
};
