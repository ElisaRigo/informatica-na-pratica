import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CreditCard, Lock } from "lucide-react";

export const CheckoutTransparente = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    cardNumber: "",
    cardHolder: "",
    cardExpiry: "",
    cardCVV: ""
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

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 16) {
      return numbers.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    return value;
  };

  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 4) {
      return numbers.replace(/(\d{2})(\d{2})/, '$1/$2');
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.email || !formData.phone || !formData.cpf ||
        !formData.cardNumber || !formData.cardHolder || !formData.cardExpiry || !formData.cardCVV) {
      toast({
        title: "Preencha todos os campos",
        description: "Todos os campos são obrigatórios para continuar",
        variant: "destructive"
      });
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    const cleanCPF = formData.cpf.replace(/\D/g, '');
    const cleanCardNumber = formData.cardNumber.replace(/\D/g, '');
    const cleanExpiry = formData.cardExpiry.replace(/\D/g, '');

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

    if (cleanCardNumber.length !== 16) {
      toast({
        title: "Cartão inválido",
        description: "Digite um número de cartão válido",
        variant: "destructive"
      });
      return;
    }

    if (cleanExpiry.length !== 4) {
      toast({
        title: "Validade inválida",
        description: "Digite a validade no formato MM/AA",
        variant: "destructive"
      });
      return;
    }

    if (formData.cardCVV.length < 3) {
      toast({
        title: "CVV inválido",
        description: "Digite o código de segurança do cartão",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const [expMonth, expYear] = cleanExpiry.match(/.{1,2}/g) || [];
      
      const { data, error } = await supabase.functions.invoke('pagseguro-transparent-checkout', {
        body: {
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: cleanPhone,
          customerCPF: cleanCPF,
          cardNumber: cleanCardNumber,
          cardHolder: formData.cardHolder,
          cardExpMonth: expMonth,
          cardExpYear: `20${expYear}`,
          cardCVV: formData.cardCVV
        }
      });

      if (error) throw error;

      if (data.success) {
        // Redirecionar para página de aguardando confirmação
        window.location.href = `/aguardando-confirmacao?transaction_id=${data.transactionId}`;
      } else {
        throw new Error(data.message || 'Falha ao processar pagamento');
      }

    } catch (error: any) {
      console.error('Error processing payment:', error);
      toast({
        title: "Erro ao processar pagamento",
        description: error.message || "Tente novamente em alguns instantes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border rounded-xl p-6">
      {/* Dados Pessoais */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          Dados Pessoais
        </h3>
        
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </div>

      {/* Dados do Cartão */}
      <div className="space-y-4 pt-6 border-t border-border">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Dados do Cartão
        </h3>

        <div className="space-y-2">
          <Label htmlFor="cardNumber">Número do Cartão *</Label>
          <Input
            id="cardNumber"
            placeholder="0000 0000 0000 0000"
            value={formData.cardNumber}
            onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
            maxLength={19}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cardHolder">Nome no Cartão *</Label>
          <Input
            id="cardHolder"
            placeholder="Nome como está no cartão"
            value={formData.cardHolder}
            onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value.toUpperCase() })}
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="cardExpiry">Validade *</Label>
            <Input
              id="cardExpiry"
              placeholder="MM/AA"
              value={formData.cardExpiry}
              onChange={(e) => setFormData({ ...formData, cardExpiry: formatExpiry(e.target.value) })}
              maxLength={5}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardCVV">CVV *</Label>
            <Input
              id="cardCVV"
              placeholder="000"
              value={formData.cardCVV}
              onChange={(e) => setFormData({ ...formData, cardCVV: e.target.value.replace(/\D/g, '') })}
              maxLength={4}
              type="password"
              disabled={loading}
            />
          </div>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
        <div className="text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">Pagamento 100% Seguro</p>
          <p>Seus dados são criptografados e processados de forma segura pelo PagSeguro (PCI-DSS Certificado)</p>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full font-bold text-lg py-6"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processando pagamento...
          </>
        ) : (
          'Finalizar Pagamento - R$ 5,00'
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Ambiente de teste - Os dados do cartão não são armazenados em nosso servidor
      </p>
    </form>
  );
};
