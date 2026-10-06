import { Link } from "react-router-dom";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

export const FooterV2 = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Social Links */}
          <div className="flex gap-6 mb-8">
            <a
              href="https://www.instagram.com/informaticanapratica.oficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/informaticanapratica.oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 mb-6 text-sm">
            <Link to="/termos-de-uso" className="text-slate-400 hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <span className="text-slate-600">•</span>
            <Link to="/politica-de-privacidade" className="text-slate-400 hover:text-white transition-colors">
              Política de Privacidade
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-slate-500 text-sm space-y-1">
            <p className="font-semibold text-slate-400">Elisangela Neri Rigo</p>
            <p><strong>CNPJ:</strong> 32.373.460/0001-51</p>
            <p className="mt-4">© {currentYear} Informática na Prática. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
