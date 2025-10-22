import { MessageCircle } from "lucide-react";

export const WhatsAppButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed left-4 bottom-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-4 py-3.5 rounded-full shadow-2xl transition-all hover:scale-110 animate-pulse flex items-center gap-2 group"
      aria-label="Tire suas dúvidas no WhatsApp"
    >
      <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
      <span className="text-sm hidden sm:inline">Tire suas dúvidas</span>
    </a>
  );
};
