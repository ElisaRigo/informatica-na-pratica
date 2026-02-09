import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckoutForm } from "./CheckoutForm";
import { Lock, ShieldCheck, CheckCircle2, Headphones, Monitor, Infinity } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutDialog = ({ open, onOpenChange }: CheckoutDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[95vh] overflow-y-auto p-4 md:p-6">
        {/* Banner Ambiente 100% Seguro */}
        <div className="bg-primary rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 -mt-1">
          <Lock className="w-4 h-4 text-primary-foreground" />
          <span className="text-sm font-bold text-primary-foreground">Ambiente 100% Seguro</span>
          <ShieldCheck className="w-4 h-4 text-success" />
        </div>

        {/* Título com ícone de monitor */}
        <div className="text-center space-y-1 py-2">
          <div className="flex items-center justify-center gap-2">
            <Monitor className="w-5 h-5 text-primary" />
            <h2 className="text-xl md:text-2xl font-black text-foreground">
              Falta pouco para você começar!
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Pagamento 100% seguro e acesso imediato ao curso.
          </p>
        </div>

        {/* Preço com logo */}
        <div className="flex items-center justify-center gap-3 py-2">
          <img src={logoBlue} alt="Informática na Prática" className="w-12 h-12 object-contain" />
          <div>
            <p className="text-3xl md:text-4xl font-black text-primary">
              R$ 297<span className="text-xl">,00</span>
            </p>
            <p className="text-sm text-success font-medium">
              ou 12x de R$ 30,22
            </p>
          </div>
        </div>

        {/* 4 Cards de benefícios */}
        <div className="grid grid-cols-2 gap-2 py-2">
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border bg-background">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-xs font-bold text-foreground">Acesso imediato</span>
            <span className="text-[10px] text-muted-foreground">Login enviado por e-mail</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border bg-background">
            <ShieldCheck className="w-5 h-5 text-success" />
            <span className="text-xs font-bold text-foreground">Garantia 7 dias</span>
            <span className="text-[10px] text-muted-foreground">100% do dinheiro de volta</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border bg-background">
            <Headphones className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold text-foreground">Suporte humanizado</span>
            <span className="text-[10px] text-muted-foreground">Tire dúvidas pelo WhatsApp</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl border border-border bg-background">
            <Infinity className="w-5 h-5 text-primary" />
            <span className="text-xs font-bold text-foreground">Acesso vitalício</span>
            <span className="text-[10px] text-muted-foreground">Assista quando quiser</span>
          </div>
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
