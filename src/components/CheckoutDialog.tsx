import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-black text-center">
            Garanta sua vaga agora! 🎯
          </DialogTitle>
          <p className="text-sm text-muted-foreground text-center pt-2">
            Preencha seus dados e escolha a forma de pagamento
          </p>
        </DialogHeader>
        <CheckoutForm />
      </DialogContent>
    </Dialog>
  );
};
