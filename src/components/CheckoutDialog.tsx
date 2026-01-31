import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";
import { ShieldCheck, Lock, CheckCircle2, Headphones, Infinity, Monitor } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";

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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
        {/* Header de Segurança */}
        <div className="bg-success/10 border border-success/30 rounded-lg px-4 py-2 mb-2">
          <div className="flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-success" />
            <span className="text-sm font-bold text-success">Ambiente 100% Seguro</span>
            <ShieldCheck className="w-4 h-4 text-success" />
          </div>
        </div>

        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl md:text-2xl font-black text-center text-foreground flex items-center justify-center gap-2">
            <Monitor className="w-6 h-6 text-primary" />
            Falta pouco para você começar!
          </DialogTitle>
          <p className="text-sm text-center text-muted-foreground">
            Pagamento 100% seguro e acesso imediato ao curso.
          </p>
          
          {/* Logo + Preço em destaque */}
          <div className="flex items-center justify-center gap-4 py-2">
            <img 
              src={logoBlue} 
              alt="Informática Descomplicada" 
              className="h-12 md:h-14 object-contain"
            />
            <div className="text-left">
              <p className="text-3xl md:text-4xl font-black text-primary">
                R$ 297<span className="text-lg">,00</span>
              </p>
              <p className="text-sm text-success font-semibold">
                ou 12x de R$ 30,22
              </p>
            </div>
          </div>

          {/* Grid 2x2 de Garantias */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/50 rounded-lg p-3 flex flex-col items-center text-center gap-1">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <p className="text-xs font-bold text-foreground">Acesso imediato</p>
              <p className="text-[10px] text-muted-foreground">Login enviado por e-mail</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 flex flex-col items-center text-center gap-1">
              <ShieldCheck className="w-5 h-5 text-success" />
              <p className="text-xs font-bold text-foreground">Garantia 7 dias</p>
              <p className="text-[10px] text-muted-foreground">100% do dinheiro de volta</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 flex flex-col items-center text-center gap-1">
              <Headphones className="w-5 h-5 text-success" />
              <p className="text-xs font-bold text-foreground">Suporte humanizado</p>
              <p className="text-[10px] text-muted-foreground">Tire dúvidas pelo WhatsApp</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3 flex flex-col items-center text-center gap-1">
              <Infinity className="w-5 h-5 text-success" />
              <p className="text-xs font-bold text-foreground">Acesso vitalício</p>
              <p className="text-[10px] text-muted-foreground">Assista quando quiser</p>
            </div>
          </div>

        </DialogHeader>

        <CheckoutForm />

        {/* Rodapé */}
        <div className="border-t border-border pt-4">
          <p className="text-sm text-center text-muted-foreground font-medium">
            🔒 Pagamento processado com segurança pelo Mercado Pago
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
