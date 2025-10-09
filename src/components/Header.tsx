import logoImage from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="bg-panel border-b border-line py-6">
      <div className="container mx-auto px-4 text-center">
        <img
          src={logoImage}
          alt="Informática na Prática"
          className="w-24 mx-auto"
        />
      </div>
    </header>
  );
};
