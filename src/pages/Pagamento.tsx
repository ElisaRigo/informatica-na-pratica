import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Lock, CreditCard } from "lucide-react";
import { PagamentoForm } from "@/components/pagamento/PagamentoForm";
import checkoutBanner from "@/assets/checkout-banner.jpg";
import checkoutSidebar from "@/assets/checkout-sidebar.png";
import logoBlue from "@/assets/logo-blue.png";

const Pagamento = () => {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    // Disparar InitiateCheckout apenas uma vez
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      
      const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                           window.location.hostname === 'www.informaticanapratica.com.br';
      
      if (!isProduction) {
        console.log('🔍 [DIAG] InitiateCheckout skipped - not production');
        return;
      }

      // Facebook Pixel
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'InitiateCheckout', {
          value: 297.00,
          currency: 'BRL',
          content_type: 'product',
          content_name: 'Curso Informática na Prática'
        });
        console.log('✅ [FB] InitiateCheckout disparado');
      }

      // Google Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'begin_checkout', {
          currency: 'BRL',
          value: 297.00,
          items: [{
            item_name: 'Curso Informática na Prática',
            price: 297.00,
            quantity: 1
          }]
        });
        console.log('✅ [GA4] begin_checkout disparado');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Banner Superior */}
      <div className="w-full">
        <img 
          src={checkoutBanner} 
          alt="CHEGA de ficar para TRÁS - Aprenda Informática" 
          className="w-full h-auto object-cover max-h-[280px] md:max-h-[350px]"
        />
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Coluna Esquerda - Formulário */}
          <div className="lg:col-span-2">
            {/* Header do Produto */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
              <img 
                src={logoBlue} 
                alt="Curso de Informática" 
                className="w-14 h-14 object-contain rounded-lg bg-muted/30 p-1"
              />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground">Identificador</p>
                <h1 className="font-bold text-foreground text-base md:text-lg leading-tight">
                  Curso Completo de Informática na Prática
                </h1>
                <p className="text-sm text-primary font-bold mt-1">
                  12x R$ 30,22
                </p>
                <p className="text-xs text-muted-foreground">
                  ou R$ 297,00 à vista
                </p>
                <button className="text-xs text-primary hover:underline mt-1">
                  🎟️ Cupom de Desconto?
                </button>
              </div>
            </div>

            {/* Formulário de Pagamento */}
            <PagamentoForm />

            {/* Footer Links */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span>Compra Segura</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="w-4 h-4" />
                <span>Privacidade Protegida</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                <span>Produto Digital</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-4 text-[10px] text-muted-foreground">
              <Link to="/politica-de-privacidade" className="hover:underline">
                Política de privacidade
              </Link>
              <span>|</span>
              <Link to="/termos-de-uso" className="hover:underline">
                Termos de compra
              </Link>
            </div>
          </div>

          {/* Coluna Direita - Imagem */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <img 
                src={checkoutSidebar} 
                alt="Professora Elisangela" 
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagamento;
