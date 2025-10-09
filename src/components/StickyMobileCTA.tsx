import { Button } from "@/components/ui/button";

export const StickyMobileCTA = () => {
  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 md:hidden">
      <div className="bg-panel border-2 border-line rounded-2xl p-4 flex items-center justify-between gap-4 shadow-2xl">
        <div>
          <div className="font-black text-xl">R$ 297</div>
          <div className="text-xs text-muted-foreground">Condição por tempo limitado</div>
        </div>
        <Button 
          className="font-extrabold px-6 py-5 rounded-xl"
          asChild
        >
          <a href="#preco">Garantir agora</a>
        </Button>
      </div>
    </div>
  );
};
