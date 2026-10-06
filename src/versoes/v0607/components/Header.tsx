import logoImage from "@/versoes/v0607/assets/logo-blue.png";

export const Header = () => {
  return (
    <header className="bg-background border-b border-border py-3 md:py-4">
      <div className="container mx-auto px-4 text-center">
        <div className="inline-block mb-1">
          <img
            src={logoImage}
            alt="Informática na Prática"
            className="w-20 md:w-24 lg:w-28 mx-auto"
            width="112"
            height="112"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <h1 className="text-base md:text-xl lg:text-2xl text-foreground mt-1 tracking-tight leading-tight px-2">
          <span className="text-primary font-bold">Informática do zero:</span> simples, prático e para todos
        </h1>
      </div>
    </header>
  );
};
