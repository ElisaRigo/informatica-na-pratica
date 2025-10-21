import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, Lock, CheckCircle2, Smartphone, CreditCard } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export const CheckoutForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: ""
  });
  const [mpInstance, setMpInstance] = useState<any>(null);
  const [bricksBuilder, setBricksBuilder] = useState<any>(null);
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'pix' | null>(null);

  // Carregar SDK do Mercado Pago
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = async () => {
      console.log('Mercado Pago SDK loaded');
      
      // Buscar public key do backend
      try {
        const { data: { MERCADO_PAGO_PUBLIC_KEY } } = await supabase.functions.invoke('get-mp-public-key');
        
        if (MERCADO_PAGO_PUBLIC_KEY) {
          const mp = new window.MercadoPago(MERCADO_PAGO_PUBLIC_KEY, {
            locale: 'pt-BR'
          });
          setMpInstance(mp);
          setSdkLoaded(true);
          console.log('Mercado Pago initialized');
        }
      } catch (error) {
        console.error('Error loading MP key:', error);
        toast({
          title: "Erro ao carregar",
          description: "Não foi possível carregar o sistema de pagamento",
          variant: "destructive"
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.cpf) {
      toast({
        title: "Preencha todos os campos",
        description: "Todos os campos são obrigatórios",
        variant: "destructive"
      });
      return false;
    }

    const cleanCPF = formData.cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) {
      toast({
        title: "CPF inválido",
        description: "Digite um CPF válido com 11 dígitos",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "E-mail inválido",
        description: "Digite um e-mail válido",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleCardPayment = async () => {
    if (!validateForm()) return;
    if (!mpInstance || !sdkLoaded) {
      toast({
        title: "Aguarde",
        description: "Sistema de pagamento ainda carregando...",
      });
      return;
    }

    setLoading(true);
    setSelectedMethod('card');

    try {
      console.log('Creating preference for card payment...');
      
      const { data, error } = await supabase.functions.invoke('mercado-pago-checkout', {
        body: {
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf.replace(/\D/g, '')
        }
      });

      if (error) throw error;

      if (!data?.preferenceId) {
        throw new Error('Erro ao criar checkout');
      }

      console.log('Preference created:', data.preferenceId);

      // Criar Brick de Card Payment
      const bricks = mpInstance.bricks();
      
      // Limpar container se existir
      const container = document.getElementById('cardPaymentBrick_container');
      if (container) {
        container.innerHTML = '';
      }

      await bricks.create('cardPayment', 'cardPaymentBrick_container', {
        initialization: {
          amount: 497,
          payer: {
            email: formData.email,
          },
        },
        customization: {
          visual: {
            style: {
              theme: 'dark',
            },
          },
          paymentMethods: {
            maxInstallments: 12,
          },
        },
        callbacks: {
          onReady: () => {
            console.log('Card Payment Brick ready');
            setLoading(false);
          },
          onSubmit: async (cardFormData: any) => {
            console.log('Card payment submitted:', cardFormData);
            
            try {
              // Processar pagamento
              const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${data.accessToken}`, // Enviado pelo backend
                },
                body: JSON.stringify({
                  ...cardFormData,
                  statement_descriptor: 'ELISA ENSINA',
                  external_reference: `${formData.email}-${Date.now()}`,
                  notification_url: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/mercado-pago-webhook`,
                }),
              });

              const paymentResult = await paymentResponse.json();
              
              if (paymentResult.status === 'approved') {
                window.location.href = '/obrigada';
              } else if (paymentResult.status === 'pending') {
                window.location.href = '/aguardando';
              } else {
                throw new Error(paymentResult.status_detail || 'Pagamento não aprovado');
              }
            } catch (err: any) {
              console.error('Payment error:', err);
              toast({
                title: "Erro no pagamento",
                description: err.message,
                variant: "destructive"
              });
            }
          },
          onError: (error: any) => {
            console.error('Brick error:', error);
            toast({
              title: "Erro",
              description: "Ocorreu um erro ao processar o pagamento",
              variant: "destructive"
            });
            setLoading(false);
          },
        },
      });

      setBricksBuilder(bricks);
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao processar pagamento",
        variant: "destructive"
      });
      setLoading(false);
      setSelectedMethod(null);
    }
  };

  const handlePixPayment = async () => {
    if (!validateForm()) return;
    if (!mpInstance || !sdkLoaded) {
      toast({
        title: "Aguarde",
        description: "Sistema de pagamento ainda carregando...",
      });
      return;
    }

    setLoading(true);
    setSelectedMethod('pix');

    try {
      console.log('Creating checkout for PIX...');
      
      const { data, error } = await supabase.functions.invoke('mercado-pago-checkout', {
        body: {
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf.replace(/\D/g, '')
        }
      });

      if (error) throw error;

      if (!data?.preferenceId) {
        throw new Error('Erro ao criar checkout');
      }

      // Redirecionar para o Mercado Pago com preference criado
      const checkout = mpInstance.checkout({
        preference: {
          id: data.preferenceId
        },
        autoOpen: true,
      });

      toast({
        title: "Redirecionando...",
        description: "Você será redirecionado para completar o pagamento",
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao processar pagamento",
        variant: "destructive"
      });
      setLoading(false);
      setSelectedMethod(null);
    }
  };

  // Se método foi selecionado, mostra o Brick
  if (selectedMethod === 'card') {
    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <img src={logoBlue} alt="Elisa Ensina" className="h-16" />
          <div className="text-center space-y-2">
            <h3 className="text-xl font-bold">💳 Pagamento com Cartão</h3>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Lock className="w-4 h-4" />
              <span>Pagamento 100% seguro</span>
            </div>
          </div>
        </div>

        <div id="cardPaymentBrick_container"></div>

        <Button
          variant="outline"
          onClick={() => {
            setSelectedMethod(null);
            setLoading(false);
            const container = document.getElementById('cardPaymentBrick_container');
            if (container) container.innerHTML = '';
          }}
          className="w-full"
        >
          Voltar para opções de pagamento
        </Button>
      </div>
    );
  }

  // Formulário inicial
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <img src={logoBlue} alt="Elisa Ensina" className="h-14" />
        <div className="text-right">
          <div className="text-2xl font-black text-primary">R$ 497,00</div>
          <div className="text-sm font-medium text-muted-foreground line-through">R$ 997,00</div>
        </div>
      </div>

      {/* Badges de Segurança */}
      <div className="flex items-center justify-center gap-6 py-3 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 text-xs">
          <Lock className="w-4 h-4 text-success" />
          <span className="font-medium">SSL Seguro</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span className="font-medium">Mercado Pago</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <ShieldCheck className="w-4 h-4 text-success" />
          <span className="font-medium">Garantia 7 dias</span>
        </div>
      </div>

      {/* Formulário */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading || !sdkLoaded}
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
            disabled={loading || !sdkLoaded}
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
            disabled={loading || !sdkLoaded}
          />
        </div>
      </div>

      {/* Botões de Pagamento */}
      <div className="space-y-3">
        <Button
          onClick={handleCardPayment}
          size="lg"
          className="w-full font-bold text-lg py-6"
          disabled={loading || !sdkLoaded}
        >
          {!sdkLoaded ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Carregando sistema...
            </>
          ) : loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Carregando...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Pagar com Cartão de Crédito
            </>
          )}
        </Button>

        <Button
          onClick={handlePixPayment}
          size="lg"
          variant="outline"
          className="w-full font-bold text-lg py-6 border-2"
          disabled={loading || !sdkLoaded}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Smartphone className="mr-2 h-5 w-5" />
              Pagar com PIX ou Boleto
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
        <ShieldCheck className="w-4 h-4" />
        <span>Parcelamento disponível • Garantia Total de 7 Dias</span>
      </div>
    </div>
  );
};
