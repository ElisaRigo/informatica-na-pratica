export const InternalLinks = () => {
  return (
    <section className="py-8 md:py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-center text-lg md:text-xl font-semibold mb-6">
            Explore mais sobre o curso:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#sobre" 
              className="inline-flex items-center gap-2 bg-card hover:bg-primary/10 border-2 border-primary/30 hover:border-primary px-6 py-3 rounded-xl transition-all hover:scale-105 font-semibold"
            >
              👩‍🏫 <span>Conhecer a Professora Elisa</span>
            </a>
            <a 
              href="#conteudo" 
              className="inline-flex items-center gap-2 bg-card hover:bg-primary/10 border-2 border-primary/30 hover:border-primary px-6 py-3 rounded-xl transition-all hover:scale-105 font-semibold"
            >
              📚 <span>Ver Conteúdo Completo</span>
            </a>
            <a 
              href="#depoimentos" 
              className="inline-flex items-center gap-2 bg-card hover:bg-primary/10 border-2 border-primary/30 hover:border-primary px-6 py-3 rounded-xl transition-all hover:scale-105 font-semibold"
            >
              ⭐ <span>Ler Depoimentos Reais</span>
            </a>
            <a 
              href="#bonus" 
              className="inline-flex items-center gap-2 bg-card hover:bg-primary/10 border-2 border-primary/30 hover:border-primary px-6 py-3 rounded-xl transition-all hover:scale-105 font-semibold"
            >
              🎁 <span>Ver Bônus Inclusos</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
