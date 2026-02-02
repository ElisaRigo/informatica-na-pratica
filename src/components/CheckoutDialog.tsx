import { useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";
import { ShieldCheck, Lock, CheckCircle2, Star } from "lucide-react";
import elisaCheckout from "@/assets/elisa-checkout.jpg";

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
      <DialogContent className="max-w-lg max-h-[95vh] overflow-y-auto p-4 md:p-5 gap-3">
        {/* Header com foto da professora e frase motivacional */}
        <div className="flex flex-col items-center text-center pb-3 border-b border-border">
          <img 
            src={elisaCheckout} 
            alt="Professora Elisangela" 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top border-4 border-primary/20 shadow-lg mb-3"
          />
          <h3 className="text-lg md:text-xl font-bold text-foreground">
            Falta pouco para você começar!
          </h3>
          <p className="text-sm text-muted-foreground">
            Te vejo na área de alunos, até mais 😉
          </p>
          <div className="mt-3">
            <p className="text-xl md:text-2xl font-black text-primary leading-none">
              12x R$ 30,22
            </p>
            <p className="text-[10px] md:text-xs text-muted-foreground">
              ou R$ 297,00 à vista
            </p>
          </div>
        </div>

        {/* Barra de confiança - mais visível */}
        <div className="grid grid-cols-3 gap-2 py-3 bg-muted/50 rounded-xl border border-border">
          <div className="flex flex-col items-center gap-1">
            <Lock className="w-5 h-5 text-success" />
            <span className="text-xs font-semibold text-foreground">Seguro</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck className="w-5 h-5 text-success" />
            <span className="text-xs font-semibold text-foreground">7 dias garantia</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-xs font-semibold text-foreground">Acesso imediato</span>
          </div>
        </div>

        {/* Social proof rápido */}
        <div className="flex items-center justify-center gap-1.5 text-xs">
          <div className="flex -space-x-0.5">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-muted-foreground">+15.000 alunos já transformaram suas vidas</span>
        </div>

        {/* Formulário - protagonista */}
        <CheckoutForm />

        {/* Rodapé mínimo */}
        <p className="text-[10px] text-center text-muted-foreground pt-2 border-t border-border">
          🔒 Pagamento processado com segurança pelo Mercado Pago
        </p>
      </DialogContent>
    </Dialog>
  );
};
