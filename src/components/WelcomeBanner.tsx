import { useEffect, useRef, useState } from "react";
import { MessageCircle, Clock, HeartHandshake } from "lucide-react";
import elisaPhoto from "@/assets/elisa-photo.jpg";

const chips = [
  { icon: MessageCircle, label: "Dúvidas no WhatsApp" },
  { icon: Clock, label: "Do Zero" },
  { icon: HeartHandshake, label: "Gente de verdade te atendendo" },
];

export const WelcomeBanner = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`welcome-reveal ${visible ? "is-visible" : ""} py-8 md:py-10 bg-slate-900`}
    >
      <div className="container mx-auto px-4">
        <div className="welcome-glow relative overflow-hidden max-w-4xl mx-auto rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/20 via-slate-900 to-slate-900 px-5 py-7 md:px-10 md:py-9">
          {/* Brilho que atravessa a faixa */}
          <span
            aria-hidden
            className="welcome-shimmer pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-primary/25 to-transparent"
          />

          <div className="relative flex flex-col md:flex-row items-center gap-5 md:gap-8 text-center md:text-left">
            {/* Foto da professora com ondas de acolhimento */}
            <div className="welcome-float relative flex-shrink-0 w-24 h-24 md:w-28 md:h-28">
              <span
                aria-hidden
                className="welcome-ring absolute inset-0 rounded-full border-2 border-primary/60"
              />
              <span
                aria-hidden
                className="welcome-ring absolute inset-0 rounded-full border-2 border-primary/40"
                style={{ animationDelay: "1.3s" }}
              />
              <img
                src={elisaPhoto}
                alt="Professora Elisa"
                className="relative w-full h-full rounded-full object-cover object-top border-4 border-primary/50"
              />
              <span
                aria-hidden
                className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-success border-4 border-slate-900"
              />
            </div>

            <div className="flex-1">
              {/* Etiqueta de conversa ativa */}
              <div className="inline-flex items-center gap-2 border border-primary/40 bg-primary/10 rounded-full px-4 py-1.5 mb-3">
                <span className="flex items-center gap-1">
                  <span className="welcome-dot w-1.5 h-1.5 rounded-full bg-primary" />
                  <span
                    className="welcome-dot w-1.5 h-1.5 rounded-full bg-primary"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <span
                    className="welcome-dot w-1.5 h-1.5 rounded-full bg-primary"
                    style={{ animationDelay: "0.4s" }}
                  />
                </span>
                <span className="text-primary text-xs md:text-sm font-bold uppercase tracking-wide">
                  Professora Elisa está com você
                </span>
              </div>

              <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
                Você não está <span className="text-primary">sozinho(a)</span>.
              </h2>
              <p className="text-lg md:text-2xl font-bold text-white mt-1">
                Eu vou te ensinar cada clique, com calma.
              </p>
              <p className="text-sm md:text-base text-slate-300 mt-2 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Pode perguntar quantas vezes precisar. A gente aprende junto, no
                seu tempo.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mt-5">
                {chips.map((chip) => (
                  <div
                    key={chip.label}
                    className="inline-flex items-center gap-2 border border-slate-700 bg-slate-800/70 rounded-full px-3 py-1.5"
                  >
                    <chip.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-white text-xs md:text-sm font-semibold">
                      {chip.label}
                    </span>
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
