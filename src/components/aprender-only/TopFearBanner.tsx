import { Sparkles } from 'lucide-react';

export const TopFearBanner = () => {
  return (
    <div className="my-4 md:my-6 -mx-4 md:-mx-8 lg:-mx-16">
      <div
        className="relative overflow-hidden border-y-2 border-primary bg-slate-950 py-4 md:py-5 px-4 shadow-[0_0_30px_-5px_hsl(var(--primary)/0.55)]"
      >
        {/* Diagonal stripes pattern */}
        <div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, hsl(var(--primary)) 0, hsl(var(--primary)) 12px, transparent 12px, transparent 24px)',
          }}
        />
        {/* Soft radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.25),transparent_65%)] pointer-events-none" />

        <div className="relative flex items-center justify-center text-center gap-2.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[10px] md:text-xs font-black uppercase tracking-widest text-primary-foreground shadow-md shrink-0">
            <Sparkles size={12} className="shrink-0" />
            Novo
          </span>
          <span className="font-bold leading-tight text-white text-lg md:text-2xl">
            Do{' '}
            <span className="font-black uppercase tracking-wide text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)]">
              Zero
            </span>
            , pra quem<br className="md:hidden" /> não sabe nada do computador
          </span>
        </div>
      </div>
    </div>
  );
};
