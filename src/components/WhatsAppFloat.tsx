import { MessageCircle } from "lucide-react";

export const WhatsAppFloat = () => {
  const whatsappMessage = encodeURIComponent("Olá! Gostaria de tirar uma dúvida sobre o curso de Informática na Prática 💻");
  
  return (
    <a
      href={`https://wa.me/5545988287082?text=${whatsappMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-4 bottom-20 md:bottom-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white font-extrabold px-5 py-4 rounded-full shadow-2xl flex items-center gap-2 transition-all hover:scale-110 animate-pulse"
      aria-label="Fale no WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
};
