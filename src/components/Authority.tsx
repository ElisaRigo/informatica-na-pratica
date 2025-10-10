import { Award, Users, Clock, Heart } from "lucide-react";
import elisaPhoto from "@/assets/elisa-photo.jpg";

export const Authority = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Quem é a professora Elisa?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img 
                  src={elisaPhoto} 
                  alt="Professora Elisangela Neri Rigo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl">
                <div className="text-3xl font-black">+20</div>
                <div className="text-sm font-semibold">Anos ensinando</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Mais de 20 anos de experiência</h3>
                  <p className="text-muted-foreground">
                    Duas décadas ensinando informática e transformando vidas através da tecnologia.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">+15.000 alunos transformados</h3>
                  <p className="text-muted-foreground">
                    Milhares de pessoas que saíram do zero e hoje dominam a informática básica.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Método comprovado e didático</h3>
                  <p className="text-muted-foreground">
                    Ensino passo a passo, do zero absoluto até o domínio completo das ferramentas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Dedicação e suporte total</h3>
                  <p className="text-muted-foreground">
                    Comprometida com o sucesso de cada aluno, oferecendo suporte completo durante todo o curso.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-card border-2 border-primary/30 rounded-3xl p-8 text-center">
            <p className="text-lg md:text-xl italic text-muted-foreground mb-4">
              "Minha missão é fazer você dominar a informática básica de forma simples e definitiva. 
              Já ensinei milhares de pessoas que, como você, achavam impossível. E todas conseguiram!"
            </p>
            <p className="font-bold text-primary text-xl">
              — Professora Elisa
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
