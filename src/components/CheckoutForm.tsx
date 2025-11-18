import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, Lock, CreditCard, Smartphone, Receipt, CheckCircle2, Copy, X, ArrowLeft } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";
import { CardPaymentBrick } from "./CardPaymentBrick";

declare global {
  interface Window {
    MercadoPago: any;
    grecaptcha: any;
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
    cpf: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: ""
  });
  const [mpInstance, setMpInstance] = useState<any>(null);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [coursePrice, setCoursePrice] = useState<number>(297.00);
  const [showCardPayment, setShowCardPayment] = useState(false);

  // Carregar SDK do Mercado Pago
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = async () => {
      console.log('Mercado Pago SDK loaded');
      
      try {
        const [keyResponse, priceResponse] = await Promise.all([
          supabase.functions.invoke('get-mp-public-key'),
          supabase.functions.invoke('get-course-price')
        ]);
        
        if (keyResponse.data?.MERCADO_PAGO_PUBLIC_KEY) {
          const mp = new window.MercadoPago(keyResponse.data.MERCADO_PAGO_PUBLIC_KEY, {
            locale: 'pt-BR'
          });
          setMpInstance(mp);
          setSdkLoaded(true);
          console.log('Mercado Pago initialized');
        }
        
        if (priceResponse.data?.price) {
          setCoursePrice(priceResponse.data.price);
          console.log('Course price loaded:', priceResponse.data.price);
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

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
  };

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
  };

  const validateForm = () => {
    const requiredFields = ['name', 'email', 'cpf', 'phone', 'cep', 'street', 'number', 'neighborhood', 'city', 'state'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
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

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 11) {
      toast({
        title: "Telefone inválido",
        description: "Digite um telefone válido com DDD (11 dígitos)",
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
          cpf: formData.cpf.replace(/\D/g, ''),
          phone: formData.phone.replace(/\D/g, '')
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

      // Iniciar verificação automática do pagamento a cada 5 segundos
      const intervalId = setInterval(async () => {
        try {
          const { data: payment } = await supabase
            .from('payments')
            .select('status')
            .eq('pagseguro_transaction_id', data.paymentId)
            .eq('status', 'approved')
            .maybeSingle();

          if (payment) {
            clearInterval(intervalId);
            toast({
              title: "✅ Pagamento confirmado!",
              description: "Redirecionando para confirmação...",
            });
            setTimeout(() => {
              window.location.href = '/obrigada';
            }, 1500);
          }
        } catch (error) {
          console.error('Error checking payment:', error);
        }
      }, 5000);

      // Limpar intervalo após 10 minutos (600000ms)
      setTimeout(() => clearInterval(intervalId), 600000);

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

  const handleCardPayment = async () => {
    if (!validateForm()) return;
    
    setShowCardPayment(true);
  };

  const handleOtherPayment = async (method: 'boleto') => {
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
      console.log(`Creating checkout for ${method}...`);
      
      const { data, error } = await supabase.functions.invoke('mercado-pago-checkout', {
        body: {
          name: formData.name,
          email: formData.email,
          cpf: formData.cpf.replace(/\D/g, ''),
          phone: formData.phone.replace(/\D/g, '')
        }
      });

      if (error) throw error;

      if (!data?.initPoint) {
        throw new Error('Erro ao criar checkout');
      }

      console.log('Redirecting to Mercado Pago:', data.initPoint);

      toast({
        title: "Redirecionando...",
        description: "Você será redirecionado para o pagamento seguro",
      });

      // Redirecionar para o Checkout Pro do Mercado Pago
      setTimeout(() => {
        window.location.href = data.initPoint;
      }, 1000);
      
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

  // Se está mostrando pagamento com cartão
  if (showCardPayment) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCardPayment(false)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <img src={logoBlue} alt="Informática na Prática - Curso de Informática Online" className="h-12" />
          <div className="w-20"></div>
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">Pagamento com Cartão</h3>
          <p className="text-sm text-muted-foreground">
            Parcele em até 12x
          </p>
          <div className="text-3xl font-black text-primary">
            R$ {coursePrice.toFixed(2).replace('.', ',')}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-900 font-medium">
            💳 Digite o número do cartão para ver as opções de parcelamento disponíveis
          </p>
        </div>

        <CardPaymentBrick
          formData={formData}
          amount={coursePrice}
          onSuccess={() => {
            toast({
              title: "✅ Pagamento aprovado!",
              description: "Redirecionando...",
            });
          }}
          onError={(error) => {
            console.error('Payment error:', error);
          }}
        />

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2 border-t">
          <ShieldCheck className="w-4 h-4" />
          <span>Pagamento 100% Seguro com Mercado Pago</span>
        </div>
      </div>
    );
  }

  // Se tem dados do PIX, mostra a tela do QR Code
  if (pixData) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b">
          <img src={logoBlue} alt="Informática na Prática - Curso de Informática com Professora Elisa" className="h-12" />
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
                alt="QR Code PIX para pagamento do Curso de Informática na Prática - Escaneie para pagar"
                className="w-64 h-64"
              />
            </div>
          </div>

          {/* Valor */}
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground">Valor a pagar</div>
            <div className="text-3xl font-black text-primary mt-1">
              R$ {coursePrice.toFixed(2).replace('.', ',')}
            </div>
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
      {/* Header com Preço em Destaque */}
      <div className="text-center space-y-2 pb-4 border-b">
        <img src={logoBlue} alt="Informática na Prática - Logo do Curso" className="h-10 md:h-14 mx-auto" />
        <div>
          <div className="text-3xl md:text-5xl font-black text-primary mb-1">
            R$ {coursePrice.toFixed(2).replace('.', ',')}
          </div>
          <div className="text-xs md:text-sm font-bold text-foreground">
            Acesso completo por 2 anos • Certificado incluso
          </div>
          <div className="text-xs text-success font-semibold mt-1">
            Parcele em até 12x no cartão
          </div>
        </div>
      </div>

      {/* Badges de Segurança */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 py-2 md:py-3 px-2 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20">
        <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
          <Lock className="w-3 h-3 md:w-4 md:h-4 text-success" />
          <span className="font-semibold text-foreground">Seguro</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-success" />
          <span className="font-semibold text-foreground">Mercado Pago</span>
        </div>
        <div className="flex items-center gap-1 md:gap-2 text-[10px] md:text-sm">
          <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-success" />
          <span className="font-semibold text-foreground">Garantia 7 dias</span>
        </div>
      </div>

      {/* Formulário */}
      <div className="space-y-3 md:space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs md:text-sm font-bold text-foreground">Nome Completo *</Label>
          <Input
            id="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading || !sdkLoaded}
            className="h-9 md:h-12 text-sm md:text-base border-2 focus:border-primary"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs md:text-sm font-bold text-foreground">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading || !sdkLoaded}
            className="h-9 md:h-12 text-sm md:text-base border-2 focus:border-primary"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="cpf" className="text-xs md:text-sm font-bold text-foreground">CPF *</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
            maxLength={14}
            disabled={loading || !sdkLoaded}
            className="h-9 md:h-12 text-sm md:text-base border-2 focus:border-primary"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone" className="text-xs md:text-sm font-bold text-foreground">Telefone com DDD *</Label>
          <Input
            id="phone"
            placeholder="(11) 99999-9999"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
            maxLength={15}
            disabled={loading || !sdkLoaded}
            className="h-9 md:h-12 text-sm md:text-base border-2 focus:border-primary"
          />
        </div>

        {/* Campos de Endereço */}
        <div className="pt-2 border-t">
          <h3 className="text-xs md:text-sm font-bold text-foreground mb-3">Complete seus dados</h3>
          
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="cep" className="text-xs md:text-sm font-bold text-foreground">CEP *</Label>
                <Input
                  id="cep"
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={(e) => setFormData({ ...formData, cep: formatCEP(e.target.value) })}
                  maxLength={9}
                  disabled={loading || !sdkLoaded}
                  className="h-9 md:h-12 text-sm md:text-base border-2 focus:border-primary"
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="number" className="text-xs md:text-sm font-bold text-foreground">Número *</Label>
                <Input
                  id="number"
                  placeholder="123"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  disabled={loading || !sdkLoaded}
                  className="h-9 md:h-12 text-sm md:text-base border-2 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="street" className="text-xs md:text-sm font-bold text-foreground">Endereço *</Label>
              <Input
                id="street"
                placeholder="Rua, Avenida, etc."
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                disabled={loading || !sdkLoaded}
                className="h-9 md:h-12 text-sm md:text-base border-2 focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="complement" className="text-xs md:text-sm font-bold text-foreground">Complemento</Label>
              <Input
                id="complement"
                placeholder="Apto, Bloco, etc. (opcional)"
                value={formData.complement}
                onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                disabled={loading || !sdkLoaded}
                className="h-9 md:h-12 text-sm md:text-base border-2 focus:border-primary"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="neighborhood" className="text-xs md:text-sm font-bold text-foreground">Bairro *</Label>
              <Input
                id="neighborhood"
                placeholder="Seu bairro"
                value={formData.neighborhood}
                onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                disabled={loading || !sdkLoaded}
                className="h-9 md:h-12 text-sm md:text-base border-2 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="city" className="text-xs md:text-sm font-bold text-foreground">Cidade *</Label>
                <Input
                  id="city"
                  placeholder="Sua cidade"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={loading || !sdkLoaded}
                  className="h-9 md:h-12 text-sm md:text-base border-2 focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="state" className="text-xs md:text-sm font-bold text-foreground">Estado *</Label>
                <Input
                  id="state"
                  placeholder="UF"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
                  maxLength={2}
                  disabled={loading || !sdkLoaded}
                  className="h-9 md:h-12 text-sm md:text-base border-2 focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Título das Opções */}
      <div className="pt-1">
        <h3 className="text-sm md:text-lg font-black text-center mb-2 md:mb-3 text-foreground">Escolha a forma de pagamento</h3>
      </div>

      {/* Opções de Pagamento - Melhoradas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
        {/* Cartão */}
        <button
          onClick={handleCardPayment}
          disabled={loading || !sdkLoaded}
          className="flex flex-col items-center justify-center gap-2 p-4 md:p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm hover:shadow-lg"
        >
          <div className="p-2 md:p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <CreditCard className="w-5 h-5 md:w-8 md:h-8 text-primary" />
          </div>
          <div className="text-center">
            <div className="font-black text-xs md:text-base">Cartão de Crédito</div>
            <div className="text-[10px] md:text-sm text-primary font-bold mt-1">Parcele em até 12x</div>
          </div>
        </button>

        {/* PIX */}
        <button
          onClick={handlePixPayment}
          disabled={loading || !sdkLoaded}
          className="flex flex-col items-center justify-center gap-2 p-4 md:p-6 rounded-xl border-2 border-border hover:border-success hover:bg-success/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm hover:shadow-lg"
        >
          <div className="p-2 md:p-3 rounded-full bg-success/10 group-hover:bg-success/20 transition-colors">
            <Smartphone className="w-5 h-5 md:w-8 md:h-8 text-success" />
          </div>
          <div className="text-center">
            <div className="font-black text-xs md:text-base">PIX</div>
            <div className="text-[10px] md:text-sm text-success font-bold mt-1">Aprovação imediata</div>
          </div>
        </button>

        {/* Boleto */}
        <button
          onClick={() => handleOtherPayment('boleto')}
          disabled={loading || !sdkLoaded}
          className="flex flex-col items-center justify-center gap-2 p-4 md:p-6 rounded-xl border-2 border-border hover:border-warning hover:bg-warning/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed group shadow-sm hover:shadow-lg"
        >
          <div className="p-2 md:p-3 rounded-full bg-warning/10 group-hover:bg-warning/20 transition-colors">
            <Receipt className="w-5 h-5 md:w-8 md:h-8 text-warning" />
          </div>
          <div className="text-center">
            <div className="font-black text-xs md:text-base">Boleto</div>
            <div className="text-[10px] md:text-sm text-warning font-bold mt-1">Até 3 dias úteis</div>
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
