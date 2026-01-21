import { Award, Heart, Users, GraduationCap } from "lucide-react";
import elisaPhoto from "@/assets/elisa-photo.jpg";

export const InstructorSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={elisaPhoto}
                  alt="Professora Elisa"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                
                {/* Badge overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                        <GraduationCap className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="font-black text-foreground text-lg">Professora Elisa</p>
                        <p className="text-primary text-sm font-medium">+20 anos de experiência</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute -right-4 top-1/4 bg-white rounded-xl shadow-xl p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-black text-foreground">15.000+</p>
                    <p className="text-sm text-muted-foreground">Alunos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                👩‍🏫 Sua Instrutora
              </span>

              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6">
                Prazer, eu sou a{" "}
                <span className="text-primary">Professora Elisa</span>
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                  Há mais de <strong className="text-foreground">20 anos</strong> ensino informática para pessoas 
                  que, assim como você, achavam que era impossível aprender.
                </p>
                <p>
                  Já ajudei milhares de alunos a superarem o medo do computador e 
                  conquistarem <strong className="text-foreground">independência digital</strong>. Muitos conseguiram 
                  emprego, promoção e até abriram o próprio negócio.
                </p>
                <p>
                  Minha missão é simples: <strong className="text-foreground">provar que você é capaz</strong>. 
                  Não importa sua idade ou experiência. Se você chegou até aqui, 
                  já deu o primeiro passo.
                </p>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Award, number: "20+", label: "Anos ensinando" },
                  { icon: Users, number: "15.000+", label: "Alunos formados" },
                  { icon: Heart, number: "98%", label: "Satisfação" },
                  { icon: GraduationCap, number: "90+", label: "Aulas práticas" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl p-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl font-black text-foreground">{stat.number}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
