import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, Lock, CreditCard, Smartphone, Receipt, CheckCircle2, Copy, X } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

interface PixData {
  paymentId: string;
  qrCode: string;
  qrCodeBase64: string;
  ticketUrl?: string;
  expirationDate?: string;
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
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [checkingPayment, setCheckingPayment] = useState(false);

  // Carregar SDK do Mercado Pago
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = async () => {
      console.log('Mercado Pago SDK loaded');
      
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

  const handlePixPayment = async () => {
    if (!validateForm()) return;
    if (!sdkLoaded) {
      toast({
        title: "Aguarde",
        description: "Sistema de pagamento ainda carregando...",
      });
      return;
    }

    setLoading(true);

    try {
      console.log('Creating PIX payment...');
      
      const { data, error } = await supabase.functions.invoke('create-pix-payment', {
        body: {
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf.replace(/\D/g, '')
        }
      });

      if (error) throw error;

      if (!data?.qrCode) {
        throw new Error('Erro ao gerar PIX');
      }

      console.log('PIX created:', data.paymentId);
      setPixData(data);

      toast({
        title: "PIX gerado!",
        description: "Escaneie o QR Code ou copie o código para pagar",
      });
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        title: "Erro",
        description: error.message || "Erro ao gerar PIX",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  const handleOtherPayment = async (method: 'card' | 'boleto') => {
    if (!validateForm()) return;
    if (!mpInstance || !sdkLoaded) {
      toast({
        title: "Aguarde",
        description: "Sistema de pagamento ainda carregando...",
      });
      return;
    }

    setLoading(true);

    try {
      console.log(`Creating checkout for ${method}...`);
      
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

      // Abrir checkout do Mercado Pago
      mpInstance.checkout({
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
    }
  };

  const copyPixCode = () => {
    if (pixData?.qrCode) {
      navigator.clipboard.writeText(pixData.qrCode);
      toast({
        title: "Copiado!",
        description: "Código PIX copiado para área de transferência",
      });
    }
  };

  const checkPaymentStatus = async () => {
    if (!pixData?.paymentId) return;
    
    setCheckingPayment(true);
    
    try {
      // Verificar na base de dados se o pagamento foi processado
      const { data: payment, error } = await supabase
        .from('payments')
        .select('status')
        .eq('pagseguro_transaction_id', pixData.paymentId)
        .eq('status', 'approved')
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (payment) {
        toast({
          title: "✅ Pagamento confirmado!",
          description: "Redirecionando para confirmação...",
        });
        
        // Redirecionar para página de obrigado
        setTimeout(() => {
          window.location.href = '/obrigada';
        }, 1500);
      } else {
        toast({
          title: "Aguardando pagamento",
          description: "O pagamento ainda não foi confirmado. Aguarde alguns instantes após pagar.",
        });
      }
    } catch (error: any) {
      console.error('Error checking payment:', error);
      toast({
        title: "Erro",
        description: "Não foi possível verificar o pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setCheckingPayment(false);
    }
  };

  // Se tem dados do PIX, mostra a tela do QR Code
  if (pixData) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b">
          <img src={logoBlue} alt="Elisa Ensina" className="h-12" />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setPixData(null);
              setLoading(false);
            }}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* QR Code do PIX */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10">
            <Smartphone className="w-8 h-8 text-success" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold">Pague com PIX</h3>
            <p className="text-muted-foreground mt-2">
              Escaneie o QR Code abaixo ou copie o código
            </p>
          </div>

          {/* QR Code */}
          <div className="flex justify-center py-6">
            <div className="p-4 bg-white rounded-xl shadow-lg">
              <img
                src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                alt="QR Code PIX"
                className="w-64 h-64"
              />
            </div>
          </div>

          {/* Valor */}
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground">Valor a pagar</div>
            <div className="text-3xl font-black text-primary mt-1">R$ 497,00</div>
          </div>

          {/* Código PIX */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Código PIX Copia e Cola</Label>
            <div className="flex gap-2">
              <Input
                value={pixData.qrCode}
                readOnly
                className="font-mono text-xs"
              />
              <Button onClick={copyPixCode} size="icon" className="shrink-0">
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Instruções */}
          <div className="text-left space-y-2 p-4 bg-muted/20 rounded-lg text-sm">
            <p className="font-semibold">Como pagar:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Abra o app do seu banco</li>
              <li>Escolha pagar com PIX</li>
              <li>Escaneie o QR Code ou cole o código</li>
              <li>Confirme o pagamento</li>
              <li>Pronto! Você receberá o acesso por e-mail</li>
            </ol>
          </div>

          {/* Botão "Já Paguei" */}
          <Button
            onClick={checkPaymentStatus}
            disabled={checkingPayment}
            size="lg"
            className="w-full bg-success hover:bg-success/90 text-white font-bold"
          >
            {checkingPayment ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Verificando pagamento...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Já paguei, verificar pagamento
              </>
            )}
          </Button>

          {/* Aviso */}
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Pagamento 100% Seguro • Acesso liberado automaticamente</span>
          </div>
        </div>
      </div>
    );
  }

  // Formulário inicial
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b">
        <img src={logoBlue} alt="Elisa Ensina" className="h-12" />
        <div className="text-right">
          <div className="text-3xl font-black text-primary">R$ 497,00</div>
          <div className="text-sm font-medium text-muted-foreground line-through">R$ 997,00</div>
        </div>
      </div>

      {/* Badges de Segurança */}
      <div className="flex items-center justify-center gap-4 py-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-2 text-xs">
          <Lock className="w-4 h-4 text-success" />
          <span className="font-medium">Pagamento Seguro</span>
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
          <Label htmlFor="name" className="text-base font-semibold">Nome Completo *</Label>
          <Input
            id="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading || !sdkLoaded}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-semibold">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading || !sdkLoaded}
            className="h-12 text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf" className="text-base font-semibold">CPF *</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
            maxLength={14}
            disabled={loading || !sdkLoaded}
            className="h-12 text-base"
          />
        </div>
      </div>

      {/* Título das Opções */}
      <div className="pt-4">
        <h3 className="text-lg font-bold text-center mb-4">Escolha a forma de pagamento</h3>
      </div>

      {/* Opções de Pagamento - Grade de 3 colunas */}
      <div className="grid grid-cols-3 gap-3">
        {/* Cartão */}
        <button
          onClick={() => handleOtherPayment('card')}
          disabled={loading || !sdkLoaded}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center">
            <div className="font-bold text-sm">Cartão</div>
            <div className="text-xs text-muted-foreground mt-1">Até 12x</div>
          </div>
        </button>

        {/* PIX */}
        <button
          onClick={handlePixPayment}
          disabled={loading || !sdkLoaded}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-border hover:border-success hover:bg-success/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="p-4 rounded-full bg-success/10 group-hover:bg-success/20 transition-colors">
            <Smartphone className="w-8 h-8 text-success" />
          </div>
          <div className="text-center">
            <div className="font-bold text-sm">PIX</div>
            <div className="text-xs text-muted-foreground mt-1">Aprovação imediata</div>
          </div>
        </button>

        {/* Boleto */}
        <button
          onClick={() => handleOtherPayment('boleto')}
          disabled={loading || !sdkLoaded}
          className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-border hover:border-warning hover:bg-warning/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <div className="p-4 rounded-full bg-warning/10 group-hover:bg-warning/20 transition-colors">
            <Receipt className="w-8 h-8 text-warning" />
          </div>
          <div className="text-center">
            <div className="font-bold text-sm">Boleto</div>
            <div className="text-xs text-muted-foreground mt-1">Até 3 dias úteis</div>
          </div>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-4">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processando...</span>
        </div>
      )}

      {!sdkLoaded && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-4">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Carregando sistema de pagamento...</span>
        </div>
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2 border-t">
        <ShieldCheck className="w-4 h-4" />
        <span>Pagamento 100% Seguro • Garantia Total de 7 Dias</span>
      </div>
    </div>
  );
};
