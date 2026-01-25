import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";
import { ShieldCheck, Lock, CheckCircle2, Clock, Headphones, Infinity } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";

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
