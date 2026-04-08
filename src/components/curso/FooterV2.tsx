import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

export const FooterV2 = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-2">
          {/* Social + Legal inline */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-slate-500">
            <a href="https://www.instagram.com/informaticanapratica.oficial/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/informaticanapratica.oficial" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </a>
            <span className="text-slate-700">|</span>
            <Link to="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link>
            <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
          </div>
          <p className="text-slate-600" style={{ fontSize: '11px' }}>
            Informática na Prática LTDA · CNPJ: 32.373.460/0001-51 · © {currentYear} Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
