import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

// Inicializar Stripe
const stripePromise = loadStripe("pk_test_51SJEnDRzpXJIMcLI2BPz4yeHYtehyaTtMyw7gNp3aXNEWtEd1TsieMoVFWeCbZlQjwCn6IT85giojLxMQCxCUSq600hn3yHyxc");

const CheckoutFormContent = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast({
        title: "Carregando...",
        description: "Aguarde enquanto preparamos o pagamento",
      });
      return;
    }

    if (!isReady) {
      toast({
        title: "Aguarde",
        description: "O formulário de pagamento ainda está carregando",
      });
      return;
    }

    setLoading(true);

    try {
      // Para boleto e alguns métodos, Stripe precisa redirecionar para mostrar instruções
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.protocol}//${window.location.host}/obrigada`,
        },
      });

      // Se chegou aqui sem redirecionar, houve um erro
      if (error) {
        // Erros de validação não precisam de toast
        if (error.type === "validation_error") {
          return;
        }
        
        toast({
          title: "Erro no pagamento",
          description: error.message,
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Erro",
        description: err.message || "Ocorreu um erro ao processar o pagamento",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement 
        onReady={() => setIsReady(true)}
        options={{
          layout: {
            type: 'tabs',
            defaultCollapsed: false,
          }
        }}
      />
      
      <Button
        type="submit"
        disabled={!stripe || !isReady || loading}
        size="lg"
        className="w-full font-bold text-lg py-6"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Processando...
          </>
        ) : !isReady ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Carregando...
          </>
        ) : (
          `Pagar R$ 297,00`
        )}
      </Button>
    </form>
  );
};

export const CheckoutForm = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
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
    console.log("Iniciando pagamento...");
    
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
    console.log("Chamando função create-payment-intent...");

    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          customerName: formData.name,
          customerEmail: formData.email,
          customerTaxId: cleanCPF
        }
      });

      console.log("Resposta da função:", { data, error });

      if (error) throw error;

      if (data.clientSecret) {
        console.log("Client secret recebido, mostrando checkout");
        setClientSecret(data.clientSecret);
      } else {
        throw new Error('Falha ao iniciar pagamento');
      }

    } catch (error: any) {
      console.error('Error creating payment intent:', error);
      toast({
        title: "Erro ao processar",
        description: error.message || "Tente novamente em alguns instantes",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (clientSecret) {
    return (
      <div className="space-y-4 bg-card border border-border rounded-xl p-6">
        <h3 className="text-xl font-bold text-center mb-4">Finalize seu pagamento</h3>
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutFormContent clientSecret={clientSecret} />
        </Elements>
      </div>
    );
  }

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
    </div>
  );
};
