import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";
import { ShieldCheck, Lock, CheckCircle2, Laptop } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import elisaPhoto from "@/assets/elisa-checkout.jpg";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader className="space-y-3">
          {/* Badge do Curso */}
          <div className="flex justify-center">
            <span className="bg-primary text-primary-foreground text-sm md:text-base font-bold px-4 py-1.5 rounded-full shadow-md flex items-center gap-2">
              <Laptop className="w-4 h-4 md:w-5 md:h-5" /> Curso Completo de Informática
            </span>
          </div>
          
          {/* Foto + Nome + Preço */}
          <div className="flex items-center justify-center gap-4 py-2">
            <Avatar className="h-16 w-16 md:h-20 md:w-20 border-2 border-primary shadow-lg">
              <AvatarImage 
                src={elisaPhoto} 
                alt="Professora Elisangela Néri Rigo" 
                className="object-cover object-top"
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">ER</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Professora Elisa</p>
              <p className="text-2xl md:text-3xl font-black text-primary">
                R$ 297<span className="text-base">,00</span>
              </p>
              <p className="text-xs text-success font-semibold">
                ou 12x de R$ 30,22
              </p>
            </div>
          </div>

          {/* Garantias em linha */}
          <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-success" /> Acesso imediato
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-success" /> Garantia 7 dias
            </span>
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-success" /> Pagamento seguro
            </span>
          </div>
        </DialogHeader>

        <CheckoutForm />

        {/* Rodapé simples */}
        <p className="text-xs text-center text-muted-foreground pt-2">
          🔒 Processado com segurança pelo Mercado Pago
        </p>
      </DialogContent>
    </Dialog>
  );
};
