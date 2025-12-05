import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface EduzzCheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// URL do checkout Eduzz - atualize com o link do seu produto
const EDUZZ_CHECKOUT_URL = "https://sun.eduzz.com/checkout/YOUR_PRODUCT_ID";

export const EduzzCheckoutDialog = ({ open, onOpenChange }: EduzzCheckoutDialogProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      // Dar tempo para o iframe carregar
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Carregando checkout seguro...</p>
            </div>
          </div>
        )}
        <iframe
          src={EDUZZ_CHECKOUT_URL}
          className="w-full h-full border-0"
          title="Checkout Eduzz"
          allow="payment"
          onLoad={() => setIsLoading(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
