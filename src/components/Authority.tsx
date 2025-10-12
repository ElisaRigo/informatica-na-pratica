import { Award, Users, Clock, Heart } from "lucide-react";
import elisaTeaching from "@/assets/elisa-teaching.jpg";

export const Authority = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">
            Quem é a professora Elisa?
          </h2>

          <div className="mb-12 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={elisaTeaching} 
              alt="Professora Elisa ensinando informática em sua sala de aula"
              className="w-full h-auto object-cover"
              width="1200"
              height="675"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black text-primary mb-2">+20</div>
                <div className="text-sm text-muted-foreground">Anos de experiência</div>
              </div>
              <div className="bg-card border-2 border-accent/30 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black text-accent mb-2">+15k</div>
                <div className="text-sm text-muted-foreground">Alunos transformados</div>
              </div>
              <div className="bg-card border-2 border-primary/30 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Método didático</div>
              </div>
              <div className="bg-card border-2 border-accent/30 rounded-2xl p-6 text-center">
                <div className="text-4xl font-black text-accent mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Dedicação total</div>
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
              "Minha missão é mostrar que você também consegue aprender informática. Você não está mais sozinho(a) eu vou te ajudar nessa jornada!"
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
