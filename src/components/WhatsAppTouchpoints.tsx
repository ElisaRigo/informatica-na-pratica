// Same link and message used by the home page, so every WhatsApp contact
// point opens the conversation with the teacher the same way.
export const WHATS_LINK =
  "https://api.whatsapp.com/send?phone=5545988287082&text=" +
  encodeURIComponent(
    "Olá, professora Elisa! Vi no site as informações do curso, mas ainda tenho dúvidas. Pode me ajudar?"
  );

export const trackWhats = () => {
  const h = window.location.hostname;
  if (
    (h === "informaticanapratica.com.br" ||
      h === "www.informaticanapratica.com.br") &&
    (window as any).gtag
  ) {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-17641842157/-qUVCOSN474bEO3LpNxB",
      value: 20.0,
      currency: "BRL",
    });
  }
};

export const WhatsIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const whatsTarget = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Floating contact stays available throughout the Informatica page. */
export const WhatsFloat = () => {
  return (
    <a
      href={WHATS_LINK}
      {...whatsTarget}
      onClick={trackWhats}
      aria-label="Tire suas dúvidas no WhatsApp"
      className="fixed right-4 bottom-6 z-40 bg-whatsapp hover:bg-whatsapp-hover text-whatsapp-foreground font-bold px-4 py-3.5 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2"
    >
      <WhatsIcon className="w-6 h-6" />
      <span className="text-sm hidden sm:inline">Tire suas dúvidas</span>
    </a>
  );
};

/** Green card with the teacher's photo: quick invitation to ask. */
export const WhatsCard = () => (
  <section className="py-6 md:py-8 bg-slate-900 border-t border-slate-800">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="bg-whatsapp/10 border-2 border-whatsapp/50 rounded-2xl px-5 py-6 md:px-8 md:py-7 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <img
              src="/images/elisa-whatsapp.jpg"
              alt="Professora Elisa"
              style={{ objectPosition: "47% 16%" }}
              loading="lazy"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-whatsapp shrink-0"
            />
            <div className="min-w-0">
              <p className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Ficou com alguma dúvida?
              </p>
              <p className="mt-1 text-base md:text-lg text-slate-300 leading-snug">
                Gostou do curso, mas ainda tem alguma dúvida?{" "}
                <span className="font-bold text-whatsapp">
                  Estou aqui para te ajudar.
                </span>
              </p>
            </div>
          </div>
          <a
            href={WHATS_LINK}
            {...whatsTarget}
            onClick={trackWhats}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-whatsapp-strong hover:bg-whatsapp-strong-hover text-whatsapp-foreground font-extrabold px-6 py-4 rounded-xl shrink-0 shadow-md"
          >
            <WhatsIcon className="w-6 h-6" />
            <span className="text-lg">Quero falar com a Profª Elisa</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

/** Warm closing invitation with the wide CTA used on the home page. */
export const WhatsAskSection = () => (
  <section className="py-8 md:py-10 bg-slate-900 border-t border-slate-800">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <img
          src="/images/elisa-whatsapp.jpg"
          alt="Professora Elisa"
          style={{ objectPosition: "47% 16%" }}
          loading="lazy"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-whatsapp mx-auto mb-5"
        />
        <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
          Ainda ficou com alguma dúvida?{" "}
          <span className="text-whatsapp">Fale comigo antes de decidir.</span>
        </h2>
        <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-2">
          Será que é pra mim? Será que eu vou conseguir acompanhar? É seguro?
        </p>
        <p className="text-base md:text-lg text-slate-300 leading-relaxed mb-8">
          Essas dúvidas são <strong className="text-white">normais</strong> — e
          você não precisa decidir sozinho(a). Me chama no WhatsApp e eu respondo
          com calma, tudo o que você quiser saber.{" "}
          <strong className="text-white">Sem compromisso.</strong>
        </p>

        <div className="mx-auto mb-6 w-full max-w-2xl">
          <a
            href={WHATS_LINK}
            {...whatsTarget}
            onClick={trackWhats}
            aria-label="Quero tirar minhas dúvidas com a professora Elisa"
            className="group flex w-full items-center justify-center gap-3 md:gap-6 bg-whatsapp-strong hover:bg-whatsapp-strong-hover text-whatsapp-foreground font-extrabold px-4 md:px-12 py-5 md:py-7 rounded-xl shadow-2xl transition-all hover:scale-[1.02] active:scale-[0.99]"
          >
            <span className="flex h-11 w-11 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-full bg-whatsapp-foreground/20 transition-colors group-hover:bg-whatsapp-foreground/30">
              <WhatsIcon className="h-6 w-6 md:h-9 md:w-9" />
            </span>
            <span className="flex-1 text-center leading-tight text-lg md:text-3xl">
              Quero tirar minhas dúvidas
              <br /> com a professora Elisa
            </span>
          </a>
        </div>

        <p className="text-sm text-slate-400">
          Resposta pessoal da professora, sem pressa.
        </p>
      </div>
    </div>
  </section>
);
