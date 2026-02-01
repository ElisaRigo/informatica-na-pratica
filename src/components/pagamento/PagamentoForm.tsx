import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, CreditCard, Smartphone, Receipt, ShieldCheck, ArrowLeft, Copy, CheckCircle2 } from "lucide-react";
import { PagamentoCartao } from "./PagamentoCartao";

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

export const PagamentoForm = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("cartao");
  const [showCardFields, setShowCardFields] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    confirmEmail: "",
    phone: ""
  });
  const [mpInstance, setMpInstance] = useState<any>(null);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [coursePrice] = useState<number>(297.00);
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
          script.onload = () => setRecaptchaLoaded(true);
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
      try {
        const { data } = await supabase.functions.invoke('get-mp-public-key');
        if (data?.MERCADO_PAGO_PUBLIC_KEY) {
          const mp = new window.MercadoPago(data.MERCADO_PAGO_PUBLIC_KEY, { locale: 'pt-BR' });
          setMpInstance(mp);
          setSdkLoaded(true);
        }
      } catch (error) {
        console.error('Error loading MP key:', error);
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
      } else {
        await supabase
          .from('leads')
          .insert({
            name: formData.name.trim(),
            email: email,
            phone: cleanPhone || null,
            cpf: cleanCPF || null,
            source: 'checkout',
            converted: false
          });
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

    if (formData.email !== formData.confirmEmail) {
      toast({
        title: "E-mails não conferem",
        description: "O e-mail e a confirmação devem ser iguais",
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
    if (!isProduction || !recaptchaLoaded || !recaptchaSiteKey) return true;

    try {
      const token = await window.grecaptcha.execute(recaptchaSiteKey, { action });
      const { data } = await supabase.functions.invoke('verify-recaptcha', { body: { token } });
      return data?.success || true;
    } catch {
      return true;
    }
  };

  const handleContinueToCard = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    const valid = await verifyRecaptcha('card_payment');
    setLoading(false);
    
    if (valid) {
      setShowCardFields(true);
    }
  };

  const handlePixPayment = async () => {
    if (!validateForm()) return;
    if (!sdkLoaded) {
      toast({ title: "Aguarde", description: "Sistema de pagamento carregando..." });
      return;
    }

    setLoading(true);
    const valid = await verifyRecaptcha('pix_payment');
    if (!valid) {
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
      if (!data?.qrCode) throw new Error('Erro ao gerar PIX');

      setPixData(data);
      toast({ title: "PIX gerado!", description: "Escaneie o QR Code ou copie o código" });

      // Verificação automática
      const intervalId = setInterval(async () => {
        const { data: payment } = await supabase
          .from('payments')
          .select('status')
          .eq('pagseguro_transaction_id', data.paymentId)
          .eq('status', 'approved')
          .maybeSingle();

        if (payment) {
          clearInterval(intervalId);
          window.location.href = '/obrigada';
        }
      }, 5000);

      setTimeout(() => clearInterval(intervalId), 600000);
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleBoletoPayment = async () => {
    if (!validateForm()) return;
    if (!sdkLoaded) {
      toast({ title: "Aguarde", description: "Sistema de pagamento carregando..." });
      return;
    }

    setLoading(true);
    const valid = await verifyRecaptcha('boleto_payment');
    if (!valid) {
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
      if (!data?.initPoint) throw new Error('Erro ao criar checkout');

      window.location.href = data.initPoint;
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

  const checkPaymentStatus = async () => {
    if (!pixData?.paymentId) return;
    setCheckingPayment(true);
    
    try {
      const { data: payment } = await supabase
        .from('payments')
        .select('status')
        .eq('pagseguro_transaction_id', pixData.paymentId)
        .eq('status', 'approved')
        .maybeSingle();

      if (payment) {
        window.location.href = '/obrigada';
      } else {
        toast({ title: "Aguardando pagamento", description: "O pagamento ainda não foi confirmado" });
      }
    } catch {
      toast({ title: "Erro", description: "Não foi possível verificar", variant: "destructive" });
    } finally {
      setCheckingPayment(false);
    }
  };

  // Se mostrando campos de cartão
  if (showCardFields) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowCardFields(false)}
          className="gap-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <PagamentoCartao 
          formData={formData}
          mpInstance={mpInstance}
          coursePrice={coursePrice}
        />
      </div>
    );
  }

  // Se PIX foi gerado
  if (pixData) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex items-center justify-center gap-2 text-success">
          <CheckCircle2 className="w-6 h-6" />
          <span className="font-bold text-lg">PIX gerado com sucesso!</span>
        </div>

        <div className="bg-muted/50 p-6 rounded-xl">
          {pixData.qrCodeBase64 && (
            <img 
              src={`data:image/png;base64,${pixData.qrCodeBase64}`}
              alt="QR Code PIX"
              className="mx-auto w-48 h-48 mb-4"
            />
          )}
          
          <p className="text-sm text-muted-foreground mb-4">
            Escaneie o QR Code ou copie o código abaixo:
          </p>
          
          <div className="bg-background p-3 rounded-lg border text-xs break-all mb-4">
            {pixData.qrCode.substring(0, 100)}...
          </div>
          
          <Button onClick={copyPixCode} className="gap-2">
            <Copy className="w-4 h-4" />
            Copiar código PIX
          </Button>
        </div>

        <Button 
          onClick={checkPaymentStatus} 
          variant="outline"
          disabled={checkingPayment}
          className="w-full"
        >
          {checkingPayment ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Verificando...
            </>
          ) : (
            "Já paguei - Verificar pagamento"
          )}
        </Button>

        <p className="text-xs text-muted-foreground">
          O pagamento será confirmado automaticamente em alguns segundos após o pagamento.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Campos do formulário */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium">Nome Completo</Label>
          <Input
            id="name"
            placeholder="Seu nome completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="cpf" className="text-sm font-medium">CPF ou CNPJ</Label>
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
          <Label htmlFor="email" className="text-sm font-medium">E-mail</Label>
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
          <Label htmlFor="confirmEmail" className="text-sm font-medium">Confirmar e-mail</Label>
          <Input
            id="confirmEmail"
            type="email"
            placeholder="seu@email.com"
            value={formData.confirmEmail}
            onChange={(e) => setFormData({ ...formData, confirmEmail: e.target.value })}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          <div>
            <Label className="text-sm font-medium">DDI</Label>
            <Input
              value="+55"
              disabled
              className="mt-1 bg-muted text-center"
            />
          </div>
          <div className="col-span-3">
            <Label htmlFor="phone" className="text-sm font-medium">Celular</Label>
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
      </div>

      {/* Badge de segurança */}
      <div className="flex items-center gap-2 py-3 px-4 bg-muted/50 rounded-lg">
        <ShieldCheck className="w-5 h-5 text-success" />
        <span className="text-sm text-muted-foreground">
          Seus dados estão mantidos em sigilo
        </span>
      </div>

      {/* Botão principal de cartão */}
      <Button 
        onClick={handleContinueToCard}
        disabled={loading}
        className="w-full h-12 text-base font-bold bg-success hover:bg-success/90 text-white"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin mr-2" />
        ) : (
          <CreditCard className="w-5 h-5 mr-2" />
        )}
        Pagar com cartão de crédito
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        OU ESCOLHA OUTRO MÉTODO DE PAGAMENTO
      </p>

      {/* Abas de métodos alternativos */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-auto">
          <TabsTrigger value="cartao" className="flex flex-col gap-1 py-3">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">Cartão de Crédito</span>
          </TabsTrigger>
          <TabsTrigger value="pix" className="flex flex-col gap-1 py-3">
            <Smartphone className="w-5 h-5" />
            <span className="text-xs">Pix</span>
          </TabsTrigger>
          <TabsTrigger value="boleto" className="flex flex-col gap-1 py-3">
            <Receipt className="w-5 h-5" />
            <span className="text-xs">Boleto</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cartao" className="mt-4">
          <p className="text-sm text-muted-foreground text-center">
            Clique no botão verde acima para pagar com cartão de crédito.
          </p>
        </TabsContent>

        <TabsContent value="pix" className="mt-4">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Pague instantaneamente com PIX. O acesso é liberado em segundos!
            </p>
            <Button 
              onClick={handlePixPayment}
              disabled={loading}
              variant="outline"
              className="w-full h-12"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Smartphone className="w-4 h-4 mr-2" />}
              Gerar código PIX
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="boleto" className="mt-4">
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              O boleto pode levar até 3 dias úteis para compensar.
            </p>
            <Button 
              onClick={handleBoletoPayment}
              disabled={loading}
              variant="outline"
              className="w-full h-12"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Receipt className="w-4 h-4 mr-2" />}
              Gerar boleto
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
