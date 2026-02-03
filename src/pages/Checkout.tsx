import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, Lock, CreditCard, Smartphone, Receipt, CheckCircle2, Copy, ArrowLeft } from "lucide-react";
import { CardPaymentBrick } from "@/components/CardPaymentBrick";
import checkoutBannerElisa from "@/assets/checkout-banner-elisa.jpg";
import elisaCheckout from "@/assets/elisa-checkout.jpg";

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

const Checkout = () => {
  const { toast } = useToast();
  const hasTrackedRef = useRef(false);
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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'pix' | 'card' | 'boleto'>('card');

  // GA4 tracking
  useEffect(() => {
    if (!hasTrackedRef.current) {
      hasTrackedRef.current = true;
      
      const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                           window.location.hostname === 'www.informaticanapratica.com.br';
      
      if (!isProduction) return;

      const trackGA4Events = () => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'begin_checkout', {
            currency: 'BRL',
            value: 297.00,
            items: [{ item_name: 'Curso Informática na Prática', price: 297.00, quantity: 1 }]
          });
          (window as any).gtag('event', 'form_start', { form_name: 'checkout', currency: 'BRL', value: 297.00 });
          return true;
        }
        return false;
      };

      if (!trackGA4Events()) {
        let gaAttempts = 0;
        const gaInterval = setInterval(() => {
          gaAttempts++;
          if (trackGA4Events() || gaAttempts >= 50) clearInterval(gaInterval);
        }, 100);
      }
    }
  }, []);

  // Carregar SDKs
  useEffect(() => {
    setSdkLoaded(true);
    
    const loadScripts = async () => {
      const [keyResponse, priceResponse, recaptchaResponse] = await Promise.all([
        supabase.functions.invoke('get-mp-public-key').catch(() => ({ data: null })),
        supabase.functions.invoke('get-course-price').catch(() => ({ data: { price: 297 } })),
        supabase.functions.invoke('get-recaptcha-site-key').catch(() => ({ data: null }))
      ]);
      
      if (priceResponse.data?.price) setCoursePrice(priceResponse.data.price);
      
      if (recaptchaResponse.data?.siteKey) {
        setRecaptchaSiteKey(recaptchaResponse.data.siteKey);
        if (!document.querySelector('script[src*="recaptcha"]')) {
          const recaptchaScript = document.createElement('script');
          recaptchaScript.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaResponse.data.siteKey}`;
          recaptchaScript.async = true;
          recaptchaScript.onload = () => setRecaptchaLoaded(true);
          document.body.appendChild(recaptchaScript);
        }
      }
      
      if (!window.MercadoPago && !document.querySelector('script[src*="mercadopago"]')) {
        const mpScript = document.createElement('script');
        mpScript.src = 'https://sdk.mercadopago.com/js/v2';
        mpScript.async = true;
        mpScript.onload = () => {
          if (keyResponse.data?.MERCADO_PAGO_PUBLIC_KEY && window.MercadoPago) {
            const mp = new window.MercadoPago(keyResponse.data.MERCADO_PAGO_PUBLIC_KEY, { locale: 'pt-BR' });
            setMpInstance(mp);
          }
        };
        document.body.appendChild(mpScript);
      } else if (window.MercadoPago && keyResponse.data?.MERCADO_PAGO_PUBLIC_KEY) {
        const mp = new window.MercadoPago(keyResponse.data.MERCADO_PAGO_PUBLIC_KEY, { locale: 'pt-BR' });
        setMpInstance(mp);
      }
    };

    loadScripts();
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
        await supabase.from('leads').update({
          name: formData.name.trim(),
          phone: cleanPhone || null,
          cpf: cleanCPF || null,
        }).eq('id', existingLead.id);
      } else {
        await supabase.from('leads').insert({
          name: formData.name.trim(),
          email: email,
          phone: cleanPhone || null,
          cpf: cleanCPF || null,
          source: 'checkout-page',
          converted: false
        });
      }
    } catch (error) {
      console.error('Error saving lead:', error);
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.cpf || !formData.phone) {
      toast({ title: "Preencha todos os campos", description: "Todos os campos são obrigatórios", variant: "destructive" });
      return false;
    }

    const cleanCPF = formData.cpf.replace(/\D/g, '');
    if (cleanCPF.length !== 11) {
      toast({ title: "CPF inválido", description: "Digite um CPF válido com 11 dígitos", variant: "destructive" });
      return false;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length !== 11) {
      toast({ title: "Telefone inválido", description: "Digite um telefone válido com DDD", variant: "destructive" });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "E-mail inválido", description: "Digite um e-mail válido", variant: "destructive" });
      return false;
    }

    saveLead();
    return true;
  };

  const verifyRecaptcha = async (action: string): Promise<boolean> => {
    const isProduction = window.location.hostname === 'informaticanapratica.com.br' || 
                         window.location.hostname === 'www.informaticanapratica.com.br';
    if (!isProduction || !recaptchaLoaded || !recaptchaSiteKey) return true;

    try {
      const token = await window.grecaptcha.execute(recaptchaSiteKey, { action });
      const { data } = await supabase.functions.invoke('verify-recaptcha', { body: { token } });
      return data?.success ?? true;
    } catch {
      return true;
    }
  };

  const handlePixPayment = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const recaptchaValid = await verifyRecaptcha('pix_payment');
    if (!recaptchaValid) { setLoading(false); return; }

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
      if (!data?.qrCode) throw new Error('Erro ao gerar PIX');

      setPixData(data);
      toast({ title: "PIX gerado!", description: "Escaneie o QR Code ou copie o código" });

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
            toast({ title: "✅ Pagamento confirmado!", description: "Redirecionando..." });
            setTimeout(() => { window.location.href = '/obrigada'; }, 1500);
          }
        } catch {}
      }, 5000);

      setTimeout(() => clearInterval(intervalId), 600000);
    } catch (error: any) {
      toast({ title: "Erro", description: error.message || "Erro ao gerar PIX", variant: "destructive" });
      setLoading(false);
    }
  };

  const handleCardPayment = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const recaptchaValid = await verifyRecaptcha('card_payment');
    if (!recaptchaValid) { setLoading(false); return; }
    setLoading(false);
    setShowCardPayment(true);
  };

  const handleBoletoPayment = async () => {
    if (!validateForm()) return;
    setLoading(true);

    const recaptchaValid = await verifyRecaptcha('boleto_payment');
    if (!recaptchaValid) { setLoading(false); return; }

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
      if (!data?.initPoint) throw new Error('Erro ao criar checkout');

      toast({ title: "Redirecionando...", description: "Pagamento seguro" });
      setTimeout(() => { window.location.href = data.initPoint; }, 1000);
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      setLoading(false);
    }
  };

  const copyPixCode = () => {
    if (pixData?.qrCode) {
      navigator.clipboard.writeText(pixData.qrCode);
      toast({ title: "Copiado!", description: "Código PIX copiado" });
    }
  };

  const handleSubmit = () => {
    if (selectedPaymentMethod === 'pix') handlePixPayment();
    else if (selectedPaymentMethod === 'card') handleCardPayment();
    else if (selectedPaymentMethod === 'boleto') handleBoletoPayment();
  };

  // Tela de pagamento PIX
  if (pixData) {
    return (
      <div className="min-h-screen bg-panel">
        <div className="container mx-auto px-4 py-8 max-w-md">
          <div className="bg-white rounded-xl p-6 shadow-card">
            <h2 className="text-xl font-bold text-center mb-4">Pague com PIX</h2>
            <div className="flex justify-center mb-4">
              <img src={`data:image/png;base64,${pixData.qrCodeBase64}`} alt="QR Code PIX" className="w-48 h-48" />
            </div>
            <Button onClick={copyPixCode} className="w-full mb-4" variant="outline">
              <Copy className="w-4 h-4 mr-2" /> Copiar código PIX
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              Após o pagamento, você será redirecionado automaticamente
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tela de cartão
  if (showCardPayment) {
    return (
      <div className="min-h-screen bg-panel">
        <div className="container mx-auto px-4 py-8 max-w-lg">
          <div className="bg-white rounded-xl p-6 shadow-card">
            <Button variant="ghost" size="sm" onClick={() => setShowCardPayment(false)} className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
            </Button>
            <h2 className="text-xl font-bold text-center mb-4">Pagamento com Cartão</h2>
            <CardPaymentBrick
              amount={coursePrice}
              formData={{
                name: formData.name,
                email: formData.email,
                cpf: formData.cpf.replace(/\D/g, ''),
                phone: formData.phone.replace(/\D/g, '')
              }}
              onSuccess={() => { window.location.href = '/obrigada'; }}
              onError={(error) => { toast({ title: "Erro", description: error, variant: "destructive" }); }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-panel">
      {/* Banner Topo */}
      <div className="relative w-full h-40 md:h-56 overflow-hidden">
        <img 
          src={checkoutBannerElisa} 
          alt="Curso Informática na Prática" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center">
          <div className="container mx-auto px-4">
            <p className="text-white/80 text-xs uppercase tracking-wider mb-1">Curso Online</p>
            <h1 className="text-2xl md:text-4xl font-black text-white">
              Informática na Prática
            </h1>
            <p className="text-white/90 text-sm md:text-base mt-1">
              Do zero ao avançado com a Professora Elisa
            </p>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal - Layout com sidebar */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
          
          {/* Coluna Esquerda - Formulário */}
          <div className="flex-1 max-w-xl">
            
            {/* Card do Produto */}
            <div className="bg-white rounded-xl shadow-card p-4 mb-4 flex items-center gap-4">
              <img 
                src={elisaCheckout} 
                alt="Professora Elisa" 
                className="w-16 h-16 rounded-lg object-cover object-top"
              />
              <div className="flex-1">
                <p className="text-xs text-success font-semibold">🔒 Alterar plano</p>
                <h2 className="font-bold text-foreground">Curso Informática na Prática</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-black text-primary">12x R$ 30,72</span>
                  <span className="text-xs text-muted-foreground">ou R$ 297,00 à vista</span>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div className="bg-white rounded-xl shadow-card p-5">
              
              {/* Campos de dados pessoais */}
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="name" className="text-xs font-semibold text-foreground">Nome Completo</Label>
                  <Input
                    id="name"
                    placeholder="Digite seu nome completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="cpf" className="text-xs font-semibold text-foreground">CPF</Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={formData.cpf}
                    onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
                    maxLength={14}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-xs font-semibold text-foreground">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-xs font-semibold text-foreground">Celular</Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                    maxLength={15}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Aviso de segurança */}
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-4">
                <Lock className="w-3.5 h-3.5" />
                <span>Seus dados serão mantidos em sigilo</span>
              </div>

              {/* Seletor de método de pagamento */}
              <p className="text-xs font-semibold text-center text-foreground mb-3">
                SELECIONE UM MÉTODO DE PAGAMENTO
              </p>
              
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('card')}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all ${
                    selectedPaymentMethod === 'card' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 ${selectedPaymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-xs font-medium ${selectedPaymentMethod === 'card' ? 'text-primary' : 'text-muted-foreground'}`}>
                    Cartão
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('pix')}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all ${
                    selectedPaymentMethod === 'pix' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Smartphone className={`w-5 h-5 ${selectedPaymentMethod === 'pix' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-xs font-medium ${selectedPaymentMethod === 'pix' ? 'text-primary' : 'text-muted-foreground'}`}>
                    PIX
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPaymentMethod('boleto')}
                  className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all ${
                    selectedPaymentMethod === 'boleto' 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Receipt className={`w-5 h-5 ${selectedPaymentMethod === 'boleto' ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className={`text-xs font-medium ${selectedPaymentMethod === 'boleto' ? 'text-primary' : 'text-muted-foreground'}`}>
                    Boleto
                  </span>
                </button>
              </div>

              {/* Campos de Cartão (inline quando cartão selecionado) */}
              {selectedPaymentMethod === 'card' && (
                <div className="space-y-4 mb-6 p-4 bg-muted/30 rounded-lg border border-border">
                  <div>
                    <Label htmlFor="cardNumber" className="text-xs font-semibold text-foreground">Número do Cartão</Label>
                    <Input
                      id="cardNumber"
                      placeholder="0000 0000 0000 0000"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="cardExpiry" className="text-xs font-semibold text-foreground">Validade (MM/AA)</Label>
                      <Input
                        id="cardExpiry"
                        placeholder="MM/AA"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvv" className="text-xs font-semibold text-foreground">Cód Segurança</Label>
                      <Input
                        id="cardCvv"
                        placeholder="CVV"
                        maxLength={4}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cardName" className="text-xs font-semibold text-foreground">Nome impresso no cartão</Label>
                    <Input
                      id="cardName"
                      placeholder="Nome como está no cartão"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="installments" className="text-xs font-semibold text-foreground">Parcelas</Label>
                    <select
                      id="installments"
                      className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="12">12x de R$ 30,72 *</option>
                      <option value="11">11x de R$ 33,17 *</option>
                      <option value="10">10x de R$ 36,14 *</option>
                      <option value="9">9x de R$ 39,78 *</option>
                      <option value="8">8x de R$ 44,33 *</option>
                      <option value="7">7x de R$ 50,20 *</option>
                      <option value="6">6x de R$ 58,06 *</option>
                      <option value="5">5x de R$ 69,02 *</option>
                      <option value="4">4x de R$ 85,52 *</option>
                      <option value="3">3x de R$ 113,04 *</option>
                      <option value="2">2x de R$ 168,06 *</option>
                      <option value="1">1x de R$ 297,00 (à vista)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="saveCard" className="rounded border-border" />
                    <label htmlFor="saveCard" className="text-xs text-muted-foreground">
                      Usar esses dados nas próximas compras
                    </label>
                  </div>
                </div>
              )}

              {/* Botão de finalizar */}
              <Button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-success hover:bg-success/90 text-white font-bold py-6 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Finalizar Pagamento
                  </>
                )}
              </Button>

              {/* Selos de garantia */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border">
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-success" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-semibold text-foreground leading-tight">COMPRA</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">100% SEGURA</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Lock className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-semibold text-foreground leading-tight">PRIVACIDADE</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">PROTEGIDA</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-semibold text-foreground leading-tight">GARANTIA</p>
                    <p className="text-[10px] text-muted-foreground leading-tight">7 DIAS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rodapé */}
            <div className="text-center mt-6">
              <p className="text-[10px] text-muted-foreground">
                * Pagamento processado com acréscimo de 2,47% a.m. | Política de privacidade | Termos de compra
              </p>
            </div>
          </div>

          {/* Coluna Direita - Faixa Promocional */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-6">
              <div className="rounded-xl overflow-hidden shadow-card">
                <img 
                  src={checkoutBannerElisa} 
                  alt="Professora Elisa - Curso Informática na Prática" 
                  className="w-full h-auto object-cover"
                />
                <div className="bg-gradient-to-b from-primary to-primary/90 p-6 text-center text-white">
                  <h3 className="font-black text-xl mb-2">INFORMÁTICA</h3>
                  <p className="text-3xl font-black">NA PRÁTICA</p>
                  <p className="text-sm mt-3 text-white/80">Domine o computador de uma vez por todas!</p>
                  
                  <div className="mt-6 space-y-2 text-left text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span>Acesso vitalício</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span>Certificado incluso</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span>Suporte exclusivo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      <span>+15.000 alunos</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Segunda imagem da professora */}
              <div className="mt-4 rounded-xl overflow-hidden shadow-card">
                <img 
                  src={elisaCheckout} 
                  alt="Professora Elisa" 
                  className="w-full h-48 object-cover object-top"
                />
                <div className="bg-white p-4 text-center">
                  <p className="font-bold text-foreground">Professora Elisangela</p>
                  <p className="text-xs text-muted-foreground">Te espero na área de alunos!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Inferior */}
      <div className="bg-gradient-to-r from-primary to-primary/80 py-6 mt-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-4 mb-3">
            <img 
              src={elisaCheckout} 
              alt="Professora Elisa" 
              className="w-12 h-12 rounded-full border-2 border-white object-cover object-top"
            />
            <div className="text-left">
              <p className="text-white font-bold">Professora Elisangela</p>
              <p className="text-white/80 text-xs">Te espero na área de alunos!</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-6 text-white/90 text-xs">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>+15.000 alunos</span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              <span>7 dias de garantia</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock className="w-4 h-4" />
              <span>Acesso vitalício</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
