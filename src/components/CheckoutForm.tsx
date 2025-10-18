import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";

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
      // Usar redirect: 'if_required' para ter controle sobre o redirecionamento
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.protocol}//${window.location.host}/obrigada`,
        },
        redirect: 'if_required',
      });

      // Se há erro, mostrar para o usuário
      if (error) {
        console.error("Payment error:", error);
        
        // Erros de validação não mostram toast (deixa o Stripe mostrar inline)
        if (error.type === "validation_error") {
          return;
        }
        
        toast({
          title: "Erro no pagamento",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      // Se temos paymentIntent, verificar o status
      if (paymentIntent) {
        console.log("Payment Intent Status:", paymentIntent.status);
        
        // Pagamento com cartão aprovado instantaneamente
        if (paymentIntent.status === "succeeded") {
          console.log("Payment succeeded, redirecting to thank you page");
          window.location.href = `${window.location.protocol}//${window.location.host}/obrigada?payment_intent=${paymentIntent.id}`;
          return;
        }
        
        // Boleto ou método que requer ação adicional
        if (paymentIntent.status === "requires_action" || paymentIntent.status === "processing") {
          console.log("Payment requires action (boleto), redirecting to waiting page");
          window.location.href = `${window.location.protocol}//${window.location.host}/aguardando-confirmacao?payment_intent=${paymentIntent.id}`;
          return;
        }

        // Outros status
        console.log("Payment status:", paymentIntent.status);
        toast({
          title: "Pagamento em processamento",
          description: "Aguarde a confirmação do seu pagamento",
        });
      }
    } catch (err: any) {
      console.error("Unexpected error:", err);
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
          },
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
          `Garantir Minha Vaga Agora`
        )}
      </Button>
      
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
        <ShieldCheck className="w-4 h-4" />
        <span>Compra Protegida pela Garantia Total de 7 Dias</span>
      </div>
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
    console.log("Iniciando pagamento...");
    
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
    <div className="space-y-6 bg-card border border-border rounded-xl p-6">
      {/* Logo e Valor */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <img src={logoBlue} alt="Informática na Prática" className="h-10" />
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
          <span className="font-medium">Stripe</span>
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

      <div className="pt-2">
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
            'Garantir Minha Vaga Agora'
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
