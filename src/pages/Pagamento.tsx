import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, ShieldCheck, Lock, CreditCard, Smartphone, Receipt, 
  CheckCircle2, Copy, ArrowLeft, Star, Shield, Clock 
} from "lucide-react";
import { CardPaymentBrick } from "@/components/CardPaymentBrick";

// Assets
import elisaPhoto from "@/assets/elisa-photo.jpg";
import heroVideoCover from "@/assets/hero-video-cover-curso.jpg";

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

const Pagamento = () => {
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
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | 'boleto' | null>(null);

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
      
      const { data: existingLead } = await supabase
        .from('leads')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingLead) {
        await supabase
          .from('leads')
          .update({
            name: formData.name.trim(),
            phone: cleanPhone || null,
            cpf: cleanCPF || null,
          })
          .eq('id', existingLead.id);
        console.log('✅ Lead atualizado:', email);
      } else {
        await supabase
          .from('leads')
          .insert({
            name: formData.name.trim(),
            email: email,
            phone: cleanPhone || null,
            cpf: cleanCPF || null,
            source: 'pagamento',
            converted: false
          });
        console.log('✅ Lead salvo:', email);
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

    saveLead();
    return true;
  };

  const verifyRecaptcha = async (action: string): Promise<boolean> => {
    const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                         window.location.hostname === 'www.informaticanapratica.com.br';
    
    if (!isProduction) {
      return true;
    }

    if (!recaptchaLoaded || !recaptchaSiteKey) {
      return true;
    }

    try {
      const token = await window.grecaptcha.execute(recaptchaSiteKey, { action });
      
      const { data, error } = await supabase.functions.invoke('verify-recaptcha', {
        body: { token }
      });

      if (error || !data?.success) {
        return true;
      }

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

    const recaptchaValid = await verifyRecaptcha('pix_payment');
    if (!recaptchaValid) {
      setLoading(false);
      return;
    }

    try {
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

      setPixData(data);

      toast({
        title: "PIX gerado!",
        description: "Escaneie o QR Code ou copie o código para pagar",
      });

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
    
    const recaptchaValid = await verifyRecaptcha('card_payment');
    if (!recaptchaValid) {
      setLoading(false);
      return;
    }
    
    setLoading(false);
    setShowCardPayment(true);
    setPaymentMethod('card');
  };

  const handleBoletoPayment = async () => {
    if (!validateForm()) return;
    if (!sdkLoaded) {
      toast({
        title: "Aguarde",
        description: "Sistema de pagamento ainda carregando...",
      });
      return;
    }

    setLoading(true);

    const recaptchaValid = await verifyRecaptcha('boleto_payment');
    if (!recaptchaValid) {
      setLoading(false);
      return;
    }

    try {
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

      toast({
        title: "Redirecionando...",
        description: "Você será redirecionado para o pagamento seguro",
      });

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

  // Calcular parcelas
  const installmentValue = (coursePrice / 12).toFixed(2).replace('.', ',');

  return (
    <>
      <Helmet>
        <title>Checkout - Curso Informática na Prática</title>
        <meta name="description" content="Finalize sua inscrição no Curso Completo de Informática na Prática" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 py-3 px-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-slate-600">Checkout Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-success" />
              <span className="text-sm text-slate-500">Ambiente Protegido</span>
            </div>
          </div>
        </header>

        {/* Banner Hero */}
        <div 
          className="relative w-full h-48 md:h-64 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroVideoCover})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Informática na Prática</h1>
              <p className="text-lg opacity-90">Professora Elisangela Néri Rigo</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            
            {/* Left Column - Form */}
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 order-2 lg:order-1">
              
              {/* Product Info Card */}
              <div className="flex gap-4 pb-6 border-b border-slate-200 mb-6">
                <img 
                  src={elisaPhoto} 
                  alt="Professora Elisangela" 
                  className="w-20 h-20 rounded-xl object-cover shadow-md"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800 mb-1">
                    Curso Completo de Informática na Prática
                  </h2>
                  <p className="text-sm text-slate-500 mb-2">Do Zero ao Avançado</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-primary">
                      R$ {coursePrice.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-sm text-slate-400 line-through">R$ 497,00</span>
                  </div>
                  <p className="text-xs text-success font-medium mt-1">
                    ou 12x de R$ {installmentValue}
                  </p>
                </div>
              </div>

              {/* PIX Screen */}
              {pixData ? (
                <div className="space-y-6">
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

                  <div className="bg-success/10 border border-success/30 rounded-lg px-4 py-3 text-center">
                    <p className="text-sm text-success font-medium flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Acesso enviado no seu e-mail após a compra!
                    </p>
                  </div>

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

                    <div className="flex justify-center py-6">
                      <div className="p-4 bg-white rounded-xl shadow-lg border">
                        <img
                          src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                          alt="QR Code PIX"
                          className="w-64 h-64"
                        />
                      </div>
                    </div>

                    <div className="text-center p-4 bg-slate-50 rounded-lg">
                      <div className="text-sm text-slate-500">Valor a pagar</div>
                      <div className="text-3xl font-black text-primary mt-1">
                        R$ {coursePrice.toFixed(2).replace('.', ',')}
                      </div>
                    </div>

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

                    <div className="text-left space-y-2 p-4 bg-slate-50 rounded-lg text-sm">
                      <p className="font-semibold">Como pagar:</p>
                      <ol className="list-decimal list-inside space-y-1 text-slate-600">
                        <li>Abra o app do seu banco</li>
                        <li>Escolha pagar com PIX</li>
                        <li>Escaneie o QR Code ou cole o código</li>
                        <li>Confirme o pagamento</li>
                        <li>Pronto! Você receberá o acesso por e-mail</li>
                      </ol>
                    </div>

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
                  </div>
                </div>
              ) : showCardPayment ? (
                /* Card Payment Screen */
                <div className="space-y-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowCardPayment(false);
                      setPaymentMethod(null);
                    }}
                    className="gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Voltar
                  </Button>

                  <div className="text-center space-y-1">
                    <h3 className="text-xl font-bold text-slate-800">Pagamento com Cartão</h3>
                    <p className="text-sm text-slate-500">
                      Parcele em até 12x
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                    <p className="text-sm text-blue-900">
                      💳 Digite o número do cartão para ver as opções de parcelamento
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
                </div>
              ) : (
                /* Form Screen */
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-semibold text-slate-700">
                        Nome completo
                      </Label>
                      <Input
                        id="name"
                        placeholder="Digite seu nome completo"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={loading || !sdkLoaded}
                        className="h-12 text-base border-2 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cpf" className="text-sm font-semibold text-slate-700">
                        CPF
                      </Label>
                      <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                        maxLength={14}
                        disabled={loading || !sdkLoaded}
                        className="h-12 text-base border-2 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={loading || !sdkLoaded}
                        className="h-12 text-base border-2 focus:border-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                        Celular
                      </Label>
                      <Input
                        id="phone"
                        placeholder="(11) 99999-9999"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                        maxLength={15}
                        disabled={loading || !sdkLoaded}
                        className="h-12 text-base border-2 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Lock className="w-3 h-3" />
                    <span>Seus dados estão protegidos e não serão compartilhados</span>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <p className="text-sm font-semibold text-slate-700">
                      Escolha a forma de pagamento
                    </p>

                    {/* PIX Button - Primary */}
                    <button
                      onClick={handlePixPayment}
                      disabled={loading || !sdkLoaded}
                      className="w-full flex items-center justify-center gap-3 bg-success hover:bg-success/90 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <Smartphone className="w-5 h-5" />
                          Pagar com PIX
                        </>
                      )}
                    </button>

                    {/* Card Button */}
                    <button
                      onClick={handleCardPayment}
                      disabled={loading || !sdkLoaded}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-slate-300 hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 text-slate-700 font-semibold"
                    >
                      <CreditCard className="w-5 h-5" />
                      Cartão de Crédito (até 12x)
                    </button>

                    {/* Boleto Button */}
                    <button
                      onClick={handleBoletoPayment}
                      disabled={loading || !sdkLoaded}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-slate-300 hover:border-amber-500 hover:bg-amber-50 transition-all disabled:opacity-50 text-slate-700 font-semibold"
                    >
                      <Receipt className="w-5 h-5" />
                      Boleto Bancário
                    </button>
                  </div>

                  {!sdkLoaded && (
                    <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Carregando sistema de pagamento...</span>
                    </div>
                  )}
                </div>
              )}

              {/* Footer Trust */}
              <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-6 pt-4 border-t border-slate-100">
                <ShieldCheck className="w-4 h-4" />
                <span>Pagamento 100% Seguro • Processado pelo Mercado Pago</span>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-4 order-1 lg:order-2">
              {/* Product Image */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <img 
                  src={heroVideoCover} 
                  alt="Curso Informática na Prática" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                    <span className="text-sm text-slate-600 ml-2">+15.000 alunos</span>
                  </div>
                  <h3 className="font-bold text-slate-800">Curso Completo de Informática</h3>
                  <p className="text-sm text-slate-500 mt-1">Do básico ao avançado</p>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl shadow-xl p-5 space-y-3">
                <h4 className="font-bold text-slate-800 mb-3">O que você vai receber:</h4>
                
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Acesso vitalício ao curso completo</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">+100 aulas em vídeo</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Material de apoio em PDF</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Certificado de conclusão</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-600">Suporte direto com a professora</span>
                </div>
              </div>

              {/* Guarantee */}
              <div className="bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/30 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h4 className="font-bold text-success">Garantia de 7 dias</h4>
                    <p className="text-xs text-slate-600">100% do seu dinheiro de volta</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600">
                  Se você não gostar do curso por qualquer motivo, basta pedir reembolso em até 7 dias.
                </p>
              </div>

              {/* Urgency */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-amber-700 font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>Oferta por tempo limitado!</span>
                </div>
                <p className="text-xs text-amber-600 mt-1">
                  Aproveite o desconto especial antes que acabe
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-50 border-t border-slate-200 py-6 mt-8">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-500">
            <p>© 2024 Informática na Prática - Todos os direitos reservados</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <a href="/termos-de-uso" className="hover:text-primary">Termos de Uso</a>
              <a href="/politica-de-privacidade" className="hover:text-primary">Política de Privacidade</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Pagamento;
