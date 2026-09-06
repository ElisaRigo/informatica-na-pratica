import logoImage from "@/assets/logo-blue.png";
import { Globe, Headphones } from "lucide-react";

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
        <h1 className="text-foreground mt-1 tracking-tight leading-tight px-2">
          <span className="block text-primary font-extrabold text-2xl md:text-3xl lg:text-4xl whitespace-nowrap">
            Curso de Informática
          </span>
          <span className="inline-flex items-center justify-center gap-2 flex-wrap text-foreground/90 font-medium text-sm md:text-base lg:text-lg mt-1">
            <span className="inline-flex items-center gap-1">
              <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
              online
            </span>
            <span className="text-foreground/60">—</span>
            <span className="inline-flex items-center gap-1">
              <Headphones className="w-4 h-4 shrink-0" aria-hidden="true" />
              com suporte
            </span>
          </span>
        </h1>
      </div>
    </header>
  );
};
