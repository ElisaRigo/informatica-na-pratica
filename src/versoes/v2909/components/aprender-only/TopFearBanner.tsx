import { Monitor } from 'lucide-react';

export const TopFearBanner = () => {
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div className="bg-primary/50 py-3.5 md:py-4 px-4 border-2 border-primary">
        <div className="flex items-center justify-center text-center gap-2">
          <Monitor className="shrink-0 text-primary-foreground hidden md:inline-block" size={24} />
          <span className="font-bold leading-tight text-primary-foreground text-base sm:text-xl md:text-2xl whitespace-nowrap">
            Aprenda <span className="underline decoration-2 underline-offset-4">Do zero</span>, com acesso vitalício
          </span>
        </div>
      </div>
    </div>
  );
};
