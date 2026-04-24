import { Facebook, Instagram, MessageCircle } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-panel border-t border-line">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Social Media Links */}
          <div className="flex justify-center gap-6 mb-8">
            <a
              href="https://www.instagram.com/informaticanapratica.oficial/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
              <span className="hidden sm:inline">Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/informaticanapratica.oficial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
              <span className="hidden sm:inline">Facebook</span>
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=5545988287082&text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20curso%20de%20Inform%C3%A1tica%20na%20Pr%C3%A1tica"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm">
            <a
              href="/termos-de-uso"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Termos de Uso
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="/politica-de-privacidade"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Política de Privacidade
            </a>
          </div>

          {/* Company Info */}
          <div className="text-center text-muted-foreground text-sm space-y-2">
            <p className="font-semibold">Elisangela Neri Rigo</p>
            <p><strong>CNPJ:</strong> 32.373.460/0001-51</p>
            <p className="mt-4">© {currentYear} Informática na Prática. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
