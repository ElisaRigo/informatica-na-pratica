import { MessageCircleHeart, HeartHandshake, Clock, CheckCircle2 } from "lucide-react";

export const SupportBannerV2 = () => {
  return (
    <section className="py-10 md:py-16 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon with glow */}
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/40 rounded-full blur-2xl scale-150 animate-pulse" />
              <div className="relative bg-gradient-to-br from-primary/30 to-accent/30 p-5 rounded-full border-2 border-primary/40 shadow-2xl shadow-primary/20">
                <HeartHandshake className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              </div>
            </div>
          </div>

          {/* Main headline */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            Você <span className="text-primary">não está sozinho(a)</span> nessa jornada
          </h2>

          {/* Emotional subtitle */}
          <p className="text-base md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
            Sabemos que aprender algo novo pode parecer assustador. Por isso, você terá 
            <strong className="text-white"> suporte via WhatsApp</strong> para tirar 
            <strong className="text-white"> todas as suas dúvidas</strong>.
          </p>

          {/* Benefits cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-primary/30 rounded-2xl p-5 hover:border-primary/50 transition-all hover:scale-105">
              <MessageCircleHeart className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-white mb-1">Suporte Humanizado</h3>
              <p className="text-sm text-slate-400">Pessoas reais prontas para ajudar</p>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-primary/30 rounded-2xl p-5 hover:border-primary/50 transition-all hover:scale-105">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-white mb-1">Resposta Rápida</h3>
              <p className="text-sm text-slate-400">Sem esperar dias por uma resposta</p>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm border border-primary/30 rounded-2xl p-5 hover:border-primary/50 transition-all hover:scale-105">
              <CheckCircle2 className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-white mb-1">Dúvidas Ilimitadas</h3>
              <p className="text-sm text-slate-400">Pergunte quantas vezes precisar</p>
            </div>
          </div>

          {/* Highlight phrase */}
          <div className="inline-block bg-gradient-to-r from-primary/20 to-accent/20 border-2 border-primary/40 rounded-2xl px-6 py-4">
            <p className="text-lg md:text-xl font-bold text-white">
              💚 Aprender é mais fácil quando você tem <span className="text-primary">alguém do seu lado</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
