import { MessageCircle } from "lucide-react";

interface WhatsAppCTAProps {
  text?: string;
  className?: string;
}

export const WhatsAppCTA = ({ 
  text = "💬 Fale com a Professora Elisa no WhatsApp", 
  className = "" 
}: WhatsAppCTAProps) => {
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
    <div className={`flex justify-center ${className}`}>
      <a
        href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-6 md:px-8 py-4 md:py-5 rounded-2xl shadow-lg transition-all hover:scale-105 text-base md:text-lg group"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 group-hover:animate-bounce" />
        <span>{text}</span>
      </a>
    </div>
  );
};
