import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const CheckoutForm = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: ""
  });

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const handlePaymentClick = async (paymentMethod: string) => {
    if (!formData.name || !formData.email || !formData.phone || !formData.cpf) {
      toast({
        title: "Preencha todos os campos",
        description: "Todos os campos são obrigatórios para continuar",
        variant: "destructive"
      });
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    const cleanCPF = formData.cpf.replace(/\D/g, '');

    if (cleanPhone.length !== 11) {
      toast({
        title: "Telefone inválido",
        description: "Digite um telefone válido com DDD",
        variant: "destructive"
      });
      return;
    }

    if (cleanCPF.length !== 11) {
      toast({
        title: "CPF inválido",
        description: "Digite um CPF válido",
        variant: "destructive"
      });
      return;
    }

    setLoading(paymentMethod);

    try {
      const { data, error } = await supabase.functions.invoke('pagseguro-checkout', {
        body: {
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: cleanPhone,
          customerCPF: cleanCPF
        }
      });

      if (error) throw error;

      if (data.success && data.checkoutCode) {
        window.location.href = `/aguardando?transaction_id=${data.checkoutCode}&payment_url=${encodeURIComponent(data.paymentUrl)}`;
      } else {
        throw new Error('Falha ao criar link de pagamento');
      }

    } catch (error: any) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Erro ao processar",
        description: error.message || "Tente novamente em alguns instantes",
        variant: "destructive"
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-4 bg-card border border-border rounded-xl p-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nome Completo *</Label>
        <Input
          id="name"
          placeholder="Seu nome completo"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          disabled={loading !== null}
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
          disabled={loading !== null}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone com DDD *</Label>
        <Input
          id="phone"
          placeholder="(00) 00000-0000"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
          maxLength={15}
          disabled={loading !== null}
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
          disabled={loading !== null}
        />
      </div>

      <div className="space-y-3 pt-4">
        <p className="text-sm font-medium text-center mb-2">Escolha sua forma de pagamento:</p>
        
        <Button
          onClick={() => handlePaymentClick('creditcard')}
          size="lg"
          className="w-full font-bold text-lg py-6"
          disabled={loading !== null}
          variant="default"
        >
          {loading === 'creditcard' ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processando...
            </>
          ) : (
            '💳 Cartão de Crédito'
          )}
        </Button>

        <Button
          onClick={() => handlePaymentClick('pix')}
          size="lg"
          className="w-full font-bold text-lg py-6"
          disabled={loading !== null}
          variant="secondary"
        >
          {loading === 'pix' ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processando...
            </>
          ) : (
            '📱 PIX'
          )}
        </Button>

        <Button
          onClick={() => handlePaymentClick('boleto')}
          size="lg"
          className="w-full font-bold text-lg py-6"
          disabled={loading !== null}
          variant="outline"
        >
          {loading === 'boleto' ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processando...
            </>
          ) : (
            '🧾 Boleto'
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Você será redirecionado para o ambiente seguro do PagSeguro
      </p>
    </div>
  );
};
