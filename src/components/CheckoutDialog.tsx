import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";
import { ShieldCheck, Lock, CheckCircle2, Headphones, Infinity, Monitor, Laptop } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import elisaPhoto from "@/assets/elisa-checkout.jpg";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-3 md:p-5">
        {/* Header de Segurança */}
        <div className="bg-success/10 border border-success/30 rounded-lg px-3 py-1.5 mb-1">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-success" />
              <span className="text-xs font-bold text-success">Ambiente 100% Seguro</span>
            </div>
            <span className="text-success text-xs">•</span>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" />
              <span className="text-xs font-bold text-success">Acesso Imediato</span>
            </div>
          </div>
        </div>

        <DialogHeader className="space-y-1.5">
          {/* Badge do Curso */}
          <div className="flex justify-center">
            <span className="bg-primary text-primary-foreground text-sm md:text-base font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-2">
              <Laptop className="w-4 h-4 md:w-5 md:h-5" /> Curso Completo de Informática
            </span>
          </div>
          
          <DialogTitle className="text-xl md:text-2xl font-black text-center text-foreground flex items-center justify-center gap-2">
            <Monitor className="w-6 h-6 text-primary" />
            Falta pouco para você começar!
          </DialogTitle>
          
          {/* Foto + Preço em destaque */}
          <div className="flex items-center justify-center gap-4 py-2">
            <Avatar className="h-20 w-20 md:h-24 md:w-24 border-3 border-primary shadow-lg">
              <AvatarImage 
                src={elisaPhoto} 
                alt="Professora Elisangela Néri Rigo" 
                className="object-cover object-top"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">ER</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-3xl md:text-4xl font-black text-primary">
                R$ 297<span className="text-lg">,00</span>
              </p>
              <p className="text-sm text-success font-semibold">
                ou 12x de R$ 30,22
              </p>
            </div>
          </div>

          {/* Faixa da Professora */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg px-3 py-2.5 text-center">
            <p className="text-xs text-muted-foreground">Professora Responsável</p>
            <p className="text-base font-bold text-primary">Elisangela Néri Rigo</p>
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
