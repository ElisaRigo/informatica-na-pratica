import { useCheckout } from "@/hooks/useCheckout";
import { CheckoutTransparente } from "./CheckoutTransparente";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const CheckoutModal = () => {
  const { showCheckout, closeCheckout } = useCheckout();

  return (
    <Dialog open={showCheckout} onOpenChange={closeCheckout}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-gradient">
            Finalize sua Compra
          </DialogTitle>
          <DialogDescription className="text-base">
            Preencha os dados abaixo para garantir seu acesso ao curso
          </DialogDescription>
        </DialogHeader>
        <CheckoutTransparente />
      </DialogContent>
    </Dialog>
  );
};
