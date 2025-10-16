import { useCheckout } from "@/hooks/useCheckout";
import { CheckoutTransparente } from "./CheckoutTransparente";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShieldCheck } from "lucide-react";

export const CheckoutModal = () => {
  const { showCheckout, closeCheckout } = useCheckout();

  return (
    <Dialog open={showCheckout} onOpenChange={closeCheckout}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-2xl md:text-3xl font-black text-gradient flex items-center justify-center gap-2">
            <ShieldCheck className="w-7 h-7 text-success" />
            Complete sua Inscrição no Curso
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground pt-2">
            ✅ Pagamento 100% seguro | 🎓 Acesso imediato ao curso | 🔒 Garantia de 7 dias
          </DialogDescription>
        </DialogHeader>
        <CheckoutTransparente />
      </DialogContent>
    </Dialog>
  );
};
