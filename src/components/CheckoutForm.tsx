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

  // Salvar lead quando formulário é validado
  const saveLead = async () => {
    try {
      const cleanCPF = formData.cpf.replace(/\D/g, '');
      const cleanPhone = formData.phone.replace(/\D/g, '');
      const email = formData.email.trim().toLowerCase();
      
      // Verificar se lead já existe
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingLead) {
        // Atualizar lead existente
        const { error } = await supabase
          .from('leads')
          .update({
            name: formData.name.trim(),
            phone: cleanPhone || null,
            cpf: cleanCPF || null,
          })
          .eq('id', existingLead.id);

        if (error) {
          console.error('Error updating lead:', error);
        } else {
          console.log('✅ Lead atualizado:', email);
        }
      } else {
        // Inserir novo lead
        const { error } = await supabase
          .from('leads')
          .insert({
            name: formData.name.trim(),
            email: email,
            phone: cleanPhone || null,
            cpf: cleanCPF || null,
            source: 'checkout',
            converted: false
          });

        if (error) {
          console.error('Error saving lead:', error);
        } else {
          console.log('✅ Lead salvo:', email);
        }
      }
    } catch (error) {
      console.error('Error saving lead:', error);
    }
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

    // Salvar lead após validação bem-sucedida
    saveLead();

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
      <div className="space-y-4">
        {/* Header com botão voltar */}
        <div className="flex items-center pb-4 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCardPayment(false)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-foreground">Pagamento com Cartão</h3>
          <p className="text-sm text-muted-foreground">
            Parcele em até 12x
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
          <p className="text-sm text-blue-900">
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
        {/* Header com botão voltar */}
        <div className="flex items-center pb-4 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setPixData(null);
              setLoading(false);
            }}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
        </div>

        {/* Faixa de confirmação */}
        <div className="bg-success/10 border border-success/30 rounded-lg px-4 py-3 text-center">
          <p className="text-sm text-success font-medium flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Acesso enviado no seu e-mail após a compra!
          </p>
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

  // Formulário inicial - otimizado para conversão
  return (
    <div className="space-y-3">
      {/* Formulário compacto 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-xs font-semibold text-foreground">Nome Completo</Label>
          <Input
            id="name"
            placeholder="Seu nome"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading || !sdkLoaded}
            className="h-10 text-sm border-2 focus:border-primary"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs font-semibold text-foreground">E-mail</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading || !sdkLoaded}
            className="h-10 text-sm border-2 focus:border-primary"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="cpf" className="text-xs font-semibold text-foreground">CPF</Label>
          <Input
            id="cpf"
            placeholder="000.000.000-00"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
            maxLength={14}
            disabled={loading || !sdkLoaded}
            className="h-10 text-sm border-2 focus:border-primary"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="phone" className="text-xs font-semibold text-foreground">Telefone</Label>
          <Input
            id="phone"
            placeholder="(11) 99999-9999"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
            maxLength={15}
            disabled={loading || !sdkLoaded}
            className="h-10 text-sm border-2 focus:border-primary"
          />
        </div>
      </div>

      {/* CTA Principal - PIX em destaque */}
      <div className="space-y-2 pt-1">
        <button
          onClick={handlePixPayment}
          disabled={loading || !sdkLoaded}
          className="w-full flex items-center justify-center gap-3 bg-success hover:bg-success/90 text-white font-bold text-base md:text-lg py-4 rounded-xl shadow-lg shadow-success/30 hover:shadow-success/50 hover:scale-[1.01] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Smartphone className="w-5 h-5" />
              Pagar com PIX - Acesso Imediato
            </>
          )}
        </button>

        {/* Opções secundárias */}
        <div className="flex gap-2">
          <button
            onClick={handleCardPayment}
            disabled={loading || !sdkLoaded}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 text-sm font-semibold"
          >
            <CreditCard className="w-4 h-4 text-primary" />
            <span>Cartão <span className="hidden md:inline">12x</span></span>
          </button>
          
          <button
            onClick={() => handleOtherPayment('boleto')}
            disabled={loading || !sdkLoaded}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 border-border hover:border-warning hover:bg-warning/5 transition-all disabled:opacity-50 text-sm font-semibold"
          >
            <Receipt className="w-4 h-4 text-warning" />
            Boleto
          </button>
        </div>
      </div>

      {/* Loading SDK */}
      {!sdkLoaded && (
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Carregando...</span>
        </div>
      )}
    </div>
  );
};
