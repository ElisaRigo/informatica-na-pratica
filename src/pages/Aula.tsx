import { useState } from "react";
import { Play, Shield, Award, Headphones, Users, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-blue.png";

import freeClassThumb from "@/assets/aprenda-comigo-thumb.jpg";
import environmentThumb from "@/assets/environment-thumb.jpg";

const videos = [
  {
    title: "Assista essa aula e Veja como é Fácil Aprender!",
    subtitle: "Assista uma demonstração e sinta a didática simples e passo a passo",
    thumb: freeClassThumb,
    embedUrl: "https://www.youtube.com/embed/-sdVG1OtDks?rel=0&modestbranding=1&autoplay=1",
    badge: "🎓 AULA DEMO",
    badgeColor: "bg-gradient-to-r from-primary to-accent",
  },
  {
    title: "Uma Aula Real do Curso",
    subtitle: "Essa é uma das +90 aulas — veja a qualidade com seus próprios olhos",
    thumb: environmentThumb,
    embedUrl: "https://www.youtube.com/embed/g_F1-d7tdQ0?rel=0&modestbranding=1&autoplay=1",
    badge: "🎬 AULA REAL",
    badgeColor: "bg-gradient-to-r from-red-500 to-rose-600",
  },
];

const VideoCard = ({ video }: { video: typeof videos[0] }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-black text-white mb-1 text-center">
        {video.title}
      </h2>
      <p className="text-slate-400 text-sm md:text-base text-center mb-4">
        {video.subtitle}
      </p>

      <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-white/10">
        {!isPlaying ? (
          <div
            className="relative aspect-video cursor-pointer group"
            onClick={() => setIsPlaying(true)}
          >
            <img
              src={video.thumb}
              alt={video.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/50 shadow-xl border-2 border-primary/40 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/70 group-hover:shadow-2xl">
                <Play className="w-6 h-6 md:w-9 md:h-9 text-primary fill-primary ml-1" />
              </div>
            </div>
            <div className="absolute top-2 right-2 md:top-3 md:right-3 z-20 animate-pulse">
              <div className={`${video.badgeColor} text-white px-2 py-1 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-sm border-2 border-white/30 shadow-lg`}>
                {video.badge}
              </div>
            </div>
          </div>
        ) : (
          <div className="aspect-video">
            <iframe
              src={video.embedUrl}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </div>
  );
};

const Aula = () => {
  return (
    <>
      <Helmet>
        <title>Conheça o Curso — Informática na Prática</title>
        <meta name="description" content="Assista aulas reais do curso de Informática na Prática e veja como é fácil aprender!" />
        <meta property="og:title" content="Conheça o Curso — Informática na Prática" />
        <meta property="og:description" content="Assista aulas reais e veja como é fácil aprender informática do zero!" />
        <meta property="og:image" content={`${window.location.origin}/images/capa-aula-whatsapp.jpg`} />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/aula`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${window.location.origin}/images/capa-aula-whatsapp.jpg`} />
      </Helmet>

      <div className="min-h-screen bg-slate-900">
        {/* Header compacto */}
        <div className="flex flex-col items-center pt-6 pb-4 px-4">
          <img src={logo} alt="Informática na Prática" className="h-16 md:h-24 mb-3" />
          <p className="text-slate-300 text-sm md:text-base text-center">
            <span className="text-primary font-bold">Informática do zero:</span> simples, prático e para todos
          </p>
        </div>

        {/* Selos de confiança */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-w-3xl mx-auto px-4 mb-6">
          {[
            { icon: Headphones, label: "Suporte nas Aulas" },
            { icon: Shield, label: "Garantia 7 Dias" },
            { icon: Award, label: "Certificado Incluso" },
            { icon: Users, label: "+15.000 Alunos" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-1.5 p-2 bg-white/5 rounded-lg border border-white/10">
              <item.icon className="w-4 h-4 text-primary" />
              <span className="text-white font-bold text-xs">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Vídeos empilhados */}
        <div className="max-w-4xl mx-auto px-4 space-y-10 pb-8">
          {videos.map((video, index) => (
            <VideoCard key={index} video={video} />
          ))}
        </div>

        {/* CTA para a home */}
        <div className="sticky bottom-0 bg-slate-900/95 backdrop-blur-sm border-t border-white/10 py-4 px-4">
          <div className="max-w-xl mx-auto">
            <a
              href="/"
              className="group flex items-center justify-center gap-2 w-full bg-success hover:bg-success/90 text-white font-black text-base md:text-lg py-4 rounded-full shadow-[0_8px_30px_rgba(34,197,94,0.4)] hover:shadow-[0_12px_40px_rgba(34,197,94,0.55)] hover:scale-[1.02] transition-all duration-300"
            >
              🎯 QUERO SABER MAIS SOBRE O CURSO
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aula;
