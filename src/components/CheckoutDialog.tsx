import { useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";
import { ShieldCheck, Lock, CheckCircle2, Award } from "lucide-react";
import elisaPhoto from "@/assets/elisa-photo.jpg";

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
        {/* Título acessível (visualmente oculto) */}
        <DialogTitle className="sr-only">Finalizar Inscrição no Curso</DialogTitle>
        
        {/* Header com foto da professora - humanização */}
        <div className="flex items-center gap-3 pb-3 border-b border-border">
          <img 
            src={elisaPhoto} 
            alt="Professora Elisangela" 
            className="w-14 h-14 rounded-full object-cover border-2 border-primary shadow-md"
          />
          <div className="flex-1">
            <p className="text-sm md:text-base font-bold text-foreground leading-tight">
              Parabéns pela decisão! 🎉
            </p>
            <p className="text-xs text-muted-foreground">
              Te vejo na área de alunos! — Profª Elisangela
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl md:text-3xl font-black text-primary leading-none">
              R$ 297
            </p>
            <p className="text-xs text-success font-semibold">
              ou 12x de R$ 30,22
            </p>
          </div>
        </div>

        {/* GARANTIA DESTACADA - Grande e colorida */}
        <div className="bg-gradient-to-r from-success/10 to-success/5 border-2 border-success rounded-xl p-3 flex items-center gap-3">
          <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="font-bold text-success text-sm md:text-base">
              Garantia Total de 7 Dias
            </p>
            <p className="text-xs text-muted-foreground">
              Não gostou? Devolvemos 100% do seu dinheiro. Sem perguntas!
            </p>
          </div>
        </div>

        {/* Barra de confiança compacta */}
        <div className="flex items-center justify-center gap-4 py-2 bg-muted/30 rounded-lg text-xs">
          <span className="flex items-center gap-1 text-muted-foreground">
            <Lock className="w-3 h-3 text-success" />
            Dados Protegidos
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <CheckCircle2 className="w-3 h-3 text-success" />
            Acesso Imediato
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Award className="w-3 h-3 text-success" />
            +15.000 alunos
          </span>
        </div>

        {/* Formulário - protagonista */}
        <CheckoutForm />

        {/* Rodapé mínimo */}
        <p className="text-[10px] text-center text-muted-foreground pt-2 border-t border-border">
          🔒 Pagamento 100% seguro processado pelo Mercado Pago
        </p>
      </DialogContent>
    </Dialog>
  );
};
