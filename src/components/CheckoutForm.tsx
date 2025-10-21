import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, Lock, CreditCard, Smartphone, Receipt, CheckCircle2 } from "lucide-react";
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

  const handlePayment = async (method: 'card' | 'pix' | 'boleto') => {
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
    } finally {
      setLoading(false);
    }
  };

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
          onClick={() => handlePayment('card')}
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
          onClick={() => handlePayment('pix')}
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
          onClick={() => handlePayment('boleto')}
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
