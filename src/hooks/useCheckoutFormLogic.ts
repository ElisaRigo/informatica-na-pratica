import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

export const useCheckoutFormLogic = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(true);
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

  // Load reCAPTCHA
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

  // Load Mercado Pago SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    script.async = true;
    script.onload = async () => {
      try {
        const [keyResponse, priceResponse] = await Promise.all([
          supabase.functions.invoke('get-mp-public-key'),
          supabase.functions.invoke('get-course-price')
        ]);
        if (keyResponse.data?.MERCADO_PAGO_PUBLIC_KEY) {
          const mp = new window.MercadoPago(keyResponse.data.MERCADO_PAGO_PUBLIC_KEY, { locale: 'pt-BR' });
          setMpInstance(mp);
          setSdkLoaded(true);
        }
        if (priceResponse.data?.price) {
          setCoursePrice(priceResponse.data.price);
        }
      } catch (error) {
        console.error('Error loading MP key:', error);
        toast({ title: "Erro ao carregar", description: "Não foi possível carregar o sistema de pagamento", variant: "destructive" });
      }
    };
    document.body.appendChild(script);
    return () => { if (document.body.contains(script)) document.body.removeChild(script); };
  }, []);

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return value;
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    return value;
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
      toast({ title: "Telefone inválido", description: "Digite um telefone válido com DDD (11 dígitos)", variant: "destructive" });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({ title: "E-mail inválido", description: "Digite um e-mail válido", variant: "destructive" });
      return false;
    }
    return true;
  };

  const verifyRecaptcha = async (action: string): Promise<boolean> => {
    const isProduction = window.location.hostname === 'informaticanapratica.com.br' || window.location.hostname === 'www.informaticanapratica.com.br';
    if (!isProduction) return true;
    if (!recaptchaLoaded || !recaptchaSiteKey) return true;
    try {
      const token = await window.grecaptcha.execute(recaptchaSiteKey, { action });
      const { data, error } = await supabase.functions.invoke('verify-recaptcha', { body: { token } });
      if (error || !data?.success) return true;
      return true;
    } catch { return true; }
  };

  const handlePixPayment = async () => {
    if (!validateForm()) return;
    if (!sdkLoaded) { toast({ title: "Aguarde", description: "Sistema de pagamento ainda carregando..." }); return; }
    setLoading(true);
    const recaptchaValid = await verifyRecaptcha('pix_payment');
    if (!recaptchaValid) { setLoading(false); return; }
    try {
      const { data, error } = await supabase.functions.invoke('create-pix-payment', {
        body: { name: formData.name, email: formData.email, cpf: formData.cpf.replace(/\D/g, ''), phone: formData.phone.replace(/\D/g, '') }
      });
      if (error) throw error;
      if (!data?.qrCode) throw new Error('Erro ao gerar PIX');
      setPixData(data);
      toast({ title: "PIX gerado!", description: "Escaneie o QR Code ou copie o código para pagar" });
      const intervalId = setInterval(async () => {
        try {
          const { data: payment } = await supabase.from('payments').select('status').eq('pagseguro_transaction_id', data.paymentId).eq('status', 'approved').maybeSingle();
          if (payment) {
            clearInterval(intervalId);
            toast({ title: "✅ Pagamento confirmado!", description: "Redirecionando..." });
            setTimeout(() => { window.location.href = '/obrigada'; }, 1500);
          }
        } catch (error) { console.error('Error checking payment:', error); }
      }, 5000);
      setTimeout(() => clearInterval(intervalId), 600000);
    } catch (error: any) {
      console.error('Error:', error);
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

  const handleOtherPayment = async (method: 'boleto') => {
    if (!validateForm()) return;
    if (!sdkLoaded) { toast({ title: "Aguarde", description: "Sistema de pagamento ainda carregando..." }); return; }
    setLoading(true);
    const recaptchaValid = await verifyRecaptcha('boleto_payment');
    if (!recaptchaValid) { setLoading(false); return; }
    try {
      const { data, error } = await supabase.functions.invoke('mercado-pago-checkout', {
        body: { name: formData.name, email: formData.email, cpf: formData.cpf.replace(/\D/g, ''), phone: formData.phone.replace(/\D/g, '') }
      });
      if (error) throw error;
      if (!data?.initPoint) throw new Error('Erro ao criar checkout');
      toast({ title: "Redirecionando...", description: "Você será redirecionado para o pagamento seguro" });
      setTimeout(() => { window.location.href = data.initPoint; }, 1000);
    } catch (error: any) {
      console.error('Error:', error);
      toast({ title: "Erro", description: error.message || "Erro ao processar pagamento", variant: "destructive" });
      setLoading(false);
    }
  };

  const copyPixCode = () => {
    if (pixData?.qrCode) {
      navigator.clipboard.writeText(pixData.qrCode);
      toast({ title: "Copiado!", description: "Código PIX copiado para área de transferência" });
    }
  };

  const checkPaymentStatus = async () => {
    if (!pixData?.paymentId) return;
    setCheckingPayment(true);
    try {
      const { data: payment, error } = await supabase.from('payments').select('status').eq('pagseguro_transaction_id', pixData.paymentId).eq('status', 'approved').maybeSingle();
      if (error && error.code !== 'PGRST116') throw error;
      if (payment) {
        toast({ title: "✅ Pagamento confirmado!", description: "Redirecionando..." });
        setTimeout(() => { window.location.href = '/obrigada'; }, 1500);
      } else {
        toast({ title: "Aguardando pagamento", description: "O pagamento ainda não foi confirmado. Aguarde alguns instantes após pagar." });
      }
    } catch (error: any) {
      console.error('Error checking payment:', error);
      toast({ title: "Erro", description: "Não foi possível verificar o pagamento.", variant: "destructive" });
    } finally {
      setCheckingPayment(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    setLoading,
    sdkLoaded,
    mpInstance,
    pixData,
    setPixData,
    checkingPayment,
    coursePrice,
    showCardPayment,
    setShowCardPayment,
    formatCPF,
    formatPhone,
    handlePixPayment,
    handleCardPayment,
    handleOtherPayment,
    copyPixCode,
    checkPaymentStatus,
  };
};
