import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
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

  const handleInitiatePayment = async () => {
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

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-stripe-checkout', {
        body: {
          customerName: formData.name,
          customerEmail: formData.email
        }
      });

      if (error) throw error;

      if (data?.url) {
        // Redireciona para o checkout do Stripe (suporta PIX, Boleto e Cartão)
        window.location.href = data.url;
      } else {
        throw new Error('Falha ao gerar link de pagamento');
      }

    } catch (error: any) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Erro ao processar",
        description: error.message || "Tente novamente em alguns instantes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
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
        <Label htmlFor="phone">Telefone com DDD *</Label>
        <Input
          id="phone"
          placeholder="(00) 00000-0000"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
          maxLength={15}
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

      <div className="pt-4">
        <Button
          onClick={handleInitiatePayment}
          size="lg"
          className="w-full font-bold text-lg py-6"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processando...
            </>
          ) : (
            'Continuar para Pagamento'
          )}
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        🔒 Pagamento 100% seguro via Stripe
      </p>
      <p className="text-xs text-center text-muted-foreground">
        Aceita PIX, Boleto e Cartão de Crédito
      </p>
    </div>
  );
};
