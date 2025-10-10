import { X } from "lucide-react";

export const NotForYou = () => {
  return (
    <section className="py-16 bg-destructive/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
            ⚠️ Este curso NÃO é para você se...
          </h2>
          <p className="text-center text-muted-foreground mb-10 text-lg">
            Seja honesto consigo mesmo antes de se inscrever:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border-2 border-destructive/30 rounded-2xl p-6 flex gap-4">
              <X className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Procura fórmulas mágicas</h3>
                <p className="text-muted-foreground">
                  Se você quer aprender sem dedicar tempo para praticar, este curso não é para você.
                </p>
              </div>
            </div>

            <div className="bg-card border-2 border-destructive/30 rounded-2xl p-6 flex gap-4">
              <X className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Não tem interesse em crescer</h3>
                <p className="text-muted-foreground">
                  Se você está satisfeito com sua situação atual e não busca novas oportunidades.
                </p>
              </div>
            </div>

            <div className="bg-card border-2 border-destructive/30 rounded-2xl p-6 flex gap-4">
              <X className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Não tem computador</h3>
                <p className="text-muted-foreground">
                  Você precisa de um computador para praticar. Apenas assistir não é suficiente.
                </p>
              </div>
            </div>

            <div className="bg-card border-2 border-destructive/30 rounded-2xl p-6 flex gap-4">
              <X className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Quer resultados instantâneos</h3>
                <p className="text-muted-foreground">
                  Aprendizado leva tempo. Se não está disposto a se dedicar, não se inscreva.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
