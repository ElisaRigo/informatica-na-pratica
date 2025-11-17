import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, Lock, CreditCard, Smartphone, Receipt, CheckCircle2, Copy, X, ArrowLeft } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";
import { CardPaymentBrickTest } from "./CardPaymentBrickTest";

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

export const CheckoutFormTest = () => {
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
  const coursePrice = 5.00; // Valor fixo para teste - R$ 5,00
  const [showCardPayment, setShowCardPayment] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [recaptchaSiteKey, setRecaptchaSiteKey] = useState<string>('');

  // Carregar reCAPTCHA
  useEffect(() => {
    const loadRecaptcha = async () => {
      try {
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
        const { data: keyData } = await supabase.functions.invoke('get-mp-public-key');
        
        if (keyData?.MERCADO_PAGO_PUBLIC_KEY) {
          const mp = new window.MercadoPago(keyData.MERCADO_PAGO_PUBLIC_KEY, {
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

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/(\d{5})(\d)/, '$1-$2');
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive"
      });
      return false;
    }

    const cpfNumbers = formData.cpf.replace(/\D/g, '');
    if (cpfNumbers.length !== 11) {
      toast({
        title: "CPF inválido",
        description: "Por favor, insira um CPF válido com 11 dígitos.",
        variant: "destructive"
      });
      return false;
    }

    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (phoneNumbers.length < 10) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, insira um telefone válido.",
        variant: "destructive"
      });
      return false;
    }

    const cepNumbers = formData.cep.replace(/\D/g, '');
    if (cepNumbers.length !== 8) {
      toast({
        title: "CEP inválido",
        description: "Por favor, insira um CEP válido com 8 dígitos.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const verifyRecaptcha = async (action: string): Promise<boolean> => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Skipping reCAPTCHA in development');
      return true;
    }

    if (!recaptchaLoaded || !window.grecaptcha || !recaptchaSiteKey) {
      console.error('reCAPTCHA not loaded or missing site key');
      return true;
    }

    try {
      const token = await window.grecaptcha.execute(recaptchaSiteKey, { action });
      
      const { data, error } = await supabase.functions.invoke('verify-recaptcha', {
        body: { token, action }
      });

      if (error) {
        console.error('reCAPTCHA verification error:', error);
        return false;
      }

      return data?.success || false;
    } catch (error) {
      console.error('reCAPTCHA execution error:', error);
      return false;
    }
  };

  const handlePixPayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const isHuman = await verifyRecaptcha('pix_payment');
      if (!isHuman) {
        toast({
          title: "Verificação falhou",
          description: "Por favor, tente novamente.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-pix-payment', {
        body: {
          ...formData,
          amount: coursePrice
        }
      });

      if (error) throw error;

      if (data?.paymentId && data?.qrCode && data?.qrCodeBase64) {
        setPixData({
          paymentId: data.paymentId,
          qrCode: data.qrCode,
          qrCodeBase64: data.qrCodeBase64,
          ticketUrl: data.ticketUrl,
          expirationDate: data.expirationDate
        });

        toast({
          title: "PIX gerado!",
          description: "Escaneie o QR Code ou copie o código para pagar.",
        });

        const checkInterval = setInterval(async () => {
          try {
            const { data: payment } = await supabase
              .from('payments')
              .select('status')
              .eq('pagseguro_transaction_id', data.paymentId)
              .single();

            if (payment?.status === 'approved' || payment?.status === 'paid') {
              clearInterval(checkInterval);
              window.location.href = '/obrigada';
            }
          } catch (error) {
            console.error('Error checking payment:', error);
          }
        }, 5000);

        setTimeout(() => clearInterval(checkInterval), 15 * 60 * 1000);
      }
    } catch (error: any) {
      console.error('Error creating PIX payment:', error);
      toast({
        title: "Erro ao gerar PIX",
        description: error.message || "Tente novamente em instantes.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCardPayment = async () => {
    if (!validateForm()) return;
    
    const isHuman = await verifyRecaptcha('card_payment');
    if (!isHuman) {
      toast({
        title: "Verificação falhou",
        description: "Por favor, tente novamente.",
        variant: "destructive"
      });
      return;
    }

    setShowCardPayment(true);
  };

  const handleOtherPayment = async (method: 'boleto') => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const isHuman = await verifyRecaptcha(`${method}_payment`);
      if (!isHuman) {
        toast({
          title: "Verificação falhou",
          description: "Por favor, tente novamente.",
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('mercado-pago-checkout', {
        body: {
          ...formData,
          paymentMethod: method
        }
      });

      if (error) throw error;

      if (data?.initPoint) {
        window.location.href = data.initPoint;
      }
    } catch (error: any) {
      console.error('Error creating payment:', error);
      toast({
        title: "Erro ao processar",
        description: error.message || "Tente novamente em instantes.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const copyPixCode = () => {
    if (pixData?.qrCode) {
      navigator.clipboard.writeText(pixData.qrCode);
      toast({
        title: "Copiado!",
        description: "Código PIX copiado para a área de transferência.",
      });
    }
  };

  const checkPaymentStatus = async () => {
    if (!pixData?.paymentId) return;

    setCheckingPayment(true);
    try {
      const { data: payment } = await supabase
        .from('payments')
        .select('status')
        .eq('pagseguro_transaction_id', pixData.paymentId)
        .maybeSingle();

      if (payment?.status === 'approved' || payment?.status === 'paid') {
        toast({
          title: "Pagamento confirmado! 🎉",
          description: "Redirecionando...",
        });
        setTimeout(() => {
          window.location.href = '/obrigada';
        }, 1500);
      } else {
        toast({
          title: "Aguardando pagamento",
          description: "Ainda não identificamos seu pagamento. Aguarde alguns instantes.",
        });
      }
    } catch (error) {
      console.error('Error checking payment:', error);
      toast({
        title: "Erro ao verificar",
        description: "Tente novamente em instantes.",
        variant: "destructive"
      });
    } finally {
      setCheckingPayment(false);
    }
  };

  if (showCardPayment) {
    return (
      <div className="space-y-6">
        <Button
          onClick={() => setShowCardPayment(false)}
          variant="ghost"
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        
        <CardPaymentBrickTest
          formData={formData}
          amount={coursePrice}
          onSuccess={() => {
            console.log('Payment successful');
          }}
          onError={(error) => {
            console.error('Payment error:', error);
            setShowCardPayment(false);
          }}
        />
      </div>
    );
  }

  if (pixData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
          <Button
            onClick={() => setPixData(null)}
            variant="ghost"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Button
            onClick={() => setPixData(null)}
            variant="ghost"
            size="sm"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="text-center space-y-4">
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-primary mb-2">PIX gerado com sucesso! 🎉</h3>
            <p className="text-sm text-muted-foreground">
              Escaneie o QR Code ou copie o código abaixo para fazer o pagamento
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border-2 border-primary/20">
            <img 
              src={`data:image/png;base64,${pixData.qrCodeBase64}`}
              alt="QR Code PIX"
              className="mx-auto w-64 h-64"
            />
          </div>

          {/* Valor a pagar */}
          <div className="text-center py-3">
            <p className="text-sm text-muted-foreground mb-1">Valor a pagar</p>
            <p className="text-4xl font-black text-primary">
              R$ {coursePrice.toFixed(2).replace('.', ',')}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={pixData.qrCode}
                readOnly
                className="font-mono text-xs"
              />
              <Button onClick={copyPixCode} size="icon" variant="outline">
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            <Button
              onClick={checkPaymentStatus}
              disabled={checkingPayment}
              className="w-full"
              variant="outline"
            >
              {checkingPayment ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verificando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Já fiz o pagamento
                </>
              )}
            </Button>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-semibold flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Instruções de Pagamento
            </p>
            <ol className="text-xs text-left space-y-2 text-muted-foreground">
              <li>1. Abra o app do seu banco</li>
              <li>2. Escolha pagar com PIX</li>
              <li>3. Escaneie o QR Code ou cole o código</li>
              <li>4. Confirme o pagamento</li>
              <li>5. Pronto! Você receberá acesso imediato</li>
            </ol>
          </div>

          {pixData.expirationDate && (
            <p className="text-xs text-muted-foreground">
              ⏰ Este QR Code expira em {new Date(pixData.expirationDate).toLocaleString('pt-BR')}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Valor do Curso */}
      <div className="text-center py-4 bg-primary/5 rounded-lg border-2 border-primary/20">
        <div className="text-4xl font-black text-primary mb-1">
          R$ {coursePrice.toFixed(2).replace('.', ',')}
        </div>
        <div className="text-sm text-muted-foreground">
          Acesso completo por 2 anos • Certificado incluso
        </div>
        <div className="text-xs text-primary font-semibold mt-1">
          Parcele em até 12x no cartão
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Seu nome completo"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="seu@email.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            value={formData.cpf}
            onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
            placeholder="000.000.000-00"
            maxLength={14}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
            placeholder="(00) 00000-0000"
            maxLength={15}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cep">CEP *</Label>
          <Input
            id="cep"
            value={formData.cep}
            onChange={(e) => setFormData({ ...formData, cep: formatCEP(e.target.value) })}
            placeholder="00000-000"
            maxLength={9}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="street">Rua *</Label>
          <Input
            id="street"
            value={formData.street}
            onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            placeholder="Nome da rua"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="number">Número *</Label>
          <Input
            id="number"
            value={formData.number}
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            placeholder="123"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="complement">Complemento</Label>
          <Input
            id="complement"
            value={formData.complement}
            onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
            placeholder="Apto, bloco, etc"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="neighborhood">Bairro *</Label>
          <Input
            id="neighborhood"
            value={formData.neighborhood}
            onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
            placeholder="Nome do bairro"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="Nome da cidade"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">Estado *</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
            placeholder="SP"
            maxLength={2}
            required
          />
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-bold text-center mb-4">Escolha a forma de pagamento</h3>
        
        <div className="grid gap-3">
          <Button
            onClick={handleCardPayment}
            disabled={loading || !sdkLoaded}
            className="w-full h-auto py-4 text-left justify-between"
            variant="outline"
          >
            <div className="flex items-center flex-1">
              <CreditCard className="w-6 h-6 mr-3 text-primary" />
              <div className="flex-1">
                <div className="font-bold">Cartão de Crédito</div>
                <div className="text-xs text-muted-foreground">Parcelamento em até 12x</div>
              </div>
            </div>
            <div className="text-right ml-3">
              <div className="font-bold text-primary">R$ {coursePrice.toFixed(2).replace('.', ',')}</div>
            </div>
          </Button>

          <Button
            onClick={handlePixPayment}
            disabled={loading || !sdkLoaded}
            className="w-full h-auto py-4 text-left justify-between"
            variant="outline"
          >
            <div className="flex items-center flex-1">
              <Smartphone className="w-6 h-6 mr-3 text-primary" />
              <div className="flex-1">
                <div className="font-bold">PIX</div>
                <div className="text-xs text-muted-foreground">Aprovação imediata</div>
              </div>
            </div>
            <div className="text-right ml-3">
              <div className="font-bold text-primary">R$ {coursePrice.toFixed(2).replace('.', ',')}</div>
            </div>
          </Button>

          <Button
            onClick={() => handleOtherPayment('boleto')}
            disabled={loading || !sdkLoaded}
            className="w-full h-auto py-4 text-left justify-between"
            variant="outline"
          >
            <div className="flex items-center flex-1">
              <Receipt className="w-6 h-6 mr-3 text-primary" />
              <div className="flex-1">
                <div className="font-bold">Boleto</div>
                <div className="text-xs text-muted-foreground">Vence em 3 dias úteis</div>
              </div>
            </div>
            <div className="text-right ml-3">
              <div className="font-bold text-primary">R$ {coursePrice.toFixed(2).replace('.', ',')}</div>
            </div>
          </Button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-2 text-sm">Processando...</span>
        </div>
      )}

      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Ambiente seguro</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-4 h-4" />
          <span>Dados protegidos</span>
        </div>
      </div>

      <div className="flex justify-center">
        <img src={logoBlue} alt="Logo" className="h-8 opacity-50" />
      </div>
    </div>
  );
};