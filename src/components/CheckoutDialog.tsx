import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl md:text-3xl font-black text-center text-primary">
            Garanta sua vaga agora! 🎯
          </DialogTitle>
          <p className="text-sm md:text-base text-foreground text-center font-semibold">
            Você está a um clique de transformar sua relação com o computador.
          </p>
          <p className="text-xs md:text-sm text-muted-foreground text-center">
            Preencha seus dados e escolha a forma de pagamento
          </p>
        </DialogHeader>
        <CheckoutForm />
        <p className="text-xs md:text-sm text-center text-muted-foreground border-t pt-4 flex items-center justify-center gap-2">
          🔒 Compra 100% segura • Acesso imediato após o pagamento
        </p>
      </DialogContent>
    </Dialog>
  );
};
