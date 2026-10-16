import { MessageCircle } from "lucide-react";

const WHATS_LINK =
  "https://api.whatsapp.com/send?phone=5545988287082&text=" +
  encodeURIComponent("Olá, professora Elisa! Vi no site as informações do curso, mas ainda tenho dúvidas. Pode me ajudar?");

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                         window.location.hostname === 'www.informaticanapratica.com.br';
    
    if (isProduction && typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-17641842157/-qUVCOSN474bEO3LpNxB',
        'value': 20.0,
        'currency': 'BRL'
      });
    }
  };

  return (
    <a
      href={WHATS_LINK}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleWhatsAppClick}
      className="fixed right-4 bottom-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-4 py-3.5 rounded-full shadow-2xl transition-all hover:scale-110 animate-pulse flex items-center gap-2 group"
      aria-label="Tire suas dúvidas no WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
      <span className="text-sm hidden sm:inline">Tire suas dúvidas</span>
    </a>
  );
};
