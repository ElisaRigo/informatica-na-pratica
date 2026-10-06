import { useState } from "react";
import { Play } from "lucide-react";
import { Helmet } from "react-helmet";

const VideoWhatsApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const siteUrl = window.location.origin;

  return (
    <>
      <Helmet>
        <title>Veja como é fácil aprender informática!</title>
        <meta name="description" content="Tem medo de não aprender? Veja como é fácil aprender comigo! Curso de Informática na Prática." />
        <meta property="og:title" content="Veja como é fácil aprender informática!" />
        <meta property="og:description" content="Tem medo de não aprender? Veja como é fácil aprender comigo!" />
        <meta property="og:image" content={`${siteUrl}/images/og-video-whatsapp.jpg`} />
        <meta property="og:type" content="video.other" />
        <meta property="og:url" content={`${siteUrl}/video-whatsapp`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${siteUrl}/images/og-video-whatsapp.jpg`} />
      </Helmet>

      <div className="min-h-screen bg-[#0b141a] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          {!isPlaying ? (
            <div
              className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group shadow-2xl"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src="/images/og-video-whatsapp.jpg"
                alt="Veja como é fácil aprender informática"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white shadow-xl">
                  <Play className="w-10 h-10 text-red-600 fill-red-600 ml-1" />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/-sdVG1OtDks?rel=0&modestbranding=1&playsinline=1&autoplay=1"
                title="Veja como é fácil aprender"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          )}

          <p className="text-center text-white/50 text-sm mt-4">
            Informática na Prática — Aprenda no seu ritmo!
          </p>
        </div>
      </div>
    </>
  );
};

export default VideoWhatsApp;
