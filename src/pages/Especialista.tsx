import { useEffect, useState } from "react";
import {
  ShieldCheck, CheckCircle2, Star, Trophy, Rocket, Award, Zap,
  Sparkles, Users, Play, Lock, Gift, Target, TrendingUp, GraduationCap, ArrowRight
} from "lucide-react";
import { CountdownTimer } from "@/components/especialista/CountdownTimer";
import { CursoCheckoutDialog } from "@/components/curso/CursoCheckoutDialog";
import { useCheckoutDialog } from "@/hooks/useCheckoutDialog";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FAQV2 } from "@/components/curso/FAQV2";
import { AudioTestimonialsV2 } from "@/components/curso/AudioTestimonialsV2";
import elisaPhoto from "@/assets/elisa-photo.jpg";
import heroCover from "@/assets/hero-video-cover-home.jpg";

const CTA = ({ label = "QUERO ME TORNAR ESPECIALISTA" }: { label?: string }) => (
  <button
    onClick={() => (window as any).openCheckout?.()}
    className="group w-full max-w-xl inline-flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-black text-base md:text-xl px-6 py-4 md:py-5 rounded-2xl shadow-2xl shadow-success/40 hover:scale-[1.02] transition-all"
  >
    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
    <span>{label}</span>
    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
  </button>
);

const PriceBlock = () => (
  <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-5 md:p-6 max-w-xl mx-auto">
    <div className="flex items-center justify-center gap-2 mb-2">
      <span className="line-through text-white/60 text-lg">De R$ 497</span>
      <span className="bg-yellow-400 text-slate-900 font-black text-xs px-2 py-1 rounded">40% OFF</span>
    </div>
    <div className="text-center">
      <div className="text-white/80 text-sm">Por apenas</div>
      <div className="text-4xl md:text-5xl font-black text-white leading-tight">
        12x <span className="text-yellow-300">R$ 30,72</span>
      </div>
      <div className="text-white/90 text-base md:text-lg font-bold">ou R$ 297 à vista</div>
      <div className="text-yellow-300 text-sm font-bold mt-2 flex items-center justify-center gap-1.5">
        <Gift className="w-4 h-4" /> Hoje você leva 4 bônus exclusivos
      </div>
    </div>
  </div>
);

const Especialista = () => {
  const { isOpen, openCheckout, closeCheckout } = useCheckoutDialog();
  const [studentsCount] = useState(15000 + Math.floor(Math.random() * 300));

  useEffect(() => {
    (window as any).openCheckout = openCheckout;
    document.title = "Torne-se Especialista em Informática em 30 Dias | Informática na Prática";
  }, [openCheckout]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Barra topo com timer */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 py-2 px-3 sticky top-0 z-40">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center">
          <span className="text-xs md:text-sm font-bold text-white">🔥 OFERTA RELÂMPAGO — 40% OFF + 4 BÔNUS</span>
          <CountdownTimer />
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary via-blue-800 to-slate-900 py-8 md:py-14">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 rounded-full px-4 py-1.5 mb-4 font-bold text-xs md:text-sm">
            <Trophy className="w-4 h-4" /> MÉTODO EXCLUSIVO DA PROFESSORA ELISA
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-4">
            Torne-se um <span className="text-yellow-300">ESPECIALISTA</span> em Informática em apenas <span className="text-yellow-300">30 dias</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium mb-6 max-w-3xl mx-auto">
            Aprenda Word, Excel, Internet e E-mail com o método passo a passo que já transformou mais de <strong className="text-yellow-300">{studentsCount.toLocaleString("pt-BR")} alunos</strong> — mesmo quem nunca ligou um computador.
          </p>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-3xl mx-auto mb-6 aspect-video">
            <img src={heroCover} alt="Aula demonstrativa" className="absolute inset-0 w-full h-full object-cover" />
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition"
              aria-label="Ver aula"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-success/90 flex items-center justify-center shadow-2xl">
                <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
              </div>
            </button>
          </div>

          <div className="flex justify-center mb-6"><CTA /></div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5"><Lock className="w-4 h-4" /> Compra 100% segura</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> 7 dias de garantia</span>
            <span className="inline-flex items-center gap-1.5"><Zap className="w-4 h-4" /> Acesso imediato</span>
          </div>
        </div>
      </section>

      {/* PROMESSA / TRANSFORMAÇÃO */}
      <section className="py-10 md:py-14 bg-slate-900">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-8">
            Em <span className="text-primary">30 dias</span>, você vai:
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: Target, title: "Dominar o Windows", desc: "Organizar pastas, arquivos e pen drive sem depender de ninguém." },
              { icon: TrendingUp, title: "Criar planilhas no Excel", desc: "Fazer contas, controle de gastos e planilhas profissionais." },
              { icon: Award, title: "Escrever no Word", desc: "Currículos, cartas e documentos com aparência profissional." },
              { icon: Rocket, title: "Navegar com segurança", desc: "Internet, e-mail, Google e apps essenciais sem cair em golpes." },
              { icon: Users, title: "Recuperar sua autonomia", desc: "Nunca mais precisar pedir ajuda para tarefas simples do dia a dia." },
              { icon: GraduationCap, title: "Receber certificado", desc: "Comprove suas novas habilidades para o mercado de trabalho." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-primary transition">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFESSORA */}
      <section className="py-10 md:py-14 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-[220px_1fr] gap-6 items-center">
            <img src={elisaPhoto} alt="Professora Elisa" className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-primary mx-auto" />
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 text-primary rounded-full px-3 py-1 text-xs font-bold mb-2">
                <Star className="w-3 h-3 fill-primary" /> SUA PROFESSORA
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-3">Professora Elisa</h2>
              <p className="text-slate-300 mb-3">
                Especialista em ensinar informática do zero para quem tem medo do computador. Desenvolveu um método simples, com aulas curtas e linguagem clara — sem enrolação, sem termo técnico.
              </p>
              <p className="text-primary font-bold">
                +{studentsCount.toLocaleString("pt-BR")} alunos já aprenderam com esse método.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AudioTestimonialsV2 />

      {/* BÔNUS */}
      <section className="py-10 md:py-14 bg-slate-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 rounded-full px-4 py-1.5 mb-3 font-bold text-xs md:text-sm">
              <Gift className="w-4 h-4" /> BÔNUS EXCLUSIVOS DE HOJE
            </div>
            <h2 className="text-2xl md:text-4xl font-black">Matricule hoje e leve <span className="text-yellow-300">4 bônus</span> extras</h2>
            <p className="text-slate-300 mt-2">No valor de R$ 368 — inclusos no seu acesso</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: "Aulas de WhatsApp completo", value: "R$ 97" },
              { title: "Aulas de Segurança Digital", value: "R$ 87" },
              { title: "Aulas de Impressora e Scanner", value: "R$ 97" },
              { title: "Grupo de Suporte com a Professora", value: "R$ 87" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-4 bg-gradient-to-r from-yellow-500/10 to-transparent border border-yellow-500/30 rounded-xl p-4">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-yellow-300" />
                </div>
                <div className="flex-1">
                  <div className="font-bold">Bônus {i + 1}: {b.title}</div>
                  <div className="text-sm text-slate-400 line-through">De {b.value}</div>
                </div>
                <div className="bg-success text-white text-xs font-black px-2 py-1 rounded">GRÁTIS</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GARANTIA */}
      <section className="py-10 md:py-14 bg-slate-800">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-success/20 border-4 border-success mb-4">
            <ShieldCheck className="w-12 h-12 text-success" />
          </div>
          <h2 className="text-2xl md:text-4xl font-black mb-3">Garantia Incondicional de 7 dias</h2>
          <p className="text-lg text-slate-300">
            Teste o curso por 7 dias. Se não gostar, por qualquer motivo, devolvemos <strong className="text-success">100% do seu dinheiro</strong>. Sem perguntas, sem burocracia.
          </p>
        </div>
      </section>

      {/* OFERTA FINAL */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-primary via-blue-800 to-slate-900">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div className="mb-4 flex justify-center"><CountdownTimer /></div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Sua chance de virar <span className="text-yellow-300">especialista</span> começa hoje
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-6">
            Acesso vitalício, 4 bônus exclusivos, certificado e garantia de 7 dias.
          </p>
          <div className="mb-6"><PriceBlock /></div>
          <div className="flex justify-center mb-4"><CTA label="QUERO GARANTIR MINHA VAGA AGORA" /></div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-yellow-300" /> Acesso imediato</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-yellow-300" /> Certificado incluso</span>
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-yellow-300" /> Suporte da professora</span>
          </div>
        </div>
      </section>

      <FAQV2 />

      {/* CTA final compacto */}
      <section className="py-10 bg-slate-900 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-3"><Sparkles className="w-8 h-8 text-yellow-300" /></div>
          <h3 className="text-xl md:text-2xl font-black mb-4">Última chamada — a oferta expira em breve</h3>
          <div className="flex justify-center"><CTA /></div>
        </div>
      </section>

      {/* Sticky mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-slate-900/95 backdrop-blur border-t border-slate-700 p-3">
        <button
          onClick={() => (window as any).openCheckout?.()}
          className="w-full flex items-center justify-center gap-2 bg-success hover:bg-success/90 text-white font-black text-base py-4 rounded-xl shadow-lg"
        >
          <ShieldCheck className="w-5 h-5" /> QUERO ME TORNAR ESPECIALISTA
        </button>
      </div>

      <div className="h-20 md:h-0" />

      <CursoCheckoutDialog open={isOpen} onOpenChange={(o) => !o && closeCheckout()} />
      <WhatsAppButton />
    </div>
  );
};

export default Especialista;
