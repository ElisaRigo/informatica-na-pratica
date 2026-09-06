import { useState } from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Infinity as InfinityIcon,
  Award,
  MonitorSmartphone,
  HeartHandshake,
  Clock,
  Play,
  GraduationCap,
  MessageCircle,
  Star,
  MousePointerClick,
  FileText,
  Mail,
  FolderOpen,
  Globe,
  Gift,
} from "lucide-react";
import { openHotmartCheckout } from "@/lib/checkoutTracking";
import heroVideoThumb from "@/assets/hero-video-cover.png";

const CTAButton = ({ children }: { children: React.ReactNode }) => (
  <button
    onClick={() => openHotmartCheckout()}
    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb857] text-white font-black text-xl md:text-2xl px-8 md:px-12 py-5 rounded-xl shadow-lg hover:scale-[1.02] transition-all"
  >
    {children}
  </button>
);

const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start gap-3">
    <CheckCircle2 className="w-7 h-7 text-[#25D366] flex-shrink-0 mt-0.5" />
    <p className="text-lg md:text-xl text-slate-700 font-medium leading-snug">{children}</p>
  </div>
);

const Adulto = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDF8F0] text-slate-800">
      {/* Faixa topo */}
      <div className="bg-[#1E40AF] text-white text-center py-2.5 px-3">
        <span className="inline-flex items-center justify-center gap-2 w-full font-bold text-base md:text-lg whitespace-nowrap">
          💻 Nunca é tarde para aprender informática!
        </span>
      </div>

      {/* HERO */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-flex items-center justify-center gap-2 w-full bg-[#1E40AF]/10 border-2 border-[#1E40AF]/30 rounded-xl px-4 py-2 mb-4">
            <GraduationCap className="w-6 h-6 md:w-7 md:h-7 text-[#1E40AF]" />
            <span className="font-black text-base md:text-xl text-[#1E40AF]">
              Curso 100% Online • Feito para Adultos
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4 text-slate-900">
            Aprenda a usar o computador{" "}
            <span className="text-[#1E40AF]">sem vergonha, sem pressa</span> e sem
            depender de ninguém
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-5 leading-relaxed">
            Aulas calmas, passo a passo, pensadas para quem não cresceu com
            tecnologia. Você vai se surpreender com o que é capaz de fazer.
          </p>

          {/* Vídeo */}
          <div className="max-w-3xl mx-auto mb-5">
            <div className="w-full aspect-video rounded-2xl shadow-2xl overflow-hidden relative border-2 border-[#1E40AF]/20">
              {!isVideoLoaded ? (
                <div
                  className="relative w-full h-full cursor-pointer group"
                  onClick={() => setIsVideoLoaded(true)}
                >
                  <img
                    src={heroVideoThumb}
                    alt="Prévia do curso de informática para adultos"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/60 shadow-xl border-2 border-[#1E40AF]/40 flex items-center justify-center transition-all group-hover:scale-110">
                      <Play className="w-9 h-9 md:w-11 md:h-11 text-[#1E40AF] fill-[#1E40AF] ml-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/0kFjFZX5c9I?rel=0&modestbranding=1&controls=1&iv_load_policy=3&fs=1&autoplay=1"
                  title="Apresentação do curso"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          <p className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
            Em poucas aulas, você vai criar documentos, enviar e-mails e navegar
            na internet com segurança.
          </p>

          <CTAButton>Quero aprender no meu ritmo!</CTAButton>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-4">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-2 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-[#1E40AF]" />
              <span className="font-semibold text-sm md:text-base">Garantia de 7 dias</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-2 rounded-lg">
              <InfinityIcon className="w-5 h-5 text-[#1E40AF]" />
              <span className="font-semibold text-sm md:text-base">Acesso Vitalício</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-[#1E40AF]" />
              <span className="font-semibold text-sm md:text-base">No seu ritmo</span>
            </div>
          </div>
        </div>
      </section>

      {/* IDENTIFICAÇÃO */}
      <section className="py-6 md:py-10 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-6 text-slate-900">
            Você se reconhece <span className="text-[#1E40AF]">aqui?</span>
          </h2>
          <div className="space-y-4 mb-6">
            <CheckItem>
              Já precisou pedir ajuda ao filho ou ao neto para fazer algo simples no computador
            </CheckItem>
            <CheckItem>
              Tem medo de clicar em algo errado e "estragar tudo"
            </CheckItem>
            <CheckItem>
              Sente que o mundo mudou rápido demais e ficou para trás
            </CheckItem>
            <CheckItem>
              Perdeu uma oportunidade por não saber usar o computador
            </CheckItem>
          </div>
          <div className="bg-[#1E40AF]/5 border-2 border-[#1E40AF]/20 rounded-2xl p-6 text-center">
            <p className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed">
              Se você disse "sim" para pelo menos uma dessas situações,{" "}
              <span className="text-[#1E40AF]">este curso foi feito exatamente para você.</span>
            </p>
          </div>
        </div>
      </section>

      {/* O QUE VAI APRENDER */}
      <section className="py-6 md:py-10">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-slate-900">
            O que você vai <span className="text-[#1E40AF]">conseguir fazer</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 text-center mb-6">
            Habilidades reais, para o dia a dia e para o trabalho.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: MousePointerClick, text: "Usar o mouse e o teclado sem dificuldade" },
              { icon: FolderOpen, text: "Organizar pastas e encontrar seus arquivos" },
              { icon: FileText, text: "Criar documentos no Word e planilhas no Excel" },
              { icon: Mail, text: "Enviar e receber e-mails com anexos" },
              { icon: Globe, text: "Navegar na internet com segurança" },
              { icon: MonitorSmartphone, text: "Resolver tarefas do dia a dia sem pedir ajuda" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-white border-2 border-slate-200 rounded-2xl p-5"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1E40AF]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-[#1E40AF]" />
                </div>
                <p className="text-lg md:text-xl font-semibold text-slate-800 leading-snug">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUE É DIFERENTE */}
      <section className="py-6 md:py-10 bg-[#1E40AF]">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-white">
            Por que este curso funciona para adultos?
          </h2>
          <div className="grid gap-4 text-left">
            {[
              {
                icon: HeartHandshake,
                title: "Linguagem simples",
                text: "Nada de termos técnicos complicados. A professora explica como se estivesse ao seu lado.",
              },
              {
                icon: Clock,
                title: "No seu ritmo",
                text: "Assista, pause e repita quantas vezes quiser. Sem pressa e sem cobrança.",
              },
              {
                icon: MessageCircle,
                title: "Suporte de verdade",
                text: "Ficou com dúvida? Você pode perguntar direto para a professora no WhatsApp.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white/10 border border-white/20 rounded-2xl p-5"
              >
                <item.icon className="w-8 h-8 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-1">{item.title}</h3>
                  <p className="text-lg text-blue-100 leading-snug">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL COMPACTA */}
      <section className="py-6 md:py-10 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-6 text-slate-900">
            Quem começou do zero, <span className="text-[#1E40AF]">aprovou</span>
          </h2>
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6">
            <div className="bg-[#FDF8F0] border border-slate-200 rounded-2xl p-4 md:p-6">
              <p className="text-2xl md:text-4xl font-black text-[#1E40AF]">+15.000</p>
              <p className="text-sm md:text-base text-slate-600 font-semibold">alunos</p>
            </div>
            <div className="bg-[#FDF8F0] border border-slate-200 rounded-2xl p-4 md:p-6">
              <p className="text-2xl md:text-4xl font-black text-[#1E40AF]">98%</p>
              <p className="text-sm md:text-base text-slate-600 font-semibold">satisfeitos</p>
            </div>
            <div className="bg-[#FDF8F0] border border-slate-200 rounded-2xl p-4 md:p-6">
              <p className="text-2xl md:text-4xl font-black text-[#1E40AF] flex items-center justify-center gap-1">
                4.9 <Star className="w-5 h-5 md:w-7 md:h-7 fill-amber-400 text-amber-400" />
              </p>
              <p className="text-sm md:text-base text-slate-600 font-semibold">avaliação</p>
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section className="py-6 md:py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white border-4 border-[#25D366] rounded-3xl p-6 md:p-10 text-center shadow-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 text-amber-800 px-4 py-2 rounded-full font-bold text-sm md:text-base mb-4">
              <Gift className="w-5 h-5" />
              Hoje você leva 4 bônus exclusivos
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
              Comece hoje por menos de{" "}
              <span className="text-[#1E40AF]">R$ 1 por dia</span>
            </h2>

            <p className="text-lg text-slate-500 line-through mb-1">De R$ 497,00</p>
            <p className="text-5xl md:text-6xl font-black text-slate-900 mb-1">
              R$ 297<span className="text-2xl">,00</span>
            </p>
            <p className="text-xl md:text-2xl font-bold text-[#1E40AF] mb-5">
              ou em até 12x de R$ 30,72
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                <InfinityIcon className="w-5 h-5 text-[#1E40AF]" />
                <span className="font-bold text-sm md:text-base">Acesso Vitalício</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg">
                <Award className="w-5 h-5 text-[#1E40AF]" />
                <span className="font-bold text-sm md:text-base">Certificado incluso</span>
              </div>
            </div>

            <CTAButton>Sim, quero começar agora!</CTAButton>

            <div className="flex items-center justify-center gap-2 mt-4 text-slate-600">
              <ShieldCheck className="w-5 h-5 text-[#25D366]" />
              <p className="text-base md:text-lg font-semibold">
                Risco zero: garantia de 7 dias
              </p>
            </div>
          </div>

          {/* Garantia reforço */}
          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5 text-center">
            <p className="text-lg md:text-xl text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Ainda em dúvida?</strong> Teste o curso por
              7 dias. Se não for para você, devolvemos 100% do valor. Sem perguntas, sem
              burocracia.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 bg-slate-100 text-center">
        <p className="text-sm text-slate-500">
          Informática na Prática LTDA •{" "}
          <a href="/termos-de-uso" className="underline">
            Termos de Uso
          </a>{" "}
          •{" "}
          <a href="/politica-de-privacidade" className="underline">
            Privacidade
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Adulto;
