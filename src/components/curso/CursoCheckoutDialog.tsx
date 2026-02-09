import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckoutForm } from "../CheckoutForm";
import { Lock, ShieldCheck, CheckCircle2, Star } from "lucide-react";
import elisaPhoto from "@/assets/elisa-photo.jpg";

interface CursoCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CursoCheckoutDialog = ({ open, onOpenChange }: CursoCheckoutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[95vh] overflow-y-auto p-4 md:p-6">
        {/* Header com foto da instrutora */}
        <div className="flex items-center gap-3 mb-1">
          <img 
            src={elisaPhoto} 
            alt="Professora Elisa" 
            className="w-12 h-12 rounded-full object-cover border-2 border-success/30 flex-shrink-0"
          />
          <div className="text-center flex-1 pr-6">
            <h2 className="text-lg md:text-xl font-black text-foreground whitespace-nowrap">
              Falta pouco para você começar!
            </h2>
            <p className="text-xs text-muted-foreground">
              Te vejo na área de alunos, até mais 🤗
            </p>
          </div>
        </div>

        {/* Preço em destaque */}
        <div className="text-center py-2">
          <p className="text-2xl md:text-3xl font-black text-success">
            12x R$ 30,22
          </p>
          <p className="text-sm text-muted-foreground">
            ou R$ 297,00 à vista
          </p>
        </div>

        {/* Trust badges em linha */}
        <div className="flex justify-center gap-3 py-2">
          <div className="flex flex-col items-center gap-1 px-4 py-2 bg-muted/50 rounded-lg">
            <Lock className="w-4 h-4 text-success" />
            <span className="text-[10px] font-bold text-foreground">100% Seguro</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-2 bg-muted/50 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-success" />
            <span className="text-[10px] font-bold text-foreground">7 dias garantia</span>
          </div>
          <div className="flex flex-col items-center gap-1 px-4 py-2 bg-muted/50 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-success" />
            <span className="text-[10px] font-bold text-foreground">Acesso imediato</span>
          </div>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-1.5 pb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">+15.000 alunos já transformaram suas vidas</span>
        </div>

        {/* Formulário */}
        <CheckoutForm />

        {/* Rodapé */}
        <div className="pt-2">
          <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5">
            🔒 Pagamento processado com segurança pelo Mercado Pago
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
