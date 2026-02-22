import { Helmet } from "react-helmet";

const ImagemWhatsApp = () => {
  const siteUrl = window.location.origin;
  const imageUrl = `${siteUrl}/images/capa-aula-whatsapp.jpg`;

  return (
    <>
      <Helmet>
        <title>Veja como é fácil aprender informática!</title>
        <meta name="description" content="Tem medo de não aprender? Veja como é fácil aprender comigo!" />
        <meta property="og:title" content="Tem medo de não aprender?" />
        <meta property="og:description" content="Veja como é fácil aprender comigo! Curso de Informática na Prática." />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1920" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/imagem-whatsapp`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <div className="min-h-screen bg-[#0b141a] flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <img
            src="/images/capa-aula-whatsapp.jpg"
            alt="Tem medo de não aprender? Veja como é fácil aprender comigo!"
            className="w-full rounded-2xl shadow-2xl"
          />
          <p className="text-center text-white/50 text-sm mt-4">
            Informática na Prática — Aprenda no seu ritmo!
          </p>
        </div>
      </div>
    </>
  );
};

export default ImagemWhatsApp;
