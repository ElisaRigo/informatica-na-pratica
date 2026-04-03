import { Shield, Award, Users, Infinity, Headphones, Play, Check, ArrowRight, Clock } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo-blue.png";
import heroVideoThumb from "@/assets/hero-video-cover-curso.jpg";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { FAQV2 } from "@/components/curso/FAQV2";
import { FooterV2 } from "@/components/curso/FooterV2";

const CursoSimples = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  (window as any).openCheckout = () => {
    if ((window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', {
        currency: 'BRL', value: 297.00,
        items: [{ item_id: 'curso-informatica', item_name: 'Curso Informática na Prática', price: 297.00, quantity: 1 }]
      });
    }
    if ((window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        value: 297.00, currency: 'BRL', content_name: 'Curso Informática na Prática', content_ids: ['curso-informatica'], num_items: 1
      });
    }
    window.open('https://pay.hotmart.com/L103057645P?bid=1751676498498&paymentMethod=credit_card', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* ===== HERO: Tudo na primeira dobra ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/8 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-6 md:py-10 relative z-10">
          {/* Logo pequena */}
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 border border-white/20">
              <img src={logo} alt="Informática na Prática" className="h-10 md:h-14" />
            </div>
          </div>

          {/* Grid: Vídeo + Oferta lado a lado no desktop */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto items-center">
            {/* Coluna esquerda: Copy + Vídeo */}
            <div>
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3">
                Aprenda a usar o computador em{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  30 dias
                </span>
                {" "}— mesmo que nunca tenha ligado um.
              </h1>

              <p className="text-base md:text-lg text-slate-300 mb-4">
                O curso mais completo para quem quer sair do zero e usar o computador com confiança no trabalho e no dia a dia.
              </p>

              {/* Mini social proof */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold">
                      {["M","J","A","R"][i-1]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="text-warning text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs">+15.000 alunos satisfeitos</p>
                </div>
              </div>

              {/* Vídeo */}
              <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-primary/20 border border-white/10">
                {!isPlaying ? (
                  <div 
                    className="relative aspect-video cursor-pointer group"
                    onClick={() => setIsPlaying(true)}
                  >
                    <img 
                      src={heroVideoThumb}
                      alt="Prévia do curso"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/60 shadow-xl flex items-center justify-center group-hover:scale-110 transition-all">
                        <Play className="w-6 h-6 md:w-7 md:h-7 text-primary fill-primary ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-destructive text-white px-3 py-1 rounded-full font-bold text-xs animate-pulse">
                      ▶ ASSISTA
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&autoplay=1&vq=hd1080"
                      title="Veja como é fácil aprender"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Coluna direita: Card de oferta */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
              {/* Banner urgência */}
              <div className="bg-gradient-to-r from-destructive to-destructive/80 py-3 px-4 text-center">
                <p className="text-white font-black text-sm md:text-base animate-pulse">
                  🔥 OFERTA ESPECIAL — 40% DE DESCONTO
                </p>
              </div>

              <div className="p-5 md:p-6">
                {/* O que inclui - compacto */}
                <h3 className="text-foreground font-bold text-base mb-3">Tudo que você recebe:</h3>
                <ul className="space-y-2 mb-4">
                  {[
                    "+90 videoaulas passo a passo",
                    "Windows, Word, Excel, PowerPoint, Internet",
                    "Módulo de Digitação Profissional",
                    "Certificado de conclusão",
                    "Suporte direto com a professora",
                    "Acesso vitalício + atualizações",
                    "4 Bônus exclusivos inclusos",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Preço */}
                <div className="text-center py-4 border-t border-b border-slate-100 mb-4">
                  <p className="text-muted-foreground text-sm mb-1">
                    De <span className="line-through font-bold">R$ 497,00</span> por apenas
                  </p>
                  <p className="text-4xl md:text-5xl font-black text-accent mb-1">
                    R$ 297<span className="text-lg">,00</span>
                  </p>
                  <p className="text-foreground font-semibold text-sm">
                    ou <span className="text-primary font-bold">12x de R$ 30,72</span>
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => (window as any).openCheckout?.()}
                  className="group w-full bg-gradient-to-r from-accent to-success text-white font-black text-base md:text-lg py-4 rounded-xl shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-[1.02] transition-all relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <span className="relative flex items-center justify-center gap-2">
                    QUERO COMEÇAR AGORA
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                {/* Garantia + Segurança */}
                <div className="mt-4 bg-accent/10 border border-accent/20 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-accent" />
                    <span className="text-accent font-bold text-sm">Garantia de 7 dias</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Não gostou? Devolvemos 100% do seu dinheiro. Sem perguntas.
                  </p>
                </div>

                <p className="text-muted-foreground text-[10px] mt-3 text-center">
                  🔒 Pagamento seguro • Acesso imediato após a compra
                </p>
              </div>
            </div>
          </div>

          {/* Trust badges abaixo */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 max-w-4xl mx-auto mt-6">
            {[
              { icon: Users, label: "+15.000 Alunos" },
              { icon: Award, label: "Certificado Incluso" },
              { icon: Infinity, label: "Acesso Vitalício" },
              { icon: Headphones, label: "Suporte Direto" },
              { icon: Clock, label: "+20 Anos Ensinando" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2 py-2">
                <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-white text-xs font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO 2: Depoimentos rápidos ===== */}
      <section className="py-10 md:py-14 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-foreground text-center mb-8">
            Veja o que nossos alunos dizem:
          </h2>

          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            {[
              { name: "Maria, 68 anos", text: "Aprendi a mexer no computador. Deus abençoe! 🙏 Hoje faço tudo sozinha." },
              { name: "José, 55 anos", text: "Consegui um emprego melhor depois que aprendi informática. Valeu cada centavo!" },
              { name: "Ana, 42 anos", text: "Tinha vergonha de pedir ajuda. Agora uso Excel no trabalho todos os dias." },
            ].map((t, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(s => <span key={s} className="text-warning text-sm">★</span>)}
                </div>
                <p className="text-foreground text-sm mb-3 italic">"{t.text}"</p>
                <p className="text-primary font-bold text-sm">{t.name}</p>
              </div>
            ))}
          </div>

          {/* CTA secundário */}
          <div className="text-center">
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="group inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-black text-base md:text-lg px-8 py-4 rounded-xl shadow-lg shadow-accent/30 hover:scale-[1.02] transition-all"
            >
              QUERO GARANTIR MINHA VAGA
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-muted-foreground text-xs mt-3">
              🔒 Garantia de 7 dias • Acesso imediato • Pagamento seguro
            </p>
          </div>
        </div>
      </section>

      {/* ===== FAQ compacto ===== */}
      <FAQV2 />

      {/* ===== CTA Final ===== */}
      <section className="py-12 md:py-16 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
            Daqui a 30 dias você vai{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              agradecer
            </span>{" "}
            por ter começado hoje
          </h2>
          <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto mb-6">
            A única diferença entre quem domina o computador e quem não domina é uma decisão.
          </p>

          <div className="inline-flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6">
            <p className="text-slate-400 text-sm mb-1">Investimento único</p>
            <p className="text-4xl font-black text-white mb-1">R$ 297<span className="text-lg">,00</span></p>
            <p className="text-accent font-bold">ou 12x de R$ 30,72</p>
          </div>

          <div>
            <button
              onClick={() => (window as any).openCheckout?.()}
              className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-success text-white font-black text-lg md:text-xl px-10 py-5 rounded-full shadow-2xl shadow-accent/40 hover:scale-105 transition-all relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-full" />
              <span className="relative flex items-center gap-2">
                SIM, QUERO COMEÇAR AGORA
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-slate-400">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4 text-accent" /> Garantia 7 dias</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-primary" /> Acesso imediato</span>
          </div>
        </div>
      </section>

      <FooterV2 />
      <WhatsAppButton />
    </div>
  );
};

export default CursoSimples;
