import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, ShieldCheck, Lock, CreditCard, Smartphone, CheckCircle2, Copy, ArrowLeft } from "lucide-react";
import logoBlue from "@/assets/logo-blue.png";
import { CardPaymentPagSeguro } from "./CardPaymentPagSeguro";

interface PixData {
  orderId: string;
  qrCode: string;
  qrCodeImage: string;
  expirationDate: string;
}

export const CheckoutFormPagSeguro = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
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
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const coursePrice = 297.00;
  const [showCardPayment, setShowCardPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");

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

    const cpfClean = formData.cpf.replace(/\D/g, '');
    if (cpfClean.length !== 11) {
      toast({
        title: "CPF inválido",
        description: "Por favor, insira um CPF válido.",
        variant: "destructive"
      });
      return false;
    }

    const phoneClean = formData.phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      toast({
        title: "Telefone inválido",
        description: "Por favor, insira um telefone válido.",
        variant: "destructive"
      });
      return false;
    }

    const cepClean = formData.cep.replace(/\D/g, '');
    if (cepClean.length !== 8) {
      toast({
        title: "CEP inválido",
        description: "Por favor, insira um CEP válido.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handlePixPayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      console.log('💰 Iniciando pagamento PIX no PagSeguro');

      const { data, error } = await supabase.functions.invoke('pagseguro-create-order-pix', {
        body: {
          customer: {
            name: formData.name,
            email: formData.email,
            tax_id: formData.cpf,
            phone: formData.phone
          },
          address: {
            street: formData.street,
            number: formData.number,
            complement: formData.complement,
            locality: formData.neighborhood,
            city: formData.city,
            region_code: formData.state,
            postal_code: formData.cep
          },
          amount: coursePrice
        }
      });

      if (error) throw error;

      if (data?.success && data.qrCode) {
        setPixData({
          orderId: data.orderId,
          qrCode: data.qrCode,
          qrCodeImage: data.qrCodeImage,
          expirationDate: data.expirationDate
        });
        
        setSelectedPaymentMethod('pix');
        
        toast({
          title: "✅ PIX gerado!",
          description: "Escaneie o QR Code ou copie o código para pagar."
        });
      }
    } catch (error: any) {
      console.error('Erro PIX:', error);
      toast({
        title: "Erro ao gerar PIX",
        description: error.message || "Tente novamente",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCardPayment = () => {
    if (!validateForm()) return;
    setShowCardPayment(true);
    setSelectedPaymentMethod('credit_card');
  };

  const copyPixCode = () => {
    if (pixData?.qrCode) {
      navigator.clipboard.writeText(pixData.qrCode);
      toast({
        title: "✅ Código copiado!",
        description: "Cole no seu app de pagamentos"
      });
    }
  };

  const checkPaymentStatus = async () => {
    if (!pixData?.orderId) return;

    setCheckingPayment(true);
    try {
      const { data, error } = await supabase.functions.invoke('pagseguro-check-payment', {
        body: { orderId: pixData.orderId }
      });

      if (error) throw error;

      if (data?.status === 'PAID') {
        toast({
          title: "✅ Pagamento confirmado!",
          description: "Redirecionando..."
        });
        setTimeout(() => {
          window.location.href = '/obrigada';
        }, 2000);
      } else {
        toast({
          title: "⏳ Aguardando pagamento",
          description: "O pagamento ainda não foi confirmado"
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro ao verificar",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setCheckingPayment(false);
    }
  };

  const handleBackToPayment = () => {
    setShowCardPayment(false);
    setPixData(null);
    setSelectedPaymentMethod("");
  };

  // Se está mostrando o formulário de cartão
  if (showCardPayment) {
    return (
      <div className="space-y-4">
        <Button
          variant="ghost"
          onClick={handleBackToPayment}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para métodos de pagamento
        </Button>
        <CardPaymentPagSeguro
          formData={formData}
          amount={coursePrice}
          onSuccess={() => {
            window.location.href = '/obrigada';
          }}
          onError={(error) => {
            toast({
              title: "Erro no pagamento",
              description: error,
              variant: "destructive"
            });
            setShowCardPayment(false);
          }}
        />
      </div>
    );
  }

  // Se está mostrando os dados do PIX
  if (pixData) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={handleBackToPayment}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para métodos de pagamento
        </Button>
        
        <div className="text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 mx-auto text-green-500" />
          <h3 className="text-xl font-bold">PIX Gerado com Sucesso!</h3>
          <p className="text-sm text-muted-foreground">
            Escaneie o QR Code abaixo com o app do seu banco
          </p>
        </div>

        {pixData.qrCodeImage && (
          <div className="flex justify-center p-4 bg-white rounded-lg">
            <img 
              src={pixData.qrCodeImage} 
              alt="QR Code PIX" 
              className="w-64 h-64"
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Ou copie o código PIX:</Label>
          <div className="flex gap-2">
            <Input 
              value={pixData.qrCode} 
              readOnly 
              className="font-mono text-xs"
            />
            <Button onClick={copyPixCode} size="icon">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Button 
          onClick={checkPaymentStatus}
          disabled={checkingPayment}
          className="w-full"
          size="lg"
        >
          {checkingPayment ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verificando...
            </>
          ) : (
            'Já paguei - Verificar pagamento'
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          ⏱️ Expira em: {new Date(pixData.expirationDate).toLocaleString('pt-BR')}
        </p>
      </div>
    );
  }

  // Formulário principal
  return (
    <div className="space-y-6">
      <div className="bg-primary/10 p-4 rounded-lg text-center">
        <p className="text-sm font-semibold mb-1">Valor do curso:</p>
        <p className="text-3xl font-black text-primary">
          R$ {coursePrice.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          ou 12x de R$ {(coursePrice / 12).toFixed(2)} no cartão
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Nome completo *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Seu nome completo"
          />
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="seu@email.com"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cpf">CPF *</Label>
            <Input
              id="cpf"
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: formatCPF(e.target.value) })}
              placeholder="000.000.000-00"
              maxLength={14}
            />
          </div>
          <div>
            <Label htmlFor="phone">Telefone *</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="cep">CEP *</Label>
            <Input
              id="cep"
              value={formData.cep}
              onChange={(e) => setFormData({ ...formData, cep: formatCEP(e.target.value) })}
              placeholder="00000-000"
              maxLength={9}
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="street">Rua *</Label>
            <Input
              id="street"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              placeholder="Nome da rua"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="number">Número *</Label>
            <Input
              id="number"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              placeholder="123"
            />
          </div>
          <div className="col-span-2">
            <Label htmlFor="complement">Complemento</Label>
            <Input
              id="complement"
              value={formData.complement}
              onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
              placeholder="Apto, bloco, etc"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="neighborhood">Bairro *</Label>
          <Input
            id="neighborhood"
            value={formData.neighborhood}
            onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
            placeholder="Nome do bairro"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Label htmlFor="city">Cidade *</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Nome da cidade"
            />
          </div>
          <div>
            <Label htmlFor="state">UF *</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
              placeholder="SP"
              maxLength={2}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-center">Escolha a forma de pagamento:</p>
        
        <Button
          onClick={handleCardPayment}
          disabled={loading}
          className="w-full"
          size="lg"
          variant="default"
        >
          <CreditCard className="w-5 h-5 mr-2" />
          Cartão de Crédito
        </Button>

        <Button
          onClick={handlePixPayment}
          disabled={loading}
          className="w-full"
          size="lg"
          variant="outline"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Smartphone className="w-5 h-5 mr-2" />
          )}
          PIX (Aprovação Instantânea)
        </Button>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-4">
        <div className="flex items-center gap-1">
          <Lock className="w-3 h-3" />
          <span>Pagamento Seguro</span>
        </div>
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          <span>Dados Protegidos</span>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <img src={logoBlue} alt="Logo" className="h-8 opacity-50" />
      </div>
    </div>
  );
};
