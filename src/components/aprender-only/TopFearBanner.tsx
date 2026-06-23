import { Monitor, Headphones, Shield } from 'lucide-react';

export const TopFearBanner = () => {
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="bg-primary/15 border-y border-primary/50 py-2.5 md:py-3 px-4">
        <div className="flex items-center justify-center text-center gap-2">
          <Monitor className="shrink-0 text-primary hidden md:inline-block" size={20} />
          <span className="font-medium text-base md:text-lg text-white">
            Pra você <span className="text-primary font-bold">que não sabe nada</span><br className="md:hidden" /> do computador
          </span>
        </div>
      </div>
    </div>
  );
};
