import { Award, Users, GraduationCap, Heart, ArrowRight } from "lucide-react";
import elisaPhoto from "@/assets/elisa-photo.jpg";

export const InstructorSection = () => {
  return (
    <section id="professora" className="py-8 md:py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img src={elisaPhoto} alt="Professora Elisa" className="w-full aspect-[4/5] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-black text-foreground">Professora Elisa</p>
                      <p className="text-primary text-xs font-medium">+20 anos de experiência</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="inline-block bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
                👩‍🏫 Sua Professora
              </span>

              <h2 className="text-xl md:text-2xl font-black text-foreground mb-4">
                Prazer, eu sou a <span className="text-primary">Professora Elisa</span>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Há mais de <strong className="text-foreground">20 anos</strong> ensino informática para pessoas que achavam impossível aprender. Já ajudei <strong className="text-foreground">+15.000 alunos</strong> a conquistarem independência digital.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                {[
                  { icon: Award, number: "20+", label: "Anos" },
                  { icon: Users, number: "15.000+", label: "Alunos" },
                  { icon: Heart, number: "98%", label: "Satisfação" },
                  { icon: GraduationCap, number: "90+", label: "Aulas" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2 bg-muted/50 rounded-lg p-2.5">
                    <stat.icon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-base font-black text-foreground leading-none">{stat.number}</p>
                      <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center">
                <button
                  onClick={() => (window as any).openCheckout?.()}
                  className="group inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  Sim, Quero Ser Aluno(a)
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[10px] mt-2 text-muted-foreground">
                  🔒 Pagamento seguro • Garantia de 7 dias • Acesso imediato
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
