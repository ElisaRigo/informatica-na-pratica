import { useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";
import { ShieldCheck } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";
import { Link } from "react-router-dom";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  const hasTrackedRef = useRef(false);

  useEffect(() => {
    // Disparar InitiateCheckout apenas uma vez quando o dialog abre
    if (open && !hasTrackedRef.current) {
      hasTrackedRef.current = true;
      
      const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                           window.location.hostname === 'www.informaticanapratica.com.br';
      
      if (!isProduction) {
        console.log('🔍 [DIAG] InitiateCheckout skipped - not production');
        return;
      }

      // Função para disparar Facebook Pixel InitiateCheckout
      const trackFbInitiateCheckout = () => {
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'InitiateCheckout', {
            value: 297.00,
            currency: 'BRL',
            content_type: 'product',
            content_name: 'Curso Informática na Prática'
          });
          console.log('✅ [FB] InitiateCheckout disparado - R$ 297,00');
          return true;
        }
        return false;
      };

      // Função para disparar Google Analytics/Ads InitiateCheckout
      const trackGoogleInitiateCheckout = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          // GA4 - begin_checkout
          (window as any).gtag('event', 'begin_checkout', {
            currency: 'BRL',
            value: 297.00,
            items: [{
              item_name: 'Curso Informática na Prática',
              price: 297.00,
              quantity: 1
            }]
          });
          console.log('✅ [GA4] begin_checkout disparado - R$ 297,00');
          
          // Google Ads - form_start conversion
          (window as any).gtag('event', 'conversion', {
            'send_to': 'AW-17641842157/-qUVCOSN474bEO3LpNxB',
            'value': 20.0,
            'currency': 'BRL'
          });
          console.log('✅ [GAds] form_start conversion disparado');
          
          return true;
        }
        return false;
      };

      // Tentar disparar FB imediatamente ou com retry
      if (!trackFbInitiateCheckout()) {
        console.log('⏳ [FB] Aguardando fbq carregar...');
        let fbAttempts = 0;
        const fbInterval = setInterval(() => {
          fbAttempts++;
          if (trackFbInitiateCheckout()) {
            clearInterval(fbInterval);
          } else if (fbAttempts >= 50) {
            console.error('❌ [FB] fbq não carregou após 5s - InitiateCheckout perdido');
            clearInterval(fbInterval);
          }
        }, 100);
      }

      // Tentar disparar GA4 imediatamente ou com retry
      if (!trackGoogleInitiateCheckout()) {
        console.log('⏳ [GA4] Aguardando gtag carregar...');
        let gaAttempts = 0;
        const gaInterval = setInterval(() => {
          gaAttempts++;
          if (trackGoogleInitiateCheckout()) {
            clearInterval(gaInterval);
          } else if (gaAttempts >= 50) {
            console.error('❌ [GA4] gtag não carregou após 5s - begin_checkout perdido');
            clearInterval(gaInterval);
          }
        }, 100);
      }
    }
    
    // Reset quando fecha
    if (!open) {
      hasTrackedRef.current = false;
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[95vh] overflow-y-auto p-4 md:p-6 gap-4 bg-background">
        {/* Header - Imagem + Título + Preço */}
        <div className="flex items-start gap-3 pb-4 border-b border-border">
          <img 
            src={logoBlue} 
            alt="Curso de Informática" 
            className="w-20 h-20 object-contain rounded-lg bg-muted/30 p-1"
          />
          <div className="flex-1">
            <h2 className="font-bold text-foreground text-base md:text-lg leading-tight">
              Curso Completo de Informática
            </h2>
            <p className="text-xs text-muted-foreground">
              Professora Elisangela Néri Rigo
            </p>
            {/* Preço - Parcelado primeiro, à vista abaixo */}
            <div className="mt-2 text-right">
              <p className="text-lg md:text-xl font-black text-foreground">
                12x <span className="text-primary">R$ 30,22</span>
              </p>
              <p className="text-xs text-muted-foreground">
                ou R$ 297,00 à vista
              </p>
            </div>
          </div>
        </div>

        {/* Formulário - protagonista */}
        <CheckoutForm />

        {/* Badge de segurança */}
        <div className="flex items-center justify-center gap-2 pt-3 border-t border-border">
          <ShieldCheck className="w-5 h-5 text-success" />
          <div className="text-center">
            <p className="text-xs font-semibold text-success">Compra 100% Segura</p>
            <p className="text-[10px] text-muted-foreground">Verificado e protegido</p>
          </div>
        </div>

        {/* Links legais */}
        <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground">
          <Link to="/politica-de-privacidade" className="hover:underline">
            Política de privacidade
          </Link>
          <span>|</span>
          <Link to="/termos-de-uso" className="hover:underline">
            Termos de compra
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
