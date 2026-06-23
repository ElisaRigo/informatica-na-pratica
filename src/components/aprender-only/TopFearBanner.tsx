import { Monitor } from 'lucide-react';

export const TopFearBanner = () => {
  return (
    <div className="my-5 md:my-8 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/30 via-primary/20 to-primary/30 border-y-2 border-primary py-5 md:py-7 px-4 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.6)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.25),transparent_70%)] pointer-events-none" />
        <div className="relative flex items-center justify-center text-center gap-3">
          <Monitor className="shrink-0 text-primary hidden md:inline-block" size={32} />
          <span className="font-extrabold leading-tight tracking-tight text-white text-2xl md:text-4xl">
            <span className="block text-primary uppercase text-3xl md:text-5xl drop-shadow-[0_2px_8px_hsl(var(--primary)/0.5)]">
              Do zero
            </span>
            <span className="block mt-1">
              Pra quem <span className="text-primary font-black">não sabe nada</span><br className="md:hidden" /> do computador
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
