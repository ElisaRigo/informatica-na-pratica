import { X } from "lucide-react";

export const NotForYou = () => {
  return (
    <section className="py-16 bg-destructive/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            ⚠️ Este curso NÃO é para você se...
          </h2>
          <p className="text-center text-muted-foreground mb-10 text-lg">
            Seja honesto consigo mesmo antes de se inscrever:
          </p>
          
          <div className="bg-card border-2 border-destructive/30 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex gap-4 items-start">
              <X className="w-8 h-8 text-destructive flex-shrink-0 mt-1" />
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Este curso não é pra quem procura <strong className="text-foreground">fórmulas mágicas</strong> ou quer resultado sem se dedicar. É preciso praticar e aplicar o que você aprende.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
