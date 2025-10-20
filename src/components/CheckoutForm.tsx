import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";

export const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: ""
  });

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handleInitiatePayment = async () => {
    console.log("Iniciando pagamento com Eduzz");
    
    if (!formData.name || !formData.email || !formData.cpf) {
      toast({
        title: "Preencha todos os campos",
        description: "Todos os campos são obrigatórios para continuar",
        variant: "destructive"
      });
      return;
    }

    const cleanCPF = formData.cpf.replace(/\D/g, '');

    if (cleanCPF.length !== 11) {
      toast({
        title: "CPF inválido",
        description: "Digite um CPF válido",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    // Redirecionar para o checkout da Eduzz
    const eduzzCheckoutUrl = "https://chk.eduzz.com/69KA3Z7A0O";
    
    toast({
      title: "Redirecionando para pagamento",
      description: "Você será direcionado para finalizar sua compra",
    });

    // Aguardar 500ms para o toast aparecer antes de redirecionar
    setTimeout(() => {
      window.location.href = eduzzCheckoutUrl;
    }, 500);
  };

  return (
    <div className="space-y-6 bg-card border border-border rounded-xl p-6">
      {/* Logo e Valor */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <img src={logoBlue} alt="Informática na Prática" className="h-14" />
        <div className="text-right">
          <div className="text-2xl font-black text-primary">R$ 297,00</div>
          <div className="text-sm font-bold text-success">40% OFF</div>
        </div>
      </div>

      {/* Ícones de Segurança */}
      <div className="flex items-center justify-center gap-6 py-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 text-xs">
          <Lock className="w-4 h-4 text-success" />
          <span className="font-medium">SSL Seguro</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span className="font-medium">Eduzz</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <ShieldCheck className="w-4 h-4 text-success" />
          <span className="font-medium">Garantia 7 dias</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
            maxLength={14}
            disabled={loading}
          />
        </div>
      </div>

      <div className="pt-2 space-y-3">
        <Button
          onClick={handleInitiatePayment}
          size="lg"
          className="w-full font-bold text-lg py-6"
          disabled={loading}
          variant="default"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Redirecionando...
            </>
          ) : (
            <>💳 Garantir Minha Vaga Agora - PIX, Cartão ou Boleto</>
          )}
        </Button>
        
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Compra Protegida pela Garantia Total de 7 Dias</span>
        </div>
      </div>
    </div>
  );
};
