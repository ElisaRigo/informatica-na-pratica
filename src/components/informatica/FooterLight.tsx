import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

export const FooterLight = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white py-4 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="flex gap-5">
            <a href="https://www.instagram.com/informaticanapratica.oficial/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/informaticanapratica.oficial" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
          <div className="flex gap-4 text-xs">
            <Link to="/termos-de-uso" className="text-slate-400 hover:text-white transition-colors">Termos de Uso</Link>
            <span className="text-slate-700">•</span>
            <Link to="/politica-de-privacidade" className="text-slate-400 hover:text-white transition-colors">Política de Privacidade</Link>
          </div>
          <div className="text-slate-500 text-[11px] leading-tight">
            <p>Informática na Prática LTDA · CNPJ: 32.373.460/0001-51</p>
            <p>© {currentYear} Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
