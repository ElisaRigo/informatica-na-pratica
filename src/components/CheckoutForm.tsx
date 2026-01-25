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
    phone: ""
  });
  const [mpInstance, setMpInstance] = useState<any>(null);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [coursePrice, setCoursePrice] = useState<number>(297.00);
  const [showCardPayment, setShowCardPayment] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaSiteKey, setRecaptchaSiteKey] = useState<string>('');

  // Carregar reCAPTCHA
  useEffect(() => {
    const loadRecaptcha = async () => {
      try {
        // Buscar a site key dos secrets
        const { data: keyData } = await supabase.functions.invoke('get-recaptcha-site-key');
        
        if (keyData?.siteKey) {
          setRecaptchaSiteKey(keyData.siteKey);
          
          const script = document.createElement('script');
          script.src = `https://www.google.com/recaptcha/api.js?render=${keyData.siteKey}`;
          script.async = true;
          script.onload = () => {
            console.log('reCAPTCHA loaded');
            setRecaptchaLoaded(true);
          };
          document.body.appendChild(script);
        }
      } catch (error) {
        console.error('Error loading reCAPTCHA:', error);
      }
    };

    loadRecaptcha();
  }, []);

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

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.cpf || !formData.phone) {
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

  // Verificar reCAPTCHA antes de processar pagamento
  const verifyRecaptcha = async (action: string): Promise<boolean> => {
    // Em desenvolvimento/staging, não bloquear o checkout
    const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                         window.location.hostname === 'www.informaticanapratica.com.br';
    
    if (!isProduction) {
      console.log('reCAPTCHA: ambiente de desenvolvimento - verificação desabilitada');
      return true;
    }

    if (!recaptchaLoaded || !recaptchaSiteKey) {
      console.warn('reCAPTCHA not loaded, allowing checkout');
      return true;
    }

    try {
      const token = await window.grecaptcha.execute(recaptchaSiteKey, { action });
      
      const { data, error } = await supabase.functions.invoke('verify-recaptcha', {
        body: { token }
      });

      if (error || !data?.success) {
        console.warn('reCAPTCHA verification failed, allowing checkout in production');
        // Em produção, logar mas não bloquear para evitar falsos positivos
        return true;
      }

      console.log('reCAPTCHA verified successfully, score:', data.score);
      return true;
    } catch (error) {
      console.error('reCAPTCHA error:', error);
      return true;
    }
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

    // Verificar reCAPTCHA antes de processar
    const recaptchaValid = await verifyRecaptcha('pix_payment');
    if (!recaptchaValid) {
      setLoading(false);
      return;
    }

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
    
    setLoading(true);
    
    // Verificar reCAPTCHA antes de mostrar formulário de cartão
    const recaptchaValid = await verifyRecaptcha('card_payment');
    if (!recaptchaValid) {
      setLoading(false);
      return;
    }
    
    setLoading(false);
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

    // Verificar reCAPTCHA antes de processar
    const recaptchaValid = await verifyRecaptcha('boleto_payment');
    if (!recaptchaValid) {
      setLoading(false);
      return;
    }

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
    <div className="space-y-5">
      {/* Header de Segurança - Primeira impressão */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Lock className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-bold text-sm md:text-base">Ambiente 100% Seguro</span>
          <Lock className="w-5 h-5 text-green-600" />
        </div>
        <p className="text-green-700 text-xs md:text-sm">
          Seus dados estão protegidos com criptografia de ponta a ponta
        </p>
      </div>

      {/* Preço em Destaque */}
      <div className="text-center py-4 bg-slate-50 rounded-xl border">
        <img src={logoBlue} alt="Informática na Prática" className="h-10 mx-auto mb-3" />
        <div className="text-4xl md:text-5xl font-black text-primary mb-1">
          R$ {coursePrice.toFixed(2).replace('.', ',')}
        </div>
        <div className="text-lg md:text-xl font-bold text-accent">
          ou 12x de R$ 30,22
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          Acesso completo por 2 anos • Certificado incluso
        </div>
      </div>

      {/* Logos de Cartões e Selos de Confiança */}
      <div className="flex flex-wrap items-center justify-center gap-3 py-3">
        {/* Bandeiras de Cartão */}
        <div className="flex items-center gap-2 px-3 py-2 bg-white border rounded-lg shadow-sm">
          <svg viewBox="0 0 48 48" className="w-8 h-8"><rect fill="#1565C0" width="48" height="48" rx="4"/><path fill="#FFF" d="M21.7 25.2l1.4-8.5h2.2l-1.4 8.5zM32.9 17c-.4-.2-1.1-.4-2-.4-2.2 0-3.7 1.1-3.7 2.8 0 1.2 1.1 1.9 2 2.3.9.4 1.2.7 1.2 1.1 0 .6-.7.9-1.4.9-1 0-1.5-.1-2.3-.5l-.3-.1-.3 2c.6.3 1.6.5 2.7.5 2.3 0 3.8-1.1 3.8-2.9 0-1-.6-1.7-1.9-2.3-.8-.4-1.3-.7-1.3-1.1 0-.4.4-.8 1.3-.8.7 0 1.3.1 1.7.3l.2.1.3-1.9zM37 16.7h-1.7c-.5 0-.9.1-1.1.6l-3.2 7.9h2.3l.5-1.3h2.8l.3 1.3h2l-1.9-8.5zm-2.7 5.5l.9-2.4.5 2.4h-1.4zM18.1 16.7l-2.2 5.8-.2-1.2c-.4-1.4-1.7-2.9-3.1-3.6l1.9 7.4h2.3l3.5-8.5h-2.2z"/><path fill="#FFC107" d="M13.5 16.7H9.8l-.1.2c2.8.7 4.6 2.4 5.4 4.5l-.8-4c-.1-.5-.5-.6-1-.7z"/></svg>
          <svg viewBox="0 0 48 48" className="w-8 h-8"><rect fill="#FF5722" width="48" height="48" rx="4"/><circle cx="19" cy="24" r="10" fill="#FF9800"/><circle cx="29" cy="24" r="10" fill="#F44336"/><path fill="#FF5722" d="M24 17c2.4 1.8 4 4.6 4 7.9s-1.6 6.1-4 7.9c-2.4-1.8-4-4.6-4-7.9s1.6-6.1 4-7.9z"/></svg>
          <svg viewBox="0 0 48 48" className="w-8 h-8"><rect fill="#1A1F71" width="48" height="48" rx="4"/><path fill="#FFF" d="M11 31h4l2.5-14h-4L11 31zm23.5-14l-3.8 9.6-.4-2-.3-1.5c-.6-1.9-2.3-4-4.3-5l3.2 12.9h4.2l6.2-14h-4.8zm-11.5 0h-3.8l-.1.3c5 1.3 8.3 4.4 9.7 8.1l-1.4-7c-.2-.9-.9-1.3-1.7-1.4h-2.7z"/></svg>
          <svg viewBox="0 0 48 48" className="w-8 h-8"><rect fill="#26A69A" width="48" height="48" rx="4"/><text x="24" y="28" textAnchor="middle" fill="#FFF" fontSize="10" fontWeight="bold">ELO</text></svg>
        </div>
        
        {/* Selo Mercado Pago */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#00AEEF]/10 border border-[#00AEEF]/30 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-[#00AEEF]" />
          <span className="text-[#00AEEF] text-xs font-bold">Mercado Pago</span>
        </div>
      </div>

      {/* Formulário - Campos preservados */}
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs md:text-sm font-semibold text-foreground">Nome Completo *</Label>
          <Input
            id="name"
            placeholder="Digite seu nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading || !sdkLoaded}
            className="h-11 text-base border-2 border-slate-200 focus:border-primary rounded-lg"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs md:text-sm font-semibold text-foreground">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading || !sdkLoaded}
            className="h-11 text-base border-2 border-slate-200 focus:border-primary rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label htmlFor="cpf" className="text-xs md:text-sm font-semibold text-foreground">CPF *</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
              maxLength={14}
              disabled={loading || !sdkLoaded}
              className="h-11 text-base border-2 border-slate-200 focus:border-primary rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone" className="text-xs md:text-sm font-semibold text-foreground">Telefone *</Label>
            <Input
              id="phone"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
              maxLength={15}
              disabled={loading || !sdkLoaded}
              className="h-11 text-base border-2 border-slate-200 focus:border-primary rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Aviso sobre envio dos dados de acesso */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
        <p className="text-xs text-blue-700 text-center flex items-center justify-center gap-2">
          <span>📧</span>
          <span>Após o pagamento, você receberá os dados de acesso no e-mail informado.</span>
        </p>
      </div>

      {/* Título das Opções */}
      <div>
        <h3 className="text-sm font-bold text-center text-foreground mb-3">Escolha como pagar</h3>
      </div>

      {/* Opções de Pagamento - Design limpo */}
      <div className="grid grid-cols-3 gap-2">
        {/* Cartão */}
        <button
          onClick={handleCardPayment}
          disabled={loading || !sdkLoaded}
          className="flex flex-col items-center justify-center gap-2 p-3 md:p-4 rounded-xl border-2 border-slate-200 hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm"
        >
          <div className="p-2 rounded-full bg-primary/10">
            <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <div className="text-center">
            <div className="font-bold text-xs md:text-sm text-foreground">Cartão</div>
            <div className="text-[10px] md:text-xs text-primary font-semibold">até 12x</div>
          </div>
        </button>

        {/* PIX */}
        <button
          onClick={handlePixPayment}
          disabled={loading || !sdkLoaded}
          className="flex flex-col items-center justify-center gap-2 p-3 md:p-4 rounded-xl border-2 border-slate-200 hover:border-success hover:bg-success/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm"
        >
          <div className="p-2 rounded-full bg-success/10">
            <Smartphone className="w-5 h-5 md:w-6 md:h-6 text-success" />
          </div>
          <div className="text-center">
            <div className="font-bold text-xs md:text-sm text-foreground">PIX</div>
            <div className="text-[10px] md:text-xs text-success font-semibold">Imediato</div>
          </div>
        </button>

        {/* Boleto */}
        <button
          onClick={() => handleOtherPayment('boleto')}
          disabled={loading || !sdkLoaded}
          className="flex flex-col items-center justify-center gap-2 p-3 md:p-4 rounded-xl border-2 border-slate-200 hover:border-warning hover:bg-warning/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm"
        >
          <div className="p-2 rounded-full bg-warning/10">
            <Receipt className="w-5 h-5 md:w-6 md:h-6 text-warning" />
          </div>
          <div className="text-center">
            <div className="font-bold text-xs md:text-sm text-foreground">Boleto</div>
            <div className="text-[10px] md:text-xs text-warning font-semibold">3 dias</div>
          </div>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-3">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processando...</span>
        </div>
      )}

      {!sdkLoaded && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground py-3">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Carregando...</span>
        </div>
      )}

      {/* Selos de Confiança no Rodapé */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-green-600" />
            <span>Compra Segura</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-green-600" />
            <span>Dados Protegidos</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>Garantia 7 Dias</span>
          </div>
        </div>
      </div>
    </div>
  );
};
