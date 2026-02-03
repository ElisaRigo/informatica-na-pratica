import { CheckoutForm } from "@/components/CheckoutForm";
import { ShieldCheck, Lock, CheckCircle2, Star, ArrowLeft } from "lucide-react";
import elisaCheckout from "@/assets/elisa-checkout.jpg";
import logoBlue from "@/assets/logo-blue.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      
      const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                           window.location.hostname === 'www.informaticanapratica.com.br';
      
      if (!isProduction) {
        console.log('🔍 [DIAG] Tracking skipped - not production');
        return;
      }

      const trackGA4Events = () => {
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
          
          (window as any).gtag('event', 'form_start', {
            form_name: 'checkout',
            currency: 'BRL',
            value: 297.00
          });
          
          return true;
        }
        return false;
      };

      if (!trackGA4Events()) {
        let gaAttempts = 0;
        const gaInterval = setInterval(() => {
          gaAttempts++;
          if (trackGA4Events()) {
            clearInterval(gaInterval);
          } else if (gaAttempts >= 50) {
            clearInterval(gaInterval);
          }
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header minimalista */}
      <header className="border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          
          <img 
            src={logoBlue} 
            alt="Informática na Prática" 
            className="h-7"
          />
          
          <div className="flex items-center gap-1 text-success text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-medium">Seguro</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto">
          
          {/* Mensagem pessoal da professora */}
          <div className="text-center mb-8">
            <img 
              src={elisaCheckout} 
              alt="Professora Elisangela" 
              className="w-24 h-24 rounded-full object-cover object-top border-4 border-primary/10 mx-auto mb-4"
            />
            <h1 className="text-xl font-bold text-foreground mb-1">
              Falta pouco para começar!
            </h1>
            <p className="text-sm text-muted-foreground">
              Te vejo na área de alunos 😉
            </p>
          </div>

          {/* Preço */}
          <div className="text-center mb-6 pb-6 border-b border-border/50">
            <p className="text-3xl font-black text-primary">
              12x R$ 30,22
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ou R$ 297,00 à vista
            </p>
          </div>

          {/* Formulário de checkout */}
          <CheckoutForm />

          {/* Rodapé de confiança */}
          <div className="mt-8 pt-6 border-t border-border/50">
            {/* Garantia */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <ShieldCheck className="w-5 h-5 text-success" />
              <span className="text-sm text-foreground font-medium">
                Garantia de 7 dias ou seu dinheiro de volta
              </span>
            </div>

            {/* Selos em linha */}
            <div className="flex items-center justify-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4" />
                <span className="text-xs">SSL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs">Acesso imediato</span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            {/* Texto de segurança */}
            <p className="text-[10px] text-center text-muted-foreground">
              🔒 Pagamento processado com segurança pelo Mercado Pago
            </p>
            <p className="text-[10px] text-center text-muted-foreground mt-1">
              Professora Elisangela Neri Rigo
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
