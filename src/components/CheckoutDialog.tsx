import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
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
          <DialogTitle className="text-xl md:text-2xl font-black text-center text-foreground">
            Complete sua inscrição
          </DialogTitle>
          
          {/* Preço em destaque */}
          <div className="text-center py-2">
            <p className="text-3xl md:text-4xl font-black text-primary">
              R$ 297<span className="text-lg">,00</span>
            </p>
            <p className="text-sm text-success font-semibold">
              ou 12x de R$ 30,22 no cartão
            </p>
          </div>

          {/* Garantias que quebram objeções */}
          <div className="bg-muted/50 rounded-lg p-3 space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Acesso imediato:</span> Receba os dados de login no seu e-mail assim que o pagamento for confirmado
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Garantia de 7 dias:</span> Se não gostar, devolvo 100% do seu dinheiro, sem perguntas
              </p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-success mt-0.5 shrink-0" />
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">Suporte humanizado:</span> Tire dúvidas diretamente comigo pelo WhatsApp
              </p>
            </div>
          </div>
        </DialogHeader>

        <CheckoutForm />

        {/* Rodapé com selos de confiança */}
        <div className="border-t pt-4 space-y-3">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5" />
              <span>Compra Segura</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Garantia 7 Dias</span>
            </div>
          </div>
          <p className="text-[10px] text-center text-muted-foreground">
            Pagamento processado com segurança pelo Mercado Pago
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
