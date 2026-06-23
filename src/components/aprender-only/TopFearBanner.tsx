import { Monitor } from 'lucide-react';

export const TopFearBanner = () => {
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="bg-primary/80 py-3.5 md:py-4 px-4">
        <div className="flex items-center justify-center text-center gap-2.5">
          <Monitor className="shrink-0 text-primary-foreground hidden md:inline-block" size={24} />
          <span className="font-bold leading-tight text-primary-foreground text-xl md:text-2xl">
            <span className="underline decoration-2 underline-offset-4">Do zero</span>, pra quem<br className="md:hidden" /> não sabe nada do computador
          </span>
        </div>
      </div>
    </div>
  );
};
