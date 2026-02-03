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
    // Disparar eventos apenas uma vez quando o dialog abre
    if (open && !hasTrackedRef.current) {
      hasTrackedRef.current = true;
      
      const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                           window.location.hostname === 'www.informaticanapratica.com.br';
      
      if (!isProduction) {
        console.log('🔍 [DIAG] Tracking skipped - not production');
        return;
      }

      // Função para disparar GA4 begin_checkout e form_start
      const trackGA4Events = () => {
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
          
          // GA4 - form_start (custom event)
          (window as any).gtag('event', 'form_start', {
            form_name: 'checkout',
            currency: 'BRL',
            value: 297.00
          });
          console.log('✅ [GA4] form_start disparado');
          
          return true;
        }
        return false;
      };

      // Tentar disparar GA4 imediatamente ou com retry
      if (!trackGA4Events()) {
        console.log('⏳ [GA4] Aguardando gtag carregar...');
        let gaAttempts = 0;
        const gaInterval = setInterval(() => {
          gaAttempts++;
          if (trackGA4Events()) {
            clearInterval(gaInterval);
          } else if (gaAttempts >= 50) {
            console.error('❌ [GA4] gtag não carregou após 5s - eventos perdidos');
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
        <div className="flex items-center gap-4 pb-3 border-b border-border">
          <img 
            src={elisaCheckout} 
            alt="Professora Elisangela" 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top border-4 border-primary/20 shadow-lg flex-shrink-0"
          />
          <div className="flex-1 text-center">
            <h3 className="text-lg md:text-xl font-bold text-foreground">
              Falta pouco para você começar!
            </h3>
            <p className="text-sm text-muted-foreground">
              Te vejo na área de alunos, até mais 😉
            </p>
            <div className="mt-2">
              <p className="text-xl md:text-2xl font-black text-primary leading-none">
                12x R$ 30,22
              </p>
              <p className="text-[10px] md:text-xs text-muted-foreground">
                ou R$ 297,00 à vista
              </p>
            </div>
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
